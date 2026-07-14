"use client";

import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";
import { teamMembers } from "@/lib/data/team";

export default function TeamSection() {
  return (
    <section className="py-24 border-t border-slate-900/10 bg-transparent" id="team">
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
            Our Team
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.15}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            Ecosystem <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Architects &amp; Leadership</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto mt-4 text-base leading-relaxed"
          >
            The developers, system operators, designers, and growth experts building the core Jevxo framework.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((m, idx) => (
            <motion.div
              key={m.id}
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
                className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-7 rounded-2xl text-center group h-full flex flex-col justify-between"
              >
                <div>
                  {/* Fake Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-white shadow-md shadow-violet-600/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-350">
                    {m.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{m.name}</h3>
                  <div className="text-xs font-semibold text-cyan-600 mb-3 uppercase tracking-wider">{m.role}</div>
                  <p className="text-xs text-slate-505 leading-relaxed mb-5">{m.bio}</p>
                </div>
                <div className="flex justify-center gap-3">
                  {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-violet-600 transition-colors">LinkedIn</a>}
                  {m.twitter && <a href={m.twitter} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-violet-600 transition-colors">Twitter</a>}
                  {m.github && <a href={m.github} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-violet-600 transition-colors">GitHub</a>}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
