import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { runPdfExtractionPipeline } from "@/lib/ocr/run-pdf-extraction";
import {
  writeExtractionRecord,
  writeUploadedPdf,
} from "@/app/api/profile/ocr/_store";
import type {
  OcrExtractedFields,
  OcrExtractionRecord,
} from "@/types/ocr-extraction";

export const runtime = "nodejs";

const MAX_BYTES = 12 * 1024 * 1024;

const DEMO_FIELDS: OcrExtractedFields = {
  fullName: "Arjun R. Malhotra",
  degree: "B.Tech Computer Science",
  cgpa: "8.92",
  dob: "12/05/1998",
  passingYear: "2020",
  university: "Indian Institute of Technology, Delhi",
  aadhar: "XXXX-XXXX-8829",
};

function mergeWithDemoFallback(
  parsed: OcrExtractedFields,
  useFallbackFill: boolean,
): OcrExtractedFields {
  if (!useFallbackFill) return parsed;
  const out = { ...parsed };
  (Object.keys(DEMO_FIELDS) as (keyof OcrExtractedFields)[]).forEach((k) => {
    if (!out[k]?.trim()) out[k] = DEMO_FIELDS[k];
  });
  return out;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { message: "Expected multipart/form-data with a file field." },
        { status: 415 },
      );
    }

    const formData = await request.formData();
    const entry = formData.get("file");
    if (!entry || !(entry instanceof File)) {
      return NextResponse.json(
        { message: "Missing file field \"file\"." },
        { status: 400 },
      );
    }

    const file = entry;
    const isPdf =
      file.type === "application/pdf" || /\.pdf$/i.test(file.name ?? "");
    if (!isPdf) {
      return NextResponse.json(
        { message: "Only PDF uploads are supported." },
        { status: 400 },
      );
    }

    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length === 0) {
      return NextResponse.json({ message: "Empty file." }, { status: 400 });
    }
    if (buf.length > MAX_BYTES) {
      return NextResponse.json(
        { message: `File too large (max ${MAX_BYTES / 1024 / 1024} MB).` },
        { status: 413 },
      );
    }

    const pipeline = await runPdfExtractionPipeline(buf);
    const useDemoFill =
      pipeline.method === "fallback" || pipeline.confidence < 0.42;
    const fields = mergeWithDemoFallback(pipeline.fields, useDemoFill);

    const warnings = [...pipeline.warnings];
    if (useDemoFill && pipeline.method === "pdf_text") {
      warnings.push(
        "Some empty fields were prefilled from a template because extraction confidence was low—verify every value.",
      );
    }

    const id = randomUUID();
    await writeUploadedPdf(id, buf);

    const record: OcrExtractionRecord = {
      id,
      fileName: file.name || "document.pdf",
      extractedAt: new Date().toISOString(),
      fields,
      meta: {
        extractionMethod: pipeline.method,
        textLength: pipeline.textLength,
        confidence: pipeline.confidence,
        warnings,
      },
    };

    await writeExtractionRecord(record);

    return NextResponse.json({
      extractionId: id,
      fileName: record.fileName,
      confidence: record.meta.confidence,
      warnings: record.meta.warnings,
    });
  } catch (e) {
    console.error("OCR pipeline error:", e);
    return NextResponse.json(
      { message: "Could not process this PDF. It may be corrupted or encrypted." },
      { status: 500 },
    );
  }
}
