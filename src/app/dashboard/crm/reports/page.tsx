"use client";

import { salesLeaderboard } from "../../mockData";

export default function CrmReportsPage() {
  const leadSources = [
    { source: "Organic Search", leads: 110, conversion: "12%" },
    { source: "Meta Ad Campaigns", leads: 145, conversion: "8.5%" },
    { source: "Country Partner Referrals", leads: 82, conversion: "24%" },
    { source: "Direct Inbound Portal", leads: 40, conversion: "18%" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Analytics KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Overall Conversion Rate</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#10b981" }}>14.8%</div>
          <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 +2.1% improvement this quarter</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Qualified Leads</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#a78bfa" }}>377</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Across 6 custom business funnels</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Total Deal Value</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#06b6d4" }}>$48,700</div>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>Pipeline active balance</div>
        </div>
      </div>

      {/* Charts & Lead Sources */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }} className="admin-grid-top">
        
        {/* Lead Sources */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
          <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>Lead Ingestion Sources</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {leadSources.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: "flex", justifyItems: "space-between", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 600 }}>{item.source}</span>
                  <span style={{ color: "var(--text-muted)" }}>{item.leads} leads</span>
                </div>
                <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                  <div style={{ width: `${(item.leads / 200) * 100}%`, height: "4px", background: "#06b6d4", borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent leaderboard */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
          <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Sales Team Performance</h4>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>
                  <th style={{ padding: "10px" }}>Agent</th>
                  <th style={{ padding: "10px" }}>Deals Closed</th>
                  <th style={{ padding: "10px" }}>Target Progress</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>XP points</th>
                </tr>
              </thead>
              <tbody>
                {salesLeaderboard.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "12px 10px", fontWeight: 700 }}>{item.name}</td>
                    <td style={{ padding: "12px 10px" }}>{item.deals} deals</td>
                    <td style={{ padding: "12px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", minWidth: "60px" }}>
                          <div style={{ width: `${item.targetProgress}%`, height: "4px", background: "#7c3aed", borderRadius: "2px" }} />
                        </div>
                        <span>{item.targetProgress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 10px", textAlign: "right", color: "#a78bfa", fontWeight: 700 }}>{item.xp} XP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
