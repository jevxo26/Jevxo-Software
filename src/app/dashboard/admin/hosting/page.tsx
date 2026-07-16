"use client";

import { useGetWebsitesQuery } from "@/lib/redux/baisapi";

export default function AdminHostingPage() {
  const { data: websites = [], isLoading, isError } = useGetWebsitesQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-500">Querying active hosting nodes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-red-50/50 border border-red-900/10 rounded-2xl">
        <span className="text-3xl">⚠️</span>
        <h3 className="text-base font-bold text-red-900 mt-3">Failed to load hosting records</h3>
        <p className="text-xs text-red-600 mt-1">Please verify your connection and try again.</p>
      </div>
    );
  }

  const domainsList = websites.map((w: any) => {
    const expiryDate = w.websiteDomain?.expiryDate
      ? new Date(w.websiteDomain.expiryDate).toISOString().split("T")[0]
      : w.ssl?.expiryDate
      ? new Date(w.ssl.expiryDate).toISOString().split("T")[0]
      : "No Expiry";

    return {
      domain: w.domain || w.name,
      ip: w.hosting?.server || "127.0.0.1",
      ssl: w.ssl?.status || "Valid",
      bandwidth: w.hosting?.bandwidth || "0 GB",
      storage: w.hosting?.storage || "0 GB",
      expires: expiryDate,
    };
  });

  return (
    <div className="flex flex-col gap-7">
      
      {/* Infrastructure KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-xl">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Overall Server Load</div>
          <div className="text-[28px] font-extrabold mt-2 text-emerald-600">38%</div>
          <div className="text-[11px] text-slate-400 mt-1">Across 4 regional nodes</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-xl">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Storage Allocated</div>
          <div className="text-[28px] font-extrabold mt-2 text-violet-600">157 GB / 500 GB</div>
          <div className="text-[11px] text-slate-400 mt-1">31.4% capacity used</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-xl">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Domain SSL Status</div>
          <div className="text-[28px] font-extrabold mt-2 text-amber-500">1 Flag</div>
          <div className="text-[11px] text-red-500 mt-1">1 SSL Certificate Expired</div>
        </div>
      </div>

      {/* Storage and Bandwidth Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        
        {/* Storage Bar */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h3 className="text-[15px] font-bold text-slate-900 mb-5">Storage Allocation Progress</h3>
          <div className="flex flex-col gap-4">
            {[
              { label: "US-West-01 Node", used: 60, limit: 150 },
              { label: "UK-London-01 Node", used: 35, limit: 100 },
              { label: "BD-Dhaka-01 Node (HQ)", used: 42, limit: 150 },
              { label: "UAE-Dubai-01 Node", used: 12, limit: 100 }
            ].map((node, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-600 font-medium">{node.label}</span>
                  <span className="text-violet-600 font-semibold">{node.used} GB / {node.limit} GB</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900/5 rounded-full overflow-hidden">
                  <div style={{ width: `${(node.used / node.limit) * 100}%` }} className="h-full bg-violet-600 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bandwidth Usage Chart simulation */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h3 className="text-[15px] font-bold text-slate-900 mb-5">Bandwidth Load Distribution</h3>
          <div className="h-40 flex items-end gap-4 pb-2.5">
            {[
              { day: "Mon", size: "40%" },
              { day: "Tue", size: "55%" },
              { day: "Wed", size: "85%" },
              { day: "Thu", size: "70%" },
              { day: "Fri", size: "90%" },
              { day: "Sat", size: "45%" },
              { day: "Sun", size: "35%" }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div style={{ height: bar.size }} className="w-full bg-gradient-to-t from-cyan-500 to-cyan-600 rounded-t-md hover:opacity-90 transition-opacity" />
                <span className="text-[11px] text-slate-500">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Domain List and SSL Table */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-base font-bold text-slate-900 mb-4">Domain Host Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-left">
            <thead>
              <tr className="border-b border-slate-900/10 text-slate-400 font-medium">
                <th className="p-2.5">Hostname</th>
                <th className="p-2.5">IP Address</th>
                <th className="p-2.5">Bandwidth</th>
                <th className="p-2.5">Storage</th>
                <th className="p-2.5">SSL status</th>
                <th className="p-2.5 text-right">Renewal Date</th>
              </tr>
            </thead>
            <tbody>
              {domainsList.map((item: any, index: number) => (
                <tr key={index} className="border-b border-slate-900/5 hover:bg-white/50 transition-colors">
                  <td className="py-3 px-2.5 font-bold text-slate-900">{item.domain}</td>
                  <td className="py-3 px-2.5 text-slate-500">{item.ip}</td>
                  <td className="py-3 px-2.5 text-slate-600">{item.bandwidth}</td>
                  <td className="py-3 px-2.5 text-slate-600">{item.storage}</td>
                  <td className="py-3 px-2.5">
                    <span className={`text-[10px] font-bold py-0.5 px-2 rounded-full inline-block ${
                      item.ssl === "Valid"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : item.ssl === "Expired"
                        ? "bg-red-500/10 text-red-600"
                        : "bg-amber-500/10 text-amber-600"
                    }`}>
                      {item.ssl}
                    </span>
                  </td>
                  <td className="py-3 px-2.5 text-right text-slate-500">{item.expires}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
