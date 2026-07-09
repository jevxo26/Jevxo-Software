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
    <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1.4fr] gap-7">
      
      {/* Customer List Card */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-900 mb-4">CRM Customer Profiles</h3>
        
        <div className="flex flex-col gap-4">
          {customerList.map((cust) => (
            <div key={cust.id} className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-violet-600">{cust.id}</span>
                <span className="text-[10px] font-bold py-0.5 px-2 rounded bg-emerald-500/10 text-emerald-600">{cust.status}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-950">{cust.company}</h4>
              <div className="text-xs text-slate-500 mt-1">Domain: <strong className="text-slate-700">{cust.domain}</strong></div>
              
              <div className="flex gap-5 mt-3.5 text-xs border-t border-slate-900/10 pt-2.5 text-slate-500">
                <div>Plan: <strong className="text-slate-700">{cust.plan}</strong></div>
                <div>Renewal: <strong className="text-slate-700">{cust.renewalDate}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Timeline */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-900 mb-5">CRM Activity Timeline</h3>
        
        <div className="flex flex-col gap-5">
          {timelineLogs.map((log, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-600 shadow-[0_0_6px_#a78bfa]" />
                {idx !== timelineLogs.length - 1 && (
                  <div className="w-0.5 flex-1 bg-slate-900/10 mt-1" />
                )}
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold">{log.time}</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{log.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
