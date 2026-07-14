"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { 
  Globe, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  GraduationCap, 
  Utensils, 
  Briefcase, 
  Rocket 
} from "lucide-react";

const solutions = [
  { id: "1", title: "Custom Websites", desc: "High-performance marketing & corporate sites powered by Next.js.", icon: Globe, tag: "Website" },
  { id: "2", title: "E-commerce Engine", desc: "Headless commerce solutions with lightning-fast checkout flows.", icon: ShoppingCart, tag: "Ecommerce" },
  { id: "3", title: "Jevxo CRM", desc: "Lead tracking, pipeline visualizers, and conversion insights.", icon: BarChart3, tag: "CRM" },
  { id: "4", title: "Jevxo HRM", desc: "Staff attendance, leave management, and growth trackers.", icon: Users, tag: "HRM" },
  { id: "5", title: "Jevxo School", desc: "Student management, grading systems, and fee portals.", icon: GraduationCap, tag: "School" },
  { id: "6", title: "Jevxo Restaurant", desc: "POS integration, tables management, and digital menu builders.", icon: Utensils, tag: "Restaurant" },
  { id: "7", title: "Business Suite", desc: "General ERP, invoicing, and asset tracking for large operations.", icon: Briefcase, tag: "Business Mgmt" },
  { id: "8", title: "Marketing Hub", desc: "Automated social posting, email drip campaigns, and ROI tracking.", icon: Rocket, tag: "Marketing" },
];

export default function SolutionsSection() {
  return (
    <section className="py-24 border-t border-slate-900/10 relative" id="solutions">
      <div className="absolute w-[300px] h-[300px] top-24 -right-24 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none opacity-30" />
      <div className="w-11/12 max-w-[1400px] mx-auto">
        <ScrollReveal variant="slideUp">
          <div className="text-center mb-16">
            <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
              Solutions
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Tailored Systems for <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Every Department</span>
            </h2>
            <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
              Explore the individual SaaS modules that can be activated instantly inside your Jevxo Client portal.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {solutions.map((sol, idx) => (
            <ScrollReveal key={sol.id} variant="slideUp" delay={idx * 100} duration={500} className="h-full">
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-8 rounded-2xl flex flex-col h-full">
                <div className="text-violet-600 mb-4 transition-transform duration-300 hover:scale-125 hover:rotate-6 w-fit">
                  <sol.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{sol.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">{sol.desc}</p>
                <div className="inline-flex text-xs font-semibold text-violet-700 bg-violet-600/10 px-2.5 py-1 rounded-md w-fit">
                  {sol.tag}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="slideUp" delay={300}>
          <div className="text-center mt-10">
            <Link href="/products" className="inline-block px-7 py-3 rounded-lg bg-violet-600/10 border border-violet-600/30 text-violet-700 font-bold text-sm hover:bg-violet-600/20 transition-all duration-200">
              Explore Our Software Products →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
