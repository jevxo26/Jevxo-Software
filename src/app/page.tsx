"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { portfolioItems, portfolioCategories } from "@/lib/data/portfolio";
import { teamMembers, stats } from "@/lib/data/team";
import "./globals.css";


// Define Jevxo Solutions based on brief
const solutions = [
  { id: "1", title: "Custom Websites", desc: "High-performance marketing & corporate sites powered by Next.js.", icon: "🌐", tag: "Website" },
  { id: "2", title: "E-commerce Engine", desc: "Headless commerce solutions with lightning-fast checkout flows.", icon: "🛒", tag: "Ecommerce" },
  { id: "3", title: "Jevxo CRM", desc: "Lead tracking, pipeline visualizers, and conversion insights.", icon: "📊", tag: "CRM" },
  { id: "4", title: "Jevxo HRM", desc: "Staff attendance, leave management, and growth trackers.", icon: "👥", tag: "HRM" },
  { id: "5", title: "Jevxo School", desc: "Student management, grading systems, and fee portals.", icon: "🏫", tag: "School" },
  { id: "6", title: "Jevxo Restaurant", desc: "POS integration, tables management, and digital menu builders.", icon: "🍔", tag: "Restaurant" },
  { id: "7", title: "Business Suite", desc: "General ERP, invoicing, and asset tracking for large operations.", icon: "💼", tag: "Business Mgmt" },
  { id: "8", title: "Marketing Hub", desc: "Automated social posting, email drip campaigns, and ROI tracking.", icon: "🚀", tag: "Marketing" },
];

// Jevxo Ventures
const ventures = [
  { title: "Jevxo Web", desc: "Global design & engineering studio crafting high-end SaaS applications and experiences.", icon: "⚡", focus: "UI/UX & Engineering" },
  { title: "Jevxo School", desc: "E-learning and educational administrative networks serving institutions worldwide.", icon: "🎓", focus: "EdTech Systems" },
  { title: "Jevxo Restaurant", desc: "Unified kitchen management, order tracking, and table optimization platforms.", icon: "🍽️", focus: "F&B SaaS Solutions" },
  { title: "Jevxo Business", desc: "Comprehensive Enterprise Resource Planning and logistics operating suites.", icon: "📈", focus: "Corporate ERP" },
  { title: "Jevxo Marketing", desc: "AI-driven automated marketing campaigns, SEO auditing, and ad management hubs.", icon: "🎯", focus: "Growth Automation" },
  { title: "Future Ventures", desc: "Investing in next-generation decentralized databases and AI-agent business systems.", icon: "🔮", focus: "R&D and Ventures" },
];

// Interactive Network map dots
const networkNodes = [
  { id: "dhaka", name: "Bangladesh (HQ)", x: "72%", y: "48%", clients: "45+", partners: "12", websites: "120+", revenue: "$180k/yr" },
  { id: "london", name: "United Kingdom", x: "48%", y: "30%", clients: "32+", partners: "8", websites: "85+", revenue: "$240k/yr" },
  { id: "newyork", name: "United States", x: "28%", y: "32%", clients: "54+", partners: "15", websites: "140+", revenue: "$520k/yr" },
  { id: "dubai", name: "United Arab Emirates", x: "62%", y: "42%", clients: "22+", partners: "6", websites: "40+", revenue: "$150k/yr" },
  { id: "singapore", name: "Singapore", x: "78%", y: "58%", clients: "18+", partners: "5", websites: "30+", revenue: "$110k/yr" },
];

