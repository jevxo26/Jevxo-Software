"use client";

import { useState, useEffect } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  timezone: string;
  language: string;
  avatarEmoji: string;
  twoFactor: boolean;
  theme: string;
  density: "comfortable" | "compact";
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Farhan Aftab",
    email: "farhan@jevxo.com",
    phone: "+880 1712 345678",
    timezone: "UTC+6 (Asia/Dhaka)",
    language: "English (US)",
    avatarEmoji: "👨‍💻",
    twoFactor: true,
    theme: "Dark Purple Glass",
    density: "comfortable",
  });

  const [activeTab, setActiveTab] = useState<"profile" | "security" | "preferences">("profile");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_user_profile");
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("jevxo_user_profile", JSON.stringify(profile));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-xl font-extrabold text-slate-900 mb-1">Profile & System Settings</h2>
        <p className="text-xs text-slate-500">
          Manage your Jevxo node profile settings, account security preferences, and dashboard interface options.
        </p>
      </div>

      {saveStatus === "saved" && (
        <div className="p-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold mb-6">
          ✓ Profile settings saved and applied to your current active session!
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-900/10 pb-3 mb-8">
        {(["profile", "security", "preferences"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 rounded-lg text-xs font-semibold border transition-all cursor-pointer capitalize ${
              activeTab === tab
                ? "border-violet-600/30 bg-violet-600/10 text-violet-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab === "profile" && "👤 Profile Details"}
            {tab === "security" && "🔒 Account Security"}
            {tab === "preferences" && "⚙️ System Preferences"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-8 rounded-2xl">
        
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5 pb-5 border-b border-slate-900/10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center text-3xl">
                {profile.avatarEmoji}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Profile Avatar</h4>
                <div className="flex gap-2 mt-2">
                  {["👨‍💻", "👩‍💻", "👑", "🚀", "⚡", "🤖"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setProfile({ ...profile, avatarEmoji: emoji })}
                      className={`p-1.5 px-2.5 text-lg border rounded-lg cursor-pointer transition-all ${
                        profile.avatarEmoji === emoji
                          ? "border-violet-600/30 bg-violet-600/10"
                          : "border-slate-900/[0.08] bg-slate-900/5 hover:bg-slate-900/10"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full p-2.5 px-4 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full p-2.5 px-4 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full p-2.5 px-4 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">System Language</label>
                <select
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                  className="w-full p-2.5 px-4 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="English (UK)">English (UK)</option>
                  <option value="Bengali">Bengali (বাংলা)</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Two-Factor Authentication (2FA)</h4>
              <p className="text-xs text-slate-500 mb-4">
                Add an extra layer of security to your account by requiring a code from an authenticator app.
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="twoFactor"
                  checked={profile.twoFactor}
                  onChange={(e) => setProfile({ ...profile, twoFactor: e.target.checked })}
                  className="w-5 h-5 cursor-pointer rounded border-slate-900/[0.08] text-violet-600 focus:ring-violet-600"
                />
                <label htmlFor="twoFactor" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Enable authenticator verification codes on login
                </label>
              </div>
            </div>

            <div className="border-t border-slate-900/10 pt-6">
              <h4 className="text-sm font-bold text-slate-900 mb-4">Change Account Password</h4>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-2.5 px-4 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full p-2.5 px-4 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === "preferences" && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Preferred Theme Mode</label>
                <select
                  value={profile.theme}
                  onChange={(e) => setProfile({ ...profile, theme: e.target.value })}
                  className="w-full p-2.5 px-4 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
                >
                  <option value="Dark Purple Glass">Dark Purple Glass (Default)</option>
                  <option value="Cyberpunk Teal">Cyberpunk Teal</option>
                  <option value="AMOLED Pitch Black">AMOLED Pitch Black</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">System Layout Density</label>
                <select
                  value={profile.density}
                  onChange={(e) => setProfile({ ...profile, density: e.target.value as any })}
                  className="w-full p-2.5 px-4 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
                >
                  <option value="comfortable">Comfortable Grid (Normal)</option>
                  <option value="compact">Compact Grid (Data-heavy)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Active Timezone</label>
              <select
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                className="w-full p-2.5 px-4 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
              >
                <option value="UTC+6 (Asia/Dhaka)">UTC+6 (Asia/Dhaka)</option>
                <option value="UTC+0 (Europe/London)">UTC+0 (Europe/London)</option>
                <option value="UTC-5 (America/New_York)">UTC-5 (America/New_York)</option>
                <option value="UTC+4 (Asia/Dubai)">UTC+4 (Asia/Dubai)</option>
                <option value="UTC+8 (Asia/Singapore)">UTC+8 (Asia/Singapore)</option>
              </select>
            </div>
          </div>
        )}

        {/* Form Action */}
        <div className="flex justify-end mt-8 border-t border-slate-900/10 pt-6">
          <button
            type="submit"
            className="py-2.5 px-6 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Apply Changes
          </button>
        </div>

      </form>
    </div>
  );
}
