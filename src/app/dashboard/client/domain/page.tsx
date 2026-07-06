"use client";

export default function ClientDomainPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }} className="admin-grid-top">
      
      {/* Domain host DNS cards */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Domain Host Records</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
          <div>Domain: <strong style={{ color: "#fff" }}>apexgroup.com</strong></div>
          <div>Node Endpoint IP: <strong style={{ color: "var(--text-secondary)" }}>104.21.43.18</strong></div>
          <div>Hosting Region: <strong style={{ color: "var(--text-secondary)" }}>Bangladesh Node (HQ)</strong></div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px", marginTop: "8px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>NAMESERVERS</span>
            <div style={{ color: "#a78bfa", fontFamily: "monospace" }}>ns1.jevxo.net</div>
            <div style={{ color: "#a78bfa", fontFamily: "monospace" }}>ns2.jevxo.net</div>
          </div>
        </div>
      </div>

      {/* Hosting Usage meters */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px" }}>Server Resource Allocation</h3>
        
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
            <span>Storage Utilization</span>
            <span style={{ color: "#7c3aed" }}>42 GB / 100 GB</span>
          </div>
          <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }}>
            <div style={{ width: "42%", height: "8px", background: "#7c3aed", borderRadius: "4px" }} />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
            <span>Bandwidth Transfer (This Month)</span>
            <span style={{ color: "#06b6d4" }}>1.1 TB / 5.0 TB</span>
          </div>
          <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }}>
            <div style={{ width: "22%", height: "8px", background: "#06b6d4", borderRadius: "4px" }} />
          </div>
        </div>
      </div>

    </div>
  );
}
