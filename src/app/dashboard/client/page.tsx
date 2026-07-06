"use client";

export default function ClientOverviewPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }} className="admin-grid-top">
        
        {/* Client ID card */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(13,21,48,0.4)", border: "1px solid rgba(124,58,237,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px", background: "rgba(124,58,237,0.15)", color: "#a78bfa" }}>JEVXO NODE PORTAL</span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>ID: JEVXO-BD-000001</span>
          </div>

          <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px", color: "#fff" }}>Apex Group Ltd</h3>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Plan Subscription: <strong style={{ color: "#06b6d4" }}>Growth Plan (Annual)</strong></div>
          
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", marginTop: "20px", display: "flex", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>SSL Status</div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#10b981" }}>🔒 Secured</span>
            </div>
            <div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>Domain Renewal</div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#f59e0b" }}>📅 240 days left</span>
            </div>
          </div>
        </div>

        {/* Website Health Score indexes */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Node Health score Index</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="dashboard-kpis">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", color: "#10b981", fontWeight: 800 }}>98%</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>Speed optimization</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", color: "#06b6d4", fontWeight: 800 }}>100%</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>Security Index</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", color: "#a78bfa", fontWeight: 800 }}>92%</div>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>SEO Keyword ranking</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
