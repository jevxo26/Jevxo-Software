"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// ─── TYPES & MOCK DATA ───────────────────────────────────────────

// Admin Panel Mock Clients
const initialClients = [
  { id: "JEVXO-BD-001", name: "Apex Group Ltd", plan: "Growth", country: "Bangladesh", status: "Active", website: "apexgroup.com" },
  { id: "JEVXO-UK-042", name: "Vortex Agency Ltd", plan: "Business", country: "United Kingdom", status: "Active", website: "vortexagency.co.uk" },
  { id: "JEVXO-US-102", name: "Greenfield Biotech", plan: "Enterprise", country: "United States", status: "Active", website: "greenfieldbio.com" },
  { id: "JEVXO-AE-008", name: "Sands Real Estate", plan: "Starter", country: "United Arab Emirates", status: "Trial", website: "sandsrealestate.ae" },
  { id: "JEVXO-SG-015", name: "Apex Analytics Asia", plan: "Growth", country: "Singapore", status: "Expired", website: "apexanalytics.sg" },
];

// CRM Leads
const initialLeads = [
  { id: "lead-1", title: "Corporate Portal Project", client: "Delta Corp", value: "$8,500", stage: "New", score: 92, contact: "Sarah Connor" },
  { id: "lead-2", title: "Custom Shopify Store", client: "Vogue Boutique", value: "$4,200", stage: "Contacted", score: 78, contact: "Diana Prince" },
  { id: "lead-3", title: "CRM & HRM Integration", client: "Finvest Group", value: "$12,000", stage: "Proposal Sent", score: 88, contact: "Bruce Wayne" },
  { id: "lead-4", title: "Mobile Fitness Tracker App", client: "ActiveLife LLC", value: "$15,000", stage: "Negotiation", score: 65, contact: "Clark Kent" },
  { id: "lead-5", title: "AI Search Bot Deploy", client: "Nexa AI Solutions", value: "$9,000", stage: "Won", score: 98, contact: "Tony Stark" },
];

// HR Employees
const initialEmployees = [
  { id: "emp-101", name: "Kabir Hossain", role: "Senior Developer", dept: "Engineering", attendance: "Present", leaveBalance: 12, performance: 94 },
  { id: "emp-102", name: "Tasnim Ara", role: "UI/UX Designer", dept: "Design", attendance: "Present", leaveBalance: 14, performance: 98 },
  { id: "emp-103", name: "Rahat Khan", role: "DevOps Engineer", dept: "Engineering", attendance: "On Leave", leaveBalance: 4, performance: 88 },
  { id: "emp-104", name: "Farhana Islam", role: "Content Marketer", dept: "Marketing", attendance: "Present", leaveBalance: 15, performance: 90 },
  { id: "emp-105", name: "Tanvir Ahmed", role: "Sales Exec Intern", dept: "Sales", attendance: "Present", leaveBalance: 8, performance: 85 },
];

// Invoices
const initialInvoices = [
  { id: "INV-2026-001", date: "2026-06-01", amount: "$119.20", status: "Paid", method: "Credit Card" },
  { id: "INV-2026-042", date: "2026-05-01", amount: "$119.20", status: "Paid", method: "Credit Card" },
  { id: "INV-2026-098", date: "2026-04-01", amount: "$119.20", status: "Paid", method: "Credit Card" },
  { id: "INV-2026-112", date: "2026-03-01", amount: "$149.00", status: "Refunded", method: "Bank Transfer" },
];

// Banners for Partner Panel
const marketingAssets = [
  { id: "banner-1", name: "Jevxo CRM Launch Poster", format: "PNG / 1200x630", type: "Social Media Banner" },
  { id: "banner-2", name: "HRM System Features Flyer", format: "PDF / A4 size", type: "Flyer Leaflet" },
  { id: "banner-3", name: "Country Partner Introductory Pitch", format: "PPTX / 16:9", type: "Sales Deck" },
  { id: "banner-4", name: "Ecosystem Promo Video (Full HD)", format: "MP4 / 60s", type: "Promo Video" },
];

// Sales Agents Battle Arena Leaderboard
const salesLeaderboard = [
  { rank: 1, name: "Tanvir Ahmed", xp: 4800, deals: 12, targetProgress: 95 },
  { rank: 2, name: "Rashedul Bari", xp: 4200, deals: 10, targetProgress: 88 },
  { rank: 3, name: "Ayesha Siddiqa", xp: 3900, deals: 9, targetProgress: 82 },
  { rank: 4, name: "Niaz Morshed", xp: 3100, deals: 7, targetProgress: 75 },
];

// ─── MASTER DASHBOARD WRAPPER ────────────────────────────────────
export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080d1a", color: "#f1f5f9" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid rgba(124,58,237,0.3)", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin-slow 1s linear infinite", margin: "0 auto 16px" }} />
          <div>Initialising Jevxo Node...</div>
        </div>
      </div>
    }>
      <DashboardInner />
    </Suspense>
  );
}

