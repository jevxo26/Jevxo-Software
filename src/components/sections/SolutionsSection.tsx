"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

// Inline Premium SVG Icons
const IconGlobe = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
  </svg>
);

const IconCart = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const IconChart = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconUsers = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconGraduation = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const IconUtensils = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M21 15V2v0a5 5 0 0 0-5 5v8h5zm0 0v6h-2v-6" />
  </svg>
);

const IconBriefcase = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconRocket = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5C4 22 6 21 7.5 19.5M12 12l9-9-3 12-6 3-3-3-3 3-3-3 9-9z" />
  </svg>
);

const solutions = [
  { id: "1", title: "Custom Websites", desc: "High-performance marketing & corporate sites powered by Next.js.", Icon: IconGlobe, tag: "Website" },
  { id: "2", title: "E-commerce Engine", desc: "Headless commerce solutions with lightning-fast checkout flows.", Icon: IconCart, tag: "Ecommerce" },
  { id: "3", title: "Jevxo CRM", desc: "Lead tracking, pipeline visualizers, and conversion insights.", Icon: IconChart, tag: "CRM" },
  { id: "4", title: "Jevxo HRM", desc: "Staff attendance, leave management, and growth trackers.", Icon: IconUsers, tag: "HRM" },
  { id: "5", title: "Jevxo School", desc: "Student management, grading systems, and fee portals.", Icon: IconGraduation, tag: "School" },
  { id: "6", title: "Jevxo Restaurant", desc: "POS integration, tables management, and digital menu builders.", Icon: IconUtensils, tag: "Restaurant" },
  { id: "7", title: "Business Suite", desc: "General ERP, invoicing, and asset tracking for large operations.", Icon: IconBriefcase, tag: "Business Mgmt" },
  { id: "8", title: "Marketing Hub", desc: "Automated social posting, email drip campaigns, and ROI tracking.", Icon: IconRocket, tag: "Marketing" },
];

export default function SolutionsSection() {
  return (
    <section className="py-24 border-t border-slate-900/10 relative bg-transparent" id="solutions">
      <div className="absolute w-[300px] h-[300px] top-24 -right-24 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none opacity-30" />
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
            Solutions
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.15}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            Tailored Systems for <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Every Department</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.25}
            className="text-slate-500 max-w-[620px] mx-auto mt-4 text-base leading-relaxed"
          >
            Explore the individual SaaS modules that can be activated instantly inside your Jevxo Client portal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {solutions.map((sol, idx) => (
            <motion.div
              key={sol.id}
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
                className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/25 transition-all duration-300 p-8 rounded-2xl flex flex-col h-full"
              >
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  className="text-violet-600 mb-4 w-fit"
                >
                  <sol.Icon />
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{sol.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">{sol.desc}</p>
                <div className="inline-flex text-xs font-semibold text-violet-700 bg-violet-600/10 px-2.5 py-1 rounded-md w-fit">
                  {sol.tag}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp}
          custom={0.3}
          className="text-center mt-12"
        >
          <Link href="/products" className="inline-block px-8 py-4 rounded-xl bg-violet-600/10 border border-violet-600/30 text-violet-700 font-bold text-sm hover:bg-violet-600/20 hover:-translate-y-0.5 transition-all duration-200">
            Explore Our Software Products →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
