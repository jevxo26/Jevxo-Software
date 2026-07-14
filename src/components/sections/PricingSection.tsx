"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

interface PlanFeature {
  name: string;
  price: number;
  desc: string;
  features: string[];
}

interface PricingSectionProps {
  plans: PlanFeature[];
}

export default function PricingSection({ plans }: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  return (
    <section className="py-24 border-t border-slate-900/10 bg-transparent" id="pricing">
      <div className="w-11/12 max-w-[1700px] mx-auto">
        
        <div className="text-center mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.05}
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
          >
            Pricing
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.15}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            Transparent <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Software &amp; Hosting</span> Rates
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto mt-4 text-base leading-relaxed"
          >
            Select between monthly billing or save 20% on annual commitments.
          </motion.p>

          {/* Monthly / Annual Toggle */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.35}
            className="inline-flex bg-slate-900/5 border border-slate-900/10 p-1 rounded-full mt-8"
          >
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${billingPeriod === "monthly" ? "bg-violet-600 text-white shadow" : "text-slate-605 hover:text-slate-900"
                }`}
            >Monthly</button>
            <button
              onClick={() => setBillingPeriod("annually")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${billingPeriod === "annually" ? "bg-violet-600 text-white shadow" : "text-slate-650 hover:text-slate-900"
                }`}
            >Annually (Save 20%)</button>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp}
          custom={0.4}
        >
          <h3 className="text-xl font-bold mb-6 text-slate-900 text-center">
            1. Software Suite Plans
          </h3>
        </motion.div>
        
        {/* Software plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {plans.map((p, idx) => {
            const actualPrice = billingPeriod === "annually" ? Math.floor(p.price * 0.8) : p.price;
            const isRecommended = idx === 2;
            return (
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
                  className={`bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl relative h-full flex flex-col justify-between ${isRecommended ? "border-violet-600/35 bg-violet-600/[0.02] shadow-md shadow-violet-600/5" : ""}`}
                >
                  <div>
                    {isRecommended && (
                      <span className="absolute -top-3 right-5 bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Recommended</span>
                    )}
                    <h4 className="text-lg font-bold mb-2 text-slate-900">{p.name}</h4>
                    <p className="text-xs text-slate-505 mb-6 min-h-[38px]">{p.desc}</p>

                    <div className="mb-7">
                      <span className="text-3xl font-extrabold text-slate-900">${actualPrice}</span>
                      <span className="text-xs text-slate-505"> / mo</span>
                    </div>
                  </div>

                  <div>
                    <Link href="/portal" className={`block text-center py-3.5 rounded-xl font-bold text-xs mb-7 border transition-all duration-200 ${isRecommended
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 border-transparent"
                      : "bg-slate-900/5 border-slate-900/10 text-slate-700 hover:bg-slate-900/10"
                      }`}>
                      Get Started
                    </Link>

                    <ul className="flex flex-col gap-3 text-xs text-slate-600">
                      {p.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="text-cyan-600 font-bold">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp}
          custom={0.45}
        >
          <h3 className="text-xl font-bold mb-6 text-slate-900 text-center">
            2. Dedicated Hosting Plans
          </h3>
        </motion.div>

        {/* Hosting plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Starter Cloud Node", price: 15, bandwidth: "500 GB Bandwidth", space: "10 GB NVMe Storage", db: "1 MariaDB / PG Database", ssl: "Free SSL certificate" },
            { name: "Business Cloud Node", price: 45, bandwidth: "2.5 TB Bandwidth", space: "80 GB NVMe Storage", db: "10 Databases", ssl: "Free Wildcard SSL + Cloudflare CDN" },
            { name: "Enterprise Dedicated Server", price: 120, bandwidth: "Unlimited Bandwidth", space: "500 GB NVMe SSD Storage", db: "Unlimited Databases", ssl: "Advanced DDoS Mitigation & Load Balancing" },
          ].map((p, idx) => {
            const actualPrice = billingPeriod === "annually" ? Math.floor(p.price * 0.8) : p.price;
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={scaleIn}
                custom={idx * 0.1}
                whileHover="hover"
                className="h-full"
              >
                <motion.div
                  variants={hoverLift}
                  className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl h-full flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-lg font-bold mb-2 text-slate-900">{p.name}</h4>
                    <div className="mb-6">
                      <span className="text-3xl font-extrabold text-slate-900">${actualPrice}</span>
                      <span className="text-xs text-slate-505"> / mo</span>
                    </div>

                    <ul className="flex flex-col gap-3 text-xs text-slate-600 mb-7">
                      <li>📊 {p.bandwidth}</li>
                      <li>💾 {p.space}</li>
                      <li>🗄️ {p.db}</li>
                      <li>🔒 {p.ssl}</li>
                      <li>🛡️ 99.99% Uptime Guarantee</li>
                    </ul>
                  </div>

                  <Link href="/portal" className="block text-center py-3 rounded-xl bg-slate-900/5 border border-slate-900/10 font-bold text-xs text-slate-700 hover:bg-slate-900/10 transition-colors">
                    Provision Node
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
