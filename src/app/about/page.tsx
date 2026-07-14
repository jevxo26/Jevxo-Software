"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { teamMembers, stats } from "@/lib/data/team";
import { Lightbulb, ShieldCheck, Handshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden text-center pt-[140px] pb-[60px]">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[500px] h-[500px] -top-[200px] -right-[100px]" />
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-cyan-500/[0.06] w-[350px] h-[350px] -bottom-[100px] -left-[80px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1]">
          <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/[0.3] bg-violet-600/[0.08] text-xs font-semibold text-violet-700 mb-6 uppercase tracking-widest">
            Our Story
          </div>
          <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tight mb-6">
            Engineering the <br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Future of SaaS Platforms</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-[560px] mx-auto leading-relaxed">
            Jevxo is a global digital software studio creating robust operating ecosystems for companies of all sizes.
          </p>
        </div>
      </section>
 
      {/* Core Values Section */}
      <section className="py-[100px] md:py-[70px] border-t border-slate-900/[0.08]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="text-center mb-[60px]">
            <h2 className="text-4xl font-extrabold">Our Core Beliefs</h2>
            <p className="text-slate-600 text-[15px] mt-2">These principles guide our product designs and network expansions.</p>
          </div>
 
          <div className="about-grid grid grid-cols-3 gap-7">
            <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-2xl  ">
              <div className="mb-4 text-violet-600"><Lightbulb className="w-8 h-8" /></div>
              <h3 className="text-lg font-bold mb-3">Continuous Innovation</h3>
              <p className="text-sm text-slate-600 leading-normal">We continuously build, optimize, and iterate our SaaS engines to leverage the newest web advancements.</p>
            </div>
            <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-2xl  ">
              <div className="mb-4 text-violet-600"><ShieldCheck className="w-8 h-8" /></div>
              <h3 className="text-lg font-bold mb-3">Reliable Performance</h3>
              <p className="text-sm text-slate-600 leading-normal">Our nodes are built to guarantee 99.99% uptime with enterprise DDoS protection and SSL defaults.</p>
            </div>
            <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-2xl  ">
              <div className="mb-4 text-violet-600"><Handshake className="w-8 h-8" /></div>
              <h3 className="text-lg font-bold mb-3">Ecosystem Collaboration</h3>
              <p className="text-sm text-slate-600 leading-normal">We scale via partnerships, White-labeling programs, and gamified sales networks to reward regional leaders.</p>
            </div>
          </div>
        </div>
      </section>
 
      {/* Country Sales Network Highlight */}
      <section className="py-[100px] md:py-[70px] bg-section-gradient border-t border-slate-900/[0.08]">
        <div className="w-11/12 max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Our Country Sales Network</h2>
          <p className="text-slate-600 text-[15px] max-w-[560px] mx-auto mb-9 leading-relaxed">
            Jevxo operates across distinct regional nodes governed by local Country Partner Directors. We empower localized teams to handle software sales and service integration.
          </p>
 
          <Link className="inline-block py-3.5 px-[30px] rounded-[10px] bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all font-bold text-sm" href="/partners">
            View Our Country Sales Partners
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-[100px] md:py-[70px] border-t border-slate-900/[0.08]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="about-stats-grid grid grid-cols-4 gap-6">
            {stats.map((st, idx) => (
              <div key={idx} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 py-[30px] px-6 rounded-xl text-center  ">
                <div className="text-[40px] font-black text-violet-600 mb-2">
                  {st.value}{st.suffix}
                </div>
                <div className="text-[15px] font-bold text-slate-900 mb-1">{st.label}</div>
                <p className="text-xs text-slate-600 leading-normal">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-[100px] md:py-[70px] bg-section-gradient border-t border-slate-900/[0.08] pb-[100px]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="text-center mb-[60px]">
            <h2 className="text-4xl font-extrabold">Ecosystem Leadership Team</h2>
            <p className="text-slate-600 text-[15px] mt-2">The engineers and system architects behind the Jevxo framework.</p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-7">
            {teamMembers.map((m) => (
              <div key={m.id} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-[30px] rounded-2xl text-center  ">
                <div className="w-[80px] h-[80px] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-slate-900" style={{background: "linear-gradient(135deg, #7c3aed, #06b6d4)"}}>
                  {m.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold mb-1">{m.name}</h3>
                <div className="text-xs font-semibold text-[#06b6d4] mb-3 uppercase">{m.role}</div>
                <p className="text-[13px] text-slate-600 leading-normal">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .about-grid, .about-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>

    </div>
  );
}
