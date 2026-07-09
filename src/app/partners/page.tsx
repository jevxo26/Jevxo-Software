"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface CountrySalesPartner {
  country: string;
  flag: string;
  partnerName: string;
  rank: string;
  conversions: number;
  revenueGenerated: string;
  commissionEarned: string;
  status: "Active" | "Pending Review";
}

const initialPartners: CountrySalesPartner[] = [
  { country: "Bangladesh", flag: "🇧🇩", partnerName: "Aftab Farhan", rank: "Elite Partner Director", conversions: 124, revenueGenerated: "$180,000", commissionEarned: "$54,000", status: "Active" },
  { country: "United States", flag: "🇺🇸", partnerName: "David Miller", rank: "Grandmaster Partner", conversions: 142, revenueGenerated: "$520,000", commissionEarned: "$78,000", status: "Active" },
  { country: "United Kingdom", flag: "🇬🇧", partnerName: "Sarah Jenkins", rank: "Prime Partner", conversions: 85, revenueGenerated: "$240,000", commissionEarned: "$36,000", status: "Active" },
  { country: "United Arab Emirates", flag: "🇦🇪", partnerName: "Omar Al-Mansoori", rank: "Elite Partner", conversions: 40, revenueGenerated: "$150,000", commissionEarned: "$22,500", status: "Active" },
  { country: "Singapore", flag: "🇸🇬", partnerName: "Lee Wei", rank: "Pro Partner", conversions: 30, revenueGenerated: "$110,000", commissionEarned: "$16,500", status: "Active" },
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
    <div className="bg-[#080d1a] text-[#f1f5f9] min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden pt-[140px] pb-[60px]">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[500px] h-[500px] -top-[200px] -left-[100px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
          <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/[0.3] bg-violet-600/[0.08] text-xs font-semibold text-[#a78bfa] mb-6 uppercase tracking-widest">
            Global Networks
          </div>
          <h1 className="text-[clamp(36px,6vw,64px)] font-black tracking-tight mb-5">
            Country Sales<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Partner Roster</span>
          </h1>
          <p className="text-[17px] text-slate-600 max-w-[580px] mx-auto leading-relaxed">
            Meet the regional partner directors leading software distribution nodes and earning high-yield lifetime commissions.
          </p>
        </div>
      </section>

      {/* Roster Grid */}
      <section className="py-[100px] md:py-[70px] pb-[60px]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mb-[60px]">
            {partnersList.map((p) => (
              <div key={p.country} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-2xl bg-white/[0.01] border-white/[0.06]">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[30px]">{p.flag}</span>
                    <strong className="text-lg text-[#fff]">{p.country}</strong>
                  </div>
                  <span className="text-[11px] font-bold py-0.5 px-2.5 rounded-full bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.2)]">
                    {p.status}
                  </span>
                </div>

                <div className="pb-4 mb-4" style={{borderBottom: "1px solid rgba(255,255,255,0.06)"}}>
                  <span className="block text-[11px] text-slate-400 uppercase">Partner Director</span>
                  <strong className="text-[15px] text-[#fff]">{p.partnerName}</strong>
                  <span className="block text-xs text-[#a78bfa] mt-0.5">{p.rank}</span>
                </div>

                <div className="grid grid-cols-[1fr_1fr] gap-3">
                  <div>
                    <span className="block text-[10px] text-slate-400">Total Sales</span>
                    <strong className="text-sm text-[#fff]">{p.conversions}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Total Volume</span>
                    <strong className="text-sm text-[#fff]">{p.revenueGenerated}</strong>
                  </div>
                  <div className="border-t border-[1px dashed rgba(255,255,255,0.05)] pt-2 mt-1" style={{gridColumn: "span 2"}}>
                    <span className="block text-[10px] text-slate-400">Lifetime Commission Earned</span>
                    <strong className="text-[15px] text-[#06b6d4]">{p.commissionEarned}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-[100px] md:py-[70px] bg-section-gradient border-t border-slate-900/[0.08] pb-[100px]">
        <div className="w-11/12 max-w-[1400px] mx-auto max-w-[600px]">
          <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-10 rounded-[20px] bg-[rgba(8,13,26,0.4)]">
            <div className="text-center mb-8">
              <h2 className="text-[26px] font-extrabold">Join the Partner Program</h2>
              <p className="text-slate-600 text-[13px] mt-1.5">Earn up to 30% lifetime revenue share representing Jevxo software suites in your region.</p>
            </div>

            {submitted ? (
              <div className="text-center py-[30px] px-0">
                <span className="text-[40px]">🤝</span>
                <h3 className="text-xl font-bold text-[#10b981] mt-3 mb-2">Application Logged!</h3>
                <p className="text-slate-600 text-[13px]">Our partner evaluation team will review your application credentials within 48 hours.</p>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleApply}>
                <div>
                  <label className="block text-xs font-bold text-[#a78bfa] uppercase mb-2">Full Name</label>
                  <input className="w-full p-3 rounded-lg border border-[var(--border)] bg-white/[0.02] text-[#fff] text-sm"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#a78bfa] uppercase mb-2">Email Address</label>
                  <input className="w-full p-3 rounded-lg border border-[var(--border)] bg-white/[0.02] text-[#fff] text-sm"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-[1fr_1fr] gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#a78bfa] uppercase mb-2">Target Country</label>
                    <select className="w-full p-3 rounded-lg border border-[var(--border)] bg-[#0c1524] text-[#fff] text-sm"
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
                    <label className="block text-xs font-bold text-[#a78bfa] uppercase mb-2">Current Domain</label>
                    <select className="w-full p-3 rounded-lg border border-[var(--border)] bg-[#0c1524] text-[#fff] text-sm"
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

                <button className="p-3.5 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 border-[none] text-[#fff] font-bold text-sm mt-2"
                  type="submit"
                  style={{cursor: "pointer"}}
                >
                  Submit Partner Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
