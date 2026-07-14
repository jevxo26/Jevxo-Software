"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Counter from "@/components/ui/Counter";
import { stats } from "@/lib/data/team";

/**
 * Self-contained stroke icons (no external icon package).
 * Using inline SVG instead of lucide-react removes any risk of the
 * icon font/glyphs failing to load or rendering as broken tofu
 * characters — this is what was happening in the last screenshot.
 */
type IconProps = { className?: string };

const iconBase = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const IconSettings = ({ className }: IconProps) => (
  <svg className={className} {...iconBase}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconCode = ({ className }: IconProps) => (
  <svg className={className} {...iconBase}>
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
  </svg>
);

const IconZap = ({ className }: IconProps) => (
  <svg className={className} {...iconBase} fill="currentColor" stroke="none">
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
  </svg>
);

const IconUsers = ({ className }: IconProps) => (
  <svg className={className} {...iconBase}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconChart = ({ className }: IconProps) => (
  <svg className={className} {...iconBase}>
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const IconCloud = ({ className }: IconProps) => (
  <svg className={className} {...iconBase}>
    <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6-1.6A5 5 0 0 0 6 19h11.5Z" />
  </svg>
);

const IconGauge = ({ className }: IconProps) => (
  <svg className={className} {...iconBase}>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </svg>
);

const SentinelSecureLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight text-slate-500">Sentinel<span className="text-slate-400 font-medium">Secure</span></span>
  </div>
);

const LuxStayLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight text-slate-500">Lux<span className="text-slate-400 font-medium">Stay</span></span>
  </div>
);

const OurficeLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-300 select-none">
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="8" cy="12" r="5" />
      <circle cx="16" cy="12" r="5" />
    </svg>
    <div className="flex flex-col leading-none">
      <span className="text-xs font-extrabold tracking-tight text-slate-500">Ourfice</span>
      <span className="text-[7.5px] font-bold text-slate-400 tracking-wider">WORKSPACES</span>
    </div>
  </div>
);

const AxisNetLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22L12 2l8 20M12 2v20" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight text-slate-500">Axis<span className="text-slate-400 font-medium">Net</span></span>
  </div>
);

const WinovaLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 17l5-5 5 5 5-5 5 5" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight text-slate-500">Winova</span>
  </div>
);

const NestrixLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight text-slate-500">Nestrix</span>
  </div>
);

const VisionnLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
    </svg>
    <span className="text-xs font-black tracking-widest text-slate-500">VISIONN</span>
  </div>
);

const EcoofficeLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 14a4 4 0 114-4 4 4 0 01-4 4z" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight text-slate-500">eco<span className="text-slate-400 font-medium">office</span></span>
  </div>
);

const RevoLivingLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight text-slate-500">Revo<span className="font-light italic text-slate-400">Living</span></span>
  </div>
);

interface OrbitBadgeProps {
  Icon: React.ComponentType<IconProps>;
  tooltip: string;
  color: string;
  glow: string;
}

/**
 * Icons render with a soft drop-shadow + subtle glow for light backgrounds.
 */
