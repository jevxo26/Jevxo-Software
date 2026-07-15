import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import StoreProvider from "@/components/providers/StoreProvider";

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
      <body className="relative bg-slate-50 text-slate-900 min-h-screen overflow-x-hidden">
        {/* Premium Ambient Lighting & Grid Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Soft dot grid background */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Subtle mesh background glows */}
          <div className="absolute top-[5%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/5 blur-[140px] mix-blend-multiply" />
          <div className="absolute top-[25%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-cyan-500/5 blur-[120px] mix-blend-multiply" />
          <div className="absolute top-[55%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/5 blur-[160px] mix-blend-multiply" />
          <div className="absolute top-[75%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-500/5 blur-[130px] mix-blend-multiply" />
          <div className="absolute bottom-[2%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-cyan-400/5 blur-[110px] mix-blend-multiply" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <StoreProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
