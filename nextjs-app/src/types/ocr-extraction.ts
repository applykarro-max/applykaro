export type OcrExtractedFields = {
  fullName: string;
  degree: string;
  cgpa: string;
  dob: string;
  passingYear: string;
  university: string;
  aadhar: string;
};

export type OcrExtractionMethod =
  | "pdf_text"
  | "raster_ocr"
  | "pdf_text+raster"
  | "fallback";

export type OcrExtractionRecord = {
  id: string;
  fileName: string;
  extractedAt: string;
  fields: OcrExtractedFields;
  meta: {
    extractionMethod: OcrExtractionMethod;
    textLength: number;
    confidence: number;
    warnings: string[];
  };
};
