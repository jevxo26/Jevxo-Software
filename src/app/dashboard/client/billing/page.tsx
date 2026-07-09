"use client";

import { useState } from "react";
import { initialInvoices, InvoiceItem } from "../../mockData";

export default function ClientBillingPage() {
  const [invoices] = useState<InvoiceItem[]>(initialInvoices);
  const [supportTicket, setSupportTicket] = useState({ title: "", priority: "Medium", message: "" });
  const [ticketsList, setTicketsList] = useState([
    { id: "TCK-809", title: "Domain SSL configuration error", priority: "High", status: "Open" }
  ]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportTicket.title) return;
    const t = {
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      title: supportTicket.title,
      priority: supportTicket.priority,
      status: "Open"
    };
    setTicketsList([t, ...ticketsList]);
    setSupportTicket({ title: "", priority: "Medium", message: "" });
    alert("Billing support request submitted to operations queue.");
  };

  const handleDownloadInvoice = (invId: string) => {
    alert(`Initiating secure SSL download of invoice PDF for ${invId}.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-7">
      
      {/* Billing Invoice history table */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-base font-bold text-slate-900 mb-4">Invoice Billing History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-left">
            <thead>
              <tr className="border-b border-slate-900/10 text-slate-400 font-medium">
                <th className="p-2.5">Invoice ID</th>
                <th className="p-2.5">Billing Date</th>
                <th className="p-2.5">Amount Paid</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-slate-900/5 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-2.5 font-bold text-slate-900">{inv.id}</td>
                  <td className="py-3 px-2.5 text-slate-600">{inv.date}</td>
                  <td className="py-3 px-2.5 text-slate-600">{inv.amount}</td>
                  <td className="py-3 px-2.5">
                    <span className={`text-[11px] font-bold py-0.5 px-2 rounded-full inline-block ${
                      inv.status === "Paid"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-red-500/10 text-red-600"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-2.5 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(inv.id)}
                      className="py-1 px-2.5 rounded bg-slate-900/5 border border-slate-900/[0.08] text-violet-600 text-xs font-semibold hover:bg-slate-900/10 transition-colors"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* support Desk Form */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <h3 className="text-base font-bold text-slate-900 mb-4">Open Billing Support Ticket</h3>
        <form onSubmit={handleCreateTicket} className="space-y-4">
          <div>
            <label className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Ticket Title</label>
            <input
              type="text"
              placeholder="e.g. Failed transaction refund query"
              required
              value={supportTicket.title}
              onChange={(e) => setSupportTicket({ ...supportTicket, title: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Priority Rating</label>
            <select
              value={supportTicket.priority}
              onChange={(e) => setSupportTicket({ ...supportTicket, priority: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600"
            >
              <option value="High">🚨 High priority</option>
              <option value="Medium">⚡ Medium priority</option>
              <option value="Low">💤 Low priority</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">Detailed Message</label>
            <textarea
              rows={3}
              placeholder="Explain the problem..."
              value={supportTicket.message}
              onChange={(e) => setSupportTicket({ ...supportTicket, message: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
            />
          </div>

          <button type="submit" className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition-all duration-150 cursor-pointer">Submit Ticket</button>
        </form>

        {/* Existing tickets list */}
        <div className="mt-6 border-t border-slate-900/10 pt-4">
          <div className="text-[11px] text-slate-400 font-bold tracking-wider uppercase mb-2">YOUR ACTIVE TICKETS</div>
          {ticketsList.map(t => (
            <div key={t.id} className="text-xs bg-slate-900/5 border border-slate-900/5 p-2 px-3 rounded-lg flex justify-between items-center mb-1.5">
              <span className="text-slate-700 font-medium">{t.title}</span>
              <span className="text-violet-600 font-bold">{t.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
