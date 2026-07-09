"use client";

import { useState } from "react";
import { initialClients, ClientItem } from "../../mockData";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);

  const handleToggleSuspend = (client: ClientItem) => {
    setSelectedClient(client);
  };

  const confirmSuspendClient = () => {
    if (selectedClient) {
      setClients(clients.map(c => {
        if (c.id === selectedClient.id) {
          const nextStatus = c.status === "Suspended" ? "Active" : "Suspended";
          return { ...c, status: nextStatus };
        }
        return c;
      }));
      setSelectedClient(null);
    }
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === "All" ? true : c.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-7">
      
      {/* Search and Filters Header */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] transition-all duration-200 p-7 rounded-2xl">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Client Database Management</h3>
            <p className="text-xs text-slate-600">Track plans, suspend websites, or audit system memberships.</p>
          </div>
          
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search Client ID or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2.5 px-3.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-[13px] w-[240px] focus:outline-none focus:ring-1 focus:ring-violet-600"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2.5 px-3.5 rounded-lg border border-slate-900/[0.08] bg-slate-900/5 text-slate-900 text-[13px] cursor-pointer focus:outline-none focus:ring-1 focus:ring-violet-600"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Expired">Expired</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Database Table */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse text-sm text-left">
            <thead>
              <tr className="border-b border-slate-900/10 text-slate-500">
                <th className="py-3 px-2.5">Client ID</th>
                <th className="py-3 px-2.5">Company / Name</th>
                <th className="py-3 px-2.5">Plan Level</th>
                <th className="py-3 px-2.5">Country</th>
                <th className="py-3 px-2.5">Status</th>
                <th className="py-3 px-2.5 text-right">Ecosystem Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((c) => (
                <tr key={c.id} className="border-b border-slate-900/5 hover:bg-slate-900/[0.02] transition-colors">
                  <td className="py-3.5 px-2.5 font-bold text-slate-900">{c.id}</td>
                  <td className="py-3.5 px-2.5">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{c.website}</div>
                  </td>
                  <td className="py-3.5 px-2.5">
                    <span className="text-xs bg-slate-900/5 py-0.5 px-2 rounded">{c.plan}</span>
                  </td>
                  <td className="py-3.5 px-2.5">{c.country}</td>
                  <td className="py-3.5 px-2.5">
                    <span className={`text-[11px] font-bold py-1 px-2.5 rounded-full ${
                      c.status === "Active"
                        ? "bg-emerald-500/12 text-emerald-600"
                        : c.status === "Suspended"
                        ? "bg-red-500/12 text-red-600"
                        : "bg-amber-500/12 text-amber-600"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-2.5 text-right">
                    <button
                      onClick={() => handleToggleSuspend(c)}
                      className={`py-1.5 px-3 rounded-lg border text-xs font-bold cursor-pointer transition-all duration-200 ${
                        c.status === "Suspended"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20"
                          : "bg-red-500/10 border-red-500/20 text-red-600 hover:bg-red-500/20"
                      }`}
                    >
                      {c.status === "Suspended" ? "Activate Website" : "Suspend Node"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suspension Confirmation Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center z-[999] p-5">
          <div className="bg-white border border-slate-900/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.15)] w-full max-w-[440px] p-8 rounded-2xl relative">
            <h4 className="text-base font-bold text-slate-900 mb-3">
              ⚠️ Confirm System Authorization Action
            </h4>
            <p className="text-[13px] text-slate-600 leading-relaxed mb-6">
              Are you sure you want to {selectedClient.status === "Suspended" ? "ACTIVATE" : "SUSPEND"} the Jevxo node subscription for <strong>{selectedClient.name}</strong> ({selectedClient.id})? This will immediately toggle public server availability.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setSelectedClient(null)}
                className="py-2 px-4 rounded-lg bg-slate-900/5 border border-slate-900/[0.08] text-slate-700 text-[13px] font-semibold cursor-pointer hover:bg-slate-900/10 transition-colors"
              >
                Cancel Action
              </button>
              <button
                onClick={confirmSuspendClient}
                className={`py-2 px-4 rounded-lg text-white text-[13px] font-bold cursor-pointer transition-colors ${
                  selectedClient.status === "Suspended" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirm and Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
