"use client";

import { marketingAssets } from "../../mockData";

export default function PartnerMarketingPage() {
  const handleDownload = (name: string) => {
    alert(`Initiating download stream for: ${name}. ZIP package compilation active.`);
  };

  return (
    <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
      <h3 className="text-sm font-bold text-slate-900 mb-1">📁 Marketing Materials & Promotional Kit</h3>
      <p className="text-xs text-slate-500 mb-6">Access regional promotional slides, poster vector files, and official demo videos.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {marketingAssets.map((asset) => (
          <div key={asset.id} className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-3xl">
                {asset.type.includes("Video") ? "🎥" : asset.type.includes("Deck") ? "📊" : "🖼️"}
              </div>
              <h4 className="text-xs font-bold mt-3 text-slate-950">{asset.name}</h4>
              <div className="text-[10px] text-slate-400 mt-1">{asset.type}</div>
            </div>
            
            <button
              onClick={() => handleDownload(asset.name)}
              className="w-full mt-4 py-1.5 px-3 bg-violet-600/10 hover:bg-violet-600/15 border border-violet-600/20 text-violet-600 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
            >
              Download ({asset.format.split(" / ")[0]})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
