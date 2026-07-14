"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function JobsPage() {
  const [applyForm, setApplyForm] = useState({ name: "", email: "", position: "NextJS Dev", portfolio: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmitApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setApplyForm({ name: "", email: "", position: "NextJS Dev", portfolio: "", message: "" });
    }, 5000);
  };

  const [jobOpenings, setJobOpenings] = useState([
    { title: "Senior Next.js Developer", type: "Full-Time / Remote", salary: "$4,000 - $6,000 / mo", desc: "Responsible for developing enterprise dashboard routers, real-time sync systems, and modular components." },
    { title: "Lead UI/UX Designer", type: "Full-Time / Hybrid Dhaka", salary: "$2,500 - $4,000 / mo", desc: "Design elegant dark glassmorphic layouts, user onboarding micro-animations, and client portal libraries." },
    { title: "Outbound Sales Executive", type: "Commission-Based / Remote", salary: "High Incentives + base", desc: "Partner with regional agencies, identify country nodes, and sign up clients to Jevxo enterprise plans." }
  ]);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.jobOpenings) setJobOpenings(parsed.jobOpenings);
      } catch (e) {
        console.error("Failed to load jobs from CMS", e);
      }
    }
  }, []);

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden text-center pt-[120px]">
          <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[500px] h-[500px] -top-[200px] -right-[100px]" />
          <div className="rounded-full blur-[80px] pointer-events-none absolute bg-cyan-500/[0.06] w-[350px] h-[350px] -bottom-[100px] -left-[80px]" />
          <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1]">
          <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/[0.3] bg-violet-600/[0.08] text-xs font-semibold text-violet-700 mb-6 uppercase tracking-widest">
            Careers
          </div>
          <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tight mb-6">
            Join the <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Jevxo Crew</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-[560px] mx-auto leading-relaxed">
            Help us engineer the next generation of SaaS business automation operating systems.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-[100px] md:py-[70px] border-t border-slate-900/[0.08]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="jobs-container grid grid-cols-[1.6fr_1.4fr] gap-10">
            
            {/* Openings list */}
            <div>
              <h2 className="text-2xl font-extrabold mb-6">Open Positions</h2>
              <div className="flex flex-col gap-5">
                {jobOpenings.map((job, idx) => (
                  <div key={idx} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-7 rounded-2xl">
                    <div className="flex justify-between gap-3 mb-2" style={{flexWrap: "wrap"}}>
                      <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                      <span className="text-xs font-bold text-violet-700">{job.salary}</span>
                    </div>
                    <div className="text-xs text-slate-600 mb-3.5">{job.type}</div>
                    <p className="text-sm text-slate-600 leading-normal">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Application form */}
            <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-10 rounded-2xl h-[fit-content]">
              {success ? (
                <div className="text-center py-10 px-0">
                  <div className="text-[48px] mb-4">🎉</div>
                  <h3 className="text-[22px] font-bold mb-2 text-[#10b981]">Application Logged!</h3>
                  <p className="text-slate-600 text-sm">Thank you. Our HR panel recruitment team will review your credentials.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApply}>
                  <h3 className="text-xl font-extrabold mb-6">Submit Application</h3>
                  
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-violet-700 uppercase mb-2">Full Name</label>
                    <input className="w-full py-3 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm"
                      type="text"
                      required
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-violet-700 uppercase mb-2">Email Address</label>
                    <input className="w-full py-3 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm"
                      type="email"
                      required
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-violet-700 uppercase mb-2">Position Applying For</label>
                    <select className="w-full py-3 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm"
                      value={applyForm.position}
                      onChange={(e) => setApplyForm({ ...applyForm, position: e.target.value })}
                    >
                      <option value="NextJS Dev">Senior Next.js Developer</option>
                      <option value="UI/UX Designer">Lead UI/UX Designer</option>
                      <option value="Sales Exec">Outbound Sales Executive</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-violet-700 uppercase mb-2">Portfolio / Resume Link</label>
                    <input className="w-full py-3 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm"
                      type="url"
                      placeholder="https://..."
                      required
                      value={applyForm.portfolio}
                      onChange={(e) => setApplyForm({ ...applyForm, portfolio: e.target.value })}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-bold text-violet-700 uppercase mb-2">Cover Letter Notes</label>
                    <textarea className="w-full py-3 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm"
                      rows={4}
                      value={applyForm.message}
                      onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                    />
                  </div>

                  <button className="w-full p-4 rounded-[10px] bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-[15px] font-bold border-[none] shadow-lg shadow-violet-600/20"
                    type="submit"
                    style={{cursor: "pointer"}}
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .jobs-container {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>

    </div>
  );
}
