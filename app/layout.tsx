import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aire It Out — Voice Journal with AI Reflections",
  description:
    "Aire It Out is a voice journaling app that turns your spoken words into AI reflections, morning intentions, and a personal night sky of memories. Free on iOS and Android.",
  keywords: "voice journal, audio diary, AI reflection, daily journal app, mood tracker, morning intention, voice journaling, speaking journal, emotional wellness, mental health app, star sessions, night sky journal",
  icons: {
    icon: "/aire-logo.png",
    apple: "/aire-logo.png",
  },
  openGraph: {
    title: "Aire It Out — Voice Journal with AI Reflections",
    description:
      "Speak freely. Get gentle AI reflections. Watch your words become stars in your personal night sky. Free on iOS and Android.",
    url: "https://aireitout.app",
    siteName: "Aire It Out",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
