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
    <div className="flex flex-col gap-7">
      
      {/* Support Center Header */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-base font-bold text-slate-900 mb-1">Escalation & Complaints Desk</h3>
        <p className="text-xs text-slate-500">Review customer complaint logs, escalate hosting blockers, or sign off resolutions.</p>
        
        {/* Ticket List */}
        <div className="flex flex-col gap-4 mt-6">
          {tickets.map((t) => (
            <div key={t.id} className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl flex justify-between items-center flex-wrap gap-4">
              <div className="flex-1 min-w-[250px]">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-xs font-extrabold text-slate-900">{t.id}</span>
                  <span className="text-xs text-slate-400">| {t.client}</span>
                  <span className={`text-[10px] font-bold py-0.5 px-2 rounded-full ${
                    t.priority === "High"
                      ? "bg-red-500/10 text-red-600"
                      : t.priority === "Medium"
                      ? "bg-amber-500/10 text-amber-600"
                      : "bg-emerald-500/10 text-emerald-600"
                  }`}>
                    {t.priority} Priority
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800">{t.subject}</p>
                <div className="text-[11px] text-slate-400 mt-1">Logged: {t.date}</div>
              </div>
 
              {/* Status workflow controls */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Pipeline State</div>
                  <span className={`text-xs font-bold ${
                    t.status === "Open"
                      ? "text-blue-500"
                      : t.status === "Investigation"
                      ? "text-violet-500"
                      : t.status === "Escalated"
                      ? "text-red-500"
                      : "text-emerald-500"
                  }`}>
                    {t.status}
                  </span>
                </div>
 
                <div className="flex gap-2">
                  {t.status !== "Resolved" && (
                    <>
                      {t.status === "Open" && (
                        <button onClick={() => cycleStatus(t.id, "Investigation")} className="py-1.5 px-3 rounded bg-violet-600/10 border border-violet-600/20 text-violet-600 text-xs font-semibold cursor-pointer hover:bg-violet-600/20 transition-all">Investigate</button>
                      )}
                      {t.status === "Investigation" && (
                        <button onClick={() => cycleStatus(t.id, "Escalated")} className="py-1.5 px-3 rounded bg-red-600/10 border border-red-600/20 text-red-600 text-xs font-semibold cursor-pointer hover:bg-red-600/20 transition-all">Escalate</button>
                      )}
                      <button onClick={() => cycleStatus(t.id, "Resolved")} className="py-1.5 px-3 rounded bg-emerald-600/10 border border-emerald-600/20 text-emerald-600 text-xs font-semibold cursor-pointer hover:bg-emerald-600/20 transition-all">Resolve</button>
                    </>
                  )}
                  {t.status === "Resolved" && (
                    <span className="text-lg">✅</span>
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
