"use client";

import { useState } from "react";

export default function CrmCustomersPage() {
  const customerList = [
    { id: "JEVXO-BD-001", company: "Apex Group Ltd", domain: "apexgroup.com", plan: "Growth Plan (Annual)", signedDate: "2025-10-12", renewalDate: "2026-10-12", status: "Active" },
    { id: "JEVXO-UK-042", company: "Vortex Agency Ltd", domain: "vortexagency.co.uk", plan: "Business Plan (Monthly)", signedDate: "2026-01-20", renewalDate: "2026-08-20", status: "Active" },
    { id: "JEVXO-US-102", company: "Greenfield Biotech", domain: "greenfieldbio.com", plan: "Enterprise Plan (Annual)", signedDate: "2026-03-05", renewalDate: "2027-03-05", status: "Active" },
  ];

  const timelineLogs = [
    { time: "2026-07-06 14:20", msg: "Client apexgroup.com updated DNS registers to route via Node BD-HQ." },
    { time: "2026-07-05 09:12", msg: "Invoice INV-2026-042 settled automatically via Meta Stripe billing." },
    { time: "2026-06-15 11:30", msg: "Support Ticket TCK-412 resolved: API keys synchronized with CRM database." }
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "28px" }} className="admin-grid-top">
      
      {/* Customer List Card */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>CRM Customer Profiles</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {customerList.map((cust) => (
            <div key={cust.id} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", padding: "20px", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#a78bfa" }}>{cust.id}</span>
                <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", background: "rgba(16,185,129,0.12)", color: "#10b981" }}>{cust.status}</span>
              </div>

              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>{cust.company}</h4>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>Domain: <strong>{cust.domain}</strong></div>
              
              <div style={{ display: "flex", gap: "20px", marginTop: "14px", fontSize: "12px", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "10px", color: "var(--text-secondary)" }}>
                <div>Plan: <strong>{cust.plan}</strong></div>
                <div>Renewal: <strong>{cust.renewalDate}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Timeline */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px" }}>CRM Activity Timeline</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {timelineLogs.map((log, idx) => (
            <div key={idx} style={{ display: "flex", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 6px #a78bfa" }} />
                {idx !== timelineLogs.length - 1 && (
                  <div style={{ width: "2px", flex: 1, background: "rgba(255,255,255,0.06)", marginTop: "4px" }} />
                )}
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>{log.time}</div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px", lineHeight: 1.5 }}>{log.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
