"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden", paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 54px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "20px" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
            Last updated: July 2026. Review how we manage, collect, and protect your cloud database nodes.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: "100px" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="glass" style={{ padding: "40px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", fontSize: "14px", lineHeight: 1.8, color: "var(--text-secondary)" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>1. Information We Collect</h2>
            <p style={{ marginBottom: "24px" }}>
              Jevxo collects metadata necessary to authenticate portal sessions, optimize CDN replication nodes, and deliver responsive software applications. This includes email addresses, active subscription preferences, contact form budgets, and API access keys.
            </p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>2. How We Use Data</h2>
            <p style={{ marginBottom: "24px" }}>
              We utilize collected parameters to maintain client support logs, route DNS requests to country nodes, and update dynamic homepage components. We do not sell, rent, or distribute database schemas to third-party advertising companies.
            </p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>3. Data Storage & Security</h2>
            <p style={{ marginBottom: "24px" }}>
              All client files, billing history, and internship consoles are stored behind standard firewalls and encrypted schemas. Two-factor authentication (2FA) options are available in settings to prevent unauthorized console access.
            </p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>4. Cookies & Trackers</h2>
            <p style={{ marginBottom: "24px" }}>
              Our platform uses local storage (`localStorage`) to cache active sessions, CMS configs, and chat conversation history to avoid redundant API request calls. You can wipe this cache at any time via settings or browser controls.
            </p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>5. Contact Inquiries</h2>
            <p style={{ margin: 0 }}>
              For data access requests or questions regarding our cloud infrastructure audits, please submit a query via our contact page, or reach out to our network team at `security@jevxo.com`.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
