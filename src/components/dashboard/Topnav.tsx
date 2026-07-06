"use client";

import Link from "next/link";

interface TopnavProps {
  activeRole: string;
}

export default function Topnav({ activeRole }: TopnavProps) {
  const getRoleInfo = (role: string) => {
    switch (role) {
      case "admin": return { title: "Global Admin Dashboard", icon: "🛡️" };
      case "crm": return { title: "CRM Workflow Management", icon: "🤝" };
      case "hr": return { title: "HR & Intern Core", icon: "👥" };
      case "partner": return { title: "Regional Partner Center", icon: "💼" };
      case "sales": return { title: "Sales Battle Arena", icon: "🚀" };
      case "client": return { title: "Client Control Center", icon: "💻" };
      default: return { title: "Jevxo Node Console", icon: "🌐" };
    }
  };

  const info = getRoleInfo(activeRole);

  return (
    <header style={{ height: "72px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", background: "rgba(8,13,26,0.5)", flexShrink: 0 }}>
      
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "20px" }}>{info.icon}</span>
        <h1 style={{ fontSize: "18px", fontWeight: 700 }}>
          {info.title}
        </h1>
      </div>

      {/* Action / Sessions */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        
        {/* Live Active Session Indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }} />
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>Active Session</span>
        </div>
        
        <Link href="/" style={{ fontSize: "13px", padding: "6px 14px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", fontWeight: 600 }}>
          Leave Portal
        </Link>
      </div>

    </header>
  );
}
