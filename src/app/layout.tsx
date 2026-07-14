import type { Metadata, Viewport } from "next";
import { DM_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

/* Type system — the classic "contemporary luxury" pairing:
   Playfair Display (variable)  → high-contrast didone headlines
   Inter (variable)             → body / descriptions
   DM Mono                      → catalogue labels, spec plates          */

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dmmono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOLSTICE | Halo One: Light, Suspended",
  description:
    "Halo One is a levitating sculptural light: a hand-blown glass orb held mid-air by copper halos and a magnetic base. Drag it. Scroll it. Own a small sun.",
  keywords: ["levitating lamp", "sculptural light", "maglev", "design object"],
};

export const viewport: Viewport = {
  themeColor: "#f5eee2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body">{children}</body>
    </html>
  );
}
