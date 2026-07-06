"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services as defaultServices } from "@/lib/data/services";

export default function ServicesPage() {
  const [servicesList, setServicesList] = useState(defaultServices);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.services) setServicesList(parsed.services);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  return (
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1, paddingTop: "80px" }}>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="orb orb-violet" style={{ width: "500px", height: "500px", top: "-200px", right: "-100px" }} />
        <div className="orb orb-cyan"   style={{ width: "350px", height: "350px", bottom: "-100px", left: "-80px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            What We Offer
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            Services Built for<br /><span className="gradient-text">Ambitious Companies</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.8 }}>
            End-to-end digital capabilities under one roof. From strategy and design to engineering, deployment, and beyond.
          </p>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "28px" }} className="services-list">
            {servicesList.map((service, i) => (
              <Link key={service.id} href={`/services/${service.slug}`} style={{ display: "block" }}>
                <div className="glass service-card" style={{
                  padding: "40px", borderRadius: "var(--radius-xl)",
                  transition: "all 0.3s ease",
                  height: "100%",
                  display: "flex", flexDirection: "column",
                  animationDelay: `${i * 0.08}s`,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                    <div style={{
                      width: "60px", height: "60px",
                      borderRadius: "16px",
                      background: `linear-gradient(135deg, ${service.color.replace("from-","").replace("to-","").split(" ").map((c) => {
                        const map: Record<string, string> = {
                          "violet-500": "#8b5cf6",
                          "indigo-600": "#4f46e5",
                          "pink-500":   "#ec4899",
                          "rose-600":   "#e11d48",
                          "cyan-500":   "#06b6d4",
                          "blue-600":   "#2563eb",
                          "emerald-500":"#10b981",
                          "teal-600":   "#0d9488",
                          "amber-500":  "#f59e0b",
                          "orange-600": "#ea580c",
                          "purple-500": "#a855f7",
                          "violet-600": "#7c3aed",
                        };
                        return map[c] || c;
                      }).join(", ")})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "28px",
                      boxShadow: "0 8px 24px rgba(124,58,237,0.25)",
                      flexShrink: 0,
                    }}>
                      {service.icon}
                    </div>
                    <div>
                      <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>{service.title}</h2>
                      <p style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 500 }}>Starting from {service.startingPrice}</p>
                    </div>
                  </div>

                  <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.7, marginBottom: "24px", flex: 1 }}>
                    {service.description}
                  </p>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                    {service.features.slice(0, 4).map((f) => (
                      <span key={f} style={{ padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 500, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>⏱ {service.duration}</span>
                    </div>
                    <span style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 600 }}>View details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-sm" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Not sure which service you need?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "17px", marginBottom: "36px" }}>
            Book a free 30-minute discovery call and we&apos;ll help you find the right solution.
          </p>
          <Link href="/contact" style={{ padding: "16px 40px", borderRadius: "14px", fontWeight: 700, fontSize: "17px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", boxShadow: "0 0 40px rgba(124,58,237,0.4)", display: "inline-block" }}>
            Book a Free Call →
          </Link>
        </div>
      </section>

      </div>

      <Footer />

      <style>{`
        .service-card {
          transition: all 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(124,58,237,0.12);
          border-color: rgba(124,58,237,0.25) !important;
        }
        @media (max-width: 768px) {
          .services-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
