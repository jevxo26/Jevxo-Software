"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Handshake,
  Users,
  Briefcase,
  Rocket,
  Laptop,
  Activity,
  FileText,
  HelpCircle,
  Building2,
  Terminal,
  Sparkles
} from "lucide-react";

interface SubLink {
  label: string;
  href: string;
  description: string;
  icon: string;
}

interface NavLink {
  label: string;
  href: string;
  subLinks?: SubLink[];
}

const navLinks: NavLink[] = [
  {
    label: "Products",
    href: "/products",
    subLinks: [
      { label: "Jevxo CRM Suite", href: "/products", description: "Automated sales pipeline & customer database.", icon: "crm" },
      { label: "Jevxo HRM Core", href: "/products", description: "Comprehensive check-in, payroll & intern log.", icon: "hr" },
      { label: "Jevxo School Net", href: "/products", description: "Custom portals for educational institutions.", icon: "school" },
      { label: "Jevxo Restaurant POS", href: "/products", description: "Order tracking & inventory control systems.", icon: "pos" },
    ],
  },
  {
    label: "Solutions",
    href: "/services",
    subLinks: [
      { label: "Business Management", href: "/services", description: "Scale operations with tailored digital frameworks.", icon: "business" },
      { label: "Operations Automation", href: "/services", description: "Pre-wired data flows between departments.", icon: "automation" },
      { label: "EdTech Systems", href: "/services", description: "Cloud-based learning management platforms.", icon: "edtech" },
      { label: "Custom Software Build", href: "/services", description: "Premium code aligned to enterprise requirements.", icon: "custom" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    href: "/portfolio",
    subLinks: [
      { label: "Case Studies", href: "/portfolio", description: "Explore our recently shipped product showcases.", icon: "portfolio" },
      { label: "Knowledge Blog", href: "/blog", description: "Technical articles & company engineering logs.", icon: "blog" },
      { label: "FAQ Center", href: "/faq", description: "Common questions answered by client success.", icon: "faq" },
      { label: "Careers & Jobs", href: "/jobs", description: "Join our fast-growing global team.", icon: "jobs" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    subLinks: [
      { label: "About Us", href: "/about", description: "Our leadership, principles, and mission.", icon: "about" },
      { label: "Our Process", href: "/process", description: "How we ship secure and performant software.", icon: "process" },
      { label: "Partners Program", href: "/partners", description: "Country-level commission stats & assets.", icon: "partners" },
      { label: "Contact Sales", href: "/contact", description: "Connect with our integration engineers.", icon: "contact" },
    ],
  },
];

function getIcon(key: string) {
  switch (key) {
    // Products
    case "crm":
      return <Handshake className="w-4 h-4 text-violet-600" />;
    case "hr":
      return <Users className="w-4 h-4 text-emerald-600" />;
    case "school":
      return <Activity className="w-4 h-4 text-sky-600" />;
    case "pos":
      return <Laptop className="w-4 h-4 text-amber-600" />;
    // Solutions
    case "business":
      return <Briefcase className="w-4 h-4 text-indigo-600" />;
    case "automation":
      return <Rocket className="w-4 h-4 text-pink-600" />;
    case "edtech":
      return <Terminal className="w-4 h-4 text-cyan-600" />;
    case "custom":
      return <Sparkles className="w-4 h-4 text-violet-600" />;
    // Resources
    case "portfolio":
      return <Laptop className="w-4 h-4 text-indigo-600" />;
    case "blog":
      return <FileText className="w-4 h-4 text-emerald-600" />;
    case "faq":
      return <HelpCircle className="w-4 h-4 text-amber-600" />;
    case "jobs":
      return <Users className="w-4 h-4 text-pink-600" />;
    // Company
    case "about":
      return <Building2 className="w-4 h-4 text-violet-600" />;
    case "process":
      return <Activity className="w-4 h-4 text-sky-600" />;
    case "partners":
      return <Shield className="w-4 h-4 text-emerald-600" />;
    case "contact":
      return <Handshake className="w-4 h-4 text-indigo-600" />;
    default:
      return <Sparkles className="w-4 h-4 text-slate-500" />;
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setOpenMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[1000] w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-slate-900/[0.04] py-3 shadow-[0_4px_30px_rgba(15,23,42,0.03)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex items-center justify-between w-11/12 max-w-[1700px] h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[10px] shrink-0 group">
            <img
              src="/logo.svg"
              alt="Jevxo Logo"
              className="w-9 h-9 group-hover:rotate-12 transition-transform duration-300 ease-out"
            />
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Jev<span className="text-violet-600">xo</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="relative hidden min-[1251px]:flex gap-2 items-center">
            {navLinks.map((link) => {
              const isLinkActive =
                pathname === link.href ||
                (link.subLinks &&
                  link.subLinks.some(
                    (sub) => pathname === sub.href || pathname.startsWith(sub.href + "/")
                  ));

              return link.subLinks ? (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                      isLinkActive
                        ? "text-violet-600 bg-violet-600/5 font-bold"
                        : "text-slate-600 hover:text-violet-600 hover:bg-violet-600/5"
                    }`}
                  >
                    {link.label}
                    <svg
                      className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180 shrink-0 opacity-70"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  {/* Dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-10">
                    <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-[0_20px_50px_rgba(15,23,42,0.08)] p-3 w-[350px] grid grid-cols-1 gap-1">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 hover:bg-slate-50 group/sub"
                        >
                          <div className="w-9 h-9 rounded-lg bg-slate-900/5 border border-slate-900/[0.03] flex items-center justify-center shrink-0 group-hover/sub:bg-white group-hover/sub:shadow-sm transition-all duration-200">
                            {getIcon(sub.icon)}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-[13px] font-bold text-slate-800 group-hover/sub:text-violet-600 transition-colors">
                              {sub.label}
                            </span>
                            <span className="text-[11px] text-slate-500 font-normal leading-normal mt-0.5 max-w-[250px]">
                              {sub.description}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 group whitespace-nowrap ${
                    pathname === link.href
                      ? "text-violet-600 bg-violet-600/5 font-bold"
                      : "text-slate-600 hover:text-violet-600 hover:bg-violet-600/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Call to Actions & Hamburger */}
          <div className="flex items-center gap-[10px] shrink-0">
            <Link
              href="/portal"
              className="hidden min-[1251px]:inline-block px-4.5 py-2 rounded-xl text-[13px] font-bold tracking-wide border border-slate-900/10 text-slate-700 hover:border-violet-600 hover:text-violet-600 hover:bg-violet-600/5 transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="hidden min-[1251px]:inline-block px-5 py-2.5 rounded-xl text-[13px] font-bold tracking-wide text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md hover:shadow-violet-600/25 hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a Demo
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="hidden max-[1250px]:flex flex-col gap-[5px] bg-transparent border-none p-2 cursor-pointer"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block w-5 h-0.5 bg-slate-900 rounded-sm transition-all duration-300 ${
                    menuOpen
                      ? i === 0
                        ? "rotate-45 translate-y-[7px]"
                        : i === 2
                        ? "-rotate-45 -translate-y-[7px]"
                        : "scale-x-0"
                      : ""
                  }`}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[999] bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-in-out flex flex-col items-center justify-start pt-[110px] pb-10 gap-1 overflow-y-auto ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-12"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="absolute top-6 right-6 z-[1] bg-slate-900/5 border border-slate-900/10 rounded-full w-[38px] h-[38px] text-slate-950 text-base flex items-center justify-center hover:bg-slate-900/10 transition-colors"
        >
          ✕
        </button>

        {navLinks.map((link, i) => {
          const isLinkActive =
            pathname === link.href ||
            (link.subLinks &&
              link.subLinks.some(
                (sub) => pathname === sub.href || pathname.startsWith(sub.href + "/")
              ));

          return link.subLinks ? (
            <div key={link.href} className="w-full flex flex-col items-center">
              <button
                onClick={() =>
                  setOpenMobileSection(openMobileSection === link.href ? null : link.href)
                }
                className={`relative text-[16px] font-semibold px-8 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  isLinkActive
                    ? "text-violet-600 bg-violet-600/10 font-bold scale-105"
                    : "text-slate-800 hover:text-violet-600 hover:bg-violet-600/5"
                }`}
                style={{
                  transitionDelay: `${i * 0.02}s`,
                  transform: menuOpen ? "translateY(0)" : "translateY(15px)",
                }}
              >
                {link.label}
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${
                    openMobileSection === link.href ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={`flex flex-col items-stretch w-[280px] overflow-hidden transition-all duration-300 ${
                  openMobileSection === link.href
                    ? "max-h-[500px] opacity-100 mt-1 mb-1"
                    : "max-h-0 opacity-0"
                }`}
              >
                {link.subLinks.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className={`flex items-center gap-3 text-[14px] font-medium px-6 py-2.5 rounded-xl transition-all duration-200 ${
                      pathname === sub.href
                        ? "text-violet-600 bg-violet-600/5"
                        : "text-slate-600 hover:text-violet-600 hover:bg-violet-600/5"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-md bg-slate-900/5 flex items-center justify-center shrink-0">
                      {getIcon(sub.icon)}
                    </div>
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-[16px] font-semibold px-8 py-2 rounded-xl transition-all duration-200 ${
                pathname === link.href
                  ? "text-violet-600 bg-violet-600/10 font-bold scale-105"
                  : "text-slate-800 hover:text-violet-600 hover:bg-violet-600/5"
              }`}
              style={{
                transitionDelay: `${i * 0.02}s`,
                transform: menuOpen ? "translateY(0)" : "translateY(15px)",
              }}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="w-12 h-px bg-slate-900/10 my-[10px]" />

        <Link
          href="/portal"
          className="px-8 py-3 rounded-xl text-base font-semibold border border-slate-900/10 text-slate-800 text-center w-[220px] hover:border-violet-600 hover:text-violet-600 hover:bg-violet-600/5 transition-all duration-200"
        >
          Sign In
        </Link>
        <Link
          href="/contact"
          className="mt-[10px] px-8 py-3.5 rounded-xl text-base font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg text-center w-[220px] hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-200"
        >
          Book a Demo →
        </Link>
      </div>
    </>
  );
}