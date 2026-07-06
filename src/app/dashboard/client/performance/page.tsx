"use client";

import { useState } from "react";

export default function ClientPerformancePage() {
  const [activeTab, setActiveTab] = useState("traffic");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Traffic KPI Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="dashboard-kpis">
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Total Visitors Today</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#10b981" }}>1,240</div>
          <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 +18.4% compared to yesterday</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Average Session Duration</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#a78bfa" }}>3m 42s</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Stable retention index</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Bounce Rate</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#06b6d4" }}>42.4%</div>
          <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📉 -2.8% reduction rate</div>
        </div>
      </div>

      {/* Analytics chart and switcher tabs */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "16px", marginBottom: "24px" }}>
          {["traffic", "speed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                background: activeTab === tab ? "rgba(124,58,237,0.12)" : "transparent",
                border: activeTab === tab ? "1px solid rgba(124,58,237,0.2)" : "1px solid transparent",
                color: activeTab === tab ? "#a78bfa" : "var(--text-secondary)",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                textTransform: "capitalize"
              }}
            >
              {tab} Analysis
            </button>
          ))}
        </div>

        {activeTab === "traffic" ? (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>Daily Traffic Distribution</h4>
            <div style={{ height: "180px", display: "flex", alignItems: "flex-end", gap: "20px", paddingBottom: "10px" }}>
              {[
                { time: "09:00", val: "30%" },
                { time: "12:00", val: "65%" },
                { time: "15:00", val: "90%" },
                { time: "18:00", val: "75%" },
                { time: "21:00", val: "40%" }
              ].map((bar, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "100%", height: bar.val, background: "linear-gradient(to top, #7c3aed, #4f46e5)", borderRadius: "4px" }} />
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{bar.time}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px", color: "#fff" }}>🚀 Core Web Vitals Status</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "16px" }}>
              <li>Largest Contentful Paint (LCP): <strong style={{ color: "#10b981" }}>1.1s (Good)</strong></li>
              <li>First Input Delay (FID): <strong style={{ color: "#10b981" }}>18ms (Good)</strong></li>
              <li>Cumulative Layout Shift (CLS): <strong style={{ color: "#10b981" }}>0.01 (Good)</strong></li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}
