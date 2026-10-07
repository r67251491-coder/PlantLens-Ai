import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlantLens AI — Plant Health Assistant Powered by Gemma",
  description:
    "Upload plant photos for instant health assessment, possible disease diagnosis, organic care advice, and outdoor Touch Grass missions using Gemma open-weight AI.",
  keywords: [
    "PlantLens AI",
    "Gemma",
    "Open-weight AI",
    "Plant Health",
    "Plant Disease Identification",
    "Botanical AI",
    "Touch Grass",
    "Hacktoberfest"
  ],
  authors: [{ name: "PlantLens AI Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#fafbfa] text-stone-900 selection:bg-brand-200 selection:text-brand-900">
        {children}
      </body>
    </html>
  );
}
