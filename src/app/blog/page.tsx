"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";
import { blogPosts as defaultBlogPosts, blogCategories } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";

// Custom Premium SVGs
const IconSettings = () => (
  <svg className="w-12 h-12 text-violet-600 animate-[spin_20s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconPalette = () => (
  <svg className="w-12 h-12 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03456 19.176 5.0999 19.434 5.02108 19.6708L4.69047 20.6627C4.4842 21.2815 4.94528 21.9213 5.59792 21.9928C5.73034 22.0073 5.86438 22.0072 5.99676 21.9925L7.26083 21.852C7.5262 21.8225 7.79155 21.9238 7.97858 22.1108L8.15857 22.2908C8.94803 23.0803 10.0988 23.3644 11.1643 23.0336C11.4395 22.9481 11.724 22.9818 11.9754 23.1293L12 23.1436" />
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
  </svg>
);

const IconCpu = () => (
  <svg className="w-12 h-12 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

const IconSmartphone = ({ className = "w-12 h-12 text-violet-600" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const IconCloud = ({ className = "w-12 h-12 text-violet-600" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const IconFileText = () => (
  <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

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
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <div className="flex-1 pt-20">
        
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.05}
              className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
            >
              Jevxo Journal
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.15}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            >
              Ideas Worth <span className="bg-gradient-to-br from-pink-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">Sharing</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.25}
              className="text-slate-550 max-w-[620px] mx-auto text-base leading-relaxed"
            >
              Deep dives, practical guides, and honest opinions on the craft of building digital products.
            </motion.p>
          </div>
        </section>

        <section className="py-12 border-t border-slate-900/10">
          <div className="w-11/12 max-w-[1700px] mx-auto">
            {/* Categories */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.1}
              className="flex gap-2 mb-14 flex-wrap"
            >
              {blogCategories.map((cat) => (
                <span className="py-2 px-5 rounded-lg text-xs font-semibold border border-slate-900/10 bg-slate-900/5 text-slate-650 hover:text-slate-950 transition-all duration-200 cursor-pointer" key={cat}>
                  {cat}
                </span>
              ))}
            </motion.div>

            {/* Featured Posts */}
            <div className="mb-16">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.15}
                className="text-2xl font-bold mb-7 text-slate-900"
              >
                ✦ Featured Articles
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featured.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    variants={scaleIn}
                    custom={idx * 0.08}
                    whileHover="hover"
                    className="h-full"
                  >
                    <Link className="block h-full" href={`/blog/${post.slug}`}>
                      <motion.div
                        variants={hoverLift}
                        className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col group"
                      >
                        <div className="h-[180px] bg-gradient-to-br from-violet-100 to-cyan-50 flex items-center justify-center border-b border-slate-900/5">
                          {post.category === "Engineering" && <IconSettings />}
                          {post.category === "Design"      && <IconPalette />}
                          {post.category === "AI"          && <IconCpu />}
                          {post.category === "Mobile"      && <IconSmartphone />}
                          {post.category === "DevOps"      && <IconCloud />}
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex gap-2 mb-3">
                              <span className="py-0.5 px-2.5 rounded bg-violet-600/10 text-[10px] font-bold text-violet-700 uppercase tracking-wider">{post.category}</span>
                              <span className="py-0.5 px-2.5 rounded bg-slate-900/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{post.readTime}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2.5 leading-snug">{post.title}</h3>
                            <p className="text-slate-505 text-xs leading-relaxed mb-5">{post.excerpt}</p>
                          </div>
                          <div className="flex items-center gap-2.5 border-t border-slate-900/5 pt-4">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white bg-gradient-to-br from-violet-600 to-indigo-600">
                              {post.author.name[0]}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900">{post.author.name}</div>
                              <div className="text-[11px] text-slate-400">{formatDate(post.publishedAt)}</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* More Posts */}
            <div>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.15}
                className="text-2xl font-bold mb-7 text-slate-900"
              >
                More Articles
              </motion.h2>
              <div className="flex flex-col gap-4">
                {rest.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    variants={fadeUp}
                    custom={idx * 0.05}
                    whileHover="hover"
                  >
                    <Link className="block group" href={`/blog/${post.slug}`}>
                      <motion.div
                        variants={hoverLift}
                        className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 py-6 px-8 rounded-xl flex flex-col md:flex-row md:items-center gap-6"
                      >
                        <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-600/20 flex items-center justify-center text-violet-600 shrink-0">
                          {post.category === "Mobile" ? (
                            <IconSmartphone className="w-6 h-6 text-violet-600" />
                          ) : post.category === "DevOps" ? (
                            <IconCloud className="w-6 h-6 text-violet-600" />
                          ) : (
                            <IconFileText />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex gap-2 mb-1">
                            <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wider">{post.category}</span>
                            <span className="text-[10px] font-bold text-slate-400">· {post.readTime}</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 mb-1">{post.title}</h3>
                          <p className="text-slate-505 text-xs">{post.excerpt}</p>
                        </div>
                        <div className="text-slate-400 text-xs md:text-right shrink-0">
                          <div className="mb-0.5 text-slate-700 font-semibold">{post.author.name}</div>
                          <div>{formatDate(post.publishedAt)}</div>
                        </div>
                        <div className="text-violet-600 transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                          <IconArrowRight />
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
