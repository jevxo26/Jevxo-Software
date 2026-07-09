"use client";

export default function ClientDomainPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-7">
      
      {/* Domain host DNS cards */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-base font-bold text-slate-900 mb-4">Domain Host Records</h3>
        <div className="flex flex-col gap-3 text-sm text-slate-600">
          <div>Domain: <strong className="text-slate-900 font-bold">apexgroup.com</strong></div>
          <div>Node Endpoint IP: <strong className="text-slate-700 font-semibold">104.21.43.18</strong></div>
          <div>Hosting Region: <strong className="text-slate-700 font-semibold">Bangladesh Node (HQ)</strong></div>
          <div className="border-t border-slate-900/10 pt-3 mt-2">
            <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase block mb-1">NAMESERVERS</span>
            <div className="text-violet-600 font-mono text-xs font-semibold">ns1.jevxo.net</div>
            <div className="text-violet-600 font-mono text-xs font-semibold">ns2.jevxo.net</div>
          </div>
        </div>
      </div>

      {/* Hosting Usage meters */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-base font-bold text-slate-900 mb-5">Server Resource Allocation</h3>
        
        <div className="mb-5">
          <div className="flex justify-between text-sm font-semibold mb-1.5">
            <span className="text-slate-700">Storage Utilization</span>
            <span className="text-violet-600">42 GB / 100 GB</span>
          </div>
          <div className="w-full h-2 bg-slate-900/5 rounded-full overflow-hidden">
            <div style={{ width: "42%" }} className="h-full bg-violet-600 rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm font-semibold mb-1.5">
            <span className="text-slate-700">Bandwidth Transfer (This Month)</span>
            <span className="text-cyan-600">1.1 TB / 5.0 TB</span>
          </div>
          <div className="w-full h-2 bg-slate-900/5 rounded-full overflow-hidden">
            <div style={{ width: "22%" }} className="h-full bg-cyan-500 rounded-full" />
          </div>
        </div>
      </div>

    </div>
  );
}
