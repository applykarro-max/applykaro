"use client";

import ProfileAppShell from "@/components/profile/ProfileAppShell";
import { useRequireAuth } from "@/lib/use-require-auth";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ProfilePage() {
  const ok = useRequireAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!ok) {
    return (
      <div className="min-h-screen bg-background-light font-display dark:bg-background-dark" />
    );
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.set("file", file);

      const res = await fetch("/api/profile/ocr", {
        method: "POST",
        body,
      });

      const payload = (await res.json().catch(() => ({}))) as {
        message?: string;
        extractionId?: string;
      };

      if (!res.ok) {
        throw new Error(payload.message ?? "Upload failed.");
      }
      if (!payload.extractionId) {
        throw new Error("Server did not return an extraction id.");
      }

      router.push(`/profile/ocr-verification?id=${payload.extractionId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ProfileAppShell activeNav="profile">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 p-6 lg:p-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Profile building
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Upload your degree or ID PDF. The server extracts selectable text,
            parses fields, and opens the OCR verification screen with the
            result.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          disabled={busy}
          onChange={handleFileChange}
        />

        {error ? (
          <div
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-6 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
            {busy
              ? "Uploading and extracting text from your PDF…"
              : "Start with a clear PDF. Text-based PDFs work best; scanned pages need a raster OCR service later."}
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              disabled={busy}
              onClick={() => fileInputRef.current?.click()}
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-lg font-bold text-white shadow-xl shadow-primary/20 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="material-symbols-outlined">
                {busy ? "hourglass_empty" : "upload_file"}
              </span>
              <span>{busy ? "Processing…" : "Upload PDF"}</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Pipeline: POST /api/profile/ocr → pdf text extraction → structured JSON
          → GET /api/profile/ocr/[id] → verify UI.
        </p>
      </main>
    </ProfileAppShell>
  );
}
