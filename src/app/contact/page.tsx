"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, MapPin, Clock, Check } from "lucide-react";

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
  { icon: <Mail className="w-6 h-6 text-violet-600" />, label: "Email",    value: "hello@jevxo.com",     href: "mailto:hello@jevxo.com" },
  { icon: <MapPin className="w-6 h-6 text-violet-600" />, label: "Location", value: "Remote-first · Worldwide", href: "#" },
  { icon: <Clock className="w-6 h-6 text-violet-600" />, label: "Response", value: "Within 24 hours",     href: "#" },
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
      
      // Simulate frontend submission response delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(15, 23, 42, 0.08)",
    background: "#f8fafc",
    color: "#0f172a",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[500px] h-[500px] -top-[150px] -right-[100px]" />
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-cyan-500/[0.06] w-[350px] h-[350px] -bottom-[80px] -left-[60px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
          <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/[0.3] bg-violet-600/[0.08] text-xs font-semibold text-violet-700 mb-6 uppercase tracking-widest">
            Get In Touch
          </div>
          <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tight mb-6">
            Let&apos;s Build Something<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Extraordinary</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-[520px] mx-auto leading-relaxed">
            Tell us about your project. We respond to every enquiry within 24 hours and offer a free 30-minute discovery call.
          </p>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────────── */}
      <section className="py-[100px] md:py-[70px]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="contact-grid grid grid-cols-[3fr_2fr] gap-[60px] items-start">
            {/* Form */}
            <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-12 rounded-[28px]">
              {status === "success" ? (
                <div className="text-center py-10 px-0">
                  <div className="text-[64px] mb-6">🎉</div>
                  <h2 className="text-[28px] font-extrabold mb-3">Message Received!</h2>
                  <p className="text-slate-600 text-base">
                    Thanks for reaching out. We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-[26px] font-bold mb-9">Start a Project</h2>

                  {/* Name + Email */}
                  <div className="form-row grid grid-cols-[1fr_1fr] gap-5 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-600 mb-2 uppercase tracking-wider">Your Name *</label>
                      <input className="w-full px-[18px] py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-[15px] outline-none transition-[border-color] duration-200 focus:border-violet-500/50" type="text" required placeholder="Alex Johnson"
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.08)"; }}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-600 mb-2 uppercase tracking-wider">Email Address *</label>
                      <input className="w-full px-[18px] py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-[15px] outline-none transition-[border-color] duration-200 focus:border-violet-500/50" type="email" required placeholder="alex@company.com"
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.08)"; }}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-slate-600 mb-2 uppercase tracking-wider">Company (optional)</label>
                    <input className="w-full px-[18px] py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-[15px] outline-none transition-[border-color] duration-200 focus:border-violet-500/50" type="text" placeholder="Acme Corp"
                      value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.08)"; }}
                    />
                  </div>

                  {/* Service + Budget */}
                  <div className="form-row grid grid-cols-[1fr_1fr] gap-5 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-600 mb-2 uppercase tracking-wider">Service Needed</label>
                      <select className="w-full px-[18px] py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-[15px] outline-none transition-[border-color] duration-200 focus:border-violet-500/50 "
                        value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-slate-600 mb-2 uppercase tracking-wider">Budget Range</label>
                      <select className="w-full px-[18px] py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-[15px] outline-none transition-[border-color] duration-200 focus:border-violet-500/50 "
                        value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      >
                        <option value="">Select budget</option>
                        {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <label className="block text-[13px] font-semibold text-slate-600 mb-2 uppercase tracking-wider">Tell Us About Your Project *</label>
                    <textarea 
                      className="w-full px-[18px] py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-[15px] outline-none transition-[border-color] duration-200 focus:border-violet-500/50 min-h-[140px]" 
                      style={{resize: "vertical"}} 
                      required
                      placeholder="Give us an overview of what you're looking to build, your timeline, and any other relevant details..."
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.08)"; }}
                    />
                  </div>

                  {status === "error" && (
                    <div className="py-3.5 px-5 rounded-xl bg-red-55 border border-red-200 text-red-700 text-sm mb-5">
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <button className="w-full py-4 px-8 rounded-[14px] font-bold text-base bg-gradient-to-br from-violet-600 to-indigo-600 text-white border-[none]" type="submit" disabled={status === "sending"} style={{cursor: status === "sending" ? "not-allowed" : "pointer", opacity: status === "sending" ? 0.7 : 1, boxShadow: "0 0 30px rgba(124,58,237,0.4)", transition: "all 0.2s ease"}}>
                    {status === "sending" ? "Sending…" : "Send Message →"}
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="flex flex-col gap-5">
              {contactInfo.map((info) => (
                <a className="block" key={info.label} href={info.href}>
                  <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 py-6 px-7 rounded-[14px] flex items-center gap-4" style={{transition: "all 0.2s ease"}}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(15, 23, 42, 0.08)"; }}
                  >
                    <div className="text-[28px]">{info.icon}</div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{info.label}</p>
                      <p className="text-[15px] font-semibold">{info.value}</p>
                    </div>
                  </div>
                </a>
              ))}

              {/* Trust badges */}
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-7 rounded-[14px] mt-2">
                <h4 className="text-[15px] font-bold mb-4">Why Work With Us?</h4>
                {[
                  "Free 30-min discovery call",
                  "No obligation quote within 48h",
                  "Fixed-price or time & materials",
                  "Dedicated project manager",
                  "100% satisfaction guarantee",
                ].map((item) => (
                  <div className="flex items-center gap-2.5 mb-3" key={item}>
                    <div className="w-[18px] h-[18px] rounded-full bg-[rgba(52,211,153,0.2)] border border-[rgba(52,211,153,0.4)] flex items-center justify-center text-[10px] text-[#34d399]" style={{flexShrink: 0}}>✓</div>
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row     { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
