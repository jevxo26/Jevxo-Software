"use client";

import { useState } from "react";
import { initialEmployees, EmployeeItem } from "../mockData";

export default function HrOverviewPage() {
  const [employees] = useState<EmployeeItem[]>(initialEmployees);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [attendanceLogs, setAttendanceLogs] = useState<string[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const handleCheckInToggle = () => {
    const time = new Date().toLocaleTimeString();
    if (!isCheckedIn) {
      setAttendanceLogs([`Checked In at ${time}`, ...attendanceLogs]);
      setIsCheckedIn(true);
    } else {
      setAttendanceLogs([`Checked Out at ${time}`, ...attendanceLogs]);
      setIsCheckedIn(false);
    }
  };

  const filteredEmployees = employees.filter(e => 
    departmentFilter === "All" ? true : e.dept === departmentFilter
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Attendance console & Logs */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr", gap: "28px" }} className="admin-grid-top">
        
        {/* Check in Console */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Check In / Out Console</h3>
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "20px" }}>Log daily attendance records directly into the workspace node.</p>
          
          <button
            onClick={handleCheckInToggle}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "10px",
              background: isCheckedIn ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              boxShadow: isCheckedIn ? "0 0 15px rgba(239,68,68,0.25)" : "0 0 15px rgba(16,185,129,0.25)",
              transition: "all 0.2s"
            }}
          >
            {isCheckedIn ? "🔴 Check Out of Node" : "🟢 Check In to Node"}
          </button>
        </div>

        {/* Timelog records */}
        <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>Session Attendance Logs</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "120px", overflowY: "auto" }}>
            {attendanceLogs.length > 0 ? (
              attendanceLogs.map((log, idx) => (
                <div key={idx} style={{ fontSize: "12px", background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.04)" }}>
                  ⏳ {log}
                </div>
              ))
            ) : (
              <div style={{ fontSize: "12px", color: "var(--text-muted)", padding: "10px 0" }}>No check-in session logged today.</div>
            )}
          </div>
        </div>

      </div>

      {/* Staff directory */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Department Staff & Interns</h3>
          
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border)", background: "rgba(8,13,26,0.9)", color: "#fff", fontSize: "13px" }}
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "var(--text-secondary)", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Employee</th>
                <th style={{ padding: "10px" }}>Department</th>
                <th style={{ padding: "10px" }}>Status</th>
                <th style={{ padding: "10px" }}>Leave Balance</th>
                <th style={{ padding: "10px" }}>Performance</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((e) => (
                <tr key={e.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontWeight: 700, color: "#fff" }}>{e.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{e.role}</div>
                  </td>
                  <td style={{ padding: "12px 10px" }}>{e.dept}</td>
                  <td style={{ padding: "12px 10px" }}>
                    <span style={{ color: e.attendance === "Present" ? "#10b981" : "#f59e0b", fontWeight: 600 }}>{e.attendance}</span>
                  </td>
                  <td style={{ padding: "12px 10px" }}>{e.leaveBalance} days</td>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", minWidth: "60px" }}>
                        <div style={{ width: `${e.performance}%`, height: "4px", background: "#7c3aed", borderRadius: "2px" }} />
                      </div>
                      <span>{e.performance}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
