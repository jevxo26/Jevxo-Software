"use client";

import { useState } from "react";
import Link from "next/link";
import { portfolioItems, portfolioCategories } from "@/lib/data/portfolio";

export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === active);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="orb orb-cyan"   style={{ width: "450px", height: "450px", top: "-150px", right: "-80px" }} />
        <div className="orb orb-violet" style={{ width: "300px", height: "300px", bottom: "-80px", left: "-60px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.08)", fontSize: "12px", fontWeight: 600, color: "#67e8f9", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Our Work
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            Projects That <span className="gradient-text">Move Needles</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.8 }}>
            A curated selection of the work we&apos;re most proud of — real projects with real outcomes for real businesses.
          </p>
        </div>
      </section>

      {/* ── Filter + Grid ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          {/* Category filter */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "56px" }}>
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: "8px 20px", borderRadius: "100px", fontSize: "14px", fontWeight: 500,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  borderColor: active === cat ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)",
                  background:  active === cat ? "rgba(124,58,237,0.15)"  : "rgba(255,255,255,0.03)",
                  color:       active === cat ? "#a78bfa" : "var(--text-secondary)",
                }}
              >{cat}</button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="portfolio-grid">
            {filtered.map((item) => (
              <Link key={item.id} href={`/portfolio/${item.slug}`} style={{ display: "block" }}>
                <div className="glass" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all 0.3s ease", height: "100%" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ height: "220px", background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.18))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px", position: "relative" }}>
                    {item.category === "Web Development" && "🖥️"}
                    {item.category === "E-Commerce"      && "🛍️"}
                    {item.category === "Mobile Apps"     && "📱"}
                    {item.category === "UI/UX Design"    && "🎨"}
                    {item.category === "AI Integration"  && "🤖"}
                    {item.category === "Cloud & DevOps"  && "☁️"}
                    {item.featured && (
                      <div style={{ position: "absolute", top: "16px", right: "16px", padding: "4px 12px", borderRadius: "100px", background: "rgba(124,58,237,0.8)", fontSize: "11px", fontWeight: 700, color: "#fff" }}>
                        Featured
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "28px" }}>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
                      <span style={{ padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600, background: "rgba(124,58,237,0.12)", color: "#a78bfa" }}>{item.category}</span>
                      <span style={{ padding: "3px 10px", borderRadius: "100px", fontSize: "11px", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.06)" }}>{item.year}</span>
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>{item.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "12px" }}>Client: {item.client}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>{item.description}</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {item.tags.slice(0, 3).map((tag) => (
                        <span key={tag} style={{ padding: "2px 10px", borderRadius: "100px", fontSize: "11px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)" }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: "20px", color: "#a78bfa", fontSize: "14px", fontWeight: 600 }}>
                      View Case Study →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-sm" style={{ borderTop: "1px solid var(--border)", paddingTop: "60px", paddingBottom: "80px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, marginBottom: "16px" }}>
            Want to Be Our Next <span className="gradient-text">Success Story?</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "17px", marginBottom: "36px" }}>
            Tell us about your project and let&apos;s create something remarkable together.
          </p>
          <Link href="/contact" style={{ padding: "16px 40px", borderRadius: "14px", fontWeight: 700, fontSize: "17px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", boxShadow: "0 0 40px rgba(124,58,237,0.4)", display: "inline-block" }}>
            Start a Project →
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .portfolio-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px) { .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
