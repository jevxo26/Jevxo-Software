"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";
import { services as defaultServices } from "@/lib/data/services";

// Custom Premium SVGs
const IconLaptop = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
    <line x1="12" y1="17" x2="12" y2="20" />
  </svg>
);

const IconPalette = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03456 19.176 5.0999 19.434 5.02108 19.6708L4.69047 20.6627C4.4842 21.2815 4.94528 21.9213 5.59792 21.9928C5.73034 22.0073 5.86438 22.0072 5.99676 21.9925L7.26083 21.852C7.5262 21.8225 7.79155 21.9238 7.97858 22.1108L8.15857 22.2908C8.94803 23.0803 10.0988 23.3644 11.1643 23.0336C11.4395 22.9481 11.724 22.9818 11.9754 23.1293L12 23.1436" />
  </svg>
);

const IconPhone = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const IconCloud = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const IconCpu = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
  </svg>
);

const IconChart = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconClock = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const getServiceIcon = (slug: string) => {
  switch (slug) {
    case "web-development": return <IconLaptop />;
    case "ui-ux-design":    return <IconPalette />;
    case "mobile-apps":     return <IconPhone />;
    case "cloud-devops":    return <IconCloud />;
    case "ai-integration":  return <IconCpu />;
    case "digital-strategy": return <IconChart />;
    default:                return <IconLaptop />;
  }
};

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
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="w-11/12 max-w-[1400px] mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.05}
              className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
            >
              What We Offer
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.15}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            >
              Services Built for<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Ambitious Companies</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.25}
              className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed"
            >
              End-to-end digital capabilities under one roof. From strategy and design to engineering, deployment, and beyond.
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 border-t border-slate-900/10">
          <div className="w-11/12 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicesList.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={scaleIn}
                  custom={idx * 0.08}
                  whileHover="hover"
                  className="h-full"
                >
                  <Link className="block h-full" href={`/services/${service.slug}`}>
                    <motion.div
                      variants={hoverLift}
                      className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-10 rounded-2xl h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/25 shrink-0">
                            {getServiceIcon(service.slug)}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-1">{service.title}</h2>
                            <p className="text-violet-600 text-xs font-semibold uppercase tracking-wider">Starting from {service.startingPrice}</p>
                          </div>
                        </div>

                        <p className="text-slate-505 text-sm leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <div className="flex gap-2 mb-6 flex-wrap">
                          {service.features.slice(0, 4).map((f) => (
                            <span className="py-1 px-3 rounded bg-slate-900/5 border border-slate-900/10 text-[10px] font-bold text-slate-550 uppercase tracking-wider" key={f}>
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-900/5 pt-5 mt-4">
                        <span className="text-slate-500 text-xs flex items-center gap-1.5">
                          <IconClock /> {service.duration}
                        </span>
                        <span className="text-violet-600 text-xs font-bold uppercase tracking-wider">View details →</span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-slate-900/10">
          <div className="w-11/12 max-w-[1400px] mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.05}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            >
              Not sure which service you need?
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.15}
              className="text-slate-505 text-base max-w-[620px] mx-auto mb-9 leading-relaxed"
            >
              Book a free 30-minute discovery call and we&apos;ll help you find the right solution.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUp}
              custom={0.25}
            >
              <Link className="py-4 px-10 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 text-white inline-block shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all" href="/contact">
                Book a Free Call →
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
