"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Counter from "@/components/ui/Counter";
import { motion } from "framer-motion";
import { 
  Globe, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  GraduationCap, 
  Utensils, 
  Briefcase, 
  Rocket, 
  Zap, 
  Target, 
  Sparkles, 
  Map, 
  Building2, 
  Handshake, 
  Plug, 
  Laptop, 
  Mail, 
  Phone 
} from "lucide-react";
import { portfolioItems, portfolioCategories } from "@/lib/data/portfolio";
import { teamMembers, stats } from "@/lib/data/team";
import "./globals.css";


// Define Jevxo Solutions based on brief
const solutions = [
  { id: "1", title: "Custom Websites", desc: "High-performance marketing & corporate sites powered by Next.js.", icon: Globe, tag: "Website" },
  { id: "2", title: "E-commerce Engine", desc: "Headless commerce solutions with lightning-fast checkout flows.", icon: ShoppingCart, tag: "Ecommerce" },
  { id: "3", title: "Jevxo CRM", desc: "Lead tracking, pipeline visualizers, and conversion insights.", icon: BarChart3, tag: "CRM" },
  { id: "4", title: "Jevxo HRM", desc: "Staff attendance, leave management, and growth trackers.", icon: Users, tag: "HRM" },
  { id: "5", title: "Jevxo School", desc: "Student management, grading systems, and fee portals.", icon: GraduationCap, tag: "School" },
  { id: "6", title: "Jevxo Restaurant", desc: "POS integration, tables management, and digital menu builders.", icon: Utensils, tag: "Restaurant" },
  { id: "7", title: "Business Suite", desc: "General ERP, invoicing, and asset tracking for large operations.", icon: Briefcase, tag: "Business Mgmt" },
  { id: "8", title: "Marketing Hub", desc: "Automated social posting, email drip campaigns, and ROI tracking.", icon: Rocket, tag: "Marketing" },
];

// Jevxo Ventures
const ventures = [
  { title: "Jevxo Web", desc: "Global design & engineering studio crafting high-end SaaS applications and experiences.", icon: Zap, focus: "UI/UX & Engineering" },
  { title: "Jevxo School", desc: "E-learning and educational administrative networks serving institutions worldwide.", icon: GraduationCap, focus: "EdTech Systems" },
  { title: "Jevxo Restaurant", desc: "Unified kitchen management, order tracking, and table optimization platforms.", icon: Utensils, focus: "F&B SaaS Solutions" },
  { title: "Jevxo Business", desc: "Comprehensive Enterprise Resource Planning and logistics operating suites.", icon: Briefcase, focus: "Corporate ERP" },
  { title: "Jevxo Marketing", desc: "AI-driven automated marketing campaigns, SEO auditing, and ad management hubs.", icon: Target, focus: "Growth Automation" },
  { title: "Future Ventures", desc: "Investing in next-generation decentralized databases and AI-agent business systems.", icon: Sparkles, focus: "R&D and Ventures" },
];

// Interactive Network map dots
const networkNodes = [
  { id: "dhaka", name: "Bangladesh (HQ)", x: "72%", y: "48%", clients: "45+", partners: "12", websites: "120+", revenue: "$180k/yr" },
  { id: "london", name: "United Kingdom", x: "48%", y: "30%", clients: "32+", partners: "8", websites: "85+", revenue: "$240k/yr" },
  { id: "newyork", name: "United States", x: "28%", y: "32%", clients: "54+", partners: "15", websites: "140+", revenue: "$520k/yr" },
  { id: "dubai", name: "United Arab Emirates", x: "62%", y: "42%", clients: "22+", partners: "6", websites: "40+", revenue: "$150k/yr" },
  { id: "singapore", name: "Singapore", x: "78%", y: "58%", clients: "18+", partners: "5", websites: "30+", revenue: "$110k/yr" },
];

// Partner Programs
const partnerPrograms = [
  { role: "Country Partner", description: "Represent the Jevxo ecosystem in your nation. Earn exclusive high-yield commissions on regional signups.", commission: "30% Lifetime Share", icon: Map },
  { role: "Agency Partner", description: "Bundle our SaaS engine (CRM, HRM, School) under your agency's white-label banner or integration team.", commission: "25% Volume Rebate", icon: Building2 },
  { role: "Sales Partner", description: "Refer clients, manage regional sales agent pools, and win high-ticket incentives through gamified ranks.", commission: "15% per Conversion", icon: Handshake },
  { role: "Technology Partner", description: "Integrate your APIs, plugins, and hosting nodes directly into Jevxo's global application catalog.", commission: "Co-selling Support", icon: Plug },
];

