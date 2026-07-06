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
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      
      {/* Admin KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="dashboard-kpis">
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Total Revenue</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#10b981" }}>$1,248,500</div>
          <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 +14.2% from last month</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Active Clients</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px" }}>420</div>
          <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 +8.5% onboarding rate</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Websites Suspended</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#ef4444" }}>4</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Billing issues / Expired trial</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Active Cloud Nodes</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#06b6d4" }}>5 / 5</div>
          <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>💻 Uptime status: 99.98%</div>
        </div>
      </div>

      {/* World Map Heatmap & AI Insights */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "28px" }} className="admin-grid-top">
        <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Ecosystem Hitmap (Interactive)</h3>
          
          <div style={{ height: "240px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", border: "1px dashed rgba(255,255,255,0.06)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {activeRegion ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <h4 style={{ fontWeight: 700, fontSize: "16px", color: "#a78bfa", marginBottom: "8px" }}>📍 {activeRegion} Regional Stats</h4>
                <div style={{ display: "flex", gap: "20px", justifyContent: "center", fontSize: "13px" }}>
                  <div>Clients: <strong>{regionDetails[activeRegion].clients}</strong></div>
                  <div>Revenue: <strong>{regionDetails[activeRegion].revenue}</strong></div>
                  <div>Websites: <strong>{regionDetails[activeRegion].websites}</strong></div>
                  <div>Partners: <strong>{regionDetails[activeRegion].partners}</strong></div>
                </div>
                <button 
                  onClick={() => setActiveRegion(null)} 
                  style={{ marginTop: "12px", padding: "4px 10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "#fff", fontSize: "11px", borderRadius: "4px" }}
                >
                  Clear Node Details
                </button>
              </div>
            ) : (
              <div style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center" }}>
                <div>Select a region node below to inspect ecosystem status.</div>
              </div>
            )}
            
            {/* Simulated Map Nodes */}
            <div style={{ display: "flex", gap: "10px", position: "absolute", bottom: "20px", flexWrap: "wrap", justifyContent: "center" }}>
              {["Bangladesh", "United Kingdom", "United States", "United Arab Emirates"].map((nodeName) => (
                <button
                  key={nodeName}
                  onClick={() => handleRegionClick(nodeName)}
                  style={{ padding: "6px 12px", borderRadius: "4px", background: activeRegion === nodeName ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
                >
                  📍 {nodeName} Node
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#a78bfa" }}>🧠 AI Business Insights</h3>
          <div style={{ background: "rgba(255,255,255,0.02)", borderLeft: "3px solid #7c3aed", padding: "14px", borderRadius: "4px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700 }}>Country Partner Growth Alert</div>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>US region client signups surged 22% this week. We recommend provisioning additional agency partner templates immediately.</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", borderLeft: "3px solid #06b6d4", padding: "14px", borderRadius: "4px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700 }}>Hosting Server Allocation</div>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Node BD-HQ storage utilization is at 78%. Auto-scaling scheduled for July 12th.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
