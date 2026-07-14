"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogBySlug } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

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
      <div className="min-h-screen flex items-center justify-center bg-transparent text-slate-900">
        <span className="text-slate-505 text-sm font-semibold">Loading article...</span>
      </div>
    );
  }

  if (!post) notFound();

  return (
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <div className="flex-1 pt-20">
        
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="w-11/12 max-w-[1700px] mx-auto relative z-10 max-w-[860px]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.05}
            >
              <Link className="inline-flex items-center gap-2 text-slate-405 text-xs font-bold uppercase tracking-wider mb-8 hover:text-violet-600 transition-colors" href="/blog">
                ← Back to Blog
              </Link>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.1}
              className="flex gap-2.5 mb-5 flex-wrap"
            >
              <span className="py-1 px-3.5 rounded bg-violet-600/10 text-violet-750 text-[10px] font-bold uppercase tracking-wider">{post.category}</span>
              <span className="py-1 px-3.5 rounded bg-slate-900/5 text-slate-505 text-[10px] font-bold uppercase tracking-wider">{post.readTime}</span>
            </motion.div>

            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.15}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            >
              {post.title}
            </motion.h1>

            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.2}
              className="text-slate-505 text-base md:text-lg leading-relaxed mb-8"
            >
              {post.excerpt}
            </motion.p>

            {/* Author row */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.25}
              className="flex items-center gap-3.5"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br from-violet-600 to-indigo-600">
                {post.author.name[0]}
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">{post.author.name}</div>
                <div className="text-slate-500 text-xs mt-0.5">
                  {post.author.role} · {formatDate(post.publishedAt)}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cover */}
        <section className="py-4">
          <div className="w-11/12 max-w-[1700px] mx-auto relative z-10 max-w-[900px]">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              custom={0.1}
              className="h-[360px] rounded-2xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10 flex items-center justify-center text-7xl border border-slate-900/5"
            >
              {post.category === "Engineering" && "⚙️"}
              {post.category === "Design"      && "🎨"}
              {post.category === "AI"          && "🤖"}
              {post.category === "Mobile"      && "📱"}
              {post.category === "DevOps"      && "☁️"}
            </motion.div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-16">
          <div className="w-11/12 max-w-[1700px] mx-auto max-w-[760px]">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.05}
              className="text-slate-505 text-sm md:text-base leading-relaxed"
            >
              <p className="mb-6">
                {post.excerpt} This is a preview of the full article content. In a production site, you&apos;d pull in the full MDX or CMS-driven content here.
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">Why This Matters</h2>
              <p className="mb-6">
                The digital landscape is constantly evolving. Staying ahead requires not just technical knowledge, but a deep understanding of the problems you&apos;re trying to solve. In this article, we break down the key principles that guide our thinking at Jevxo.
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">Key Takeaways</h2>
              {post.tags.map((tag: string) => (
                <div className="flex items-start gap-3.5 mb-4" key={tag}>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-600 mt-2 shrink-0" />
                  <p>Deep knowledge of <strong className="text-slate-900">{tag}</strong> is essential for modern {post.category.toLowerCase()} work. Understanding the fundamentals unlocks better decisions at every layer of the stack.</p>
                </div>
              ))}
            </motion.div>

            {/* Tags */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.1}
              className="mt-14 pt-8 border-t border-slate-900/5 flex gap-2 flex-wrap"
            >
              {post.tags.map((tag: string) => (
                <span className="py-1 px-3 rounded bg-slate-900/5 border border-slate-900/10 text-[10px] font-bold text-slate-550 uppercase tracking-wider" key={tag}>{tag}</span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="py-16 border-t border-slate-900/10">
            <div className="w-11/12 max-w-[1700px] mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p, rIdx) => (
                  <motion.div
                    key={p.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    variants={scaleIn}
                    custom={rIdx * 0.05}
                    whileHover="hover"
                  >
                    <Link className="block h-full" href={`/blog/${p.slug}`}>
                      <motion.div 
                        variants={hoverLift}
                        className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-6 rounded-2xl h-full flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[9px] font-bold text-violet-750 uppercase tracking-wider block mb-2.5">{p.category}</span>
                          <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{p.title}</h3>
                        </div>
                        <p className="text-slate-500 text-[10px] mt-4">{p.readTime} · {formatDate(p.publishedAt)}</p>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
