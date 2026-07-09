"use client";

import { useState } from "react";

export default function SalesOverviewPage() {
  const [meetingSubject, setMeetingSubject] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [agentMeetings, setAgentMeetings] = useState([
    { subject: "Intro Call: Vortex Agency", date: "July 08, 11:30 AM" }
  ]);

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingSubject || !meetingDate) return;
    setAgentMeetings([{ subject: meetingSubject, date: meetingDate }, ...agentMeetings]);
    setMeetingSubject("");
    setMeetingDate("");
    alert("Outbound sales meeting successfully logged.");
  };

  return (
    <div className="flex flex-col gap-7">
      
      {/* Target Progress Bar and scheduler */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-7">
        
        {/* Target Progress Bar */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-900 mb-5">🎯 Target Commission Tracker</h3>
          
          <div className="mb-5">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-800">Daily Target ($500)</span>
              <span className="text-cyan-600">70%</span>
            </div>
            <div className="w-full h-2 bg-slate-900/5 rounded-full overflow-hidden">
              <div style={{ width: "70%" }} className="h-full bg-cyan-600 rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-800">Monthly Target ($15,000)</span>
              <span className="text-violet-600">85%</span>
            </div>
            <div className="w-full h-2 bg-slate-900/5 rounded-full overflow-hidden">
              <div style={{ width: "85%" }} className="h-full bg-violet-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Meeting Scheduler */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl" id="sales-meetings">
          <h3 className="text-sm font-bold text-slate-900 mb-4">📅 Schedule Client Call</h3>
          <form onSubmit={handleScheduleMeeting}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Meeting Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Core Redesign Demo"
                  required
                  value={meetingSubject}
                  onChange={(e) => setMeetingSubject(e.target.value)}
                  className="w-full p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-1.5">Date & Time</label>
                <input
                  type="text"
                  placeholder="e.g. July 10, 3:00 PM"
                  required
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full p-2 px-3 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-violet-600 placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Log Call Details
            </button>
          </form>
        </div>

      </div>

      {/* Upcoming logged meetings */}
      <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 transition-all duration-200 p-7 rounded-2xl">
        <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-3">UPCOMING CALLS</div>
        <div className="flex flex-col gap-2">
          {agentMeetings.map((meet, idx) => (
            <div key={idx} className="text-xs bg-slate-900/5 border border-slate-900/5 p-3 px-4 rounded-xl text-slate-700">
              📞 <strong className="font-bold text-slate-900">{meet.subject}</strong> — Scheduled Date: {meet.date}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
