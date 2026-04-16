import type { OcrExtractedFields, OcrExtractionMethod } from "@/types/ocr-extraction";

const DEFAULT_FIELDS: OcrExtractedFields = {
  fullName: "",
  degree: "",
  cgpa: "",
  dob: "",
  passingYear: "",
  university: "",
  aadhar: "",
};

function normalizeLines(raw: string): string[] {
  return raw
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function extractName(text: string, lines: string[]): string {
  const joined = text.replace(/\s+/g, " ");
  const m = joined.match(
    /(?:This is to certify that|certify that|hereby certify that)\s+([A-Z][^.\n]{2,120}?)(?:\.|,|\s+has\s)/i,
  );
  if (m?.[1]) return m[1].trim().replace(/\s+/g, " ");

  const idx = lines.findIndex((l) => /certify that/i.test(l));
  if (idx >= 0 && lines[idx + 1]) {
    const candidate = lines[idx + 1];
    if (/^[A-Z][a-zA-Z\s.'-]{2,80}$/.test(candidate)) return candidate.trim();
  }
  return "";
}

function extractCgpa(text: string): string {
  const m =
    text.match(/CGPA[:\s]+(\d{1,2}\.\d{1,2})/i) ||
    text.match(/\b(\d{1,2}\.\d{1,2})\s*\/\s*10\b/i) ||
    text.match(/GPA[:\s]+(\d{1,2}\.\d{1,2})/i);
  return m?.[1]?.trim() ?? "";
}

function extractDob(text: string): string {
  const m =
    text.match(/\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/) ||
    text.match(/Date of Birth[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i) ||
    text.match(/D\.?O\.?B\.?[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
  return m?.[1]?.trim() ?? "";
}

function extractPassingYear(text: string): string {
  const years = [...text.matchAll(/\b(20[0-2]\d)\b/g)].map((x) => x[1]);
  if (!years.length) return "";
  const current = new Date().getFullYear();
  const plausible = years
    .map(Number)
    .filter((y) => y <= current && y >= 1980);
  if (!plausible.length) return years[years.length - 1] ?? "";
  return String(Math.max(...plausible));
}

function extractUniversity(lines: string[], text: string): string {
  const uniLine = lines.find((l) =>
    /(University|Institute|College|Board|IIT|NIT)\b/i.test(l),
  );
  if (uniLine) return uniLine.replace(/^\d+\.?\s*/, "").trim();

  const m = text.match(
    /((?:Indian )?Institute of [^.\n]+|University of [^.\n]+)/i,
  );
  return m?.[1]?.trim() ?? "";
}

function extractDegree(text: string): string {
  const m =
    text.match(
      /(B\.?Tech\.?\s*[^.\n()]{0,40}|M\.?Tech\.?\s*[^.\n()]{0,40}|Bachelor of [^.\n()]{2,60}|Master of [^.\n()]{2,60})/i,
    ) || text.match(/(B\.?E\.?\s*[^.\n]{0,30}|B\.?Sc\.?\s*[^.\n]{0,30})/i);
  return m?.[1]?.replace(/\s+/g, " ").trim() ?? "";
}

function extractAadhar(text: string): string {
  const m =
    text.match(/\b(\d{4}\s*[- ]\d{4}\s*[- ]\d{4})\b/) ||
    text.match(/\b(XXXX[- ]?XXXX[- ]?\d{4})\b/i);
  return m?.[1]?.replace(/\s+/g, " ").trim() ?? "";
}

export function extractStructuredFromPdfText(raw: string): {
  fields: OcrExtractedFields;
  confidence: number;
  warnings: string[];
  method: OcrExtractionMethod;
} {
  const warnings: string[] = [];
  const text = raw.replace(/\u0000/g, "").trim();
  const lines = normalizeLines(raw);

  if (text.length < 40) {
    warnings.push(
      "Little usable text was found after PDF text extraction and raster OCR on the first page(s). The form shows placeholders—edit manually or upload a clearer English scan (300+ DPI helps).",
    );
    return {
      fields: { ...DEFAULT_FIELDS },
      confidence: 0.15,
      warnings,
      method: "fallback",
    };
  }

  const fields: OcrExtractedFields = {
    fullName: extractName(text, lines),
    degree: extractDegree(text),
    cgpa: extractCgpa(text),
    dob: extractDob(text),
    passingYear: extractPassingYear(text),
    university: extractUniversity(lines, text),
    aadhar: extractAadhar(text),
  };

  const filled = [fields.fullName, fields.university, fields.degree].filter(
    Boolean,
  ).length;
  const partial =
    [fields.cgpa, fields.dob, fields.passingYear].filter(Boolean).length;
  let confidence = 0.35 + filled * 0.12 + partial * 0.08;
  if (!fields.fullName) warnings.push("Could not confidently detect full name.");
  if (!fields.university)
    warnings.push("Could not confidently detect university or board.");
  if (!fields.degree)
    warnings.push("Could not confidently detect degree / qualification.");
  if (!fields.cgpa) warnings.push("CGPA / percentage not detected.");
  if (!fields.dob) warnings.push("Date of birth not detected.");
  if (!fields.passingYear) warnings.push("Passing year not detected.");
  if (!fields.aadhar)
    warnings.push("Aadhaar-style ID pattern not found (optional).");

  if (filled === 0) {
    warnings.push("Structured parsing yielded little; please edit all fields.");
    confidence = Math.min(confidence, 0.35);
  }

  confidence = Math.min(0.92, Math.max(0.25, confidence));

  return { fields, confidence, warnings, method: "pdf_text" };
}
