import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/inter";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "MIHAN PRIMA — Double Chocolate Réserve",
  description:
    "A cinematic house of ice cream. Single-origin cacao tempered into liquid night, folded through slow-churned cream. The Double Chocolate réserve — one glass, no apology.",
  openGraph: {
    title: "MIHAN PRIMA — Double Chocolate Réserve",
    description:
      "Single-origin cacao, tempered to silk. A film in four movements, poured into a glass.",
    images: ["/hero-poster.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-void text-ivory font-body antialiased overflow-x-hidden">
        <SmoothScroll />
        <Cursor />
        {children}
        <Grain />
      </body>
    </html>
  );
}