function OrbitBadge({ Icon, tooltip, color, glow }: OrbitBadgeProps) {
  return (
    <div className="relative group/badge cursor-pointer">
      <div
        className={`w-11 h-11 flex items-center justify-center transition-all duration-300 hover:scale-125 ${color}`}
        style={{ filter: `drop-shadow(0 6px 10px ${glow})` }}
      >
        <Icon className="w-7 h-7 transition-transform duration-300 group-hover/badge:rotate-12" />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-slate-900 text-[10px] font-semibold text-white whitespace-nowrap opacity-0 pointer-events-none scale-90 group-hover/badge:opacity-100 group-hover/badge:scale-100 transition-all duration-200 z-50 shadow-lg">
        {tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900" />
      </div>
    </div>
  );
}

/**
 * A single orbit ring.
 */
function OrbitRing({
  size,
  duration,
  reverse = false,
  children,
}: {
  size: number;
  duration: number;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute rounded-full border border-slate-200 flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

function OrbitBadgeSlot({
  angle,
  ringDuration,
  reverse = false,
  children,
}: {
  angle: number;
  ringDuration: number;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute w-full h-full" style={{ transform: `rotate(${angle}deg)` }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ rotate: reverse ? 360 : -360 }}
          transition={{ duration: ringDuration, repeat: Infinity, ease: "linear" }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function HeroOrbit() {
  return (
    <div className="relative w-full aspect-square max-w-[510px] xl:max-w-[550px] mx-auto flex items-center justify-center p-4 bg-white/70 rounded-[32px] border border-slate-200 shadow-xl overflow-hidden backdrop-blur-sm">
      <div className="absolute w-[360px] h-[360px] rounded-full bg-violet-400/10 blur-[80px] pointer-events-none" />
      <div className="absolute w-[240px] h-[240px] rounded-full bg-cyan-400/10 blur-[60px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_40%,rgba(255,255,255,0.6)_100%)] pointer-events-none" />

      {/* ── Outer Orbit Ring (400px) ── */}
      <OrbitRing size={400} duration={30}>
        <OrbitBadgeSlot angle={0} ringDuration={30}>
          <OrbitBadge
            Icon={IconSettings}
            tooltip="System Settings"
            color="text-violet-600"
            glow="rgba(124,58,237,0.35)"
          />
        </OrbitBadgeSlot>
        <OrbitBadgeSlot angle={120} ringDuration={30}>
          <OrbitBadge
            Icon={IconCode}
            tooltip="Next.js Engine"
            color="text-cyan-600"
            glow="rgba(8,145,178,0.35)"
          />
        </OrbitBadgeSlot>
        <OrbitBadgeSlot angle={240} ringDuration={30}>
          <OrbitBadge
            Icon={IconZap}
            tooltip="DevOps Flow"
            color="text-pink-600"
            glow="rgba(219,39,119,0.35)"
          />
        </OrbitBadgeSlot>
      </OrbitRing>

      {/* ── Middle Orbit Ring (290px) ── */}
      <OrbitRing size={290} duration={22} reverse>
        <OrbitBadgeSlot angle={75} ringDuration={22} reverse>
          <OrbitBadge
            Icon={IconUsers}
            tooltip="HRM Operations"
            color="text-indigo-600"
            glow="rgba(79,70,229,0.35)"
          />
        </OrbitBadgeSlot>
        <OrbitBadgeSlot angle={255} ringDuration={22} reverse>
          <OrbitBadge
            Icon={IconChart}
            tooltip="CRM Analytics"
            color="text-emerald-600"
            glow="rgba(5,150,105,0.35)"
          />
        </OrbitBadgeSlot>
      </OrbitRing>

      {/* ── Inner Orbit Ring (180px) ── */}
      <OrbitRing size={180} duration={16}>
        <OrbitBadgeSlot angle={180} ringDuration={16}>
          <OrbitBadge
            Icon={IconCloud}
            tooltip="Cloud Hosting"
            color="text-sky-600"
            glow="rgba(2,132,199,0.35)"
          />
        </OrbitBadgeSlot>
      </OrbitRing>

      {/* ── Central Hub (Core Logo Node) ── */}
      <div className="absolute w-[92px] h-[92px] rounded-full bg-white border border-violet-200 flex items-center justify-center z-20 shadow-[0_8px_30px_rgba(124,58,237,0.18)] hover:border-violet-300 hover:shadow-[0_8px_36px_rgba(124,58,237,0.28)] transition-all duration-300 group cursor-pointer">
        <span className="absolute inset-0 rounded-full border border-violet-200/70 animate-ping opacity-30 pointer-events-none" />
        <img
          src="/logo.png"
          alt="Company Logo"
          className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* ── Floating Card 1: System Status ── */}
      <div className="absolute top-4 right-4 bg-white border border-slate-100 rounded-2xl py-2.5 px-3.5 flex items-center gap-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.06)] z-30 select-none hover:shadow-[0_6px_24px_rgba(15,23,42,0.09)] transition-all duration-300">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider leading-none">
            System status
          </span>
          <span className="text-[11px] text-slate-900 font-bold mt-1 leading-none">Uptime SLA 99.99%</span>
        </div>
      </div>

      {/* ── Floating Card 2: Performance ── */}
      <div className="absolute bottom-4 left-4 bg-white border border-slate-100 rounded-2xl py-2.5 px-3.5 flex items-center gap-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.06)] z-30 select-none hover:shadow-[0_6px_24px_rgba(15,23,42,0.09)] transition-all duration-300">
        <div className="w-7 h-7 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
          <IconGauge className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider leading-none">
            Performance
          </span>
          <span className="text-[11px] text-slate-900 font-bold mt-1 leading-none">Avg deploy 4.2s</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [heroTitle, setHeroTitle] = useState("The Digital Operating||System for Global Ventures");
  const [heroDesc, setHeroDesc] = useState("A unified suite of business management platforms, CRM systems, automated growth centers, and enterprise hosting packages. Build, scale, and automate your company.");
  const [heroTag, setHeroTag] = useState("Jevxo Ecosystem Version 1.0 Live");

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.heroTitle && typeof parsed.heroTitle === "string" && parsed.heroTitle.trim() !== "") setHeroTitle(parsed.heroTitle);
        if (parsed.heroDesc && typeof parsed.heroDesc === "string" && parsed.heroDesc.trim() !== "") setHeroDesc(parsed.heroDesc);
        if (parsed.heroTag && typeof parsed.heroTag === "string" && parsed.heroTag.trim() !== "") setHeroTag(parsed.heroTag);
      } catch (e) {
        console.error("Failed to parse CMS data", e);
      }
    }
  }, []);
  return (
    <>
      {/* ── 1. HERO MAIN SECTION ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-36 pb-20 bg-gradient-to-b from-violet-50 via-white to-slate-50">
        <div className="absolute w-[600px] h-[600px] -top-36 -right-24 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none opacity-60 animate-float" />
        <div className="absolute w-[450px] h-[450px] -bottom-36 -left-12 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none opacity-50" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-6 xl:col-span-7 text-center lg:text-left max-w-[650px] mx-auto lg:mx-0">
              <ScrollReveal variant="slideDown" delay={100}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-600/20 bg-violet-600/5 text-[11px] font-bold text-violet-700 mb-6 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-ping" />
                  {heroTag}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="slideUp" delay={300}>
                <h1 className="text-3xl md:text-[42px] xl:text-[48px] font-bold tracking-tight mb-6 leading-[1.18] text-slate-900">
                  {heroTitle.includes("||") ? (
                    <>
                      {heroTitle.split("||")[0]}
                      <br />
                      <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        {heroTitle.split("||")[1]}
                      </span>
                    </>
                  ) : (
                    <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      {heroTitle}
                    </span>
                  )}
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="slideUp" delay={500}>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-9 max-w-[520px] mx-auto lg:mx-0">
                  {heroDesc}
                </p>
              </ScrollReveal>

              <ScrollReveal variant="slideUp" delay={700}>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <Link
                    href="/portal"
                    className="px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Access Portal Login →
                  </Link>
                  <a
                    href="#solutions"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-7 py-3.5 rounded-xl font-semibold text-sm bg-white border border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                  >
                    Explore Solutions
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Rotating Orbit Animation */}
            <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center relative w-full mt-8 lg:mt-0">
              <ScrollReveal variant="scaleUp" delay={400} duration={800} className="w-full">
                <HeroOrbit />
              </ScrollReveal>
            </div>
          </div>

          {/* Partner Logos Strip */}
          <ScrollReveal variant="slideUp" delay={800} duration={800}>
            <div className="mt-20 pt-10 border-t border-slate-100/80">
              <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
                Trusted by industry leaders – built for everyone.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-12 lg:gap-x-16">
                <SentinelSecureLogo />
                <LuxStayLogo />
                <OurficeLogo />
                <AxisNetLogo />
                <WinovaLogo />
                <NestrixLogo />
                <VisionnLogo />
                <EcoofficeLogo />
                <RevoLivingLogo />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. THE HUB (STATISTICS) SECTION ── */}
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
    </>
  );
}