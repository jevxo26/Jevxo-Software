"use client";

import { salesLeaderboard } from "../../mockData";

export default function SalesLeaderboardPage() {
  const handleBadgeClick = (badge: string) => {
    alert(`Badge Detail: You unlocked "${badge}". XP reward synchronised.`);
  };

  return (
    <div className="flex flex-col gap-7">
      
      {/* Gamified Rank card & Achievements row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-7">
        
        {/* Gamified Rank and Badge */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl flex gap-5 items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20 flex items-center justify-center text-4xl shrink-0">
            🥇
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-955">Platinum Sales Agent</h3>
            <p className="text-xs text-slate-500 mt-1">Rank status is active. 3,800 XP remaining to unlock Jevxo Executive level.</p>
          </div>
        </div>

        {/* Achievements Unlocked List */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Achievement Badges Unlocked</h3>
          <div className="flex gap-2 flex-wrap">
            {["🥉 Bronze", "🥈 Silver", "🥇 Gold", "💎 Platinum"].map((badge, index) => (
              <span
                key={index}
                onClick={() => handleBadgeClick(badge)}
                className="p-2 px-4 rounded-lg bg-slate-900/5 hover:bg-slate-900/10 border border-slate-900/5 text-xs font-bold text-slate-700 cursor-pointer transition-all"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Sales Battle Arena */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-900 mb-4">⚔️ Sales Battle Arena (Gamified Ranking)</h3>
        
        <div className="flex flex-col gap-3">
          {salesLeaderboard.map((user) => (
            <div key={user.rank} className="bg-slate-900/5 border border-slate-900/5 p-4 px-5 rounded-xl flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className={`text-base font-extrabold ${user.rank === 1 ? "text-amber-500" : "text-slate-500"}`}>#{user.rank}</span>
                <div>
                  <div className="font-bold text-slate-900 text-xs">{user.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{user.deals} closed deals this month</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-violet-600">{user.xp} XP</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">{user.targetProgress}% target</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
