"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

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
            className="h-full bg-gradient-to-r from-violet-600 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
          <span>Test</span>
          <span className="text-cyan-600">Success</span>
        </div>
        <div className="w-full h-1.5 bg-slate-900/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
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
          className="w-[10%] bg-gradient-to-t from-violet-600 to-cyan-500"
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
          className="w-7 h-7 rounded-full border-2 border-cyan-500"
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
        className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:shadow-violet-600/20 cursor-pointer border-0"
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
          className="w-1.5 h-1.5 rounded-full bg-cyan-500 absolute top-[-2.5px]"
          animate={{ left: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="flex flex-col items-center gap-1 z-10">
        <div className="w-7 h-7 rounded-lg bg-cyan-505/10 border border-cyan-500/30 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

export default function DevOpsSection() {
  return (
    <section className="py-24 border-t border-slate-900/10 bg-transparent relative overflow-hidden" id="devops-workflow">
      <div className="absolute w-[500px] h-[500px] -top-36 -right-24 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] -bottom-36 -left-24 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      
      <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.05}
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
          >
            DevOps Workflow
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.15}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            Smarter Dev, <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">Supercharged By DevOps</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto mt-4 text-base leading-relaxed"
          >
            From code to cloud, we optimize every step of your software lifecycle for speed, security, and scalability.
          </motion.p>
        </div>

        {/* Top Row Grid (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Infrastructure */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={scaleIn}
            custom={0.1}
            whileHover="hover"
            className="h-full"
          >
            <motion.div
              variants={hoverLift}
              className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Infrastructure <span className="italic font-serif text-violet-600 font-normal">As Code</span>
                </h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Provision resources instantly with terraform blueprints.
                </p>
              </div>
              <TerminalSnippet />
            </motion.div>
          </motion.div>

          {/* Card 2: CI/CD */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={scaleIn}
            custom={0.2}
            whileHover="hover"
            className="h-full"
          >
            <motion.div
              variants={hoverLift}
              className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  CI/CD <span className="italic font-serif text-cyan-600 font-normal">Automated Pipelines</span>
                </h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Ship features faster with automated test and deploy workflows.
                </p>
              </div>
              <PipelineVisualizer />
            </motion.div>
          </motion.div>

          {/* Card 3: Monitoring */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={scaleIn}
            custom={0.3}
            whileHover="hover"
            className="h-full"
          >
            <motion.div
              variants={hoverLift}
              className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Real-time <span className="italic font-serif text-cyan-600 font-normal">Monitoring</span>
                </h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Gain deep insights into system health and performance.
                </p>
              </div>
              <RealTimeMonitoring />
            </motion.div>
          </motion.div>
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
                cx={0}
                cy={0}
                r="3.5"
                fill="#7c3aed"
                animate={{ cx: [0, 460], cy: [0, 32] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx={0}
                cy={64}
                r="3.5"
                fill="#06b6d4"
                animate={{ cx: [0, 460], cy: [64, 32] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </svg>
          </div>
          
          {/* Central Rocket Orb */}
          <motion.div 
            className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-violet-600/30 z-10 relative"
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
              <path d="M 40,32 Q 300,32 500,0" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.3" />
              <path d="M 40,32 Q 300,32 500,64" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.3" />
              {/* Moving dot */}
              <motion.circle
                cx={40}
                cy={32}
                r="3.5"
                fill="#06b6d4"
                animate={{ cx: [40, 500], cy: [32, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              <motion.circle
                cx={40}
                cy={32}
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={scaleIn}
            custom={0.4}
            whileHover="hover"
            className="h-full"
          >
            <motion.div
              variants={hoverLift}
              className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Security <span className="italic font-serif text-violet-600 font-normal">DevSecOps</span>
                </h3>
                <p className="text-xs text-slate-505 mb-6 leading-relaxed">
                  Automated vulnerability scanning at every commit.
                </p>
              </div>
              <SecurityScanner />
            </motion.div>
          </motion.div>

          {/* Card 5: Rapid Deployment */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={scaleIn}
            custom={0.5}
            whileHover="hover"
            className="h-full"
          >
            <motion.div
              variants={hoverLift}
              className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Rapid <span className="italic font-serif text-cyan-600 font-normal">Deployment</span>
                </h3>
                <p className="text-xs text-slate-505 mb-6 leading-relaxed">
                  Zero-downtime deployments to production environments.
                </p>
              </div>
              <DeploymentConsole />
            </motion.div>
          </motion.div>

          {/* Card 6: Scalable Architecture */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={scaleIn}
            custom={0.6}
            whileHover="hover"
            className="h-full"
          >
            <motion.div
              variants={hoverLift}
              className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between h-full"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Scalable <span className="italic font-serif text-cyan-600 font-normal">Architecture</span>
                </h3>
                <p className="text-xs text-slate-505 mb-6 leading-relaxed">
                  Database and service scaling that grows with you.
                </p>
              </div>
              <ScalableArchitecture />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
