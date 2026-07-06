"use client";

import { useState } from "react";
import { initialLeads, LeadItem } from "../mockData";

export default function CrmOverviewPage() {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");

  const columns: Array<LeadItem["stage"]> = ["New", "Contacted", "Proposal Sent", "Negotiation", "Won", "Lost"];

  const cycleLeadStage = (leadId: string, direction: "forward" | "backward") => {
    setLeads(leads.map(lead => {
      if (lead.id === leadId) {
        const currentIdx = columns.indexOf(lead.stage);
        let nextIdx = currentIdx + (direction === "forward" ? 1 : -1);
        if (nextIdx >= 0 && nextIdx < columns.length) {
          return { ...lead, stage: columns[nextIdx] };
        }
      }
      return lead;
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "#10b981";
    if (score >= 75) return "#60a5fa";
    return "#f59e0b";
  };

  const filteredLeads = leads.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* CRM Actions header */}
      <div className="glass" style={{ padding: "24px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Interactive Lead Pipeline</h3>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Track potential deals, score quality, and shift pipeline stages.</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", color: "#fff", fontSize: "13px", width: "220px" }}
          />
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", overflowX: "auto", paddingBottom: "10px" }} className="crm-kanban-row">
        {columns.map((colName) => {
          const colLeads = filteredLeads.filter(l => l.stage === colName);
          return (
            <div key={colName} style={{ background: "rgba(0,0,0,0.15)", borderRadius: "12px", padding: "16px", minWidth: "165px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)" }}>{colName.toUpperCase()}</span>
                <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "100px", background: "rgba(255,255,255,0.05)" }}>{colLeads.length}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {colLeads.map((lead) => (
                  <div key={lead.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "12px", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 700 }}>AI Match Score</span>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: getScoreColor(lead.score) }}>{lead.score}%</span>
                    </div>
                    
                    <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>{lead.title}</h4>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>{lead.client}</div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#a78bfa", marginTop: "8px" }}>{lead.value}</div>
                    
                    {/* Shift buttons */}
                    <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end", marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "8px" }}>
                      {lead.stage !== "New" && (
                        <button onClick={() => cycleLeadStage(lead.id, "backward")} style={{ padding: "4px 8px", background: "rgba(255,255,255,0.04)", border: "none", color: "var(--text-secondary)", fontSize: "10px", borderRadius: "4px", cursor: "pointer" }}>←</button>
                      )}
                      {lead.stage !== "Lost" && (
                        <button onClick={() => cycleLeadStage(lead.id, "forward")} style={{ padding: "4px 8px", background: "rgba(255,255,255,0.04)", border: "none", color: "var(--text-secondary)", fontSize: "10px", borderRadius: "4px", cursor: "pointer" }}>→</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
