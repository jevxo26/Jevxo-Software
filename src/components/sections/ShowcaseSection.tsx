"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";
import { portfolioItems, portfolioCategories } from "@/lib/data/portfolio";

const IconLaptop = () => (
  <svg className="w-12 h-12 text-violet-600 opacity-80 group-hover:scale-125 group-hover:rotate-6 transition-all duration-350" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
    <line x1="12" y1="17" x2="12" y2="20" />
  </svg>
);

export default function ShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPortfolio = activeCategory === "All"
    ? portfolioItems.filter(item => item.featured)
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 border-t border-slate-900/10 bg-transparent" id="showcase">
      <div className="w-11/12 max-w-[1400px] mx-auto">
        
        <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.05}
              className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
            >
              Showcase
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.15}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Proven Digital <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Deliverables</span>
            </motion.h2>
          </div>
          {/* Category Filter Pills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.25}
            className="flex gap-2 flex-wrap"
          >
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${activeCategory === cat
                  ? "border-violet-600/30 bg-violet-600/10 text-violet-700 shadow-sm"
                  : "border-slate-900/10 bg-slate-900/5 text-slate-600 hover:text-slate-950"
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.3 }}
                whileHover="hover"
                className="h-full"
              >
                <motion.div
                  variants={hoverLift}
                  className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-2xl overflow-hidden flex flex-col h-full group"
                >
                  {/* Image Placeholder with Gradients */}
                  <div className="h-[200px] bg-gradient-to-br from-violet-100 to-cyan-50 flex items-center justify-center relative border-b border-slate-900/5 overflow-hidden">
                    <IconLaptop />
                    <div className="absolute bottom-4 left-4 bg-white/90 border border-slate-900/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                    <div className="text-xs text-slate-500 mb-4">Client: {item.client} | {item.year}</div>
                    <p className="text-sm text-slate-550 leading-relaxed flex-1 mb-5">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.tags.map((t) => (
                        <span key={t} className="px-2 py-1 rounded bg-slate-900/5 border border-slate-900/10 text-[10px] font-semibold text-slate-600">{t}</span>
                      ))}
                    </div>

                    <div className="border-t border-slate-900/5 pt-4 text-xs">
                      <span className="text-violet-600 font-bold">Result: </span>
                      <span className="text-slate-650">{item.result}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
