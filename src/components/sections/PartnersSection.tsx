"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

const partnerPrograms = [
  { name: "White-label Reseller", percent: "40%", description: "Fully white-labeled client portals. Sell Jevxo solutions under your agency brand name, keep 40% of recurrent subscription revenues." },
  { name: "Regional Distributor", percent: "55%", description: "Run national operations. Control payment routing, register local sub-partners, and process local wire transfers." },
  { name: "Lead Broker Network", percent: "15%", description: "Recommend clients through a unique tracking system and earn a passive 15% revenue cut of all monthly SaaS bills." }
];

export default function PartnersSection() {
  return (
    <section className="py-24 border-t border-slate-900/10 bg-transparent relative" id="partners">
      <div className="w-11/12 max-w-[1400px] mx-auto">
        
        <div className="text-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.05}
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
          >
            Partners
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.15}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            Agency &amp; Affiliate <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Partnership Hub</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto mt-4 text-base leading-relaxed"
          >
            Partner with Jevxo to scale software distributions inside your regional or developer networks.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnerPrograms.map((p, idx) => (
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
                className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                    <span className="text-2xl font-black text-cyan-600 bg-cyan-500/10 px-3 py-1 rounded-lg">
                      {p.percent}
                    </span>
                  </div>
                  <p className="text-sm text-slate-505 leading-relaxed mb-8">{p.description}</p>
                </div>

                <Link 
                  href="#contact" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); 
                  }} 
                  className="block text-center py-3 rounded-xl bg-slate-900/5 border border-slate-900/10 font-bold text-xs text-slate-700 hover:bg-slate-900/10 transition-colors"
                >
                  Join Program
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
