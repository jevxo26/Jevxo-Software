"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/data/services";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

type Props = { params: Promise<{ slug: string }> };

// Custom Premium SVGs
const IconLaptop = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
    <line x1="12" y1="17" x2="12" y2="20" />
  </svg>
);

const IconPalette = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03456 19.176 5.0999 19.434 5.02108 19.6708L4.69047 20.6627C4.4842 21.2815 4.94528 21.9213 5.59792 21.9928C5.73034 22.0073 5.86438 22.0072 5.99676 21.9925L7.26083 21.852C7.5262 21.8225 7.79155 21.9238 7.97858 22.1108L8.15857 22.2908C8.94803 23.0803 10.0988 23.3644 11.1643 23.0336C11.4395 22.9481 11.724 22.9818 11.9754 23.1293L12 23.1436" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const IconCloud = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const IconCpu = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
  </svg>
);

const IconBarChart = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconArrowLeft = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const getServiceIcon = (slug: string) => {
  switch (slug) {
    case "web-development": return <IconLaptop />;
    case "ui-ux-design":    return <IconPalette />;
    case "mobile-apps":     return <IconPhone />;
    case "cloud-devops":    return <IconCloud />;
    case "ai-integration":  return <IconCpu />;
    case "digital-strategy": return <IconBarChart />;
    default:                return <IconLaptop />;
  }
};

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
      <div className="min-h-screen flex items-center justify-center bg-transparent text-slate-900">
        <span className="text-slate-505 text-sm font-semibold">Loading service info...</span>
      </div>
    );
  }

  if (!service) notFound();

  return (
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <div className="flex-1 pt-20">
        
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.05}
            >
              <Link className="inline-flex items-center gap-2 text-slate-405 text-xs font-bold uppercase tracking-wider mb-8 hover:text-violet-600 transition-colors" href="/services">
                <IconArrowLeft /> Back to Services
              </Link>
            </motion.div>
            
            <div className="flex items-center gap-7 flex-wrap">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={scaleIn}
                custom={0.1}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-violet-650/30"
              >
                {getServiceIcon(service.slug)}
              </motion.div>
              <div>
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={0.15}
                  className="inline-block py-1 px-3.5 rounded bg-violet-600/10 text-violet-750 text-[10px] font-bold uppercase tracking-wider mb-4"
                >
                  Service Details
                </motion.div>
                <motion.h1 
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={0.2}
                  className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-3"
                >
                  {service.title}
                </motion.h1>
                <motion.p 
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={0.25}
                  className="text-slate-505 text-base md:text-lg max-w-[580px] leading-relaxed"
                >
                  {service.tagline}
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 border-t border-slate-900/10">
          <div className="w-11/12 max-w-[1700px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              
              {/* Left */}
              <div className="lg:col-span-2">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                  custom={0.05}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-5">Overview</h2>
                  <p className="text-slate-550 text-sm md:text-base leading-relaxed mb-12">
                    {service.description}
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                  custom={0.1}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">What&apos;s Included</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {service.features.map((f: string) => (
                      <div className="flex items-center gap-3 py-3.5 px-4 rounded-xl bg-white/70 border border-slate-900/[0.06]" key={f}>
                        <div className="w-5 h-5 rounded-full bg-violet-600/10 text-violet-700 flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                        <span className="text-slate-505 text-xs font-semibold">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                  custom={0.15}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Deliverables</h2>
                  <div className="flex flex-col gap-3">
                    {service.deliverables.map((d: string, i: number) => (
                      <div className="flex items-center gap-4 py-4 px-5 rounded-xl bg-violet-600/[0.04] border border-violet-600/[0.08]" key={d}>
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-slate-800">{d}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Sidebar */}
              <div className="flex flex-col gap-6">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={scaleIn}
                  custom={0.2}
                  className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl"
                >
                  <h3 className="text-base font-bold text-slate-900 mb-6">Project Details</h3>
                  <div className="flex flex-col gap-5 mb-8">
                    {[
                      { label: "Starting Price", value: service.startingPrice, accent: true },
                      { label: "Timeline",       value: service.duration,      accent: false },
                    ].map((row) => (
                      <div className="pb-5 border-b border-slate-900/5 last:border-0" key={row.label}>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">{row.label}</p>
                        <p className="text-lg font-bold" style={{color: row.accent ? "#7c3aed" : "#0f172a"}}>{row.value}</p>
                      </div>
                    ))}
                  </div>
                  <Link className="block text-center py-3.5 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-violet-600 to-indigo-600 text-white mb-3 shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all w-full" href="/contact">
                    Get a Quote →
                  </Link>
                  <Link className="block text-center py-3 px-6 rounded-xl font-bold text-xs border border-slate-900/10 bg-slate-900/5 text-slate-700 hover:bg-slate-900/10 transition-all w-full" href="/portfolio">
                    See Our Work
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
