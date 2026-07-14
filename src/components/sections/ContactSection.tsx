"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Mail, Phone } from "lucide-react";

export default function ContactSection() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    type: "Sales",
    budget: "$1k - $5k",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg = {
      id: `msg_${Date.now()}`,
      name: contactForm.name,
      email: contactForm.email,
      type: contactForm.type,
      budget: contactForm.budget,
      message: contactForm.message,
      submittedAt: new Date().toISOString()
    };
    try {
      const stored = localStorage.getItem("jevxo_contact_messages");
      const current = stored ? JSON.parse(stored) : [];
      localStorage.setItem("jevxo_contact_messages", JSON.stringify([newMsg, ...current]));
    } catch (err) {
      console.error(err);
    }
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", type: "Sales", budget: "$1k - $5k", message: "" });
    }, 5000);
  };

  return (
    <section className="py-24 border-t border-slate-900/10 bg-white/50" id="contact">
      <div className="w-11/12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal variant="slideRight" duration={800}>
            <div>
              <div className="text-violet-600 text-sm font-bold uppercase tracking-wider mb-3">
                Contact Us
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900">
                Let&apos;s Build Something <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Exceptional</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Have questions regarding Jevxo licensing, agency partner White-labeling programs, or dedicated enterprise cloud deployments? Write to our core development and leadership squad.
              </p>

              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-violet-600/10 text-violet-600 group-hover:scale-110 transition-transform duration-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ecosystem Sales</div>
                    <div className="text-sm font-semibold text-slate-900">sales@jevxo.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-cyan-500/10 text-cyan-600 group-hover:scale-110 transition-transform duration-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Global Headquarters</div>
                    <div className="text-sm font-semibold text-slate-900">+880 1700 000000</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideLeft" duration={800}>
            <div className="bg-white/70 border border-slate-900/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.04)] hover:bg-white/95 hover:border-slate-900/[0.16] hover:border-violet-600/20 hover:shadow-lg transition-all duration-300 p-10 rounded-2xl">
              {contactSubmitted ? (
                <div className="text-center py-10 animate-[fadeIn_0.5s_ease]">
                  <div className="text-5xl mb-4">✉️</div>
                  <h3 className="text-xl font-bold text-cyan-600 mb-2">Message Logged!</h3>
                  <p className="text-slate-500 text-sm">Thank you. Our sales engineers will reach out to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-violet-600 uppercase mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-violet-600 uppercase mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="type" className="block text-xs font-bold text-violet-600 uppercase mb-2">Inquiry Type</label>
                      <select
                        id="type"
                        value={contactForm.type}
                        onChange={(e) => setContactForm({ ...contactForm, type: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                      >
                        <option value="Sales">Ecosystem Sales</option>
                        <option value="WhiteLabel">White-Labeling Program</option>
                        <option value="Support">Technical Support</option>
                        <option value="Hosting">Dedicated Hosting</option>
                        <option value="Career">Career Form</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-xs font-bold text-violet-600 uppercase mb-2">Monthly Budget</label>
                      <select
                        id="budget"
                        value={contactForm.budget}
                        onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                      >
                        <option value="$1k - $5k">$1,000 - $5,000</option>
                        <option value="$5k - $15k">$5,000 - $15,000</option>
                        <option value="$15k+">$15,000+ / Custom Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-7">
                    <label htmlFor="message" className="block text-xs font-bold text-violet-600 uppercase mb-2">Message / Details</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-900/10 bg-slate-900/5 text-slate-900 text-sm outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 focus:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
