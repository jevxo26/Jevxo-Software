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
  };  return (
    <div className="flex flex-col gap-7">
      
      {/* CMS control panel header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Ecosystem Page Builder (CMS)</h2>
          <p className="text-xs text-slate-600 mt-0.5">Modify public website layouts, services pricing, blog updates, case-studies and verify inbox logs.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleResetDefaults}
            className="py-2.5 px-[18px] rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-[13px] font-semibold cursor-pointer hover:bg-red-500/20 transition-all duration-200"
          >
            Reset Defaults
          </button>
          <button
            onClick={handleSaveAll}
            className="py-2.5 px-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 border-none text-white text-[13px] font-bold cursor-pointer shadow-[0_4px_15px_rgba(124, 58, 237, 0.25)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.35)] transition-all duration-200"
          >
            Apply & Save CMS Changes
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-lg bg-emerald-500/15 border border-emerald-500 text-emerald-600 text-sm font-semibold flex items-center justify-between">
          <span>
            ✓ Jevxo CMS state synced! All public page routes (Home, Services, Portfolio, Blog, Careers) have updated instantly in the browser.
          </span>
          <span className="ml-3 text-white">
            <Link href="/" target="_blank" className="underline text-violet-600 hover:text-violet-700">View Live Site ↗</Link>
          </span>
        </div>
      )}

      {/* Dynamic Tab selection headers */}
      <div className="flex gap-1.5 border-b border-slate-900/10 pb-3 flex-wrap">
        {(["hero", "nodes", "pricing", "services", "portfolio", "blog", "jobs", "inbox"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200 ${
              activeTab === tab
                ? "bg-violet-600/10 text-violet-600 font-bold border border-violet-600/20"
                : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-900/5"
            }`}
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
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] p-8 rounded-2xl">
        
        {/* HERO SECTION MANAGER */}
        {activeTab === "hero" && (
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold text-violet-600 uppercase mb-2">Ecosystem Version Tag</label>
              <input
                type="text"
                value={heroTag}
                onChange={(e) => setHeroTag(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-violet-600 uppercase mb-2">Hero Heading Text (use &apos;||&apos; to highlight second half with gradients)</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-violet-600 uppercase mb-2">Hero Sub-description</label>
              <textarea
                rows={5}
                value={heroDesc}
                onChange={(e) => setHeroDesc(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* NETWORK MAP NODES MANAGER */}
        {activeTab === "nodes" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] font-bold text-slate-900">🌍 Map Coordinates and regional details</h3>
              <button
                onClick={() => setNodes([...nodes, { id: `node_${Date.now()}`, name: "New Country Node", x: "50%", y: "50%", clients: "10+", partners: "2", websites: "20+", revenue: "$60k/yr" }])}
                className="py-1.5 px-3 rounded-lg bg-violet-600/10 border border-violet-600/20 text-violet-600 text-xs font-semibold cursor-pointer hover:bg-violet-600/20 transition-colors"
              >
                + Add Map Node
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {nodes.map((node, index) => (
                <div key={node.id} className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1fr_0.4fr] gap-3 bg-slate-900/5 p-4 rounded-xl border border-slate-900/5 items-center">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Country / Name</label>
                    <input
                      type="text"
                      value={node.name}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].name = e.target.value;
                        setNodes(copy);
                      }}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">X coordinate (%)</label>
                    <input
                      type="text"
                      value={node.x}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].x = e.target.value;
                        setNodes(copy);
                      }}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Y coordinate (%)</label>
                    <input
                      type="text"
                      value={node.y}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].y = e.target.value;
                        setNodes(copy);
                      }}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Client Count</label>
                    <input
                      type="text"
                      value={node.clients}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].clients = e.target.value;
                        setNodes(copy);
                      }}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Annual Rev</label>
                    <input
                      type="text"
                      value={node.revenue}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].revenue = e.target.value;
                        setNodes(copy);
                      }}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Partner Count</label>
                    <input
                      type="text"
                      value={node.partners}
                      onChange={(e) => {
                        const copy = [...nodes];
                        copy[index].partners = e.target.value;
                        setNodes(copy);
                      }}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>
                  <button
                    onClick={() => setNodes(nodes.filter((_, idx) => idx !== index))}
                    className="bg-transparent border-none text-red-500 text-base cursor-pointer mt-4 hover:scale-110 transition-transform"
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
          <div className="flex flex-col gap-6">
            <h3 className="text-[15px] font-bold text-slate-900">💰 Edit Pricing Plans</h3>
            <div className="grid grid-cols-2 gap-5">
              {plans.map((plan, index) => (
                <div key={index} className="bg-slate-900/5 p-5 rounded-xl border border-slate-900/5">
                  <h4 className="text-sm font-bold text-violet-600 mb-4">{plan.name} Plan</h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Price / Month ($)</label>
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) => {
                          const copy = [...plans];
                          copy[index].price = parseInt(e.target.value) || 0;
                          setPlans(copy);
                        }}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Plan Title</label>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => {
                          const copy = [...plans];
                          copy[index].name = e.target.value;
                          setPlans(copy);
                        }}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Plan Description</label>
                    <input
                      type="text"
                      value={plan.desc}
                      onChange={(e) => {
                        const copy = [...plans];
                        copy[index].desc = e.target.value;
                        setPlans(copy);
                      }}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES CATALOG MANAGER */}
        {activeTab === "services" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] font-bold text-slate-900">💼 Public Services Details</h3>
              <button
                onClick={addService}
                className="py-1.5 px-3 rounded-lg bg-violet-600/10 border border-violet-600/20 text-violet-600 text-xs font-semibold cursor-pointer hover:bg-violet-600/20 transition-colors"
              >
                + Add Service
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {servicesList.map((srv, idx) => (
                <div key={srv.id} className="bg-slate-900/5 p-5 rounded-xl border border-slate-900/5">
                  <div className="grid grid-cols-[1fr_1fr_1fr_0.8fr_0.8fr_0.2fr] gap-3 mb-3 items-center">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Service Title</label>
                      <input
                        type="text"
                        value={srv.title}
                        onChange={(e) => updateService(idx, "title", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Route Slug</label>
                      <input
                        type="text"
                        value={srv.slug}
                        onChange={(e) => updateService(idx, "slug", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={srv.tagline}
                        onChange={(e) => updateService(idx, "tagline", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Starting Cost</label>
                      <input
                        type="text"
                        value={srv.startingPrice}
                        onChange={(e) => updateService(idx, "startingPrice", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Timeline</label>
                      <input
                        type="text"
                        value={srv.duration}
                        onChange={(e) => updateService(idx, "duration", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <button
                      onClick={() => deleteService(idx)}
                      className="bg-transparent border-none text-red-500 text-base cursor-pointer mt-4 hover:scale-110 transition-transform"
                    >
                      🗑️
                    </button>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Service Overview Description</label>
                    <textarea
                      rows={3}
                      value={srv.description}
                      onChange={(e) => updateService(idx, "description", e.target.value)}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PORTFOLIO SHOWCASE MANAGER */}
        {activeTab === "portfolio" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] font-bold text-slate-900">🎨 Case-Study Portfolio Items</h3>
              <button
                onClick={addPortfolio}
                className="py-1.5 px-3 rounded-lg bg-violet-600/10 border border-violet-600/20 text-violet-600 text-xs font-semibold cursor-pointer hover:bg-violet-600/20 transition-colors"
              >
                + Add Project
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {portfolioList.map((p, idx) => (
                <div key={p.id} className="bg-slate-900/5 p-5 rounded-xl border border-slate-900/5">
                  <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_0.5fr_0.2fr] gap-3 mb-3 items-center">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={p.title}
                        onChange={(e) => updatePortfolio(idx, "title", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Slug</label>
                      <input
                        type="text"
                        value={p.slug}
                        onChange={(e) => updatePortfolio(idx, "slug", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Client Name</label>
                      <input
                        type="text"
                        value={p.client}
                        onChange={(e) => updatePortfolio(idx, "client", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Category</label>
                      <select
                        value={p.category}
                        onChange={(e) => updatePortfolio(idx, "category", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-violet-600"
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
                      <label className="block text-[11px] text-slate-500 mb-1 text-center">Featured</label>
                      <input
                        type="checkbox"
                        checked={p.featured}
                        onChange={(e) => updatePortfolio(idx, "featured", e.target.checked)}
                        className="w-5 h-5 cursor-pointer block mx-auto mt-2"
                      />
                    </div>
                    <button
                      onClick={() => deletePortfolio(idx)}
                      className="bg-transparent border-none text-red-500 text-base cursor-pointer mt-4 hover:scale-110 transition-transform"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">The Challenge</label>
                      <textarea
                        rows={2}
                        value={p.challenge}
                        onChange={(e) => updatePortfolio(idx, "challenge", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Our Solution</label>
                      <textarea
                        rows={2}
                        value={p.solution}
                        onChange={(e) => updatePortfolio(idx, "solution", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Result Outcome</label>
                    <input
                      type="text"
                      value={p.result}
                      onChange={(e) => updatePortfolio(idx, "result", e.target.value)}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG ARTICLES PUBLISHER */}
        {activeTab === "blog" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] font-bold text-slate-900">📚 Public Blog Posts</h3>
              <button
                onClick={addBlog}
                className="py-1.5 px-3 rounded-lg bg-violet-600/10 border border-violet-600/20 text-violet-600 text-xs font-semibold cursor-pointer hover:bg-violet-600/20 transition-colors"
              >
                + Publish Post
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {blogList.map((post, idx) => (
                <div key={post.id} className="bg-slate-900/5 p-5 rounded-xl border border-slate-900/5">
                  <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr_0.5fr_0.2fr] gap-3 mb-3 items-center">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Article Title</label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) => updateBlog(idx, "title", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Slug</label>
                      <input
                        type="text"
                        value={post.slug}
                        onChange={(e) => updateBlog(idx, "slug", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Category</label>
                      <select
                        value={post.category}
                        onChange={(e) => updateBlog(idx, "category", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-violet-600"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="AI">AI</option>
                        <option value="Mobile">Mobile</option>
                        <option value="DevOps">DevOps</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Read Duration</label>
                      <input
                        type="text"
                        value={post.readTime}
                        onChange={(e) => updateBlog(idx, "readTime", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1 text-center">Featured</label>
                      <input
                        type="checkbox"
                        checked={post.featured}
                        onChange={(e) => updateBlog(idx, "featured", e.target.checked)}
                        className="w-5 h-5 cursor-pointer block mx-auto mt-2"
                      />
                    </div>
                    <button
                      onClick={() => deleteBlog(idx)}
                      className="bg-transparent border-none text-red-500 text-base cursor-pointer mt-4 hover:scale-110 transition-transform"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Author Name</label>
                      <input
                        type="text"
                        value={post.author.name}
                        onChange={(e) => updateBlog(idx, "authorName", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Author Role</label>
                      <input
                        type="text"
                        value={post.author.role}
                        onChange={(e) => updateBlog(idx, "authorRole", e.target.value)}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Excerpt Text Description</label>
                    <textarea
                      rows={2}
                      value={post.excerpt}
                      onChange={(e) => updateBlog(idx, "excerpt", e.target.value)}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAREERS BOARD VACANCY LISTINGS */}
        {activeTab === "jobs" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] font-bold text-slate-900">💼 Careers Board Listings</h3>
              <button
                onClick={() => setJobs([...jobs, { title: "New Vacancy Opening", type: "Full-Time / Remote", salary: "$2,000/mo", desc: "Brief description of expectations..." }])}
                className="py-1.5 px-3 rounded-lg bg-violet-600/10 border border-violet-600/20 text-violet-600 text-xs font-semibold cursor-pointer hover:bg-violet-600/20 transition-colors"
              >
                + Add Vacancy Listing
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {jobs.map((job, index) => (
                <div key={index} className="bg-slate-900/5 p-5 rounded-xl border border-slate-900/5">
                  <div className="grid grid-cols-[1.2fr_1fr_1fr_0.2fr] gap-4 mb-3 items-center">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={job.title}
                        onChange={(e) => {
                          const copy = [...jobs];
                          copy[index].title = e.target.value;
                          setJobs(copy);
                        }}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Job Category / Type</label>
                      <input
                        type="text"
                        value={job.type}
                        onChange={(e) => {
                          const copy = [...jobs];
                          copy[index].type = e.target.value;
                          setJobs(copy);
                        }}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Salary / Incentive Budget</label>
                      <input
                        type="text"
                        value={job.salary}
                        onChange={(e) => {
                          const copy = [...jobs];
                          copy[index].salary = e.target.value;
                          setJobs(copy);
                        }}
                        className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                      />
                    </div>
                    <button
                      onClick={() => setJobs(jobs.filter((_, idx) => idx !== index))}
                      className="bg-transparent border-none text-red-500 text-base cursor-pointer mt-4 hover:scale-110 transition-transform"
                    >
                      🗑️
                    </button>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={job.desc}
                      onChange={(e) => {
                        const copy = [...jobs];
                        copy[index].desc = e.target.value;
                        setJobs(copy);
                      }}
                      className="w-full p-2 rounded border border-slate-900/[0.08] bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT MESSAGE INBOX LOGGER */}
        {activeTab === "inbox" && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[15px] font-bold text-slate-900">📥 Inbound Customer Messages Logs</h3>
                <p className="text-xs text-slate-600 mt-0.5">Real-time logs of enquiries submitted via home page or contact page forms.</p>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={clearMessages}
                  className="py-1.5 px-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold cursor-pointer hover:bg-red-500/20 transition-colors"
                >
                  Clear Inbox
                </button>
              )}
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-15 text-slate-400 text-sm">
                📬 No messages in the inbox yet. Test by submitting forms on the Home or Contact page!
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-slate-900/5 p-5 rounded-xl border border-slate-900/5">
                    <div className="flex justify-between border-b border-slate-900/10 pb-2.5 mb-3 flex-wrap gap-2.5">
                      <div>
                        <strong className="text-slate-900 text-sm">{msg.name}</strong>
                        <span className="text-slate-500 text-xs ml-2">({msg.email})</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(msg.submittedAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 mb-2.5 text-xs">
                      <div>
                        <span className="text-slate-500">Service Required:</span> <span className="text-violet-600 font-semibold">{msg.type}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Inquiry Budget:</span> <span className="text-emerald-600 font-semibold">{msg.budget}</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-slate-600 bg-white p-3 rounded-lg margin-0 border border-slate-900/[0.04] leading-relaxed">
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
