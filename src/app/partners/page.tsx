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
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden", paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="orb orb-violet" style={{ width: "500px", height: "500px", top: "-200px", left: "-100px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Global Networks
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "20px" }}>
            Country Sales<br /><span className="gradient-text">Partner Roster</span>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "580px", margin: "0 auto", lineHeight: 1.8 }}>
            Meet the regional partner directors leading software distribution nodes and earning high-yield lifetime commissions.
          </p>
        </div>
      </section>

      {/* Roster Grid */}
      <section className="section" style={{ paddingBottom: "60px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "60px" }}>
            {partnersList.map((p) => (
              <div key={p.country} className="glass" style={{ padding: "32px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "30px" }}>{p.flag}</span>
                    <strong style={{ fontSize: "18px", color: "#fff" }}>{p.country}</strong>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 10px", borderRadius: "100px", background: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
                    {p.status}
                  </span>
                </div>

                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "16px", marginBottom: "16px" }}>
                  <span style={{ display: "block", fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase" }}>Partner Director</span>
                  <strong style={{ fontSize: "15px", color: "#fff" }}>{p.partnerName}</strong>
                  <span style={{ display: "block", fontSize: "12px", color: "#a78bfa", marginTop: "2px" }}>{p.rank}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "10px", color: "var(--text-muted)" }}>Total Sales</span>
                    <strong style={{ fontSize: "14px", color: "#fff" }}>{p.conversions}</strong>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "10px", color: "var(--text-muted)" }}>Total Volume</span>
                    <strong style={{ fontSize: "14px", color: "#fff" }}>{p.revenueGenerated}</strong>
                  </div>
                  <div style={{ gridColumn: "span 2", borderTop: "1px dashed rgba(255,255,255,0.05)", paddingTop: "8px", marginTop: "4px" }}>
                    <span style={{ display: "block", fontSize: "10px", color: "var(--text-muted)" }}>Lifetime Commission Earned</span>
                    <strong style={{ fontSize: "15px", color: "#06b6d4" }}>{p.commissionEarned}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section bg-section-gradient" style={{ borderTop: "1px solid var(--border)", paddingBottom: "100px" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <div className="glass" style={{ padding: "40px", borderRadius: "20px", background: "rgba(8,13,26,0.4)" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "26px", fontWeight: 800 }}>Join the Partner Program</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginTop: "6px" }}>Earn up to 30% lifetime revenue share representing Jevxo software suites in your region.</p>
            </div>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <span style={{ fontSize: "40px" }}>🤝</span>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#10b981", marginTop: "12px", marginBottom: "8px" }}>Application Logged!</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>Our partner evaluation team will review your application credentials within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", color: "#fff", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", color: "#fff", fontSize: "14px" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Target Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "14px" }}
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
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Current Domain</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "14px" }}
                    >
                      <option value="Agency Owner">Agency Owner</option>
                      <option value="Sales Professional">Sales Professional</option>
                      <option value="Freelancer">Freelancer / Developer</option>
                      <option value="Other">Other Category</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "14px", borderRadius: "8px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    border: "none", color: "#fff", fontWeight: 700, fontSize: "14px", cursor: "pointer", marginTop: "8px"
                  }}
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
