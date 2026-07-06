"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface PlanItem {
  name: string;
  price: number;
  desc: string;
  features: string[];
}

const defaultPlans: PlanItem[] = [
  { name: "Starter", price: 29, desc: "For single freelancers or startups", features: ["1 Active Website", "Basic CRM Tracker", "5 Team Seats", "Storage up to 5GB", "Shared Hosting Node"] },
  { name: "Business", price: 79, desc: "For growing regional businesses", features: ["3 Active Websites", "CRM + Automated Reminders", "25 Team Seats", "Storage up to 25GB", "Dedicated Hosting Node", "Intern Evaluators"] },
  { name: "Growth", price: 149, desc: "For scaling multi-region brands", features: ["10 Active Websites", "CRM + Kanban + AI Lead Score", "Unlimited Team Seats", "Storage up to 100GB", "E-commerce Engine Integration", "Basic Marketing Hub (1-4)"] },
  { name: "Enterprise", price: 299, desc: "For global operations and networks", features: ["Unlimited Websites", "All 6 Dashboard Panels", "Custom White-labeling", "Enterprise SLA & Support", "Marketing Hub (All 13 Modules)", "Country Domain Multi-routing"] },
];

export default function PricingPage() {
  const [plans, setPlans] = useState<PlanItem[]>(defaultPlans);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.pricingPlans) setPlans(parsed.pricingPlans);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden", paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="orb orb-violet" style={{ width: "500px", height: "500px", top: "-200px", right: "-100px" }} />
        <div className="orb orb-cyan"   style={{ width: "350px", height: "350px", bottom: "-100px", left: "-80px" }} />
        
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Pricing Plans
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "20px" }}>
            Transparent pricing for<br /><span className="gradient-text">Software Scaling</span>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "580px", margin: "0 auto 40px", lineHeight: 1.8 }}>
            No hidden costs. Choose the tier that matches your active operational scale, or upgrade instantly from your node console.
          </p>

          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px", borderRadius: "100px" }}>
            <button
              onClick={() => setIsYearly(false)}
              style={{
                padding: "8px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                background: !isYearly ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "transparent",
                color: !isYearly ? "#fff" : "var(--text-secondary)",
                transition: "all 0.3s ease"
              }}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              style={{
                padding: "8px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                background: isYearly ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "transparent",
                color: isYearly ? "#fff" : "var(--text-secondary)",
                transition: "all 0.3s ease"
              }}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section" style={{ paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "28px", alignItems: "stretch" }}>
            {plans.map((plan, index) => {
              const basePrice = plan.price;
              const calculatedPrice = isYearly ? Math.floor(basePrice * 0.8 * 12) : basePrice;
              
              return (
                <div
                  key={plan.name}
                  className="glass"
                  style={{
                    padding: "36px 30px", borderRadius: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative",
                    transform: plan.name === "Growth" ? "scale(1.03)" : "none",
                    boxShadow: plan.name === "Growth" ? "0 10px 30px rgba(124,58,237,0.15)" : "none",
                    borderColor: plan.name === "Growth" ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.06)"
                  }}
                >
                  {plan.name === "Growth" && (
                    <span style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>
                      Most Popular
                    </span>
                  )}
                  
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>{plan.name}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "13px", minHeight: "36px", marginBottom: "24px" }}>{plan.desc}</p>
                    
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "28px" }}>
                      <span style={{ fontSize: "40px", fontWeight: 800, color: "#fff" }}>${calculatedPrice}</span>
                      <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>/{isYearly ? "yr" : "mo"}</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", marginBottom: "32px" }}>
                      {plan.features.map((feat) => (
                        <div key={feat} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <span style={{ color: "#a78bfa", fontSize: "13px" }}>✓</span>
                          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    style={{
                      display: "block", textAlign: "center", padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, transition: "all 0.2s ease",
                      background: plan.name === "Growth" ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,0.03)",
                      color: "#fff", border: plan.name === "Growth" ? "none" : "1px solid rgba(255,255,255,0.08)"
                    }}
                  >
                    Select Plan
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
