"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
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
    { name: "Starter", price: 29, desc: "Perfect for local shops and emerging startups.", features: ["1 Custom Website Integration", "Basic Jevxo CRM Tracker", "5 Operations Team Seats", "10 GB Encrypted NVMe Storage", "Shared Cloud Hosting Node"] },
    { name: "Business", price: 79, desc: "Built for expanding regional enterprises and retailers.", features: ["3 Dedicated Websites", "Jevxo CRM + Automated Reminders", "25 Operational Team Seats", "50 GB High-Speed NVMe Storage", "Isolated Regional Hosting Node", "Intern & HRM Evaluators"] },
    { name: "Scale", price: 149, desc: "Designed for multi-branch brands and corporate operations.", features: ["10 Custom Brand Websites", "CRM + Kanban + AI Lead Scoring", "Unlimited Operations Seats", "150 GB Enterprise SSD Storage", "Headless Commerce API Engine", "Omni-Channel Marketing (1-4 Modules)"] },
    { name: "Enterprise", price: 299, desc: "Unrestricted ecosystem for global brands and corporations.", features: ["Unlimited Custom Sites & Apps", "All 6 Enterprise Panels Active", "Full White-labeled Client Portal", "Dedicated SLA & 24/7 Priority Support", "Complete Omni-Channel Hub (All 13 Modules)", "Dynamic Multi-Country IP Routing"] },
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
    <>
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
    </>
  );
}