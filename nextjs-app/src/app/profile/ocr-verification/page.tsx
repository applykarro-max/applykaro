"use client";

import OcrVerificationView from "@/components/profile/OcrVerificationView";
import ProfileAppShell from "@/components/profile/ProfileAppShell";
import { useRequireAuth } from "@/lib/use-require-auth";
import type { OcrExtractionRecord } from "@/types/ocr-extraction";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function OcrBody() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const legacyDoc = searchParams.get("doc");

  const [record, setRecord] = useState<OcrExtractionRecord | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setRecord(null);
      setFetchError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setFetchError(null);

    (async () => {
      try {
        const res = await fetch(`/api/profile/ocr/${id}`);
        const data = (await res.json()) as OcrExtractionRecord & { message?: string };
        if (!res.ok) {
          throw new Error(data.message ?? "Could not load extraction.");
        }
        if (!cancelled) setRecord(data as OcrExtractionRecord);
      } catch (e) {
        if (!cancelled) {
          setRecord(null);
          setFetchError(e instanceof Error ? e.message : "Load failed.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!id) {
    const name = legacyDoc
      ? decodeURIComponent(legacyDoc)
      : "B_Tech_Certificate.pdf";
    return (
      <OcrVerificationView
        key={`demo-${name}`}
        documentName={name}
        initialFields={null}
        meta={null}
        mode="demo"
      />
    );
  }

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-16 text-slate-600 dark:text-slate-400">
        <span className="material-symbols-outlined animate-pulse text-4xl text-primary">
          hourglass_empty
        </span>
        <p className="text-sm font-medium">Loading extraction…</p>
      </div>
    );
  }

  if (fetchError || !record) {
    return (
      <div className="mx-auto max-w-lg flex-1 p-10">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100">
          <p className="font-bold">Could not open this verification session.</p>
          <p className="mt-2 text-sm">{fetchError ?? "Unknown error."}</p>
          <Link
            href="/profile"
            className="mt-4 inline-block text-sm font-semibold text-primary underline"
          >
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <OcrVerificationView
      key={record.id}
      documentName={record.fileName}
      initialFields={record.fields}
      meta={record.meta}
      mode="fromApi"
    />
  );
}

export default function OcrVerificationPage() {
  const ok = useRequireAuth();

  if (!ok) {
    return (
      <div className="min-h-screen bg-background-light font-display dark:bg-background-dark" />
    );
  }

  return (
    <ProfileAppShell activeNav="profile">
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center p-12 text-slate-500">
            Loading…
          </div>
        }
      >
        <OcrBody />
      </Suspense>
    </ProfileAppShell>
  );
}
