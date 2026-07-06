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
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", height: "calc(100vh - 160px)" }}>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: 800 }}>Jevxo Help Center & Live Chat</h2>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>Find answers or speak directly with our automated virtual assistance center.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 4fr", gap: "32px", flex: 1, minHeight: 0 }}>
        
        {/* LEFT: FAQ ACCORDIONS */}
        <div className="glass" style={{ padding: "30px", borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", overflowY: "auto" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px", color: "#a78bfa" }}>💡 Frequently Asked Questions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "12px" }}>
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "none", border: "none", color: "#fff", fontWeight: 600, fontSize: "13px",
                    textAlign: "left", cursor: "pointer", padding: "8px 0"
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: "12px", color: "#a78bfa" }}>{activeFaq === index ? "▼" : "▶"}</span>
                </button>
                {activeFaq === index && (
                  <p style={{ color: "var(--text-secondary)", fontSize: "12px", lineHeight: 1.6, padding: "8px 0 4px", margin: 0 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: LIVE CHAT SIMULATOR */}
        <div className="glass" style={{ borderRadius: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(124,58,237,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
              <div>
                <strong style={{ fontSize: "13px", color: "#fff", display: "block" }}>Jevxo Assistant</strong>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Uptime Node: virtual_agent_01</span>
              </div>
            </div>
            <button
              onClick={clearChat}
              style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "11px", cursor: "pointer", textDecoration: "underline" }}
            >
              Clear
            </button>
          </div>

          {/* Messages list */}
          <div style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: "8px"
                  }}
                >
                  {!isUser && (
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>
                      🤖
                    </div>
                  )}
                  <div style={{ maxWidth: "75%" }}>
                    <div
                      style={{
                        padding: "10px 14px",
                        borderRadius: "12px",
                        borderTopRightRadius: isUser ? "2px" : "12px",
                        borderTopLeftRadius: !isUser ? "2px" : "12px",
                        background: isUser ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,0.03)",
                        border: isUser ? "none" : "1px solid rgba(255,255,255,0.06)",
                        color: "#fff",
                        fontSize: "13px",
                        lineHeight: 1.5,
                      }}
                    >
                      {msg.text}
                    </div>
                    <span style={{ fontSize: "9px", color: "var(--text-muted)", marginTop: "4px", display: "block", textAlign: isUser ? "right" : "left" }}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {isTyping && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>
                  🤖
                </div>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "10px 16px", borderRadius: "12px", borderTopLeftRadius: "2px" }}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <span className="dot" style={{ animation: "pulse 1s infinite alternate" }}>•</span>
                    <span className="dot" style={{ animation: "pulse 1s infinite alternate 0.2s" }}>•</span>
                    <span className="dot" style={{ animation: "pulse 1s infinite alternate 0.4s" }}>•</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSendMessage} style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "10px", background: "rgba(0,0,0,0.15)" }}>
            <input
              type="text"
              placeholder="Ask anything about Jevxo dashboard..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1, padding: "10px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "13px", outline: "none"
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 18px", borderRadius: "8px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                border: "none", color: "#fff", fontWeight: 700, fontSize: "12px", cursor: "pointer"
              }}
            >
              Send
            </button>
          </form>

        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
