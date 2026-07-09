"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { portfolioItems, getPortfolioBySlug } from "@/lib/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

const categoryIcon: Record<string, string> = {
  "Web Development": "🖥️",
  "E-Commerce":      "🛍️",
  "Mobile Apps":     "📱",
  "UI/UX Design":    "🎨",
  "AI Integration":  "🤖",
  "Cloud & DevOps":  "☁️",
};

export default function PortfolioDetailPage({ params }: Props) {
  const { slug } = use(params);
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    let foundItem = null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.portfolio) {
          foundItem = parsed.portfolio.find((p: any) => p.slug === slug);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (!foundItem) {
      foundItem = getPortfolioBySlug(slug);
    }
    setItem(foundItem);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a] text-[#fff]">
        Loading project details...
      </div>
    );
  }

  if (!item) notFound();

  return (
    <div className="bg-[#080d1a] text-[#f1f5f9] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-cyan-500/[0.06] w-[500px] h-[500px] -top-[150px] -right-[120px]" />
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[300px] h-[300px] -bottom-[60px] -left-[60px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1]">
          <Link className="items-center gap-2 text-slate-400 text-sm mb-8" href="/portfolio" style={{display: "inline-flex"}}>
            ← Back to Portfolio
          </Link>
          <div className="flex gap-3 mb-5" style={{flexWrap: "wrap"}}>
            <span className="py-1 px-3.5 rounded-full text-xs font-semibold bg-violet-600/[0.12] text-[#a78bfa]">{item.category}</span>
            <span className="py-1 px-3.5 rounded-full text-xs text-slate-400 border border-white/[0.06]">{item.year}</span>
          </div>
          <h1 className="text-[clamp(32px,5vw,64px)] font-black tracking-tight mb-4">{item.title}</h1>
          <p className="text-slate-600 text-lg mb-0">Client: <strong className="text-[#f1f5f9]">{item.client}</strong></p>
        </div>
      </section>

      {/* ── Thumbnail ─────────────────────────────────────────── */}
      <div className="w-11/12 max-w-[1400px] mx-auto mt-[-40px] relative z-[2]">
        <div className="h-[360px] rounded-[24px] bg-[linear-gradient(135deg,rgba(124,58,237,0.25),rgba(6,182,212,0.2))] flex items-center justify-center text-[100px] border border-white/[0.06]">
          {categoryIcon[item.category] ?? "📁"}
        </div>
      </div>

      {/* ── Case Study Content ────────────────────────────────── */}
      <section className="py-[100px] md:py-[70px]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="case-study-grid grid grid-cols-[2fr_1fr] gap-[60px] items-start">
            {/* Main content */}
            <div>
              {[
                { label: "The Challenge", text: item.challenge },
                { label: "Our Solution",  text: item.solution },
              ].map((block) => (
                <div className="mb-12" key={block.label}>
                  <h2 className="text-[26px] font-bold mb-4">{block.label}</h2>
                  <p className="text-slate-600 text-base leading-relaxed">{block.text}</p>
                </div>
              ))}

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                <div className="flex gap-2.5" style={{flexWrap: "wrap"}}>
                  {item.tags.map((tag: string) => (
                    <span className="py-1.5 px-4 rounded-full text-[13px] font-medium bg-violet-600/[0.1] border border-violet-600/[0.2] text-[#a78bfa]" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Result card */}
              <div className="p-8 rounded-[20px] bg-[linear-gradient(135deg,rgba(52,211,153,0.1),rgba(6,182,212,0.08))] border border-[rgba(52,211,153,0.2)] mb-6">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.08em] mb-3">Result</p>
                <p className="text-[17px] font-bold text-[#34d399] leading-normal">{item.result}</p>
              </div>

              {/* Details card */}
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-[20px] mb-6">
                <h3 className="text-[17px] font-bold mb-5">Project Info</h3>
                {[
                  { label: "Client",   value: item.client },
                  { label: "Category", value: item.category },
                  { label: "Year",     value: item.year },
                ].map((row) => (
                  <div className="flex justify-between py-3 px-0" key={row.label} style={{borderBottom: "1px solid rgba(255,255,255,0.05)"}}>
                    <span className="text-slate-400 text-sm">{row.label}</span>
                    <span className="font-semibold text-sm">{row.value}</span>
                  </div>
                ))}
              </div>

              <Link className="block text-center py-3.5 px-6 rounded-xl font-bold text-[15px] bg-gradient-to-br from-violet-600 to-indigo-600 text-[#fff]" href="/contact" style={{boxShadow: "0 0 30px rgba(124,58,237,0.4)"}}>
                Start a Similar Project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) { .case-study-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
