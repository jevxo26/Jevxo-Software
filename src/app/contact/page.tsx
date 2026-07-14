"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

// Custom Premium SVGs
const IconMail = () => (
  <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconMapPin = () => (
  <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock = () => (
  <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const services = [
  "Web Development",
  "UI/UX Design",
  "Mobile Apps",
  "Cloud & DevOps",
  "AI Integration",
  "Digital Strategy",
  "Not sure yet",
];

const budgets = [
  "< $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Let's discuss",
];

const contactInfo = [
  { Icon: IconMail, label: "Email", value: "hello@jevxo.com", href: "mailto:hello@jevxo.com" },
  { Icon: IconMapPin, label: "Location", value: "Remote-first · Worldwide", href: "#" },
  { Icon: IconClock, label: "Response", value: "Within 24 hours", href: "#" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const newMsg = {
      id: `msg_${Date.now()}`,
      name: form.name,
      email: form.email,
      type: form.service || "General Inquiry",
      budget: form.budget || "Not Specified",
      message: form.message,
      submittedAt: new Date().toISOString()
    };
    try {
      const stored = localStorage.getItem("jevxo_contact_messages");
      const current = stored ? JSON.parse(stored) : [];
      localStorage.setItem("jevxo_contact_messages", JSON.stringify([newMsg, ...current]));
      
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <div className="flex-1 pt-20">
        
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.05}
              className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
            >
              Get In Touch
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.15}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            >
              Let&apos;s Build Something<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Extraordinary</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.25}
              className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed"
            >
              Tell us about your project. We respond to every enquiry within 24 hours and offer a free 30-minute discovery call.
            </motion.p>
          </div>
        </section>

        {/* Form + Info */}
        <section className="py-12 border-t border-slate-900/10">
          <div className="w-11/12 max-w-[1700px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              
              {/* Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={scaleIn}
                custom={0.1}
                className="lg:col-span-3 bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-10 rounded-2xl"
              >
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-10"
                    >
                      <div className="text-5xl mb-4">🎉</div>
                      <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Message Received!</h2>
                      <p className="text-slate-505 text-sm">
                        Thanks for reaching out. We&apos;ll be in touch within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h2 className="text-xl font-bold mb-8 text-slate-900">Start a Project</h2>

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label className="block text-xs font-bold text-violet-600 mb-2 uppercase tracking-wider">Your Name *</label>
                          <input 
                            className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200" 
                            type="text" 
                            required 
                            placeholder="Alex Johnson"
                            value={form.name} 
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-violet-600 mb-2 uppercase tracking-wider">Email Address *</label>
                          <input 
                            className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200" 
                            type="email" 
                            required 
                            placeholder="alex@company.com"
                            value={form.email} 
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div className="mb-5">
                        <label className="block text-xs font-bold text-violet-600 mb-2 uppercase tracking-wider">Company (optional)</label>
                        <input 
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200" 
                          type="text" 
                          placeholder="Acme Corp"
                          value={form.company} 
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                        />
                      </div>

                      {/* Service + Budget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label className="block text-xs font-bold text-violet-600 mb-2 uppercase tracking-wider">Service Needed</label>
                          <select 
                            className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                            value={form.service} 
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                          >
                            <option value="">Select a service</option>
                            {services.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-violet-600 mb-2 uppercase tracking-wider">Budget Range</label>
                          <select 
                            className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                            value={form.budget} 
                            onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          >
                            <option value="">Select budget</option>
                            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="mb-8">
                        <label className="block text-xs font-bold text-violet-600 mb-2 uppercase tracking-wider">Tell Us About Your Project *</label>
                        <textarea 
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200 min-h-[140px]" 
                          style={{ resize: "vertical" }} 
                          required
                          placeholder="Give us an overview of what you're looking to build, your timeline, and any other relevant details..."
                          value={form.message} 
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </div>

                      {status === "error" && (
                        <div className="py-3 px-5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 text-xs mb-5">
                          Something went wrong. Please try again or email us directly.
                        </div>
                      )}

                      <button 
                        className="w-full py-4 px-8 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer" 
                        type="submit" 
                        disabled={status === "sending"}
                      >
                        {status === "sending" ? "Sending…" : "Send Message →"}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Info sidebar */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {contactInfo.map((info, idx) => (
                  <motion.div
                    key={info.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    variants={scaleIn}
                    custom={idx * 0.08}
                    whileHover="hover"
                  >
                    <a className="block" href={info.href}>
                      <motion.div
                        variants={hoverLift}
                        className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 py-5 px-7 rounded-xl flex items-center gap-4"
                      >
                        <info.Icon />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{info.label}</p>
                          <p className="text-sm font-semibold text-slate-900">{info.value}</p>
                        </div>
                      </motion.div>
                    </a>
                  </motion.div>
                ))}

                {/* Trust badges */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={scaleIn}
                  custom={0.3}
                  className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-xl"
                >
                  <h4 className="text-sm font-bold mb-5 text-slate-900">Why Work With Us?</h4>
                  {[
                    "Free 30-min discovery call",
                    "No obligation quote within 48h",
                    "Fixed-price or time & materials",
                    "Dedicated project manager",
                    "100% satisfaction guarantee",
                  ].map((item) => (
                    <div className="flex items-center gap-2.5 mb-3" key={item}>
                      <span className="text-cyan-600 font-bold">✓</span>
                      <span className="text-slate-505 text-xs">{item}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
