"use client";

import Link from "next/link";
import { Shield, Handshake, Users, Briefcase, TrendingUp, Laptop, Network } from "lucide-react";

interface TopnavProps {
  activeRole: string;
}

export default function Topnav({ activeRole }: TopnavProps) {
  const getRoleInfo = (role: string) => {
    switch (role) {
      case "admin": return { title: "Global Admin Dashboard", icon: Shield };
      case "crm": return { title: "CRM Workflow Management", icon: Handshake };
      case "hr": return { title: "HR & Intern Core", icon: Users };
      case "partner": return { title: "Regional Partner Center", icon: Briefcase };
      case "sales": return { title: "Sales Battle Arena", icon: TrendingUp };
      case "client": return { title: "Client Control Center", icon: Laptop };
      default: return { title: "Jevxo Node Console", icon: Network };
    }
  };

  const info = getRoleInfo(activeRole);
  const Icon = info.icon;

  return (
    <header className="h-[72px] border-b border-slate-900/10 flex items-center justify-between px-10 bg-white/50 backdrop-blur-md shrink-0">
      
      {/* Title */}
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-violet-600" />
        <h1 className="text-lg font-bold text-slate-900">
          {info.title}
        </h1>
      </div>

      {/* Action / Sessions */}
      <div className="flex items-center gap-6">
        
        {/* Live Active Session Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_#10b981]" />
          <span className="text-xs text-slate-600 font-semibold">Active Session</span>
        </div>
        
        <Link href="/" className="text-xs px-3.5 py-1.5 rounded-md border border-slate-900/10 bg-slate-900/5 font-semibold text-slate-900 hover:bg-slate-900/10 transition-colors">
          Leave Portal
        </Link>
      </div>

    </header>
  );
}
