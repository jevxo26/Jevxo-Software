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
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-7">
      
      {/* Pending Leaves List */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Leave Request Approval Queue</h3>
        <div className="flex flex-col gap-3">
          {leaveRequests.map((req) => (
            <div key={req.id} className="bg-slate-900/5 border border-slate-900/5 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900 text-xs">{req.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {req.type} | <span className="text-cyan-600 font-semibold">{req.dates}</span>
                </div>
              </div>

              <div>
                {req.status === "Pending" ? (
                  <div className="flex gap-2">
                    <button onClick={() => handleApproveLeave(req.id, "Rejected")} className="p-1.5 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-red-600 text-[10px] font-bold transition-all cursor-pointer">Reject</button>
                    <button onClick={() => handleApproveLeave(req.id, "Approved")} className="p-1.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 text-[10px] font-bold transition-all cursor-pointer">Approve</button>
                  </div>
                ) : (
                  <span className={`text-xs font-bold ${req.status === "Approved" ? "text-emerald-600" : "text-red-600"}`}>{req.status}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Form */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Apply for Leave</h3>
        <form onSubmit={handleApplyLeave}>
          <div className="mb-3">
            <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Leave Type</label>
            <select
              value={newLeave.type}
              onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
              className="w-full p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
            >
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Dates Requested</label>
            <input
              type="text"
              placeholder="e.g. July 12 - July 15"
              required
              value={newLeave.dates}
              onChange={(e) => setNewLeave({ ...newLeave, dates: e.target.value })}
              className="w-full p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
            />
          </div>

          <div className="mb-5">
            <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Reason</label>
            <textarea
              rows={2}
              value={newLeave.reason}
              onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
              className="w-full p-2.5 px-3.5 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Submit Application
          </button>
        </form>
      </div>

    </div>
  );
}
