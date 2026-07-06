"use client";

import { useState } from "react";

interface Ticket {
  id: string;
  client: string;
  subject: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "Investigation" | "Escalated" | "Resolved";
  date: string;
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: "TCK-809", client: "Apex Group Ltd", subject: "Domain SSL configuration error on node BD-HQ", priority: "High", status: "Open", date: "2026-07-06" },
    { id: "TCK-412", client: "Vortex Agency Ltd", subject: "Webhook failed to trigger CRM lead update", priority: "Medium", status: "Investigation", date: "2026-07-05" },
    { id: "TCK-105", client: "Greenfield Biotech", subject: "Requesting additional 100GB storage block", priority: "Low", status: "Resolved", date: "2026-07-03" },
    { id: "TCK-921", client: "Sands Real Estate", subject: "Auto-renew failed to clear ACH invoice", priority: "High", status: "Escalated", date: "2026-07-06" },
  ]);

  const cycleStatus = (id: string, nextStatus: Ticket["status"]) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: nextStatus } : t));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Support Center Header */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>Escalation & Complaints Desk</h3>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Review customer complaint logs, escalate hosting blockers, or sign off resolutions.</p>
        
        {/* Ticket List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
          {tickets.map((t) => (
            <div key={t.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "20px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ flex: 1, minWidth: "250px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#fff" }}>{t.id}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>| {t.client}</span>
                  <span style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    background: t.priority === "High" ? "rgba(239,68,68,0.12)" : t.priority === "Medium" ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)",
                    color: t.priority === "High" ? "#ef4444" : t.priority === "Medium" ? "#f59e0b" : "#10b981"
                  }}>
                    {t.priority} Priority
                  </span>
                </div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#f1f5f9" }}>{t.subject}</p>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Logged: {t.date}</div>
              </div>

              {/* Status workflow controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase" }}>Pipeline State</div>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: t.status === "Open" ? "#60a5fa" : t.status === "Investigation" ? "#a78bfa" : t.status === "Escalated" ? "#ef4444" : "#10b981"
                  }}>
                    {t.status}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  {t.status !== "Resolved" && (
                    <>
                      {t.status === "Open" && (
                        <button onClick={() => cycleStatus(t.id, "Investigation")} style={{ padding: "6px 12px", borderRadius: "4px", background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Investigate</button>
                      )}
                      {t.status === "Investigation" && (
                        <button onClick={() => cycleStatus(t.id, "Escalated")} style={{ padding: "6px 12px", borderRadius: "4px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Escalate</button>
                      )}
                      <button onClick={() => cycleStatus(t.id, "Resolved")} style={{ padding: "6px 12px", borderRadius: "4px", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Resolve</button>
                    </>
                  )}
                  {t.status === "Resolved" && (
                    <span style={{ fontSize: "18px" }}>✅</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
