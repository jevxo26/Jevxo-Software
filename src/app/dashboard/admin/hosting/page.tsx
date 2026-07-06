"use client";

export default function AdminHostingPage() {
  const domainsList = [
    { domain: "apexgroup.com", ip: "104.21.43.18", ssl: "Valid", bandwidth: "1.1 TB", storage: "42 GB", expires: "2026-12-14" },
    { domain: "vortexagency.co.uk", ip: "172.67.142.92", ssl: "Valid", bandwidth: "850 GB", storage: "35 GB", expires: "2026-11-20" },
    { domain: "greenfieldbio.com", ip: "104.22.8.22", ssl: "Expiring", bandwidth: "1.8 TB", storage: "60 GB", expires: "2026-07-28" },
    { domain: "sandsrealestate.ae", ip: "104.21.90.101", ssl: "Valid", bandwidth: "200 GB", storage: "12 GB", expires: "2027-01-05" },
    { domain: "apexanalytics.sg", ip: "172.67.8.44", ssl: "Expired", bandwidth: "120 GB", storage: "8 GB", expires: "2026-06-30" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Infrastructure KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Overall Server Load</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#10b981" }}>38%</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Across 4 regional nodes</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Storage Allocated</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#a78bfa" }}>157 GB / 500 GB</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>31.4% capacity used</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Domain SSL Status</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#f59e0b" }}>1 Flag</div>
          <div style={{ fontSize: "11px", color: "#ef4444", marginTop: "4px" }}>1 SSL Certificate Expired</div>
        </div>
      </div>

      {/* Storage and Bandwidth Meters */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }} className="admin-grid-top">
        
        {/* Storage Bar */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>Storage Allocation Progress</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "US-West-01 Node", used: 60, limit: 150 },
              { label: "UK-London-01 Node", used: 35, limit: 100 },
              { label: "BD-Dhaka-01 Node (HQ)", used: 42, limit: 150 },
              { label: "UAE-Dubai-01 Node", used: 12, limit: 100 }
            ].map((node, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                  <span>{node.label}</span>
                  <span style={{ color: "#a78bfa" }}>{node.used} GB / {node.limit} GB</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                  <div style={{ width: `${(node.used / node.limit) * 100}%`, height: "6px", background: "#7c3aed", borderRadius: "3px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bandwidth Usage Chart simulation */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>Bandwidth Load Distribution</h3>
          <div style={{ height: "160px", display: "flex", alignItems: "flex-end", gap: "16px", paddingBottom: "10px" }}>
            {[
              { day: "Mon", size: "40%" },
              { day: "Tue", size: "55%" },
              { day: "Wed", size: "85%" },
              { day: "Thu", size: "70%" },
              { day: "Fri", size: "90%" },
              { day: "Sat", size: "45%" },
              { day: "Sun", size: "35%" }
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "100%", height: bar.size, background: "linear-gradient(to top, #06b6d4, #0891b2)", borderRadius: "4px 4px 0 0" }} />
                <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Domain List and SSL Table */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Domain Host Records</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "var(--text-muted)" }}>
                <th style={{ padding: "10px" }}>Hostname</th>
                <th style={{ padding: "10px" }}>IP Address</th>
                <th style={{ padding: "10px" }}>Bandwidth</th>
                <th style={{ padding: "10px" }}>Storage</th>
                <th style={{ padding: "10px" }}>SSL status</th>
                <th style={{ padding: "10px", textAlign: "right" }}>Renewal Date</th>
              </tr>
            </thead>
            <tbody>
              {domainsList.map((item, index) => (
                <tr key={index} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "12px 10px", fontWeight: 700 }}>{item.domain}</td>
                  <td style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>{item.ip}</td>
                  <td style={{ padding: "12px 10px" }}>{item.bandwidth}</td>
                  <td style={{ padding: "12px 10px" }}>{item.storage}</td>
                  <td style={{ padding: "12px 10px" }}>
                    <span style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "100px",
                      background: item.ssl === "Valid" ? "rgba(16,185,129,0.1)" : item.ssl === "Expired" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
                      color: item.ssl === "Valid" ? "#10b981" : item.ssl === "Expired" ? "#ef4444" : "#f59e0b"
                    }}>
                      {item.ssl}
                    </span>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right", color: "var(--text-secondary)" }}>{item.expires}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
