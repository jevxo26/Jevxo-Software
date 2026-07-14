"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";
import { portfolioItems as defaultPortfolioItems, portfolioCategories } from "@/lib/data/portfolio";

// Custom Premium SVGs
const IconMonitor = () => (
  <svg className="w-16 h-16 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const IconCart = () => (
  <svg className="w-16 h-16 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-16 h-16 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const IconPalette = () => (
  <svg className="w-16 h-16 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03456 19.176 5.0999 19.434 5.02108 19.6708L4.69047 20.6627C4.4842 21.2815 4.94528 21.9213 5.59792 21.9928C5.73034 22.0073 5.86438 22.0072 5.99676 21.9925L7.26083 21.852C7.5262 21.8225 7.79155 21.9238 7.97858 22.1108L8.15857 22.2908C8.94803 23.0803 10.0988 23.3644 11.1643 23.0336C11.4395 22.9481 11.724 22.9818 11.9754 23.1293L12 23.1436" />
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
  </svg>
);

const IconBrain = () => (
  <svg className="w-16 h-16 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const IconCloud = () => (
  <svg className="w-16 h-16 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

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
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="w-11/12 max-w-[1400px] mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.05}
              className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-cyan-600/20 bg-cyan-600/[0.04] text-xs font-bold text-cyan-700 uppercase tracking-wider mb-5"
            >
              Our Work
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.15}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            >
              Projects That <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Move Needles</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.25}
              className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed"
            >
              A curated selection of the work we&apos;re most proud of — real projects with real outcomes for real businesses.
            </motion.p>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="py-12 border-t border-slate-900/10">
          <div className="w-11/12 max-w-[1400px] mx-auto">
            
            {/* Category filter */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.3}
              className="flex gap-2 flex-wrap justify-center mb-14"
            >
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`py-2 px-5 rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${
                    active === cat
                      ? "bg-violet-600/10 text-violet-750 border-violet-600/30"
                      : "bg-slate-900/5 text-slate-650 border-slate-900/10 hover:text-slate-950"
                  }`}
                >{cat}</button>
              ))}
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    whileHover="hover"
                    className="h-full"
                  >
                    <Link href={`/portfolio/${item.slug}`} className="block h-full">
                      <motion.div
                        variants={hoverLift}
                        className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col justify-between"
                      >
                        {/* Thumbnail */}
                        <div className="h-[220px] bg-gradient-to-br from-violet-100 to-cyan-50 flex items-center justify-center relative border-b border-slate-900/5">
                          {item.category === "Web Development" && <IconMonitor />}
                          {item.category === "E-Commerce"      && <IconCart />}
                          {item.category === "Mobile Apps"     && <IconPhone />}
                          {item.category === "UI/UX Design"    && <IconPalette />}
                          {item.category === "AI Integration"  && <IconBrain />}
                          {item.category === "Cloud & DevOps"  && <IconCloud />}
                          {item.featured && (
                            <div className="absolute top-4 right-4 py-1 px-3 rounded-full bg-violet-600 text-[10px] font-bold text-white uppercase tracking-wider">
                              Featured
                            </div>
                          )}
                        </div>
                        
                        <div className="p-7 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex gap-2 mb-3.5 flex-wrap">
                              <span className="py-0.5 px-2.5 rounded bg-violet-600/10 text-[10px] font-bold text-violet-700 uppercase tracking-wider">{item.category}</span>
                              <span className="py-0.5 px-2.5 rounded bg-slate-900/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.year}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{item.title}</h3>
                            <p className="text-slate-400 text-xs mb-3">Client: {item.client}</p>
                            <p className="text-slate-505 text-xs leading-relaxed mb-5">{item.description}</p>
                          </div>
                          
                          <div>
                            <div className="flex gap-1.5 flex-wrap mb-4">
                              {item.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="py-0.5 px-2.5 rounded bg-slate-900/5 border border-slate-900/10 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{tag}</span>
                              ))}
                            </div>
                            <div className="text-violet-600 text-xs font-bold uppercase tracking-wider">
                              View Case Study →
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                No projects in this category yet.
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-slate-900/10">
          <div className="w-11/12 max-w-[1400px] mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.05}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            >
              Want to Be Our Next <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Success Story?</span>
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.15}
              className="text-slate-505 text-base max-w-[620px] mx-auto mb-9 leading-relaxed"
            >
              Tell us about your project and let&apos;s create something remarkable together.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.25}
            >
              <Link href="/contact" className="py-4 px-10 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all inline-block">
                Start a Project →
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
