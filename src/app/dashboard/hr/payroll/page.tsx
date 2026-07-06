"use client";

import { useState } from "react";

export default function HrPayrollPage() {
  const [bonusForm, setBonusForm] = useState({ employeeId: "emp-101", amount: "", note: "" });
  const [payrolls, setPayrolls] = useState([
    { id: "emp-101", name: "Kabir Hossain", role: "Senior Developer", base: "$3,200", bonus: "$150", commission: "$0", net: "$3,350" },
    { id: "emp-102", name: "Tasnim Ara", role: "UI/UX Designer", base: "$2,800", bonus: "$200", commission: "$0", net: "$3,000" },
    { id: "emp-105", name: "Tanvir Ahmed", role: "Sales Exec Intern", base: "$800", bonus: "$0", commission: "$480", net: "$1,280" }
  ]);

  const handleAddBonus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bonusForm.amount || isNaN(Number(bonusForm.amount))) return;
    
    setPayrolls(payrolls.map(p => {
      if (p.id === bonusForm.employeeId) {
        const currentBonus = Number(p.bonus.replace("$", ""));
        const newBonusVal = currentBonus + Number(bonusForm.amount);
        const baseVal = Number(p.base.replace("$", ""));
        const commVal = Number(p.commission.replace("$", ""));
        return {
          ...p,
          bonus: `$${newBonusVal}`,
          net: `$${baseVal + newBonusVal + commVal}`
        };
      }
      return p;
    }));
    
    setBonusForm({ employeeId: "emp-101", amount: "", note: "" });
    alert("Bonus reward successfully credited!");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "28px" }} className="admin-grid-top">
      
      {/* Payroll calculations list */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Staff Salary Breakdown</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>
                <th style={{ padding: "10px" }}>Employee</th>
                <th style={{ padding: "10px" }}>Base Salary</th>
                <th style={{ padding: "10px" }}>Bonuses</th>
                <th style={{ padding: "10px" }}>Commissions</th>
                <th style={{ padding: "10px", textAlign: "right" }}>Net Payout</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontWeight: 700, color: "#fff" }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{p.role}</div>
                  </td>
                  <td style={{ padding: "12px 10px" }}>{p.base}</td>
                  <td style={{ padding: "12px 10px", color: "#10b981" }}>{p.bonus}</td>
                  <td style={{ padding: "12px 10px", color: "#06b6d4" }}>{p.commission}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700, color: "#fff" }}>{p.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bonus Entry Form */}
      <div className="glass" style={{ padding: "28px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>Credit Bonus Reward</h3>
        <form onSubmit={handleAddBonus}>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Select Employee</label>
            <select
              value={bonusForm.employeeId}
              onChange={(e) => setBonusForm({ ...bonusForm, employeeId: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(8,13,26,0.9)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            >
              {payrolls.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.role})</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Bonus Amount (USD)</label>
            <input
              type="number"
              placeholder="e.g. 150"
              required
              value={bonusForm.amount}
              onChange={(e) => setBonusForm({ ...bonusForm, amount: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", color: "var(--text-secondary)", marginBottom: "6px" }}>Calculation Reference Note</label>
            <textarea
              rows={2}
              placeholder="e.g. Q2 performance target bonus"
              value={bonusForm.note}
              onChange={(e) => setBonusForm({ ...bonusForm, note: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", color: "#fff", fontSize: "13px" }}
            />
          </div>

          <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Commit Bonus</button>
        </form>
      </div>

    </div>
  );
}
