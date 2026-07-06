"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts as defaultBlogPosts, blogCategories } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";

export default function BlogPage() {
  const [posts, setPosts] = useState(defaultBlogPosts);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.blogPosts) setPosts(parsed.blogPosts);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const featured = posts.filter((p) => p.featured);
  const rest     = posts.filter((p) => !p.featured);

  return (
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1, paddingTop: "80px" }}>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="orb orb-pink"   style={{ width: "400px", height: "400px", top: "-120px", right: "-80px" }} />
        <div className="orb orb-violet" style={{ width: "300px", height: "300px", bottom: "-60px", left: "-60px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(236,72,153,0.3)", background: "rgba(236,72,153,0.08)", fontSize: "12px", fontWeight: 600, color: "#f472b6", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Jevxo Journal
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            Ideas Worth <span className="gradient-text-warm">Sharing</span>
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
            Deep dives, practical guides, and honest opinions on the craft of building digital products.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Categories */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "56px" }}>
            {blogCategories.map((cat) => (
              <span key={cat} style={{ padding: "6px 18px", borderRadius: "100px", fontSize: "13px", fontWeight: 500, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "var(--text-secondary)", cursor: "pointer" }}>
                {cat}
              </span>
            ))}
          </div>

          {/* Featured Posts */}
          <div style={{ marginBottom: "56px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "28px", color: "var(--text-secondary)" }}>✦ Featured Articles</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="blog-featured">
              {featured.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: "block" }}>
                  <div className="glass blog-card" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all 0.3s ease", height: "100%" }}>
                    <div style={{ height: "180px", background: "linear-gradient(135deg, rgba(236,72,153,0.2), rgba(124,58,237,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "56px" }}>
                      {post.category === "Engineering" && "⚙️"}
                      {post.category === "Design"      && "🎨"}
                      {post.category === "AI"          && "🤖"}
                      {post.category === "Mobile"      && "📱"}
                      {post.category === "DevOps"      && "☁️"}
                    </div>
                    <div style={{ padding: "24px" }}>
                      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                        <span style={{ padding: "2px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600, background: "rgba(236,72,153,0.12)", color: "#f472b6" }}>{post.category}</span>
                        <span style={{ padding: "2px 10px", borderRadius: "100px", fontSize: "11px", color: "var(--text-muted)" }}>{post.readTime}</span>
                      </div>
                      <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "10px", lineHeight: 1.4 }}>{post.title}</h3>
                      <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.6, marginBottom: "20px" }}>{post.excerpt}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px" }}>
                          {post.author.name[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: "12px", fontWeight: 600 }}>{post.author.name}</div>
                          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{formatDate(post.publishedAt)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* More Posts */}
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "28px", color: "var(--text-secondary)" }}>More Articles</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ display: "block" }}>
                  <div className="glass blog-row" style={{ padding: "28px 32px", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "24px", transition: "all 0.2s ease", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 }}>
                      {post.category === "Mobile" ? "📱" : post.category === "DevOps" ? "☁️" : "📝"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "#a78bfa" }}>{post.category}</span>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>· {post.readTime}</span>
                      </div>
                      <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "6px" }}>{post.title}</h3>
                      <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{post.excerpt}</p>
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: "13px", flexShrink: 0, textAlign: "right" }}>
                      <div style={{ marginBottom: "4px" }}>{post.author.name}</div>
                      <div>{formatDate(post.publishedAt)}</div>
                    </div>
                    <div style={{ color: "#a78bfa", fontSize: "20px", flexShrink: 0 }}>→</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      </div>

      <Footer />

      <style>{`
        .blog-card {
          transition: all 0.3s ease;
        }
        .blog-card:hover {
          transform: translateY(-4px);
        }
        .blog-row {
          transition: all 0.2s ease;
        }
        .blog-row:hover {
          border-color: rgba(124,58,237,0.25) !important;
          background: rgba(255,255,255,0.05) !important;
        }
        @media (max-width: 900px) { .blog-featured { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px) { .blog-featured { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
