"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { teamMembers, stats } from "@/lib/data/team";

export default function AboutPage() {
  return (
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden", textAlign: "center", paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="orb orb-violet" style={{ width: "500px", height: "500px", top: "-200px", right: "-100px" }} />
        <div className="orb orb-cyan" style={{ width: "350px", height: "350px", bottom: "-100px", left: "-80px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Our Story
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            Engineering the <br /><span className="gradient-text">Future of SaaS Platforms</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.8 }}>
            Jevxo is a global digital software studio creating robust operating ecosystems for companies of all sizes.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 800 }}>Our Core Beliefs</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginTop: "8px" }}>These principles guide our product designs and network expansions.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }} className="about-grid">
            <div className="glass" style={{ padding: "32px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>💡</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>Continuous Innovation</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>We continuously build, optimize, and iterate our SaaS engines to leverage the newest web advancements.</p>
            </div>
            <div className="glass" style={{ padding: "32px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>🛡️</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>Reliable Performance</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>Our nodes are built to guarantee 99.99% uptime with enterprise DDoS protection and SSL defaults.</p>
            </div>
            <div className="glass" style={{ padding: "32px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>🤝</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>Ecosystem Collaboration</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>We scale via partnerships, White-labeling programs, and gamified sales networks to reward regional leaders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Country Sales Network Highlight */}
      <section className="section bg-section-gradient" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "16px" }}>Our Country Sales Network</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "560px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            Jevxo operates across distinct regional nodes governed by local Country Partner Directors. We empower localized teams to handle software sales and service integration.
          </p>

          <Link href="/partners" style={{ display: "inline-block", padding: "14px 30px", borderRadius: "10px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, fontSize: "14px" }}>
            View Our Country Sales Partners
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }} className="about-stats-grid">
            {stats.map((st, idx) => (
              <div key={idx} className="glass" style={{ padding: "30px 24px", borderRadius: "12px", textAlign: "center", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "40px", fontWeight: 900, color: "#a78bfa", marginBottom: "8px" }}>
                  {st.value}{st.suffix}
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{st.label}</div>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.4 }}>{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section bg-section-gradient" style={{ borderTop: "1px solid var(--border)", paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 800 }}>Ecosystem Leadership Team</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginTop: "8px" }}>The engineers and system architects behind the Jevxo framework.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "28px" }}>
            {teamMembers.map((m) => (
              <div key={m.id} className="glass" style={{ padding: "30px", borderRadius: "16px", textAlign: "center", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{
                  width: "80px", height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  margin: "0 auto 16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "32px", fontWeight: 700, color: "#fff"
                }}>
                  {m.name.charAt(0)}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>{m.name}</h3>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#06b6d4", marginBottom: "12px", textTransform: "uppercase" }}>{m.role}</div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .about-grid, .about-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>

    </div>
  );
}
