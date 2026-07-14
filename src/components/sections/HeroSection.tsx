"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Counter from "@/components/ui/Counter";
import { stats } from "@/lib/data/team";
import { fadeUp, scaleIn, viewportSettings, hoverLift, revealContainer } from "@/lib/animations";

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

const IconSparkle = ({ className }: IconProps) => (
  <svg className={className} {...iconBase} fill="currentColor" stroke="none">
    <path d="M12 2l1.8 5.8L20 10l-6.2 2.2L12 18l-1.8-5.8L4 10l6.2-2.2L12 2z" />
  </svg>
);

/* ────────────────────────────────────────────────────────────────
   Partner logos
──────────────────────────────────────────────────────────────── */

const SentinelSecureLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight">Sentinel<span className="font-medium">Secure</span></span>
  </div>
);

const LuxStayLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight">Lux<span className="font-medium">Stay</span></span>
  </div>
);

const OurficeLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors duration-300 select-none">
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="8" cy="12" r="5" />
      <circle cx="16" cy="12" r="5" />
    </svg>
    <div className="flex flex-col leading-none">
      <span className="text-xs font-extrabold tracking-tight">Ourfice</span>
      <span className="text-[7.5px] font-bold tracking-wider">WORKSPACES</span>
    </div>
  </div>
);

const AxisNetLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22L12 2l8 20M12 2v20" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight">Axis<span className="font-medium">Net</span></span>
  </div>
);

const WinovaLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 17l5-5 5 5 5-5 5 5" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight">Winova</span>
  </div>
);

const NestrixLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight">Nestrix</span>
  </div>
);

const VisionnLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
    </svg>
    <span className="text-xs font-black tracking-widest">VISIONN</span>
  </div>
);

const EcoofficeLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 14a4 4 0 114-4 4 4 0 01-4 4z" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight">eco<span className="font-medium">office</span></span>
  </div>
);

const RevoLivingLogo = () => (
  <div className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors duration-300 select-none">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
    <span className="text-xs font-extrabold tracking-tight">Revo<span className="font-light italic">Living</span></span>
  </div>
);

/* ────────────────────────────────────────────────────────────────
   Orbit system
──────────────────────────────────────────────────────────────── */

interface OrbitBadgeProps {
  Icon: React.ComponentType<IconProps>;
  tooltip: string;
  color: string;
  glow: string;
}

