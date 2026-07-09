"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { portfolioItems as defaultPortfolioItems, portfolioCategories } from "@/lib/data/portfolio";

export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const [portfolioList, setPortfolioList] = useState(defaultPortfolioItems);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.portfolio) setPortfolioList(parsed.portfolio);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const filtered = active === "All" ? portfolioList : portfolioList.filter((p) => p.category === active);

  return (
    <div className="bg-[#080d1a] text-[#f1f5f9] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden">
          <div className="rounded-full blur-[80px] pointer-events-none absolute bg-cyan-500/[0.06] w-[450px] h-[450px] -top-[150px] -right-[80px]" />
          <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[300px] h-[300px] -bottom-[80px] -left-[60px]" />
          <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
            <div className="inline-block py-1 px-3.5 rounded-full border border-cyan-500/30 bg-cyan-500/8 text-xs font-semibold text-[#67e8f9] mb-6 uppercase tracking-widest">
              Our Work
            </div>
            <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tight mb-6">
              Projects That <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Move Needles</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-[540px] mx-auto leading-relaxed">
              A curated selection of the work we&apos;re most proud of — real projects with real outcomes for real businesses.
            </p>
          </div>
        </section>

        {/* ── Filter + Grid ─────────────────────────────────────── */}
        <section className="py-[100px] md:py-[70px]">
          <div className="w-11/12 max-w-[1400px] mx-auto">
            {/* Category filter */}
            <div className="flex gap-2 flex-wrap justify-center mb-14">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`py-2 px-5 rounded-full text-sm font-medium border cursor-pointer transition-all duration-200 ${
                    active === cat
                      ? "border-violet-600/50 bg-violet-600/15 text-violet-400"
                      : "border-white/8 bg-white/3 text-slate-600 hover:border-white/15"
                  }`}
                >{cat}</button>
              ))}
            </div>

            {/* Grid */}
            <div className="portfolio-grid grid grid-cols-3 gap-6">
              {filtered.map((item) => (
                <Link key={item.id} href={`/portfolio/${item.slug}`} className="block">
                  <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-[20px] overflow-hidden h-full hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] bg-white/[0.01] border-white/[0.06]">
                    {/* Thumbnail */}
                    <div className="h-[220px] bg-gradient-to-br from-violet-600/25 to-cyan-500/18 flex items-center justify-center text-6xl relative">
                      {item.category === "Web Development" && "🖥️"}
                      {item.category === "E-Commerce"      && "🛍️"}
                      {item.category === "Mobile Apps"     && "📱"}
                      {item.category === "UI/UX Design"    && "🎨"}
                      {item.category === "AI Integration"  && "🤖"}
                      {item.category === "Cloud & DevOps"  && "☁️"}
                      {item.featured && (
                        <div className="absolute top-4 right-4 py-1 px-3 rounded-full bg-violet-600/80 text-[11px] font-bold text-white">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-7">
                      <div className="flex gap-2 mb-3.5 flex-wrap">
                        <span className="py-1 px-2.5 rounded-full text-[11px] font-semibold bg-violet-600/12 text-[#a78bfa]">{item.category}</span>
                        <span className="py-1 px-2.5 rounded-full text-[11px] text-slate-400 border border-white/6">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-[13px] mb-3">Client: {item.client}</p>
                      <p className="text-slate-600 text-sm leading-normal mb-5">{item.description}</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="py-0.5 px-2.5 rounded-full text-[11px] bg-white/4 border border-white/7 text-slate-400">{tag}</span>
                        ))}
                      </div>
                      <div className="mt-5 text-[#a78bfa] text-sm font-semibold">
                        View Case Study →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                No projects in this category yet.
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-[60px] md:py-[40px] border-t border-slate-900/[0.08] pt-15 pb-20">
          <div className="w-11/12 max-w-[1400px] mx-auto text-center">
            <h2 className="text-[clamp(26px,4vw,42px)] font-bold mb-4">
              Want to Be Our Next <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Success Story?</span>
            </h2>
            <p className="text-slate-600 text-[17px] mb-9">
              Tell us about your project and let&apos;s create something remarkable together.
            </p>
            <Link href="/contact" className="py-4 px-10 rounded-[14px] font-bold text-[17px] bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_0_40px_rgba(124,58,237,0.4)] inline-block">
              Start a Project →
            </Link>
          </div>
        </section>

      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) { .portfolio-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px) { .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
