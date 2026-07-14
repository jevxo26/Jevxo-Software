"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

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
    <div className="bg-transparent text-slate-900 min-h-screen flex flex-col">
      <div className="flex-1 pt-20">

        {/* Hero */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="w-11/12 max-w-[1700px] mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.05}
              className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-750 mb-5 uppercase tracking-wider"
            >
              Our Workflow
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.15}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
            >
              The blueprint of our<br /><span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Engineering Lifecycle</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.25}
              className="text-slate-505 max-w-[620px] mx-auto text-base leading-relaxed"
            >
              How we take your product from early wireframe requirements all the way to secure, globally replicated cloud node launches.
            </motion.p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-12 border-t border-slate-900/10">
          <div className="w-11/12 max-w-[1700px] mx-auto max-w-[800px]">
            <div className="flex flex-col gap-10 relative">
              {/* Center line decoration for timeline */}
              <div className="absolute left-[20px] top-[20px] bottom-[20px] w-[2px] bg-[linear-gradient(to_bottom,#7c3aed,rgba(124,58,237,0.05))]" />

              {steps.map((step, idx) => (
                <motion.div 
                  className="flex gap-6 relative" 
                  key={step.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                  custom={idx * 0.08}
                >
                  {/* Number bullet */}
                  <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-sm font-extrabold text-white z-[2] shrink-0 shadow-md shadow-violet-650/30">
                    {step.num}
                  </div>

                  {/* Content card */}
                  <motion.div 
                    whileHover="hover"
                    className="flex-1"
                  >
                    <motion.div
                      variants={hoverLift}
                      className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-8 rounded-2xl h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-baseline gap-2.5 mb-4 flex-wrap">
                          <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                          <span className="text-xs text-violet-700 font-bold py-0.5 px-2.5 rounded-full bg-violet-600/[0.08] border border-violet-600/[0.2]">
                            {step.duration}
                          </span>
                        </div>

                        <p className="text-slate-505 text-sm leading-relaxed mb-5">{step.desc}</p>
                      </div>

                      <div className="border-t border-slate-900/5 pt-4 mt-2">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2.5 tracking-wider">Key Deliverables:</h4>
                        <div className="flex flex-col gap-1.5">
                          {step.deliverables.map((del) => (
                            <div className="flex gap-2 items-center text-xs text-slate-505" key={del}>
                              <span className="text-violet-600 font-bold">↳</span>
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-20">
              <motion.h3 
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.05}
                className="text-2xl font-extrabold text-slate-900 mb-4"
              >
                Ready to build your system?
              </motion.h3>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp}
                custom={0.15}
              >
                <Link className="inline-block py-3.5 px-8 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all"
                  href="/contact"
                >
                  Start Project Discovery
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
