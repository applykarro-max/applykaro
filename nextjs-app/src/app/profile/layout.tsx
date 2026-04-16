import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | GovtJobSimplified",
  description: "Upload documents and verify OCR-extracted profile data.",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