function OrbitBadge({ Icon, tooltip, color, glow }: OrbitBadgeProps) {
  return (
    <div className="relative group/badge cursor-pointer">
      <div
        className={`w-11 h-11 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm border border-white shadow-[0_4px_16px_rgba(15,23,42,0.08)] transition-all duration-300 hover:scale-[1.18] hover:-translate-y-0.5 ${color}`}
        style={{ boxShadow: `0 6px 20px ${glow}` }}
      >
        <Icon className="w-6 h-6 transition-transform duration-300 group-hover/badge:rotate-12" />
      </div>

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1.5 rounded-lg bg-slate-900 text-[10px] font-semibold text-white whitespace-nowrap opacity-0 pointer-events-none scale-90 group-hover/badge:opacity-100 group-hover/badge:scale-100 transition-all duration-200 z-50 shadow-lg">
        {tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-slate-900" />
      </div>
    </div>
  );
}

function OrbitRing({
  size,
  duration,
  reverse = false,
  dashed = false,
  children,
}: {
  size: number;
  duration: number;
  reverse?: boolean;
  dashed?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute rounded-full flex items-center justify-center ${dashed ? "border border-dashed border-violet-300/70" : "border border-slate-200/80"
        }`}
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
    <div className="relative w-full aspect-square max-w-[510px] xl:max-w-[550px] mx-auto flex items-center justify-center p-4 bg-white/60 rounded-[36px] border border-white shadow-[0_20px_70px_rgba(88,28,235,0.12)] overflow-hidden backdrop-blur-md">
      {/* Ambient glow field */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full bg-violet-400/15 blur-[90px] pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[260px] h-[260px] rounded-full bg-cyan-400/15 blur-[70px] pointer-events-none"
        animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_35%,rgba(255,255,255,0.65)_100%)] pointer-events-none" />

      {/* Outer dashed guide ring */}
      <OrbitRing size={430} duration={45} dashed />

      {/* Outer Orbit Ring (400px) */}
      <OrbitRing size={400} duration={30}>
        <OrbitBadgeSlot angle={0} ringDuration={30}>
          <OrbitBadge Icon={IconSettings} tooltip="System Settings" color="text-violet-600" glow="rgba(124,58,237,0.3)" />
        </OrbitBadgeSlot>
        <OrbitBadgeSlot angle={120} ringDuration={30}>
          <OrbitBadge Icon={IconCode} tooltip="Next.js Engine" color="text-cyan-600" glow="rgba(8,145,178,0.3)" />
        </OrbitBadgeSlot>
        <OrbitBadgeSlot angle={240} ringDuration={30}>
          <OrbitBadge Icon={IconZap} tooltip="DevOps Flow" color="text-pink-600" glow="rgba(219,39,119,0.3)" />
        </OrbitBadgeSlot>
      </OrbitRing>

      {/* Middle Orbit Ring (290px) */}
      <OrbitRing size={290} duration={22} reverse>
        <OrbitBadgeSlot angle={75} ringDuration={22} reverse>
          <OrbitBadge Icon={IconUsers} tooltip="HRM Operations" color="text-indigo-600" glow="rgba(79,70,229,0.3)" />
        </OrbitBadgeSlot>
        <OrbitBadgeSlot angle={255} ringDuration={22} reverse>
          <OrbitBadge Icon={IconChart} tooltip="CRM Analytics" color="text-emerald-600" glow="rgba(5,150,105,0.3)" />
        </OrbitBadgeSlot>
      </OrbitRing>

      {/* Inner Orbit Ring (180px) */}
      <OrbitRing size={180} duration={16}>
        <OrbitBadgeSlot angle={180} ringDuration={16}>
          <OrbitBadge Icon={IconCloud} tooltip="Cloud Hosting" color="text-sky-600" glow="rgba(2,132,199,0.3)" />
        </OrbitBadgeSlot>
      </OrbitRing>

      {/* Central Hub */}
      <div className="absolute w-[100px] h-[100px] rounded-full bg-white border border-violet-200 flex items-center justify-center z-20 shadow-[0_10px_36px_rgba(124,58,237,0.22)] hover:border-violet-300 hover:shadow-[0_12px_44px_rgba(124,58,237,0.32)] transition-all duration-300 group cursor-pointer">
        <span className="absolute inset-0 rounded-full border border-violet-200/70 animate-ping opacity-30 pointer-events-none" />
        <span className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-400/20 blur-md pointer-events-none" />
        <img
          src="/logo.png"
          alt="Company Logo"
          className="w-11 h-11 object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Floating Card 1: System Status */}
      <motion.div
        className="absolute top-4 right-4 bg-white border border-slate-100 rounded-2xl py-2.5 px-3.5 flex items-center gap-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.06)] z-30 select-none hover:shadow-[0_8px_28px_rgba(15,23,42,0.1)] transition-shadow duration-300"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="flex flex-col">
          <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider leading-none">System status</span>
          <span className="text-[11px] text-slate-900 font-bold mt-1 leading-none">Uptime SLA 99.99%</span>
        </div>
      </motion.div>

      {/* Floating Card 2: Performance */}
      <motion.div
        className="absolute bottom-4 left-4 bg-white border border-slate-100 rounded-2xl py-2.5 px-3.5 flex items-center gap-2.5 shadow-[0_4px_20px_rgba(15,23,42,0.06)] z-30 select-none hover:shadow-[0_8px_28px_rgba(15,23,42,0.1)] transition-shadow duration-300"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <div className="w-7 h-7 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
          <IconGauge className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider leading-none">Performance</span>
          <span className="text-[11px] text-slate-900 font-bold mt-1 leading-none">Avg deploy 4.2s</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Animated headline: reveals word by word for a premium load-in
──────────────────────────────────────────────────────────────── */

function AnimatedHeadline({ text }: { text: string }) {
  const [before, after] = text.includes("||") ? text.split("||") : [text, ""];

  const wordVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: 0.15 + i * 0.04, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  const renderWords = (chunk: string, offset: number, gradient: boolean) =>
    chunk
      .trim()
      .split(" ")
      .map((word, i) => (
        <motion.span
          key={`${offset}-${i}`}
          custom={offset + i}
          variants={wordVariants}
          className={`inline-block mr-[0.25em] ${gradient ? "bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent" : ""
            }`}
        >
          {word}
        </motion.span>
      ));

  return (
    <motion.h1
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={revealContainer}
      className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-slate-900 text-center lg:text-left"
    >
      {renderWords(before, 0, false)}
      {after && (
        <>
          <br />
          {renderWords(after, before.trim().split(" ").length, true)}
        </>
      )}
    </motion.h1>
  );
}

export default function HeroSection() {
  const [heroTitle, setHeroTitle] = useState("The Digital Operating||System for Global Ventures");
  const [heroDesc, setHeroDesc] = useState(
    "A unified suite of business management platforms, CRM systems, automated growth centers, and enterprise hosting packages. Build, scale, and automate your company."
  );
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

  const headlineKey = useMemo(() => heroTitle, [heroTitle]);

  return (
    <>
      {/* ── 1. HERO MAIN SECTION ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-36 pb-20 bg-gradient-to-b from-violet-50/70 to-transparent">
        {/* Ambient background field */}
        <motion.div
          className="absolute w-[600px] h-[600px] -top-36 -right-24 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none"
          animate={{ opacity: [0.5, 0.75, 0.5], scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[450px] h-[450px] -bottom-36 -left-12 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"
          animate={{ opacity: [0.4, 0.6, 0.4], scale: [1.05, 0.95, 1.05] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-6 xl:col-span-7 text-center lg:text-left max-w-[650px] mx-auto lg:mx-0">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.05}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-600/20 bg-violet-600/5 text-[11px] font-bold text-violet-700 mb-6 uppercase tracking-wider"
              >
                <span className="relative flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                </span>
                {heroTag}
                <IconSparkle className="w-3.5 h-3.5 text-violet-550 animate-spin-slow" />
              </motion.div>

              <AnimatedHeadline key={headlineKey} text={heroTitle} />

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.4}
                className="text-slate-500 text-base md:text-lg leading-relaxed mb-9 max-w-[540px] mx-auto lg:mx-0"
              >
                {heroDesc}
              </motion.p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.5}
                className="flex flex-wrap justify-center lg:justify-start gap-3"
              >
                <Link
                  href="/portal"
                  className="group relative overflow-hidden px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-xl hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <span className="relative">Access Portal Login →</span>
                </Link>
                <a
                  href="#solutions"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-4 rounded-xl font-semibold text-sm bg-white border border-slate-200 text-slate-900 hover:border-violet-300 hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Explore Solutions
                </a>
              </motion.div>
            </div>

            {/* Right Column: Rotating Orbit Animation */}
            <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center relative w-full mt-8 lg:mt-0">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={scaleIn}
                custom={0.3}
                className="w-full flex items-center justify-center"
              >
                <HeroOrbit />
              </motion.div>
            </div>
          </div>

          {/* Partner Logos Strip */}
          <div className="mt-20 pt-10 border-t border-slate-100/80">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.6}
              className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8"
            >
              Trusted by industry leaders – built for everyone.
            </motion.p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-12 lg:gap-x-16">
              {[
                SentinelSecureLogo,
                LuxStayLogo,
                OurficeLogo,
                AxisNetLogo,
                WinovaLogo,
                NestrixLogo,
                VisionnLogo,
                EcoofficeLogo,
                RevoLivingLogo,
              ].map((LogoComp, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={scaleIn}
                  custom={0.7 + idx * 0.04}
                >
                  <LogoComp />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE HUB (STATISTICS) SECTION ── */}
      <section className="py-24 border-t border-slate-900/10 bg-transparent" id="the-hub">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.1}
                className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
              >
                The Hub
              </motion.div>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.2}
                className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900"
              >
                One Core Vision. <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Unlimited Scale.</span>
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.3}
                className="text-slate-500 text-base leading-relaxed mb-5"
              >
                Jevxo is designed to act as the primary operational engine for next-gen ventures. Our mission is to integrate website deployment, customer relations, employee productivity, partner tracking, and localized sales networks into one singular product architecture.
              </motion.p>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.4}
                className="text-slate-500 text-base leading-relaxed mb-8"
              >
                No more duct-taping ten different software applications. Jevxo is a coherent ecosystem that empowers small enterprises and country-level agencies alike.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                  custom={0.5}
                  className="border-l-2 border-violet-600 pl-4"
                >
                  <div className="text-sm font-bold text-slate-900 mb-1">Global Framework</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Built to operate seamlessly across borders and currencies.</p>
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                  custom={0.6}
                  className="border-l-2 border-cyan-500 pl-4"
                >
                  <div className="text-sm font-bold text-slate-900 mb-1">Integrated Automation</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Pre-wired pipelines automate data syncs between departments.</p>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stats.map((st, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={scaleIn}
                  custom={idx * 0.1 + 0.3}
                  whileHover="hover"
                  className="h-full"
                >
                  <motion.div
                    variants={hoverLift}
                    className="group relative bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-7 rounded-2xl flex flex-col gap-2 h-full hover:shadow-lg hover:shadow-violet-600/5 overflow-hidden"
                  >
                    <div className="pointer-events-none absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/10 to-cyan-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className={`text-4xl md:text-5xl font-black leading-none ${idx % 2 === 0 ? "text-violet-600" : "text-cyan-600"}`}>
                      <Counter value={st.value} suffix={st.suffix} />
                    </div>
                    <div className="text-sm font-bold text-slate-900">{st.label}</div>
                    <p className="text-xs text-slate-500 leading-normal">{st.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}