"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const rolesList = [
  { id: "admin", name: "Global Admin", desc: "Command center for regional websites, pricing, and client suspension.", icon: "🛡️", username: "admin@jevxo.com", badge: "Superuser" },
  { id: "crm", name: "CRM Lead Manager", desc: "Kanban pipeline, auto reminders, and lead scoring dashboard.", icon: "🤝", username: "crm@jevxo.com", badge: "Operations" },
  { id: "hr", name: "HR & Intern Manager", desc: "Employee tracking, check-in log, payroll, and certificates.", icon: "👥", username: "hr@jevxo.com", badge: "Management" },
  { id: "partner", name: "Country Partner", desc: "Commission balances, regional stats, and marketing assets.", icon: "💼", username: "partner_bd@jevxo.com", badge: "Partner" },
  { id: "sales", name: "Sales Agent Arena", desc: "Target progress bars, badges, and the Sales Battle leaderboard.", icon: "🚀", username: "agent_09@jevxo.com", badge: "Sales Agent" },
  { id: "client", name: "Client & Marketing Hub", desc: "Manage website health, storage, and access the 13 Marketing Hub modules.", icon: "💻", username: "client_client@jevxo.com", badge: "Business Owner" },
];

export default function PortalPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(rolesList[0]);
  const [password, setPassword] = useState("••••••••");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleRoleSelect = (role: typeof rolesList[0]) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      // Redirect to unified dashboard with role query param
      router.push(`/dashboard?role=${selectedRole.id}`);
    }, 1200);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at center, #0d1530 0%, #080d1a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 20px 40px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative Orbs */}
      <div className="orb orb-violet" style={{ width: "400px", height: "400px", top: "-100px", left: "-50px", opacity: 0.4 }} />
      <div className="orb orb-cyan" style={{ width: "350px", height: "350px", bottom: "-100px", right: "-50px", opacity: 0.3 }} />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "980px" }}>
        
        {/* Back Link */}
        <Link href="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-secondary)",
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "32px",
          transition: "color 0.2s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#a78bfa"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
        >
          ← Return to Public Site
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px" }} className="portal-grid">
          
          {/* Left Column: Role Selector Info */}
          <div>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div style={{
                  width: "32px", height: "32px",
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", fontWeight: 800, color: "#fff",
                }}>J</div>
                Jevxo Ecosystem
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>
                Select a workspace role below to explore the corresponding operational panel schema.
              </p>
            </div>

            {/* Roles Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {rolesList.map((role) => {
                const isActive = selectedRole.id === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role)}
                    style={{
                      textAlign: "left",
                      width: "100%",
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
                      background: isActive ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.02)",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    }}
                  >
                    <div style={{ fontSize: "24px" }}>{role.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: isActive ? "#a78bfa" : "#f1f5f9" }}>{role.name}</span>
                        <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", background: isActive ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.06)", color: isActive ? "#a78bfa" : "var(--text-secondary)" }}>{role.badge}</span>
                      </div>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px", lineHeight: 1.4 }}>{role.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Portal Login Form */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="glass" style={{
              width: "100%",
              padding: "40px 32px",
              borderRadius: "20px",
              border: "1px solid rgba(124,58,237,0.2)",
              background: "rgba(8,13,26,0.65)",
              boxShadow: "0 20px 50px rgba(8,13,26,0.5)",
            }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px", color: "#f1f5f9" }}>Portal Authenticator</h3>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>Workspace Account ID</label>
                  <input
                    type="text"
                    disabled
                    value={selectedRole.username}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.02)",
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      cursor: "not-allowed",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.05em" }}>Access Pin / Password</label>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Auto-filled</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.03)",
                      color: "#fff",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: 700,
                    border: "none",
                    boxShadow: "0 0 20px rgba(124,58,237,0.3)",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {isLoggingIn ? (
                    <>
                      <span style={{
                        display: "inline-block",
                        width: "16px",
                        height: "16px",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin-slow 1s linear infinite",
                      }} />
                      Verifying Node...
                    </>
                  ) : (
                    <>Enter Workspace Portal {selectedRole.icon}</>
                  )}
                </button>
              </form>

              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                🔒 This is a secure Next.js 16 endpoint. Selecting a workspace role automatically provisions a secure session token redirecting you to your Jevxo node.
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .portal-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}
