"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
}

const faqs = [
  { q: "How do I update the homepage sections?", a: "Go to Global Admin -> Ecosystem CMS. There, you can edit the Hero tagline, network map coords, pricing plans, and services list in real-time." },
  { q: "Where can I view client inquiries?", a: "Submissions from the public Contact page flow directly into the 'Contact Inbox' tab of the Ecosystem CMS dashboard under Global Admin." },
  { q: "How can I switch between dashboard views?", a: "Use the 'Active Panel Portal' dropdown selector at the top of the sidebar. You can switch roles between Global Admin, CRM, HR, Partner, Sales, and Client." },
  { q: "Are custom services timeline config supported?", a: "Yes, you can edit timeline lengths (e.g., '2-4 weeks') and starting prices for any service catalog directly inside the CMS panel." },
  { q: "What does the Client Marketing Hub contain?", a: "It contains 13 modules designed for client brand acceleration, campaign automation, and SEO performance, accessible via Client Dashboard -> Marketing Hub." }
];

export default function HelpSupportPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load chat logs on mount
  useEffect(() => {
    const stored = localStorage.getItem("jevxo_chat_history");
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default welcome messages
      const welcome: Message[] = [
        {
          id: "welcome_1",
          sender: "agent",
          text: "Hello! Welcome to Jevxo Support Center. I'm your Jevxo Virtual Assistant.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: "welcome_2",
          sender: "agent",
          text: "How can I help you today? You can ask about our CRM panels, editing the home page CMS, or billing cycles.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      setMessages(welcome);
      localStorage.setItem("jevxo_chat_history", JSON.stringify(welcome));
    }
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const saveChatHistory = (list: Message[]) => {
    localStorage.setItem("jevxo_chat_history", JSON.stringify(list));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      sender: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    saveChatHistory(updated);
    setInputText("");

    // Simulate Agent response
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Thank you for reaching out! A Jevxo representative has been notified and will jump in shortly. Feel free to explore our FAQ panel on the left in the meantime!";
      const query = userMsg.text.toLowerCase();

      if (query.includes("cms") || query.includes("hero") || query.includes("homepage") || query.includes("edit")) {
        replyText = "To edit homepage contents, hero text, and pricing plans, go to Global Admin -> Ecosystem CMS. Click 'Apply & Save' to publish changes immediately.";
      } else if (query.includes("inbox") || query.includes("contact") || query.includes("message")) {
        replyText = "All queries sent from the contact pages are collected in the 'Contact Inbox' tab inside the Ecosystem CMS dashboard.";
      } else if (query.includes("billing") || query.includes("invoice") || query.includes("pay")) {
        replyText = "Billing details are managed in Client Dashboard -> Billing & Invoices. You can view payment receipts and invoice logs there.";
      } else if (query.includes("partner") || query.includes("earnings")) {
        replyText = "Partner accounts can view details under Country Partner -> Earnings Wallet, and customize referral kits under Marketing Kit.";
      } else if (query.includes("hr") || query.includes("intern")) {
        replyText = "Intern listings and attendance consoles are fully manageable inside the HR Panel dashboard.";
      }

      const agentMsg: Message = {
        id: `msg_${Date.now() + 1}`,
        sender: "agent",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const nextMessages = [...updated, agentMsg];
      setMessages(nextMessages);
      saveChatHistory(nextMessages);
      setIsTyping(false);
    }, 1200);
  };

  const clearChat = () => {
    if (confirm("Reset chat history?")) {
      const welcome: Message[] = [
        {
          id: "welcome_1",
          sender: "agent",
          text: "Chat history cleared. How else can I assist you?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      setMessages(welcome);
      saveChatHistory(welcome);
    }
  };

  return (
    <div className="flex flex-col gap-7 h-[calc(100vh-160px)]">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Jevxo Help Center & Live Chat</h2>
        <p className="text-xs text-slate-500 mt-1">Find answers or speak directly with our automated virtual assistance center.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-8 flex-1 min-h-0">
        
        {/* LEFT: FAQ ACCORDIONS */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] p-7 rounded-2xl overflow-y-auto">
          <h3 className="text-sm font-bold text-violet-600 mb-5">💡 Frequently Asked Questions</h3>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-900/5 pb-3">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center bg-transparent border-0 text-slate-800 font-semibold text-xs text-left cursor-pointer py-2"
                >
                  <span>{faq.q}</span>
                  <span className="text-xs text-violet-600">{activeFaq === index ? "▼" : "▶"}</span>
                </button>
                {activeFaq === index && (
                  <p className="text-xs text-slate-500 leading-relaxed pt-2 pb-1">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: LIVE CHAT SIMULATOR */}
        <div className="bg-white border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] rounded-2xl flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 px-6 border-b border-slate-900/10 flex justify-between items-center bg-violet-600/5">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Jevxo Assistant</strong>
                <span className="text-[10px] text-slate-500">Uptime Node: virtual_agent_01</span>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="bg-transparent border-0 text-slate-400 hover:text-slate-600 text-[11px] cursor-pointer underline"
            >
              Clear
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs flex-shrink-0">
                      🤖
                    </div>
                  )}
                  <div className="max-w-[75%]">
                    <div
                      className={`p-2.5 px-3.5 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-none"
                          : "bg-slate-900/5 border border-slate-900/5 text-slate-800 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className={`text-[9px] text-slate-400 mt-1 block ${isUser ? "text-right" : "text-left"}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs flex-shrink-0">
                  🤖
                </div>
                <div className="bg-slate-900/5 border border-slate-900/5 p-2.5 px-4 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1 text-slate-400 font-bold">
                    <span className="dot animate-pulse">•</span>
                    <span className="dot animate-pulse [animation-delay:0.2s]">•</span>
                    <span className="dot animate-pulse [animation-delay:0.4s]">•</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSendMessage} className="p-4 px-5 border-t border-slate-900/10 flex gap-2.5 bg-white">
            <input
              type="text"
              placeholder="Ask anything about Jevxo dashboard..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 p-2.5 px-4 rounded-lg border border-slate-900/[0.08] bg-white text-slate-900 text-xs outline-none focus:ring-1 focus:ring-violet-600"
            />
            <button
              type="submit"
              className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Send
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
