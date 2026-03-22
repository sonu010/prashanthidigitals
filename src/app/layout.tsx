import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
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
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocalBusinessSchema />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