// Partner Programs
const partnerPrograms = [
  { role: "Country Partner", description: "Represent the Jevxo ecosystem in your nation. Earn exclusive high-yield commissions on regional signups.", commission: "30% Lifetime Share", icon: "🗺️" },
  { role: "Agency Partner", description: "Bundle our SaaS engine (CRM, HRM, School) under your agency's white-label banner or integration team.", commission: "25% Volume Rebate", icon: "🏢" },
  { role: "Sales Partner", description: "Refer clients, manage regional sales agent pools, and win high-ticket incentives through gamified ranks.", commission: "15% per Conversion", icon: "🤝" },
  { role: "Technology Partner", description: "Integrate your APIs, plugins, and hosting nodes directly into Jevxo's global application catalog.", commission: "Co-selling Support", icon: "🔌" },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("annually");

  // Dynamic CMS States
  const [heroTitle, setHeroTitle] = useState("The Digital Operating||System for Global Ventures");
  const [heroDesc, setHeroDesc] = useState("A unified suite of business management platforms, CRM systems, automated growth centers, and enterprise hosting packages. Build, scale, and automate your company.");
  const [heroTag, setHeroTag] = useState("Jevxo Ecosystem Version 1.0 Live");
  const [nodes, setNodes] = useState(networkNodes);
  const [selectedNode, setSelectedNode] = useState<typeof networkNodes[0] | null>(null);
  const [activeSolutions, setActiveSolutions] = useState(solutions);
  const [plans, setPlans] = useState([
    { name: "Starter", price: 29, desc: "For single freelancers or startups", features: ["1 Active Website", "Basic CRM Tracker", "5 Team Seats", "Storage up to 5GB", "Shared Hosting Node"] },
    { name: "Business", price: 79, desc: "For growing regional businesses", features: ["3 Active Websites", "CRM + Automated Reminders", "25 Team Seats", "Storage up to 25GB", "Dedicated Hosting Node", "Intern Evaluators"] },
    { name: "Growth", price: 149, desc: "For scaling multi-region brands", features: ["10 Active Websites", "CRM + Kanban + AI Lead Score", "Unlimited Team Seats", "Storage up to 100GB", "E-commerce Engine Integration", "Basic Marketing Hub (1-4)"] },
    { name: "Enterprise", price: 299, desc: "For global operations and networks", features: ["Unlimited Websites", "All 6 Dashboard Panels", "Custom White-labeling", "Enterprise SLA & Support", "Marketing Hub (All 13 Modules)", "Country Domain Multi-routing"] },
  ]);

  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", type: "Sales", budget: "$1k - $5k", message: "" });

  // Load from local storage if available
  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.heroTitle && typeof parsed.heroTitle === "string" && parsed.heroTitle.trim() !== "") setHeroTitle(parsed.heroTitle);
        if (parsed.heroDesc && typeof parsed.heroDesc === "string" && parsed.heroDesc.trim() !== "") setHeroDesc(parsed.heroDesc);
        if (parsed.heroTag && typeof parsed.heroTag === "string" && parsed.heroTag.trim() !== "") setHeroTag(parsed.heroTag);
        if (parsed.networkNodes) {
          setNodes(parsed.networkNodes);
          if (parsed.networkNodes.length > 0) {
            setSelectedNode(parsed.networkNodes[0]);
          }
        }
        if (parsed.pricingPlans) setPlans(parsed.pricingPlans);
      } catch (e) {
        console.error("Failed to parse CMS data", e);
      }
    } else {
      if (networkNodes.length > 0) {
        setSelectedNode(networkNodes[0]);
      }
    }
  }, []);

  // Update selectedNode if nodes list gets populated/reset
  useEffect(() => {
    if (!selectedNode && nodes.length > 0) {
      setSelectedNode(nodes[0]);
    }
  }, [nodes, selectedNode]);

  const filteredPortfolio = activeCategory === "All"
    ? portfolioItems.filter(item => item.featured)
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg = {
      id: `msg_${Date.now()}`,
      name: contactForm.name,
      email: contactForm.email,
      type: contactForm.type,
      budget: contactForm.budget,
      message: contactForm.message,
      submittedAt: new Date().toISOString()
    };
    try {
      const stored = localStorage.getItem("jevxo_contact_messages");
      const current = stored ? JSON.parse(stored) : [];
      localStorage.setItem("jevxo_contact_messages", JSON.stringify([newMsg, ...current]));
    } catch (err) {
      console.error(err);
    }
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", type: "Sales", budget: "$1k - $5k", message: "" });
    }, 5000);
  };

  return (
    <div className="relative bg-slate-50 text-slate-900 min-h-screen">
      <Navbar />

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-36 pb-20 bg-gradient-to-b from-violet-50 via-white to-slate-50">
        <div className="absolute w-[600px] h-[600px] -top-36 -right-24 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none opacity-60 animate-[pulse-glow_2s_ease-in-out_infinite]" />
        <div className="absolute w-[450px] h-[450px] -bottom-36 -left-12 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none opacity-50" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-600/30 bg-violet-600/10 text-xs font-semibold text-violet-700 mb-7 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
              {heroTag}
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-7 leading-none text-slate-900">
              {heroTitle.includes("||") ? (
                <>
                  {heroTitle.split("||")[0]}<br />
                  <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">{heroTitle.split("||")[1]}</span>
                </>
              ) : (
                <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">{heroTitle}</span>
              )}
            </h1>

            <p className="text-base md:text-xl text-slate-600 leading-relaxed max-w-[620px] mx-auto mb-10">
              {heroDesc}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/portal" className="px-9 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200">
                Access Portal Login →
              </Link>
              <a href="#solutions" onClick={(e) => { e.preventDefault(); document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" }); }} className="px-9 py-4 rounded-2xl font-bold text-base bg-slate-900/5 border border-slate-900/10 text-slate-900 hover:bg-slate-900/10 transition-all duration-200">
                Explore Solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE HUB & LIVE STATS ─────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-slate-50/50" id="the-hub">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                The Hub
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
                One Core Vision.<br />
                <span className="bg-gradient-to-br from-pink-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">Unlimited Scale.</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-5">
                Jevxo is designed to act as the primary operational engine for next-gen ventures. Our mission is to integrate website deployment, customer relations, employee productivity, partner tracking, and localized sales networks into one singular product architecture.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                No more duct-taping ten different software applications. Jevxo is a coherent ecosystem that empowers small enterprises and country-level agencies alike.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="border-l-2 border-violet-600 pl-4">
                  <div className="text-sm font-bold text-slate-900 mb-1">Global Framework</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Built to operate seamlessly across borders and currencies.</p>
                </div>
                <div className="border-l-2 border-cyan-500 pl-4">
                  <div className="text-sm font-bold text-slate-900 mb-1">Integrated Automation</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Pre-wired pipelines automate data syncs between departments.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stats.map((st, idx) => (
                <div key={idx} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-7 rounded-2xl flex flex-col gap-2">
                  <div className={`text-4xl md:text-5xl font-black leading-none ${idx % 2 === 0 ? "text-violet-600" : "text-cyan-600"}`}>
                    {st.value}{st.suffix}
                  </div>
                  <div className="text-sm font-bold text-slate-900">{st.label}</div>
                  <p className="text-xs text-slate-500 leading-normal">{st.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SOLUTIONS GRID ─────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 relative" id="solutions">
        <div className="absolute w-[300px] h-[300px] top-24 -right-24 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none opacity-30" />
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
              Solutions
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Tailored Systems for <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Every Department</span>
            </h2>
            <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
              Explore the individual SaaS modules that can be activated instantly inside your Jevxo Client portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {activeSolutions.map((sol) => (
              <div key={sol.id} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-2xl flex flex-col h-full hover:-translate-y-1.5 hover:border-violet-600/30 hover:shadow-lg hover:shadow-violet-600/5">
                <div className="text-4xl mb-4">{sol.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{sol.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">{sol.desc}</p>
                <div className="inline-flex text-xs font-semibold text-violet-700 bg-violet-600/10 px-2.5 py-1 rounded-md w-fit">
                  {sol.tag}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/products" className="inline-block px-7 py-3 rounded-lg bg-violet-600/10 border border-violet-600/30 text-violet-700 font-bold text-sm hover:bg-violet-600/20 transition-all duration-200">
              Explore Our Software Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. VENTURES ───────────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-slate-50/50 relative" id="ventures">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
              Ventures
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Our Ecosystem of <span className="bg-gradient-to-br from-pink-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">Active Enterprises</span>
            </h2>
            <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
              Jevxo operates specialized subsidiary companies, each dedicated to engineering and managing specific industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {ventures.map((v, idx) => (
              <div key={idx} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-2xl flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xl shrink-0 text-white shadow-md shadow-violet-600/20">
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{v.title}</h3>
                  <div className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-3">{v.focus}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. NETWORK MAP WIDGET ─────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 overflow-hidden" id="network">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
              Global Network
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Active Jevxo <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Ecosystem Map</span>
            </h2>
            <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
              Hover over or click on our operational centers to see active statistics and client volumes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            {/* SVG Map Container */}
            <div className="lg:col-span-3 bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 relative p-5 rounded-2xl h-[420px] overflow-hidden flex items-center justify-center">
              {/* Fake SVG World Map Background */}
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-15 pointer-events-none">
                <path d="M150,150 Q170,120 200,130 T250,160 T300,120 T350,150 T400,110 T450,130 T500,160 T550,130 T600,160 T650,120 T700,140 T750,120 T800,150 T850,130 T900,170" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M100,280 Q130,240 180,260 T250,230 T320,270 T400,220 T480,260 T550,230 T620,280 T700,240 T780,290 T850,250 T920,300" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="150" cy="180" r="10" fill="#94a3b8" opacity="0.2" />
                <circle cx="320" cy="220" r="15" fill="#94a3b8" opacity="0.2" />
                <circle cx="550" cy="160" r="12" fill="#94a3b8" opacity="0.2" />
                <circle cx="780" cy="250" r="18" fill="#94a3b8" opacity="0.2" />
              </svg>

              {/* Interactive Nodes */}
              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setSelectedNode(node)}
                  className="absolute cursor-pointer p-0 border-0 bg-transparent z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: node.x, top: node.y }}
                >
                  <span className={`block rounded-full transition-all duration-200 ${selectedNode?.id === node.id
                    ? "w-4 h-4 bg-violet-600 shadow-[0_0_20px_#7c3aed]"
                    : "w-2.5 h-2.5 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                    }`} />
                  <span className={`absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] text-slate-500 font-semibold mt-1.5 transition-opacity ${selectedNode?.id === node.id ? "opacity-100" : "opacity-60"
                    }`}>
                    {node.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Node Details Card */}
            <div className="lg:col-span-2">
              {selectedNode ? (
                <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-10 rounded-2xl border-violet-600/20">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                    <span className="text-xs font-bold text-violet-700 uppercase tracking-wider">Node Statistics</span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-6">{selectedNode.name}</h3>

                  <div className="grid grid-cols-2 gap-5 mb-8">
                    <div>
                      <div className="text-xs text-slate-500">Active Websites</div>
                      <div className="text-2xl font-bold text-slate-900">{selectedNode.websites}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Clients Base</div>
                      <div className="text-2xl font-bold text-slate-900">{selectedNode.clients}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Country Partners</div>
                      <div className="text-2xl font-bold text-slate-900">{selectedNode.partners}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Annual Revenue</div>
                      <div className="text-2xl font-bold text-cyan-600">{selectedNode.revenue}</div>
                    </div>
                  </div>

                  <Link href="/portal" className="block text-center py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-bold text-sm text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200">
                    Launch Regional Portal →
                  </Link>
                </div>
              ) : (
                <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-10 rounded-2xl text-center text-slate-500">
                  Select a node on the map to inspect live metrics.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PARTNERS ───────────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-slate-50/50" id="partners">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
              Partners Program
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Earn Commissions with <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Jevxo Global</span>
            </h2>
            <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
              We collaborate with individuals, tech stack developers, agencies, and regional leaders. Explore options below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {partnerPrograms.map((p, idx) => (
              <div key={idx} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-2xl flex flex-col h-full">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{p.role}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">{p.description}</p>
                <div className="border-t border-slate-900/5 pt-4 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-semibold">INCENTIVE:</span>
                  <span className="text-sm text-cyan-600 font-bold">{p.commission}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SHOWCASE (PORTFOLIO) ───────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10" id="showcase">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
            <div>
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                Showcase
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Proven Digital <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Deliverables</span>
              </h2>
            </div>
            {/* Category Filter Pills */}
            <div className="flex gap-2 flex-wrap">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${activeCategory === cat
                    ? "border-violet-600/30 bg-violet-600/10 text-violet-700"
                    : "border-slate-900/10 bg-slate-900/5 text-slate-600 hover:text-slate-950"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <div key={item.id} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 rounded-2xl overflow-hidden flex flex-col h-full">
                {/* Image Placeholder with Gradients */}
                <div className="h-[200px] bg-gradient-to-br from-violet-100 to-cyan-50 flex items-center justify-center relative border-b border-slate-900/5">
                  <div className="text-3xl opacity-80">💻</div>
                  <div className="absolute bottom-4 left-4 bg-white/90 border border-slate-900/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <div className="text-xs text-slate-500 mb-4">Client: {item.client} | {item.year}</div>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map((t) => (
                      <span key={t} className="px-2 py-1 rounded bg-slate-900/5 border border-slate-900/10 text-[10px] font-semibold text-slate-600">{t}</span>
                    ))}
                  </div>

                  <div className="border-t border-slate-900/5 pt-4 text-xs">
                    <span className="text-violet-600 font-bold">Result: </span>
                    <span className="text-slate-600">{item.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. TEAM SECTION ───────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-slate-50/50" id="team">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
              Our Team
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Ecosystem <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Architects & Leadership</span>
            </h2>
            <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
              The developers, system operators, designers, and growth experts building the core Jevxo core framework.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((m) => (
              <div key={m.id} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-7 rounded-2xl text-center">
                {/* Fake Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-white shadow-md shadow-violet-600/20">
                  {m.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{m.name}</h3>
                <div className="text-xs font-semibold text-cyan-600 mb-3 uppercase tracking-wider">{m.role}</div>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">{m.bio}</p>
                <div className="flex justify-center gap-3">
                  {m.linkedin && <a href={m.linkedin} className="text-xs text-slate-400 hover:text-violet-600 transition-colors">LinkedIn</a>}
                  {m.twitter && <a href={m.twitter} className="text-xs text-slate-400 hover:text-violet-600 transition-colors">Twitter</a>}
                  {m.github && <a href={m.github} className="text-xs text-slate-400 hover:text-violet-600 transition-colors">GitHub</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9 & 10. PRICING & HOSTING PLANS ───────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10" id="pricing">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
              Pricing
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Transparent <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Software & Hosting</span> Rates
            </h2>
            <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
              Select between monthly billing or save 20% on annual commitments.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="inline-flex bg-slate-900/5 border border-slate-900/10 p-1 rounded-full mt-8">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${billingPeriod === "monthly" ? "bg-violet-600 text-white shadow" : "text-slate-600 hover:text-slate-900"
                  }`}
              >Monthly</button>
              <button
                onClick={() => setBillingPeriod("annually")}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${billingPeriod === "annually" ? "bg-violet-600 text-white shadow" : "text-slate-600 hover:text-slate-900"
                  }`}
              >Annually (Save 20%)</button>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-6 text-slate-900 text-center">
            1. Software Suite Plans
          </h3>
          {/* Software plans grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {plans.map((p, idx) => {
              const actualPrice = billingPeriod === "annually" ? Math.floor(p.price * 0.8) : p.price;
              return (
                <div key={idx} className={`bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-2xl relative ${idx === 2 ? "border-violet-600 bg-violet-600/5" : ""}`}>
                  {idx === 2 && (
                    <span className="absolute -top-3 right-5 bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Recommended</span>
                  )}
                  <h4 className="text-lg font-bold mb-2 text-slate-900">{p.name}</h4>
                  <p className="text-xs text-slate-500 mb-6 min-h-[38px]">{p.desc}</p>

                  <div className="mb-7">
                    <span className="text-3xl font-extrabold text-slate-900">${actualPrice}</span>
                    <span className="text-xs text-slate-500"> / mo</span>
                  </div>

                  <Link href="/portal" className={`block text-center py-2.5 rounded-lg font-bold text-xs mb-7 border transition-all duration-200 ${idx === 2
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 border-transparent"
                    : "bg-slate-900/5 border-slate-900/10 text-slate-700 hover:bg-slate-900/10"
                    }`}>
                    Get Started
                  </Link>

                  <ul className="flex flex-col gap-3 text-xs text-slate-600">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <span className="text-cyan-600 font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <h3 className="text-xl font-bold mb-6 text-slate-900 text-center">
            2. Dedicated Hosting Plans
          </h3>
          {/* Hosting plans grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Starter Cloud Node", price: 15, bandwidth: "500 GB Bandwidth", space: "10 GB NVMe Storage", db: "1 MariaDB / PG Database", ssl: "Free SSL certificate" },
              { name: "Business Cloud Node", price: 45, bandwidth: "2.5 TB Bandwidth", space: "80 GB NVMe Storage", db: "10 Databases", ssl: "Free Wildcard SSL + Cloudflare CDN" },
              { name: "Enterprise Dedicated Server", price: 120, bandwidth: "Unlimited Bandwidth", space: "500 GB NVMe SSD Storage", db: "Unlimited Databases", ssl: "Advanced DDoS Mitigation & Load Balancing" },
            ].map((p, idx) => {
              const actualPrice = billingPeriod === "annually" ? Math.floor(p.price * 0.8) : p.price;
              return (
                <div key={idx} className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-2xl">
                  <h4 className="text-lg font-bold mb-2 text-slate-900">{p.name}</h4>
                  <div className="mb-6">
                    <span className="text-3xl font-extrabold text-slate-900">${actualPrice}</span>
                    <span className="text-xs text-slate-500"> / mo</span>
                  </div>

                  <ul className="flex flex-col gap-3 text-xs text-slate-600 mb-7">
                    <li>📊 {p.bandwidth}</li>
                    <li>💾 {p.space}</li>
                    <li>🗄️ {p.db}</li>
                    <li>🔒 {p.ssl}</li>
                    <li>🛡️ 99.99% Uptime Guarantee</li>
                  </ul>

                  <Link href="/portal" className="block text-center py-2.5 rounded-lg bg-slate-900/5 border border-slate-900/10 font-bold text-xs text-slate-700 hover:bg-slate-900/10 transition-colors">
                    Provision Node
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 11. CONTACT FORM ──────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-slate-50/50" id="contact">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                Contact Us
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900">
                Let&apos;s Build Something <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Exceptional</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Have questions regarding Jevxo licensing, agency partner White-labeling programs, or dedicated enterprise cloud deployments? Write to our core development and leadership squad.
              </p>

              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 bg-violet-600/10 text-violet-600">✉</div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ecosystem Sales</div>
                    <div className="text-sm font-semibold text-slate-900">sales@jevxo.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 bg-cyan-500/10 text-cyan-600">📞</div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Global Headquarters</div>
                    <div className="text-sm font-semibold text-slate-900">+880 1700 000000</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-10 rounded-2xl">
              {contactSubmitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✉️</div>
                  <h3 className="text-xl font-bold text-cyan-600 mb-2">Message Logged!</h3>
                  <p className="text-slate-500 text-sm">Thank you. Our sales engineers will reach out to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-violet-600 uppercase mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-violet-600 uppercase mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="type" className="block text-xs font-bold text-violet-600 uppercase mb-2">Inquiry Type</label>
                      <select
                        id="type"
                        value={contactForm.type}
                        onChange={(e) => setContactForm({ ...contactForm, type: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
                      >
                        <option value="Sales">Ecosystem Sales</option>
                        <option value="WhiteLabel">White-Labeling Program</option>
                        <option value="Support">Technical Support</option>
                        <option value="Hosting">Dedicated Hosting</option>
                        <option value="Career">Career Form</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-xs font-bold text-violet-600 uppercase mb-2">Monthly Budget</label>
                      <select
                        id="budget"
                        value={contactForm.budget}
                        onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
                      >
                        <option value="$1k - $5k">$1,000 - $5,000</option>
                        <option value="$5k - $15k">$5,000 - $15,000</option>
                        <option value="$15k+">$15,000+ / Custom Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-7">
                    <label htmlFor="message" className="block text-xs font-bold text-violet-600 uppercase mb-2">Message / Details</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}