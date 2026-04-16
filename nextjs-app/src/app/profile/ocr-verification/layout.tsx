import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OCR Verification | GovtJobSimplified",
};

export default function OcrVerificationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
