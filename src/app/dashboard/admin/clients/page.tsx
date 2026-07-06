"use client";

import { useState } from "react";
import { initialClients, ClientItem } from "../../mockData";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);

  const handleToggleSuspend = (client: ClientItem) => {
    setSelectedClient(client);
  };

  const confirmSuspendClient = () => {
    if (selectedClient) {
      setClients(clients.map(c => {
        if (c.id === selectedClient.id) {
          const nextStatus = c.status === "Suspended" ? "Active" : "Suspended";
          return { ...c, status: nextStatus };
        }
        return c;
      }));
      setSelectedClient(null);
    }
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === "All" ? true : c.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Search and Filters Header */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>Client Database Management</h3>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Track plans, suspend websites, or audit system memberships.</p>
          </div>
          
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="Search Client ID or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(0,0,0,0.3)", color: "#fff", fontSize: "13px", width: "240px" }}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(8,13,26,0.95)", color: "#fff", fontSize: "13px", cursor: "pointer" }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Expired">Expired</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Database Table */}
        <div style={{ overflowX: "auto", marginTop: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "var(--text-muted)" }}>
                <th style={{ padding: "12px 10px" }}>Client ID</th>
                <th style={{ padding: "12px 10px" }}>Company / Name</th>
                <th style={{ padding: "12px 10px" }}>Plan Level</th>
                <th style={{ padding: "12px 10px" }}>Country</th>
                <th style={{ padding: "12px 10px" }}>Status</th>
                <th style={{ padding: "12px 10px", textAlign: "right" }}>Ecosystem Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "14px 10px", fontWeight: 700, color: "#fff" }}>{c.id}</td>
                  <td style={{ padding: "14px 10px" }}>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{c.website}</div>
                  </td>
                  <td style={{ padding: "14px 10px" }}>
                    <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.04)", padding: "3px 8px", borderRadius: "4px" }}>{c.plan}</span>
                  </td>
                  <td style={{ padding: "14px 10px" }}>{c.country}</td>
                  <td style={{ padding: "14px 10px" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 8px",
                      borderRadius: "100px",
                      background: c.status === "Active" ? "rgba(16,185,129,0.12)" : c.status === "Suspended" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.12)",
                      color: c.status === "Active" ? "#10b981" : c.status === "Suspended" ? "#ef4444" : "#f59e0b"
                    }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 10px", textAlign: "right" }}>
                    <button
                      onClick={() => handleToggleSuspend(c)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: c.status === "Suspended" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                        border: "1px solid",
                        borderColor: c.status === "Suspended" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
                        color: c.status === "Suspended" ? "#10b981" : "#ef4444",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {c.status === "Suspended" ? "Activate Website" : "Suspend Node"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suspension Confirmation Modal */}
      {selectedClient && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 999
        }}>
          <div className="glass" style={{
            width: "100%", maxWidth: "440px",
            padding: "32px", borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(8,13,26,0.95)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
          }}>
            <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
              ⚠️ Confirm System Authorization Action
            </h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "24px" }}>
              Are you sure you want to {selectedClient.status === "Suspended" ? "ACTIVATE" : "SUSPEND"} the Jevxo node subscription for <strong>{selectedClient.name}</strong> ({selectedClient.id})? This will immediately toggle public server availability.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedClient(null)}
                style={{ padding: "8px 16px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px", cursor: "pointer" }}
              >
                Cancel Action
              </button>
              <button
                onClick={confirmSuspendClient}
                style={{
                  padding: "8px 16px", borderRadius: "6px",
                  background: selectedClient.status === "Suspended" ? "#10b981" : "#ef4444",
                  border: "none", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer"
                }}
              >
                Confirm and Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
