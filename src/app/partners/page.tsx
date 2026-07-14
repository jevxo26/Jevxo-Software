"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

// Custom Premium SVGs
const IconGlobe = () => (
  <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconHandshake = () => (
  <svg className="w-16 h-16 text-violet-600 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

interface CountrySalesPartner {
  country: string;
  partnerName: string;
  rank: string;
  conversions: number;
  revenueGenerated: string;
  commissionEarned: string;
  status: "Active" | "Pending Review";
}

const initialPartners: CountrySalesPartner[] = [
  { country: "Bangladesh", partnerName: "Aftab Farhan", rank: "Elite Partner Director", conversions: 124, revenueGenerated: "$180,000", commissionEarned: "$54,000", status: "Active" },
  { country: "United States", partnerName: "David Miller", rank: "Grandmaster Partner", conversions: 142, revenueGenerated: "$520,000", commissionEarned: "$78,000", status: "Active" },
  { country: "United Kingdom", partnerName: "Sarah Jenkins", rank: "Prime Partner", conversions: 85, revenueGenerated: "$240,000", commissionEarned: "$36,000", status: "Active" },
  { country: "United Arab Emirates", partnerName: "Omar Al-Mansoori", rank: "Elite Partner", conversions: 40, revenueGenerated: "$150,000", commissionEarned: "$22,500", status: "Active" },
  { country: "Singapore", partnerName: "Lee Wei", rank: "Pro Partner", conversions: 30, revenueGenerated: "$110,000", commissionEarned: "$16,500", status: "Active" },
];

export default function PartnersPage() {
  const [partnersList] = useState<CountrySalesPartner[]>(initialPartners);
  const [formData, setFormData] = useState({ name: "", email: "", country: "Bangladesh", experience: "Agency Owner" });
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", country: "Bangladesh", experience: "Agency Owner" });
    }, 4000);
  };

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
            Global Networks
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.15}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
          >
            Country Sales<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Partner Roster</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed"
          >
            Meet the regional partner directors leading software distribution nodes and earning high-yield lifetime commissions.
          </motion.p>
        </div>
      </section>

      {/* Roster Grid */}
      <section className="py-12 border-t border-slate-900/10">
        <div className="w-11/12 max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {partnersList.map((p, idx) => (
              <motion.div
                key={p.country}
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
                  className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex items-center gap-2">
                        <IconGlobe />
                        <strong className="text-base text-slate-900">{p.country}</strong>
                      </div>
                      <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-emerald-500/10 text-emerald-700 uppercase tracking-wider">
                        {p.status}
                      </span>
                    </div>

                    <div className="pb-4 mb-4 border-b border-slate-900/5">
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Partner Director</span>
                      <strong className="text-sm text-slate-900">{p.partnerName}</strong>
                      <span className="block text-xs font-semibold text-violet-650 mt-0.5">{p.rank}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Total Sales</span>
                      <strong className="text-sm text-slate-900">{p.conversions}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Total Volume</span>
                      <strong className="text-sm text-slate-900">{p.revenueGenerated}</strong>
                    </div>
                    <div className="border-t border-slate-900/5 pt-3 mt-1 col-span-2">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Lifetime Commission Earned</span>
                      <strong className="text-base text-cyan-600">{p.commissionEarned}</strong>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 border-t border-slate-900/10">
        <div className="w-11/12 max-w-[640px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={scaleIn}
            custom={0.1}
            className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-10 rounded-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Join the Partner Program</h2>
              <p className="text-slate-505 text-xs mt-2">Earn up to 30% lifetime revenue share representing Jevxo software suites in your region.</p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8 flex flex-col items-center justify-center"
                >
                  <IconHandshake />
                  <h3 className="text-lg font-bold text-emerald-600 mb-2">Application Logged!</h3>
                  <p className="text-slate-550 text-xs">Our partner evaluation team will review your application credentials within 48 hours.</p>
                </motion.div>
              ) : (
                <form className="flex flex-col gap-5" onSubmit={handleApply}>
                  <div>
                    <label className="block text-xs font-bold text-violet-650 uppercase mb-2">Full Name</label>
                    <input 
                      className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all duration-200"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-violet-650 uppercase mb-2">Email Address</label>
                    <input 
                      className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all duration-200"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-violet-650 uppercase mb-2">Target Country</label>
                      <select 
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all duration-200"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      >
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-violet-650 uppercase mb-2">Current Domain</label>
                      <select 
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all duration-200"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      >
                        <option value="Agency Owner">Agency Owner</option>
                        <option value="Sales Professional">Sales Professional</option>
                        <option value="Freelancer">Freelancer / Developer</option>
                        <option value="Other">Other Category</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    type="submit"
                  >
                    Submit Partner Application
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
