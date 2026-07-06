import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogBySlug } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="orb orb-pink"   style={{ width: "400px", height: "400px", top: "-120px", right: "-80px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "860px" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "14px", marginBottom: "32px" }}>
            ← Back to Blog
          </Link>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{ padding: "4px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 600, background: "rgba(236,72,153,0.12)", color: "#f472b6" }}>{post.category}</span>
            <span style={{ padding: "4px 14px", borderRadius: "100px", fontSize: "12px", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.06)" }}>{post.readTime}</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4.5vw, 54px)", fontWeight: 900, letterSpacing: "-0.025em", marginBottom: "24px", lineHeight: 1.15 }}>
            {post.title}
          </h1>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "32px" }}>
            {post.excerpt}
          </p>
          {/* Author row */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "18px" }}>
              {post.author.name[0]}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "15px" }}>{post.author.name}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                {post.author.role} · {formatDate(post.publishedAt)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover ─────────────────────────────────────────────── */}
      <div className="container" style={{ marginTop: "-40px", position: "relative", zIndex: 2, maxWidth: "900px" }}>
        <div style={{ height: "400px", borderRadius: "24px", background: "linear-gradient(135deg, rgba(236,72,153,0.2), rgba(124,58,237,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "100px", border: "1px solid rgba(255,255,255,0.06)" }}>
          {post.category === "Engineering" && "⚙️"}
          {post.category === "Design"      && "🎨"}
          {post.category === "AI"          && "🤖"}
          {post.category === "Mobile"      && "📱"}
          {post.category === "DevOps"      && "☁️"}
        </div>
      </div>

      {/* ── Article Body ─────────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ maxWidth: "760px" }}>
          {/* Simulated rich article body */}
          <div style={{ color: "var(--text-secondary)", fontSize: "17px", lineHeight: 1.9 }}>
            <p style={{ marginBottom: "24px" }}>
              {post.excerpt} This is a preview of the full article content. In a production site, you&apos;d pull in the full MDX or CMS-driven content here.
            </p>
            <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#f1f5f9", margin: "40px 0 16px" }}>Why This Matters</h2>
            <p style={{ marginBottom: "24px" }}>
              The digital landscape is constantly evolving. Staying ahead requires not just technical knowledge, but a deep understanding of the problems you&apos;re trying to solve. In this article, we break down the key principles that guide our thinking at Jevxo.
            </p>
            <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#f1f5f9", margin: "40px 0 16px" }}>Key Takeaways</h2>
            {post.tags.map((tag) => (
              <div key={tag} style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#a78bfa", flexShrink: 0, marginTop: "10px" }} />
                <p>Deep knowledge of <strong style={{ color: "#f1f5f9" }}>{tag}</strong> is essential for modern {post.category.toLowerCase()} work. Understanding the fundamentals unlocks better decisions at every layer of the stack.</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ marginTop: "56px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{ padding: "6px 16px", borderRadius: "100px", fontSize: "13px", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "#a78bfa" }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Posts ────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="section-sm" style={{ borderTop: "1px solid var(--border)", paddingBottom: "80px" }}>
          <div className="container">
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "28px" }}>Related Articles</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="related-grid">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} style={{ display: "block" }}>
                  <div className="glass related-card" style={{ padding: "24px", borderRadius: "16px", transition: "all 0.2s ease" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#f472b6", display: "block", marginBottom: "10px" }}>{p.category}</span>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px", lineHeight: 1.4 }}>{p.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>{p.readTime} · {formatDate(p.publishedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .related-card {
          transition: all 0.2s ease;
        }
        .related-card:hover {
          transform: translateY(-3px);
        }
        @media (max-width: 700px) { .related-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
