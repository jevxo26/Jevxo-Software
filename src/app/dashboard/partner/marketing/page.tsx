"use client";

import { marketingAssets } from "../../mockData";

export default function PartnerMarketingPage() {
  const handleDownload = (name: string) => {
    alert(`Initiating download stream for: ${name}. ZIP package compilation active.`);
  };

  return (
    <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>📁 Marketing Materials & Promotional Kit</h3>
      <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "24px" }}>Access regional promotional slides, poster vector files, and official demo videos.</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="dashboard-kpis">
        {marketingAssets.map((asset) => (
          <div key={asset.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "28px" }}>
                {asset.type.includes("Video") ? "🎥" : asset.type.includes("Deck") ? "📊" : "🖼️"}
              </div>
              <h4 style={{ fontSize: "13px", fontWeight: 700, marginTop: "12px", color: "#f1f5f9" }}>{asset.name}</h4>
              <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>{asset.type}</div>
            </div>
            
            <button
              onClick={() => handleDownload(asset.name)}
              style={{ width: "100%", marginTop: "16px", padding: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "#a78bfa", fontSize: "12px", fontWeight: 600, borderRadius: "4px", cursor: "pointer" }}
            >
              Download ({asset.format.split(" / ")[0]})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
