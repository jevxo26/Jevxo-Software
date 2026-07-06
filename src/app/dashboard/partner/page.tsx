"use client";

import { useState } from "react";

export default function PartnerOverviewPage() {
  const [partnerCountry, setPartnerCountry] = useState("Bangladesh");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawHistory, setWithdrawHistory] = useState([
    { id: "TXN-902", amount: "$2,500.00", date: "2026-06-15", status: "Approved" },
    { id: "TXN-411", amount: "$1,800.00", date: "2026-05-10", status: "Approved" }
  ]);

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) return;
    const req = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      amount: `$${Number(withdrawAmount).toFixed(2)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    };
    setWithdrawHistory([req, ...withdrawHistory]);
    setWithdrawAmount("");
    alert("Withdrawal request logged successfully and queued for verification.");
  };

  const partnerRankings = [
    { rank: 1, country: "United Kingdom Partner node", clients: 92, revenue: "$380,000" },
    { rank: 2, country: "Bangladesh Partner node (Your node)", clients: 84, revenue: "$240,000" },
    { rank: 3, country: "United Arab Emirates Partner node", clients: 34, revenue: "$138,500" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      
      {/* Commission Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="dashboard-kpis">
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Clients Managed</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#60a5fa" }}>84</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Across your regional nodes</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Commission Earned</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#10b981" }}>$14,400.00</div>
          <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 +$1,200.00 pending sync</div>
        </div>
        <div className="glass" style={{ padding: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Available Wallet Balance</div>
          <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#06b6d4" }}>$5,200.00</div>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>Withdrawal checkout ready</div>
        </div>
      </div>

      {/* Withdrawal Request Form & Transaction Log */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }} className="hr-grid">
        
        {/* Form */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Request Commission Withdrawal</h3>
          <form onSubmit={handleWithdrawSubmit}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Select Country Account</label>
              <select
                value={partnerCountry}
                onChange={(e) => setPartnerCountry(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
              >
                <option value="Bangladesh">Bangladesh (BKash/Bank)</option>
                <option value="United Kingdom">United Kingdom (IBAN)</option>
                <option value="United States">United States (ACH)</option>
                <option value="United Arab Emirates">United Arab Emirates (Local Transfer)</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Withdraw Amount (USD)</label>
              <input
                type="number"
                placeholder="e.g. 500"
                required
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
              />
              <span style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>Maximum transfer: $5,200.00</span>
            </div>

            <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Initiate Bank Transfer</button>
          </form>
        </div>

        {/* Log */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Withdrawal Request Logs</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {withdrawHistory.map((txn) => (
              <div key={txn.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "14px 20px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#fff" }}>{txn.amount}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>ID: {txn.id} | Date: {txn.date}</div>
                </div>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "4px 8px",
                  borderRadius: "100px",
                  background: txn.status === "Approved" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                  color: txn.status === "Approved" ? "#10b981" : "#f59e0b"
                }}>
                  {txn.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Gamified Partner Leaderboard */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Top Performing Country Partners</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {partnerRankings.map((p) => (
            <div key={p.rank} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "14px 20px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "18px", fontWeight: 800, color: p.rank === 1 ? "#f59e0b" : "var(--text-secondary)" }}>#{p.rank}</span>
                <span style={{ fontWeight: 700, color: "#fff" }}>{p.country}</span>
              </div>
              <div style={{ display: "flex", gap: "24px", fontSize: "13px" }}>
                <div>Clients: <strong>{p.clients}</strong></div>
                <div>Volume: <strong style={{ color: "#10b981" }}>{p.revenue}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
