"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const categories = [
  {
    title: "Frontend Engineering",
    desc: "Interactive, fluid interfaces designed for performance, search engine indexing, and responsive screen scaling.",
    tools: [
      { name: "Next.js", level: "Expert", desc: "Server components, App Router, SSR, dynamic caching systems." },
      { name: "React & TS", level: "Expert", desc: "Type-safe component design, hooks, state managers." },
      { name: "TailwindCSS", level: "Advanced", desc: "Sleek layouts, custom grid matrices, tokens." },
      { name: "Three.js / WebGL", level: "Intermediate", desc: "High-end 3D graphics rendering, shaders." }
    ]
  },
  {
    title: "Backend & Microservices",
    desc: "Robust, enterprise architectures capable of handling high concurrently connected endpoints and secure API transactions.",
    tools: [
      { name: "NodeJS / NestJS", level: "Expert", desc: "Scalable backend applications, WebSockets, guard auth." },
      { name: "Python / FastAPI", level: "Advanced", desc: "Fast REST APIs, analytical processing engines." },
      { name: "Go (Golang)", level: "Advanced", desc: "Ultra-low latency microservices, concurrency handling." },
      { name: "GraphQL", level: "Advanced", desc: "Dynamic schema stitching, optimized request paths." }
    ]
  },
  {
    title: "Databases & Storage",
    desc: "Distributed systems keeping record logs, metrics, files, and customer database caches safe and accessible.",
    tools: [
      { name: "PostgreSQL", level: "Expert", desc: "Relational constraints, composite indexing, row-level security." },
      { name: "Redis", level: "Expert", desc: "High-speed caching layers, pub/sub messaging channels." },
      { name: "MongoDB", level: "Advanced", desc: "NoSQL document storage, flexible BSON schemas." },
      { name: "Supabase / Firebase", level: "Advanced", desc: "Rapid serverless synchronization, active listeners." }
    ]
  },
  {
    title: "Cloud Infrastructure",
    desc: "Edge replication, content distribution networks, serverless pipelines, and global host clustering.",
    tools: [
      { name: "AWS (Amazon)", level: "Advanced", desc: "EC2 instances, S3 object stores, ECS container management." },
      { name: "Docker", level: "Expert", desc: "Containerized code structures for consistent deployment." },
      { name: "Kubernetes", level: "Advanced", desc: "Orchestration, automatic horizontal scaling, self-healing." },
      { name: "Cloudflare", level: "Expert", desc: "DNS management, edge workers, DDoS security shields." }
    ]
  },
  {
    title: "AI & Data Science",
    desc: "Integrating predictive models, deep learning networks, natural language processing, and virtual chat assistants.",
    tools: [
      { name: "OpenAI API", level: "Expert", desc: "Fine-tuning models, embedding vectors, custom LLMs." },
      { name: "PyTorch", level: "Advanced", desc: "Custom model training, neural weights mapping." },
      { name: "LangChain", level: "Advanced", desc: "AI agent orchestrations, multi-tool memory systems." },
      { name: "VectorDBs (Pinecone)", level: "Advanced", desc: "Semantic retrieval, context indexing." }
    ]
  }
];

export default function TechnologiesPage() {
  return (
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden", paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="orb orb-cyan"   style={{ width: "500px", height: "500px", top: "-200px", right: "-100px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Our Stack
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "20px" }}>
            The technologies that power<br /><span className="gradient-text">Jevxo Platforms</span>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "580px", margin: "0 auto", lineHeight: 1.8 }}>
            We select tools focused on performance, modularity, scale, and long-term codebase maintenance.
          </p>
        </div>
      </section>

      {/* Stack List */}
      <section className="section" style={{ paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
            {categories.map((cat) => (
              <div key={cat.title} className="glass" style={{ padding: "40px", borderRadius: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px" }} className="tech-row-grid">
                  
                  {/* Left Column */}
                  <div>
                    <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{cat.title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>{cat.desc}</p>
                  </div>

                  {/* Right Column (Tools Grid) */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="tools-subgrid">
                    {cat.tools.map((tool) => (
                      <div key={tool.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "20px", borderRadius: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                          <strong style={{ fontSize: "15px", color: "#fff" }}>{tool.name}</strong>
                          <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px", background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }}>
                            {tool.level}
                          </span>
                        </div>
                        <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.5, margin: 0 }}>{tool.desc}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Link
              href="/services"
              style={{
                display: "inline-block", padding: "14px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", boxShadow: "0 4px 20px rgba(124,58,237,0.3)"
              }}
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        @media (max-width: 800px) {
          .tech-row-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 500px) {
          .tools-subgrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
