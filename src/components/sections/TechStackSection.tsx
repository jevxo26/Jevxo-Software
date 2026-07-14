"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

const technologies = [
  {
    name: "JavaScript",
    color: "bg-[#f7df1e] hover:shadow-[#f7df1e]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#323330]">
        <path d="M1.9 1.9v20.2h20.2V1.9H1.9zm13.1 14.8c.3.9.9 1.5 2.1 1.5 1.1 0 1.8-.6 1.8-1.4 0-1-.8-1.3-2.1-1.9-1.9-.8-3.1-1.5-3.1-3.6 0-2 1.6-3.4 3.9-3.4 2 0 3.3.9 3.8 2.2l-1.8 1.1c-.3-.7-.9-1.1-1.9-1.1-1 0-1.5.5-1.5 1.1 0 .7.5 1 1.6 1.5 2.1.9 3.6 1.7 3.6 4.1 0 2.2-1.7 3.7-4.4 3.7-2.7 0-4.2-1.2-4.8-2.6l1.8-1.2zm-7.6 2.5c-.3.7-.8 1.1-1.7 1.1-1.1 0-1.8-.7-1.8-2.4V9.6H6.1v6c0 2.9 1.5 4.1 3.9 4.1 1 0 1.8-.3 2.3-.9l-.6-1.5c-.3.4-.6.6-1 .6z"/>
      </svg>
    )
  },
  {
    name: "Next.js",
    color: "bg-[#ffffff] hover:shadow-[#ffffff]/40 border border-slate-200",
    icon: (
      <svg viewBox="0 0 128 128" className="w-8 h-8 fill-black">
        <path d="M106.1 106.1L64.3 54.3H49.5v39.4h9.9V67.8l32.9 44.9c4.2-3.1 8-6.9 11-11.2zM87.3 34.3h9.9v57.8L87.3 78.4V34.3z" />
      </svg>
    )
  },
  {
    name: "NestJS",
    color: "bg-[#ea2845] hover:shadow-[#ea2845]/30",
    icon: (
      <svg viewBox="0 0 256 255" className="w-8 h-8 fill-white">
        <path d="M128 0L24 54v70c0 68 44 131 104 148 60-17 104-80 104-148V54L128 0zm68 124c0 30-18 57-46 67v-38c16-5 28-20 28-38 0-22-18-40-40-40-40 0-40 18-40 40 0 18 12 33 28 38v38c-28-10-46-37-46-67 0-41 33-74 74-74s74 33 74 74z" />
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    color: "bg-[#38bdf8] hover:shadow-[#38bdf8]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    )
  },
  {
    name: "Docker",
    color: "bg-[#0db7ed] hover:shadow-[#0db7ed]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V9.006a.185.185 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.185.185 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.185.185 0 0 0 .186-.186V6.29a.185.185 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.186v1.887c0 .102.082.185.185.185m-2.953 2.715h2.119c.102 0 .185-.083.185-.185V9.006a.186.186 0 0 0-.185-.186h-2.119a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.954 0h2.119c.102 0 .185-.083.185-.185V9.006a.186.186 0 0 0-.185-.186H5.122a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.954 0h2.119c.101 0 .185-.083.185-.185V9.006a.185.185 0 0 0-.185-.186H2.168a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.954-2.716h2.119c.101 0 .185-.083.185-.185V6.29a.185.185 0 0 0-.185-.185H2.168a.185.185 0 0 0-.186.185v1.887c0 .102.084.185.186.185m5.908 0h2.119c.102 0 .185-.083.185-.185V6.29a.185.185 0 0 0-.185-.185H5.122a.185.185 0 0 0-.186.185v1.887c0 .102.084.185.186.185m-2.954-2.715h2.119c.102 0 .185-.083.185-.186V3.574a.186.186 0 0 0-.185-.185H2.168a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.213 11.23c-.116 0-.231.006-.345.018-.01.001-.018.01-.018.02v.759c0 .012.01.022.022.02.597-.044 1.189-.133 1.764-.265.011-.003.018-.013.016-.024l-.135-.506a.023.023 0 0 0-.022-.017c-.424.01-.851.015-1.282.015m21.037-3.112c-.522-.721-1.344-1.282-2.18-1.57a.126.126 0 0 0-.147.05c-.092.146-.178.29-.257.43a.126.126 0 0 0 .025.155c.677.587 1.127 1.298 1.344 2.118a.126.126 0 0 0 .121.094h1.026a.126.126 0 0 0 .123-.153 6.945 6.945 0 0 0-.055-1.124M23.991 12.63c-.1-.706-.525-2.228-2.23-3.17a.127.127 0 0 0-.174.053c-.118.204-.23.414-.336.63a.126.126 0 0 0 .034.156c1.37.973 1.637 2.21 1.69 2.766a.127.127 0 0 0 .126.115h1.017a.127.127 0 0 0 .125-.138c-.015-.145-.029-.283-.048-.422M8.887 17.206c-1.344 0-2.617-.291-3.69-.817a.026.026 0 0 0-.037.017l-.547.781a.026.026 0 0 0 .01.038c1.353.774 2.923 1.205 4.542 1.205 5.568 0 10.098-3.486 10.098-7.768v-.125c0-.014-.011-.025-.025-.025h-1.025a.025.025 0 0 0-.025.025v.062c0 3.733-4.148 6.643-9.301 6.643M1.144 14.51c.24 1.488.945 2.764 1.977 3.666a.026.026 0 0 0 .037-.004l.582-.58a.026.026 0 0 0 0-.037c-.822-.767-1.365-1.74-1.57-2.824a.026.026 0 0 0-.023-.021l-.98-.109a.027.027 0 0 0-.023.009z"/>
      </svg>
    )
  },
  {
    name: "Go Language",
    color: "bg-[#00acd7] hover:shadow-[#00acd7]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white font-black">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontFamily="sans-serif">GO</text>
      </svg>
    )
  },
  {
    name: "Amazon Web Services",
    color: "bg-[#232f3e] hover:shadow-[#232f3e]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M12.04 12.01c-.13-.39-.38-.72-.75-.98-.37-.26-.81-.39-1.32-.39-.52 0-.96.12-1.33.36-.37.24-.62.59-.75 1.04v.05c.13.43.39.76.77.99.38.23.82.35 1.32.35.53 0 .97-.13 1.32-.38.35-.25.59-.6.72-1.04zm7.98-2.61c-.55 0-1.05.15-1.51.45s-.77.72-.94 1.26v-1.5h-1.89v5.99h1.89v-3.15c0-.52.12-.92.36-1.18.24-.26.56-.39.95-.39.42 0 .72.13.91.4.19.27.28.66.28 1.17v3.16h1.91v-3.41c0-.98-.22-1.74-.67-2.28-.45-.55-1.05-.83-1.79-.83zm-14.86.37l1.09 3.03.95-3.03h2.02l-2.02 5.99h-1.93l-2.12-5.99h2.01zm4.84-.37c-.77 0-1.42.19-1.95.58-.53.39-.88.94-1.05 1.65h1.98c.09-.28.24-.49.46-.64.22-.15.48-.23.77-.23.36 0 .63.1.81.3.18.2.27.49.27.87v.34c-.38.01-.84.04-1.38.09-.64.06-1.17.21-1.59.45s-.63.63-.63 1.17c0 .52.18.92.54 1.21.36.29.84.44 1.44.44.59 0 1.09-.16 1.51-.48.42-.32.68-.78.78-1.38h.04v1.65h1.89v-3.87c0-1-.28-1.76-.84-2.27-.56-.52-1.35-.78-2.38-.78z"/>
        <path d="M2.57 19.34c4.01 2.37 9.38 2.65 14.15 1.04.53-.18.33-.94-.2-.8-.43.11-4.48.98-8.91-.49-3.23-1.07-5.99-3.26-6.68-4.23-.27-.38-.83.05-.36.48z" fill="#FF9900" />
        <path d="M17.26 18.06c-.19-.24-.65-.07-.56.24.23.83.47 1.83.21 2.62-.09.28.24.47.45.24.52-.57 1.22-1.63 1.04-2.8-.02-.12-.13-.23-.21-.3-.21-.19-.74-.23-.93 0z" fill="#FF9900" />
      </svg>
    )
  },
  {
    name: "Git & Version Control",
    color: "bg-[#f05032] hover:shadow-[#f05032]/40 shadow-lg shadow-[#f05032]/25 scale-110 relative z-10",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M23.384 11.616L12.384.616a1.077 1.077 0 0 0-1.52 0l-2.616 2.616a.224.224 0 0 0 0 .316l2.126 2.126c.4-.2.8-.3 1.3-.3.9 0 1.7.5 2.1 1.3.4.4.6.9.6 1.5 0 .6-.2 1.1-.6 1.5l2.408 2.408c.5-.2 1.1-.2 1.6.1.7.4 1.1 1.1 1.1 2 0 .9-.4 1.6-1.1 2-.7.4-1.6.4-2.2 0-.7-.4-1.1-1.1-1.1-2 0-.5.1-1 .4-1.4l-2.428-2.428c-.4.3-.9.4-1.4.4-.5 0-1-.1-1.4-.4L8.334 14.8c.2.4.3.9.3 1.4 0 .9-.4 1.6-1.1 2-.7.4-1.6.4-2.2 0-.7-.4-1.1-1.1-1.1-2 0-.9.4-1.6 1.1-2 .5-.3 1-.3 1.5-.1l3.284-3.284c-.2-.4-.3-.9-.3-1.4 0-.6.2-1.1.6-1.5L8.134 6.2a.224.224 0 0 0-.316 0L.618 11.384a1.077 1.077 0 0 0 0 1.52l11 11a1.077 1.077 0 0 0 1.52 0l10.246-10.246a1.08 1.08 0 0 0 0-1.522z"/>
      </svg>
    ),
    isHighlighted: true
  },
  {
    name: "Terraform",
    color: "bg-[#7b42bc] hover:shadow-[#7b42bc]/30",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
        <path d="M1.44 0v7.575L8 11.36V3.785L1.44 0zm0 8.71v7.575L8 20.07v-7.576L1.44 8.71zm14.56-4.925V11.36L22.56 7.575V0L16 3.785zm-7.28 6.335v7.576l6.56 3.784v-7.575l-6.56-3.785z"/>
      </svg>
    )
  },
  {
    name: "React",
    color: "bg-[#20232a] hover:shadow-[#61dafb]/30",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 fill-none stroke-[#61dafb] stroke-[1.2]">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    )
  }
];

