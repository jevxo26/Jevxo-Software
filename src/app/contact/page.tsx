"use client";

import { useState } from "react";
import type { Metadata } from "next";

// Note: metadata export not supported in client components.
// Move metadata to a parent server component if needed.
// For now the root layout handles the default title.

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
  { icon: "✉️", label: "Email",    value: "hello@jevxo.com",     href: "mailto:hello@jevxo.com" },
  { icon: "📍", label: "Location", value: "Remote-first · Worldwide", href: "#" },
  { icon: "🕐", label: "Response", value: "Within 24 hours",     href: "#" },
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
      
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    color: "#f1f5f9",
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
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="orb orb-violet" style={{ width: "500px", height: "500px", top: "-150px", right: "-100px" }} />
        <div className="orb orb-cyan"   style={{ width: "350px", height: "350px", bottom: "-80px", left: "-60px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Get In Touch
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            Let&apos;s Build Something<br /><span className="gradient-text">Extraordinary</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
            Tell us about your project. We respond to every enquiry within 24 hours and offer a free 30-minute discovery call.
          </p>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "60px", alignItems: "start" }} className="contact-grid">
            {/* Form */}
            <div className="glass" style={{ padding: "48px", borderRadius: "var(--radius-xl)" }}>
              {status === "success" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "64px", marginBottom: "24px" }}>🎉</div>
                  <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "12px" }}>Message Received!</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
                    Thanks for reaching out. We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "36px" }}>Start a Project</h2>

                  {/* Name + Email */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="form-row">
                    <div>
                      <label style={labelStyle}>Your Name *</label>
                      <input style={inputStyle} type="text" required placeholder="Alex Johnson"
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input style={inputStyle} type="email" required placeholder="alex@company.com"
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Company (optional)</label>
                    <input style={inputStyle} type="text" placeholder="Acme Corp"
                      value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>

                  {/* Service + Budget */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="form-row">
                    <div>
                      <label style={labelStyle}>Service Needed</label>
                      <select style={{ ...inputStyle, cursor: "pointer" }}
                        value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Budget Range</label>
                      <select style={{ ...inputStyle, cursor: "pointer" }}
                        value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      >
                        <option value="">Select budget</option>
                        {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "32px" }}>
                    <label style={labelStyle}>Tell Us About Your Project *</label>
                    <textarea style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }} required
                      placeholder="Give us an overview of what you're looking to build, your timeline, and any other relevant details..."
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>

                  {status === "error" && (
                    <div style={{ padding: "14px 20px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5", fontSize: "14px", marginBottom: "20px" }}>
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <button type="submit" disabled={status === "sending"} style={{
                    width: "100%",
                    padding: "16px 32px",
                    borderRadius: "14px",
                    fontWeight: 700,
                    fontSize: "16px",
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    color: "#fff",
                    border: "none",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.7 : 1,
                    boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                    transition: "all 0.2s ease",
                  }}>
                    {status === "sending" ? "Sending…" : "Send Message →"}
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {contactInfo.map((info) => (
                <a key={info.label} href={info.href} style={{ display: "block" }}>
                  <div className="glass" style={{ padding: "24px 28px", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "16px", transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                  >
                    <div style={{ fontSize: "28px" }}>{info.icon}</div>
                    <div>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>{info.label}</p>
                      <p style={{ fontSize: "15px", fontWeight: 600 }}>{info.value}</p>
                    </div>
                  </div>
                </a>
              ))}

              {/* Trust badges */}
              <div className="glass" style={{ padding: "28px", borderRadius: "var(--radius-md)", marginTop: "8px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Why Work With Us?</h4>
                {[
                  "Free 30-min discovery call",
                  "No obligation quote within 48h",
                  "Fixed-price or time & materials",
                  "Dedicated project manager",
                  "100% satisfaction guarantee",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(52,211,153,0.2)", border: "1px solid rgba(52,211,153,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#34d399", flexShrink: 0 }}>✓</div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row     { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
