"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Laptop } from "lucide-react";
import { portfolioItems, portfolioCategories } from "@/lib/data/portfolio";

export default function ShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPortfolio = activeCategory === "All"
    ? portfolioItems.filter(item => item.featured)
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 border-t border-slate-900/10" id="showcase">
      <div className="w-11/12 max-w-[1400px] mx-auto">
        <ScrollReveal variant="slideUp">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
            <div>
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                Showcase
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Proven Digital <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Deliverables</span>
              </h2>
            </div>
            {/* Category Filter Pills */}
            <div className="flex gap-2 flex-wrap">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${activeCategory === cat
                    ? "border-violet-600/30 bg-violet-600/10 text-violet-700"
                    : "border-slate-900/10 bg-slate-900/5 text-slate-600 hover:text-slate-950"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPortfolio.map((item, idx) => (
            <ScrollReveal
              key={item.id + "_" + activeCategory}
              variant="scaleUp"
              delay={idx * 100}
              duration={500}
              className="h-full"
            >
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 rounded-2xl overflow-hidden flex flex-col h-full group">
                {/* Image Placeholder with Gradients */}
                <div className="h-[200px] bg-gradient-to-br from-violet-100 to-cyan-50 flex items-center justify-center relative border-b border-slate-900/5 overflow-hidden">
                  <Laptop className="w-12 h-12 text-violet-600 opacity-80 group-hover:scale-125 group-hover:rotate-6 transition-all duration-350" />
                  <div className="absolute bottom-4 left-4 bg-white/90 border border-slate-900/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <div className="text-xs text-slate-500 mb-4">Client: {item.client} | {item.year}</div>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map((t) => (
                      <span key={t} className="px-2 py-1 rounded bg-slate-900/5 border border-slate-900/10 text-[10px] font-semibold text-slate-600">{t}</span>
                    ))}
                  </div>

                  <div className="border-t border-slate-900/5 pt-4 text-xs">
                    <span className="text-violet-600 font-bold">Result: </span>
                    <span className="text-slate-600">{item.result}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
