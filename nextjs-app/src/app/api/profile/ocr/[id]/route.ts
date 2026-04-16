import { NextResponse } from "next/server";
import {
  isValidExtractionId,
  readExtractionRecord,
} from "@/app/api/profile/ocr/_store";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!isValidExtractionId(id)) {
    return NextResponse.json({ message: "Invalid id." }, { status: 400 });
  }
  const record = await readExtractionRecord(id);
  if (!record) {
    return NextResponse.json({ message: "Extraction not found." }, { status: 404 });
  }
  return NextResponse.json(record);
}
