"use client";

import { useState } from "react";

export default function SalesOverviewPage() {
  const [meetingSubject, setMeetingSubject] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [agentMeetings, setAgentMeetings] = useState([
    { subject: "Intro Call: Vortex Agency", date: "July 08, 11:30 AM" }
  ]);

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingSubject || !meetingDate) return;
    setAgentMeetings([{ subject: meetingSubject, date: meetingDate }, ...agentMeetings]);
    setMeetingSubject("");
    setMeetingDate("");
    alert("Outbound sales meeting successfully logged.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      
      {/* Target Progress Bar and scheduler */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }} className="admin-grid-top">
        
        {/* Target Progress Bar */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>🎯 Target Commission Tracker</h3>
          
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
              <span>Daily Target ($500)</span>
              <span style={{ color: "#06b6d4" }}>70%</span>
            </div>
            <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }}>
              <div style={{ width: "70%", height: "8px", background: "#06b6d4", borderRadius: "4px" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
              <span>Monthly Target ($15,000)</span>
              <span style={{ color: "#a78bfa" }}>85%</span>
            </div>
            <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }}>
              <div style={{ width: "85%", height: "8px", background: "#7c3aed", borderRadius: "4px" }} />
            </div>
          </div>
        </div>

        {/* Meeting Scheduler */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }} id="sales-meetings">
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>📅 Schedule Client Call</h3>
          <form onSubmit={handleScheduleMeeting}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Meeting Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Core Redesign Demo"
                  required
                  value={meetingSubject}
                  onChange={(e) => setMeetingSubject(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Date & Time</label>
                <input
                  type="text"
                  placeholder="e.g. July 10, 3:00 PM"
                  required
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                />
              </div>
            </div>

            <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Log Call Details</button>
          </form>
        </div>

      </div>

      {/* Upcoming logged meetings */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "12px" }}>UPCOMING CALLS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {agentMeetings.map((meet, idx) => (
            <div key={idx} style={{ fontSize: "13px", background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.04)" }}>
              📞 <strong>{meet.subject}</strong> — Scheduled Date: {meet.date}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
