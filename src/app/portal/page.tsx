"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Handshake, Users, Briefcase, Rocket, Laptop, ArrowLeft, Key } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/lib/redux/slices/apiSlice";
import { setCredentials } from "@/lib/redux/slices/authSlice";

interface RoleItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  username: string;
  badge: string;
}

export default function PortalPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const rolesList: RoleItem[] = [
    { id: "admin", name: "Global Admin", desc: "Command center for regional websites, pricing, and client suspension.", icon: <Shield className="w-6 h-6" />, username: "admin@jevxo.com", badge: "Superuser" },
    { id: "crm", name: "CRM Lead Manager", desc: "Kanban pipeline, auto reminders, and lead scoring dashboard.", icon: <Handshake className="w-6 h-6" />, username: "crm@jevxo.com", badge: "Operations" },
    { id: "hr", name: "HR & Intern Manager", desc: "Employee tracking, check-in log, payroll, and certificates.", icon: <Users className="w-6 h-6" />, username: "hr@jevxo.com", badge: "Management" },
    { id: "partner", name: "Country Partner", desc: "Commission balances, regional stats, and marketing assets.", icon: <Briefcase className="w-6 h-6" />, username: "partner_bd@jevxo.com", badge: "Partner" },
    { id: "sales", name: "Sales Agent Arena", desc: "Target progress bars, badges, and the Sales Battle leaderboard.", icon: <Rocket className="w-6 h-6" />, username: "agent_09@jevxo.com", badge: "Sales Agent" },
    { id: "client", name: "Client & Marketing Hub", desc: "Manage website health, storage, and access the 13 Marketing Hub modules.", icon: <Laptop className="w-6 h-6" />, username: "client_client@jevxo.com", badge: "Business Owner" },
  ];

  const [selectedRole, setSelectedRole] = useState<RoleItem>(rolesList[0]);
  const [password, setPassword] = useState("••••••••");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRoleSelect = (role: RoleItem) => {
    setSelectedRole(role);
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const resolvedPassword = password === "••••••••" || !password ? "password123" : password;

    try {
      const result = await login({
        email: selectedRole.username,
        password: resolvedPassword,
      }).unwrap();

      dispatch(setCredentials({
        token: result.access_token,
        user: { email: selectedRole.username, name: selectedRole.name },
        role: selectedRole.id,
      }));

      router.push(`/dashboard/${selectedRole.id}`);
    } catch (err: any) {
      console.error("Login failed:", err);
      setErrorMsg(err?.data?.message || "Invalid workspace credentials or server offline.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-5 pb-10 relative overflow-hidden text-slate-900">
      {/* Decorative Orbs */}
      <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[400px] h-[400px] -top-[100px] -left-[50px] opacity-40" />
      <div className="rounded-full blur-[80px] pointer-events-none absolute bg-cyan-500/[0.06] w-[350px] h-[350px] -bottom-[100px] -right-[50px] opacity-30" />

      <div className="relative z-10 w-full max-w-[980px]">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 text-sm font-semibold mb-8 hover:text-violet-600 transition-colors duration-200">
          <ArrowLeft className="w-4 h-4" /> Return to Public Site
        </Link>

        <div className="portal-grid grid grid-cols-[1.2fr_1fr] gap-10">
          
          {/* Left Column: Role Selector Info */}
          <div>
            <div className="mb-7">
              <div className="text-[28px] font-extrabold text-slate-900 flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-base font-extrabold text-white">J</div>
                Jevxo Ecosystem
              </div>
              <p className="text-slate-600 text-sm leading-normal">
                Select a workspace role below to explore the corresponding operational panel schema.
              </p>
            </div>

            {/* Roles Grid */}
            <div className="flex flex-col gap-3">
              {rolesList.map((role) => {
                const isActive = selectedRole.id === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role)}
                    className={`text-left w-full p-5 rounded-xl border flex items-center gap-4 cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "border-violet-600/30 bg-violet-600/10 shadow-sm"
                        : "border-slate-200 bg-white hover:bg-slate-100"
                    }`}
                  >
                    <div className={isActive ? "text-violet-600" : "text-slate-400"}>
                      {role.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[15px] font-bold ${isActive ? "text-violet-700" : "text-slate-800"}`}>{role.name}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-violet-600/20 text-violet-700" : "bg-slate-100 text-slate-500"}`}>{role.badge}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-normal">{role.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Portal Login Form */}
          <div className="flex items-center">
            <div className="w-full py-10 px-8 rounded-[20px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-md">
              <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <Key className="w-5 h-5 text-violet-600" /> Portal Authenticator
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-[11px] font-bold text-violet-700 uppercase mb-2 tracking-wider">Workspace Account ID</label>
                  <input
                    type="text"
                    disabled
                    value={selectedRole.username}
                    className="w-full py-3 px-4 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 text-sm cursor-not-allowed"
                  />
                </div>

                <div className="mb-7">
                  <div className="flex justify-between mb-2">
                    <label className="block text-[11px] font-bold text-violet-700 uppercase tracking-wider">Access Pin / Password</label>
                    <span className="text-xs text-slate-400">Auto-filled</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-3 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:border-violet-500/50 outline-none"
                  />
                </div>

                {errorMsg && (
                  <div className="mb-5 text-xs text-red-600 font-semibold bg-red-50 p-3 rounded-lg border border-red-100 leading-normal">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full p-3.5 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-[15px] font-bold border-none shadow-[0_4px_20px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_20px_rgba(124,58,237,0.35)] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  {isLoggingIn ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-solid border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying Node...
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      Enter Workspace Portal {selectedRole.icon}
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-200 text-[11px] text-slate-400 leading-normal">
                🔒 Secure endpoint. Selecting a workspace role automatically provisions a secure session token redirecting you to your Jevxo node.
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .portal-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}
