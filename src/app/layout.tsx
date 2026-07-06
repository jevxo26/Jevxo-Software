import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  variable: "--font-bai-jamjuree",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jevxo — Digital Agency & Software Studio",
    template: "%s | Jevxo",
  },
  description:
    "Jevxo is a full-service digital agency building high-performance web applications, mobile apps, and AI-powered products for ambitious companies worldwide.",
  keywords: ["digital agency", "web development", "UI/UX design", "mobile apps", "AI integration", "Next.js"],
  openGraph: {
    title: "Jevxo — Digital Agency & Software Studio",
    description: "Building the digital products of tomorrow, today.",
    url: "https://jevxo.com",
    siteName: "Jevxo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={baiJamjuree.variable}>
      <body>{children}</body>
    </html>
  );
}
