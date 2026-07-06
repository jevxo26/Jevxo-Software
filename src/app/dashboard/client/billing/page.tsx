"use client";

import { useState } from "react";
import { initialInvoices, InvoiceItem } from "../../mockData";

export default function ClientBillingPage() {
  const [invoices] = useState<InvoiceItem[]>(initialInvoices);
  const [supportTicket, setSupportTicket] = useState({ title: "", priority: "Medium", message: "" });
  const [ticketsList, setTicketsList] = useState([
    { id: "TCK-809", title: "Domain SSL configuration error", priority: "High", status: "Open" }
  ]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportTicket.title) return;
    const t = {
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      title: supportTicket.title,
      priority: supportTicket.priority,
      status: "Open"
    };
    setTicketsList([t, ...ticketsList]);
    setSupportTicket({ title: "", priority: "Medium", message: "" });
    alert("Billing support request submitted to operations queue.");
  };

  const handleDownloadInvoice = (invId: string) => {
    alert(`Initiating secure SSL download of invoice PDF for ${invId}.`);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "28px" }} className="admin-grid-top">
      
      {/* Billing Invoice history table */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Invoice Billing History</h3>
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>
                <th style={{ padding: "10px" }}>Invoice ID</th>
                <th style={{ padding: "10px" }}>Billing Date</th>
                <th style={{ padding: "10px" }}>Amount Paid</th>
                <th style={{ padding: "10px" }}>Status</th>
                <th style={{ padding: "10px", textAlign: "right" }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "12px 10px", fontWeight: 700 }}>{inv.id}</td>
                  <td style={{ padding: "12px 10px" }}>{inv.date}</td>
                  <td style={{ padding: "12px 10px" }}>{inv.amount}</td>
                  <td style={{ padding: "12px 10px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", background: inv.status === "Paid" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)", color: inv.status === "Paid" ? "#10b981" : "#ef4444" }}>{inv.status}</span>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right" }}>
                    <button
                      onClick={() => handleDownloadInvoice(inv.id)}
                      style={{ padding: "4px 8px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "#a78bfa", fontSize: "11px", borderRadius: "4px", cursor: "pointer" }}
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* support Desk Form */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Open Billing Support Ticket</h3>
        <form onSubmit={handleCreateTicket}>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Ticket Title</label>
            <input
              type="text"
              placeholder="e.g. Failed transaction refund query"
              required
              value={supportTicket.title}
              onChange={(e) => setSupportTicket({ ...supportTicket, title: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Priority Rating</label>
            <select
              value={supportTicket.priority}
              onChange={(e) => setSupportTicket({ ...supportTicket, priority: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(8,13,26,0.9)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            >
              <option value="High">🚨 High priority</option>
              <option value="Medium">⚡ Medium priority</option>
              <option value="Low">💤 Low priority</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Detailed Message</label>
            <textarea
              rows={3}
              placeholder="Explain the problem..."
              value={supportTicket.message}
              onChange={(e) => setSupportTicket({ ...supportTicket, message: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            />
          </div>

          <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Submit Ticket</button>
        </form>

        {/* Existing tickets list */}
        <div style={{ marginTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, marginBottom: "8px" }}>YOUR ACTIVE TICKETS</div>
          {ticketsList.map(t => (
            <div key={t.id} style={{ fontSize: "12px", background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: "4px", display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span>{t.title}</span>
              <span style={{ color: "#a78bfa", fontWeight: 700 }}>{t.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
