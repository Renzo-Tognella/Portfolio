import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Renzo Tognella — Engenheiro de Software",
  description: "Backend engineer specializing in Ruby on Rails, Python and AI/ML. Coauthor IEEE. Building critical systems at Tradener.",
  authors: [{ name: "Renzo Tognella de Rosa" }],
  openGraph: {
    title: "Renzo Tognella — Engenheiro de Software",
    description: "Backend · AI/ML · Sistemas Criticos",
    siteName: "Renzo Tognella",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renzo Tognella — Engenheiro de Software",
    description: "Backend · AI/ML · Sistemas Criticos",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-background text-foreground">
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
