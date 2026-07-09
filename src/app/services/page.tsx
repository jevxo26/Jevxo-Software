"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services as defaultServices } from "@/lib/data/services";

export default function ServicesPage() {
  const [servicesList, setServicesList] = useState(defaultServices);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.services) setServicesList(parsed.services);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  return (
    <div className="bg-[#080d1a] text-[#f1f5f9] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[500px] h-[500px] -top-[200px] -right-[100px]" />
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-cyan-500/[0.06] w-[350px] h-[350px] -bottom-[100px] -left-[80px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
          <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/[0.3] bg-violet-600/[0.08] text-xs font-semibold text-[#a78bfa] mb-6 uppercase tracking-widest">
            What We Offer
          </div>
          <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tight mb-6">
            Services Built for<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Ambitious Companies</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-[560px] mx-auto leading-relaxed">
            End-to-end digital capabilities under one roof. From strategy and design to engineering, deployment, and beyond.
          </p>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────── */}
      <section className="py-[100px] md:py-[70px]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="services-list grid grid-cols-2 gap-7">
            {servicesList.map((service, i) => (
              <Link className="block" key={service.id} href={`/services/${service.slug}`}>
                <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 service-card p-10 rounded-[28px] h-full flex flex-col border-white/[0.08]" style={{transition: "all 0.3s ease", animationDelay: `${i * 0.08}s`}}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-[60px] h-[60px] rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-[28px]" style={{boxShadow: "0 8px 24px rgba(124,58,237,0.25)", flexShrink: 0}}>
                      {service.icon}
                    </div>
                    <div>
                      <h2 className="text-[22px] font-bold mb-1">{service.title}</h2>
                      <p className="text-[#a78bfa] text-sm font-medium">Starting from {service.startingPrice}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 text-[15px] leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  <div className="flex gap-2 mb-6" style={{flexWrap: "wrap"}}>
                    {service.features.slice(0, 4).map((f) => (
                      <span className="py-1 px-3 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-slate-600" key={f}>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-[1px solid rgba(255,255,255,0.06)] pt-5">
                    <div className="flex gap-5">
                      <span className="text-slate-400 text-[13px]">⏱ {service.duration}</span>
                    </div>
                    <span className="text-[#a78bfa] text-sm font-semibold">View details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-[60px] md:py-[40px] border-t border-slate-900/[0.08]">
        <div className="w-11/12 max-w-[1400px] mx-auto text-center">
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-0.02em] mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-slate-600 text-[17px] mb-9">
            Book a free 30-minute discovery call and we&apos;ll help you find the right solution.
          </p>
          <Link className="py-4 px-10 rounded-[14px] font-bold text-[17px] bg-gradient-to-br from-violet-600 to-indigo-600 text-[#fff] inline-block" href="/contact" style={{boxShadow: "0 0 40px rgba(124,58,237,0.4)"}}>
            Book a Free Call →
          </Link>
        </div>
      </section>

      </div>

      <Footer />

      <style>{`
        .service-card {
          transition: all 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(124,58,237,0.12);
          border-color: rgba(124,58,237,0.25) !important;
        }
        @media (max-width: 768px) {
          .services-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
