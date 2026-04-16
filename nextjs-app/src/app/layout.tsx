import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import "material-symbols/outlined.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GovtJobSimplified - Your Career in Government, Simplified",
  description:
    "Government job applications with OCR-driven profile building and one-click submissions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full bg-background-light font-display text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
