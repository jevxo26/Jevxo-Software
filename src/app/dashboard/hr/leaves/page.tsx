"use client";

import { useState } from "react";

interface LeaveRequest {
  id: string;
  name: string;
  type: string;
  dates: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function HrLeavesPage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: "leave-1", name: "Rahat Khan", type: "Sick Leave", dates: "July 08 - July 10", status: "Pending" }
  ]);
  const [newLeave, setNewLeave] = useState({ type: "Annual Leave", dates: "", reason: "" });

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeave.dates) return;
    const req: LeaveRequest = {
      id: `leave-${Date.now()}`,
      name: "Tasnim Ara",
      type: newLeave.type,
      dates: newLeave.dates,
      status: "Pending"
    };
    setLeaveRequests([req, ...leaveRequests]);
    setNewLeave({ type: "Annual Leave", dates: "", reason: "" });
  };

  const handleApproveLeave = (leaveId: string, status: "Approved" | "Rejected") => {
    setLeaveRequests(leaveRequests.map(r => r.id === leaveId ? { ...r, status } : r));
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "28px" }} className="admin-grid-top">
      
      {/* Pending Leaves List */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Leave Request Approval Queue</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {leaveRequests.map((req) => (
            <div key={req.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "16px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#fff" }}>{req.name}</div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                  {req.type} | <span style={{ color: "#06b6d4" }}>{req.dates}</span>
                </div>
              </div>

              <div>
                {req.status === "Pending" ? (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => handleApproveLeave(req.id, "Rejected")} style={{ padding: "6px 12px", borderRadius: "4px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Reject</button>
                    <button onClick={() => handleApproveLeave(req.id, "Approved")} style={{ padding: "6px 12px", borderRadius: "4px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Approve</button>
                  </div>
                ) : (
                  <span style={{ fontSize: "12px", fontWeight: 700, color: req.status === "Approved" ? "#10b981" : "#ef4444" }}>{req.status}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Form */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Apply for Leave</h3>
        <form onSubmit={handleApplyLeave}>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Leave Type</label>
            <select
              value={newLeave.type}
              onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            >
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Dates Requested</label>
            <input
              type="text"
              placeholder="e.g. July 12 - July 15"
              required
              value={newLeave.dates}
              onChange={(e) => setNewLeave({ ...newLeave, dates: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Reason</label>
            <textarea
              rows={2}
              value={newLeave.reason}
              onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            />
          </div>

          <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Submit Application</button>
        </form>
      </div>

    </div>
  );
}
