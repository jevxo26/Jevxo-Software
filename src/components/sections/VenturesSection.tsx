"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { 
  Zap, 
  GraduationCap, 
  Utensils, 
  Briefcase, 
  Target, 
  Sparkles 
} from "lucide-react";

const ventures = [
  { title: "Jevxo Web", desc: "Global design & engineering studio crafting high-end SaaS applications and experiences.", icon: Zap, focus: "UI/UX & Engineering" },
  { title: "Jevxo School", desc: "E-learning and educational administrative networks serving institutions worldwide.", icon: GraduationCap, focus: "EdTech Systems" },
  { title: "Jevxo Restaurant", desc: "Unified kitchen management, order tracking, and table optimization platforms.", icon: Utensils, focus: "F&B SaaS Solutions" },
  { title: "Jevxo Business", desc: "Comprehensive Enterprise Resource Planning and logistics operating suites.", icon: Briefcase, focus: "Corporate ERP" },
  { title: "Jevxo Marketing", desc: "AI-driven automated marketing campaigns, SEO auditing, and ad management hubs.", icon: Target, focus: "Growth Automation" },
  { title: "Future Ventures", desc: "Investing in next-generation decentralized databases and AI-agent business systems.", icon: Sparkles, focus: "R&D and Ventures" },
];

export default function VenturesSection() {
  return (
    <section className="py-24 border-t border-slate-900/10 bg-white/50 relative" id="ventures">
      <div className="w-11/12 max-w-[1400px] mx-auto">
        <ScrollReveal variant="slideUp">
          <div className="text-center mb-16">
            <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
              Ventures
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Our Ecosystem of <span className="bg-gradient-to-br from-pink-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">Active Enterprises</span>
            </h2>
            <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
              Jevxo operates specialized subsidiary companies, each dedicated to engineering and managing specific industries.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {ventures.map((v, idx) => (
            <ScrollReveal key={idx} variant="slideUp" delay={idx * 150} duration={600} className="h-full">
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-8 rounded-2xl flex gap-5 group h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 text-white shadow-md shadow-violet-600/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <v.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{v.title}</h3>
                  <div className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-3">{v.focus}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
