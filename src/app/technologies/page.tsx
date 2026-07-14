"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

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
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">

      {/* Hero */}
      <section className="py-24 relative overflow-hidden text-center">
        <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.05}
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
          >
            Our Stack
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.15}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
          >
            The technologies that power<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Jevxo Platforms</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed"
          >
            We select tools focused on performance, modularity, scale, and long-term codebase maintenance.
          </motion.p>
        </div>
      </section>

      {/* Stack List */}
      <section className="py-12 border-t border-slate-900/10">
        <div className="w-11/12 max-w-[1700px] mx-auto">
          <div className="flex flex-col gap-10">
            {categories.map((cat, idx) => (
              <motion.div 
                key={cat.title}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={idx * 0.08}
                className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  
                  {/* Left Column */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{cat.title}</h3>
                    <p className="text-slate-505 text-xs leading-relaxed">{cat.desc}</p>
                  </div>

                  {/* Right Column (Tools Grid) */}
                  <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cat.tools.map((tool, toolIdx) => (
                      <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportSettings}
                        variants={scaleIn}
                        custom={toolIdx * 0.05}
                        whileHover="hover"
                        key={tool.name}
                        className="h-full"
                      >
                        <motion.div
                          variants={hoverLift}
                          className="bg-slate-900/5 border border-slate-900/10 p-5 rounded-xl h-full flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-baseline mb-2 gap-2 flex-wrap">
                            <strong className="text-sm text-slate-900">{tool.name}</strong>
                            <span className="text-[9px] font-bold py-0.5 px-2 rounded-full bg-violet-600/10 text-violet-750 border border-violet-600/20">
                              {tool.level}
                            </span>
                          </div>
                          <p className="text-slate-505 text-xs leading-relaxed">{tool.desc}</p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link className="inline-block py-3.5 px-8 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all"
              href="/services"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
