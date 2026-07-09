"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Discovery & Architecture",
    desc: "We research your business objectives, perform comprehensive competitor audits, and map out the software blueprint. This includes detailing functional API nodes, wireframing workflows, and compiling requirements documents.",
    duration: "Week 1",
    deliverables: ["Product Requirements Document (PRD)", "System Architecture Maps", "Initial Interactive Wireframes"]
  },
  {
    num: "02",
    title: "Interactive UI/UX Design",
    desc: "We build your visual brand identity system from scratch. Our designers iterate on state-of-the-art dark glassmorphism prototypes, ensuring that responsive transitions, layouts, and accessibility requirements are met perfectly.",
    duration: "Weeks 2 - 3",
    deliverables: ["Hi-Fi Figma Prototypes", "Custom Design System Assets", "Component UI Library Mockups"]
  },
  {
    num: "03",
    title: "Full-Stack Agile Development",
    desc: "Our engineers build the application using modern frameworks like Next.js, React, and TypeScript on the frontend, and robust microservices on the backend. Code is push-triggered, peer-reviewed, and continuously integrated.",
    duration: "Weeks 4 - 8",
    deliverables: ["GitHub Repository Integration", "Stage-server Deployment", "Type-safe Clean APIs"]
  },
  {
    num: "04",
    title: "Rigorous QA & Performance Tuning",
    desc: "We test the code for performance bottlenecks, responsive design breakages, security vulnerabilities, and logic flaws. This step includes checking server loading capacity and ensuring zero implicit TypeScript compile warnings.",
    duration: "Week 9",
    deliverables: ["Automated Test Logs", "Security Audit Certificates", "Vite/Lighthouse Performance Audits"]
  },
  {
    num: "05",
    title: "Cloud Launch & Replication",
    desc: "We deploy the production bundle to global edge environments (Vercel, AWS, Cloudflare) and set up server node replication. Active real-time uptime health logs and CMS dashboards are turned over to the client.",
    duration: "Week 10",
    deliverables: ["Global Live Server Assets", "Admin CMS Control Keys", "Post-Launch 24/7 Metrics Setup"]
  }
];

export default function ProcessPage() {
  return (
    <div className="bg-[#080d1a] text-[#f1f5f9] min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient py-[100px] md:py-[70px] relative overflow-hidden pt-[140px] pb-[60px]">
        <div className="rounded-full blur-[80px] pointer-events-none absolute bg-violet-600/[0.07] w-[500px] h-[500px] -top-[200px] -left-[100px]" />
        <div className="w-11/12 max-w-[1400px] mx-auto relative z-[1] text-center">
          <div className="inline-block py-1 px-3.5 rounded-full border border-violet-600/[0.3] bg-violet-600/[0.08] text-xs font-semibold text-[#a78bfa] mb-6 uppercase tracking-widest">
            Our Workflow
          </div>
          <h1 className="text-[clamp(36px,6vw,64px)] font-black tracking-tight mb-5">
            The blueprint of our<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Engineering Lifecycle</span>
          </h1>
          <p className="text-[17px] text-slate-600 max-w-[580px] mx-auto leading-relaxed">
            How we take your product from early wireframe requirements all the way to secure, globally replicated cloud node launches.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-[100px] md:py-[70px] pb-[100px]">
        <div className="w-11/12 max-w-[1400px] mx-auto max-w-[800px]">
          <div className="flex flex-col gap-[60px] relative">
            {/* Center line decoration for timeline */}
            <div className="absolute left-[20px] top-[20px] bottom-[20px] w-[2px] bg-[linear-gradient(tobottom,#7c3aed,rgba(124,58,237,0.05))]" />

            {steps.map((step) => (
              <div className="flex gap-6 relative" key={step.num}>
                {/* Number bullet */}
                <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-sm font-extrabold text-[#fff] z-[2]" style={{boxShadow: "0 0 15px rgba(124,58,237,0.4)", flexShrink: 0}}>
                  {step.num}
                </div>

                {/* Content card */}
                <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 flex-1 p-[30px] rounded-2xl bg-white/[0.01] border-white/[0.06]">
                  <div className="flex justify-between items-baseline gap-2.5 mb-4" style={{flexWrap: "wrap"}}>
                    <h3 className="text-xl font-bold m-[0]">{step.title}</h3>
                    <span className="text-xs text-[#a78bfa] font-bold py-0.5 px-2.5 rounded-full bg-violet-600/[0.08] border border-violet-600/[0.2]">
                      {step.duration}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{step.desc}</p>

                  <div className="border-t border-[1px solid rgba(255,255,255,0.05)] pt-4">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2.5 tracking-[0.05em]">Key Deliverables:</h4>
                    <div className="flex flex-col gap-1.5">
                      {step.deliverables.map((del) => (
                        <div className="flex gap-2 items-center text-[13px] text-slate-600" key={del}>
                          <span className="text-[#a78bfa]">↳</span>
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <h3 className="text-[22px] font-extrabold mb-4">Ready to build your system?</h3>
            <Link className="inline-block py-3.5 px-8 rounded-[10px] text-sm font-bold bg-gradient-to-br from-violet-600 to-indigo-600 text-[#fff]"
              href="/contact"
              style={{boxShadow: "0 4px 20px rgba(124,58,237,0.3)"}}
            >
              Start Project Discovery
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
