"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  icon: string;
  category: "Business" | "F&B" | "EdTech" | "Operations";
  price: string;
  features: string[];
  specs: string[];
}

const productsList: ProductItem[] = [
  {
    id: "crm",
    name: "Jevxo CRM Suite",
    tagline: "Automate lead tracking and sales conversations",
    desc: "A high-performance pipeline tracker designed for global agency nodes. Auto-score inbound leads, track deals via visual Kanban boards, and generate monthly revenue forecast logs instantly.",
    icon: "📊",
    category: "Business",
    price: "$49 / mo starting",
    features: ["Visual Kanban Pipeline", "AI Lead Conversion Scoring", "Inbound Mail Integration", "Performance Leaderboards"],
    specs: ["Cloud Node Replication", "REST API Integration", "Next.js Console Powered"]
  },
  {
    id: "hrm",
    name: "Jevxo HRM Core",
    tagline: "Unify employee records, attendance, and payroll",
    desc: "Scale your team operations with zero manual spreadsheets. Includes face-matching attendance records, automated leave request workflows, and instant multi-currency payroll generations.",
    icon: "👥",
    category: "Operations",
    price: "$79 / mo starting",
    features: ["Attendance Tracker logs", "Dynamic Leave Approval Chains", "One-Click Payroll Generator", "Intern Evaluator Modules"],
    specs: ["Encrypted Database Storage", "2FA Security Toggles", "Exportable CSV reports"]
  },
  {
    id: "school",
    name: "Jevxo School Net",
    tagline: "Complete student portal and academic administrative console",
    desc: "A unified operating network designed for schools and universities. Manage admissions queues, record grades, and receive tuition fees through secure payment portals.",
    icon: "🎓",
    category: "EdTech",
    price: "$149 / mo starting",
    features: ["Student & Teacher Portals", "Class Grading Ledgers", "Auto Invoice Fee System", "Direct Parent Communications"],
    specs: ["Country Domain Routing", "High Availability Uptime", "99.9% database backups"]
  },
  {
    id: "pos",
    name: "Jevxo Restaurant POS",
    tagline: "Synchronized orders, POS billing, and kitchen boards",
    desc: "Power your restaurant branch nodes. Synchronize customer mobile menu scanners, manage kitchen order display systems, and check real-time sales tallies in one screen.",
    icon: "🍽️",
    category: "F&B",
    price: "$39 / mo starting",
    features: ["QR Menu Scanners", "Kitchen Display Queue (KDS)", "Instant POS Billing Prints", "Inventory Stock Monitor"],
    specs: ["Local Cache Offline Mode", "Printer API Integrations", "Analytics Reports Sync"]
  },
  {
    id: "erp",
    name: "Jevxo Business ERP",
    tagline: "Unified assets ledger, stocks, and balance tracker",
    desc: "Our most comprehensive management engine. Track multi-region inventory locations, generate double-entry ledgers, print customized client invoices, and monitor operational costs.",
    icon: "📈",
    category: "Business",
    price: "$199 / mo starting",
    features: ["Multi-warehouse Inventory", "Double-entry Accounting ledger", "Automated Client Invoices", "Regional Tax Handlers"],
    specs: ["Enterprise Grade Security", "Dedicated Server Compute", "Daily Cloud Backup Nodes"]
  }
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeTab, setActiveTab] = useState<"All" | "Business" | "Operations" | "EdTech" | "F&B">("All");

  const filtered = activeTab === "All" ? productsList : productsList.filter(p => p.category === activeTab);

  return (
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden", paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="orb orb-violet" style={{ width: "500px", height: "500px", top: "-200px", left: "-100px" }} />
        <div className="orb orb-cyan"   style={{ width: "350px", height: "350px", bottom: "-100px", right: "-80px" }} />
        
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Software Catalog
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "20px" }}>
            Ready-to-Deploy<br /><span className="gradient-text">SaaS Products</span>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "580px", margin: "0 auto 40px", lineHeight: 1.8 }}>
            Robust, pre-built operating panels designed to deploy directly into your corporate cloud nodes within hours.
          </p>

          {/* Filters */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {(["All", "Business", "Operations", "EdTech", "F&B"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 20px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                  background: activeTab === tab ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                  color: activeTab === tab ? "#a78bfa" : "var(--text-secondary)",
                  borderWidth: "1px", borderStyle: "solid",
                  borderColor: activeTab === tab ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
                  transition: "all 0.2s ease"
                }}
              >
                {tab === "All" ? "🛍️ All Products" : tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section" style={{ paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
            {filtered.map((prod) => (
              <div
                key={prod.id}
                className="glass"
                style={{
                  padding: "32px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex", flexDirection: "column", justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontSize: "36px" }}>{prod.icon}</span>
                    <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                      {prod.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>{prod.name}</h3>
                  <p style={{ color: "#a78bfa", fontSize: "12px", fontWeight: 600, marginBottom: "16px" }}>{prod.tagline}</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>{prod.desc}</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                    {prod.features.slice(0, 3).map((f) => (
                      <div key={f} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: "var(--text-secondary)" }}>
                        <span style={{ color: "#a78bfa" }}>✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>License Rate</span>
                    <strong style={{ fontSize: "15px", color: "#fff" }}>{prod.price}</strong>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    style={{
                      padding: "8px 18px", borderRadius: "8px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)",
                      color: "#a78bfa", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease"
                    }}
                  >
                    Details & Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Detail Dialog */}
      {selectedProduct && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "rgba(4,6,12,0.85)", backdropFilter: "blur(8px)" }}>
          <div className="glass" style={{ width: "100%", maxWidth: "600px", padding: "40px", borderRadius: "20px", background: "rgba(8,13,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", position: "relative" }}>
            <button
              onClick={() => setSelectedProduct(null)}
              style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", color: "var(--text-secondary)", fontSize: "20px", cursor: "pointer" }}
            >
              ×
            </button>

            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "44px" }}>{selectedProduct.icon}</span>
              <div>
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>{selectedProduct.name}</h3>
                <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: 600 }}>{selectedProduct.tagline}</span>
              </div>
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px" }}>
              {selectedProduct.desc}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }} className="modal-specs-grid">
              <div>
                <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "10px", letterSpacing: "0.05em" }}>Core Capabilities</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedProduct.features.map(f => (
                    <div key={f} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: "var(--text-secondary)" }}>
                      <span style={{ color: "#a78bfa" }}>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "10px", letterSpacing: "0.05em" }}>Technical Specs</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedProduct.specs.map(s => (
                    <div key={s} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: "var(--text-secondary)" }}>
                      <span style={{ color: "#a78bfa" }}>↳</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <Link
                href="/contact"
                onClick={() => setSelectedProduct(null)}
                style={{
                  flex: 1, padding: "14px", borderRadius: "10px", textAlign: "center", fontWeight: 700, fontSize: "14px",
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff"
                }}
              >
                Purchase Product Licence ({selectedProduct.price.split(" ")[0]})
              </Link>
              <button
                onClick={() => { alert(`Launching interactive sandboxed demo portal for ${selectedProduct.name}...`); setSelectedProduct(null); }}
                style={{
                  padding: "14px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "14px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer"
                }}
              >
                Launch Sandbox Demo
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
