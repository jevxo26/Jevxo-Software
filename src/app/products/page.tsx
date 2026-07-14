"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  desc: string;
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
    category: "Business",
    price: "$199 / mo starting",
    features: ["Multi-warehouse Inventory", "Double-entry Accounting ledger", "Automated Client Invoices", "Regional Tax Handlers"],
    specs: ["Enterprise Grade Security", "Dedicated Server Compute", "Daily Cloud Backup Nodes"]
  }
];

// Custom Premium SVGs
const IconCRM = () => (
  <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconHRM = () => (
  <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconSchool = () => (
  <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const IconPOS = () => (
  <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconERP = () => (
  <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconShoppingBag = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const productIcons: Record<string, React.ReactNode> = {
  crm: <IconCRM />,
  hrm: <IconHRM />,
  school: <IconSchool />,
  pos: <IconPOS />,
  erp: <IconERP />,
};

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeTab, setActiveTab] = useState<"All" | "Business" | "Operations" | "EdTech" | "F&B">("All");

  const filtered = activeTab === "All" ? productsList : productsList.filter(p => p.category === activeTab);

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
            Software Catalog
          </motion.div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.15}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
          >
            Ready-to-Deploy<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">SaaS Products</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed mb-10"
          >
            Robust, pre-built operating panels designed to deploy directly into your corporate cloud nodes within hours.
          </motion.p>

          {/* Filters */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.35}
            className="flex gap-2 justify-center flex-wrap"
          >
            {(["All", "Business", "Operations", "EdTech", "F&B"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-5 rounded-lg text-xs font-semibold cursor-pointer border transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-violet-600/10 text-violet-750 border-violet-600/30"
                    : "bg-slate-900/5 text-slate-650 border-slate-900/10 hover:text-slate-950"
                }`}
              >
                {tab === "All" ? <span className="flex items-center gap-1.5"><IconShoppingBag /> All Products</span> : tab}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 border-t border-slate-900/10">
        <div className="w-11/12 max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((prod, idx) => (
                <motion.div
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  whileHover="hover"
                  className="h-full"
                >
                  <motion.div
                    variants={hoverLift}
                    className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-5">
                        {productIcons[prod.id]}
                        <span className="text-[10px] font-bold py-0.5 px-2.5 rounded bg-slate-900/5 border border-slate-900/10 text-slate-500 uppercase tracking-wider">
                          {prod.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-1">{prod.name}</h3>
                      <p className="text-violet-650 text-xs font-semibold mb-4">{prod.tagline}</p>
                      <p className="text-slate-505 text-xs leading-relaxed mb-6">{prod.desc}</p>

                      <div className="flex flex-col gap-2.5 mb-7 border-t border-slate-900/5 pt-4">
                        {prod.features.slice(0, 3).map((f) => (
                          <div key={f} className="flex gap-2 items-center text-xs text-slate-505">
                            <span className="text-violet-650 font-bold">✓</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-900/5 pt-5">
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">License Rate</span>
                        <strong className="text-sm text-slate-900 font-bold">{prod.price}</strong>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="py-2 px-4 rounded-lg bg-violet-600/10 border border-violet-600/20 text-violet-700 text-xs font-bold cursor-pointer hover:bg-violet-600 hover:text-white transition-all duration-200"
                      >
                        Details & Demo
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Modal Detail Dialog */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-center justify-center p-5 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-900/10 shadow-2xl w-full max-w-[600px] p-10 rounded-2xl relative text-slate-900"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 bg-transparent border-none text-slate-400 hover:text-slate-700 text-2xl cursor-pointer"
              >
                &times;
              </button>

              <div className="flex gap-4 items-center mb-5">
                {productIcons[selectedProduct.id]}
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h3>
                  <span className="text-xs text-violet-600 font-semibold">{selectedProduct.tagline}</span>
                </div>
              </div>

              <p className="text-slate-505 text-xs leading-relaxed mb-6">
                {selectedProduct.desc}
              </p>

              <div className="grid grid-cols-2 gap-5 mb-7">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-900 uppercase mb-2.5 tracking-wider">Core Capabilities</h4>
                  <div className="flex flex-col gap-2">
                    {selectedProduct.features.map(f => (
                      <div key={f} className="flex gap-2 items-center text-xs text-slate-505">
                        <span className="text-violet-650 font-bold">✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-900 uppercase mb-2.5 tracking-wider">Technical Specs</h4>
                  <div className="flex flex-col gap-2">
                    {selectedProduct.specs.map(s => (
                      <div key={s} className="flex gap-2 items-center text-xs text-slate-550">
                        <span className="text-violet-500 font-bold">↳</span>
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
                  className="flex-1 py-3.5 rounded-lg text-center font-bold text-xs bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-violet-600/20"
                >
                  Purchase Product Licence ({selectedProduct.price.split(" ")[0]})
                </Link>
                <button
                  onClick={() => { alert(`Launching interactive sandboxed demo portal for ${selectedProduct.name}...`); setSelectedProduct(null); }}
                  className="py-3.5 px-6 rounded-lg font-bold text-xs bg-slate-900/5 hover:bg-slate-900/10 border border-slate-900/10 text-slate-800 cursor-pointer"
                >
                  Launch Sandbox Demo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
