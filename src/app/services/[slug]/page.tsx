"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services, getServiceBySlug } from "@/lib/data/services";

type Props = { params: Promise<{ slug: string }> };

export default function ServiceDetailPage({ params }: Props) {
  const { slug } = use(params);
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("jevxo_cms_data");
    let foundService = null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.services) {
          foundService = parsed.services.find((s: any) => s.slug === slug);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (!foundService) {
      foundService = getServiceBySlug(slug);
    }
    setService(foundService);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d1a] text-[#fff]">
        Loading service info...
      </div>
    );
  }

  if (!service) notFound();

  return (
    <div className="bg-[#080d1a] text-[#f1f5f9] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[500px] h-[500px] -top-[150px] -right-[100px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1]">
          <Link className="items-center gap-2 text-slate-400 text-sm mb-8" href="/services" style={{display: "inline-flex", transition: "color 0.2s"}}>
            ← Back to Services
          </Link>
          <div className="flex items-flex-start gap-7" style={{flexWrap: "wrap"}}>
            <div className="w-[80px] h-[80px] rounded-[20px] bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-4xl" style={{flexShrink: 0, boxShadow: "0 0 40px rgba(124,58,237,0.4)"}}>{service.icon}</div>
            <div>
              <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/[0.3] bg-violet-600/[0.08] text-xs font-semibold text-[#a78bfa] mb-4">
                Service
              </div>
              <h1 className="text-[clamp(32px,5vw,60px)] font-black tracking-tight mb-3">
                {service.title}
              </h1>
              <p className="text-lg text-slate-600 max-w-[580px] leading-relaxed">
                {service.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <section className="py-[100px] md:py-[70px]">
        <div className="w-11/12 max-w-[1400px] mx-auto">
          <div className="service-detail-grid grid grid-cols-[2fr_1fr] gap-[60px] items-start">
            {/* Left */}
            <div>
              <h2 className="text-[28px] font-bold mb-5">Overview</h2>
              <p className="text-slate-600 text-base leading-relaxed mb-12">
                {service.description}
              </p>

              <h2 className="text-[28px] font-bold mb-6">What&apos;s Included</h2>
              <div className="grid grid-cols-[1fr_1fr] gap-3 mb-12">
                {service.features.map((f: string) => (
                  <div className="flex items-center gap-3 py-3.5 px-[18px] rounded-xl bg-white/[0.03] border border-white/[0.06]" key={f}>
                    <div className="w-[20px] h-[20px] rounded-full bg-violet-600/[0.2] flex items-center justify-center text-[11px]" style={{flexShrink: 0}}>✓</div>
                    <span className="text-slate-600 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-[28px] font-bold mb-6">Deliverables</h2>
              <div className="flex flex-col gap-3">
                {service.deliverables.map((d: string, i: number) => (
                  <div className="flex items-center gap-4 py-4 px-5 rounded-xl bg-violet-600/[0.06] border border-violet-600/[0.12]" key={d}>
                    <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold" style={{flexShrink: 0}}>
                      {i + 1}
                    </div>
                    <span className="text-[15px] font-medium">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div>
              <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-8 rounded-[20px] sticky top-[100px]">
                <h3 className="text-xl font-bold mb-6">Project Details</h3>
                <div className="flex flex-col gap-5 mb-8">
                  {[
                    { label: "Starting Price", value: service.startingPrice, accent: true },
                    { label: "Timeline",       value: service.duration,      accent: false },
                  ].map((row) => (
                    <div className="pb-5" key={row.label} style={{borderBottom: "1px solid rgba(255,255,255,0.06)"}}>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.08em] mb-1.5">{row.label}</p>
                      <p className="text-xl font-bold" style={{color: row.accent ? "#a78bfa" : "#f1f5f9"}}>{row.value}</p>
                    </div>
                  ))}
                </div>
                <Link className="block text-center py-3.5 px-6 rounded-xl font-bold text-[15px] bg-gradient-to-br from-violet-600 to-indigo-600 text-[#fff] mb-3" href="/contact" style={{boxShadow: "0 0 30px rgba(124,58,237,0.4)"}}>
                  Get a Quote →
                </Link>
                <Link className="block text-center py-3 px-6 rounded-xl font-semibold text-sm border border-white/[0.1] bg-white/[0.03] text-slate-600" href="/portfolio">
                  See Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .service-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
