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
    if (score >= 90) return "text-emerald-600";
    if (score >= 75) return "text-blue-600";
    return "text-amber-600";
  };

  const filteredLeads = leads.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-7">
      
      {/* CRM Actions header */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-2xl flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Interactive Lead Pipeline</h3>
          <p className="text-xs text-slate-500">Track potential deals, score quality, and shift pipeline stages.</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-xs w-56 focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-2.5">
        {columns.map((colName) => {
          const colLeads = filteredLeads.filter(l => l.stage === colName);
          return (
            <div key={colName} className="bg-slate-900/5 border border-slate-900/5 rounded-2xl p-4 min-w-[165px]">
              <div className="flex justify-between items-center mb-4 border-b border-slate-900/10 pb-2">
                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{colName}</span>
                <span className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-slate-900/10 text-slate-600">{colLeads.length}</span>
              </div>

              <div className="flex flex-col gap-3">
                {colLeads.map((lead) => (
                  <div key={lead.id} className="bg-white border border-slate-900/[0.08] p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">AI Match</span>
                      <span className={`text-[10px] font-bold ${getScoreColor(lead.score)}`}>{lead.score}%</span>
                    </div>
                    
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">{lead.title}</h4>
                    <div className="text-[10px] text-slate-500 mt-1">{lead.client}</div>
                    <div className="text-xs font-bold text-violet-600 mt-2 block">{lead.value}</div>
                    
                    {/* Shift buttons */}
                    <div className="flex gap-1 justify-end mt-3 border-t border-slate-900/10 pt-2">
                      {lead.stage !== "New" && (
                        <button onClick={() => cycleLeadStage(lead.id, "backward")} className="p-1 px-2.5 bg-slate-900/5 hover:bg-slate-900/10 border-0 text-slate-600 text-[10px] rounded cursor-pointer transition-colors">←</button>
                      )}
                      {lead.stage !== "Lost" && (
                        <button onClick={() => cycleLeadStage(lead.id, "forward")} className="p-1 px-2.5 bg-slate-900/5 hover:bg-slate-900/10 border-0 text-slate-600 text-[10px] rounded cursor-pointer transition-colors">→</button>
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
