"use client";

import { salesLeaderboard } from "../../mockData";

export default function SalesLeaderboardPage() {
  const handleBadgeClick = (badge: string) => {
    alert(`Badge Detail: You unlocked "${badge}". XP reward synchronised.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      
      {/* Gamified Rank card & Achievements row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }} className="admin-grid-top">
        
        {/* Gamified Rank and Badge */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{
            width: "80px", height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
            boxShadow: "0 0 20px rgba(245,158,11,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", flexShrink: 0
          }}>
            🥇
          </div>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>Platinum Sales Agent</h3>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>Rank status is active. 3,800 XP remaining to unlock Jevxo Executive level.</p>
          </div>
        </div>

        {/* Achievements Unlocked List */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Achievement Badges Unlocked</h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["🥉 Bronze", "🥈 Silver", "🥇 Gold", "💎 Platinum"].map((badge, index) => (
              <span
                key={index}
                onClick={() => handleBadgeClick(badge)}
                style={{ padding: "8px 14px", borderRadius: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontSize: "11px", cursor: "pointer", fontWeight: 700, transition: "all 0.2s" }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Sales Battle Arena */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>⚔️ Sales Battle Arena (Gamified Ranking)</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {salesLeaderboard.map((user) => (
            <div key={user.rank} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "14px 20px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "18px", fontWeight: 800, color: user.rank === 1 ? "#f59e0b" : "var(--text-secondary)" }}>#{user.rank}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{user.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{user.deals} closed deals this month</div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#a78bfa" }}>{user.xp} XP</div>
                <div style={{ fontSize: "10px", color: "#10b981", marginTop: "2px" }}>{user.targetProgress}% target</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
