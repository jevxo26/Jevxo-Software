"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts as defaultBlogPosts, blogCategories } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";
import { Settings, Palette, Cpu, Smartphone, Cloud, FileText, ArrowRight } from "lucide-react";

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
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-pink-500/[0.05] w-[400px] h-[400px] -top-[120px] -right-[80px]" />
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[300px] h-[300px] -bottom-[60px] -left-[60px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
          <div className="inline-block py-1 px-3.5 rounded-full border border-[rgba(236,72,153,0.3)] bg-[rgba(236,72,153,0.08)] text-xs font-semibold text-[#f472b6] mb-6 uppercase tracking-widest">
            Jevxo Journal
          </div>
          <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tight mb-6">
            Ideas Worth <span className="bg-gradient-to-br from-pink-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">Sharing</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-[520px] mx-auto leading-relaxed">
            Deep dives, practical guides, and honest opinions on the craft of building digital products.
          </p>
        </div>
      </section>

      <section className="py-[100px] md:py-[70px]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          {/* Categories */}
          <div className="flex gap-2 mb-14" style={{flexWrap: "wrap"}}>
            {blogCategories.map((cat) => (
              <span className="py-1.5 px-[18px] rounded-full text-[13px] font-medium border border-white/[0.08] bg-white/[0.03] text-slate-600" key={cat} style={{cursor: "pointer"}}>
                {cat}
              </span>
            ))}
          </div>

          {/* Featured Posts */}
          <div className="mb-14">
            <h2 className="text-[22px] font-bold mb-7 text-slate-600">✦ Featured Articles</h2>
            <div className="blog-featured grid grid-cols-3 gap-6">
              {featured.map((post) => (
                <Link className="block" key={post.id} href={`/blog/${post.slug}`}>
                  <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 blog-card rounded-[20px] overflow-hidden h-full" style={{transition: "all 0.3s ease"}}>
                    <div className="h-[180px] bg-[linear-gradient(135deg,rgba(236,72,153,0.1),rgba(124,58,237,0.1))] flex items-center justify-center">
                      {post.category === "Engineering" && <Settings className="w-12 h-12 text-violet-600 animate-[spin_10s_linear_infinite]" />}
                      {post.category === "Design"      && <Palette className="w-12 h-12 text-violet-600" />}
                      {post.category === "AI"          && <Cpu className="w-12 h-12 text-violet-600" />}
                      {post.category === "Mobile"      && <Smartphone className="w-12 h-12 text-violet-600" />}
                      {post.category === "DevOps"      && <Cloud className="w-12 h-12 text-violet-600" />}
                    </div>
                    <div className="p-6">
                      <div className="flex gap-2 mb-3">
                        <span className="py-0.5 px-2.5 rounded-full text-[11px] font-semibold bg-[rgba(236,72,153,0.12)] text-[#f472b6]">{post.category}</span>
                        <span className="py-0.5 px-2.5 rounded-full text-[11px] text-slate-400">{post.readTime}</span>
                      </div>
                      <h3 className="text-[17px] font-bold mb-2.5 leading-normal">{post.title}</h3>
                      <p className="text-slate-600 text-[13px] leading-normal mb-5">{post.excerpt}</p>
                      <div className="flex items-center gap-2.5">
                        <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center font-bold text-xs" style={{background: "linear-gradient(135deg, #7c3aed, #ec4899)"}}>
                          {post.author.name[0]}
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{post.author.name}</div>
                          <div className="text-[11px] text-slate-400">{formatDate(post.publishedAt)}</div>
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
            <h2 className="text-[22px] font-bold mb-7 text-slate-600">More Articles</h2>
            <div className="flex flex-col gap-4">
              {rest.map((post) => (
                <Link className="block group" key={post.id} href={`/blog/${post.slug}`}>
                  <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 blog-row py-7 px-8 rounded-[14px] flex items-center gap-6" style={{transition: "all 0.2s ease"}}>
                    <div className="w-[56px] h-[56px] rounded-xl bg-violet-600/5 border border-violet-600/10 flex items-center justify-center text-violet-600" style={{flexShrink: 0}}>
                      {post.category === "Mobile" ? <Smartphone className="w-6 h-6" /> : post.category === "DevOps" ? <Cloud className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-2 mb-1.5">
                        <span className="text-[11px] font-semibold text-violet-600">{post.category}</span>
                        <span className="text-[11px] text-slate-400">· {post.readTime}</span>
                      </div>
                      <h3 className="text-[17px] font-bold mb-1.5">{post.title}</h3>
                      <p className="text-slate-600 text-sm">{post.excerpt}</p>
                    </div>
                    <div className="text-slate-400 text-[13px] text-right" style={{flexShrink: 0}}>
                      <div className="mb-1 text-slate-600 font-medium">{post.author.name}</div>
                      <div>{formatDate(post.publishedAt)}</div>
                    </div>
                    <div className="text-violet-600 transition-transform duration-200 group-hover:translate-x-1" style={{flexShrink: 0}}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
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
