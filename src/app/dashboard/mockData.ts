// Jevxo Dashboard Shared Mock Data

export interface ClientItem {
  id: string;
  name: string;
  plan: string;
  country: string;
  status: "Active" | "Trial" | "Expired" | "Suspended";
  website: string;
}

export const initialClients: ClientItem[] = [
  { id: "JEVXO-BD-001", name: "Apex Group Ltd", plan: "Growth", country: "Bangladesh", status: "Active", website: "apexgroup.com" },
  { id: "JEVXO-UK-042", name: "Vortex Agency Ltd", plan: "Business", country: "United Kingdom", status: "Active", website: "vortexagency.co.uk" },
  { id: "JEVXO-US-102", name: "Greenfield Biotech", plan: "Enterprise", country: "United States", status: "Active", website: "greenfieldbio.com" },
  { id: "JEVXO-AE-008", name: "Sands Real Estate", plan: "Starter", country: "United Arab Emirates", status: "Trial", website: "sandsrealestate.ae" },
  { id: "JEVXO-SG-015", name: "Apex Analytics Asia", plan: "Growth", country: "Singapore", status: "Expired", website: "apexanalytics.sg" },
];

export interface LeadItem {
  id: string;
  title: string;
  client: string;
  value: string;
  stage: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Negotiation" | "Won" | "Lost";
  score: number;
  contact: string;
}

export const initialLeads: LeadItem[] = [
  { id: "lead-1", title: "Corporate Portal Project", client: "Delta Corp", value: "$8,500", stage: "New", score: 92, contact: "Sarah Connor" },
  { id: "lead-2", title: "Custom Shopify Store", client: "Vogue Boutique", value: "$4,200", stage: "Contacted", score: 78, contact: "Diana Prince" },
  { id: "lead-3", title: "CRM & HRM Integration", client: "Finvest Group", value: "$12,000", stage: "Proposal Sent", score: 88, contact: "Bruce Wayne" },
  { id: "lead-4", title: "Mobile Fitness Tracker App", client: "ActiveLife LLC", value: "$15,000", stage: "Negotiation", score: 65, contact: "Clark Kent" },
  { id: "lead-5", title: "AI Search Bot Deploy", client: "Nexa AI Solutions", value: "$9,000", stage: "Won", score: 98, contact: "Tony Stark" },
];

export interface EmployeeItem {
  id: string;
  name: string;
  role: string;
  dept: string;
  attendance: "Present" | "On Leave" | "Absent";
  leaveBalance: number;
  performance: number;
}

export const initialEmployees: EmployeeItem[] = [
  { id: "emp-101", name: "Kabir Hossain", role: "Senior Developer", dept: "Engineering", attendance: "Present", leaveBalance: 12, performance: 94 },
  { id: "emp-102", name: "Tasnim Ara", role: "UI/UX Designer", dept: "Design", attendance: "Present", leaveBalance: 14, performance: 98 },
  { id: "emp-103", name: "Rahat Khan", role: "DevOps Engineer", dept: "Engineering", attendance: "On Leave", leaveBalance: 4, performance: 88 },
  { id: "emp-104", name: "Farhana Islam", role: "Content Marketer", dept: "Marketing", attendance: "Present", leaveBalance: 15, performance: 90 },
  { id: "emp-105", name: "Tanvir Ahmed", role: "Sales Exec Intern", dept: "Sales", attendance: "Present", leaveBalance: 8, performance: 85 },
];

export interface InvoiceItem {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Unpaid" | "Refunded";
  method: string;
}

export const initialInvoices: InvoiceItem[] = [
  { id: "INV-2026-001", date: "2026-06-01", amount: "$119.20", status: "Paid", method: "Credit Card" },
  { id: "INV-2026-042", date: "2026-05-01", amount: "$119.20", status: "Paid", method: "Credit Card" },
  { id: "INV-2026-098", date: "2026-04-01", amount: "$119.20", status: "Paid", method: "Credit Card" },
  { id: "INV-2026-112", date: "2026-03-01", amount: "$149.00", status: "Refunded", method: "Bank Transfer" },
];

export interface MarketingAssetItem {
  id: string;
  name: string;
  format: string;
  type: string;
}

export const marketingAssets: MarketingAssetItem[] = [
  { id: "banner-1", name: "Jevxo CRM Launch Poster", format: "PNG / 1200x630", type: "Social Media Banner" },
  { id: "banner-2", name: "HRM System Features Flyer", format: "PDF / A4 size", type: "Flyer Leaflet" },
  { id: "banner-3", name: "Country Partner Introductory Pitch", format: "PPTX / 16:9", type: "Sales Deck" },
  { id: "banner-4", name: "Ecosystem Promo Video (Full HD)", format: "MP4 / 60s", type: "Promo Video" },
];

export interface SalesLeaderboardItem {
  rank: number;
  name: string;
  xp: number;
  deals: number;
  targetProgress: number;
}

export const salesLeaderboard: SalesLeaderboardItem[] = [
  { rank: 1, name: "Tanvir Ahmed", xp: 4800, deals: 12, targetProgress: 95 },
  { rank: 2, name: "Rashedul Bari", xp: 4200, deals: 10, targetProgress: 88 },
  { rank: 3, name: "Ayesha Siddiqa", xp: 3900, deals: 9, targetProgress: 82 },
  { rank: 4, name: "Niaz Morshed", xp: 3100, deals: 7, targetProgress: 75 },
];
