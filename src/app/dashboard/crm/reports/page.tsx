"use client";

import { salesLeaderboard } from "../../mockData";

export default function CrmReportsPage() {
  const leadSources = [
    { source: "Organic Search", leads: 110, conversion: "12%" },
    { source: "Meta Ad Campaigns", leads: 145, conversion: "8.5%" },
    { source: "Country Partner Referrals", leads: 82, conversion: "24%" },
    { source: "Direct Inbound Portal", leads: 40, conversion: "18%" }
  ];

  return (
    <div className="flex flex-col gap-7">
      
      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-2xl">
          <div className="text-xs text-slate-400 font-bold tracking-wider uppercase">Overall Conversion Rate</div>
          <div className="text-2xl font-extrabold mt-2 text-emerald-600">14.8%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">📈 +2.1% improvement this quarter</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-2xl">
          <div className="text-xs text-slate-400 font-bold tracking-wider uppercase">Qualified Leads</div>
          <div className="text-2xl font-extrabold mt-2 text-violet-600">377</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">Across 6 custom business funnels</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-2xl">
          <div className="text-xs text-slate-400 font-bold tracking-wider uppercase">Total Deal Value</div>
          <div className="text-2xl font-extrabold mt-2 text-cyan-600">$48,700</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-1">Pipeline active balance</div>
        </div>
      </div>

      {/* Charts & Lead Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-7">
        
        {/* Lead Sources */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h4 className="text-sm font-bold text-slate-900 mb-5">Lead Ingestion Sources</h4>
          <div className="flex flex-col gap-4">
            {leadSources.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">{item.source}</span>
                  <span className="text-slate-500">{item.leads} leads</span>
                </div>
                <div className="w-full h-1 bg-slate-900/5 rounded-full overflow-hidden">
                  <div style={{ width: `${(item.leads / 200) * 100}%` }} className="h-full bg-cyan-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent leaderboard */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h4 className="text-sm font-bold text-slate-900 mb-4">Sales Team Performance</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs text-left">
              <thead>
                <tr className="border-b border-slate-900/10 text-slate-500">
                  <th className="p-2.5 font-semibold">Agent</th>
                  <th className="p-2.5 font-semibold">Deals Closed</th>
                  <th className="p-2.5 font-semibold">Target Progress</th>
                  <th className="p-2.5 font-semibold text-right">XP points</th>
                </tr>
              </thead>
              <tbody>
                {salesLeaderboard.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-900/5 hover:bg-white/50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{item.name}</td>
                    <td className="p-3 text-slate-600">{item.deals} deals</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-slate-900/5 rounded-full min-w-[60px] overflow-hidden">
                          <div style={{ width: `${item.targetProgress}%` }} className="h-full bg-violet-600 rounded-full" />
                        </div>
                        <span className="text-slate-600">{item.targetProgress}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-right text-violet-600 font-bold">{item.xp} XP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