const technologies = [
  {
    name: "JavaScript",
    color: "bg-[#f7df1e] hover:shadow-[#f7df1e]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#323330]">
        <path d="M1.9 1.9v20.2h20.2V1.9H1.9zm13.1 14.8c.3.9.9 1.5 2.1 1.5 1.1 0 1.8-.6 1.8-1.4 0-1-.8-1.3-2.1-1.9-1.9-.8-3.1-1.5-3.1-3.6 0-2 1.6-3.4 3.9-3.4 2 0 3.3.9 3.8 2.2l-1.8 1.1c-.3-.7-.9-1.1-1.9-1.1-1 0-1.5.5-1.5 1.1 0 .7.5 1 1.6 1.5 2.1.9 3.6 1.7 3.6 4.1 0 2.2-1.7 3.7-4.4 3.7-2.7 0-4.2-1.2-4.8-2.6l1.8-1.2zm-7.6 2.5c-.3.7-.8 1.1-1.7 1.1-1.1 0-1.8-.7-1.8-2.4V9.6H6.1v6c0 2.9 1.5 4.1 3.9 4.1 1 0 1.8-.3 2.3-.9l-.6-1.5c-.3.4-.6.6-1 .6z"/>
      </svg>
    )
  },
  {
    name: "Next.js",
    color: "bg-[#ffffff] hover:shadow-[#ffffff]/40 border border-slate-200",
    icon: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 fill-black">
        <path d="M106.1 106.1L64.3 54.3H49.5v39.4h9.9V67.8l32.9 44.9c4.2-3.1 8-6.9 11-11.2zM87.3 34.3h9.9v57.8L87.3 78.4V34.3z" />
      </svg>
    )
  },
  {
    name: "NestJS",
    color: "bg-[#ea2845] hover:shadow-[#ea2845]/30",
    icon: (
      <svg viewBox="0 0 256 255" className="w-8 h-8 fill-white">
        <path d="M128 0L24 54v70c0 68 44 131 104 148 60-17 104-80 104-148V54L128 0zm68 124c0 30-18 57-46 67v-38c16-5 28-20 28-38 0-22-18-40-40-40-40 0-40 18-40 40 0 18 12 33 28 38v38c-28-10-46-37-46-67 0-41 33-74 74-74s74 33 74 74z" />
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    color: "bg-[#38bdf8] hover:shadow-[#38bdf8]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    )
  },
  {
    name: "Docker",
    color: "bg-[#0db7ed] hover:shadow-[#0db7ed]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V9.006a.185.185 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.185.185 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.185.185 0 0 0 .186-.186V6.29a.185.185 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.186v1.887c0 .102.082.185.185.185m-2.953 2.715h2.119c.102 0 .185-.083.185-.185V9.006a.186.186 0 0 0-.185-.186h-2.119a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.954 0h2.119c.102 0 .185-.083.185-.185V9.006a.186.186 0 0 0-.185-.186H5.122a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.954 0h2.119c.101 0 .185-.083.185-.185V9.006a.185.185 0 0 0-.185-.186H2.168a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.954-2.716h2.119c.101 0 .185-.083.185-.185V6.29a.185.185 0 0 0-.185-.185H2.168a.185.185 0 0 0-.186.185v1.887c0 .102.084.185.186.185m5.908 0h2.119c.102 0 .185-.083.185-.185V6.29a.185.185 0 0 0-.185-.185H5.122a.185.185 0 0 0-.186.185v1.887c0 .102.084.185.186.185m-2.954-2.715h2.119c.102 0 .185-.083.185-.186V3.574a.186.186 0 0 0-.185-.185H2.168a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.213 11.23c-.116 0-.231.006-.345.018-.01.001-.018.01-.018.02v.759c0 .012.01.022.022.02.597-.044 1.189-.133 1.764-.265.011-.003.018-.013.016-.024l-.135-.506a.023.023 0 0 0-.022-.017c-.424.01-.851.015-1.282.015m21.037-3.112c-.522-.721-1.344-1.282-2.18-1.57a.126.126 0 0 0-.147.05c-.092.146-.178.29-.257.43a.126.126 0 0 0 .025.155c.677.587 1.127 1.298 1.344 2.118a.126.126 0 0 0 .121.094h1.026a.126.126 0 0 0 .123-.153 6.945 6.945 0 0 0-.055-1.124M23.991 12.63c-.1-.706-.525-2.228-2.23-3.17a.127.127 0 0 0-.174.053c-.118.204-.23.414-.336.63a.126.126 0 0 0 .034.156c1.37.973 1.637 2.21 1.69 2.766a.127.127 0 0 0 .126.115h1.017a.127.127 0 0 0 .125-.138c-.015-.145-.029-.283-.048-.422M8.887 17.206c-1.344 0-2.617-.291-3.69-.817a.026.026 0 0 0-.037.017l-.547.781a.026.026 0 0 0 .01.038c1.353.774 2.923 1.205 4.542 1.205 5.568 0 10.098-3.486 10.098-7.768v-.125c0-.014-.011-.025-.025-.025h-1.025a.025.025 0 0 0-.025.025v.062c0 3.733-4.148 6.643-9.301 6.643M1.144 14.51c.24 1.488.945 2.764 1.977 3.666a.026.026 0 0 0 .037-.004l.582-.58a.026.026 0 0 0 0-.037c-.822-.767-1.365-1.74-1.57-2.824a.026.026 0 0 0-.023-.021l-.98-.109a.027.027 0 0 0-.023.009z"/>
      </svg>
    )
  },
  {
    name: "Go Language",
    color: "bg-[#00acd7] hover:shadow-[#00acd7]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white font-black">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontFamily="sans-serif">GO</text>
      </svg>
    )
  },
  {
    name: "Amazon Web Services",
    color: "bg-[#232f3e] hover:shadow-[#232f3e]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M12.04 12.01c-.13-.39-.38-.72-.75-.98-.37-.26-.81-.39-1.32-.39-.52 0-.96.12-1.33.36-.37.24-.62.59-.75 1.04v.05c.13.43.39.76.77.99.38.23.82.35 1.32.35.53 0 .97-.13 1.32-.38.35-.25.59-.6.72-1.04zm7.98-2.61c-.55 0-1.05.15-1.51.45s-.77.72-.94 1.26v-1.5h-1.89v5.99h1.89v-3.15c0-.52.12-.92.36-1.18.24-.26.56-.39.95-.39.42 0 .72.13.91.4.19.27.28.66.28 1.17v3.16h1.91v-3.41c0-.98-.22-1.74-.67-2.28-.45-.55-1.05-.83-1.79-.83zm-14.86.37l1.09 3.03.95-3.03h2.02l-2.02 5.99h-1.93l-2.12-5.99h2.01zm4.84-.37c-.77 0-1.42.19-1.95.58-.53.39-.88.94-1.05 1.65h1.98c.09-.28.24-.49.46-.64.22-.15.48-.23.77-.23.36 0 .63.1.81.3.18.2.27.49.27.87v.34c-.38.01-.84.04-1.38.09-.64.06-1.17.21-1.59.45s-.63.63-.63 1.17c0 .52.18.92.54 1.21.36.29.84.44 1.44.44.59 0 1.09-.16 1.51-.48.42-.32.68-.78.78-1.38h.04v1.65h1.89v-3.87c0-1-.28-1.76-.84-2.27-.56-.52-1.35-.78-2.38-.78z"/>
        <path d="M2.57 19.34c4.01 2.37 9.38 2.65 14.15 1.04.53-.18.33-.94-.2-.8-.43.11-4.48.98-8.91-.49-3.23-1.07-5.99-3.26-6.68-4.23-.27-.38-.83.05-.36.48z" fill="#FF9900" />
        <path d="M17.26 18.06c-.19-.24-.65-.07-.56.24.23.83.47 1.83.21 2.62-.09.28.24.47.45.24.52-.57 1.22-1.63 1.04-2.8-.02-.12-.13-.23-.21-.3-.21-.19-.74-.23-.93 0z" fill="#FF9900" />
      </svg>
    )
  },
  {
    name: "Git & Version Control",
    color: "bg-[#f05032] hover:shadow-[#f05032]/40 shadow-lg shadow-[#f05032]/25 scale-110 relative z-10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M23.384 11.616L12.384.616a1.077 1.077 0 0 0-1.52 0l-2.616 2.616a.224.224 0 0 0 0 .316l2.126 2.126c.4-.2.8-.3 1.3-.3.9 0 1.7.5 2.1 1.3.4.4.6.9.6 1.5 0 .6-.2 1.1-.6 1.5l2.408 2.408c.5-.2 1.1-.2 1.6.1.7.4 1.1 1.1 1.1 2 0 .9-.4 1.6-1.1 2-.7.4-1.6.4-2.2 0-.7-.4-1.1-1.1-1.1-2 0-.5.1-1 .4-1.4l-2.428-2.428c-.4.3-.9.4-1.4.4-.5 0-1-.1-1.4-.4L8.334 14.8c.2.4.3.9.3 1.4 0 .9-.4 1.6-1.1 2-.7.4-1.6.4-2.2 0-.7-.4-1.1-1.1-1.1-2 0-.9.4-1.6 1.1-2 .5-.3 1-.3 1.5-.1l3.284-3.284c-.2-.4-.3-.9-.3-1.4 0-.6.2-1.1.6-1.5L8.134 6.2a.224.224 0 0 0-.316 0L.618 11.384a1.077 1.077 0 0 0 0 1.52l11 11a1.077 1.077 0 0 0 1.52 0l10.246-10.246a1.08 1.08 0 0 0 0-1.522z"/>
      </svg>
    ),
    isHighlighted: true
  },
  {
    name: "Terraform",
    color: "bg-[#7b42bc] hover:shadow-[#7b42bc]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M1.44 0v7.575L8 11.36V3.785L1.44 0zm0 8.71v7.575L8 20.07v-7.576L1.44 8.71zm14.56-4.925V11.36L22.56 7.575V0L16 3.785zm-7.28 6.335v7.576l6.56 3.784v-7.575l-6.56-3.785z"/>
      </svg>
    )
  },
  {
    name: "React",
    color: "bg-[#20232a] hover:shadow-[#61dafb]/30",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 fill-none stroke-[#61dafb] stroke-[1.2]">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    )
  }
];

