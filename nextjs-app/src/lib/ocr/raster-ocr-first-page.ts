import { PDFParse } from "pdf-parse";

/**
 * Renders PDF page 1 (and optionally 2) to bitmaps via pdf-parse, then runs Tesseract.js OCR.
 * Use when embedded PDF text is too short (typical for scanned certificates).
 */
export async function rasterOcrPdfPages(
  buffer: Buffer,
  maxPages: 1 | 2 = 2,
): Promise<{ text: string; error?: string }> {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const pages = maxPages === 2 ? [1, 2] : [1];
    const result = await parser.getScreenshot({
      partial: pages,
      scale: 2,
      imageBuffer: true,
      imageDataUrl: false,
    });

    const shots = result.pages?.filter((p) => p?.data?.length) ?? [];
    if (!shots.length) {
      return {
        text: "",
        error: "Could not render PDF pages for OCR (screenshot empty).",
      };
    }

    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker("eng");

    try {
      const chunks: string[] = [];
      for (const shot of shots) {
        const {
          data: { text },
        } = await worker.recognize(Buffer.from(shot.data));
        if (text?.trim()) {
          chunks.push(text.trim());
        }
      }
      return { text: chunks.join("\n\n") };
    } finally {
      await worker.terminate();
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { text: "", error: msg };
  } finally {
    await parser.destroy();
  }
}
