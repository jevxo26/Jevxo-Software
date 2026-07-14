"use client";

import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings } from "@/lib/animations";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <div className="flex-1 pt-20">

        <section className="py-24 relative overflow-hidden text-center">
          <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.05}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.15}
              className="text-slate-505 text-base max-w-[620px] mx-auto leading-relaxed"
            >
              Last updated: July 2026. Review how we manage, collect, and protect your cloud database nodes.
            </motion.p>
          </div>
        </section>

        <section className="py-12 border-t border-slate-900/10">
          <div className="w-11/12 max-w-[1700px] mx-auto max-w-[800px]">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={scaleIn}
              custom={0.1}
              className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-10 rounded-2xl text-slate-505 text-sm leading-relaxed"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
              <p className="mb-6">
                Jevxo collects metadata necessary to authenticate portal sessions, optimize CDN replication nodes, and deliver responsive software applications. This includes email addresses, active subscription preferences, contact form budgets, and API access keys.
              </p>

              <h2 className="text-xl font-bold text-slate-900 mb-4">2. How We Use Data</h2>
              <p className="mb-6">
                We utilize collected parameters to maintain client support logs, route DNS requests to country nodes, and update dynamic homepage components. We do not sell, rent, or distribute database schemas to third-party advertising companies.
              </p>

              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Data Storage & Security</h2>
              <p className="mb-6">
                All client files, billing history, and internship consoles are stored behind standard firewalls and encrypted schemas. Two-factor authentication (2FA) options are available in settings to prevent unauthorized console access.
              </p>

              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Cookies & Trackers</h2>
              <p className="mb-6">
                Our platform uses local storage (`localStorage`) to cache active sessions, CMS configs, and chat conversation history to avoid redundant API request calls. You can wipe this cache at any time via settings or browser controls.
              </p>

              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Contact Inquiries</h2>
              <p className="mb-0">
                For data access requests or questions regarding our cloud infrastructure audits, please submit a query via our contact page, or reach out to our network team at `security@jevxo.com`.
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
