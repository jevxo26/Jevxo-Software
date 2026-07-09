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
    <div className="bg-[#080d1a] text-[#f1f5f9] min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden pt-[140px] pb-[60px]">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[500px] h-[500px] -top-[200px] -left-[100px]" />
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-cyan-500/[0.06] w-[350px] h-[350px] -bottom-[100px] -right-[80px]" />
        
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
          <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/30 bg-violet-600/8 text-xs font-semibold text-violet-400 mb-6 uppercase tracking-widest">
            Software Catalog
          </div>
          <h1 className="text-[clamp(36px,6vw,64px)] font-black tracking-tight mb-5">
            Ready-to-Deploy<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">SaaS Products</span>
          </h1>
          <p className="text-[17px] text-slate-600 max-w-[580px] mx-auto mb-10 leading-relaxed">
            Robust, pre-built operating panels designed to deploy directly into your corporate cloud nodes within hours.
          </p>

          {/* Filters */}
          <div className="flex gap-2.5 justify-center flex-wrap">
            {(["All", "Business", "Operations", "EdTech", "F&B"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-5 rounded-lg text-[13px] font-semibold cursor-pointer border border-solid transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-violet-600/15 text-violet-400 border-violet-600/30"
                    : "bg-white/3 text-slate-600 border-white/6"
                }`}
              >
                {tab === "All" ? "🛍️ All Products" : tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-[100px] md:py-[70px] pb-25">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-7">
            {filtered.map((prod) => (
              <div
                key={prod.id}
                className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-2xl bg-white/[0.01] border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-4xl">{prod.icon}</span>
                    <span className="text-[11px] font-bold py-0.5 px-2 rounded-full bg-white/4 border border-white/8 text-slate-600">
                      {prod.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-1.5">{prod.name}</h3>
                  <p className="text-[#a78bfa] text-xs font-semibold mb-4">{prod.tagline}</p>
                  <p className="text-slate-600 text-sm leading-normal mb-6">{prod.desc}</p>

                  <div className="flex flex-col gap-2.5 mb-7">
                    {prod.features.slice(0, 3).map((f) => (
                      <div key={f} className="flex gap-2 items-center text-[13px] text-slate-600">
                        <span className="text-[#a78bfa]">✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-white/6 pt-5">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">License Rate</span>
                    <strong className="text-[15px] text-white font-bold">{prod.price}</strong>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="py-2 px-[18px] rounded-lg bg-violet-600/10 border border-violet-600/30 text-[#a78bfa] text-[13px] font-semibold cursor-pointer transition-all duration-200"
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
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-5 bg-[#04060c]/85 backdrop-blur-sm">
          <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 w-full max-w-[600px] p-10 rounded-[20px] bg-[#080d1a]/95 border-white/10 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 bg-transparent border-none text-slate-600 text-xl cursor-pointer"
            >
              ×
            </button>

            <div className="flex gap-4 items-center mb-5">
              <span className="text-[44px]">{selectedProduct.icon}</span>
              <div>
                <h3 className="text-2xl font-extrabold text-white">{selectedProduct.name}</h3>
                <span className="text-xs text-[#a78bfa] font-semibold">{selectedProduct.tagline}</span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedProduct.desc}
            </p>

            <div className="modal-specs-grid grid grid-cols-2 gap-5 mb-7">
              <div>
                <h4 className="text-xs font-bold text-white uppercase mb-2.5 tracking-wider">Core Capabilities</h4>
                <div className="flex flex-col gap-2">
                  {selectedProduct.features.map(f => (
                    <div key={f} className="flex gap-2 items-center text-[13px] text-slate-600">
                      <span className="text-[#a78bfa]">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase mb-2.5 tracking-wider">Technical Specs</h4>
                <div className="flex flex-col gap-2">
                  {selectedProduct.specs.map(s => (
                    <div key={s} className="flex gap-2 items-center text-[13px] text-slate-600">
                      <span className="text-[#a78bfa]">↳</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/contact"
                onClick={() => setSelectedProduct(null)}
                className="flex-1 py-3.5 rounded-lg text-center font-bold text-sm bg-gradient-to-br from-violet-600 to-indigo-600 text-white"
              >
                Purchase Product Licence ({selectedProduct.price.split(" ")[0]})
              </Link>
              <button
                onClick={() => { alert(`Launching interactive sandboxed demo portal for ${selectedProduct.name}...`); setSelectedProduct(null); }}
                className="py-3.5 px-6 rounded-lg font-bold text-sm bg-white/4 border border-white/8 text-white cursor-pointer"
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
