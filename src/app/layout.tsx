import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fargerike.vercel.app"),
  title: {
    default: "Fargerike – Norges fargehandel",
    template: "%s | Fargerike",
  },
  description: "Maling, farger og inspirasjon. Finn din farge blant 600+ kulører, bestill fargeprøver, og få ekspertrådgivning i din nærmeste butikk.",
  openGraph: {
    siteName: "Fargerike",
    locale: "nb_NO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
