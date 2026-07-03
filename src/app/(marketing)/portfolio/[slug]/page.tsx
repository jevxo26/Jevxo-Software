import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioItems, getPortfolioBySlug } from "@/lib/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return portfolioItems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) return { title: "Project Not Found" };
  return { title: item.title, description: item.description };
}

const categoryIcon: Record<string, string> = {
  "Web Development": "🖥️",
  "E-Commerce":      "🛍️",
  "Mobile Apps":     "📱",
  "UI/UX Design":    "🎨",
  "AI Integration":  "🤖",
  "Cloud & DevOps":  "☁️",
};

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) notFound();

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="orb orb-cyan"   style={{ width: "500px", height: "500px", top: "-150px", right: "-120px" }} />
        <div className="orb orb-violet" style={{ width: "300px", height: "300px", bottom: "-60px", left: "-60px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Link href="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "14px", marginBottom: "32px" }}>
            ← Back to Portfolio
          </Link>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
            <span style={{ padding: "4px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 600, background: "rgba(124,58,237,0.12)", color: "#a78bfa" }}>{item.category}</span>
            <span style={{ padding: "4px 14px", borderRadius: "100px", fontSize: "12px", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.06)" }}>{item.year}</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "16px" }}>{item.title}</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "18px", marginBottom: "0" }}>Client: <strong style={{ color: "#f1f5f9" }}>{item.client}</strong></p>
        </div>
      </section>

      {/* ── Thumbnail ─────────────────────────────────────────── */}
      <div className="container" style={{ marginTop: "-40px", position: "relative", zIndex: 2 }}>
        <div style={{ height: "360px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "100px", border: "1px solid rgba(255,255,255,0.06)" }}>
          {categoryIcon[item.category] ?? "📁"}
        </div>
      </div>

      {/* ── Case Study Content ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "60px", alignItems: "start" }} className="case-study-grid">
            {/* Main content */}
            <div>
              {[
                { label: "The Challenge", text: item.challenge },
                { label: "Our Solution",  text: item.solution },
              ].map((block) => (
                <div key={block.label} style={{ marginBottom: "48px" }}>
                  <h2 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "16px" }}>{block.label}</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8 }}>{block.text}</p>
                </div>
              ))}

              {/* Tags */}
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Technologies Used</h3>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {item.tags.map((tag) => (
                    <span key={tag} style={{ padding: "6px 16px", borderRadius: "100px", fontSize: "13px", fontWeight: 500, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#a78bfa" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Result card */}
              <div style={{ padding: "32px", borderRadius: "var(--radius-lg)", background: "linear-gradient(135deg, rgba(52,211,153,0.1), rgba(6,182,212,0.08))", border: "1px solid rgba(52,211,153,0.2)", marginBottom: "24px" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Result</p>
                <p style={{ fontSize: "17px", fontWeight: 700, color: "#34d399", lineHeight: 1.6 }}>{item.result}</p>
              </div>

              {/* Details card */}
              <div className="glass" style={{ padding: "32px", borderRadius: "var(--radius-lg)", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "20px" }}>Project Info</h3>
                {[
                  { label: "Client",   value: item.client },
                  { label: "Category", value: item.category },
                  { label: "Year",     value: item.year },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>{row.label}</span>
                    <span style={{ fontWeight: 600, fontSize: "14px" }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "14px 24px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", boxShadow: "0 0 30px rgba(124,58,237,0.4)" }}>
                Start a Similar Project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .case-study-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
