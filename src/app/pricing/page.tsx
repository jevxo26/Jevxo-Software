"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

interface PlanItem {
  name: string;
  price: number;
  desc: string;
  features: string[];
}

const defaultPlans: PlanItem[] = [
  { name: "Starter", price: 29, desc: "For single freelancers or startups", features: ["1 Active Website", "Basic CRM Tracker", "5 Team Seats", "Storage up to 5GB", "Shared Hosting Node"] },
  { name: "Business", price: 79, desc: "For growing regional businesses", features: ["3 Active Websites", "CRM + Automated Reminders", "25 Team Seats", "Storage up to 25GB", "Dedicated Hosting Node", "Intern Evaluators"] },
  { name: "Growth", price: 149, desc: "For scaling multi-region brands", features: ["10 Active Websites", "CRM + Kanban + AI Lead Score", "Unlimited Team Seats", "Storage up to 100GB", "E-commerce Engine Integration", "Basic Marketing Hub (1-4)"] },
  { name: "Enterprise", price: 299, desc: "For global operations and networks", features: ["Unlimited Websites", "All 6 Dashboard Panels", "Custom White-labeling", "Enterprise SLA & Support", "Marketing Hub (All 13 Modules)", "Country Domain Multi-routing"] },
];

export default function PricingPage() {
  const [plans, setPlans] = useState<PlanItem[]>(defaultPlans);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.pricingPlans) setPlans(parsed.pricingPlans);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">

      {/* Hero */}
      <section className="py-24 relative overflow-hidden text-center">
        <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.05}
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
          >
            Pricing Plans
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.15}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
          >
            Transparent pricing for<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Software Scaling</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed mb-10"
          >
            No hidden costs. Choose the tier that matches your active operational scale, or upgrade instantly from your node console.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.35}
            className="inline-flex items-center bg-slate-900/5 border border-slate-900/10 p-1 rounded-xl"
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`py-2 px-5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 ${
                !isYearly
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm"
                  : "bg-transparent text-slate-550 hover:text-slate-950"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`py-2 px-5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 ${
                isYearly
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm"
                  : "bg-transparent text-slate-550 hover:text-slate-950"
              }`}
            >
              Yearly (Save 20%)
            </button>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 border-t border-slate-900/10">
        <div className="w-11/12 max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {plans.map((plan, idx) => {
              const basePrice = plan.price;
              const calculatedPrice = isYearly ? Math.floor(basePrice * 0.8 * 12) : basePrice;
              
              return (
                <motion.div
                  key={plan.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={scaleIn}
                  custom={idx * 0.08}
                  whileHover="hover"
                  className={`h-full flex flex-col justify-between relative ${
                    plan.name === "Growth" ? "lg:scale-[1.03]" : ""
                  }`}
                >
                  {plan.name === "Growth" && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-1 px-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider z-20">
                      Most Popular
                    </span>
                  )}
                  
                  <motion.div
                    variants={hoverLift}
                    className={`bg-white/70 border backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 py-10 px-8 rounded-2xl h-full flex flex-col justify-between ${
                      plan.name === "Growth" ? "border-violet-600/40" : "border-slate-900/[0.08]"
                    }`}
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                      <p className="text-slate-505 text-xs min-h-8 mb-6">{plan.desc}</p>
                      
                      <div className="flex items-baseline gap-1.5 mb-7">
                        <span className="text-4xl font-extrabold text-slate-900">${calculatedPrice}</span>
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">/{isYearly ? "yr" : "mo"}</span>
                      </div>

                      <div className="flex flex-col gap-3 border-t border-slate-900/5 pt-6 mb-8">
                        {plan.features.map((feat) => (
                          <div key={feat} className="flex gap-2.5 items-center">
                            <span className="text-violet-600 font-bold text-xs">✓</span>
                            <span className="text-xs text-slate-505">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className={`block text-center py-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                        plan.name === "Growth"
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-violet-600/20"
                          : "bg-slate-900/5 border border-slate-900/10 text-slate-700 hover:bg-slate-900/10"
                      }`}
                    >
                      Select Plan
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
