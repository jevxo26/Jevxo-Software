"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts, getBlogBySlug } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export default function BlogPostPage({ params }: Props) {
  const { slug } = use(params);
  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    let foundPost = null;
    let currentPosts = blogPosts;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.blogPosts) {
          currentPosts = parsed.blogPosts;
          foundPost = parsed.blogPosts.find((p: any) => p.slug === slug);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (!foundPost) {
      foundPost = getBlogBySlug(slug);
    }
    setPost(foundPost);

    if (foundPost) {
      const rel = currentPosts.filter((p) => p.id !== foundPost.id && p.category === foundPost.category).slice(0, 3);
      setRelated(rel);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a] text-[#fff]">
        Loading article...
      </div>
    );
  }

  if (!post) notFound();

  return (
    <div className="bg-[#080d1a] text-[#f1f5f9] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-pink-500/[0.05] w-[400px] h-[400px] -top-[120px] -right-[80px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] max-w-[860px]">
          <Link className="items-center gap-2 text-slate-400 text-sm mb-8" href="/blog" style={{display: "inline-flex"}}>
            ← Back to Blog
          </Link>
          <div className="flex gap-2.5 mb-5" style={{flexWrap: "wrap"}}>
            <span className="py-1 px-3.5 rounded-full text-xs font-semibold bg-[rgba(236,72,153,0.12)] text-[#f472b6]">{post.category}</span>
            <span className="py-1 px-3.5 rounded-full text-xs text-slate-400 border border-white/[0.06]">{post.readTime}</span>
          </div>
          <h1 className="text-[clamp(28px,4.5vw,54px)] font-black tracking-[-0.025em] mb-6 leading-[1.15]">
            {post.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>
          {/* Author row */}
          <div className="flex items-center gap-3.5">
            <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center font-bold text-lg" style={{background: "linear-gradient(135deg, #7c3aed, #ec4899)"}}>
              {post.author.name[0]}
            </div>
            <div>
              <div className="font-bold text-[15px]">{post.author.name}</div>
              <div className="text-slate-400 text-[13px]">
                {post.author.role} · {formatDate(post.publishedAt)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover ─────────────────────────────────────────────── */}
      <div className="w-11/12 max-w-[1400px] mx-auto mt-[-40px] relative z-[2] max-w-[900px]">
        <div className="h-[400px] rounded-[24px] bg-[linear-gradient(135deg,rgba(236,72,153,0.2),rgba(124,58,237,0.2))] flex items-center justify-center text-[100px] border border-white/[0.06]">
          {post.category === "Engineering" && "⚙️"}
          {post.category === "Design"      && "🎨"}
          {post.category === "AI"          && "🤖"}
          {post.category === "Mobile"      && "📱"}
          {post.category === "DevOps"      && "☁️"}
        </div>
      </div>

      {/* ── Article Body ─────────────────────────────────────── */}
      <section className="py-[100px] md:py-[70px]">
        <div className="w-11/12 max-w-[1400px] mx-auto max-w-[760px]">
          {/* Simulated rich article body */}
          <div className="text-slate-600 text-[17px] leading-[1.9]">
            <p className="mb-6">
              {post.excerpt} This is a preview of the full article content. In a production site, you&apos;d pull in the full MDX or CMS-driven content here.
            </p>
            <h2 className="text-[26px] font-bold text-[#f1f5f9] m-[40px_0_16px]">Why This Matters</h2>
            <p className="mb-6">
              The digital landscape is constantly evolving. Staying ahead requires not just technical knowledge, but a deep understanding of the problems you&apos;re trying to solve. In this article, we break down the key principles that guide our thinking at Jevxo.
            </p>
            <h2 className="text-[26px] font-bold text-[#f1f5f9] m-[40px_0_16px]">Key Takeaways</h2>
            {post.tags.map((tag: string) => (
              <div className="flex items-flex-start gap-3.5 mb-4" key={tag}>
                <div className="w-[8px] h-[8px] rounded-full bg-[#a78bfa] mt-2.5" style={{flexShrink: 0}} />
                <p>Deep knowledge of <strong className="text-[#f1f5f9]">{tag}</strong> is essential for modern {post.category.toLowerCase()} work. Understanding the fundamentals unlocks better decisions at every layer of the stack.</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-14 pt-8 border-t border-[1px solid rgba(255,255,255,0.06)] flex gap-2" style={{flexWrap: "wrap"}}>
            {post.tags.map((tag: string) => (
              <span className="py-1.5 px-4 rounded-full text-[13px] bg-violet-600/[0.08] border border-violet-600/[0.2] text-[#a78bfa]" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Posts ────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-[60px] md:py-[40px] border-t border-slate-900/[0.08] pb-20">
          <div className="w-11/12 max-w-[1400px] mx-auto">
            <h2 className="text-2xl font-bold mb-7">Related Articles</h2>
            <div className="related-grid grid grid-cols-3 gap-5">
              {related.map((p) => (
                <Link className="block" key={p.id} href={`/blog/${p.slug}`}>
                  <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 related-card p-6 rounded-2xl" style={{transition: "all 0.2s ease"}}>
                    <span className="text-[11px] font-semibold text-[#f472b6] block mb-2.5">{p.category}</span>
                    <h3 className="text-[15px] font-bold mb-2 leading-normal">{p.title}</h3>
                    <p className="text-slate-400 text-[13px]">{p.readTime} · {formatDate(p.publishedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      </div>

      <Footer />

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
