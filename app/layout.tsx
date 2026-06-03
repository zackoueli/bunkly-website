import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Bunkly — Livrets d'accueil digitaux pour vos locations",
  description:
    "Créez un livret d'accueil professionnel pour votre Airbnb, gîte ou camping en quelques minutes. QR code inclus, accessible sur mobile, zéro papier.",
  metadataBase: new URL("https://bunkly.co"),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Bunkly — Livrets d'accueil digitaux",
    description: "Créez un livret d'accueil professionnel pour votre location en quelques minutes.",
    url: "https://bunkly.co",
    siteName: "Bunkly",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
