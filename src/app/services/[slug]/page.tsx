"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/data/services";

type Props = { params: Promise<{ slug: string }> };

export default function ServiceDetailPage({ params }: Props) {
  const { slug } = use(params);
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    let foundService = null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.services) {
          foundService = parsed.services.find((s: any) => s.slug === slug);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (!foundService) {
      foundService = getServiceBySlug(slug);
    }
    setService(foundService);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080d1a", color: "#fff" }}>
        Loading service info...
      </div>
    );
  }

  if (!service) notFound();

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="orb orb-violet" style={{ width: "500px", height: "500px", top: "-150px", right: "-100px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "14px", marginBottom: "32px", transition: "color 0.2s" }}>
            ← Back to Services
          </Link>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "28px", flexWrap: "wrap" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "20px", flexShrink: 0,
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "36px", boxShadow: "0 0 40px rgba(124,58,237,0.4)",
            }}>{service.icon}</div>
            <div>
              <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "16px" }}>
                Service
              </div>
              <h1 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "12px" }}>
                {service.title}
              </h1>
              <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "580px", lineHeight: 1.7 }}>
                {service.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "60px", alignItems: "start" }} className="service-detail-grid">
            {/* Left */}
            <div>
              <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "20px" }}>Overview</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "48px" }}>
                {service.description}
              </p>

              <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px" }}>What&apos;s Included</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "48px" }}>
                {service.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", flexShrink: 0 }}>✓</div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{f}</span>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px" }}>Deliverables</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {service.deliverables.map((d, i) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", borderRadius: "12px", background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: "15px", fontWeight: 500 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div>
              <div className="glass" style={{ padding: "32px", borderRadius: "var(--radius-lg)", position: "sticky", top: "100px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Project Details</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
                  {[
                    { label: "Starting Price", value: service.startingPrice, accent: true },
                    { label: "Timeline",       value: service.duration,      accent: false },
                  ].map((row) => (
                    <div key={row.label} style={{ paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <p style={{ color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>{row.label}</p>
                      <p style={{ fontSize: "20px", fontWeight: 700, color: row.accent ? "#a78bfa" : "#f1f5f9" }}>{row.value}</p>
                    </div>
                  ))}
                </div>
                <Link href="/contact" style={{
                  display: "block", textAlign: "center",
                  padding: "14px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "15px",
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  color: "#fff", boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                  marginBottom: "12px",
                }}>
                  Get a Quote →
                </Link>
                <Link href="/portfolio" style={{
                  display: "block", textAlign: "center",
                  padding: "12px 24px", borderRadius: "12px", fontWeight: 600, fontSize: "14px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  color: "var(--text-secondary)",
                }}>
                  See Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .service-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
