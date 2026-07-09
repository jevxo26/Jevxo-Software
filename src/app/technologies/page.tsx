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
    <div className="bg-[#080d1a] text-[#f1f5f9] min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden pt-[140px] pb-[60px]">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-cyan-500/[0.06] w-[500px] h-[500px] -top-[200px] -right-[100px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
          <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/[0.3] bg-violet-600/[0.08] text-xs font-semibold text-[#a78bfa] mb-6 uppercase tracking-widest">
            Our Stack
          </div>
          <h1 className="text-[clamp(36px,6vw,64px)] font-black tracking-tight mb-5">
            The technologies that power<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Jevxo Platforms</span>
          </h1>
          <p className="text-[17px] text-slate-600 max-w-[580px] mx-auto leading-relaxed">
            We select tools focused on performance, modularity, scale, and long-term codebase maintenance.
          </p>
        </div>
      </section>

      {/* Stack List */}
      <section className="py-[100px] md:py-[70px] pb-[100px]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-[50px]">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-10 rounded-[20px] bg-white/[0.01] border-white/[0.06]">
                <div className="tech-row-grid grid grid-cols-[1fr_2fr] gap-10">
                  
                  {/* Left Column */}
                  <div>
                    <h3 className="text-[22px] font-extrabold text-[#fff] mb-3">{cat.title}</h3>
                    <p className="text-slate-600 text-sm leading-normal">{cat.desc}</p>
                  </div>

                  {/* Right Column (Tools Grid) */}
                  <div className="tools-subgrid grid grid-cols-[1fr_1fr] gap-5">
                    {cat.tools.map((tool) => (
                      <div className="bg-white/[0.02] border border-white/[0.04] p-5 rounded-xl" key={tool.name}>
                        <div className="flex justify-between items-baseline mb-2">
                          <strong className="text-[15px] text-[#fff]">{tool.name}</strong>
                          <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-[rgba(167,139,250,0.1)] text-[#a78bfa] border border-[rgba(167,139,250,0.2)]">
                            {tool.level}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs leading-normal m-[0]">{tool.desc}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-[60px]">
            <Link className="inline-block py-3.5 px-8 rounded-[10px] text-sm font-bold bg-gradient-to-br from-violet-600 to-indigo-600 text-[#fff]"
              href="/services"
              style={{boxShadow: "0 4px 20px rgba(124,58,237,0.3)"}}
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
