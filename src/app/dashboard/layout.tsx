"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract the role from route: e.g. "/dashboard/admin/clients" -> "admin"
  const segments = pathname.split("/");
  const activeRole = segments[2] || "admin";

  const handleRoleChange = (role: string) => {
    router.push(`/dashboard/${role}`);
  };

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

  const getRoleTitle = (role: string) => {
    switch (role) {
      case "admin": return "Global Admin Dashboard";
      case "crm": return "CRM Workflow Management";
      case "hr": return "HR & Intern Core";
      case "partner": return "Regional Partner Center";
      case "sales": return "Sales Battle Arena";
      case "client": return "Client Control Center";
      default: return "Jevxo Node Console";
    }
  };

  const currentRoleLinks = navLinks[activeRole] || [];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080d1a", color: "#f1f5f9" }}>
      
      {/* ─── SIDEBAR NAVIGATION ──────────────────────────────────────── */}
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

        {/* Role Switcher Selector */}
        <div style={{ padding: "20px 20px" }}>
          <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>Active Panel Portal</label>
          <select
            value={activeRole}
            onChange={(e) => handleRoleChange(e.target.value)}
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

        {/* Dynamic Sidebar Links */}
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
                onMouseEnter={(e) => {
                  if (!isLinkActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLinkActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "12px", color: "var(--text-secondary)" }}>
          <div style={{ fontWeight: 600 }}>Current User Node</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>jevxo_host_asia_01</div>
        </div>
      </aside>

      {/* ─── CONTENT AREA ───────────────────────────────────────────── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
        
        {/* Top Header */}
        <header style={{ height: "72px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", background: "rgba(8,13,26,0.5)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>
              {activeRole === "admin" && "🛡️"}
              {activeRole === "crm" && "🤝"}
              {activeRole === "hr" && "👥"}
              {activeRole === "partner" && "💼"}
              {activeRole === "sales" && "🚀"}
              {activeRole === "client" && "💻"}
            </span>
            <h1 style={{ fontSize: "18px", fontWeight: 700 }}>
              {getRoleTitle(activeRole)}
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {/* Live Indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }} />
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>Active Session</span>
            </div>
            
            {/* Quick action buttons */}
            <Link href="/" style={{ fontSize: "13px", padding: "6px 14px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", fontWeight: 600 }}>
              Leave Portal
            </Link>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <div style={{ flex: 1, padding: "40px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
