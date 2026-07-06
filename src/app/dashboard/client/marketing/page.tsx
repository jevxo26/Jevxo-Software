"use client";

import { useState } from "react";

export default function ClientMarketingPage() {
  // Marketing Hub - Sub-panel Active Module
  const [activeMarketingModule, setActiveMarketingModule] = useState("social");

  // Marketing Hub - social scheduler state
  const [socialPost, setSocialPost] = useState({ platform: "Facebook", content: "", date: "" });
  const [scheduledPosts, setScheduledPosts] = useState<Array<{ platform: string; content: string; date: string }>>([
    { platform: "LinkedIn", content: "Excited to announce Jevxo Ecosystem Version 1.0! The ultimate Operating System for ventures.", date: "July 09, 10:00 AM" }
  ]);

  // Marketing Hub - ads manager campaign metrics state
  const [fbAdBudget, setFbAdBudget] = useState(500);

  // Marketing Hub - email / sms broadcast state
  const [broadcastType, setBroadcastType] = useState("WhatsApp");
  const [broadcastTarget, setBroadcastTarget] = useState("All Active Leads");
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Marketing Hub - AI assistant copy state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGeneratedResult, setAiGeneratedResult] = useState<string[]>([]);
  const [aiGenerating, setAiGenerating] = useState(false);

  // Marketing Hub - Assets upload
  const [assetsUploadSuccess, setAssetsUploadSuccess] = useState(false);

  // Handlers
  const handleSchedulePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialPost.content || !socialPost.date) return;
    setScheduledPosts([{ platform: socialPost.platform, content: socialPost.content, date: socialPost.date }, ...scheduledPosts]);
    setSocialPost({ platform: "Facebook", content: "", date: "" });
    alert("Post scheduled successfully!");
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText) return;
    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastSuccess(false);
      setBroadcastText("");
    }, 4000);
  };

  const handleGenerateCopy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt) return;
    setAiGenerating(true);
    setTimeout(() => {
      setAiGeneratedResult([
        `💡 "Struggling with fragmented business tools? Meet Jevxo — the unified Operating System for modern digital ventures." (Hype)`,
        `🚀 "Deploy landing pages, monitor lead scores, and automate staff attendance in 1 click. Start free." (Direct)`,
        `🎯 "Automated SEO toolkits, Facebook ad audits, and drip campaigns inside a single dashboard. Scale today." (Benefits-driven)`
      ]);
      setAiGenerating(false);
    }, 1500);
  };

  const handleAssetUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setAssetsUploadSuccess(true);
    setTimeout(() => setAssetsUploadSuccess(false), 4000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* Marketing Hub Header */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "28px" }}>🚀</span>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800 }}>Jevxo Integrated Marketing Hub</h2>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>13 advanced sub-modules to deploy campaigns, track search engine keyword ranks, and audit automated marketing budgets.</p>
          </div>
        </div>

        {/* Modules Selector Grid */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "24px" }}>
          {[
            { id: "social", label: "1. Social Media Scheduler", icon: "📱" },
            { id: "ads", label: "2. Ads Manager", icon: "📊" },
            { id: "email", label: "3. Email & WhatsApp", icon: "✉️" },
            { id: "seo", label: "4. SEO Toolkit", icon: "🔍" },
            { id: "landing", label: "5. Landing Builder", icon: "📄" },
            { id: "automation", label: "6. Drip Automation", icon: "⚙️" },
            { id: "ai", label: "7. AI Assistant Copywriter", icon: "🧠" },
            { id: "review", label: "8. Reputation Reviews", icon: "⭐" },
            { id: "referral", label: "9. Referrals", icon: "🔗" },
            { id: "budget", label: "10. ROI & Budget", icon: "💰" },
            { id: "asset", label: "11. Asset Library", icon: "📁" },
            { id: "push", label: "12. Push Alerts", icon: "🔔" },
            { id: "scorecard", label: "13. Hub Health Scorecard", icon: "📋" },
          ].map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveMarketingModule(mod.id)}
              style={{
                padding: "8px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: activeMarketingModule === mod.id ? 700 : 500,
                border: "1px solid",
                borderColor: activeMarketingModule === mod.id ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.06)",
                background: activeMarketingModule === mod.id ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.02)",
                color: activeMarketingModule === mod.id ? "#a78bfa" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {mod.icon} {mod.label.split(" ").slice(1).join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Active Sub-module Container */}
      <div className="glass" style={{ background: "rgba(0,0,0,0.15)", borderRadius: "16px", padding: "28px" }}>
        
        {/* Module 1: Social scheduler */}
        {activeMarketingModule === "social" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }} className="hr-grid">
            <div>
              <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>📱 Social Post Scheduler</h4>
              <form onSubmit={handleSchedulePost}>
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Platform Nodes</label>
                  <select
                    value={socialPost.platform}
                    onChange={(e) => setSocialPost({ ...socialPost, platform: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(8,13,26,0.9)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                  >
                    <option value="Facebook">Facebook Page</option>
                    <option value="Instagram">Instagram Business</option>
                    <option value="LinkedIn">LinkedIn Company Profile</option>
                  </select>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Post Caption</label>
                  <textarea
                    rows={3}
                    required
                    value={socialPost.content}
                    onChange={(e) => setSocialPost({ ...socialPost, content: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Scheduled Time</label>
                  <input
                    type="text"
                    placeholder="e.g. July 12, 10:00 AM"
                    required
                    value={socialPost.date}
                    onChange={(e) => setSocialPost({ ...socialPost, date: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                  />
                </div>

                <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "#7c3aed", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Schedule Post Node</button>
              </form>
            </div>

            <div>
              <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>📅 Post Calendar Feed</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {scheduledPosts.map((p, idx) => (
                  <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "14px", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <strong style={{ color: "#06b6d4", fontSize: "12px" }}>{p.platform}</strong>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>⏰ {p.date}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{p.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Module 2: Ads manager */}
        {activeMarketingModule === "ads" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>📊 Connected Accounts & Campaign CTR</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>Connected Accounts: <strong>Meta Ads Node</strong>, <strong>Google Ads Node</strong></p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "28px" }} className="dashboard-kpis">
              <div className="glass" style={{ padding: "20px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Total Monthly Spend</div>
                <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px" }}>${fbAdBudget} / $2,000 limit</div>
              </div>
              <div className="glass" style={{ padding: "20px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Average Campaign CTR</div>
                <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px", color: "#10b981" }}>4.82%</div>
              </div>
              <div className="glass" style={{ padding: "20px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Estimated ROAS</div>
                <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px", color: "#06b6d4" }}>3.8x Return</div>
              </div>
            </div>

            <div className="glass" style={{ padding: "20px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h5 style={{ fontSize: "13px", fontWeight: 700, marginBottom: "12px" }}>Meta Budget Allocation (Adjust Allocation)</h5>
              <input
                type="range"
                min="100"
                max="2000"
                value={fbAdBudget}
                onChange={(e) => setFbAdBudget(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#7c3aed", background: "rgba(255,255,255,0.06)", height: "6px", borderRadius: "3px", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-secondary)", marginTop: "8px" }}>
                <span>Min: $100</span>
                <span>Allocated Limit: ${fbAdBudget}</span>
                <span>Max: $2,000</span>
              </div>
            </div>
          </div>
        )}

        {/* Module 3: Email / SMS WhatsApp broadcast */}
        {activeMarketingModule === "email" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>✉️ Email & WhatsApp Broadcast Console</h4>
            
            <form onSubmit={handleSendBroadcast} style={{ maxWidth: "580px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Broadcast Channel</label>
                  <select
                    value={broadcastType}
                    onChange={(e) => setBroadcastType(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(8,13,26,0.9)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                  >
                    <option value="WhatsApp">WhatsApp Business API</option>
                    <option value="SMS">SMS Gateway Center</option>
                    <option value="Email">Email SMTP Node</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Target Audience Segment</label>
                  <select
                    value={broadcastTarget}
                    onChange={(e) => setBroadcastTarget(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(8,13,26,0.9)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                  >
                    <option value="All Active Leads">All Active Leads (80 contacts)</option>
                    <option value="Won Customers">Won Customers (42 contacts)</option>
                    <option value="E-commerce Subscribers">Newsletter Subscriptions (140 contacts)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Broadcast Text Message</label>
                <textarea
                  rows={3}
                  placeholder="Type campaign message details..."
                  required
                  value={broadcastText}
                  onChange={(e) => setBroadcastText(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                />
              </div>

              <button type="submit" style={{ padding: "10px 24px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>
                Transmit Broadcast Node
              </button>
            </form>

            {broadcastSuccess && (
              <div style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", padding: "14px", borderRadius: "6px", marginTop: "16px", fontSize: "13px" }}>
                ✓ Broadcast request transmitted! Outbound queue logging completed.
              </div>
            )}
          </div>
        )}

        {/* Module 4: SEO Toolkit */}
        {activeMarketingModule === "seo" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>🔍 SEO Keyword Rank Tracker</h4>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "24px" }} className="dashboard-kpis">
              <div className="glass" style={{ padding: "16px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Target Keyword</div>
                <strong style={{ display: "block", fontSize: "15px", color: "#fff", marginTop: "4px" }}>"software company bd"</strong>
                <span style={{ fontSize: "11px", color: "#10b981", display: "block", marginTop: "4px" }}>Rank Position: #2 (HQ Node)</span>
              </div>
              <div className="glass" style={{ padding: "16px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Target Keyword</div>
                <strong style={{ display: "block", fontSize: "15px", color: "#fff", marginTop: "4px" }}>"nextjs web developer london"</strong>
                <span style={{ fontSize: "11px", color: "#10b981", display: "block", marginTop: "4px" }}>Rank Position: #5 (+2 ranks)</span>
              </div>
              <div className="glass" style={{ padding: "16px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Target Keyword</div>
                <strong style={{ display: "block", fontSize: "15px", color: "#fff", marginTop: "4px" }}>"crm software systems dhaka"</strong>
                <span style={{ fontSize: "11px", color: "#f59e0b", display: "block", marginTop: "4px" }}>Rank Position: #8 (Stabilised)</span>
              </div>
            </div>

            <div className="glass" style={{ padding: "20px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h5 style={{ fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>On-Page SEO Checklist (Active Audits)</h5>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "var(--text-secondary)", padding: 0 }}>
                <li>✓ H1 tag unique check: passed</li>
                <li>✓ Image alt tags missing: 2 flags detected (recommended fix)</li>
                <li>✓ Canonical URL tag validated: passed</li>
              </ul>
            </div>
          </div>
        )}

        {/* Module 5: Landing builder */}
        {activeMarketingModule === "landing" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>📄 Pre-made Landing Page Templates</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="dashboard-kpis">
              {[
                { name: "SaaS Product Showcase", type: "Funnels Grid" },
                { name: "E-book Subscription Catch", type: "Lead Magnet Template" },
                { name: "Consulting Booking Portal", type: "Lead Generation Layout" },
              ].map((temp, index) => (
                <div key={index} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: "36px" }}>📄</div>
                  <h5 style={{ fontSize: "13px", fontWeight: 700, marginTop: "12px", color: "#fff" }}>{temp.name}</h5>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginTop: "4px" }}>{temp.type}</span>
                  <button onClick={() => alert(`Creating new site layout branch for: ${temp.name}`)} style={{ width: "100%", marginTop: "16px", padding: "8px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", fontSize: "11px", fontWeight: 700, borderRadius: "4px", cursor: "pointer" }}>Deploy Branch</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module 6: Drip automation */}
        {activeMarketingModule === "automation" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>⚙️ Visual Drip Workflow Preview</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>Visual representations of trigger workflows:</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "12px", background: "#7c3aed", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>TRIGGER</span>
                <span style={{ fontSize: "13px", fontWeight: 600 }}>User signs up on Lead Capture Form</span>
                <span style={{ color: "var(--text-muted)" }}>➔</span>
                <span style={{ fontSize: "12px", background: "#06b6d4", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>ACTION</span>
                <span style={{ fontSize: "13px" }}>Send welcome template email instantly</span>
              </div>
              <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "12px", background: "#7c3aed", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>DELAY</span>
                <span style={{ fontSize: "13px", fontWeight: 600 }}>Wait 48 hours</span>
                <span style={{ color: "var(--text-muted)" }}>➔</span>
                <span style={{ fontSize: "12px", background: "#06b6d4", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>ACTION</span>
                <span style={{ fontSize: "13px" }}>Send special discount code WhatsApp alert</span>
              </div>
            </div>
          </div>
        )}

        {/* Module 7: AI assistant copy */}
        {activeMarketingModule === "ai" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>🧠 AI Ad Copy & Caption Generator</h4>
            <form onSubmit={handleGenerateCopy} style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Type product topic, e.g. 'Restaurant POS System'..."
                required
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                style={{ flex: 1, padding: "10px 14px", borderRadius: "6px", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", color: "#fff", fontSize: "13px" }}
              />
              <button type="submit" disabled={aiGenerating} style={{ padding: "10px 20px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>
                {aiGenerating ? "Generating..." : "Generate Copys"}
              </button>
            </form>

            {aiGeneratedResult.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)" }}>GENERATED CAPTIONS</div>
                {aiGeneratedResult.map((text, idx) => (
                  <div key={idx} style={{ background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "6px", fontSize: "13px", lineHeight: 1.5, borderLeft: "3px solid #7c3aed" }}>
                    {text}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Module 8: Reviews manager */}
        {activeMarketingModule === "review" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>⭐ Combined Review Feed & Sentiment Score</h4>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "28px" }} className="hr-grid">
              <div className="glass" style={{ padding: "20px", borderRadius: "10px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "36px" }}>⭐ 4.8</div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "8px" }}>Sentiment Score: <strong>88% Positive</strong></div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "14px", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <strong style={{ fontSize: "12px" }}>Google Review (Rahim)</strong>
                    <span style={{ fontSize: "11px", color: "#f59e0b" }}>⭐⭐⭐⭐⭐</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>"The website layout speed has increased drastically since migrating to Jevxo Dedicated node."</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module 9: Referrals */}
        {activeMarketingModule === "referral" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>🔗 Client Referral Links</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>Share link with businesses. Earn commission credits on subscription renewals.</p>
            
            <div style={{ display: "flex", gap: "12px" }}>
              <input
                type="text"
                readOnly
                value="https://jevxo.com/ref?id=JEVXO-BD-000001"
                style={{ flex: 1, padding: "10px 14px", borderRadius: "6px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "var(--text-secondary)", fontSize: "13px" }}
              />
              <button onClick={() => {
                navigator.clipboard.writeText("https://jevxo.com/ref?id=JEVXO-BD-000001");
                alert("Referral URL copied to clipboard.");
              }} style={{ padding: "10px 20px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "#a78bfa", fontWeight: 700, cursor: "pointer" }}>Copy Link</button>
            </div>
          </div>
        )}

        {/* Module 10: ROI & Budget */}
        {activeMarketingModule === "budget" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>💰 Spend vs Revenue ROI Tracker</h4>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="dashboard-kpis">
              <div className="glass" style={{ padding: "20px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Total Outbound Budget</div>
                <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px" }}>$1,500.00</div>
              </div>
              <div className="glass" style={{ padding: "20px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Revenue Generated</div>
                <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px", color: "#10b981" }}>$6,420.00</div>
              </div>
              <div className="glass" style={{ padding: "20px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Net Marketing ROI</div>
                <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px", color: "#06b6d4" }}>328% ROI</div>
              </div>
            </div>
          </div>
        )}

        {/* Module 11: Asset library */}
        {activeMarketingModule === "asset" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>📁 Brand Asset Library Upload</h4>
            
            <form onSubmit={handleAssetUpload} style={{ border: "2px dashed var(--border)", borderRadius: "8px", padding: "30px", textAlign: "center", background: "rgba(255,255,255,0.01)" }}>
              <div style={{ fontSize: "36px" }}>📁</div>
              <h5 style={{ fontSize: "14px", fontWeight: 700, marginTop: "12px", color: "#f1f5f9" }}>Drag and drop files here</h5>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>Support format png, jpg, pdf. Max limit 10MB.</p>
              
              <button type="submit" style={{ marginTop: "16px", padding: "8px 20px", background: "#7c3aed", border: "none", color: "#fff", fontSize: "12px", fontWeight: 700, borderRadius: "6px", cursor: "pointer" }}>Upload Demo Asset</button>
            </form>

            {assetsUploadSuccess && (
              <div style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", padding: "14px", borderRadius: "6px", marginTop: "16px", fontSize: "13px" }}>
                ✓ File processed successfully! Registered in cloud node index folder.
              </div>
            )}
          </div>
        )}

        {/* Module 12: Push alerts */}
        {activeMarketingModule === "push" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>🔔 Push Notification Sender</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>Broadcast immediate alerts to subscribers&apos; browser notifications.</p>
            
            <button onClick={() => alert("Simulated push notifications transmitted to browser queue.")} style={{ padding: "12px 24px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Broadcast Alert</button>
          </div>
        )}

        {/* Module 13: Scorecard */}
        {activeMarketingModule === "scorecard" && (
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>📋 AI Marketing Health Index</h4>
            
            <div className="glass" style={{ padding: "24px", borderRadius: "10px", borderLeft: "4px solid #10b981", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 700 }}>Overall Scorecard: Excellent</span>
                <strong style={{ fontSize: "20px", color: "#10b981" }}>94 / 100</strong>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "10px", lineHeight: 1.5 }}>
                Your conversion optimization, website speed score, and email open rate are matching target benchmarks. We recommend targeting search queries containing "nextjs developers" to capture current US trends.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
