"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

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
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        
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
              Careers
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.15}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            >
              Join the <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Jevxo Crew</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.25}
              className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed"
            >
              Help us engineer the next generation of SaaS business automation operating systems.
            </motion.p>
          </div>
        </section>

        {/* Main Grid */}
        <section className="py-12 border-t border-slate-900/10">
          <div className="w-11/12 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              
              {/* Openings list */}
              <div className="lg:col-span-3">
                <motion.h2 
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                  custom={0.1}
                  className="text-2xl font-bold mb-6 text-slate-900"
                >
                  Open Positions
                </motion.h2>
                <div className="flex flex-col gap-5">
                  {jobOpenings.map((job, idx) => (
                    <motion.div
                      key={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportSettings}
                      variants={scaleIn}
                      custom={idx * 0.08}
                      whileHover="hover"
                    >
                      <motion.div
                        variants={hoverLift}
                        className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-7 rounded-2xl"
                      >
                        <div className="flex justify-between items-start gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                          <span className="text-xs font-bold text-violet-700 bg-violet-600/10 px-2.5 py-1 rounded">{job.salary}</span>
                        </div>
                        <div className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-3.5">{job.type}</div>
                        <p className="text-sm text-slate-505 leading-relaxed">{job.desc}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Application form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={scaleIn}
                custom={0.2}
                className="lg:col-span-2 bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-10 rounded-2xl h-auto"
              >
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-10"
                    >
                      <div className="text-5xl mb-4">🎉</div>
                      <h3 className="text-xl font-bold mb-2 text-emerald-600">Application Logged!</h3>
                      <p className="text-slate-505 text-sm">Thank you. Our HR panel recruitment team will review your credentials.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmitApply}>
                      <h3 className="text-xl font-bold mb-6 text-slate-900">Submit Application</h3>
                      
                      <div className="mb-4">
                        <label className="block text-xs font-bold text-violet-650 uppercase mb-2">Full Name</label>
                        <input 
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all duration-200"
                          type="text"
                          required
                          value={applyForm.name}
                          onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-xs font-bold text-violet-650 uppercase mb-2">Email Address</label>
                        <input 
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all duration-200"
                          type="email"
                          required
                          value={applyForm.email}
                          onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-xs font-bold text-violet-650 uppercase mb-2">Position Applying For</label>
                        <select 
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all duration-200"
                          value={applyForm.position}
                          onChange={(e) => setApplyForm({ ...applyForm, position: e.target.value })}
                        >
                          <option value="NextJS Dev">Senior Next.js Developer</option>
                          <option value="UI/UX Designer">Lead UI/UX Designer</option>
                          <option value="Sales Exec">Outbound Sales Executive</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="block text-xs font-bold text-violet-650 uppercase mb-2">Portfolio / Resume Link</label>
                        <input 
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all duration-200"
                          type="url"
                          placeholder="https://..."
                          required
                          value={applyForm.portfolio}
                          onChange={(e) => setApplyForm({ ...applyForm, portfolio: e.target.value })}
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-xs font-bold text-violet-650 uppercase mb-2">Cover Letter Notes</label>
                        <textarea 
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all duration-200"
                          rows={4}
                          value={applyForm.message}
                          onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                        />
                      </div>

                      <button 
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                        type="submit"
                      >
                        Submit Application
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>

            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