export default function TechStackSection() {
  return (
    <section className="py-24 border-t border-slate-900/10 bg-transparent relative overflow-hidden" id="tech-stack">
      <div className="absolute w-[400px] h-[400px] -top-24 -left-24 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] -bottom-24 -right-24 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      
      <div className="w-11/12 max-w-[1400px] mx-auto text-center relative z-10">
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.05}
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
          >
            Integrations
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.15}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            Technology Stack for <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Maximum Efficiency</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.25}
            className="text-slate-500 max-w-[620px] mx-auto mt-4 text-base leading-relaxed mb-10"
          >
            Jevxo leverages leading technologies and platforms, ensuring robust, high-performance, and scalable solutions for modern enterprises.
          </motion.p>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.35}
            className="mb-14"
          >
            <Link href="/about" className="inline-block py-4 px-10 rounded-[14px] font-bold text-[17px] bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-200">
              View About Jevxo
            </Link>
          </motion.div>
        </div>

        {/* Row of Technology Circles */}
        <div className="flex items-center justify-center gap-6 md:gap-7 flex-wrap max-w-5xl mx-auto px-4 py-8">
          {technologies.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={scaleIn}
              custom={idx * 0.05 + 0.3}
              whileHover="hover"
              className="group relative flex flex-col items-center"
            >
              <motion.div
                variants={hoverLift}
                className={`w-[68px] h-[68px] md:w-[76px] md:h-[76px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${tech.color} ${
                  tech.isHighlighted 
                    ? "shadow-[0_0_25px_rgba(240,80,50,0.4)] animate-pulse" 
                    : "shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-lg"
                }`}
              >
                <div className="transform transition-transform duration-300 group-hover:rotate-12">
                  {tech.icon}
                </div>
              </motion.div>
              
              {/* Tooltip */}
              <span className="absolute bottom-full mb-3 scale-0 group-hover:scale-100 transition-all duration-150 bg-slate-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-30">
                {tech.name}
                {/* Tooltip Arrow */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-900" />
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bridge link to Our Process */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp}
          custom={0.55}
          className="mt-14"
        >
          <Link
            href="/process"
            className="inline-flex items-center gap-2.5 py-2.5 px-6 rounded-full border border-slate-900/10 bg-slate-900/[0.03] text-xs font-semibold text-slate-605 hover:text-slate-900 hover:bg-slate-900/[0.06] hover:border-slate-900/25 transition-all duration-200"
          >
            <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Our Process
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
