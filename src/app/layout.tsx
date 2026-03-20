import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prashanthidigitals.com"),
  title: "Prashanthi Digital Studio & LED Walls | Nacharam, Hyderabad",
  description:
    "20+ years of professional photography, videography & LED wall rental services in Hyderabad. Wedding, event & corporate photography. Book now!",
  keywords:
    "photography hyderabad, wedding photographer nacharam, LED wall rental hyderabad, event photography, videography, prashanthi studio",
  openGraph: {
    title: "Prashanthi Digital Studio & LED Walls",
    description:
      "20+ years of professional photography, videography & LED wall rental in Hyderabad.",
    url: "https://prashanthidigitals.com",
    siteName: "Prashanthi Digital Studio",
    locale: "en_IN",
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
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocalBusinessSchema />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
