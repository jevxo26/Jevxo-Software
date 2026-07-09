"use client";

import { useState } from "react";

export default function HrInternsPage() {
  const [interns, setInterns] = useState([
    { id: "emp-105", name: "Tanvir Ahmed", role: "Sales Exec Intern", team: "Outbound Sales Team", growth: 78, score: "B+" },
    { id: "intern-2", name: "Maria Karim", role: "UI Design Intern", team: "Creative Design Hub", growth: 92, score: "A" }
  ]);

  const [evaluation, setEvaluation] = useState({ internId: "emp-105", score: "A", comment: "" });

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setInterns(interns.map(i => {
      if (i.id === evaluation.internId) {
        return { ...i, score: evaluation.score, growth: Math.min(100, i.growth + 5) };
      }
      return i;
    }));
    alert("Intern appraisal score submitted successfully!");
    setEvaluation({ internId: "emp-105", score: "A", comment: "" });
  };

  const handleDownloadCertificate = (name: string, role: string) => {
    alert(`Provisioning official Jevxo Internship Certificate PDF for ${name} (${role}). Download bundle queue triggered.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1.4fr] gap-7">
      
      {/* Intern lists and Certs */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Intern Performance Tracker</h3>
        
        <div className="flex flex-col gap-4">
          {interns.map((intern) => (
            <div key={intern.id} className="bg-slate-900/5 border border-slate-900/5 p-5 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-950">{intern.name}</h4>
                  <div className="text-[11px] text-slate-400 mt-0.5">{intern.role}</div>
                </div>
                
                <span className="text-xs font-bold text-violet-600">Grade: {intern.score}</span>
              </div>

              <div className="flex items-center gap-2.5 mt-3 text-xs text-slate-500">
                <span>Skill Growth Index:</span>
                <div className="flex-1 h-1 bg-slate-900/5 rounded-full overflow-hidden">
                  <div style={{ width: `${intern.growth}%` }} className="h-full bg-violet-600 rounded-full" />
                </div>
                <span>{intern.growth}%</span>
              </div>

              <button
                onClick={() => handleDownloadCertificate(intern.name, intern.role)}
                className="mt-4 p-1.5 px-3 bg-violet-600/10 hover:bg-violet-600/15 border border-violet-600/20 text-violet-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                🎓 Generate Certificate (PDF)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Intern evaluation scoring form */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Internship Appraisal Review</h3>
        <form onSubmit={handleEvaluate}>
          <div className="mb-3">
            <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Select Intern</label>
            <select
              value={evaluation.internId}
              onChange={(e) => setEvaluation({ ...evaluation, internId: e.target.value })}
              className="w-full p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
            >
              {interns.map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Evaluation Grade</label>
            <select
              value={evaluation.score}
              onChange={(e) => setEvaluation({ ...evaluation, score: e.target.value })}
              className="w-full p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
            >
              <option value="A+">A+ Exceptional</option>
              <option value="A">A Outstanding</option>
              <option value="B+">B+ Strong</option>
              <option value="B">B Satisfactory</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Skill Growth Feedback</label>
            <textarea
              rows={3}
              placeholder="Appraisal details..."
              value={evaluation.comment}
              onChange={(e) => setEvaluation({ ...evaluation, comment: e.target.value })}
              className="w-full p-2.5 px-3.5 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Submit Appraisal
          </button>
        </form>
      </div>

    </div>
  );
}
