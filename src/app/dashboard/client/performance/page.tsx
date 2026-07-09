"use client";

import { useState } from "react";

export default function ClientPerformancePage() {
  const [activeTab, setActiveTab] = useState("traffic");

  return (
    <div className="flex flex-col gap-7">
      
      {/* Traffic KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-2xl">
          <div className="text-xs text-slate-400 font-bold tracking-wider uppercase">Total Visitors Today</div>
          <div className="text-2xl font-extrabold mt-2 text-emerald-600">1,240</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">📈 +18.4% compared to yesterday</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-2xl">
          <div className="text-xs text-slate-400 font-bold tracking-wider uppercase">Average Session Duration</div>
          <div className="text-2xl font-extrabold mt-2 text-violet-600">3m 42s</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">Stable retention index</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-2xl">
          <div className="text-xs text-slate-400 font-bold tracking-wider uppercase">Bounce Rate</div>
          <div className="text-2xl font-extrabold mt-2 text-cyan-600">42.4%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">📈 -2.8% reduction rate</div>
        </div>
      </div>

      {/* Analytics chart and switcher tabs */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <div className="flex gap-3 border-b border-slate-900/10 pb-4 mb-6">
          {["traffic", "speed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-lg text-xs font-semibold border transition-all cursor-pointer capitalize ${
                activeTab === tab
                  ? "border-violet-600/30 bg-violet-600/10 text-violet-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab} Analysis
            </button>
          ))}
        </div>

        {activeTab === "traffic" ? (
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-5">Daily Traffic Distribution</h4>
            <div className="h-44 flex items-end gap-5 pb-2.5">
              {[
                { time: "09:00", val: "30%" },
                { time: "12:00", val: "65%" },
                { time: "15:00", val: "90%" },
                { time: "18:00", val: "75%" },
                { time: "21:00", val: "40%" }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div style={{ height: bar.val }} className="w-full bg-gradient-to-t from-violet-600 to-indigo-600 rounded-t" />
                  <span className="text-[11px] text-slate-400 font-medium">{bar.time}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3">🚀 Core Web Vitals Status</h4>
            <ul className="text-xs text-slate-600 leading-relaxed space-y-2 list-disc pl-4">
              <li>Largest Contentful Paint (LCP): <strong className="text-emerald-600 font-bold">1.1s (Good)</strong></li>
              <li>First Input Delay (FID): <strong className="text-emerald-600 font-bold">18ms (Good)</strong></li>
              <li>Cumulative Layout Shift (CLS): <strong className="text-emerald-600 font-bold">0.01 (Good)</strong></li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}
