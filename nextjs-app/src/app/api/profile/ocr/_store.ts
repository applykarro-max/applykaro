import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import type { OcrExtractionRecord } from "@/types/ocr-extraction";

/** UUID v4 from `crypto.randomUUID()` */
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidExtractionId(id: string): boolean {
  return UUID_RE.test(id) && !id.includes("..") && !id.includes("/");
}

function extractionsDir() {
  return join(process.cwd(), "data", "extractions");
}

function uploadsDir() {
  return join(process.cwd(), "data", "uploads");
}

export async function ensureOcrDirs(): Promise<void> {
  await mkdir(extractionsDir(), { recursive: true });
  await mkdir(uploadsDir(), { recursive: true });
}

export function extractionJsonPath(id: string): string {
  return join(extractionsDir(), `${id}.json`);
}

export function extractionPdfPath(id: string): string {
  return join(uploadsDir(), `${id}.pdf`);
}

export async function writeExtractionRecord(
  record: OcrExtractionRecord,
): Promise<void> {
  await ensureOcrDirs();
  await writeFile(
    extractionJsonPath(record.id),
    JSON.stringify(record, null, 2),
    "utf8",
  );
}

export async function readExtractionRecord(
  id: string,
): Promise<OcrExtractionRecord | null> {
  if (!isValidExtractionId(id)) return null;
  try {
    const raw = await readFile(extractionJsonPath(id), "utf8");
    return JSON.parse(raw) as OcrExtractionRecord;
  } catch {
    return null;
  }
}

export async function writeUploadedPdf(id: string, buffer: Buffer): Promise<void> {
  await ensureOcrDirs();
  await writeFile(extractionPdfPath(id), buffer);
}
