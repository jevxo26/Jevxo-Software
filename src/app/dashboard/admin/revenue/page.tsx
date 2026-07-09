"use client";

import { useState } from "react";

export default function AdminRevenuePage() {
  const [selectedRange, setSelectedRange] = useState("30");

  const countryRevenue = [
    { country: "United States", amount: "$490,000", percentage: "39.2%" },
    { country: "United Kingdom", amount: "$380,000", percentage: "30.4%" },
    { country: "Bangladesh", amount: "$240,000", percentage: "19.2%" },
    { country: "United Arab Emirates", amount: "$138,500", percentage: "11.2%" }
  ];

  const productRevenue = [
    { name: "SaaS Ecosystem License", amount: "$680,000", share: "54%" },
    { name: "Cloud Dedicated Hosting", amount: "$320,000", share: "26%" },
    { name: "Agency CRM Subscriptions", amount: "$148,500", share: "12%" },
    { name: "Custom Dev Integrations", amount: "$100,000", share: "8%" }
  ];

  return (
    <div className="flex flex-col gap-7">
      
      {/* Date Range Selector Header */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] p-6 rounded-2xl flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Financial Command Center</h3>
          <p className="text-xs text-slate-500">Ecosystem sales, renewals, and partner commissions auditing.</p>
        </div>
        
        <div>
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="py-2 px-3 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">Last 365 Days</option>
          </select>
        </div>
      </div>

      {/* Primary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-7">
        
        {/* Daily Sales Graph Card */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h4 className="text-[15px] font-bold text-slate-900 mb-5">Daily Sales Performance</h4>
          <div className="h-48 flex items-end gap-6 pb-2">
            {[
              { label: "W1", height: "45%" },
              { label: "W2", height: "60%" },
              { label: "W3", height: "78%" },
              { label: "W4", height: "92%" }
            ].map((chart, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                <div style={{ height: chart.height }} className="w-full bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-md hover:opacity-90 transition-all duration-200" />
                <span className="text-xs text-slate-500 font-semibold">{chart.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Share list */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h4 className="text-[15px] font-bold text-slate-900 mb-5">Regional Revenue Breakdown</h4>
          <div className="flex flex-col gap-4">
            {countryRevenue.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold text-slate-700">{item.country}</span>
                  <span className="text-slate-500 text-xs">{item.amount} ({item.percentage})</span>
                </div>
                <div className="w-full h-1 bg-slate-900/5 rounded-full overflow-hidden">
                  <div style={{ width: item.percentage }} className="h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Product Share & Contribution list */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h4 className="text-[15px] font-bold text-slate-900 mb-4">Ecosystem Product Contribution</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {productRevenue.map((p, idx) => (
            <div key={idx} className="bg-slate-900/5 border border-slate-900/[0.04] p-5 rounded-xl">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">{p.name}</div>
              <div className="text-xl font-extrabold mt-2 text-blue-600">{p.amount}</div>
              <div className="text-[11px] text-emerald-600 mt-1">📈 Share of sales: {p.share}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
