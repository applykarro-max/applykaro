import type { OcrExtractionMethod } from "@/types/ocr-extraction";
import { extractStructuredFromPdfText } from "@/lib/ocr/extract-structured-from-text";
import { rasterOcrPdfPages } from "@/lib/ocr/raster-ocr-first-page";
import { PDFParse } from "pdf-parse";

const MIN_CHARS_BEFORE_RASTER = 100;

export async function extractPdfBuffer(buffer: Buffer): Promise<{
  text: string;
  textLength: number;
}> {
  const data = new Uint8Array(buffer);
  const parser = new PDFParse({ data });
  try {
    const textResult = await parser.getText();
    const text = textResult.text ?? "";
    return { text, textLength: text.length };
  } finally {
    await parser.destroy();
  }
}

function resolveExtractionMethod(
  structuredMethod: OcrExtractionMethod,
  source: "pdf_text" | "raster" | "merged",
  combinedLen: number,
): OcrExtractionMethod {
  if (structuredMethod === "pdf_text") {
    if (source === "raster") return "raster_ocr";
    if (source === "merged") return "pdf_text+raster";
    return "pdf_text";
  }
  if (structuredMethod === "fallback") {
    if (combinedLen >= 80 && source !== "pdf_text") return "raster_ocr";
    return "fallback";
  }
  return structuredMethod;
}

export async function runPdfExtractionPipeline(buffer: Buffer) {
  const { text, textLength } = await extractPdfBuffer(buffer);

  let combinedText = text;
  let source: "pdf_text" | "raster" | "merged" = "pdf_text";
  const rasterNotes: string[] = [];

  if (textLength < MIN_CHARS_BEFORE_RASTER) {
    const raster = await rasterOcrPdfPages(buffer, 2);
    if (raster.error) {
      rasterNotes.push(`Raster OCR error: ${raster.error}`);
    }

    const rText = raster.text.trim();
    const rLen = rText.length;

    if (rLen > textLength && rLen > 0) {
      combinedText =
        text.trim().length > 0
          ? `${text}\n\n--- OCR (rendered pages) ---\n\n${rText}`
          : rText;
      source = text.trim().length > 0 ? "merged" : "raster";
    } else if (rLen > 0) {
      combinedText = `${text}\n\n${rText}`.trim();
      source = "merged";
    } else {
      rasterNotes.push(
        "Raster OCR produced no readable text. Try a clearer scan, higher DPI, or English text.",
      );
    }
  }

  const structured = extractStructuredFromPdfText(combinedText);
  const method = resolveExtractionMethod(
    structured.method,
    source,
    combinedText.trim().length,
  );

  const warnings = [...structured.warnings, ...rasterNotes].filter((w) => {
    if (
      source !== "pdf_text" &&
      w.includes("Little usable text was found after PDF text extraction")
    ) {
      return false;
    }
    return true;
  });

  return {
    textLength: combinedText.length,
    fields: structured.fields,
    confidence: structured.confidence,
    warnings,
    method,
  };
}