// DevOps Workflow Animated Sub-components
function TerminalSnippet() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1500);
    const timer2 = setTimeout(() => setStep(2), 3000);
    const timer3 = setTimeout(() => setStep(3), 4500);
    const timerReset = setTimeout(() => setStep(0), 8000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerReset);
    };
  }, [step]);

  return (
    <div className="bg-slate-950 rounded-xl p-4 text-[11px] font-mono text-slate-300 border border-slate-800 shadow-inner h-28 flex flex-col justify-between">
      <div>
        <div className="flex gap-1.5 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <span className="w-2 h-2 rounded-full bg-[#eab308]" />
          <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
        </div>
        <p className="text-slate-400">
          <span className="text-pink-500">$</span> {step >= 0 ? "terraform init" : ""}
        </p>
        {step >= 1 && (
          <p className="text-emerald-400 ml-2 animate-pulse">
            Initializing the backend... Done.
          </p>
        )}
        {step >= 2 && (
          <p className="text-slate-400">
            <span className="text-pink-500">$</span> terraform apply
          </p>
        )}
        {step >= 3 && (
          <p className="text-emerald-400 ml-2">
            Apply complete! Resources: 3 added, 0 changed.
          </p>
        )}
      </div>
    </div>
  );
}

function PipelineVisualizer() {
  return (
    <div className="bg-slate-900/5 border border-slate-900/10 rounded-xl p-4 h-28 flex flex-col justify-center gap-3">
      <div>
        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
          <span>Build</span>
          <span className="text-violet-600">Complete</span>
        </div>
        <div className="w-full h-1.5 bg-slate-900/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-600 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
          <span>Test</span>
          <span className="text-pink-500">Success</span>
        </div>
        <div className="w-full h-1.5 bg-slate-900/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
          />
        </div>
      </div>
    </div>
  );
}

function RealTimeMonitoring() {
  const barHeights = [40, 65, 35, 80, 50, 75, 60];
  return (
    <div className="bg-slate-900/5 border border-slate-900/10 rounded-xl p-4 h-28 flex items-end justify-between relative overflow-hidden">
      <div className="absolute top-2 right-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
        <span className="text-[10px] font-bold text-cyan-600">99.9% UP</span>
      </div>
      {barHeights.map((h, i) => (
        <motion.div
          key={i}
          className="w-[10%] bg-gradient-to-t from-violet-600 to-pink-500 rounded-t-sm"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.15
          }}
        />
      ))}
    </div>
  );
}

function SecurityScanner() {
  return (
    <div className="bg-slate-900/5 border border-slate-900/10 rounded-xl p-4 h-28 flex items-center gap-4">
      <div className="relative w-14 h-14 rounded-full border border-violet-600/20 flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-600/30 to-transparent"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="w-7 h-7 rounded-full border-2 border-pink-500"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-xs font-bold text-slate-800">Scanner Engine</div>
        <div className="text-[10px] text-violet-600 font-semibold uppercase tracking-wider animate-pulse">Scanning...</div>
      </div>
    </div>
  );
}

