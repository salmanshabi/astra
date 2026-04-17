import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AstraCosmics — Unlock Your Destiny",
  description: "Premium astrology readings, birth charts, zodiac insights, and cosmic compatibility. Discover what the stars have written for you.",
  keywords: "astrology, horoscope, birth chart, zodiac, compatibility, cosmic readings",
  openGraph: {
    title: "AstraCosmics — Unlock Your Destiny",
    description: "Premium astrology readings, birth charts, zodiac insights, and cosmic compatibility.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#03020A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