// ─── INNER COMPONENT WITH SEARCH PARAMS ─────────────────────────
function DashboardInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Selected Role State
  const [activeRole, setActiveRole] = useState("admin");

  // Sync state with URL parameter on load
  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam && ["admin", "crm", "hr", "partner", "sales", "client"].includes(roleParam)) {
      setActiveRole(roleParam);
    }
  }, [searchParams]);

  // Handle Role Switch
  const handleRoleChange = (role: string) => {
    setActiveRole(role);
    router.push(`/dashboard?role=${role}`);
  };

  // State for Admin Panel
  const [clients, setClients] = useState(initialClients);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminFilter, setAdminFilter] = useState("All");
  const [selectedClientToSuspend, setSelectedClientToSuspend] = useState<typeof initialClients[0] | null>(null);

  // State for CRM Kanban Board
  const [leads, setLeads] = useState(initialLeads);
  const [crmSearch, setCrmSearch] = useState("");

  // State for HR Attendance / Leave
  const [employees, setEmployees] = useState(initialEmployees);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [attendanceLogs, setAttendanceLogs] = useState<string[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<Array<{ id: string, name: string, type: string, dates: string, status: string }>>([
    { id: "leave-1", name: "Rahat Khan", type: "Sick Leave", dates: "July 08 - July 10", status: "Pending" }
  ]);
  const [newLeave, setNewLeave] = useState({ type: "Annual Leave", dates: "", reason: "" });

  // State for Partner Panel
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawHistory, setWithdrawHistory] = useState<Array<{ id: string, amount: string, date: string, status: string }>>([
    { id: "TXN-902", amount: "$2,500.00", date: "2026-06-15", status: "Approved" },
    { id: "TXN-411", amount: "$1,800.00", date: "2026-05-10", status: "Approved" }
  ]);
  const [partnerCountry, setPartnerCountry] = useState("Bangladesh");

  // State for Sales Agent Panel
  const [meetingSubject, setMeetingSubject] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [agentMeetings, setAgentMeetings] = useState<Array<{ subject: string, date: string }>>([
    { subject: "Intro Call: Vortex Agency", date: "July 08, 11:30 AM" }
  ]);

  // State for Client Panel & Marketing Hub
  const [supportTicket, setSupportTicket] = useState({ title: "", priority: "Medium", message: "" });
  const [ticketsList, setTicketsList] = useState<Array<{ id: string, title: string, priority: string, status: string }>>([
    { id: "TCK-809", title: "Domain SSL configuration error", priority: "High", status: "Open" }
  ]);
  
  // Marketing Hub - Sub-panel Active Module
  const [activeMarketingModule, setActiveMarketingModule] = useState("social");

  // Marketing Hub - social scheduler state
  const [socialPost, setSocialPost] = useState({ platform: "Facebook", content: "", date: "" });
  const [scheduledPosts, setScheduledPosts] = useState<Array<{ platform: string, content: string, date: string }>>([
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

  // ─── HANDLERS ──────────────────────────────────────────────────

  // Admin Client Actions
  const handleToggleSuspend = (client: typeof initialClients[0]) => {
    setSelectedClientToSuspend(client);
  };

  const confirmSuspendClient = () => {
    if (selectedClientToSuspend) {
      setClients(clients.map(c => {
        if (c.id === selectedClientToSuspend.id) {
          const nextStatus = c.status === "Suspended" ? "Active" : "Suspended";
          return { ...c, status: nextStatus };
        }
        return c;
      }));
      setSelectedClientToSuspend(null);
    }
  };

  // CRM Kanban state cycling
  const cycleLeadStage = (leadId: string, direction: "forward" | "backward") => {
    const stages = ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"];
    setLeads(leads.map(lead => {
      if (lead.id === leadId) {
        const currentIdx = stages.indexOf(lead.stage);
        let nextIdx = currentIdx + (direction === "forward" ? 1 : -1);
        if (nextIdx >= 0 && nextIdx < stages.length) {
          return { ...lead, stage: stages[nextIdx] };
        }
      }
      return lead;
    }));
  };

  // HR Check-in
  const handleCheckInToggle = () => {
    const time = new Date().toLocaleTimeString();
    if (!isCheckedIn) {
      setAttendanceLogs([`Checked In at ${time}`, ...attendanceLogs]);
      setIsCheckedIn(true);
    } else {
      setAttendanceLogs([`Checked Out at ${time}`, ...attendanceLogs]);
      setIsCheckedIn(false);
    }
  };

  // Apply Leave
  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeave.dates) return;
    const req = {
      id: `leave-${Date.now()}`,
      name: "Tasnim Ara", // Mocking current user as designer Tasnim Ara
      type: newLeave.type,
      dates: newLeave.dates,
      status: "Pending"
    };
    setLeaveRequests([req, ...leaveRequests]);
    setNewLeave({ type: "Annual Leave", dates: "", reason: "" });
  };

  const handleApproveLeave = (leaveId: string, status: "Approved" | "Rejected") => {
    setLeaveRequests(leaveRequests.map(r => r.id === leaveId ? { ...r, status } : r));
  };

  // Partner Withdrawal
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
  };

  // Sales Meetings
  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingSubject || !meetingDate) return;
    setAgentMeetings([{ subject: meetingSubject, date: meetingDate }, ...agentMeetings]);
    setMeetingSubject("");
    setMeetingDate("");
  };

  // Client Support Tickets
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportTicket.title) return;
    const t = {
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      title: supportTicket.title,
      priority: supportTicket.priority,
      status: "Open"
    };
    setTicketsList([t, ...ticketsList]);
    setSupportTicket({ title: "", priority: "Medium", message: "" });
  };

  // Social Scheduler
  const handleSchedulePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialPost.content || !socialPost.date) return;
    setScheduledPosts([{ platform: socialPost.platform, content: socialPost.content, date: socialPost.date }, ...scheduledPosts]);
    setSocialPost({ platform: "Facebook", content: "", date: "" });
  };

  // SMS/WhatsApp Broadcast
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText) return;
    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastSuccess(false);
      setBroadcastText("");
    }, 4000);
  };

  // AI copywriting generator simulation
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

  // Asset upload simulation
  const handleAssetUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setAssetsUploadSuccess(true);
    setTimeout(() => setAssetsUploadSuccess(false), 4000);
  };

  // Filtered clients list
  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(adminSearch.toLowerCase()) || c.id.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesFilter = adminFilter === "All" ? true : c.status === adminFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080d1a", color: "#f1f5f9" }}>
      
      {/* ─── SIDEBAR NAVIGATION ──────────────────────────────────────── */}
      <aside style={{ width: "280px", borderRight: "1px solid rgba(255,255,255,0.06)", background: "rgba(8,13,26,0.9)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Brand Header */}
        <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "30px", height: "30px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", fontWeight: 800, color: "#fff",
            }}>J</div>
            <span style={{ fontSize: "18px", fontWeight: 700 }}>
              Jev<span style={{ color: "#7c3aed" }}>xo</span>
            </span>
          </Link>
          <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", color: "#a78bfa" }}>
            v1.0
          </span>
        </div>

        {/* Role Switcher Selector */}
        <div style={{ padding: "20px 20px" }}>
          <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>Active Panel Portal</label>
          <select
            value={activeRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(124,58,237,0.3)",
              background: "rgba(13,21,48,0.85)",
              color: "#a78bfa",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <option value="admin">🛡️ Global Admin</option>
            <option value="crm">🤝 CRM Manager</option>
            <option value="hr">👥 HR & Intern Manager</option>
            <option value="partner">💼 Country Partner</option>
            <option value="sales">🚀 Sales Agent Arena</option>
            <option value="client">💻 Client Dashboard</option>
          </select>
        </div>

        {/* Dynamic Sidebar Links depending on Role */}
        <nav style={{ flex: 1, padding: "10px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {activeRole === "admin" && (
            <>
              <div style={{ padding: "8px 12px", fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Ecosystem Admin</div>
              <div style={{ padding: "10px 12px", borderRadius: "8px", background: "rgba(124,58,237,0.12)", color: "#a78bfa", fontSize: "13px", fontWeight: 600 }}>Command Dashboard</div>
              <a href="#admin-clients" style={{ padding: "10px 12px", borderRadius: "8px", color: "var(--text-secondary)", fontSize: "13px" }} className="hover:bg-white/5">Client Database</a>
              <a href="#admin-revenue" style={{ padding: "10px 12px", borderRadius: "8px", color: "var(--text-secondary)", fontSize: "13px" }}>Revenue Center</a>
            </>
          )}

          {activeRole === "crm" && (
            <>
              <div style={{ padding: "8px 12px", fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>CRM Workflow</div>
              <div style={{ padding: "10px 12px", borderRadius: "8px", background: "rgba(124,58,237,0.12)", color: "#a78bfa", fontSize: "13px", fontWeight: 600 }}>Kanban Leads Board</div>
              <a href="#crm-records" style={{ padding: "10px 12px", borderRadius: "8px", color: "var(--text-secondary)", fontSize: "13px" }}>Customer Timeline</a>
            </>
          )}

          {activeRole === "hr" && (
            <>
              <div style={{ padding: "8px 12px", fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>HR Suite</div>
              <div style={{ padding: "10px 12px", borderRadius: "8px", background: "rgba(124,58,237,0.12)", color: "#a78bfa", fontSize: "13px", fontWeight: 600 }}>Attendance & Staff</div>
              <a href="#hr-leaves" style={{ padding: "10px 12px", borderRadius: "8px", color: "var(--text-secondary)", fontSize: "13px" }}>Leave Request Board</a>
            </>
          )}

          {activeRole === "partner" && (
            <>
              <div style={{ padding: "8px 12px", fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Partner Hub</div>
              <div style={{ padding: "10px 12px", borderRadius: "8px", background: "rgba(124,58,237,0.12)", color: "#a78bfa", fontSize: "13px", fontWeight: 600 }}>Earnings & Withdrawals</div>
              <a href="#partner-assets" style={{ padding: "10px 12px", borderRadius: "8px", color: "var(--text-secondary)", fontSize: "13px" }}>Marketing Assets</a>
            </>
          )}

          {activeRole === "sales" && (
            <>
              <div style={{ padding: "8px 12px", fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Sales Arena</div>
              <div style={{ padding: "10px 12px", borderRadius: "8px", background: "rgba(124,58,237,0.12)", color: "#a78bfa", fontSize: "13px", fontWeight: 600 }}>Agent Leaderboard</div>
              <a href="#sales-meetings" style={{ padding: "10px 12px", borderRadius: "8px", color: "var(--text-secondary)", fontSize: "13px" }}>Meetings Scheduler</a>
            </>
          )}

          {activeRole === "client" && (
            <>
              <div style={{ padding: "8px 12px", fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>SaaS Panel</div>
              <div style={{ padding: "10px 12px", borderRadius: "8px", background: "rgba(124,58,237,0.12)", color: "#a78bfa", fontSize: "13px", fontWeight: 600 }}>Website Status</div>
              <a href="#marketing-hub-section" style={{ padding: "10px 12px", borderRadius: "8px", color: "var(--text-secondary)", fontSize: "13px" }} onClick={() => document.getElementById("marketing-hub-section")?.scrollIntoView({ behavior: "smooth" })}>🚀 Marketing Hub</a>
            </>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "12px", color: "var(--text-secondary)" }}>
          <div style={{ fontWeight: 600 }}>Current User Node</div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>jevxo_host_asia_01</div>
        </div>
      </aside>

      {/* ─── CONTENT AREA ───────────────────────────────────────────── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
        
        {/* Top Header */}
        <header style={{ height: "72px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", background: "rgba(8,13,26,0.5)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>
              {activeRole === "admin" && "🛡️"}
              {activeRole === "crm" && "🤝"}
              {activeRole === "hr" && "👥"}
              {activeRole === "partner" && "💼"}
              {activeRole === "sales" && "🚀"}
              {activeRole === "client" && "💻"}
            </span>
            <h1 style={{ fontSize: "18px", fontWeight: 700 }}>
              {activeRole === "admin" && "Global Admin Dashboard"}
              {activeRole === "crm" && "CRM Workflow Management"}
              {activeRole === "hr" && "Human Resources & Intern Core"}
              {activeRole === "partner" && "Regional Partner Center"}
              {activeRole === "sales" && "Sales Agent Battle Arena"}
              {activeRole === "client" && "Client Business Control"}
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {/* Live Indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }} />
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>Active Session</span>
            </div>
            
            {/* Quick action buttons */}
            <Link href="/" style={{ fontSize: "13px", padding: "6px 14px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", fontWeight: 600 }}>
              Leave Portal
            </Link>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <div style={{ flex: 1, padding: "40px" }}>

          {/* ──────────────────────────────────────────────────────── */}
          {/* 1. ADMIN PANEL VIEW                                      */}
          {/* ──────────────────────────────────────────────────────── */}
          {activeRole === "admin" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              
              {/* Admin KPIs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="dashboard-kpis">
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Total Revenue</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#10b981" }}>$1,248,500</div>
                  <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 +14.2% from last month</div>
                </div>
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Active Clients</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px" }}>420</div>
                  <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 +8.5% onboarding rate</div>
                </div>
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Websites Suspended</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#ef4444" }}>4</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Billing issues / Expired trial</div>
                </div>
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Active Cloud Nodes</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#06b6d4" }}>5 / 5</div>
                  <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}> Uptime status: 99.98%</div>
                </div>
              </div>

              {/* World Map Heatmap & AI Insights */}
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "28px" }} className="admin-grid-top">
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Ecosystem Hitmap (Interactive)</h3>
                  
                  <div style={{ height: "200px", background: "rgba(255,255,255,0.01)", borderRadius: "8px", border: "1px dashed rgba(255,255,255,0.06)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>[Stylized Map Center - Click a region below to test UI response]</div>
                    
                    {/* Simulated Map Nodes */}
                    <div style={{ display: "flex", gap: "10px", position: "absolute", bottom: "20px" }}>
                      {["Bangladesh Node", "UK Node", "US Node", "UAE Node"].map((nodeName) => (
                        <button
                          key={nodeName}
                          onClick={() => alert(`Provisioning ${nodeName} details in central command log.`)}
                          style={{ padding: "6px 12px", borderRadius: "4px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", fontSize: "11px", fontWeight: 700 }}
                        >
                          📍 {nodeName}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass" style={{ padding: "28px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#a78bfa" }}>🧠 AI Business Insights</h3>
                  <div style={{ background: "rgba(255,255,255,0.02)", borderLeft: "3px solid #7c3aed", padding: "14px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700 }}>Country Partner Growth Alert</div>
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>US region client signups surged 22% this week. We recommend provisioning additional agency partner templates immediately.</p>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", borderLeft: "3px solid #06b6d4", padding: "14px", borderRadius: "4px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700 }}>Hosting Server Allocation</div>
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Node BD-HQ storage utilization is at 78%. Auto-scaling scheduled for July 12th.</p>
                  </div>
                </div>
              </div>

              {/* Client Management Table (Interactive) */}
              <div className="glass" style={{ padding: "28px", borderRadius: "16px" }} id="admin-clients">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Client Database Management</h3>
                  
                  <div style={{ display: "flex", gap: "12px" }}>
                    <input
                      type="text"
                      placeholder="Search Client ID or Name..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", color: "#fff", fontSize: "13px", width: "220px" }}
                    />
                    <select
                      value={adminFilter}
                      onChange={(e) => setAdminFilter(e.target.value)}
                      style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border)", background: "rgba(8,13,26,0.9)", color: "#fff", fontSize: "13px" }}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Trial">Trial</option>
                      <option value="Expired">Expired</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "var(--text-muted)" }}>
                        <th style={{ padding: "12px 8px" }}>Client ID</th>
                        <th style={{ padding: "12px 8px" }}>Company / Name</th>
                        <th style={{ padding: "12px 8px" }}>Plan</th>
                        <th style={{ padding: "12px 8px" }}>Country</th>
                        <th style={{ padding: "12px 8px" }}>Status</th>
                        <th style={{ padding: "12px 8px", textAlign: "right" }}>Ecosystem Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((c) => (
                        <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <td style={{ padding: "14px 8px", fontWeight: 700 }}>{c.id}</td>
                          <td style={{ padding: "14px 8px" }}>
                            <div>{c.name}</div>
                            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{c.website}</div>
                          </td>
                          <td style={{ padding: "14px 8px" }}>
                            <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.04)", padding: "3px 8px", borderRadius: "4px" }}>{c.plan}</span>
                          </td>
                          <td style={{ padding: "14px 8px" }}>{c.country}</td>
                          <td style={{ padding: "14px 8px" }}>
                            <span style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              padding: "4px 8px",
                              borderRadius: "100px",
                              background: c.status === "Active" ? "rgba(16,185,129,0.12)" : c.status === "Suspended" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.12)",
                              color: c.status === "Active" ? "#10b981" : c.status === "Suspended" ? "#ef4444" : "#f59e0b"
                            }}>
                              {c.status}
                            </span>
                          </td>
                          <td style={{ padding: "14px 8px", textAlign: "right" }}>
                            <button
                              onClick={() => handleToggleSuspend(c)}
                              style={{
                                padding: "6px 12px",
                                borderRadius: "4px",
                                background: c.status === "Suspended" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                                border: "1px solid",
                                borderColor: c.status === "Suspended" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)",
                                color: c.status === "Suspended" ? "#10b981" : "#ef4444",
                                fontSize: "12px",
                                fontWeight: 700,
                              }}
                            >
                              {c.status === "Suspended" ? "Activate Portal" : "One-Click Suspend"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Confirmation Dialog for Suspension */}
              {selectedClientToSuspend && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                  <div className="glass" style={{ width: "100%", maxWidth: "460px", padding: "30px", borderRadius: "16px", background: "#0d1530" }}>
                    <h4 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>🛡️ Confirm Command Action</h4>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
                      Are you sure you want to change the status of <strong>{selectedClientToSuspend.name}</strong>? This changes website hosting status and blocks dashboard portal sessions.
                    </p>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                      <button onClick={() => setSelectedClientToSuspend(null)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid var(--border)", background: "none", color: "#fff" }}>Cancel</button>
                      <button onClick={confirmSuspendClient} style={{ padding: "8px 20px", borderRadius: "6px", border: "none", background: "#ef4444", color: "#fff", fontWeight: 700 }}>Confirm Action</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* 2. CRM PANEL VIEW                                        */}
          {/* ──────────────────────────────────────────────────────── */}
          {activeRole === "crm" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              
              {/* CRM KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="dashboard-kpis">
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>New Leads Today</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#a78bfa" }}>18</div>
                  <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 +3 leads from social channels</div>
                </div>
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Follow Ups Due</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#f59e0b" }}>6</div>
                  <div style={{ fontSize: "11px", color: "#ef4444", marginTop: "4px" }}>⚠️ 2 items pending escalation</div>
                </div>
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Active Proposals</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#60a5fa" }}>9</div>
                  <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>Estimated pipeline value: $45k</div>
                </div>
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Conversion Rate</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#10b981" }}>38.4%</div>
                  <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 +4.2% above Jevxo average</div>
                </div>
              </div>

              {/* Kanban Board (Interactive Lead Pipeline) */}
              <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Interactive CRM Kanban Pipeline</h3>
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Move cards through pipeline stages. Includes real-time AI lead scores.</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Filter leads by client name..."
                    value={crmSearch}
                    onChange={(e) => setCrmSearch(e.target.value)}
                    style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", color: "#fff", fontSize: "13px", width: "240px" }}
                  />
                </div>

                {/* Pipeline columns */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", overflowX: "auto" }}>
                  {["New", "Contacted", "Proposal Sent", "Negotiation", "Won"].map((stage) => {
                    const stageLeads = leads.filter(l => l.stage === stage && l.title.toLowerCase().includes(crmSearch.toLowerCase()));
                    return (
                      <div key={stage} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "10px", padding: "12px", minHeight: "360px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "8px" }}>
                          <span style={{ fontSize: "13px", fontWeight: 700 }}>{stage}</span>
                          <span style={{ fontSize: "11px", background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "4px" }}>{stageLeads.length}</span>
                        </div>

                        {/* Cards inside column */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {stageLeads.map(lead => (
                            <div key={lead.id} style={{ background: "rgba(13,21,48,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                              <div>
                                <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#f1f5f9" }}>{lead.title}</h4>
                                <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{lead.client}</div>
                              </div>

                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                                <span style={{ fontSize: "12px", fontWeight: 700, color: "#06b6d4" }}>{lead.value}</span>
                                <span style={{
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  background: lead.score > 85 ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                                  color: lead.score > 85 ? "#10b981" : "#f59e0b"
                                }}>
                                  AI Score: {lead.score}
                                </span>
                              </div>

                              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "8px", marginTop: "4px" }}>
                                <button onClick={() => cycleLeadStage(lead.id, "backward")} disabled={stage === "New"} style={{ background: "none", border: "none", color: "var(--text-secondary)", fontSize: "11px", cursor: "pointer", opacity: stage === "New" ? 0.3 : 1 }}>◀ Prev</button>
                                <button onClick={() => cycleLeadStage(lead.id, "forward")} disabled={stage === "Won"} style={{ background: "none", border: "none", color: "#a78bfa", fontSize: "11px", fontWeight: 700, cursor: "pointer", opacity: stage === "Won" ? 0.3 : 1 }}>Next ▶</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reminders / Feed */}
              <div className="glass" style={{ padding: "28px", borderRadius: "16px" }} id="crm-records">
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>⚡ Automated Reminders & Customer Updates</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "14px", background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px" }}>
                    <span style={{ fontSize: "20px" }}>⏰</span>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700 }}>Follow Up Scheduled: Finvest Group</div>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>Proposal sent yesterday. CRM agent is flagged to coordinate follow-up call at 2:00 PM.</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "14px", background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px" }}>
                    <span style={{ fontSize: "20px" }}>📧</span>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700 }}>Incoming Email: Delta Corp</div>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>Contact Sarah Connor requested project specification modifications for their corporate portal.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* 3. HR PANEL VIEW                                         */}
          {/* ──────────────────────────────────────────────────────── */}
          {activeRole === "hr" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              
              {/* Check-In Check-Out & Staff Database */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }} className="hr-grid">
                
                {/* Attendance Tracker */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Staff Attendance Console</h3>
                  
                  <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)", textTransform: "uppercase" }}>Workplace Status</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, margin: "6px 0 16px" }}>
                      {isCheckedIn ? "🟢 Checked In (Work Session Active)" : "🔴 Checked Out (Logged Off)"}
                    </div>

                    <button
                      onClick={handleCheckInToggle}
                      style={{
                        padding: "12px 28px",
                        borderRadius: "8px",
                        background: isCheckedIn ? "#ef4444" : "linear-gradient(135deg, #7c3aed, #4f46e5)",
                        border: "none",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "14px",
                        width: "100%",
                      }}
                    >
                      {isCheckedIn ? "Log Out (Check-Out)" : "Start Shift (Check-In)"}
                    </button>
                  </div>

                  <div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 700, marginBottom: "10px" }}>SESSION TIMELOGS</div>
                    <div style={{ maxHeight: "150px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {attendanceLogs.length === 0 ? (
                        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>No shift log history found for this session.</span>
                      ) : (
                        attendanceLogs.map((log, idx) => (
                          <div key={idx} style={{ fontSize: "12px", background: "rgba(255,255,255,0.03)", padding: "8px 12px", borderRadius: "4px" }}>
                            ⏰ {log}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Staff table */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Department Staff & Interns</h3>
                  
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "var(--text-secondary)", textAlign: "left" }}>
                          <th style={{ padding: "10px" }}>Employee</th>
                          <th style={{ padding: "10px" }}>Department</th>
                          <th style={{ padding: "10px" }}>Status</th>
                          <th style={{ padding: "10px" }}>Leave Balance</th>
                          <th style={{ padding: "10px" }}>Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((e) => (
                          <tr key={e.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                            <td style={{ padding: "12px 10px" }}>
                              <div style={{ fontWeight: 700 }}>{e.name}</div>
                              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{e.role}</div>
                            </td>
                            <td style={{ padding: "12px 10px" }}>{e.dept}</td>
                            <td style={{ padding: "12px 10px" }}>
                              <span style={{ color: e.attendance === "Present" ? "#10b981" : "#f59e0b", fontWeight: 600 }}>{e.attendance}</span>
                            </td>
                            <td style={{ padding: "12px 10px", textAlign: "center" }}>{e.leaveBalance} days</td>
                            <td style={{ padding: "12px 10px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                                  <div style={{ width: `${e.performance}%`, height: "4px", background: "#7c3aed", borderRadius: "2px" }} />
                                </div>
                                <span>{e.performance}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Leave Requests & Form */}
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "28px" }} className="hr-grid" id="hr-leaves">
                
                {/* Pending Leaves List */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Leave Request Approval Queue</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {leaveRequests.map((req) => (
                      <div key={req.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "16px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 700 }}>{req.name}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                            {req.type} | <span style={{ color: "#06b6d4" }}>{req.dates}</span>
                          </div>
                        </div>

                        <div>
                          {req.status === "Pending" ? (
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button onClick={() => handleApproveLeave(req.id, "Rejected")} style={{ padding: "6px 12px", borderRadius: "4px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", fontSize: "11px", fontWeight: 700 }}>Reject</button>
                              <button onClick={() => handleApproveLeave(req.id, "Approved")} style={{ padding: "6px 12px", borderRadius: "4px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981", fontSize: "11px", fontWeight: 700 }}>Approve</button>
                            </div>
                          ) : (
                            <span style={{ fontSize: "12px", fontWeight: 700, color: req.status === "Approved" ? "#10b981" : "#ef4444" }}>{req.status}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Form */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Apply for Leave</h3>
                  <form onSubmit={handleApplyLeave}>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Leave Type</label>
                      <select
                        value={newLeave.type}
                        onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                      >
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Dates Requested</label>
                      <input
                        type="text"
                        placeholder="e.g. July 12 - July 15"
                        required
                        value={newLeave.dates}
                        onChange={(e) => setNewLeave({ ...newLeave, dates: e.target.value })}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Reason</label>
                      <textarea
                        rows={2}
                        value={newLeave.reason}
                        onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                      />
                    </div>

                    <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none" }}>Submit Application</button>
                  </form>
                </div>

              </div>

            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* 4. PARTNER PANEL VIEW                                    */}
          {/* ──────────────────────────────────────────────────────── */}
          {activeRole === "partner" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              
              {/* Commission Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="dashboard-kpis">
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Clients Managed</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#60a5fa" }}>24</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Across regional node catalog</div>
                </div>
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Commission Earned</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#10b981" }}>$14,400.00</div>
                  <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>📈 +$1,200.00 pending sync</div>
                </div>
                <div className="glass" style={{ padding: "24px", borderRadius: "12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase" }}>Available Wallet Balance</div>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginTop: "8px", color: "#06b6d4" }}>$5,200.00</div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>Provisioned node checkout ready</div>
                </div>
              </div>

              {/* Withdrawal Request Form & Transaction Log */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }} className="hr-grid">
                
                {/* Form */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Request Commission Withdrawal</h3>
                  <form onSubmit={handleWithdrawSubmit}>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Select Country Account</label>
                      <select
                        value={partnerCountry}
                        onChange={(e) => setPartnerCountry(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                      >
                        <option value="Bangladesh">Bangladesh (BKash/Bank)</option>
                        <option value="United Kingdom">United Kingdom (IBAN)</option>
                        <option value="United States">United States (ACH)</option>
                        <option value="United Arab Emirates">United Arab Emirates (Local Transfer)</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Withdraw Amount (USD)</label>
                      <input
                        type="number"
                        placeholder="e.g. 500"
                        required
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                      />
                      <span style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>Maximum transfer: $5,200.00</span>
                    </div>

                    <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none" }}>Initiate Bank Transfer</button>
                  </form>
                </div>

                {/* Log */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Withdrawal Request Logs</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {withdrawHistory.map((txn) => (
                      <div key={txn.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", padding: "14px 20px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "14px" }}>{txn.amount}</div>
                          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>ID: {txn.id} | Date: {txn.date}</div>
                        </div>
                        <span style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "4px 8px",
                          borderRadius: "100px",
                          background: txn.status === "Approved" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                          color: txn.status === "Approved" ? "#10b981" : "#f59e0b"
                        }}>
                          {txn.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Marketing Assets Library */}
              <div className="glass" style={{ padding: "28px", borderRadius: "16px" }} id="partner-assets">
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>📁 Marketing Materials & Promotional Kit</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="dashboard-kpis">
                  {marketingAssets.map((asset) => (
                    <div key={asset.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "28px" }}>
                          {asset.type.includes("Video") ? "🎥" : asset.type.includes("Deck") ? "📊" : "🖼️"}
                        </div>
                        <h4 style={{ fontSize: "13px", fontWeight: 700, marginTop: "12px", color: "#f1f5f9" }}>{asset.name}</h4>
                        <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>{asset.type}</div>
                      </div>
                      
                      <button
                        onClick={() => alert(`Starting download bundle for: ${asset.name}.`)}
                        style={{ width: "100%", marginTop: "16px", padding: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "#a78bfa", fontSize: "12px", fontWeight: 600, borderRadius: "4px" }}
                      >
                        Download ({asset.format.split(" / ")[0]})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* 5. SALES AGENT PANEL VIEW                                */}
          {/* ──────────────────────────────────────────────────────── */}
          {activeRole === "sales" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              
              {/* Daily Target Progress and Achievement Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }} className="hr-grid">
                
                {/* Target Progress Bar */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>🎯 Target Commission Tracker</h3>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                      <span>Daily Target ($500)</span>
                      <span style={{ color: "#06b6d4" }}>70%</span>
                    </div>
                    <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }}>
                      <div style={{ width: "70%", height: "8px", background: "#06b6d4", borderRadius: "4px" }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                      <span>Monthly Target ($15,000)</span>
                      <span style={{ color: "#a78bfa" }}>85%</span>
                    </div>
                    <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }}>
                      <div style={{ width: "85%", height: "8px", background: "#7c3aed", borderRadius: "4px" }} />
                    </div>
                  </div>
                </div>

                {/* Gamified Rank and Badge */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px", display: "flex", gap: "20px", alignItems: "center" }}>
                  <div style={{
                    width: "80px", height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                    boxShadow: "0 0 20px rgba(245,158,11,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px"
                  }}>
                    🥇
                  </div>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Platinum Sales Agent</h3>
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>Rank status is active. 3,800 XP remaining to unlock Jevxo Executive level.</p>
                  </div>
                </div>

                {/* Achievements Unlocked List */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>Achievement Badges Unlocked</h3>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {["🥉 Bronze", "🥈 Silver", "🥇 Gold", "💎 Platinum"].map((badge, index) => (
                      <span
                        key={index}
                        onClick={() => alert(`Unlocked! XP reward added to Battle Arena dashboard.`)}
                        style={{ padding: "6px 12px", borderRadius: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontSize: "11px", cursor: "pointer", fontWeight: 700 }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sales Battle Arena Leaderboard & Scheduler */}
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "28px" }} className="admin-grid-top">
                
                {/* Sales Battle Arena */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>⚔️ Sales Battle Arena (Gamified Ranking)</h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {salesLeaderboard.map((user) => (
                      <div key={user.rank} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "14px 20px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <span style={{ fontSize: "18px", fontWeight: 800, color: user.rank === 1 ? "#f59e0b" : "var(--text-secondary)" }}>#{user.rank}</span>
                          <div>
                            <div style={{ fontWeight: 700 }}>{user.name}</div>
                            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{user.deals} closed deals this month</div>
                          </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "13px", fontWeight: 700, color: "#a78bfa" }}>{user.xp} XP</div>
                          <div style={{ fontSize: "10px", color: "#10b981", marginTop: "2px" }}>{user.targetProgress}% target</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meeting Scheduler */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }} id="sales-meetings">
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>📅 Schedule Client Call</h3>
                  <form onSubmit={handleScheduleMeeting}>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Meeting Subject</label>
                      <input
                        type="text"
                        placeholder="e.g. Core Redesign Demo"
                        required
                        value={meetingSubject}
                        onChange={(e) => setMeetingSubject(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Date & Time</label>
                      <input
                        type="text"
                        placeholder="e.g. July 10, 3:00 PM"
                        required
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                      />
                    </div>

                    <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none" }}>Log Call</button>
                  </form>

                  <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)" }}>UPCOMING CALLS</div>
                    {agentMeetings.map((meet, idx) => (
                      <div key={idx} style={{ fontSize: "12px", background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: "4px" }}>
                        📞 <strong>{meet.subject}</strong> — {meet.date}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* 6. CLIENT PANEL VIEW & MARKETING HUB                     */}
          {/* ──────────────────────────────────────────────────────── */}
          {activeRole === "client" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              
              {/* Client Info Summary */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "28px" }} className="hr-grid">
                
                {/* Client ID card */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px", background: "rgba(13,21,48,0.4)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px", background: "rgba(124,58,237,0.15)", color: "#a78bfa" }}>JEVXO NODE PORTAL</span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>ID: JEVXO-BD-000001</span>
                  </div>

                  <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>Apex Group Ltd</h3>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Plan Subscription: <strong style={{ color: "#06b6d4" }}>Growth Plan (Annual)</strong></div>
                  
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", marginTop: "20px", display: "flex", gap: "20px" }}>
                    <div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>SSL Status</div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#10b981" }}>🔒 Secured</span>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>Domain Renewal</div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#f59e0b" }}>📅 240 days left</span>
                    </div>
                  </div>
                </div>

                {/* Hosting progress / Visitor metrics */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Website Node Utilization</h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="dashboard-kpis">
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                        <span>Storage (Growth Limit 100GB)</span>
                        <strong style={{ color: "#a78bfa" }}>42 GB Used</strong>
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                        <div style={{ width: "42%", height: "6px", background: "#7c3aed", borderRadius: "3px" }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                        <span>Bandwidth (Growth Limit 2.5TB)</span>
                        <strong style={{ color: "#06b6d4" }}>1.1 TB Used</strong>
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                        <div style={{ width: "44%", height: "6px", background: "#06b6d4", borderRadius: "3px" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", marginTop: "20px", display: "flex", gap: "40px" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Total Web Visitors (Month)</div>
                      <span style={{ fontSize: "20px", fontWeight: 700 }}>45,200</span>
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>SEO Health Index</div>
                      <span style={{ fontSize: "20px", fontWeight: 700, color: "#10b981" }}>92 / 100</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Invoices and Support Tickets */}
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "28px" }} className="hr-grid">
                
                {/* Billing */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Billing Invoices & Receipts</h3>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>
                          <th style={{ padding: "10px" }}>Invoice ID</th>
                          <th style={{ padding: "10px" }}>Billing Date</th>
                          <th style={{ padding: "10px" }}>Receipt Sum</th>
                          <th style={{ padding: "10px" }}>Payment Status</th>
                          <th style={{ padding: "10px", textAlign: "right" }}>Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {initialInvoices.map((inv) => (
                          <tr key={inv.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                            <td style={{ padding: "12px 10px", fontWeight: 700 }}>{inv.id}</td>
                            <td style={{ padding: "12px 10px" }}>{inv.date}</td>
                            <td style={{ padding: "12px 10px" }}>{inv.amount}</td>
                            <td style={{ padding: "12px 10px" }}>
                              <span style={{ color: inv.status === "Paid" ? "#10b981" : "#ef4444", fontWeight: 600 }}>{inv.status}</span>
                            </td>
                            <td style={{ padding: "12px 10px", textAlign: "right" }}>
                              <button onClick={() => alert(`Provisioning invoice PDF for ${inv.id}`)} style={{ padding: "4px 8px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "#a78bfa", borderRadius: "4px", fontSize: "11px" }}>PDF</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Support Form */}
                <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>Open Support Ticket</h3>
                  <form onSubmit={handleCreateTicket}>
                    <div style={{ marginBottom: "12px" }}>
                      <input
                        type="text"
                        placeholder="Short Summary / Ticket Subject"
                        required
                        value={supportTicket.title}
                        onChange={(e) => setSupportTicket({ ...supportTicket, title: e.target.value })}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: "12px" }}>
                      <select
                        value={supportTicket.priority}
                        onChange={(e) => setSupportTicket({ ...supportTicket, priority: e.target.value })}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(8,13,26,0.9)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
                      >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                      </select>
                    </div>

                    <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none" }}>Submit Ticket</button>
                  </form>

                  <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {ticketsList.map((t) => (
                      <div key={t.id} style={{ fontSize: "12px", background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: "4px", display: "flex", justifyContent: "space-between" }}>
                        <span>🎟️ {t.title}</span>
                        <strong style={{ color: t.priority === "High" ? "#ef4444" : "var(--text-secondary)" }}>{t.priority}</strong>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ────────────────────────────────────────────────── */}
              {/* MARKETING HUB SUB-PANEL (13 MODULES)               */}
              {/* ────────────────────────────────────────────────── */}
              <div className="glass" style={{ padding: "36px", borderRadius: "20px", border: "1px solid rgba(124,58,237,0.25)", background: "rgba(13,21,48,0.25)" }} id="marketing-hub-section">
                
                {/* Marketing Hub Header */}
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "24px", marginBottom: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "28px" }}>🚀</span>
                    <div>
                      <h2 style={{ fontSize: "20px", fontWeight: 800 }}>Jevxo Integrated Marketing Hub</h2>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>13 advanced sub-modules to deploy campaigns, track search engine keyword ranks, and audit automated marketing budgets.</p>
                    </div>
                  </div>

                  {/* Modules Selector Grid */}
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "20px" }}>
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
                          padding: "6px 12px",
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
                <div style={{ background: "rgba(0,0,0,0.15)", borderRadius: "12px", padding: "28px" }}>
                  
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

                          <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "#7c3aed", color: "#fff", fontWeight: 700, border: "none" }}>Schedule Post Node</button>
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
                        <div className="glass" style={{ padding: "20px", borderRadius: "10px" }}>
                          <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Total Monthly Spend</div>
                          <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px" }}>${fbAdBudget} / $2,000 limit</div>
                        </div>
                        <div className="glass" style={{ padding: "20px", borderRadius: "10px" }}>
                          <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Average Campaign CTR</div>
                          <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px", color: "#10b981" }}>4.82%</div>
                        </div>
                        <div className="glass" style={{ padding: "20px", borderRadius: "10px" }}>
                          <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Estimated ROAS</div>
                          <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px", color: "#06b6d4" }}>3.8x Return</div>
                        </div>
                      </div>

                      <div className="glass" style={{ padding: "20px", borderRadius: "10px" }}>
                        <h5 style={{ fontSize: "13px", fontWeight: 700, marginBottom: "12px" }}>Meta Budget Allocation (Adjust Allocation)</h5>
                        <input
                          type="range"
                          min="100"
                          max="2000"
                          value={fbAdBudget}
                          onChange={(e) => setFbAdBudget(Number(e.target.value))}
                          style={{ width: "100%", accentColor: "#7c3aed", background: "rgba(255,255,255,0.06)", height: "6px", borderRadius: "3px" }}
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

                        <button type="submit" style={{ padding: "10px 24px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none" }}>
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
                        <div className="glass" style={{ padding: "16px", borderRadius: "8px" }}>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Target Keyword</div>
                          <strong style={{ display: "block", fontSize: "15px", color: "#fff", marginTop: "4px" }}>"software company bd"</strong>
                          <span style={{ fontSize: "11px", color: "#10b981", display: "block", marginTop: "4px" }}>Rank Position: #2 (HQ Node)</span>
                        </div>
                        <div className="glass" style={{ padding: "16px", borderRadius: "8px" }}>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Target Keyword</div>
                          <strong style={{ display: "block", fontSize: "15px", color: "#fff", marginTop: "4px" }}>"nextjs web developer london"</strong>
                          <span style={{ fontSize: "11px", color: "#10b981", display: "block", marginTop: "4px" }}>Rank Position: #5 (+2 ranks)</span>
                        </div>
                        <div className="glass" style={{ padding: "16px", borderRadius: "8px" }}>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Target Keyword</div>
                          <strong style={{ display: "block", fontSize: "15px", color: "#fff", marginTop: "4px" }}>"crm software systems dhaka"</strong>
                          <span style={{ fontSize: "11px", color: "#f59e0b", display: "block", marginTop: "4px" }}>Rank Position: #8 (Stabilised)</span>
                        </div>
                      </div>

                      <div className="glass" style={{ padding: "20px", borderRadius: "10px" }}>
                        <h5 style={{ fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>On-Page SEO Checklist (Active Audits)</h5>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "var(--text-secondary)" }}>
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
                            <h5 style={{ fontSize: "13px", fontWeight: 700, marginTop: "12px" }}>{temp.name}</h5>
                            <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{temp.type}</span>
                            <button onClick={() => alert(`Creating new site layout branch for: ${temp.name}`)} style={{ width: "100%", marginTop: "16px", padding: "6px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", fontSize: "11px", fontWeight: 700, borderRadius: "4px" }}>Deploy Branch</button>
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
                        <button type="submit" disabled={aiGenerating} style={{ padding: "10px 20px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none" }}>
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
                        <div className="glass" style={{ padding: "20px", borderRadius: "10px", textAlign: "center" }}>
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
                        }} style={{ padding: "10px 20px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "#a78bfa", fontWeight: 700 }}>Copy Link</button>
                      </div>
                    </div>
                  )}

                  {/* Module 10: ROI & Budget */}
                  {activeMarketingModule === "budget" && (
                    <div>
                      <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>💰 Spend vs Revenue ROI Tracker</h4>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="dashboard-kpis">
                        <div className="glass" style={{ padding: "20px", borderRadius: "10px" }}>
                          <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Total Outbound Budget</div>
                          <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px" }}>$1,500.00</div>
                        </div>
                        <div className="glass" style={{ padding: "20px", borderRadius: "10px" }}>
                          <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Revenue Generated</div>
                          <div style={{ fontSize: "22px", fontWeight: 700, marginTop: "4px", color: "#10b981" }}>$6,420.00</div>
                        </div>
                        <div className="glass" style={{ padding: "20px", borderRadius: "10px" }}>
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
                        
                        <button type="submit" style={{ marginTop: "16px", padding: "8px 20px", background: "#7c3aed", border: "none", color: "#fff", fontSize: "12px", fontWeight: 700, borderRadius: "6px" }}>Upload Demo Asset</button>
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
                      
                      <button onClick={() => alert("Simulated push notifications transmitted to browser queue.")} style={{ padding: "12px 24px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none" }}>Broadcast Alert</button>
                    </div>
                  )}

                  {/* Module 13: Scorecard */}
                  {activeMarketingModule === "scorecard" && (
                    <div>
                      <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>📋 AI Marketing Health Index</h4>
                      
                      <div className="glass" style={{ padding: "24px", borderRadius: "10px", borderLeft: "4px solid #10b981" }}>
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

            </div>
          )}

        </div>
      </main>

      <style>{`
        .dashboard-kpis {
          @media (max-width: 900px) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          @media (max-width: 550px) {
            grid-template-columns: 1fr !important;
          }
        }
        .admin-grid-top, .hr-grid {
          @media (max-width: 900px) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
