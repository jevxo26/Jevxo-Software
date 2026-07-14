"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import DevOpsSection from "@/components/sections/DevOpsSection";
import VenturesSection from "@/components/sections/VenturesSection";
import NetworkSection from "@/components/sections/NetworkSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ShowcaseSection from "@/components/sections/ShowcaseSection";
import TeamSection from "@/components/sections/TeamSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";
import "./globals.css";

// Interactive Network map dots
const networkNodes = [
  { id: "dhaka", name: "Bangladesh (HQ)", x: "72%", y: "48%", clients: "45+", partners: "12", websites: "120+", revenue: "$180k/yr" },
  { id: "london", name: "United Kingdom", x: "48%", y: "30%", clients: "32+", partners: "8", websites: "85+", revenue: "$240k/yr" },
  { id: "newyork", name: "United States", x: "28%", y: "32%", clients: "54+", partners: "15", websites: "140+", revenue: "$520k/yr" },
  { id: "dubai", name: "United Arab Emirates", x: "62%", y: "42%", clients: "22+", partners: "6", websites: "40+", revenue: "$150k/yr" },
  { id: "singapore", name: "Singapore", x: "78%", y: "58%", clients: "18+", partners: "5", websites: "30+", revenue: "$110k/yr" },
];

export default function HomePage() {
  // Dynamic CMS States
  const [nodes, setNodes] = useState(networkNodes);
  const [selectedNode, setSelectedNode] = useState<typeof networkNodes[0] | null>(null);
  const [plans, setPlans] = useState([
    { name: "Starter", price: 29, desc: "For single freelancers or startups", features: ["1 Active Website", "Basic CRM Tracker", "5 Team Seats", "Storage up to 5GB", "Shared Hosting Node"] },
    { name: "Business", price: 79, desc: "For growing regional businesses", features: ["3 Active Websites", "CRM + Automated Reminders", "25 Team Seats", "Storage up to 25GB", "Dedicated Hosting Node", "Intern Evaluators"] },
    { name: "Growth", price: 149, desc: "For scaling multi-region brands", features: ["10 Active Websites", "CRM + Kanban + AI Lead Score", "Unlimited Team Seats", "Storage up to 100GB", "E-commerce Engine Integration", "Basic Marketing Hub (1-4)"] },
    { name: "Enterprise", price: 299, desc: "For global operations and networks", features: ["Unlimited Websites", "All 6 Dashboard Panels", "Custom White-labeling", "Enterprise SLA & Support", "Marketing Hub (All 13 Modules)", "Country Domain Multi-routing"] },
  ]);

  // Load from local storage if available
  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
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

  return (
    <div className="relative bg-slate-50 text-slate-900 min-h-screen overflow-hidden">
      {/* Premium Ambient Lighting & Grid Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft dot grid background */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Subtle mesh background glows */}
        <div className="absolute top-[5%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/5 blur-[140px] mix-blend-multiply" />
        <div className="absolute top-[25%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-cyan-500/5 blur-[120px] mix-blend-multiply" />
        <div className="absolute top-[55%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/5 blur-[160px] mix-blend-multiply" />
        <div className="absolute top-[75%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-500/5 blur-[130px] mix-blend-multiply" />
        <div className="absolute bottom-[2%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-cyan-400/5 blur-[110px] mix-blend-multiply" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <SolutionsSection />
        <TechStackSection />
        <DevOpsSection />
        <VenturesSection />
        <NetworkSection nodes={nodes} selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        <PartnersSection />
        <ShowcaseSection />
        <TeamSection />
        <PricingSection plans={plans} />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}