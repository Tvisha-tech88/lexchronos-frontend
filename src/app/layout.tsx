import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/shared/query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LexChronos — AI Legal Timeline Intelligence",
  description:
    "Transform legal documents into actionable intelligence. AI-powered timeline extraction, risk assessment, and case summaries for lawyers and legal teams.",
  keywords: ["legal AI", "contract analysis", "legal timeline", "document review", "legal tech"],
  authors: [{ name: "LexChronos" }],
  openGraph: {
    title: "LexChronos — AI Legal Timeline Intelligence",
    description: "Transform legal documents into actionable intelligence in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
