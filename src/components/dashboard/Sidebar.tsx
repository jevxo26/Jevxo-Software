"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  Users,
  Monitor,
  DollarSign,
  Ticket,
  Settings,
  Handshake,
  FolderHeart,
  TrendingUp,
  Calendar,
  Coins,
  GraduationCap,
  Briefcase,
  Folder,
  Target,
  Trophy,
  LayoutDashboard,
  Receipt,
  Globe,
  Rocket,
  MessageSquare
} from "lucide-react";

interface SidebarProps {
  activeRole: string;
  pathname: string;
  onRoleChange: (role: string) => void;
}

const navLinks: Record<string, Array<{ label: string; href: string; icon: React.ComponentType<{ size?: number; className?: string }> }>> = {
  admin: [
    { label: "Command Overview", href: "/dashboard/admin", icon: BarChart3 },
    { label: "Client Database", href: "/dashboard/admin/clients", icon: Users },
    { label: "Hosting Metrics", href: "/dashboard/admin/hosting", icon: Monitor },
    { label: "Revenue Center", href: "/dashboard/admin/revenue", icon: DollarSign },
    { label: "Support Tickets", href: "/dashboard/admin/support", icon: Ticket },
    { label: "Ecosystem CMS", href: "/dashboard/admin/cms", icon: Settings },
  ],
  crm: [
    { label: "Leads Kanban", href: "/dashboard/crm", icon: Handshake },
    { label: "Customer Records", href: "/dashboard/crm/customers", icon: FolderHeart },
    { label: "Sales Reports", href: "/dashboard/crm/reports", icon: TrendingUp },
  ],
  hr: [
    { label: "Attendance Console", href: "/dashboard/hr", icon: Users },
    { label: "Leave Requests", href: "/dashboard/hr/leaves", icon: Calendar },
    { label: "Payroll System", href: "/dashboard/hr/payroll", icon: Coins },
    { label: "Internship Tracker", href: "/dashboard/hr/interns", icon: GraduationCap },
  ],
  partner: [
    { label: "Earnings Wallet", href: "/dashboard/partner", icon: Briefcase },
    { label: "Marketing Kit", href: "/dashboard/partner/marketing", icon: Folder },
  ],
  sales: [
    { label: "Daily Targets", href: "/dashboard/sales", icon: Target },
    { label: "Battle Arena", href: "/dashboard/sales/leaderboard", icon: Trophy },
  ],
  client: [
    { label: "Client Dashboard", href: "/dashboard/client", icon: LayoutDashboard },
    { label: "Billing & Invoices", href: "/dashboard/client/billing", icon: Receipt },
    { label: "Domain & Hosting", href: "/dashboard/client/domain", icon: Globe },
    { label: "Web Performance", href: "/dashboard/client/performance", icon: BarChart3 },
    { label: "Marketing Hub", href: "/dashboard/client/marketing", icon: Rocket },
  ],
};

export default function Sidebar({ activeRole, pathname, onRoleChange }: SidebarProps) {
  const [avatarEmoji, setAvatarEmoji] = useState("👨‍💻");
  const [profileName, setProfileName] = useState("Farhan Aftab");

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_user_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.avatarEmoji) setAvatarEmoji(parsed.avatarEmoji);
        if (parsed.name) setProfileName(parsed.name);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const currentRoleLinks = navLinks[activeRole] || [];

  return (
    <aside className="w-[280px] border-r border-slate-900/10 bg-white/95 flex flex-col shrink-0 h-screen sticky top-0">
      
      {/* Brand Header */}
      <div className="px-7 py-6 border-b border-slate-900/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="Jevxo Logo" className="w-[30px] h-[30px]" />
          <span className="text-lg font-bold text-slate-900">
            Jev<span className="text-violet-600">xo</span>
          </span>
        </Link>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-violet-600/30 bg-violet-600/10 text-violet-600">
          v1.0
        </span>
      </div>

      {/* Role Selector */}
      <div className="p-5">
        <label className="block text-[10px] font-bold text-violet-600 uppercase mb-2 tracking-wider">Active Panel Portal</label>
        <select
          value={activeRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-violet-600/30 bg-slate-900/5 text-violet-600 text-sm font-semibold cursor-pointer outline-none transition-all focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
        >
          <option value="admin">🛡️ Global Admin</option>
          <option value="crm">🤝 CRM Manager</option>
          <option value="hr">👥 HR & Intern Manager</option>
          <option value="partner">💼 Country Partner</option>
          <option value="sales">🚀 Sales Agent Arena</option>
          <option value="client">💻 Client Dashboard</option>
        </select>
      </div>

      {/* Role-specific Navigation Links */}
      <nav className="flex-1 px-4 py-2.5 flex flex-col gap-1.5 overflow-y-auto">
        <div className="px-3 py-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
          Navigation Links
        </div>
        {currentRoleLinks.map((link) => {
          const isLinkActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isLinkActive
                  ? "bg-violet-600/10 text-violet-600 border border-violet-600/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 border border-transparent"
              }`}
            >
              <Icon size={16} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* System & Support Core Links */}
      <nav className="px-4 py-2.5 pb-5 border-t border-slate-900/10 flex flex-col gap-1.5">
        <div className="px-3 py-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
          Ecosystem Core
        </div>
        {[
          { label: "Profile & Settings", href: "/dashboard/settings", icon: Settings },
          { label: "Help & Live Chat", href: "/dashboard/support", icon: MessageSquare },
        ].map((link) => {
          const isLinkActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isLinkActive
                  ? "bg-violet-600/10 text-violet-600 border border-violet-600/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-900/5 border border-transparent"
              }`}
            >
              <Icon size={16} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer User Details */}
      <div className="px-6 py-5 border-t border-slate-900/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-violet-600/10 flex items-center justify-center text-lg">
          {avatarEmoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-xs text-slate-900 truncate">
            {profileName}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">jevxo_host_asia_01</div>
        </div>
      </div>

    </aside>
  );
}
