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
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "28px" }} className="admin-grid-top">
      
      {/* Intern lists and Certs */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Intern Performance Tracker</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {interns.map((intern) => (
            <div key={intern.id} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", padding: "20px", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>{intern.name}</h4>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{intern.role}</div>
                </div>
                
                <span style={{ fontSize: "14px", fontWeight: 800, color: "#a78bfa" }}>Grade: {intern.score}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px", fontSize: "12px", color: "var(--text-secondary)" }}>
                <span>Skill Growth Index:</span>
                <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                  <div style={{ width: `${intern.growth}%`, height: "4px", background: "#7c3aed", borderRadius: "2px" }} />
                </div>
                <span>{intern.growth}%</span>
              </div>

              <button
                onClick={() => handleDownloadCertificate(intern.name, intern.role)}
                style={{
                  marginTop: "16px",
                  padding: "6px 12px",
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  color: "#a78bfa",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                🎓 Generate Certificate (PDF)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Intern evaluation scoring form */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Internship Appraisal Review</h3>
        <form onSubmit={handleEvaluate}>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Select Intern</label>
            <select
              value={evaluation.internId}
              onChange={(e) => setEvaluation({ ...evaluation, internId: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(8,13,26,0.9)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            >
              {interns.map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Evaluation Grade</label>
            <select
              value={evaluation.score}
              onChange={(e) => setEvaluation({ ...evaluation, score: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(8,13,26,0.9)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            >
              <option value="A+">A+ Exceptional</option>
              <option value="A">A Outstanding</option>
              <option value="B+">B+ Strong</option>
              <option value="B">B Satisfactory</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Skill Growth Feedback</label>
            <textarea
              rows={3}
              placeholder="Appraisal details..."
              value={evaluation.comment}
              onChange={(e) => setEvaluation({ ...evaluation, comment: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            />
          </div>

          <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Submit Appraisal</button>
        </form>
      </div>

    </div>
  );
}
