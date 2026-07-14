"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden pt-[140px] pb-[60px]">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[500px] h-[500px] -top-[200px] -right-[100px]" />
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-cyan-500/[0.06] w-[350px] h-[350px] -bottom-[100px] -left-[80px]" />
        
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
          <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/30 bg-violet-600/8 text-xs font-semibold text-violet-700 mb-6 uppercase tracking-widest">
            Pricing Plans
          </div>
          <h1 className="text-[clamp(36px,6vw,64px)] font-black tracking-tight mb-5">
            Transparent pricing for<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Software Scaling</span>
          </h1>
          <p className="text-[17px] text-slate-600 max-w-[580px] mx-auto mb-10 leading-relaxed">
            No hidden costs. Choose the tier that matches your active operational scale, or upgrade instantly from your node console.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-slate-100 border border-slate-200 p-1.5 rounded-full shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
            <button
              onClick={() => setIsYearly(false)}
              className={`py-2.5 px-6 rounded-full text-[13px] font-bold cursor-pointer transition-all duration-300 ${
                !isYearly
                  ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/20"
                  : "bg-transparent text-slate-650 hover:text-slate-850"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`py-2.5 px-6 rounded-full text-[13px] font-bold cursor-pointer transition-all duration-300 ${
                isYearly
                  ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/20"
                  : "bg-transparent text-slate-650 hover:text-slate-850"
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-[100px] md:py-[70px] pb-25">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-7 items-stretch">
            {plans.map((plan, index) => {
              const basePrice = plan.price;
              const calculatedPrice = isYearly ? Math.floor(basePrice * 0.8 * 12) : basePrice;
              
              return (
                <div
                  key={plan.name}
                  className={`bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 py-9 px-[30px] rounded-[20px]   flex flex-col justify-between relative ${
                    plan.name === "Growth" ? "scale-[1.03] shadow-[0_10px_30px_rgba(124,58,237,0.15)] border-violet-600/40" : "border-white/6"
                  }`}
                >
                  {plan.name === "Growth" && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-br from-violet-600 to-indigo-600 text-white py-1 px-3 rounded-full text-[11px] font-bold uppercase">
                      Most Popular
                    </span>
                  )}
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-slate-600 text-[13px] min-h-9 mb-6">{plan.desc}</p>
                    
                    <div className="flex items-baseline gap-1.5 mb-7">
                      <span className="text-[40px] font-extrabold text-slate-900">${calculatedPrice}</span>
                      <span className="text-slate-400 text-sm">/{isYearly ? "yr" : "mo"}</span>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 mb-8">
                      {plan.features.map((feat) => (
                        <div key={feat} className="flex gap-2.5 items-center">
                          <span className="text-violet-600 font-bold text-[13px]">✓</span>
                          <span className="text-[13px] text-slate-600">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className={`block text-center p-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                      plan.name === "Growth"
                        ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30"
                        : "bg-slate-50 border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Select Plan
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
