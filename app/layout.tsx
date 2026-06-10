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
  title: "AIRFREE | Sovereign Digital Infrastructure",
  description:
    "Official corporate website and platform gateway for Airfree, a sovereign digital infrastructure company.",
  openGraph: {
    title: "AIRFREE | Sovereign Digital Infrastructure",
    description:
      "Geospatial, maps, cloud, domains, mail, and workspace infrastructure under one governed platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIRFREE | Sovereign Digital Infrastructure",
    description:
      "Building sovereign digital infrastructure for enterprise and public-sector teams.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
