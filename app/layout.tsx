import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GSAPProvider from "@/components/ui/gsap-provider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Renzo Tognella — Software Engineer",
  description:
    "Portfolio of Renzo Tognella de Rosa — Software Engineer, Backend Architect, and ML Researcher based in Curitiba, Brazil.",
  keywords: [
    "software engineer",
    "backend developer",
    "Ruby on Rails",
    "Next.js",
    "machine learning",
    "NLP",
    "portfolio",
  ],
  authors: [{ name: "Renzo Tognella de Rosa" }],
  openGraph: {
    title: "Renzo Tognella — Software Engineer",
    description:
      "Building systems that think, scale, and endure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <GSAPProvider>
          {children}
        </GSAPProvider>
      </body>
    </html>
  );
}
