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
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1, paddingTop: "80px" }}>
        {/* Hero */}
        <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden", textAlign: "center", paddingTop: "120px" }}>
          <div className="orb orb-violet" style={{ width: "500px", height: "500px", top: "-200px", right: "-100px" }} />
          <div className="orb orb-cyan" style={{ width: "350px", height: "350px", bottom: "-100px", left: "-80px" }} />
          <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Careers
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            Join the <span className="gradient-text">Jevxo Crew</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.8 }}>
            Help us engineer the next generation of SaaS business automation operating systems.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "40px" }} className="jobs-container">
            
            {/* Openings list */}
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "24px" }}>Open Positions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {jobOpenings.map((job, idx) => (
                  <div key={idx} className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "8px" }}>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>{job.title}</h3>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#a78bfa" }}>{job.salary}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "14px" }}>{job.type}</div>
                    <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6 }}>{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Application form */}
            <div className="glass" style={{ padding: "40px", borderRadius: "16px", height: "fit-content" }}>
              {success ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px", color: "#10b981" }}>Application Logged!</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Thank you. Our HR panel recruitment team will review your credentials.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApply}>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "24px" }}>Submit Application</h3>
                  
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Full Name</label>
                    <input
                      type="text"
                      required
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "14px" }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "14px" }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Position Applying For</label>
                    <select
                      value={applyForm.position}
                      onChange={(e) => setApplyForm({ ...applyForm, position: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(8,13,26,0.9)", color: "#fff", fontSize: "14px" }}
                    >
                      <option value="NextJS Dev">Senior Next.js Developer</option>
                      <option value="UI/UX Designer">Lead UI/UX Designer</option>
                      <option value="Sales Exec">Outbound Sales Executive</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Portfolio / Resume Link</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      required
                      value={applyForm.portfolio}
                      onChange={(e) => setApplyForm({ ...applyForm, portfolio: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "14px" }}
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Cover Letter Notes</label>
                    <textarea
                      rows={4}
                      value={applyForm.message}
                      onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "14px" }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer"
                    }}
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
