"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";
import { teamMembers, stats } from "@/lib/data/team";

// Custom Premium SVGs
const IconLightbulb = () => (
  <svg className="w-8 h-8 text-violet-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6M10 22h4" />
  </svg>
);

const IconShieldCheck = () => (
  <svg className="w-8 h-8 text-violet-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const IconHandshake = () => (
  <svg className="w-8 h-8 text-violet-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden text-center pt-36 pb-16">
        <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.05}
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
          >
            Our Story
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.15}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
          >
            Engineering the <br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Future of SaaS Platforms</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed"
          >
            Jevxo is a global digital software studio creating robust operating ecosystems for companies of all sizes.
          </motion.p>
        </div>
      </section>
 
      {/* Core Values Section */}
      <section className="py-24 border-t border-slate-900/10">
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
              Core Values
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.15}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Our Core Beliefs
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.25}
              className="text-slate-505 max-w-[620px] mx-auto mt-4 text-base leading-relaxed"
            >
              These principles guide our product designs and network expansions.
            </motion.p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={scaleIn}
              custom={0.1}
              whileHover="hover"
              className="h-full"
            >
              <motion.div
                variants={hoverLift}
                className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl h-full"
              >
                <IconLightbulb />
                <h3 className="text-lg font-bold text-slate-900 mb-3">Continuous Innovation</h3>
                <p className="text-sm text-slate-505 leading-relaxed">We continuously build, optimize, and iterate our SaaS engines to leverage the newest web advancements.</p>
              </motion.div>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={scaleIn}
              custom={0.2}
              whileHover="hover"
              className="h-full"
            >
              <motion.div
                variants={hoverLift}
                className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl h-full"
              >
                <IconShieldCheck />
                <h3 className="text-lg font-bold text-slate-900 mb-3">Reliable Performance</h3>
                <p className="text-sm text-slate-505 leading-relaxed">Our nodes are built to guarantee 99.99% uptime with enterprise DDoS protection and SSL defaults.</p>
              </motion.div>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={scaleIn}
              custom={0.3}
              whileHover="hover"
              className="h-full"
            >
              <motion.div
                variants={hoverLift}
                className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl h-full"
              >
                <IconHandshake />
                <h3 className="text-lg font-bold text-slate-900 mb-3">Ecosystem Collaboration</h3>
                <p className="text-sm text-slate-505 leading-relaxed">We scale via partnerships, White-labeling programs, and gamified sales networks to reward regional leaders.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
  
      {/* Country Sales Network Highlight */}
      <section className="py-24 border-t border-slate-900/10">
        <div className="w-11/12 max-w-[1700px] mx-auto text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.05}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
          >
            Our Country Sales Network
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.15}
            className="text-slate-505 text-base max-w-[620px] mx-auto mb-9 leading-relaxed"
          >
            Jevxo operates across distinct regional nodes governed by local Country Partner Directors. We empower localized teams to handle software sales and service integration.
          </motion.p>
  
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.25}
          >
            <Link className="inline-block py-3.5 px-8 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all font-bold text-sm" href="/partners">
              View Our Country Sales Partners
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-slate-900/10">
        <div className="w-11/12 max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((st, idx) => (
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
                  className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 py-8 px-6 rounded-2xl text-center h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="text-4xl font-extrabold text-violet-600 mb-2">
                      {st.value}{st.suffix}
                    </div>
                    <div className="text-sm font-bold text-slate-900 mb-2">{st.label}</div>
                  </div>
                  <p className="text-xs text-slate-505 leading-relaxed">{st.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 border-t border-slate-900/10">
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
              Leadership
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.15}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Ecosystem Leadership Team
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.25}
              className="text-slate-505 max-w-[620px] mx-auto mt-4 text-base leading-relaxed"
            >
              The engineers and system architects behind the Jevxo framework.
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
                  className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl text-center group h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-white shadow-md shadow-violet-600/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-350 bg-gradient-to-br from-violet-600 to-indigo-600">
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

    </div>
  );
}
