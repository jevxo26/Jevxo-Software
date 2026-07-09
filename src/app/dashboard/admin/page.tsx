"use client";

import { useState } from "react";

export default function AdminOverviewPage() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const regionDetails: Record<string, { clients: number; revenue: string; websites: number; partners: number }> = {
    Bangladesh: { clients: 184, revenue: "$240,000", websites: 160, partners: 8 },
    "United Kingdom": { clients: 92, revenue: "$380,000", websites: 85, partners: 4 },
    "United States": { clients: 110, revenue: "$490,000", websites: 102, partners: 6 },
    "United Arab Emirates": { clients: 34, revenue: "$138,500", websites: 28, partners: 2 },
  };

  const handleRegionClick = (region: string) => {
    setActiveRegion(region);
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Admin KPIs */}
      <div className="dashboard-kpis grid grid-cols-4 gap-5">
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-6 rounded-xl">
          <div className="text-xs text-slate-600 font-semibold uppercase">Total Revenue</div>
          <div className="text-2xl font-extrabold mt-2 text-[#10b981]">$1,248,500</div>
          <div className="text-[11px] text-[#10b981] mt-1">📈 +14.2% from last month</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-6 rounded-xl">
          <div className="text-xs text-slate-600 font-semibold uppercase">Active Clients</div>
          <div className="text-2xl font-extrabold mt-2 text-slate-900">420</div>
          <div className="text-[11px] text-[#10b981] mt-1">📈 +8.5% onboarding rate</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-6 rounded-xl">
          <div className="text-xs text-slate-600 font-semibold uppercase">Websites Suspended</div>
          <div className="text-2xl font-extrabold mt-2 text-[#ef4444]">4</div>
          <div className="text-[11px] text-slate-400 mt-1">Billing issues / Expired trial</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-6 rounded-xl">
          <div className="text-xs text-slate-600 font-semibold uppercase">Active Cloud Nodes</div>
          <div className="text-2xl font-extrabold mt-2 text-[#06b6d4]">5 / 5</div>
          <div className="text-[11px] text-[#10b981] mt-1">💻 Uptime status: 99.98%</div>
        </div>
      </div>

      {/* World Map Heatmap & AI Insights */}
      <div className="admin-grid-top grid grid-cols-[1.8fr_1.2fr] gap-7">
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-7 rounded-2xl">
          <h3 className="text-base font-bold mb-4">Ecosystem Hitmap (Interactive)</h3>
          
          <div className="h-[240px] bg-slate-900/5 rounded-lg border border-dashed border-slate-900/10 relative flex flex-col items-center justify-center">
            {activeRegion ? (
              <div className="text-center p-5">
                <h4 className="font-bold text-base text-violet-600 mb-2">📍 {activeRegion} Regional Stats</h4>
                <div className="flex gap-5 justify-center text-[13px] text-slate-600">
                  <div>Clients: <strong>{regionDetails[activeRegion].clients}</strong></div>
                  <div>Revenue: <strong>{regionDetails[activeRegion].revenue}</strong></div>
                  <div>Websites: <strong>{regionDetails[activeRegion].websites}</strong></div>
                  <div>Partners: <strong>{regionDetails[activeRegion].partners}</strong></div>
                </div>
                <button 
                  onClick={() => setActiveRegion(null)} 
                  className="mt-3 py-1 px-2.5 bg-slate-900/5 border border-slate-900/[0.08] text-slate-700 text-[11px] rounded cursor-pointer"
                >
                  Clear Node Details
                </button>
              </div>
            ) : (
              <div className="text-xs text-slate-400 text-center">
                <div>Select a region node below to inspect ecosystem status.</div>
              </div>
            )}
            
            {/* Simulated Map Nodes */}
            <div className="flex gap-2.5 absolute bottom-5 flex-wrap justify-center">
              {["Bangladesh", "United Kingdom", "United States", "United Arab Emirates"].map((nodeName) => (
                <button
                  key={nodeName}
                  onClick={() => handleRegionClick(nodeName)}
                  className={`py-1.5 px-3 rounded bg-violet-600/10 border border-violet-600/20 text-violet-600 text-[11px] font-bold cursor-pointer transition-colors hover:bg-violet-600/20 ${activeRegion === nodeName ? "bg-violet-600/20 border-violet-600/40" : ""}`}
                >
                  📍 {nodeName} Node
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-7 rounded-2xl flex flex-col gap-4">
          <h3 className="text-base font-bold text-violet-600">🧠 AI Business Insights</h3>
          <div className="bg-slate-900/5 border-l-3 border-violet-600 p-3.5 rounded">
            <div className="text-[13px] font-bold text-slate-900">Country Partner Growth Alert</div>
            <p className="text-xs text-slate-600 mt-1">US region client signups surged 22% this week. We recommend provisioning additional agency partner templates immediately.</p>
          </div>
          <div className="bg-slate-900/5 border-l-3 border-cyan-500 p-3.5 rounded">
            <div className="text-[13px] font-bold text-slate-900">Hosting Server Allocation</div>
            <p className="text-xs text-slate-600 mt-1">Node BD-HQ storage utilization is at 78%. Auto-scaling scheduled for July 12th.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
