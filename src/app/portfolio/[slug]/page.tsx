"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioItems, getPortfolioBySlug } from "@/lib/data/portfolio";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

type Props = { params: Promise<{ slug: string }> };

// Custom Premium SVGs
const IconMonitor = () => (
  <svg className="w-20 h-20 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const IconCart = () => (
  <svg className="w-20 h-20 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-20 h-20 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const IconPalette = () => (
  <svg className="w-20 h-20 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03456 19.176 5.0999 19.434 5.02108 19.6708L4.69047 20.6627C4.4842 21.2815 4.94528 21.9213 5.59792 21.9928C5.73034 22.0073 5.86438 22.0072 5.99676 21.9925L7.26083 21.852C7.5262 21.8225 7.79155 21.9238 7.97858 22.1108L8.15857 22.2908C8.94803 23.0803 10.0988 23.3644 11.1643 23.0336C11.4395 22.9481 11.724 22.9818 11.9754 23.1293L12 23.1436" />
  </svg>
);

const IconCpu = () => (
  <svg className="w-20 h-20 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
  </svg>
);

const IconCloud = () => (
  <svg className="w-20 h-20 text-violet-600/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const IconArrowLeft = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Web Development": return <IconMonitor />;
    case "E-Commerce":      return <IconCart />;
    case "Mobile Apps":     return <IconPhone />;
    case "UI/UX Design":    return <IconPalette />;
    case "AI Integration":  return <IconCpu />;
    case "Cloud & DevOps":  return <IconCloud />;
    default:                return <IconMonitor />;
  }
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
      <div className="min-h-screen flex items-center justify-center bg-transparent text-slate-900">
        <span className="text-slate-505 text-sm font-semibold">Loading project details...</span>
      </div>
    );
  }

  if (!item) notFound();

  return (
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <div className="flex-1 pt-20">
        
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.05}
            >
              <Link className="inline-flex items-center gap-2 text-slate-405 text-xs font-bold uppercase tracking-wider mb-8 hover:text-violet-600 transition-colors" href="/portfolio">
                <IconArrowLeft /> Back to Portfolio
              </Link>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.1}
              className="flex gap-3 mb-5 flex-wrap"
            >
              <span className="py-1 px-3.5 rounded bg-violet-600/10 text-violet-750 text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
              <span className="py-1 px-3.5 rounded bg-slate-900/5 text-slate-505 text-[10px] font-bold uppercase tracking-wider">{item.year}</span>
            </motion.div>

            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.15}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4"
            >
              {item.title}
            </motion.h1>
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.2}
              className="text-slate-505 text-sm md:text-base leading-relaxed"
            >
              Client: <strong className="text-slate-900 font-bold">{item.client}</strong>
            </motion.p>
          </div>
        </section>

        {/* Thumbnail */}
        <section className="py-4">
          <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              custom={0.1}
              className="h-[360px] rounded-2xl bg-gradient-to-br from-violet-600/5 to-indigo-600/5 flex items-center justify-center border border-slate-900/5"
            >
              {getCategoryIcon(item.category)}
            </motion.div>
          </div>
        </section>

        {/* Case Study Content */}
        <section className="py-16">
          <div className="w-11/12 max-w-[1700px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              
              {/* Main content */}
              <div className="lg:col-span-2">
                {[
                  { label: "The Challenge", text: item.challenge },
                  { label: "Our Solution",  text: item.solution },
                ].map((block, idx) => (
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    variants={fadeUp}
                    custom={idx * 0.08}
                    className="mb-12" 
                    key={block.label}
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">{block.label}</h2>
                    <p className="text-slate-550 text-sm md:text-base leading-relaxed">{block.text}</p>
                  </motion.div>
                ))}

                {/* Tags */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                  custom={0.2}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Technologies Used</h3>
                  <div className="flex gap-2 flex-wrap">
                    {item.tags.map((tag: string) => (
                      <span className="py-1 px-3 rounded bg-slate-900/5 border border-slate-900/10 text-[10px] font-bold text-slate-550 uppercase tracking-wider" key={tag}>{tag}</span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-6">
                {/* Result card */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={scaleIn}
                  custom={0.15}
                  className="p-8 rounded-2xl bg-emerald-600/5 border border-emerald-600/20"
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Result</p>
                  <p className="text-base font-bold text-emerald-650 leading-relaxed">{item.result}</p>
                </motion.div>

                {/* Details card */}
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={scaleIn}
                  custom={0.2}
                  className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl"
                >
                  <h3 className="text-base font-bold text-slate-900 mb-5">Project Info</h3>
                  {[
                    { label: "Client",   value: item.client },
                    { label: "Category", value: item.category },
                    { label: "Year",     value: item.year },
                  ].map((row) => (
                    <div className="flex justify-between py-3 px-0 border-b border-slate-900/5 last:border-0" key={row.label}>
                      <span className="text-slate-400 text-xs">{row.label}</span>
                      <span className="font-bold text-slate-800 text-xs">{row.value}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={scaleIn}
                  custom={0.25}
                >
                  <Link className="block text-center py-3.5 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all w-full" href="/contact">
                    Start a Similar Project →
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
