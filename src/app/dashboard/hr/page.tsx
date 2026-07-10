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
    <div className="flex flex-col gap-7">
      
      {/* Attendance console & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.6fr] gap-7">
        
        {/* Check in Console */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-900">Check In / Out Console</h3>
          <p className="text-xs text-slate-500 mt-1 mb-5">Log daily attendance records directly into the workspace node.</p>
          
          <button
            onClick={handleCheckInToggle}
            className={`w-full p-4 rounded-xl text-white font-bold text-sm border-0 cursor-pointer shadow-md transition-all ${
              isCheckedIn
                ? "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-rose-500/20"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/20"
            }`}
          >
            {isCheckedIn ? "🔴 Check Out of Node" : "🟢 Check In to Node"}
          </button>
        </div>

        {/* Timelog records */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Session Attendance Logs</h3>
          <div className="flex flex-col gap-2 max-h-[120px] overflow-y-auto">
            {attendanceLogs.length > 0 ? (
              attendanceLogs.map((log, idx) => (
                <div key={idx} className="text-xs bg-slate-900/5 border border-slate-900/5 p-2 px-3 rounded-lg text-slate-700">
                  ⏳ {log}
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-400 py-2.5">No check-in session logged today.</div>
            )}
          </div>
        </div>

      </div>

      {/* Staff directory */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <div className="flex justify-between items-center mb-5 flex-wrap gap-4">
          <h3 className="text-sm font-bold text-slate-900">Department Staff & Interns</h3>
          
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs text-left">
            <thead>
              <tr className="border-b border-slate-900/10 text-slate-500">
                <th className="p-2.5 font-semibold">Employee</th>
                <th className="p-2.5 font-semibold">Department</th>
                <th className="p-2.5 font-semibold">Status</th>
                <th className="p-2.5 font-semibold">Leave Balance</th>
                <th className="p-2.5 font-semibold">Performance</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((e) => (
                <tr key={e.id} className="border-b border-slate-900/5 hover:bg-white/50 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-950">{e.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{e.role}</div>
                  </td>
                  <td className="p-3 text-slate-600">{e.dept}</td>
                  <td className="p-3">
                    <span className={`font-semibold ${e.attendance === "Present" ? "text-emerald-600" : "text-amber-600"}`}>{e.attendance}</span>
                  </td>
                  <td className="p-3 text-slate-600">{e.leaveBalance} days</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-slate-900/5 rounded-full min-w-[60px] overflow-hidden">
                        <div style={{ width: `${e.performance}%` }} className="h-full bg-violet-600 rounded-full" />
                      </div>
                      <span className="text-slate-600">{e.performance}%</span>
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
