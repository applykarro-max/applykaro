"use client";

import type {
  OcrExtractedFields,
  OcrExtractionRecord,
} from "@/types/ocr-extraction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const DEMO_FIELDS: OcrExtractedFields = {
  fullName: "Arjun R. Malhotra",
  degree: "B.Tech Computer Science",
  cgpa: "8.92",
  dob: "12/05/1998",
  passingYear: "2020",
  university: "Indian Institute of Technology, Delhi",
  aadhar: "XXXX-XXXX-8829",
};

function formatDobCertificate(dob: string): string {
  const m = dob.trim().match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (!m) return dob.trim() || "—";
  const d = Number(m[1]);
  const mo = Number(m[2]);
  let y = Number(m[3]);
  if (m[3].length === 2) y += 2000;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (mo < 1 || mo > 12) return dob;
  return `${d} ${months[mo - 1]} ${y}`;
}

function splitDegree(degree: string): { main: string; sub?: string } {
  const open = degree.indexOf("(");
  if (open === -1) return { main: degree || "—" };
  return {
    main: degree.slice(0, open).trim() || "—",
    sub: degree.slice(open).trim(),
  };
}

type Props = {
  documentName: string;
  initialFields: OcrExtractedFields | null;
  meta: OcrExtractionRecord["meta"] | null;
  mode: "demo" | "fromApi";
};

