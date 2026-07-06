"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface FAQItem {
  q: string;
  a: string;
  cat: "general" | "process" | "billing";
}

const faqs: FAQItem[] = [
  {
    cat: "general",
    q: "What types of software does Jevxo specialize in?",
    a: "We specialize in high-performance web applications (Next.js/React), mobile app development (Flutter/React Native), custom enterprise CRM systems, database architecture integrations, and scalable cloud hosting infrastructure."
  },
  {
    cat: "general",
    q: "Do I own the intellectual property and code rights?",
    a: "Absolutely. Once the project is fully delivered and paid for, you own 100% of the proprietary source code, assets, database structures, and intellectual property. We hand over all GitHub repositories and server admin keys."
  },
  {
    cat: "process",
    q: "How does the development process work?",
    a: "We work in agile phases. It starts with Discovery and wireframing, followed by high-fidelity UI/UX design. Once designs are approved, we build, QA-test, and deploy to stage servers for client feedback before launching live."
  },
  {
    cat: "process",
    q: "How long does a standard software project take?",
    a: "Simple portals or MVPs can be built in 4 to 6 weeks. More complex SaaS platforms, database-driven CRMs, or multi-role dashboards typically range from 8 to 12 weeks from discovery to cloud launch."
  },
  {
    cat: "billing",
    q: "What are your payment structures?",
    a: "We usually split project fees into milestone payments: 30% upfront on discovery launch, 40% at design and prototype sign-off, and 30% upon final QA sign-off and cloud hand-over. Subscription products are billed monthly."
  },
  {
    cat: "billing",
    q: "Do you offer post-launch maintenance and support?",
    a: "Yes! Every custom build includes 30 days of free post-launch support. Afterward, you can opt for our node maintenance packages for continuous security updates, hosting metric audits, and feature extensions."
  }
];

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "general" | "process" | "billing">("all");

  const filteredFaqs = activeFilter === "all" ? faqs : faqs.filter(f => f.cat === activeFilter);

  return (
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden", paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="orb orb-violet" style={{ width: "500px", height: "500px", top: "-200px", right: "-100px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            FAQ Center
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "20px" }}>
            Frequently Asked<br /><span className="gradient-text">Questions</span>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "580px", margin: "0 auto 40px", lineHeight: 1.8 }}>
            Find immediate answers regarding pricing, project timelines, security audits, and our software engineering methods.
          </p>

          {/* Filters */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {(["all", "general", "process", "billing"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => { setActiveFilter(filter); setActiveFaq(null); }}
                style={{
                  padding: "8px 20px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                  background: activeFilter === filter ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                  color: activeFilter === filter ? "#a78bfa" : "var(--text-secondary)",
                  borderWidth: "1px", borderStyle: "solid",
                  borderColor: activeFilter === filter ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
                  transition: "all 0.2s ease"
                }}
              >
                {filter === "all" && "✨ Show All"}
                {filter === "general" && "📁 General Info"}
                {filter === "process" && "⚙️ Our Process"}
                {filter === "billing" && "💰 Billing & Support"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordions */}
      <section className="section" style={{ paddingBottom: "100px" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filteredFaqs.map((faq, index) => {
              const isSelected = activeFaq === index;
              return (
                <div
                  key={faq.q}
                  className="glass"
                  style={{
                    borderRadius: "12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)",
                    overflow: "hidden", transition: "all 0.3s ease"
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isSelected ? null : index)}
                    style={{
                      width: "100%", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
                      background: "none", border: "none", color: "#fff", fontWeight: 700, fontSize: "15px",
                      textAlign: "left", cursor: "pointer"
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: "12px", color: "#a78bfa", transform: isSelected ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▶</span>
                  </button>
                  {isSelected && (
                    <div style={{ padding: "0 24px 24px", color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "16px" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "16px" }}>Still have questions?</p>
            <Link
              href="/contact"
              style={{
                display: "inline-block", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff"
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
