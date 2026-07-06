"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { services as defaultServices } from "@/lib/data/services";
import { portfolioItems as defaultPortfolioItems } from "@/lib/data/portfolio";
import { blogPosts as defaultBlogPosts } from "@/lib/data/blog";

interface NodeItem {
  id: string;
  name: string;
  x: string;
  y: string;
  clients: string;
  partners: string;
  websites: string;
  revenue: string;
}

interface PlanItem {
  name: string;
  price: number;
  desc: string;
  features: string[];
}

interface JobItem {
  title: string;
  type: string;
  salary: string;
  desc: string;
}

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  tagline: string;
  description: string;
  startingPrice: string;
  duration: string;
  features: string[];
  deliverables: string[];
}

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  featured: boolean;
}

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  author: { name: string; role: string };
  tags: string[];
  featured: boolean;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  type: string;
  budget: string;
  message: string;
  submittedAt: string;
}

type TabType = "hero" | "nodes" | "pricing" | "services" | "portfolio" | "blog" | "jobs" | "inbox";

export default function AdminCmsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // States mirroring default datasets
  const [heroTag, setHeroTag] = useState("Jevxo Ecosystem Version 1.0 Live");
  const [heroTitle, setHeroTitle] = useState("The Digital Operating||System for Global Ventures");
  const [heroDesc, setHeroDesc] = useState("A unified suite of business management platforms, CRM systems, automated growth centers, and enterprise hosting packages. Build, scale, and automate your company.");

  const [nodes, setNodes] = useState<NodeItem[]>([]);
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
  const [blogList, setBlogList] = useState<BlogItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Load initially
  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.heroTag) setHeroTag(parsed.heroTag);
        if (parsed.heroTitle) setHeroTitle(parsed.heroTitle);
        if (parsed.heroDesc) setHeroDesc(parsed.heroDesc);
        if (parsed.networkNodes) setNodes(parsed.networkNodes);
        if (parsed.pricingPlans) setPlans(parsed.pricingPlans);
        if (parsed.jobOpenings) setJobs(parsed.jobOpenings);
        if (parsed.services) setServicesList(parsed.services);
        if (parsed.portfolio) setPortfolioList(parsed.portfolio);
        if (parsed.blogPosts) setBlogList(parsed.blogPosts);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default fallback lists
      setNodes([
        { id: "dhaka", name: "Bangladesh (HQ)", x: "72%", y: "48%", clients: "45+", partners: "12", websites: "120+", revenue: "$180k/yr" },
        { id: "london", name: "United Kingdom", x: "48%", y: "30%", clients: "32+", partners: "8", websites: "85+", revenue: "$240k/yr" },
        { id: "newyork", name: "United States", x: "28%", y: "32%", clients: "54+", partners: "15", websites: "140+", revenue: "$520k/yr" },
        { id: "dubai", name: "United Arab Emirates", x: "62%", y: "42%", clients: "22+", partners: "6", websites: "40+", revenue: "$150k/yr" },
        { id: "singapore", name: "Singapore", x: "78%", y: "58%", clients: "18+", partners: "5", websites: "30+", revenue: "$110k/yr" },
      ]);
      setPlans([
        { name: "Starter", price: 29, desc: "For single freelancers or startups", features: ["1 Active Website", "Basic CRM Tracker", "5 Team Seats", "Storage up to 5GB", "Shared Hosting Node"] },
        { name: "Business", price: 79, desc: "For growing regional businesses", features: ["3 Active Websites", "CRM + Automated Reminders", "25 Team Seats", "Storage up to 25GB", "Dedicated Hosting Node", "Intern Evaluators"] },
        { name: "Growth", price: 149, desc: "For scaling multi-region brands", features: ["10 Active Websites", "CRM + Kanban + AI Lead Score", "Unlimited Team Seats", "Storage up to 100GB", "E-commerce Engine Integration", "Basic Marketing Hub (1-4)"] },
        { name: "Enterprise", price: 299, desc: "For global operations and networks", features: ["Unlimited Websites", "All 6 Dashboard Panels", "Custom White-labeling", "Enterprise SLA & Support", "Marketing Hub (All 13 Modules)", "Country Domain Multi-routing"] },
      ]);
      setJobs([
        { title: "Senior Next.js Developer", type: "Full-Time / Remote", salary: "$4,000 - $6,000 / mo", desc: "Responsible for developing enterprise dashboard routers, real-time sync systems, and modular components." },
        { title: "Lead UI/UX Designer", type: "Full-Time / Hybrid Dhaka", salary: "$2,500 - $4,000 / mo", desc: "Design elegant dark glassmorphic layouts, user onboarding micro-animations, and client portal libraries." },
        { title: "Outbound Sales Executive", type: "Commission-Based / Remote", salary: "High Incentives + base", desc: "Partner with regional agencies, identify country nodes, and sign up clients to Jevxo enterprise plans." }
      ]);
      setServicesList(defaultServices);
      setPortfolioList(defaultPortfolioItems);
      setBlogList(defaultBlogPosts);
    }

    // Load messages logs
    const storedMsg = localStorage.getItem("jevxo_contact_messages");
    if (storedMsg) {
      try {
        setMessages(JSON.parse(storedMsg));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleSaveAll = () => {
    const payload = {
      heroTag,
      heroTitle,
      heroDesc,
      networkNodes: nodes,
      pricingPlans: plans,
      jobOpenings: jobs,
      services: servicesList,
      portfolio: portfolioList,
      blogPosts: blogList,
    };
    localStorage.setItem("jevxo_cms_data", JSON.stringify(payload));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset all public pages CMS configurations back to standard preset files?")) {
      localStorage.removeItem("jevxo_cms_data");
      window.location.reload();
    }
  };

  const clearMessages = () => {
    if (confirm("Clear all contact inbox messages?")) {
      localStorage.removeItem("jevxo_contact_messages");
      setMessages([]);
    }
  };

  // List Modification Utilities
  const updateService = (index: number, key: keyof ServiceItem, value: any) => {
    const next = [...servicesList];
    next[index] = { ...next[index], [key]: value };
    setServicesList(next);
  };

  const addService = () => {
    const newId = `srv_${Date.now()}`;
    setServicesList([...servicesList, {
      id: newId,
      title: "New Digital Service",
      slug: "new-digital-service",
      icon: "⚡",
      tagline: "High impact delivery system",
      description: "Service overview details...",
      startingPrice: "$2,000",
      duration: "2-4 Weeks",
      features: ["Custom UI", "API sync", "Support"],
      deliverables: ["Deliverable item 1"]
    }]);
  };

  const deleteService = (index: number) => {
    setServicesList(servicesList.filter((_, idx) => idx !== index));
  };

  const updatePortfolio = (index: number, key: keyof PortfolioItem, value: any) => {
    const next = [...portfolioList];
    next[index] = { ...next[index], [key]: value };
    setPortfolioList(next);
  };

  const addPortfolio = () => {
    const newId = `port_${Date.now()}`;
    setPortfolioList([...portfolioList, {
      id: newId,
      title: "New Case Study Project",
      slug: "new-case-study",
      client: "Global Client LLC",
      category: "Web Development",
      year: "2026",
      description: "Brief teaser description.",
      challenge: "The bottleneck problems encountered...",
      solution: "How Jevxo solved the problems...",
      result: "99.9% optimization success score.",
      tags: ["React", "Cloudflare", "Tailwind"],
      featured: false
    }]);
  };

  const deletePortfolio = (index: number) => {
    setPortfolioList(portfolioList.filter((_, idx) => idx !== index));
  };

  const updateBlog = (index: number, key: any, value: any) => {
    const next = [...blogList];
    if (key === "authorName") {
      next[index].author = { ...next[index].author, name: value };
    } else if (key === "authorRole") {
      next[index].author = { ...next[index].author, role: value };
    } else {
      next[index] = { ...next[index], [key]: value };
    }
    setBlogList(next);
  };

  const addBlog = () => {
    const newId = `post_${Date.now()}`;
    setBlogList([...blogList, {
      id: newId,
      title: "New Article Title",
      slug: "new-article-title",
      category: "Engineering",
      excerpt: "Brief excerpt overview for readers...",
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: "5 min read",
      author: { name: "Farhan Aftab", role: "Principal Tech Architect" },
      tags: ["NextJS", "Optimization"],
      featured: false
    }]);
  };

  const deleteBlog = (index: number) => {
    setBlogList(blogList.filter((_, idx) => idx !== index));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* CMS control panel header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 800 }}>Ecosystem Page Builder (CMS)</h2>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>Modify public website layouts, services pricing, blog updates, case-studies and verify inbox logs.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleResetDefaults}
            style={{ padding: "10px 18px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
          >
            Reset Defaults
          </button>
          <button
            onClick={handleSaveAll}
            style={{ padding: "10px 24px", borderRadius: "8px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 15px rgba(124, 58, 237, 0.25)" }}
          >
            Apply & Save CMS Changes
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="glass" style={{ padding: "16px 20px", borderRadius: "8px", background: "rgba(16,185,129,0.15)", border: "1px solid #10b981", color: "#10b981", fontSize: "14px", fontWeight: 600 }}>
          ✓ Jevxo CMS state synced! All public page routes (Home, Services, Portfolio, Blog, Careers) have updated instantly in the browser. 
          <span style={{ marginLeft: "12px", color: "#fff" }}>
            <Link href="/" target="_blank" style={{ textDecoration: "underline" }}>View Live Site ↗</Link>
          </span>
        </div>
      )}

      {/* Dynamic Tab selection headers */}
      <div style={{ display: "flex", gap: "6px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px", flexWrap: "wrap" }}>
        {(["hero", "nodes", "pricing", "services", "portfolio", "blog", "jobs", "inbox"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              background: activeTab === tab ? "rgba(124,58,237,0.15)" : "transparent",
              color: activeTab === tab ? "#a78bfa" : "var(--text-secondary)",
              fontWeight: activeTab === tab ? 700 : 500,
              cursor: "pointer",
              textTransform: "capitalize",
              fontSize: "12px"
            }}
          >
            {tab === "hero" && "📝 Hero Section"}
            {tab === "nodes" && "🌍 Map Nodes"}
            {tab === "pricing" && "💰 Subscriptions"}
            {tab === "services" && "💼 Services Catalog"}
            {tab === "portfolio" && "🎨 Project Portfolio"}
            {tab === "blog" && "📚 Blog Publisher"}
            {tab === "jobs" && "🎯 Careers Board"}
            {tab === "inbox" && `📥 Contact Inbox (${messages.length})`}
          </button>
        ))}
      </div>

      {/* Editor Content Area */}
      <div className="glass" style={{ padding: "32px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
        
        {/* HERO SECTION MANAGER */}
        {activeTab === "hero" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Ecosystem Version Tag</label>
              <input
                type="text"
                value={heroTag}
                onChange={(e) => setHeroTag(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", color: "#fff", fontSize: "14px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Hero Heading Text (use &apos;||&apos; to highlight second half with gradients)</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", color: "#fff", fontSize: "14px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px" }}>Hero Sub-description</label>
              <textarea
                rows={5}
                value={heroDesc}
                onChange={(e) => setHeroDesc(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", color: "#fff", fontSize: "14px", lineHeight: "1.6" }}
              />
            </div>
          </div>
        )}

        {/* NETWORK MAP NODES MANAGER */}
        {activeTab === "nodes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700 }}>🌍 Map Coordinates and regional details</h3>
              <button
                onClick={() => setNodes([...nodes, { id: `node_${Date.now()}`, name: "New Country Node", x: "50%", y: "50%", clients: "10+", partners: "2", websites: "20+", revenue: "$60k/yr" }])}
                style={{ padding: "6px 12px", borderRadius: "6px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
              >
                + Add Map Node
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {nodes.map((node, index) => (
                <div key={node.id} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr 1fr 0.4fr", gap: "12px", background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)", alignItems: "center" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", color: "var(--text-muted)", marginBottom: "4px" }}>Country / Name</label>
                    <input
                      type="text"
                      value={node.name}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].name = e.target.value;
                        setNodes(copy);
                      }}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "12px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", color: "var(--text-muted)", marginBottom: "4px" }}>X coordinate (%)</label>
                    <input
                      type="text"
                      value={node.x}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].x = e.target.value;
                        setNodes(copy);
                      }}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "12px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", color: "var(--text-muted)", marginBottom: "4px" }}>Y coordinate (%)</label>
                    <input
                      type="text"
                      value={node.y}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].y = e.target.value;
                        setNodes(copy);
                      }}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "12px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", color: "var(--text-muted)", marginBottom: "4px" }}>Client Count</label>
                    <input
                      type="text"
                      value={node.clients}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].clients = e.target.value;
                        setNodes(copy);
                      }}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "12px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", color: "var(--text-muted)", marginBottom: "4px" }}>Annual Rev</label>
                    <input
                      type="text"
                      value={node.revenue}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].revenue = e.target.value;
                        setNodes(copy);
                      }}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "12px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "10px", color: "var(--text-muted)", marginBottom: "4px" }}>Partner Count</label>
                    <input
                      type="text"
                      value={node.partners}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].partners = e.target.value;
                        setNodes(copy);
                      }}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "12px" }}
                    />
                  </div>
                  <button
                    onClick={() => setNodes(nodes.filter((_, idx) => idx !== index))}
                    style={{ background: "none", border: "none", color: "#ef4444", fontSize: "16px", cursor: "pointer", marginTop: "16px" }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRICING SUBSCRIPTIONS MANAGER */}
        {activeTab === "pricing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700 }}>💰 Edit Pricing Plans</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {plans.map((plan, index) => (
                <div key={index} style={{ background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#a78bfa", marginBottom: "16px" }}>{plan.name} Plan</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Price / Month ($)</label>
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) => {
                          const copy = [...plans];
                          copy[index].price = parseInt(e.target.value) || 0;
                          setPlans(copy);
                        }}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Plan Title</label>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => {
                          const copy = [...plans];
                          copy[index].name = e.target.value;
                          setPlans(copy);
                        }}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Plan Description</label>
                    <input
                      type="text"
                      value={plan.desc}
                      onChange={(e) => {
                        const copy = [...plans];
                        copy[index].desc = e.target.value;
                        setPlans(copy);
                      }}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES CATALOG MANAGER */}
        {activeTab === "services" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700 }}>💼 Public Services Details</h3>
              <button
                onClick={addService}
                style={{ padding: "6px 12px", borderRadius: "6px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
              >
                + Add Service
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {servicesList.map((srv, idx) => (
                <div key={srv.id} style={{ background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 0.8fr 0.8fr 0.2fr", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Service Title</label>
                      <input
                        type="text"
                        value={srv.title}
                        onChange={(e) => updateService(idx, "title", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Route Slug</label>
                      <input
                        type="text"
                        value={srv.slug}
                        onChange={(e) => updateService(idx, "slug", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Tagline</label>
                      <input
                        type="text"
                        value={srv.tagline}
                        onChange={(e) => updateService(idx, "tagline", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Starting Cost</label>
                      <input
                        type="text"
                        value={srv.startingPrice}
                        onChange={(e) => updateService(idx, "startingPrice", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Timeline</label>
                      <input
                        type="text"
                        value={srv.duration}
                        onChange={(e) => updateService(idx, "duration", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <button
                      onClick={() => deleteService(idx)}
                      style={{ background: "none", border: "none", color: "#ef4444", fontSize: "16px", cursor: "pointer", marginTop: "16px" }}
                    >
                      🗑️
                    </button>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Service Overview Description</label>
                    <textarea
                      rows={3}
                      value={srv.description}
                      onChange={(e) => updateService(idx, "description", e.target.value)}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px", lineHeight: 1.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PORTFOLIO SHOWCASE MANAGER */}
        {activeTab === "portfolio" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700 }}>🎨 Case-Study Portfolio Items</h3>
              <button
                onClick={addPortfolio}
                style={{ padding: "6px 12px", borderRadius: "6px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
              >
                + Add Project
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {portfolioList.map((p, idx) => (
                <div key={p.id} style={{ background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr 0.5fr 0.2fr", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Project Title</label>
                      <input
                        type="text"
                        value={p.title}
                        onChange={(e) => updatePortfolio(idx, "title", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Slug</label>
                      <input
                        type="text"
                        value={p.slug}
                        onChange={(e) => updatePortfolio(idx, "slug", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Client Name</label>
                      <input
                        type="text"
                        value={p.client}
                        onChange={(e) => updatePortfolio(idx, "client", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Category</label>
                      <select
                        value={p.category}
                        onChange={(e) => updatePortfolio(idx, "category", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Mobile Apps">Mobile Apps</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="AI Integration">AI Integration</option>
                        <option value="Cloud & DevOps">Cloud & DevOps</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Featured</label>
                      <input
                        type="checkbox"
                        checked={p.featured}
                        onChange={(e) => updatePortfolio(idx, "featured", e.target.checked)}
                        style={{ width: "20px", height: "20px", cursor: "pointer", display: "block", margin: "8px auto 0" }}
                      />
                    </div>
                    <button
                      onClick={() => deletePortfolio(idx)}
                      style={{ background: "none", border: "none", color: "#ef4444", fontSize: "16px", cursor: "pointer", marginTop: "16px" }}
                    >
                      🗑️
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>The Challenge</label>
                      <textarea
                        rows={2}
                        value={p.challenge}
                        onChange={(e) => updatePortfolio(idx, "challenge", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Our Solution</label>
                      <textarea
                        rows={2}
                        value={p.solution}
                        onChange={(e) => updatePortfolio(idx, "solution", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Result Outcome</label>
                    <input
                      type="text"
                      value={p.result}
                      onChange={(e) => updatePortfolio(idx, "result", e.target.value)}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG ARTICLES PUBLISHER */}
        {activeTab === "blog" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700 }}>📚 Public Blog Posts</h3>
              <button
                onClick={addBlog}
                style={{ padding: "6px 12px", borderRadius: "6px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
              >
                + Publish Post
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {blogList.map((post, idx) => (
                <div key={post.id} style={{ background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 0.8fr 0.5fr 0.2fr", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Article Title</label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) => updateBlog(idx, "title", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Slug</label>
                      <input
                        type="text"
                        value={post.slug}
                        onChange={(e) => updateBlog(idx, "slug", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Category</label>
                      <select
                        value={post.category}
                        onChange={(e) => updateBlog(idx, "category", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="AI">AI</option>
                        <option value="Mobile">Mobile</option>
                        <option value="DevOps">DevOps</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Read Duration</label>
                      <input
                        type="text"
                        value={post.readTime}
                        onChange={(e) => updateBlog(idx, "readTime", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Featured</label>
                      <input
                        type="checkbox"
                        checked={post.featured}
                        onChange={(e) => updateBlog(idx, "featured", e.target.checked)}
                        style={{ width: "20px", height: "20px", cursor: "pointer", display: "block", margin: "8px auto 0" }}
                      />
                    </div>
                    <button
                      onClick={() => deleteBlog(idx)}
                      style={{ background: "none", border: "none", color: "#ef4444", fontSize: "16px", cursor: "pointer", marginTop: "16px" }}
                    >
                      🗑️
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Author Name</label>
                      <input
                        type="text"
                        value={post.author.name}
                        onChange={(e) => updateBlog(idx, "authorName", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Author Role</label>
                      <input
                        type="text"
                        value={post.author.role}
                        onChange={(e) => updateBlog(idx, "authorRole", e.target.value)}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Excerpt Text Description</label>
                    <textarea
                      rows={2}
                      value={post.excerpt}
                      onChange={(e) => updateBlog(idx, "excerpt", e.target.value)}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAREERS BOARD VACANCY LISTINGS */}
        {activeTab === "jobs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700 }}>💼 Careers Board Listings</h3>
              <button
                onClick={() => setJobs([...jobs, { title: "New Vacancy Opening", type: "Full-Time / Remote", salary: "$2,000/mo", desc: "Brief description of expectations..." }])}
                style={{ padding: "6px 12px", borderRadius: "6px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
              >
                + Add Vacancy Listing
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {jobs.map((job, index) => (
                <div key={index} style={{ background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 0.2fr", gap: "16px", marginBottom: "12px", alignItems: "center" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Job Title</label>
                      <input
                        type="text"
                        value={job.title}
                        onChange={(e) => {
                          const copy = [...jobs];
                          copy[index].title = e.target.value;
                          setJobs(copy);
                        }}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Job Category / Type</label>
                      <input
                        type="text"
                        value={job.type}
                        onChange={(e) => {
                          const copy = [...jobs];
                          copy[index].type = e.target.value;
                          setJobs(copy);
                        }}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Salary / Incentive Budget</label>
                      <input
                        type="text"
                        value={job.salary}
                        onChange={(e) => {
                          const copy = [...jobs];
                          copy[index].salary = e.target.value;
                          setJobs(copy);
                        }}
                        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    <button
                      onClick={() => setJobs(jobs.filter((_, idx) => idx !== index))}
                      style={{ background: "none", border: "none", color: "#ef4444", fontSize: "16px", cursor: "pointer", marginTop: "16px" }}
                    >
                      🗑️
                    </button>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "4px" }}>Description</label>
                    <textarea
                      rows={2}
                      value={job.desc}
                      onChange={(e) => {
                        const copy = [...jobs];
                        copy[index].desc = e.target.value;
                        setJobs(copy);
                      }}
                      style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border)", background: "#0c1524", color: "#fff", fontSize: "13px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT MESSAGE INBOX LOGGER */}
        {activeTab === "inbox" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700 }}>📥 Inbound Customer Messages Logs</h3>
                <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>Real-time logs of enquiries submitted via home page or contact page forms.</p>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={clearMessages}
                  style={{ padding: "6px 12px", borderRadius: "6px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                >
                  Clear Inbox
                </button>
              )}
            </div>

            {messages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)", fontSize: "14px" }}>
                📬 No messages in the inbox yet. Test by submitting forms on the Home or Contact page!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
                      <div>
                        <strong style={{ color: "#fff", fontSize: "14px" }}>{msg.name}</strong> 
                        <span style={{ color: "var(--text-secondary)", fontSize: "12px", marginLeft: "8px" }}>({msg.email})</span>
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        {new Date(msg.submittedAt).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px", fontSize: "12px" }}>
                      <div>
                        <span style={{ color: "var(--text-muted)" }}>Service Required:</span> <span style={{ color: "#a78bfa", fontWeight: 600 }}>{msg.type}</span>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-muted)" }}>Inquiry Budget:</span> <span style={{ color: "#10b981", fontWeight: 600 }}>{msg.budget}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", background: "rgba(0,0,0,0.15)", padding: "12px", borderRadius: "6px", margin: 0, lineHeight: 1.6 }}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