function DeploymentConsole() {
  return (
    <div className="bg-slate-900/5 border border-slate-900/10 rounded-xl p-3.5 h-28 flex flex-col justify-between">
      <div className="flex justify-between items-center text-[10px]">
        <span className="flex items-center gap-1 text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          Production
        </span>
        <span className="text-slate-500 font-semibold">v2.4.0</span>
      </div>
      <motion.button
        className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-xs shadow-md hover:shadow-violet-600/15 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={{ boxShadow: ["0 0 0px rgba(124,58,237,0)", "0 0 10px rgba(124,58,237,0.3)", "0 0 0px rgba(124,58,237,0)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Deploy Now
      </motion.button>
    </div>
  );
}

function ScalableArchitecture() {
  return (
    <div className="bg-slate-900/5 border border-slate-900/10 rounded-xl p-4 h-28 flex items-center justify-around relative">
      <div className="flex flex-col items-center gap-1 z-10">
        <div className="w-7 h-7 rounded-lg bg-violet-600/10 border border-violet-600/30 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
          </svg>
        </div>
        <span className="text-[9px] font-bold text-slate-600">Primary</span>
      </div>

      <div className="absolute left-[35%] right-[35%] top-[42%] h-0.5 bg-slate-900/10 z-0">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-pink-500 absolute top-[-2.5px]"
          animate={{ left: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="flex flex-col items-center gap-1 z-10">
        <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
          </svg>
        </div>
        <span className="text-[9px] font-bold text-slate-600">Replica</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("annually");

  // Dynamic CMS States
  const [heroTitle, setHeroTitle] = useState("The Digital Operating||System for Global Ventures");
  const [heroDesc, setHeroDesc] = useState("A unified suite of business management platforms, CRM systems, automated growth centers, and enterprise hosting packages. Build, scale, and automate your company.");
  const [heroTag, setHeroTag] = useState("Jevxo Ecosystem Version 1.0 Live");
  const [nodes, setNodes] = useState(networkNodes);
  const [selectedNode, setSelectedNode] = useState<typeof networkNodes[0] | null>(null);
  const [activeSolutions, setActiveSolutions] = useState(solutions);
  const [plans, setPlans] = useState([
    { name: "Starter", price: 29, desc: "For single freelancers or startups", features: ["1 Active Website", "Basic CRM Tracker", "5 Team Seats", "Storage up to 5GB", "Shared Hosting Node"] },
    { name: "Business", price: 79, desc: "For growing regional businesses", features: ["3 Active Websites", "CRM + Automated Reminders", "25 Team Seats", "Storage up to 25GB", "Dedicated Hosting Node", "Intern Evaluators"] },
    { name: "Growth", price: 149, desc: "For scaling multi-region brands", features: ["10 Active Websites", "CRM + Kanban + AI Lead Score", "Unlimited Team Seats", "Storage up to 100GB", "E-commerce Engine Integration", "Basic Marketing Hub (1-4)"] },
    { name: "Enterprise", price: 299, desc: "For global operations and networks", features: ["Unlimited Websites", "All 6 Dashboard Panels", "Custom White-labeling", "Enterprise SLA & Support", "Marketing Hub (All 13 Modules)", "Country Domain Multi-routing"] },
  ]);

  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", type: "Sales", budget: "$1k - $5k", message: "" });

  // Load from local storage if available
  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.heroTitle && typeof parsed.heroTitle === "string" && parsed.heroTitle.trim() !== "") setHeroTitle(parsed.heroTitle);
        if (parsed.heroDesc && typeof parsed.heroDesc === "string" && parsed.heroDesc.trim() !== "") setHeroDesc(parsed.heroDesc);
        if (parsed.heroTag && typeof parsed.heroTag === "string" && parsed.heroTag.trim() !== "") setHeroTag(parsed.heroTag);
        if (parsed.networkNodes) {
          setNodes(parsed.networkNodes);
          if (parsed.networkNodes.length > 0) {
            setSelectedNode(parsed.networkNodes[0]);
          }
        }
        if (parsed.pricingPlans) setPlans(parsed.pricingPlans);
      } catch (e) {
        console.error("Failed to parse CMS data", e);
      }
    } else {
      if (networkNodes.length > 0) {
        setSelectedNode(networkNodes[0]);
      }
    }
  }, []);

  // Update selectedNode if nodes list gets populated/reset
  useEffect(() => {
    if (!selectedNode && nodes.length > 0) {
      setSelectedNode(nodes[0]);
    }
  }, [nodes, selectedNode]);

  const filteredPortfolio = activeCategory === "All"
    ? portfolioItems.filter(item => item.featured)
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg = {
      id: `msg_${Date.now()}`,
      name: contactForm.name,
      email: contactForm.email,
      type: contactForm.type,
      budget: contactForm.budget,
      message: contactForm.message,
      submittedAt: new Date().toISOString()
    };
    try {
      const stored = localStorage.getItem("jevxo_contact_messages");
      const current = stored ? JSON.parse(stored) : [];
      localStorage.setItem("jevxo_contact_messages", JSON.stringify([newMsg, ...current]));
    } catch (err) {
      console.error(err);
    }
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", type: "Sales", budget: "$1k - $5k", message: "" });
    }, 5000);
  };

  return (
    <div className="relative bg-white text-slate-900 min-h-screen">
      <Navbar />

      {/* ── 1. HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-36 pb-20 bg-gradient-to-b from-violet-50 via-white to-slate-50">
        <div className="absolute w-[600px] h-[600px] -top-36 -right-24 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none opacity-60 animate-float" />
        <div className="absolute w-[450px] h-[450px] -bottom-36 -left-12 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none opacity-50" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-[800px] mx-auto text-center">
            <ScrollReveal variant="slideDown" delay={100}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-600/30 bg-violet-600/10 text-xs font-semibold text-violet-700 mb-7 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-ping" />
                {heroTag}
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slideUp" delay={300}>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-7 leading-none text-slate-900">
                {heroTitle.includes("||") ? (
                  <>
                    {heroTitle.split("||")[0]}<br />
                    <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">{heroTitle.split("||")[1]}</span>
                  </>
                ) : (
                  <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">{heroTitle}</span>
                )}
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="slideUp" delay={500}>
              <p className="text-base md:text-xl text-slate-600 leading-relaxed max-w-[620px] mx-auto mb-10">
                {heroDesc}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="slideUp" delay={700}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/portal" className="px-9 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200">
                  Access Portal Login →
                </Link>
                <a href="#solutions" onClick={(e) => { e.preventDefault(); document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" }); }} className="px-9 py-4 rounded-2xl font-bold text-base bg-slate-900/5 border border-slate-900/10 text-slate-900 hover:bg-slate-900/10 transition-all duration-200">
                  Explore Solutions
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 2. THE HUB & LIVE STATS ─────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-white/50" id="the-hub">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="slideRight" duration={800}>
              <div>
                <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                  The Hub
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
                  One Core Vision.<br />
                  <span className="bg-gradient-to-br from-pink-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">Unlimited Scale.</span>
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-5">
                  Jevxo is designed to act as the primary operational engine for next-gen ventures. Our mission is to integrate website deployment, customer relations, employee productivity, partner tracking, and localized sales networks into one singular product architecture.
                </p>
                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  No more duct-taping ten different software applications. Jevxo is a coherent ecosystem that empowers small enterprises and country-level agencies alike.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="border-l-2 border-violet-600 pl-4">
                    <div className="text-sm font-bold text-slate-900 mb-1">Global Framework</div>
                    <p className="text-xs text-slate-500 leading-relaxed">Built to operate seamlessly across borders and currencies.</p>
                  </div>
                  <div className="border-l-2 border-cyan-500 pl-4">
                    <div className="text-sm font-bold text-slate-900 mb-1">Integrated Automation</div>
                    <p className="text-xs text-slate-500 leading-relaxed">Pre-wired pipelines automate data syncs between departments.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stats.map((st, idx) => (
                <ScrollReveal key={idx} variant="scaleUp" delay={idx * 150} duration={600} className="h-full">
                  <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:-translate-y-1.5 transition-all duration-300 p-7 rounded-2xl flex flex-col gap-2 h-full hover:shadow-lg hover:shadow-violet-600/5">
                    <div className={`text-4xl md:text-5xl font-black leading-none ${idx % 2 === 0 ? "text-violet-600" : "text-cyan-600"}`}>
                      <Counter value={st.value} suffix={st.suffix} />
                    </div>
                    <div className="text-sm font-bold text-slate-900">{st.label}</div>
                    <p className="text-xs text-slate-500 leading-normal">{st.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SOLUTIONS GRID ─────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 relative" id="solutions">
        <div className="absolute w-[300px] h-[300px] top-24 -right-24 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none opacity-30" />
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-16">
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                Solutions
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Tailored Systems for <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Every Department</span>
              </h2>
              <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
                Explore the individual SaaS modules that can be activated instantly inside your Jevxo Client portal.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {activeSolutions.map((sol, idx) => (
              <ScrollReveal key={sol.id} variant="slideUp" delay={idx * 100} duration={500} className="h-full">
                <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-8 rounded-2xl flex flex-col h-full">
                  <div className="text-violet-600 mb-4 transition-transform duration-300 hover:scale-125 hover:rotate-6 w-fit">
                    <sol.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">{sol.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">{sol.desc}</p>
                  <div className="inline-flex text-xs font-semibold text-violet-700 bg-violet-600/10 px-2.5 py-1 rounded-md w-fit">
                    {sol.tag}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="slideUp" delay={300}>
            <div className="text-center mt-10">
              <Link href="/products" className="inline-block px-7 py-3 rounded-lg bg-violet-600/10 border border-violet-600/30 text-violet-700 font-bold text-sm hover:bg-violet-600/20 transition-all duration-200">
                Explore Our Software Products →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3.5. INTEGRATIONS & TECH STACK ─────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-gradient-to-b from-white via-violet-50/20 to-white relative overflow-hidden" id="tech-stack">
        <div className="absolute w-[400px] h-[400px] -top-24 -left-24 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] -bottom-24 -right-24 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
        
        <div className="w-11/12 max-w-[1400px] mx-auto text-center relative z-10">
          <ScrollReveal variant="slideUp">
            <div className="inline-block py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 mb-7 uppercase tracking-wider">
              Integrations
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Technology Stack for <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Maximum Efficiency</span>
            </h2>
            <p className="text-slate-600 max-w-[620px] mx-auto mt-4 text-base leading-relaxed mb-10">
              Jevxo leverages leading technologies and platforms, ensuring robust, high-performance, and scalable solutions for modern enterprises.
            </p>
            
            <div className="mb-14">
              <Link href="/about" className="inline-block py-4 px-10 rounded-[14px] font-bold text-[17px] bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-200">
                View About Jevxo
              </Link>
            </div>
          </ScrollReveal>

          {/* Row of Technology Circles */}
          <ScrollReveal variant="scaleUp" delay={200}>
            <div className="flex items-center justify-center gap-6 md:gap-7 flex-wrap max-w-5xl mx-auto px-4 py-8">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="group relative flex flex-col items-center"
                >
                  <div
                    className={`w-[68px] h-[68px] md:w-[76px] md:h-[76px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 select-none ${tech.color} ${
                      tech.isHighlighted 
                        ? "shadow-[0_0_25px_rgba(240,80,50,0.4)] animate-pulse" 
                        : "shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-lg"
                    }`}
                  >
                    <div className="transform transition-transform duration-300 group-hover:rotate-12">
                      {tech.icon}
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-3 scale-0 group-hover:scale-100 transition-all duration-150 bg-slate-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30">
                    {tech.name}
                    {/* Tooltip Arrow */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-900" />
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Bridge link to Our Process */}
          <ScrollReveal variant="slideUp" delay={400} className="mt-14">
            <Link
              href="/process"
              className="inline-flex items-center gap-2.5 py-2.5 px-6 rounded-full border border-slate-900/10 bg-slate-900/[0.03] text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-900/[0.06] hover:border-slate-900/25 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Our Process
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 3.6. DEVOPS WORKFLOW ────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden" id="devops-workflow">
        <div className="absolute w-[500px] h-[500px] -top-36 -right-24 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] -bottom-36 -left-24 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
        
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-10">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-16">
              <div className="inline-block py-1.5 px-4 rounded-full border border-pink-500/20 bg-pink-500/[0.04] text-xs font-bold text-pink-700 mb-6 uppercase tracking-wider">
                DevOps Workflow
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
                Smarter Dev, <span className="bg-gradient-to-br from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">Supercharged By DevOps</span>
              </h2>
              <p className="text-slate-600 max-w-[620px] mx-auto mt-4 text-base leading-relaxed">
                From code to cloud, we optimize every step of your software lifecycle for speed, security, and scalability.
              </p>
            </div>
          </ScrollReveal>

          {/* Top Row Grid (3 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Infrastructure */}
            <ScrollReveal variant="slideUp" delay={100} className="h-full">
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Infrastructure <span className="italic font-serif text-violet-600 font-normal">As Code</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Provision resources instantly with terraform blueprints.
                  </p>
                </div>
                <TerminalSnippet />
              </div>
            </ScrollReveal>

            {/* Card 2: CI/CD */}
            <ScrollReveal variant="slideUp" delay={200} className="h-full">
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    CI/CD <span className="italic font-serif text-pink-500 font-normal">Automated Pipelines</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Ship features faster with automated test and deploy workflows.
                  </p>
                </div>
                <PipelineVisualizer />
              </div>
            </ScrollReveal>

            {/* Card 3: Monitoring */}
            <ScrollReveal variant="slideUp" delay={300} className="h-full">
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Real-time <span className="italic font-serif text-cyan-600 font-normal">Monitoring</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Gain deep insights into system health and performance.
                  </p>
                </div>
                <RealTimeMonitoring />
              </div>
            </ScrollReveal>
          </div>

          {/* Central Connecting Hub */}
          <div className="hidden md:flex items-center justify-center py-8 my-4 relative">
            {/* Left Curve SVG */}
            <div className="absolute right-[50%] left-0 h-16 flex items-center">
              <svg className="w-full h-full" viewBox="0 0 500 64" fill="none" preserveAspectRatio="none">
                <path d="M 0,0 Q 200,32 460,32" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M 0,64 Q 200,32 460,32" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.3" />
                {/* Moving dot */}
                <motion.circle
                  r="3.5"
                  fill="#7c3aed"
                  animate={{ cx: [0, 460], cy: [0, 32] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  r="3.5"
                  fill="#db2777"
                  animate={{ cx: [0, 460], cy: [64, 32] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </svg>
            </div>
            
            {/* Central Rocket Orb */}
            <motion.div 
              className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-violet-600/30 z-10 relative"
              animate={{ boxShadow: ["0 0 15px rgba(124,58,237,0.3)", "0 0 30px rgba(124,58,237,0.6)", "0 0 15px rgba(124,58,237,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
                <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.5 2.5 6l1.5-1.5C5.5 15.5 5 14 5 12c0-4 3-7 7-7s7 3 7 7c0 2-.5 3.5-1 4.5l1.5 1.5c1.5-1.5 2.5-3.5 2.5-6 0-5.5-4.5-10-10-10z" />
                <path d="M16.5 4.5c1.25-1.5 3.5-2.5 3.5-2.5s-1 2.25-2.5 3.5" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </motion.div>

            {/* Right Curve SVG */}
            <div className="absolute left-[50%] right-0 h-16 flex items-center">
              <svg className="w-full h-full" viewBox="0 0 500 64" fill="none" preserveAspectRatio="none">
                <path d="M 40,32 Q 300,32 500,0" stroke="#db2777" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M 40,32 Q 300,32 500,64" stroke="#db2777" strokeWidth="1.5" strokeOpacity="0.3" />
                {/* Moving dot */}
                <motion.circle
                  r="3.5"
                  fill="#db2777"
                  animate={{ cx: [40, 500], cy: [32, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                <motion.circle
                  r="3.5"
                  fill="#7c3aed"
                  animate={{ cx: [40, 500], cy: [32, 64] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                />
              </svg>
            </div>
          </div>

          {/* Bottom Row Grid (3 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 4: Security */}
            <ScrollReveal variant="slideUp" delay={100} className="h-full">
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Security <span className="italic font-serif text-violet-600 font-normal">DevSecOps</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Automated vulnerability scanning at every commit.
                  </p>
                </div>
                <SecurityScanner />
              </div>
            </ScrollReveal>

            {/* Card 5: Rapid Deployment */}
            <ScrollReveal variant="slideUp" delay={200} className="h-full">
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Rapid <span className="italic font-serif text-pink-500 font-normal">Deployment</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Zero-downtime deployments to production environments.
                  </p>
                </div>
                <DeploymentConsole />
              </div>
            </ScrollReveal>

            {/* Card 6: Scalable Architecture */}
            <ScrollReveal variant="slideUp" delay={300} className="h-full">
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Scalable <span className="italic font-serif text-cyan-600 font-normal">Architecture</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Database and service scaling that grows with you.
                  </p>
                </div>
                <ScalableArchitecture />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 4. VENTURES ───────────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-white/50 relative" id="ventures">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-16">
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                Ventures
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Our Ecosystem of <span className="bg-gradient-to-br from-pink-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">Active Enterprises</span>
              </h2>
              <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
                Jevxo operates specialized subsidiary companies, each dedicated to engineering and managing specific industries.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {ventures.map((v, idx) => (
              <ScrollReveal key={idx} variant="slideUp" delay={idx * 150} duration={600} className="h-full">
                <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-8 rounded-2xl flex gap-5 group h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 text-white shadow-md shadow-violet-600/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <v.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{v.title}</h3>
                    <div className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-3">{v.focus}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. NETWORK MAP WIDGET ─────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 overflow-hidden" id="network">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-16">
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                Global Network
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Active Jevxo <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Ecosystem Map</span>
              </h2>
              <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
                Hover over or click on our operational centers to see active statistics and client volumes.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            {/* SVG Map Container */}
            <ScrollReveal variant="slideLeft" duration={800} className="lg:col-span-3">
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 relative p-5 rounded-2xl h-[420px] overflow-hidden flex items-center justify-center">
                {/* Fake SVG World Map Background */}
                <svg viewBox="0 0 1000 500" className="w-full h-full opacity-15 pointer-events-none">
                  <path d="M150,150 Q170,120 200,130 T250,160 T300,120 T350,150 T400,110 T450,130 T500,160 T550,130 T600,160 T650,120 T700,140 T750,120 T800,150 T850,130 T900,170" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M100,280 Q130,240 180,260 T250,230 T320,270 T400,220 T480,260 T550,230 T620,280 T700,240 T780,290 T850,250 T920,300" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                  <circle cx="150" cy="180" r="10" fill="#94a3b8" opacity="0.2" />
                  <circle cx="320" cy="220" r="15" fill="#94a3b8" opacity="0.2" />
                  <circle cx="550" cy="160" r="12" fill="#94a3b8" opacity="0.2" />
                  <circle cx="780" cy="250" r="18" fill="#94a3b8" opacity="0.2" />
                </svg>

                {/* Interactive Nodes */}
                {nodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      onMouseEnter={() => setSelectedNode(node)}
                      className="absolute cursor-pointer p-0 border-0 bg-transparent z-10 -translate-x-1/2 -translate-y-1/2 group/node"
                      style={{ left: node.x, top: node.y }}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Pulsing Radar Rings */}
                        {isSelected ? (
                          <>
                            <span className="absolute w-8 h-8 rounded-full bg-violet-600/40 animate-radar pointer-events-none" />
                            <span className="absolute w-12 h-12 rounded-full bg-violet-600/20 animate-radar pointer-events-none [animation-delay:0.5s]" />
                          </>
                        ) : (
                          <span className="absolute w-5 h-5 rounded-full bg-cyan-500/30 animate-radar pointer-events-none group-hover/node:scale-125" />
                        )}

                        <span className={`block rounded-full transition-all duration-300 relative z-10 ${
                          isSelected
                            ? "w-4 h-4 bg-violet-600 shadow-[0_0_20px_#7c3aed]"
                            : "w-2.5 h-2.5 bg-cyan-500 shadow-[0_0_10px_#06b6d4] group-hover/node:scale-125"
                        }`} />
                      </div>
                      <span className={`absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold mt-1.5 transition-all duration-300 ${
                        isSelected 
                          ? "opacity-100 text-violet-700 font-bold translate-y-0.5" 
                          : "opacity-60 text-slate-500 translate-y-0"
                      }`}>
                        {node.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Selected Node Details Card */}
            <ScrollReveal variant="slideRight" duration={800} className="lg:col-span-2">
              <div>
                {selectedNode ? (
                  <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-10 rounded-2xl border-violet-600/20">
                    <div className="flex items-center gap-2.5 mb-5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                      <span className="text-xs font-bold text-violet-700 uppercase tracking-wider">Node Statistics</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-6">{selectedNode.name}</h3>

                    <div className="grid grid-cols-2 gap-5 mb-8">
                      <div>
                        <div className="text-xs text-slate-500">Active Websites</div>
                        <div className="text-2xl font-bold text-slate-900">{selectedNode.websites}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Clients Base</div>
                        <div className="text-2xl font-bold text-slate-900">{selectedNode.clients}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Country Partners</div>
                        <div className="text-2xl font-bold text-slate-900">{selectedNode.partners}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Annual Revenue</div>
                        <div className="text-2xl font-bold text-cyan-600">{selectedNode.revenue}</div>
                      </div>
                    </div>

                    <Link href="/portal" className="block text-center py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-bold text-sm text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200">
                      Launch Regional Portal →
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-10 rounded-2xl text-center text-slate-500">
                    Select a node on the map to inspect live metrics.
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 6. PARTNERS ───────────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-white/50" id="partners">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-16">
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                Partners Program
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Earn Commissions with <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Jevxo Global</span>
              </h2>
              <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
                We collaborate with individuals, tech stack developers, agencies, and regional leaders. Explore options below.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {partnerPrograms.map((p, idx) => (
              <ScrollReveal key={idx} variant="slideUp" delay={idx * 120} duration={500} className="h-full">
                <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-8 rounded-2xl flex flex-col h-full">
                  <div className="text-violet-600 mb-4 transition-transform duration-300 hover:scale-125 hover:rotate-6 w-fit">
                    <p.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">{p.role}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">{p.description}</p>
                  <div className="border-t border-slate-900/5 pt-4 flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-semibold">INCENTIVE:</span>
                    <span className="text-sm text-cyan-600 font-bold">{p.commission}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SHOWCASE (PORTFOLIO) ───────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10" id="showcase">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <ScrollReveal variant="slideUp">
            <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
              <div>
                <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                  Showcase
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                  Proven Digital <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Deliverables</span>
                </h2>
              </div>
              {/* Category Filter Pills */}
              <div className="flex gap-2 flex-wrap">
                {portfolioCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${activeCategory === cat
                      ? "border-violet-600/30 bg-violet-600/10 text-violet-700"
                      : "border-slate-900/10 bg-slate-900/5 text-slate-600 hover:text-slate-950"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, idx) => (
              <ScrollReveal
                key={item.id + "_" + activeCategory}
                variant="scaleUp"
                delay={idx * 100}
                duration={500}
                className="h-full"
              >
                <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 rounded-2xl overflow-hidden flex flex-col h-full group">
                  {/* Image Placeholder with Gradients */}
                  <div className="h-[200px] bg-gradient-to-br from-violet-100 to-cyan-50 flex items-center justify-center relative border-b border-slate-900/5 overflow-hidden">
                    <Laptop className="w-12 h-12 text-violet-600 opacity-80 group-hover:scale-125 group-hover:rotate-6 transition-all duration-350" />
                    <div className="absolute bottom-4 left-4 bg-white/90 border border-slate-900/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                    <div className="text-xs text-slate-500 mb-4">Client: {item.client} | {item.year}</div>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.tags.map((t) => (
                        <span key={t} className="px-2 py-1 rounded bg-slate-900/5 border border-slate-900/10 text-[10px] font-semibold text-slate-600">{t}</span>
                      ))}
                    </div>

                    <div className="border-t border-slate-900/5 pt-4 text-xs">
                      <span className="text-violet-600 font-bold">Result: </span>
                      <span className="text-slate-600">{item.result}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. TEAM SECTION ───────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-white/50" id="team">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-16">
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                Our Team
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Ecosystem <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Architects & Leadership</span>
              </h2>
              <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
                The developers, system operators, designers, and growth experts building the core Jevxo core framework.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((m, idx) => (
              <ScrollReveal key={m.id} variant="slideUp" delay={idx * 120} duration={600} className="h-full">
                <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-7 rounded-2xl text-center group h-full flex flex-col justify-between">
                  <div>
                    {/* Fake Avatar */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-white shadow-md shadow-violet-600/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-350">
                      {m.name.charAt(0)}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{m.name}</h3>
                    <div className="text-xs font-semibold text-cyan-600 mb-3 uppercase tracking-wider">{m.role}</div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-5">{m.bio}</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    {m.linkedin && <a href={m.linkedin} className="text-xs text-slate-400 hover:text-violet-600 transition-colors">LinkedIn</a>}
                    {m.twitter && <a href={m.twitter} className="text-xs text-slate-400 hover:text-violet-600 transition-colors">Twitter</a>}
                    {m.github && <a href={m.github} className="text-xs text-slate-400 hover:text-violet-600 transition-colors">GitHub</a>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9 & 10. PRICING & HOSTING PLANS ───────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10" id="pricing">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <ScrollReveal variant="slideUp">
            <div className="text-center mb-12">
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                Pricing
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Transparent <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Software & Hosting</span> Rates
              </h2>
              <p className="text-slate-600 max-w-[580px] mx-auto mt-4 text-base">
                Select between monthly billing or save 20% on annual commitments.
              </p>

              {/* Monthly / Annual Toggle */}
              <div className="inline-flex bg-slate-900/5 border border-slate-900/10 p-1 rounded-full mt-8">
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${billingPeriod === "monthly" ? "bg-violet-600 text-white shadow" : "text-slate-600 hover:text-slate-900"
                    }`}
                >Monthly</button>
                <button
                  onClick={() => setBillingPeriod("annually")}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${billingPeriod === "annually" ? "bg-violet-600 text-white shadow" : "text-slate-600 hover:text-slate-900"
                    }`}
                >Annually (Save 20%)</button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideUp" delay={150}>
            <h3 className="text-xl font-bold mb-6 text-slate-900 text-center">
              1. Software Suite Plans
            </h3>
          </ScrollReveal>
          
          {/* Software plans grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {plans.map((p, idx) => {
              const actualPrice = billingPeriod === "annually" ? Math.floor(p.price * 0.8) : p.price;
              const isRecommended = idx === 2;
              return (
                <ScrollReveal key={idx} variant="slideUp" delay={idx * 100} duration={600} className="h-full">
                  <div className={`bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-8 rounded-2xl relative h-full flex flex-col justify-between ${isRecommended ? "border-violet-600 bg-violet-600/5 shadow-md shadow-violet-600/5" : ""}`}>
                    <div>
                      {isRecommended && (
                        <span className="absolute -top-3 right-5 bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider animate-bounce">Recommended</span>
                      )}
                      <h4 className="text-lg font-bold mb-2 text-slate-900">{p.name}</h4>
                      <p className="text-xs text-slate-500 mb-6 min-h-[38px]">{p.desc}</p>

                      <div className="mb-7">
                        <span className="text-3xl font-extrabold text-slate-900">${actualPrice}</span>
                        <span className="text-xs text-slate-500"> / mo</span>
                      </div>
                    </div>

                    <div>
                      <Link href="/portal" className={`block text-center py-2.5 rounded-lg font-bold text-xs mb-7 border transition-all duration-200 ${isRecommended
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 border-transparent"
                        : "bg-slate-900/5 border-slate-900/10 text-slate-700 hover:bg-slate-900/10"
                        }`}>
                        Get Started
                      </Link>

                      <ul className="flex flex-col gap-3 text-xs text-slate-600">
                        {p.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <span className="text-cyan-600 font-bold">✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal variant="slideUp" delay={200}>
            <h3 className="text-xl font-bold mb-6 text-slate-900 text-center">
              2. Dedicated Hosting Plans
            </h3>
          </ScrollReveal>

          {/* Hosting plans grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Starter Cloud Node", price: 15, bandwidth: "500 GB Bandwidth", space: "10 GB NVMe Storage", db: "1 MariaDB / PG Database", ssl: "Free SSL certificate" },
              { name: "Business Cloud Node", price: 45, bandwidth: "2.5 TB Bandwidth", space: "80 GB NVMe Storage", db: "10 Databases", ssl: "Free Wildcard SSL + Cloudflare CDN" },
              { name: "Enterprise Dedicated Server", price: 120, bandwidth: "Unlimited Bandwidth", space: "500 GB NVMe SSD Storage", db: "Unlimited Databases", ssl: "Advanced DDoS Mitigation & Load Balancing" },
            ].map((p, idx) => {
              const actualPrice = billingPeriod === "annually" ? Math.floor(p.price * 0.8) : p.price;
              return (
                <ScrollReveal key={idx} variant="slideUp" delay={idx * 150} duration={600} className="h-full">
                  <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/40 hover:shadow-xl hover:shadow-violet-600/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 p-8 rounded-2xl h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-slate-900">{p.name}</h4>
                      <div className="mb-6">
                        <span className="text-3xl font-extrabold text-slate-900">${actualPrice}</span>
                        <span className="text-xs text-slate-500"> / mo</span>
                      </div>

                      <ul className="flex flex-col gap-3 text-xs text-slate-600 mb-7">
                        <li>📊 {p.bandwidth}</li>
                        <li>💾 {p.space}</li>
                        <li>🗄️ {p.db}</li>
                        <li>🔒 {p.ssl}</li>
                        <li>🛡️ 99.99% Uptime Guarantee</li>
                      </ul>
                    </div>

                    <Link href="/portal" className="block text-center py-2.5 rounded-lg bg-slate-900/5 border border-slate-900/10 font-bold text-xs text-slate-700 hover:bg-slate-900/10 transition-colors">
                      Provision Node
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 11. CONTACT FORM ──────────────────────────────────────────── */}
      <section className="py-24 border-t border-slate-900/10 bg-white/50" id="contact">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="slideRight" duration={800}>
              <div>
                <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                  Contact Us
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900">
                  Let&apos;s Build Something <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Exceptional</span>
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  Have questions regarding Jevxo licensing, agency partner White-labeling programs, or dedicated enterprise cloud deployments? Write to our core development and leadership squad.
                </p>

                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3.5 group">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-violet-600/10 text-violet-600 group-hover:scale-110 transition-transform duration-200">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ecosystem Sales</div>
                      <div className="text-sm font-semibold text-slate-900">sales@jevxo.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5 group">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-cyan-500/10 text-cyan-600 group-hover:scale-110 transition-transform duration-200">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Global Headquarters</div>
                      <div className="text-sm font-semibold text-slate-900">+880 1700 000000</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slideLeft" duration={800}>
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/20 hover:shadow-lg transition-all duration-300 p-10 rounded-2xl">
                {contactSubmitted ? (
                  <div className="text-center py-10 animate-[fadeIn_0.5s_ease]">
                    <div className="text-5xl mb-4">✉️</div>
                    <h3 className="text-xl font-bold text-cyan-600 mb-2">Message Logged!</h3>
                    <p className="text-slate-500 text-sm">Thank you. Our sales engineers will reach out to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-violet-600 uppercase mb-2">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-violet-600 uppercase mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="type" className="block text-xs font-bold text-violet-600 uppercase mb-2">Inquiry Type</label>
                        <select
                          id="type"
                          value={contactForm.type}
                          onChange={(e) => setContactForm({ ...contactForm, type: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                        >
                          <option value="Sales">Ecosystem Sales</option>
                          <option value="WhiteLabel">White-Labeling Program</option>
                          <option value="Support">Technical Support</option>
                          <option value="Hosting">Dedicated Hosting</option>
                          <option value="Career">Career Form</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-xs font-bold text-violet-600 uppercase mb-2">Monthly Budget</label>
                        <select
                          id="budget"
                          value={contactForm.budget}
                          onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                        >
                          <option value="$1k - $5k">$1,000 - $5,000</option>
                          <option value="$5k - $15k">$5,000 - $15,000</option>
                          <option value="$15k+">$15,000+ / Custom Enterprise</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-7">
                      <label htmlFor="message" className="block text-xs font-bold text-violet-600 uppercase mb-2">Message / Details</label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}