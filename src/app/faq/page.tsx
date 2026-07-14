"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

// Custom Premium SVGs
const IconHelp = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconFolder = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const IconSettings = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconDollar = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <path d="M17 9H13.5a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3H12" />
  </svg>
);

const IconChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

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
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="py-24 relative overflow-hidden text-center">
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.05}
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
          >
            FAQ Center
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.15}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
          >
            Frequently Asked<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Questions</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed mb-10"
          >
            Find immediate answers regarding pricing, project timelines, security audits, and our software engineering methods.
          </motion.p>

          {/* Filters */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.35}
            className="flex gap-2 justify-center flex-wrap"
          >
            {(["all", "general", "process", "billing"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => { setActiveFilter(filter); setActiveFaq(null); }}
                className={`py-2 px-5 rounded-lg text-xs font-semibold cursor-pointer border transition-all duration-205 flex items-center gap-2 ${
                  activeFilter === filter
                    ? "bg-violet-600/10 text-violet-700 border-violet-600/30 shadow-sm"
                    : "bg-slate-900/5 text-slate-650 border-slate-900/10 hover:text-slate-950"
                }`}
              >
                {filter === "all" && <><IconHelp /> Show All</>}
                {filter === "general" && <><IconFolder /> General Info</>}
                {filter === "process" && <><IconSettings /> Our Process</>}
                {filter === "billing" && <><IconDollar /> Billing & Support</>}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Accordions */}
      <section className="py-12 border-t border-slate-900/10">
        <div className="w-11/12 max-w-[760px] mx-auto">
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.map((faq, index) => {
                const isSelected = activeFaq === index;
                return (
                  <motion.div
                    key={faq.q}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(isSelected ? null : index)}
                      className="w-full py-5 px-6 flex justify-between items-center bg-transparent border-none text-slate-800 font-bold text-sm text-left cursor-pointer hover:text-violet-600 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <IconChevronRight className={`w-4 h-4 text-violet-600 transition-transform duration-200 ${isSelected ? "rotate-90" : ""}`} />
                    </button>
                    {isSelected && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-slate-505 text-xs leading-relaxed border-t border-slate-900/5 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="text-center mt-16">
            <p className="text-slate-505 text-xs mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-block py-3 px-8 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all"
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
