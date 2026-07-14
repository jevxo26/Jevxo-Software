"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, viewportSettings, hoverLift } from "@/lib/animations";

interface NetworkNode {
  id: string;
  name: string;
  x: string;
  y: string;
  websites: string;
  clients: string;
  partners: string;
  revenue: string;
}

interface NetworkSectionProps {
  nodes: NetworkNode[];
  selectedNode: NetworkNode | null;
  setSelectedNode: (node: NetworkNode) => void;
}

export default function NetworkSection({ nodes, selectedNode, setSelectedNode }: NetworkSectionProps) {
  return (
    <section className="py-24 border-t border-slate-900/10 overflow-hidden bg-transparent" id="network">
      <div className="w-11/12 max-w-[1400px] mx-auto">
        
        <div className="text-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.05}
            className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border border-violet-600/20 bg-violet-600/[0.04] text-xs font-bold text-violet-700 uppercase tracking-wider mb-5"
          >
            Global Network
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.15}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            Active Jevxo <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Ecosystem Map</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.25}
            className="text-slate-505 max-w-[620px] mx-auto mt-4 text-base leading-relaxed"
          >
            Hover over or click on our operational centers to see active statistics and client volumes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          {/* SVG Map Container */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.3}
            className="lg:col-span-3"
          >
            <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 relative p-5 rounded-2xl h-[420px] overflow-hidden flex items-center justify-center">
              {/* Fake SVG World Map Background */}
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-15 pointer-events-none">
                <path d="M150,150 Q170,120 200,130 T250,160 T300,120 T350,150 T400,110 T450,130 T500,160 T550,130 T600,160 T650,120 T700,140 T750,120 T800,150 T850,130 T900,170" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M100,280 Q130,240 180,260 T250,230 T320,270 T400,220 T480,260 T550,230 T620,280 T700,240 T780,290 T850,250 T920,300" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="150" cy="180" r="10" fill="#94a3b8" opacity="0.2" />
                <circle cx="320" cy="220" r="15" fill="#94a3b8" opacity="0.2" />
                <circle cx="550" cy="160" r="12" fill="#94a3b8" opacity="0.2" />
                <circle cx="780" cy="250" r="18" fill="#94a3b8" opacity="0.2" />
              </svg>

              {/* Interactive Nodes */}
              {nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setSelectedNode(node)}
                    className="absolute cursor-pointer p-0 border-0 bg-transparent z-10 -translate-x-1/2 -translate-y-1/2 group/node"
                    style={{ left: node.x, top: node.y }}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulsing Radar Rings */}
                      {isSelected ? (
                        <>
                          <span className="absolute w-8 h-8 rounded-full bg-violet-600/40 animate-radar pointer-events-none" />
                          <span className="absolute w-12 h-12 rounded-full bg-violet-600/20 animate-radar pointer-events-none [animation-delay:0.5s]" />
                        </>
                      ) : (
                        <span className="absolute w-5 h-5 rounded-full bg-cyan-500/30 animate-radar pointer-events-none group-hover/node:scale-125" />
                      )}

                      <span className={`block rounded-full transition-all duration-300 relative z-10 ${
                        isSelected
                          ? "w-4 h-4 bg-violet-600 shadow-[0_0_20px_#7c3aed]"
                          : "w-2.5 h-2.5 bg-cyan-500 shadow-[0_0_10px_#06b6d4] group-hover/node:scale-125"
                      }`} />
                    </div>
                    <span className={`absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold mt-1.5 transition-all duration-300 ${
                      isSelected 
                        ? "opacity-100 text-violet-700 font-bold translate-y-0.5" 
                        : "opacity-60 text-slate-505 translate-y-0"
                    }`}>
                      {node.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Selected Node Details Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
            custom={0.4}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-300 p-10 rounded-2xl border-violet-600/20"
                >
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                    <span className="text-xs font-bold text-violet-700 uppercase tracking-wider">Node Statistics</span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-6">{selectedNode.name}</h3>

                  <div className="grid grid-cols-2 gap-5 mb-8">
                    <div>
                      <div className="text-xs text-slate-500">Active Websites</div>
                      <div className="text-2xl font-bold text-slate-900">{selectedNode.websites}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-505">Clients Base</div>
                      <div className="text-2xl font-bold text-slate-900">{selectedNode.clients}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-505">Country Partners</div>
                      <div className="text-2xl font-bold text-slate-900">{selectedNode.partners}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-505">Annual Revenue</div>
                      <div className="text-2xl font-bold text-cyan-600">{selectedNode.revenue}</div>
                    </div>
                  </div>

                  <Link href="/portal" className="block text-center py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-bold text-sm text-white shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200">
                    Launch Regional Portal →
                  </Link>
                </motion.div>
              ) : (
                <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-10 rounded-2xl text-center text-slate-500">
                  Select a node on the map to inspect live metrics.
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
