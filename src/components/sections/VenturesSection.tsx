"use client";

import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

// Premium Custom SVGs
const IconZap = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconGraduation = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const IconUtensils = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M21 15V2v0a5 5 0 0 0-5 5v8h5zm0 0v6h-2v-6" />
  </svg>
);

const IconBriefcase = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconTarget = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconSparkles = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
  </svg>
);

const ventures = [
  { title: "Jevxo Cloud", desc: "Global design & cloud engineering studio crafting resilient SaaS applications and next-gen interfaces.", Icon: IconZap, focus: "UI/UX & Cloud Engineering" },
  { title: "Jevxo Edu", desc: "Cloud ERP and learning networks serving educational institutions and colleges worldwide.", Icon: IconGraduation, focus: "EdTech Platforms" },
  { title: "Jevxo Retail", desc: "Unified retail point of sale, inventory tracking, and warehouse optimization platforms.", Icon: IconUtensils, focus: "F&B & Retail Systems" },
  { title: "Jevxo Enterprise", desc: "Comprehensive enterprise resource planning, automated accounting, and logistics operating systems.", Icon: IconBriefcase, focus: "Enterprise ERP" },
  { title: "Jevxo InsightPro", desc: "AI-driven automated marketing pipelines, SEO diagnostics, and omni-channel tracking engines.", Icon: IconTarget, focus: "Marketing AI" },
  { title: "Jevxo R&D Labs", desc: "Researching and investing in next-generation decentralized databases and business AI agent frameworks.", Icon: IconSparkles, focus: "R&D & Incubations" },
];

export default function VenturesSection() {
  return (
    <section className="py-24 border-t border-slate-900/10 bg-transparent relative" id="ventures">
      <div className="w-11/12 max-w-[1700px] mx-auto">
        
        <div className="text-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.05}
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
          >
            Ventures
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.15}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            Our Ecosystem of <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Active Enterprises</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto mt-4 text-base leading-relaxed"
          >
            Jevxo operates specialized subsidiary companies, each dedicated to engineering and managing specific industries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {ventures.map((v, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={scaleIn}
              custom={idx * 0.08}
              whileHover="hover"
              className="h-full"
            >
              <motion.div
                variants={hoverLift}
                className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl flex gap-5 group h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 text-white shadow-md shadow-violet-600/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <v.Icon />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{v.title}</h3>
                  <div className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-3">{v.focus}</div>
                  <p className="text-sm text-slate-505 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
