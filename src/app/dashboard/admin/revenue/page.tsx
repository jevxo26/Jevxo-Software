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
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Date Range Selector Header */}
      <div className="glass" style={{ padding: "24px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Financial Command Center</h3>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Ecosystem sales, renewals, and partner commissions auditing.</p>
        </div>
        
        <div>
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border)", background: "rgba(8,13,26,0.9)", color: "#fff", fontSize: "13px" }}
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">Last 365 Days</option>
          </select>
        </div>
      </div>

      {/* Primary Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "28px" }} className="admin-grid-top">
        
        {/* Daily Sales Graph Card */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
          <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>Daily Sales Performance</h4>
          <div style={{ height: "200px", display: "flex", alignItems: "flex-end", gap: "24px", paddingBottom: "10px" }}>
            {[
              { label: "W1", height: "45%" },
              { label: "W2", height: "60%" },
              { label: "W3", height: "78%" },
              { label: "W4", height: "92%" }
            ].map((chart, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <div style={{ position: "relative", width: "100%" }}>
                  <div style={{ width: "100%", height: chart.height, background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "6px" }} />
                </div>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>{chart.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Share list */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
          <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>Regional Revenue Breakdown</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {countryRevenue.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 600 }}>{item.country}</span>
                  <span style={{ color: "var(--text-muted)" }}>{item.amount} ({item.percentage})</span>
                </div>
                <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                  <div style={{ width: item.percentage, height: "4px", background: "#10b981", borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Product Share & Date range list */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Ecosystem Product Contribution</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="dashboard-kpis">
          {productRevenue.map((p, idx) => (
            <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "20px", borderRadius: "10px" }}>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase" }}>{p.name}</div>
              <div style={{ fontSize: "20px", fontWeight: 800, marginTop: "8px", color: "#60a5fa" }}>{p.amount}</div>
              <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 Share of sales: {p.share}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
