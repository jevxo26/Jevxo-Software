"use client";

import { useState } from "react";

export default function PartnerOverviewPage() {
  const [partnerCountry, setPartnerCountry] = useState("Bangladesh");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawHistory, setWithdrawHistory] = useState([
    { id: "TXN-902", amount: "$2,500.00", date: "2026-06-15", status: "Approved" },
    { id: "TXN-411", amount: "$1,800.00", date: "2026-05-10", status: "Approved" }
  ]);

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) return;
    const req = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      amount: `$${Number(withdrawAmount).toFixed(2)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    };
    setWithdrawHistory([req, ...withdrawHistory]);
    setWithdrawAmount("");
    alert("Withdrawal request logged successfully and queued for verification.");
  };

  const partnerRankings = [
    { rank: 1, country: "United Kingdom Partner node", clients: 92, revenue: "$380,000" },
    { rank: 2, country: "Bangladesh Partner node (Your node)", clients: 84, revenue: "$240,000" },
    { rank: 3, country: "United Arab Emirates Partner node", clients: 34, revenue: "$138,500" }
  ];

  return (
    <div className="flex flex-col gap-7">
      
      {/* Commission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-2xl">
          <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Clients Managed</div>
          <div className="text-2xl font-extrabold mt-2 text-blue-500">84</div>
          <div className="text-[10px] text-slate-400 mt-1">Across your regional nodes</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-2xl">
          <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Commission Earned</div>
          <div className="text-2xl font-extrabold mt-2 text-emerald-600">$14,400.00</div>
          <div className="text-[10px] text-emerald-600 mt-1">📈 +$1,200.00 pending sync</div>
        </div>
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-6 rounded-2xl">
          <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Available Wallet Balance</div>
          <div className="text-2xl font-extrabold mt-2 text-cyan-600">$5,200.00</div>
          <div className="text-[10px] text-slate-400 mt-1">Withdrawal checkout ready</div>
        </div>
      </div>

      {/* Withdrawal Request Form & Transaction Log */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-7">
        
        {/* Form */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Request Commission Withdrawal</h3>
          <form onSubmit={handleWithdrawSubmit}>
            <div className="mb-3">
              <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Select Country Account</label>
              <select
                value={partnerCountry}
                onChange={(e) => setPartnerCountry(e.target.value)}
                className="w-full p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
              >
                <option value="Bangladesh">Bangladesh (BKash/Bank)</option>
                <option value="United Kingdom">United Kingdom (IBAN)</option>
                <option value="United States">United States (ACH)</option>
                <option value="United Arab Emirates">United Arab Emirates (Local Transfer)</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Withdraw Amount (USD)</label>
              <input
                type="number"
                placeholder="e.g. 500"
                required
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
              />
              <span className="text-[10px] text-slate-400 mt-1.5 block">Maximum transfer: $5,200.00</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Initiate Bank Transfer
            </button>
          </form>
        </div>

        {/* Log */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Withdrawal Request Logs</h3>
          <div className="flex flex-col gap-2.5">
            {withdrawHistory.map((txn) => (
              <div key={txn.id} className="bg-slate-900/5 border border-slate-900/5 p-4 px-5 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-955 text-sm">{txn.amount}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">ID: {txn.id} | Date: {txn.date}</div>
                </div>
                <span className={`text-[10px] font-bold py-1 px-2.5 rounded-full ${
                  txn.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                }`}>
                  {txn.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Gamified Partner Leaderboard */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Top Performing Country Partners</h3>
        <div className="flex flex-col gap-3">
          {partnerRankings.map((p) => (
            <div key={p.rank} className="bg-slate-900/5 border border-slate-900/5 p-4 px-5 rounded-xl flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className={`text-base font-extrabold ${p.rank === 1 ? "text-amber-500" : "text-slate-500"}`}>#{p.rank}</span>
                <span className="font-bold text-slate-900 text-xs">{p.country}</span>
              </div>
              <div className="flex gap-6 text-xs text-slate-500">
                <div>Clients: <strong className="text-slate-700">{p.clients}</strong></div>
                <div>Volume: <strong className="text-emerald-600 font-semibold">{p.revenue}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
