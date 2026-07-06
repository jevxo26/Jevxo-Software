"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioItems, portfolioCategories } from "@/lib/data/portfolio";
import { teamMembers, stats } from "@/lib/data/team";
import { services } from "@/lib/data/services";

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
        if (parsed.heroTitle) setHeroTitle(parsed.heroTitle);
        if (parsed.heroDesc) setHeroDesc(parsed.heroDesc);
        if (parsed.heroTag) setHeroTag(parsed.heroTag);
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
    <div style={{ position: "relative" }}>
      {/* ── 1. HERO SECTION ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient section" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "140px" }}>
        <div className="orb orb-violet" style={{ width: "600px", height: "600px", top: "-150px", right: "-100px", opacity: 0.6 }} />
        <div className="orb orb-cyan" style={{ width: "450px", height: "450px", bottom: "-150px", left: "-50px", opacity: 0.5 }} />
        <div className="container" style={{ position: "relative", zIndex: 5 }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "28px", textTransform: "uppercase", letterSpacing: "0.15em" }} className="animate-fade-up">
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#06b6d4", display: "inline-block", boxShadow: "0 0 10px #06b6d4" }} />
              {heroTag}
            </div>
            
            <h1 style={{ fontSize: "clamp(30px, 7vw, 68px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "28px" }} className="animate-fade-up delay-100">
              {heroTitle.includes("||") ? (
                <>
                  {heroTitle.split("||")[0]}<br />
                  <span className="gradient-text">{heroTitle.split("||")[1]}</span>
                </>
              ) : (
                <span className="gradient-text">{heroTitle}</span>
              )}
            </h1>
            
            <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "620px", margin: "0 auto 40px" }} className="animate-fade-up delay-200">
              {heroDesc}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }} className="animate-fade-up delay-300">
              <Link href="/portal" style={{ padding: "16px 36px", borderRadius: "14px", fontWeight: 700, fontSize: "16px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", boxShadow: "0 10px 30px rgba(124,58,237,0.35)", transition: "all 0.25s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                Access Portal Login →
              </Link>
              <a href="#solutions" style={{ padding: "16px 36px", borderRadius: "14px", fontWeight: 700, fontSize: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", color: "#f1f5f9", transition: "all 0.25s ease" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              >
                Explore Solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE HUB & LIVE STATS ─────────────────────────────────────── */}
      <section className="section bg-section-gradient" id="the-hub" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="hub-grid">
            <div>
              <div style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                The Hub
              </div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "24px", lineHeight: 1.2 }}>
                One Core Vision.<br />
                <span className="gradient-text-warm">Unlimited Scale.</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
                Jevxo is designed to act as the primary operational engine for next-gen ventures. Our mission is to integrate website deployment, customer relations, employee productivity, partner tracking, and localized sales networks into one singular product architecture.
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "28px" }}>
                No more duct-taping ten different software applications. Jevxo is a coherent ecosystem that empowers small enterprises and country-level agencies alike.
              </p>
              <div style={{ display: "flex", gap: "24px" }}>
                <div style={{ borderLeft: "3px solid #7c3aed", paddingLeft: "16px" }}>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "#f1f5f9" }}>Global Framework</div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Built to operate seamlessly across borders and currencies.</p>
                </div>
                <div style={{ borderLeft: "3px solid #06b6d4", paddingLeft: "16px" }}>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "#f1f5f9" }}>Integrated Automation</div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Pre-wired pipelines automate data syncs between departments.</p>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {stats.map((st, idx) => (
                <div key={idx} className="glass" style={{ padding: "30px 24px", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 900, color: idx % 2 === 0 ? "#a78bfa" : "#60a5fa", lineHeight: 1 }}>
                    {st.value}{st.suffix}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9" }}>{st.label}</div>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.4 }}>{st.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SOLUTIONS GRID ─────────────────────────────────────────── */}
      <section className="section" id="solutions" style={{ borderTop: "1px solid var(--border)", position: "relative" }}>
        <div className="orb orb-cyan" style={{ width: "300px", height: "300px", top: "100px", right: "-100px", opacity: 0.3 }} />
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              Solutions
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Tailored Systems for <span className="gradient-text">Every Department</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "580px", margin: "16px auto 0", fontSize: "16px" }}>
              Explore the individual SaaS modules that can be activated instantly inside your Jevxo Client portal.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
            {activeSolutions.map((sol) => (
              <div key={sol.id} className="glass" style={{ padding: "32px 24px", borderRadius: "var(--radius-lg)", transition: "all 0.3s ease", display: "flex", flexDirection: "column", height: "100%" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(124,58,237,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{sol.icon}</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "#f1f5f9" }}>{sol.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, marginBottom: "20px" }}>{sol.desc}</p>
                <div style={{ display: "inline-flex", fontSize: "12px", fontWeight: 600, color: "#a78bfa", background: "rgba(124,58,237,0.08)", padding: "4px 10px", borderRadius: "6px", width: "fit-content" }}>
                  {sol.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. VENTURES ───────────────────────────────────────────────── */}
      <section className="section bg-section-gradient" id="ventures" style={{ borderTop: "1px solid var(--border)", position: "relative" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              Ventures
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Our Ecosystem of <span className="gradient-text-warm">Active Enterprises</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "580px", margin: "16px auto 0", fontSize: "16px" }}>
              Jevxo operates specialized subsidiary companies, each dedicated to engineering and managing specific industries.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
            {ventures.map((v, idx) => (
              <div key={idx} className="glass" style={{ padding: "32px", borderRadius: "var(--radius-xl)", display: "flex", gap: "20px" }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0, color: "#fff", boxShadow: "0 4px 12px rgba(124,58,237,0.3)" }}>
                  {v.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "4px" }}>{v.title}</h3>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>{v.focus}</div>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. NETWORK MAP WIDGET ─────────────────────────────────────── */}
      <section className="section" id="network" style={{ borderTop: "1px solid var(--border)", overflow: "hidden" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              Global Network
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Active Jevxo <span className="gradient-text">Ecosystem Map</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "580px", margin: "16px auto 0", fontSize: "16px" }}>
              Hover over or click on our operational centers to see active statistics and client volumes.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "40px", alignItems: "center" }} className="network-grid">
            {/* SVG Map Container */}
            <div className="glass" style={{ position: "relative", padding: "20px", borderRadius: "var(--radius-xl)", background: "rgba(8,13,26,0.5)", border: "1px solid rgba(255,255,255,0.06)", height: "420px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Fake SVG World Map Background */}
              <svg viewBox="0 0 1000 500" width="100%" height="100%" style={{ opacity: 0.15, pointerEvents: "none" }}>
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
                  style={{
                    position: "absolute",
                    left: node.x,
                    top: node.y,
                    transform: "translate(-50%, -50%)",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  <span style={{
                    display: "block",
                    width: selectedNode?.id === node.id ? "16px" : "10px",
                    height: selectedNode?.id === node.id ? "16px" : "10px",
                    borderRadius: "50%",
                    backgroundColor: selectedNode?.id === node.id ? "#7c3aed" : "#06b6d4",
                    boxShadow: selectedNode?.id === node.id ? "0 0 20px #7c3aed" : "0 0 10px #06b6d4",
                    transition: "all 0.25s ease",
                  }} />
                  <span style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                    marginTop: "6px",
                    opacity: selectedNode?.id === node.id ? 1 : 0.6,
                  }}>
                    {node.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Node Details Card */}
            <div>
              {selectedNode ? (
                <div className="glass" style={{ padding: "40px 32px", borderRadius: "var(--radius-xl)", border: "1px solid rgba(124,58,237,0.2)", background: "rgba(13,21,48,0.45)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#06b6d4", boxShadow: "0 0 10px #06b6d4" }} />
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.05em" }}>Node Statistics</span>
                  </div>
                  <h3 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "24px" }}>{selectedNode.name}</h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
                    <div>
                      <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Active Websites</div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>{selectedNode.websites}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Clients Base</div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>{selectedNode.clients}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Country Partners</div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>{selectedNode.partners}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Annual Revenue</div>
                      <div style={{ fontSize: "24px", fontWeight: 700, color: "#06b6d4" }}>{selectedNode.revenue}</div>
                    </div>
                  </div>

                  <Link href="/portal" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: "10px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", fontWeight: 700, fontSize: "14px", color: "#fff", transition: "all 0.2s" }}>
                    Launch Regional Portal →
                  </Link>
                </div>
              ) : (
                <div className="glass" style={{ padding: "40px 32px", borderRadius: "var(--radius-xl)", textAlign: "center", color: "var(--text-secondary)" }}>
                  Select a node on the map to inspect live metrics.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PARTNERS ───────────────────────────────────────────────── */}
      <section className="section bg-section-gradient" id="partners" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              Partners Program
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Earn Commissions with <span className="gradient-text">Jevxo Global</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "580px", margin: "16px auto 0", fontSize: "16px" }}>
              We collaborate with individuals, tech stack developers, agencies, and regional leaders. Explore options below.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
            {partnerPrograms.map((p, idx) => (
              <div key={idx} className="glass" style={{ padding: "32px 24px", borderRadius: "var(--radius-xl)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ fontSize: "32px", marginBottom: "16px" }}>{p.icon}</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>{p.role}</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, marginBottom: "20px" }}>{p.description}</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>INCENTIVE:</span>
                  <span style={{ fontSize: "13px", color: "#06b6d4", fontWeight: 700 }}>{p.commission}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SHOWCASE (PORTFOLIO) ───────────────────────────────────── */}
      <section className="section" id="showcase" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "50px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <div style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                Showcase
              </div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Proven Digital <span className="gradient-text">Deliverables</span>
              </h2>
            </div>
            {/* Category Filter Pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    border: "1px solid",
                    borderColor: activeCategory === cat ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
                    background: activeCategory === cat ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.02)",
                    color: activeCategory === cat ? "#a78bfa" : "var(--text-secondary)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "30px" }}>
            {filteredPortfolio.map((item) => (
              <div key={item.id} className="glass" style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Image Placeholder with Gradients */}
                <div style={{
                  height: "200px",
                  background: `linear-gradient(135deg, rgba(8,13,26,0.9), rgba(13,21,48,0.7)), radial-gradient(circle at top right, rgba(124,58,237,0.3), transparent 70%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{
                    fontSize: "32px",
                    opacity: 0.8,
                  }}>💻</div>
                  <div style={{ position: "absolute", bottom: "16px", left: "16px", background: "rgba(8,13,26,0.8)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, color: "#06b6d4", textTransform: "uppercase" }}>
                    {item.category}
                  </div>
                </div>

                <div style={{ padding: "30px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", color: "#f1f5f9" }}>{item.title}</h3>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>Client: {item.client} | {item.year}</div>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, marginBottom: "24px" }}>
                    {item.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {item.tags.map((t) => (
                      <span key={t} style={{ padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", fontSize: "13px" }}>
                    <span style={{ color: "#a78bfa", fontWeight: 600 }}>Result: </span>
                    <span style={{ color: "var(--text-secondary)" }}>{item.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. TEAM SECTION ───────────────────────────────────────────── */}
      <section className="section bg-section-gradient" id="team" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              Our Team
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Ecosystem <span className="gradient-text">Architects & Leadership</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "580px", margin: "16px auto 0", fontSize: "16px" }}>
              The developers, system operators, designers, and growth experts building the core Jevxo core framework.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "28px" }}>
            {teamMembers.map((m) => (
              <div key={m.id} className="glass" style={{ padding: "30px", borderRadius: "var(--radius-xl)", textAlign: "center" }}>
                {/* Fake Avatar */}
                <div style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  margin: "0 auto 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(124,58,237,0.3)",
                }}>
                  {m.name.charAt(0)}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>{m.name}</h3>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#06b6d4", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.role}</div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px" }}>{m.bio}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                  {m.linkedin && <a href={m.linkedin} style={{ fontSize: "13px", color: "var(--text-muted)" }}>LinkedIn</a>}
                  {m.twitter && <a href={m.twitter} style={{ fontSize: "13px", color: "var(--text-muted)" }}>Twitter</a>}
                  {m.github && <a href={m.github} style={{ fontSize: "13px", color: "var(--text-muted)" }}>GitHub</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9 & 10. PRICING & HOSTING PLANS ───────────────────────────── */}
      <section className="section" id="pricing" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
              Pricing
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Transparent <span className="gradient-text">Software & Hosting</span> Rates
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "580px", margin: "16px auto 0", fontSize: "16px" }}>
              Select between monthly billing or save 20% on annual commitments.
            </p>

            {/* Monthly / Annual Toggle */}
            <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", padding: "4px", borderRadius: "100px", marginTop: "30px" }}>
              <button
                onClick={() => setBillingPeriod("monthly")}
                style={{
                  padding: "8px 20px",
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  background: billingPeriod === "monthly" ? "#7c3aed" : "none",
                  color: billingPeriod === "monthly" ? "#fff" : "var(--text-secondary)",
                  transition: "all 0.2s",
                }}
              >Monthly</button>
              <button
                onClick={() => setBillingPeriod("annually")}
                style={{
                  padding: "8px 20px",
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  background: billingPeriod === "annually" ? "#7c3aed" : "none",
                  color: billingPeriod === "annually" ? "#fff" : "var(--text-secondary)",
                  transition: "all 0.2s",
                }}
              >Annually (Save 20%)</button>
            </div>
          </div>

          <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px", color: "#f1f5f9", textAlign: "center" }}>
            1. Software Suite Plans
          </h3>
          {/* Software plans grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "24px", marginBottom: "60px" }}>
            {plans.map((p, idx) => {
              const actualPrice = billingPeriod === "annually" ? Math.floor(p.price * 0.8) : p.price;
              return (
                <div key={idx} className="glass" style={{ padding: "36px 28px", borderRadius: "var(--radius-xl)", border: idx === 2 ? "1.5px solid #7c3aed" : "1px solid rgba(255,255,255,0.06)", position: "relative", background: idx === 2 ? "rgba(124,58,237,0.02)" : "rgba(8,13,26,0.3)" }}>
                  {idx === 2 && (
                    <span style={{ position: "absolute", top: "-12px", right: "20px", background: "#7c3aed", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px", textTransform: "uppercase" }}>Recommended</span>
                  )}
                  <h4 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>{p.name}</h4>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "24px", minHeight: "38px" }}>{p.desc}</p>
                  
                  <div style={{ marginBottom: "28px" }}>
                    <span style={{ fontSize: "36px", fontWeight: 900, color: "#fff" }}>${actualPrice}</span>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}> / mo</span>
                  </div>

                  <Link href="/portal" style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: "8px", background: idx === 2 ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontWeight: 700, fontSize: "13px", color: "#fff", marginBottom: "28px", transition: "all 0.2s" }}>
                    Get Started
                  </Link>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "var(--text-secondary)" }}>
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "#06b6d4" }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px", color: "#f1f5f9", textAlign: "center" }}>
            2. Dedicated Hosting Plans
          </h3>
          {/* Hosting plans grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px" }}>
            {[
              { name: "Starter Cloud Node", price: 15, bandwidth: "500 GB Bandwidth", space: "10 GB NVMe Storage", db: "1 MariaDB / PG Database", ssl: "Free SSL certificate" },
              { name: "Business Cloud Node", price: 45, bandwidth: "2.5 TB Bandwidth", space: "80 GB NVMe Storage", db: "10 Databases", ssl: "Free Wildcard SSL + Cloudflare CDN" },
              { name: "Enterprise Dedicated Server", price: 120, bandwidth: "Unlimited Bandwidth", space: "500 GB NVMe SSD Storage", db: "Unlimited Databases", ssl: "Advanced DDoS Mitigation & Load Balancing" },
            ].map((p, idx) => {
              const actualPrice = billingPeriod === "annually" ? Math.floor(p.price * 0.8) : p.price;
              return (
                <div key={idx} className="glass" style={{ padding: "36px", borderRadius: "var(--radius-xl)", background: "rgba(13,21,48,0.2)" }}>
                  <h4 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "8px" }}>{p.name}</h4>
                  <div style={{ marginBottom: "24px" }}>
                    <span style={{ fontSize: "32px", fontWeight: 900, color: "#fff" }}>${actualPrice}</span>
                    <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}> / mo</span>
                  </div>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "28px" }}>
                    <li>📊 {p.bandwidth}</li>
                    <li>💾 {p.space}</li>
                    <li>🗄️ {p.db}</li>
                    <li>🔒 {p.ssl}</li>
                    <li>🛡️ 99.99% Uptime Guarantee</li>
                  </ul>

                  <Link href="/portal" style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontWeight: 700, fontSize: "13px", color: "#fff" }}>
                    Provision Node
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 11. CONTACT FORM ──────────────────────────────────────────── */}
      <section className="section bg-section-gradient" id="contact" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px", alignItems: "center" }} className="contact-grid">
            <div>
              <div style={{ color: "#a78bfa", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                Contact Us
              </div>
              <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "24px" }}>
                Let&apos;s Build Something <span className="gradient-text">Exceptional</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: 1.8, marginBottom: "30px" }}>
                Have questions regarding Jevxo licensing, agency partner White-labeling programs, or dedicated enterprise cloud deployments? Write to our core development and leadership squad.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(124,58,237,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", fontSize: "18px" }}>✉</div>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Ecosystem Sales</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#f1f5f9" }}>sales@jevxo.com</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(6,182,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#06b6d4", fontSize: "18px" }}>📞</div>
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Global Headquarters</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#f1f5f9" }}>+880 1700 000000</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass" style={{ padding: "40px", borderRadius: "var(--radius-xl)" }}>
              {contactSubmitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>✉️</div>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px", color: "#06b6d4" }}>Message Logged!</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Thank you. Our sales engineers will reach out to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="form-row">
                    <div>
                      <label htmlFor="name" style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "14px" }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "14px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="form-row">
                    <div>
                      <label htmlFor="type" style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Inquiry Type</label>
                      <select
                        id="type"
                        value={contactForm.type}
                        onChange={(e) => setContactForm({ ...contactForm, type: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(8,13,26,0.9)", color: "#fff", fontSize: "14px" }}
                      >
                        <option value="Sales">Ecosystem Sales</option>
                        <option value="WhiteLabel">White-Labeling Program</option>
                        <option value="Support">Technical Support</option>
                        <option value="Hosting">Dedicated Hosting</option>
                        <option value="Career">Career Form</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Monthly Budget</label>
                      <select
                        id="budget"
                        value={contactForm.budget}
                        onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(8,13,26,0.9)", color: "#fff", fontSize: "14px" }}
                      >
                        <option value="$1k - $5k">$1,000 - $5,000</option>
                        <option value="$5k - $15k">$5,000 - $15,000</option>
                        <option value="$15k+">$15,000+ / Custom Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: "28px" }}>
                    <label htmlFor="message" style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Message / Details</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "14px" }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 700,
                      border: "none",
                      boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
                      transition: "all 0.2s",
                    }}
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hub-grid, .network-grid, .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
