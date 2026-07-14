"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { teamMembers } from "@/lib/data/team";

export default function TeamSection() {
  return (
    <section className="py-24 border-t border-slate-900/10 bg-white/50" id="team">
      <div className="w-11/12 max-w-[1400px] mx-auto">
        <ScrollReveal variant="slideUp">
          <div className="text-center mb-16">
            <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
              Our Team
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Ecosystem <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Architects &amp; Leadership</span>
            </h2>
            <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
              The developers, system operators, designers, and growth experts building the core Jevxo core framework.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((m, idx) => (
            <ScrollReveal key={m.id} variant="slideUp" delay={idx * 120} duration={600} className="h-full">
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-7 rounded-2xl text-center group h-full flex flex-col justify-between">
                <div>
                  {/* Fake Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-white shadow-md shadow-violet-600/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-350">
                    {m.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{m.name}</h3>
                  <div className="text-xs font-semibold text-cyan-600 mb-3 uppercase tracking-wider">{m.role}</div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">{m.bio}</p>
                </div>
                <div className="flex justify-center gap-3">
                  {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-violet-600 transition-colors">LinkedIn</a>}
                  {m.twitter && <a href={m.twitter} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-violet-600 transition-colors">Twitter</a>}
                  {m.github && <a href={m.github} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-violet-600 transition-colors">GitHub</a>}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
