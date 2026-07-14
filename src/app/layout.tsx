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
    default: "Jevxo — B2B B2C Enterprise Software Company",
    template: "%s | Jevxo",
  },
  description:
    "Jevxo is a premium enterprise software company building high-performance B2B SaaS tools, custom business operating platforms, and corporate cloud software systems.",
  keywords: ["enterprise software", "B2B SaaS", "business management", "custom CRM", "school ERP", "Next.js"],
  openGraph: {
    title: "Jevxo — Enterprise Software Company & B2B SaaS Suite",
    description: "Engineering robust operating ecosystems for modern businesses.",
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
