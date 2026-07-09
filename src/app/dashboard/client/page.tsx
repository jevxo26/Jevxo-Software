"use client";

export default function ClientOverviewPage() {
  return (
    <div className="flex flex-col gap-7">
      
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-7">
        
        {/* Client ID card */}
        <div className="bg-slate-900 border border-violet-500/30 p-7 rounded-2xl shadow-xl text-white">
          <div className="flex justify-between items-center mb-5">
            <span className="text-[11px] font-bold py-0.5 px-2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">JEVXO NODE PORTAL</span>
            <span className="text-xs text-slate-400">ID: JEVXO-BD-000001</span>
          </div>

          <h3 className="text-2xl font-extrabold text-white mb-2">Apex Group Ltd</h3>
          <div className="text-sm text-slate-300">Plan Subscription: <strong className="text-cyan-400 font-semibold">Growth Plan (Annual)</strong></div>
          
          <div className="border-t border-slate-800 pt-4 mt-5 flex gap-5">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">SSL Status</div>
              <span className="text-xs font-bold text-emerald-400">🔒 Secured</span>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Domain Renewal</div>
              <span className="text-xs font-bold text-amber-400">📅 240 days left</span>
            </div>
          </div>
        </div>

        {/* Website Health Score indexes */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h3 className="text-[15px] font-bold text-slate-900 mb-4">Node Health score Index</h3>
          
          <div className="grid grid-cols-3 gap-5">
            <div className="text-center">
              <div className="text-2xl text-emerald-600 font-extrabold">98%</div>
              <div className="text-[11px] text-slate-500 mt-1">Speed optimization</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-cyan-600 font-extrabold">100%</div>
              <div className="text-[11px] text-slate-500 mt-1">Security Index</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-violet-600 font-extrabold">92%</div>
              <div className="text-[11px] text-slate-500 mt-1">SEO Keyword ranking</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