export default function OcrVerificationView({
  documentName,
  initialFields,
  meta,
  mode,
}: Props) {
  const router = useRouter();
  const displayName = useMemo(
    () => decodeURIComponent(documentName) || "document.pdf",
    [documentName],
  );

  const seed = initialFields ?? DEMO_FIELDS;

  const [fullName, setFullName] = useState(seed.fullName);
  const [degree, setDegree] = useState(seed.degree);
  const [cgpa, setCgpa] = useState(seed.cgpa);
  const [dob, setDob] = useState(seed.dob);
  const [passingYear, setPassingYear] = useState(seed.passingYear);
  const [university, setUniversity] = useState(seed.university);
  const [aadhar, setAadhar] = useState(seed.aadhar);

  const degreeParts = useMemo(() => splitDegree(degree), [degree]);

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col p-4 lg:p-8">
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-slate-500 transition-colors hover:text-primary"
        >
          Home
        </Link>
        <span className="material-symbols-outlined text-xs text-slate-400">
          chevron_right
        </span>
        <Link
          href="/profile"
          className="text-slate-500 transition-colors hover:text-primary"
        >
          Profile Building
        </Link>
        <span className="material-symbols-outlined text-xs text-slate-400">
          chevron_right
        </span>
        <span className="font-semibold text-primary">OCR Verification</span>
      </nav>

      {mode === "demo" && !initialFields ? (
        <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100">
          Demo preview (no extraction id).{" "}
          <Link href="/profile" className="font-semibold underline">
            Upload a PDF on Profile
          </Link>{" "}
          to run the real pipeline.
        </p>
      ) : null}

      {meta?.warnings?.length ? (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/25">
          <p className="text-sm font-bold text-amber-900 dark:text-amber-100">
            Please review
          </p>
          <ul className="mt-2 list-inside list-disc text-sm text-amber-900/90 dark:text-amber-100/90">
            {meta.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {meta && mode === "fromApi" ? (
        <p className="mb-6 text-xs text-slate-500 dark:text-slate-400">
          Method:{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {meta.extractionMethod}
          </span>
          {" · "}
          Confidence:{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {Math.round(meta.confidence * 100)}%
          </span>
          {" · "}
          Extracted text length: {meta.textLength} chars
        </p>
      ) : null}

      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          Verify Smart Profile Data
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Our AI has extracted information from your uploaded certificate. Please
          cross-check and verify.
        </p>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
            <span className="material-symbols-outlined text-primary">
              edit_note
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Extracted Information
            </h3>
          </div>
          <div className="space-y-5">
            <div className="group">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <input
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-sm text-emerald-500">
                  check_circle
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="group">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Degree / Qualification
                </label>
                <input
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />
              </div>
              <div className="group">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  CGPA / Percentage
                </label>
                <input
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  type="text"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="group">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-slate-400">
                    calendar_today
                  </span>
                </div>
              </div>
              <div className="group">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Passing Year
                </label>
                <input
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  type="text"
                  value={passingYear}
                  onChange={(e) => setPassingYear(e.target.value)}
                />
              </div>
            </div>
            <div className="group">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                University / Board
              </label>
              <input
                className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>
            <div className="group">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Aadhar / ID Number (Partial Masked)
              </label>
              <input
                className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                type="text"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between gap-4 pt-8">
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="h-12 flex-1 rounded-lg border border-slate-200 font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Re-upload Doc
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex h-12 flex-[2] items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              <span>Verify & Continue</span>
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        <div className="flex min-h-[500px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-200 shadow-inner dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                description
              </span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {displayName}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Zoom in"
              >
                <span className="material-symbols-outlined text-lg">
                  zoom_in
                </span>
              </button>
              <button
                type="button"
                className="rounded p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Zoom out"
              >
                <span className="material-symbols-outlined text-lg">
                  zoom_out
                </span>
              </button>
              <button
                type="button"
                className="rounded p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Fullscreen"
              >
                <span className="material-symbols-outlined text-lg">
                  fullscreen
                </span>
              </button>
            </div>
          </div>
          <div className="relative flex flex-1 justify-center overflow-auto bg-slate-100 p-8 dark:bg-slate-900/50">
            <div className="relative flex aspect-[1/1.414] w-full max-w-md flex-col items-center border border-slate-300 bg-white p-10 text-center shadow-xl">
              <div className="flex h-full w-full flex-col items-center border-4 border-double border-slate-200 p-6 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 opacity-60">
                  <span className="material-symbols-outlined text-4xl text-slate-400">
                    account_balance
                  </span>
                </div>
                <h4 className="mb-2 text-xs uppercase tracking-widest text-slate-400">
                  Provisional Degree Certificate
                </h4>
                <h3 className="mb-8 font-serif text-xl text-slate-800 dark:text-slate-100">
                  {university.trim() || "—"}
                </h3>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  This is to certify that
                </p>
                <p className="mb-4 text-lg font-bold text-primary underline decoration-slate-200 underline-offset-4">
                  {fullName.trim() || "—"}
                </p>
                <p className="mb-8 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  has successfully completed the prescribed courses of study and
                  has been found qualified for the degree of
                </p>
                <p className="mb-4 text-base font-semibold text-slate-800 dark:text-slate-100">
                  {degreeParts.main}
                </p>
                {degreeParts.sub ? (
                  <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
                    {degreeParts.sub}
                  </p>
                ) : (
                  <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
                    &nbsp;
                  </p>
                )}
                <div className="mt-auto grid w-full grid-cols-2 gap-4 text-left">
                  <div className="border-t border-slate-200 pt-2 dark:border-slate-600">
                    <p className="text-[10px] uppercase text-slate-400">
                      Date of Birth
                    </p>
                    <p className="text-xs font-bold">
                      {formatDobCertificate(dob)}
                    </p>
                  </div>
                  <div className="border-t border-slate-200 pt-2 dark:border-slate-600">
                    <p className="text-[10px] uppercase text-slate-400">
                      Passing CGPA
                    </p>
                    <p className="text-xs font-bold">
                      {cgpa.trim() ? `${cgpa.trim()} / 10.0` : "—"}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 top-[44%] h-8 w-48 -translate-x-1/2 rounded border-2 border-primary/30 bg-primary/5" />
                <div className="absolute bottom-[16.5%] left-1/4 h-8 w-20 rounded border-2 border-primary/30 bg-primary/5" />
                <div className="absolute bottom-[16.5%] right-1/4 h-8 w-20 rounded border-2 border-primary/30 bg-primary/5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex items-start gap-4 rounded-lg border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <span className="material-symbols-outlined">security</span>
          </div>
          <div>
            <h4 className="text-sm font-bold">Secure Processing</h4>
            <p className="mt-1 text-xs text-slate-500">
              Encrypted document analysis complying with govt privacy standards.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <span className="material-symbols-outlined">bolt</span>
          </div>
          <div>
            <h4 className="text-sm font-bold">One-Click Ready</h4>
            <p className="mt-1 text-xs text-slate-500">
              Verified profiles can apply to 100+ openings instantly.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <h4 className="text-sm font-bold">AI Accuracy</h4>
            <p className="mt-1 text-xs text-slate-500">
              99.2% extraction accuracy for standard degree certificates.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
