"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SidebarProps {
  activeRole: string;
  pathname: string;
  onRoleChange: (role: string) => void;
}

const navLinks: Record<string, Array<{ label: string; href: string; icon: string }>> = {
  admin: [
    { label: "Command Overview", href: "/dashboard/admin", icon: "📊" },
    { label: "Client Database", href: "/dashboard/admin/clients", icon: "👥" },
    { label: "Hosting Metrics", href: "/dashboard/admin/hosting", icon: "🖥️" },
    { label: "Revenue Center", href: "/dashboard/admin/revenue", icon: "💰" },
    { label: "Support Tickets", href: "/dashboard/admin/support", icon: "🎟️" },
    { label: "Ecosystem CMS", href: "/dashboard/admin/cms", icon: "⚙️" },
  ],
  crm: [
    { label: "Leads Kanban", href: "/dashboard/crm", icon: "🤝" },
    { label: "Customer Records", href: "/dashboard/crm/customers", icon: "📇" },
    { label: "Sales Reports", href: "/dashboard/crm/reports", icon: "📈" },
  ],
  hr: [
    { label: "Attendance Console", href: "/dashboard/hr", icon: "👥" },
    { label: "Leave Requests", href: "/dashboard/hr/leaves", icon: "📅" },
    { label: "Payroll System", href: "/dashboard/hr/payroll", icon: "💵" },
    { label: "Internship Tracker", href: "/dashboard/hr/interns", icon: "🎓" },
  ],
  partner: [
    { label: "Earnings Wallet", href: "/dashboard/partner", icon: "💼" },
    { label: "Marketing Kit", href: "/dashboard/partner/marketing", icon: "📁" },
  ],
  sales: [
    { label: "Daily Targets", href: "/dashboard/sales", icon: "🎯" },
    { label: "Battle Arena", href: "/dashboard/sales/leaderboard", icon: "⚔️" },
  ],
  client: [
    { label: "Client Dashboard", href: "/dashboard/client", icon: "💻" },
    { label: "Billing & Invoices", href: "/dashboard/client/billing", icon: "🧾" },
    { label: "Domain & Hosting", href: "/dashboard/client/domain", icon: "🌐" },
    { label: "Web Performance", href: "/dashboard/client/performance", icon: "📊" },
    { label: "Marketing Hub", href: "/dashboard/client/marketing", icon: "🚀" },
  ],
};

export default function Sidebar({ activeRole, pathname, onRoleChange }: SidebarProps) {
  const [avatarEmoji, setAvatarEmoji] = useState("👨‍💻");
  const [profileName, setProfileName] = useState("Farhan Aftab");

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_user_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.avatarEmoji) setAvatarEmoji(parsed.avatarEmoji);
        if (parsed.name) setProfileName(parsed.name);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const currentRoleLinks = navLinks[activeRole] || [];

  return (
    <aside style={{ width: "280px", borderRight: "1px solid rgba(255,255,255,0.06)", background: "rgba(8,13,26,0.9)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      
      {/* Brand Header */}
      <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "30px", height: "30px",
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: 800, color: "#fff",
          }}>J</div>
          <span style={{ fontSize: "18px", fontWeight: 700 }}>
            Jev<span style={{ color: "#7c3aed" }}>xo</span>
          </span>
        </Link>
        <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", color: "#a78bfa" }}>
          v1.0
        </span>
      </div>

      {/* Role Selector */}
      <div style={{ padding: "20px" }}>
        <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>Active Panel Portal</label>
        <select
          value={activeRole}
          onChange={(e) => onRoleChange(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid rgba(124,58,237,0.3)",
            background: "rgba(13,21,48,0.85)",
            color: "#a78bfa",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="admin">🛡️ Global Admin</option>
          <option value="crm">🤝 CRM Manager</option>
          <option value="hr">👥 HR & Intern Manager</option>
          <option value="partner">💼 Country Partner</option>
          <option value="sales">🚀 Sales Agent Arena</option>
          <option value="client">💻 Client Dashboard</option>
        </select>
      </div>

      {/* Role-specific Navigation Links */}
      <nav style={{ flex: 1, padding: "10px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ padding: "8px 12px", fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
          Navigation Links
        </div>
        {currentRoleLinks.map((link) => {
          const isLinkActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                transition: "all 0.2s ease",
                background: isLinkActive ? "rgba(124,58,237,0.12)" : "transparent",
                color: isLinkActive ? "#a78bfa" : "var(--text-secondary)",
                border: isLinkActive ? "1px solid rgba(124,58,237,0.2)" : "1px solid transparent",
              }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* System & Support Core Links */}
      <nav style={{ padding: "10px 16px 20px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ padding: "8px 12px", fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
          Ecosystem Core
        </div>
        {[
          { label: "Profile & Settings", href: "/dashboard/settings", icon: "⚙️" },
          { label: "Help & Live Chat", href: "/dashboard/support", icon: "💬" },
        ].map((link) => {
          const isLinkActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                transition: "all 0.2s ease",
                background: isLinkActive ? "rgba(124,58,237,0.12)" : "transparent",
                color: isLinkActive ? "#a78bfa" : "var(--text-secondary)",
                border: isLinkActive ? "1px solid rgba(124,58,237,0.2)" : "1px solid transparent",
              }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer User Details */}
      <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
          {avatarEmoji}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: "12px", color: "#fff", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
            {profileName}
          </div>
          <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "1px" }}>jevxo_host_asia_01</div>
        </div>
      </div>

    </aside>
  );
}
