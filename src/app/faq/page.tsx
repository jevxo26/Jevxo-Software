"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Folder, Settings, CircleDollarSign, ChevronRight, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  cat: "general" | "process" | "billing";
}

const faqs: FAQItem[] = [
  {
    cat: "general",
    q: "What types of software does Jevxo specialize in?",
    a: "We specialize in high-performance web applications (Next.js/React), mobile app development (Flutter/React Native), custom enterprise CRM systems, database architecture integrations, and scalable cloud hosting infrastructure."
  },
  {
    cat: "general",
    q: "Do I own the intellectual property and code rights?",
    a: "Absolutely. Once the project is fully delivered and paid for, you own 100% of the proprietary source code, assets, database structures, and intellectual property. We hand over all GitHub repositories and server admin keys."
  },
  {
    cat: "process",
    q: "How does the development process work?",
    a: "We work in agile phases. It starts with Discovery and wireframing, followed by high-fidelity UI/UX design. Once designs are approved, we build, QA-test, and deploy to stage servers for client feedback before launching live."
  },
  {
    cat: "process",
    q: "How long does a standard software project take?",
    a: "Simple portals or MVPs can be built in 4 to 6 weeks. More complex SaaS platforms, database-driven CRMs, or multi-role dashboards typically range from 8 to 12 weeks from discovery to cloud launch."
  },
  {
    cat: "billing",
    q: "What are your payment structures?",
    a: "We usually split project fees into milestone payments: 30% upfront on discovery launch, 40% at design and prototype sign-off, and 30% upon final QA sign-off and cloud hand-over. Subscription products are billed monthly."
  },
  {
    cat: "billing",
    q: "Do you offer post-launch maintenance and support?",
    a: "Yes! Every custom build includes 30 days of free post-launch support. Afterward, you can opt for our node maintenance packages for continuous security updates, hosting metric audits, and feature extensions."
  }
];

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "general" | "process" | "billing">("all");

  const filteredFaqs = activeFilter === "all" ? faqs : faqs.filter(f => f.cat === activeFilter);

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden pt-[140px] pb-[60px]">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[500px] h-[500px] -top-[200px] -right-[100px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
          <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/30 bg-violet-600/8 text-xs font-semibold text-violet-700 mb-6 uppercase tracking-widest">
            FAQ Center
          </div>
          <h1 className="text-[clamp(36px,6vw,64px)] font-black tracking-tight mb-5">
            Frequently Asked<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-[17px] text-slate-600 max-w-[580px] mx-auto mb-10 leading-relaxed">
            Find immediate answers regarding pricing, project timelines, security audits, and our software engineering methods.
          </p>

          {/* Filters */}
          <div className="flex gap-2.5 justify-center flex-wrap">
            {(["all", "general", "process", "billing"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => { setActiveFilter(filter); setActiveFaq(null); }}
                className={`py-2.5 px-6 rounded-xl text-[13px] font-bold cursor-pointer border border-solid transition-all duration-200 flex items-center gap-2 ${
                  activeFilter === filter
                    ? "bg-violet-600/15 text-violet-750 border-violet-600/30"
                    : "bg-slate-100 text-slate-750 border-slate-200 hover:bg-slate-200 hover:border-slate-350"
                }`}
              >
                {filter === "all" && <><HelpCircle className="w-4 h-4" /> Show All</>}
                {filter === "general" && <><Folder className="w-4 h-4" /> General Info</>}
                {filter === "process" && <><Settings className="w-4 h-4" /> Our Process</>}
                {filter === "billing" && <><CircleDollarSign className="w-4 h-4" /> Billing & Support</>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordions */}
      <section className="py-[100px] md:py-[70px] pb-25">
        <div className="w-11/12 max-w-[1400px] mx-auto max-w-[720px]">
          <div className="flex flex-col gap-4">
            {filteredFaqs.map((faq, index) => {
              const isSelected = activeFaq === index;
              return (
                <div
                  key={faq.q}
                  className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 rounded-xl   overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isSelected ? null : index)}
                    className="w-full py-5 px-6 flex justify-between items-center bg-transparent border-none text-slate-800 font-bold text-[15px] text-left cursor-pointer hover:text-violet-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-violet-600 transition-transform duration-200 ${isSelected ? "rotate-90" : ""}`} />
                  </button>
                  {isSelected && (
                    <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-white/[0.04] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-[60px]">
            <p className="text-slate-600 text-sm mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-block py-3 px-7 rounded-[10px] text-sm font-bold bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
