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
    <div style={{ background: "#080d1a", color: "#f1f5f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <section className="bg-hero-gradient section" style={{ position: "relative", overflow: "hidden", paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="orb orb-violet" style={{ width: "500px", height: "500px", top: "-200px", left: "-100px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "100px", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.08)", fontSize: "12px", fontWeight: 600, color: "#a78bfa", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Our Workflow
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "20px" }}>
            The blueprint of our<br /><span className="gradient-text">Engineering Lifecycle</span>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "580px", margin: "0 auto", lineHeight: 1.8 }}>
            How we take your product from early wireframe requirements all the way to secure, globally replicated cloud node launches.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section" style={{ paddingBottom: "100px" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "60px", position: "relative" }}>
            {/* Center line decoration for timeline */}
            <div style={{ position: "absolute", left: "20px", top: "20px", bottom: "20px", width: "2px", background: "linear-gradient(to bottom, #7c3aed, rgba(124,58,237,0.05))" }} />

            {steps.map((step) => (
              <div key={step.num} style={{ display: "flex", gap: "24px", position: "relative" }}>
                {/* Number bullet */}
                <div style={{
                  width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: "#fff",
                  boxShadow: "0 0 15px rgba(124,58,237,0.4)", flexShrink: 0, zIndex: 2
                }}>
                  {step.num}
                </div>

                {/* Content card */}
                <div className="glass" style={{ flex: 1, padding: "30px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, margin: 0 }}>{step.title}</h3>
                    <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: 700, padding: "2px 10px", borderRadius: "100px", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
                      {step.duration}
                    </span>
                  </div>

                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>{step.desc}</p>

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px" }}>
                    <h4 style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "10px", letterSpacing: "0.05em" }}>Key Deliverables:</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {step.deliverables.map((del) => (
                        <div key={del} style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", color: "var(--text-secondary)" }}>
                          <span style={{ color: "#a78bfa" }}>↳</span>
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "16px" }}>Ready to build your system?</h3>
            <Link
              href="/contact"
              style={{
                display: "inline-block", padding: "14px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 700,
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", boxShadow: "0 4px 20px rgba(124,58,237,0.3)"
              }}
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
