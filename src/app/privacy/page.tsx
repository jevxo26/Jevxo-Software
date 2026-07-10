"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden pt-[140px] pb-[60px]">
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
          <h1 className="text-[clamp(36px,6vw,54px)] font-black tracking-tight mb-5">
            Privacy Policy
          </h1>
          <p className="text-[15px] text-slate-600">
            Last updated: July 2026. Review how we manage, collect, and protect your cloud database nodes.
          </p>
        </div>
      </section>

      <section className="py-[100px] md:py-[70px] pb-[100px]">
        <div className="w-11/12 max-w-[1400px] mx-auto max-w-[800px]">
          <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-10 rounded-2xl   text-sm leading-relaxed text-slate-600">
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
            <p className="m-[0]">
              For data access requests or questions regarding our cloud infrastructure audits, please submit a query via our contact page, or reach out to our network team at `security@jevxo.com`.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
