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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    marginTop: "6px",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: "pointer",
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 800 }}>Profile & System Settings</h2>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
          Manage your Jevxo node profile settings, account security preferences, and dashboard interface options.
        </p>
      </div>

      {saveStatus === "saved" && (
        <div className="glass" style={{ padding: "12px 18px", borderRadius: "8px", background: "rgba(16,185,129,0.15)", border: "1px solid #10b981", color: "#10b981", fontSize: "13px", fontWeight: 600, marginBottom: "24px" }}>
          ✓ Profile settings saved and applied to your current active session!
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px", marginBottom: "32px" }}>
        {(["profile", "security", "preferences"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              background: activeTab === tab ? "rgba(124,58,237,0.15)" : "transparent",
              color: activeTab === tab ? "#a78bfa" : "var(--text-secondary)",
              fontWeight: activeTab === tab ? 700 : 500,
              cursor: "pointer",
              textTransform: "capitalize",
              fontSize: "13px",
            }}
          >
            {tab === "profile" && "👤 Profile Details"}
            {tab === "security" && "🔒 Account Security"}
            {tab === "preferences" && "⚙️ System Preferences"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="glass" style={{ padding: "32px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
        
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
                {profile.avatarEmoji}
              </div>
              <div>
                <h4 style={{ fontSize: "16px", fontWeight: 700 }}>Profile Avatar</h4>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  {["👨‍💻", "👩‍💻", "👑", "🚀", "⚡", "🤖"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setProfile({ ...profile, avatarEmoji: emoji })}
                      style={{
                        padding: "6px 10px",
                        fontSize: "18px",
                        border: "1px solid",
                        borderColor: profile.avatarEmoji === emoji ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)",
                        background: profile.avatarEmoji === emoji ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.02)",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>System Language</label>
                <select
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                  style={selectStyle}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>Two-Factor Authentication (2FA)</h4>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
                Add an extra layer of security to your account by requiring a code from an authenticator app.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <input
                  type="checkbox"
                  id="twoFactor"
                  checked={profile.twoFactor}
                  onChange={(e) => setProfile({ ...profile, twoFactor: e.target.checked })}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
                <label htmlFor="twoFactor" style={{ fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                  Enable authenticator verification codes on login
                </label>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px" }}>
              <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Change Account Password</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>Current Password</label>
                  <input type="password" placeholder="••••••••" style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>New Password</label>
                  <input type="password" placeholder="••••••••" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === "preferences" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>Preferred Theme Mode</label>
                <select
                  value={profile.theme}
                  onChange={(e) => setProfile({ ...profile, theme: e.target.value })}
                  style={selectStyle}
                >
                  <option value="Dark Purple Glass">Dark Purple Glass (Default)</option>
                  <option value="Cyberpunk Teal">Cyberpunk Teal</option>
                  <option value="AMOLED Pitch Black">AMOLED Pitch Black</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>System Layout Density</label>
                <select
                  value={profile.density}
                  onChange={(e) => setProfile({ ...profile, density: e.target.value as any })}
                  style={selectStyle}
                >
                  <option value="comfortable">Comfortable Grid (Normal)</option>
                  <option value="compact">Compact Grid (Data-heavy)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>Active Timezone</label>
              <select
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                style={selectStyle}
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
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px" }}>
          <button
            type="submit"
            style={{
              padding: "12px 28px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              border: "none",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(124,58,237,0.2)",
            }}
          >
            Apply Changes
          </button>
        </div>

      </form>
    </div>
  );
}
