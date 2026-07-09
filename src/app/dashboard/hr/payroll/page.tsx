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
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-7">
      
      {/* Payroll calculations list */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Staff Salary Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs text-left">
            <thead>
              <tr className="border-b border-slate-900/10 text-slate-500">
                <th className="p-2.5 font-semibold">Employee</th>
                <th className="p-2.5 font-semibold">Base Salary</th>
                <th className="p-2.5 font-semibold">Bonuses</th>
                <th className="p-2.5 font-semibold">Commissions</th>
                <th className="p-2.5 font-semibold text-right">Net Payout</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((p) => (
                <tr key={p.id} className="border-b border-slate-900/5 hover:bg-slate-50/50 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-950">{p.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{p.role}</div>
                  </td>
                  <td className="p-3 text-slate-600">{p.base}</td>
                  <td className="p-3 text-emerald-600 font-semibold">{p.bonus}</td>
                  <td className="p-3 text-cyan-600 font-semibold">{p.commission}</td>
                  <td className="p-3 text-right font-bold text-slate-950">{p.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bonus Entry Form */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Credit Bonus Reward</h3>
        <form onSubmit={handleAddBonus}>
          <div className="mb-3">
            <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Select Employee</label>
            <select
              value={bonusForm.employeeId}
              onChange={(e) => setBonusForm({ ...bonusForm, employeeId: e.target.value })}
              className="w-full p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
            >
              {payrolls.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.role})</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Bonus Amount (USD)</label>
            <input
              type="number"
              placeholder="e.g. 150"
              required
              value={bonusForm.amount}
              onChange={(e) => setBonusForm({ ...bonusForm, amount: e.target.value })}
              className="w-full p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600"
            />
          </div>

          <div className="mb-5">
            <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Calculation Reference Note</label>
            <textarea
              rows={2}
              placeholder="e.g. Q2 performance target bonus"
              value={bonusForm.note}
              onChange={(e) => setBonusForm({ ...bonusForm, note: e.target.value })}
              className="w-full p-2.5 px-3.5 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Commit Bonus
          </button>
        </form>
      </div>

    </div>
  );
}
