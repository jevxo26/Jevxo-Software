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
    <div className="flex flex-col gap-7">
      
      {/* Marketing Hub Header */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚀</span>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Jevxo Integrated Marketing Hub</h2>
            <p className="text-xs text-slate-500 mt-1">13 advanced sub-modules to deploy campaigns, track search engine keyword ranks, and audit automated marketing budgets.</p>
          </div>
        </div>

        {/* Modules Selector Grid */}
        <div className="flex gap-2 flex-wrap mt-6">
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
              className={`py-2 px-3.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                activeMarketingModule === mod.id
                  ? "border-violet-600/30 bg-violet-600/10 text-violet-600"
                  : "border-slate-900/[0.08] bg-slate-900/5 text-slate-500 hover:bg-slate-900/10"
              }`}
            >
              {mod.icon} {mod.label.split(" ").slice(1).join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Active Sub-module Container */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] p-7 rounded-2xl">
        
        {/* Module 1: Social scheduler */}
        {activeMarketingModule === "social" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-7">
            <div>
              <h4 className="text-[15px] font-bold text-slate-900 mb-4">📱 Social Post Scheduler</h4>
              <form onSubmit={handleSchedulePost} className="space-y-4">
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Platform Nodes</label>
                  <select
                    value={socialPost.platform}
                    onChange={(e) => setSocialPost({ ...socialPost, platform: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                  >
                    <option value="Facebook">Facebook Page</option>
                    <option value="Instagram">Instagram Business</option>
                    <option value="LinkedIn">LinkedIn Company Profile</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Post Caption</label>
                  <textarea
                    rows={3}
                    required
                    value={socialPost.content}
                    onChange={(e) => setSocialPost({ ...socialPost, content: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Scheduled Time</label>
                  <input
                    type="text"
                    placeholder="e.g. July 12, 10:00 AM"
                    required
                    value={socialPost.date}
                    onChange={(e) => setSocialPost({ ...socialPost, date: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
                  />
                </div>

                <button type="submit" className="w-full py-2.5 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer">Schedule Post Node</button>
              </form>
            </div>

            <div>
              <h4 className="text-[15px] font-bold text-slate-900 mb-4">📅 Post Calendar Feed</h4>
              <div className="flex flex-col gap-3">
                {scheduledPosts.map((p, idx) => (
                  <div key={idx} className="bg-slate-900/5 border border-slate-900/5 p-4 rounded-xl">
                    <div className="flex justify-between mb-1.5">
                      <strong className="text-cyan-600 text-xs">{p.platform}</strong>
                      <span className="text-[11px] text-slate-400">⏰ {p.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Module 2: Ads manager */}
        {activeMarketingModule === "ads" && (
          <div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">📊 Connected Accounts & Campaign CTR</h4>
            <p className="text-sm text-slate-600 mb-5">Connected Accounts: <strong className="text-slate-800">Meta Ads Node</strong>, <strong className="text-slate-800">Google Ads Node</strong></p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
              <div className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl">
                <div className="text-xs text-slate-500 font-medium">Total Monthly Spend</div>
                <div className="text-xl font-extrabold mt-1 text-slate-900">${fbAdBudget} / $2,000 limit</div>
              </div>
              <div className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl">
                <div className="text-xs text-slate-500 font-medium">Average Campaign CTR</div>
                <div className="text-xl font-extrabold mt-1 text-emerald-600">4.82%</div>
              </div>
              <div className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl">
                <div className="text-xs text-slate-500 font-medium">Estimated ROAS</div>
                <div className="text-xl font-extrabold mt-1 text-cyan-600">3.8x Return</div>
              </div>
            </div>

            <div className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl">
              <h5 className="text-xs font-bold text-slate-900 mb-3">Meta Budget Allocation (Adjust Allocation)</h5>
              <input
                type="range"
                min="100"
                max="2000"
                value={fbAdBudget}
                onChange={(e) => setFbAdBudget(Number(e.target.value))}
                className="w-full accent-violet-600 h-1.5 bg-slate-900/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2">
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
            <h4 className="text-[15px] font-bold text-slate-900 mb-4">✉️ Email & WhatsApp Broadcast Console</h4>
            
            <form onSubmit={handleSendBroadcast} className="max-w-2xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Broadcast Channel</label>
                  <select
                    value={broadcastType}
                    onChange={(e) => setBroadcastType(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                  >
                    <option value="WhatsApp">WhatsApp Business API</option>
                    <option value="SMS">SMS Gateway Center</option>
                    <option value="Email">Email SMTP Node</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Target Audience Segment</label>
                  <select
                    value={broadcastTarget}
                    onChange={(e) => setBroadcastTarget(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
                  >
                    <option value="All Active Leads">All Active Leads (80 contacts)</option>
                    <option value="Won Customers">Won Customers (42 contacts)</option>
                    <option value="E-commerce Subscribers">Newsletter Subscriptions (140 contacts)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Broadcast Text Message</label>
                <textarea
                  rows={3}
                  placeholder="Type campaign message details..."
                  required
                  value={broadcastText}
                  onChange={(e) => setBroadcastText(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
                />
              </div>

              <button type="submit" className="py-2.5 px-5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer">
                Transmit Broadcast Node
              </button>
            </form>

            {broadcastSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 p-4 rounded-xl mt-4 text-xs font-medium">
                ✓ Broadcast request transmitted! Outbound queue logging completed.
              </div>
            )}
          </div>
        )}

        {/* Module 4: SEO Toolkit */}
        {activeMarketingModule === "seo" && (
          <div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-4">🔍 SEO Keyword Rank Tracker</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              <div className="bg-slate-900/5 border border-slate-900/5 p-4 rounded-xl">
                <div className="text-xs text-slate-400 font-medium">Target Keyword</div>
                <strong className="block text-sm font-bold text-slate-800 mt-1">"software company bd"</strong>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Rank Position: #2 (HQ Node)</span>
              </div>
              <div className="bg-slate-900/5 border border-slate-900/5 p-4 rounded-xl">
                <div className="text-xs text-slate-400 font-medium">Target Keyword</div>
                <strong className="block text-sm font-bold text-slate-800 mt-1">"nextjs web developer london"</strong>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Rank Position: #5 (+2 ranks)</span>
              </div>
              <div className="bg-slate-900/5 border border-slate-900/5 p-4 rounded-xl">
                <div className="text-xs text-slate-400 font-medium">Target Keyword</div>
                <strong className="block text-sm font-bold text-slate-800 mt-1">"crm software systems dhaka"</strong>
                <span className="text-[11px] text-amber-600 font-semibold block mt-1">Rank Position: #8 (Stabilised)</span>
              </div>
            </div>

            <div className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl">
              <h5 className="text-xs font-bold text-slate-900 mb-3">On-Page SEO Checklist (Active Audits)</h5>
              <ul className="flex flex-col gap-2 text-xs text-slate-600">
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
            <h4 className="text-[15px] font-bold text-slate-900 mb-4">📄 Pre-made Landing Page Templates</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: "SaaS Product Showcase", type: "Funnels Grid" },
                { name: "E-book Subscription Catch", type: "Lead Magnet Template" },
                { name: "Consulting Booking Portal", type: "Lead Generation Layout" },
              ].map((temp, index) => (
                <div key={index} className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl text-center">
                  <div className="text-3xl">📄</div>
                  <h5 className="text-sm font-bold text-slate-800 mt-3">{temp.name}</h5>
                  <span className="text-[11px] text-slate-500 block mt-1">{temp.type}</span>
                  <button onClick={() => alert(`Creating new site layout branch for: ${temp.name}`)} className="w-full mt-4 py-2 px-3 rounded bg-violet-600/10 border border-violet-600/20 text-violet-600 text-xs font-semibold hover:bg-violet-600/20 transition-all cursor-pointer">Deploy Branch</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Module 6: Drip automation */}
        {activeMarketingModule === "automation" && (
          <div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">⚙️ Visual Drip Workflow Preview</h4>
            <p className="text-sm text-slate-600 mb-5">Visual representations of trigger workflows:</p>
            
            <div className="flex flex-col gap-3">
              <div className="p-4 px-5 bg-slate-900/5 border border-slate-900/5 rounded-xl flex items-center gap-4 flex-wrap text-sm">
                <span className="text-xs bg-violet-600 text-white font-bold py-0.5 px-2 rounded">TRIGGER</span>
                <span className="font-semibold text-slate-700">User signs up on Lead Capture Form</span>
                <span className="text-slate-400">➔</span>
                <span className="text-xs bg-cyan-600 text-white font-bold py-0.5 px-2 rounded">ACTION</span>
                <span className="text-slate-600">Send welcome template email instantly</span>
              </div>
              <div className="p-4 px-5 bg-slate-900/5 border border-slate-900/5 rounded-xl flex items-center gap-4 flex-wrap text-sm">
                <span className="text-xs bg-violet-600 text-white font-bold py-0.5 px-2 rounded">DELAY</span>
                <span className="font-semibold text-slate-700">Wait 48 hours</span>
                <span className="text-slate-400">➔</span>
                <span className="text-xs bg-cyan-600 text-white font-bold py-0.5 px-2 rounded">ACTION</span>
                <span className="text-slate-600">Send special discount code WhatsApp alert</span>
              </div>
            </div>
          </div>
        )}

        {/* Module 7: AI assistant copy */}
        {activeMarketingModule === "ai" && (
          <div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-4">🧠 AI Ad Copy & Caption Generator</h4>
            <form onSubmit={handleGenerateCopy} className="flex gap-3 mb-5 flex-wrap">
              <input
                type="text"
                placeholder="Type product topic, e.g. 'Restaurant POS System'..."
                required
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 min-w-[200px] p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
              />
              <button type="submit" disabled={aiGenerating} className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer">
                {aiGenerating ? "Generating..." : "Generate Copys"}
              </button>
            </form>

            {aiGeneratedResult.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="text-[11px] text-slate-400 font-bold tracking-wider uppercase mb-1">GENERATED CAPTIONS</div>
                {aiGeneratedResult.map((text, idx) => (
                  <div key={idx} className="bg-slate-900/5 p-3 px-4 rounded-xl text-xs text-slate-600 leading-relaxed border-l-4 border-violet-600">
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
            <h4 className="text-[15px] font-bold text-slate-900 mb-4">⭐ Combined Review Feed & Sentiment Score</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-7">
              <div className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl text-center flex flex-col justify-center items-center">
                <div className="text-3xl">⭐ 4.8</div>
                <div className="text-xs text-slate-500 mt-2">Sentiment Score: <strong className="text-slate-700">88% Positive</strong></div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-slate-900/5 border border-slate-900/5 p-4 rounded-xl">
                  <div className="flex justify-between mb-1.5">
                    <strong className="text-xs font-bold text-slate-800">Google Review (Rahim)</strong>
                    <span className="text-xs text-amber-500">⭐⭐⭐⭐⭐</span>
                  </div>
                  <p className="text-xs text-slate-600">"The website layout speed has increased drastically since migrating to Jevxo Dedicated node."</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module 9: Referrals */}
        {activeMarketingModule === "referral" && (
          <div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">🔗 Client Referral Links</h4>
            <p className="text-sm text-slate-500 mb-5">Share link with businesses. Earn commission credits on subscription renewals.</p>
            
            <div className="flex gap-3 flex-wrap">
              <input
                type="text"
                readOnly
                value="https://jevxo.com/ref?id=JEVXO-BD-000001"
                className="flex-1 min-w-[200px] p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-500 text-sm focus:outline-none"
              />
              <button onClick={() => {
                navigator.clipboard.writeText("https://jevxo.com/ref?id=JEVXO-BD-000001");
                alert("Referral URL copied to clipboard.");
              }} className="py-2.5 px-4 rounded-lg bg-slate-900/5 border border-slate-900/[0.08] text-violet-600 text-sm font-bold hover:bg-slate-900/10 transition-all cursor-pointer">Copy Link</button>
            </div>
          </div>
        )}

        {/* Module 10: ROI & Budget */}
        {activeMarketingModule === "budget" && (
          <div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-4">💰 Spend vs Revenue ROI Tracker</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl">
                <div className="text-xs text-slate-500 font-medium">Total Outbound Budget</div>
                <div className="text-xl font-extrabold mt-1 text-slate-900">$1,500.00</div>
              </div>
              <div className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl">
                <div className="text-xs text-slate-500 font-medium">Revenue Generated</div>
                <div className="text-xl font-extrabold mt-1 text-emerald-600">$6,420.00</div>
              </div>
              <div className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-xl">
                <div className="text-xs text-slate-500 font-medium">Net Marketing ROI</div>
                <div className="text-xl font-extrabold mt-1 text-cyan-600">328% ROI</div>
              </div>
            </div>
          </div>
        )}

        {/* Module 11: Asset library */}
        {activeMarketingModule === "asset" && (
          <div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-4">📁 Brand Asset Library Upload</h4>
            
            <form onSubmit={handleAssetUpload} className="border-2 border-dashed border-slate-900/20 hover:border-violet-600/40 rounded-xl p-8 text-center bg-slate-900/[0.01] transition-colors cursor-pointer">
              <div className="text-3xl">📁</div>
              <h5 className="text-sm font-bold text-slate-800 mt-3">Drag and drop files here</h5>
              <p className="text-xs text-slate-500 mt-1">Support format png, jpg, pdf. Max limit 10MB.</p>
              
              <button type="submit" className="mt-4 py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow transition-all cursor-pointer">Upload Demo Asset</button>
            </form>

            {assetsUploadSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 p-4 rounded-xl mt-4 text-xs font-medium">
                ✓ File processed successfully! Registered in cloud node index folder.
              </div>
            )}
          </div>
        )}

        {/* Module 12: Push alerts */}
        {activeMarketingModule === "push" && (
          <div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-1">🔔 Push Notification Sender</h4>
            <p className="text-xs text-slate-500 mb-5">Broadcast immediate alerts to subscribers&apos; browser notifications.</p>
            
            <button onClick={() => alert("Simulated push notifications transmitted to browser queue.")} className="py-2.5 px-5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer">Broadcast Alert</button>
          </div>
        )}

        {/* Module 13: Scorecard */}
        {activeMarketingModule === "scorecard" && (
          <div>
            <h4 className="text-[15px] font-bold text-slate-900 mb-4">📋 AI Marketing Health Index</h4>
            
            <div className="p-6 rounded-xl border-l-4 border-emerald-500 bg-slate-900/5 border border-slate-900/5 border-l-emerald-500">
              <div className="flex justify-between items-center flex-wrap gap-2.5">
                <span className="text-sm font-bold text-slate-800">Overall Scorecard: Excellent</span>
                <strong className="text-xl font-extrabold text-emerald-600">94 / 100</strong>
              </div>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                Your conversion optimization, website speed score, and email open rate are matching target benchmarks. We recommend targeting search queries containing "nextjs developers" to capture current US trends.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
