"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubLink {
  label: string;
  href: string;
  images?: string[];
}

interface NavLink {
  label: string;
  href: string;
  subLinks?: SubLink[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  {
    label: "Services",
    href: "/services",
    subLinks: [
      {
        label: "Web Development",
        href: "/services/web-development",
        images: [
          "https://picsum.photos/seed/jevxo-webdev-1/160/120",
          "https://picsum.photos/seed/jevxo-webdev-2/160/120",
        ],
      },
      {
        label: "Mobile App Development",
        href: "/services/mobile-app-development",
        images: [
          "https://picsum.photos/seed/jevxo-mobile-1/160/120",
          "https://picsum.photos/seed/jevxo-mobile-2/160/120",
        ],
      },
      {
        label: "UI/UX Design",
        href: "/services/ui-ux-design",
        images: [
          "https://picsum.photos/seed/jevxo-uiux-1/160/120",
          "https://picsum.photos/seed/jevxo-uiux-2/160/120",
        ],
      },
      {
        label: "Digital Marketing",
        href: "/services/digital-marketing",
        images: [
          "https://picsum.photos/seed/jevxo-marketing-1/160/120",
          "https://picsum.photos/seed/jevxo-marketing-2/160/120",
        ],
      },
      {
        label: "Cloud & DevOps",
        href: "/services/cloud-devops",
        images: [
          "https://picsum.photos/seed/jevxo-cloud-1/160/120",
          "https://picsum.photos/seed/jevxo-cloud-2/160/120",
        ],
      },
      {
        label: "IT Consulting",
        href: "/services/it-consulting",
        images: [
          "https://picsum.photos/seed/jevxo-consulting-1/160/120",
          "https://picsum.photos/seed/jevxo-consulting-2/160/120",
        ],
      },
    ],
  },
  {
    label: "Partners",
    href: "/partners",
    subLinks: [
      { label: "Become a Partner", href: "/partners/become-a-partner" },
      { label: "Partner Directory", href: "/partners/directory" },
      { label: "Partner Program", href: "/partners/program" },
      { label: "Affiliate Program", href: "/partners/affiliate" },
    ],
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    subLinks: [
      { label: "Case Studies", href: "/portfolio/case-studies" },
      { label: "Web Projects", href: "/portfolio/web-projects" },
      { label: "Mobile Projects", href: "/portfolio/mobile-projects" },
      { label: "Client Success Stories", href: "/portfolio/client-stories" },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    subLinks: [
      { label: "Web Development Pricing", href: "/pricing/web-development" },
      { label: "Mobile App Pricing", href: "/pricing/mobile-app" },
      { label: "Subscription Plans", href: "/pricing/subscriptions" },
      { label: "Get a Custom Quote", href: "/pricing/custom-quote" },
    ],
  },
  {
    label: "Process",
    href: "/process",
    subLinks: [
      { label: "Discovery & Planning", href: "/process/discovery-planning" },
      { label: "Design & Prototyping", href: "/process/design-prototyping" },
      { label: "Development & Testing", href: "/process/development-testing" },
      { label: "Launch & Support", href: "/process/launch-support" },
    ],
  },
  {
    label: "Stack",
    href: "/technologies",
    subLinks: [
      { label: "Frontend Technologies", href: "/technologies/frontend" },
      { label: "Backend Technologies", href: "/technologies/backend" },
      { label: "Cloud & DevOps Tools", href: "/technologies/cloud-devops" },
      { label: "Databases", href: "/technologies/databases" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    subLinks: [
      { label: "Latest Articles", href: "/blog/latest" },
      { label: "Tech Insights", href: "/blog/tech-insights" },
      { label: "Company News", href: "/blog/company-news" },
      { label: "Tutorials", href: "/blog/tutorials" },
    ],
  },
  {
    label: "Jobs",
    href: "/jobs",
    subLinks: [
      { label: "Open Positions", href: "/jobs/open-positions" },
      { label: "Life at Jevxo", href: "/jobs/life-at-jevxo" },
      { label: "Internships", href: "/jobs/internships" },
      { label: "Careers FAQ", href: "/jobs/faq" },
    ],
  },
  {
    label: "FAQ",
    href: "/faq",
    subLinks: [
      { label: "General Questions", href: "/faq/general" },
      { label: "Billing & Pricing", href: "/faq/billing-pricing" },
      { label: "Technical Support", href: "/faq/technical-support" },
      { label: "Getting Started", href: "/faq/getting-started" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    subLinks: [
      { label: "Get a Quote", href: "/contact/get-a-quote" },
      { label: "Support", href: "/contact/support" },
      { label: "Sales Inquiry", href: "/contact/sales" },
      { label: "Office Locations", href: "/contact/locations" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  useEffect(() => {
    setMenuOpen(false);
    setOpenMobileSection(null);
  }, [pathname]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[1000] w-full bg-white/80 backdrop-blur-xl border-b border-slate-900/[0.06] px-8 py-4">
        <div className="mx-auto flex items-center justify-between w-11/12 max-w-[1400px] h-[68px]">

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
          <div className="relative hidden min-[1251px]:flex gap-[2px] items-center">
            {navLinks.map((link) =>
              link.subLinks ? (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`relative px-2.5 py-2 rounded-[8px] text-[11px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1 whitespace-nowrap ${pathname === link.href || pathname.startsWith(link.href + "/")
                        ? "text-violet-700 bg-violet-600/5 font-extrabold"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-900/5"
                      }`}
                  >
                    {link.label}
                    <svg
                      className="w-2.5 h-2.5 mt-[1px] transition-transform duration-200 group-hover:rotate-180 shrink-0"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {(pathname === link.href || pathname.startsWith(link.href + "/")) && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-600 shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-10">
                    <div
                      className={`rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-900/[0.06] shadow-[0_20px_50px_rgba(15,23,42,0.12)] p-2 ${link.label === "Services"
                          ? "w-[560px] grid grid-cols-2 gap-1"
                          : "w-64"
                        }`}
                    >
                      {link.subLinks.map((sub) =>
                        sub.images ? (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`flex items-center gap-3 p-2 rounded-xl transition-colors duration-150 ${pathname === sub.href
                                ? "bg-violet-600/5"
                                : "hover:bg-slate-900/5"
                              }`}
                          >
                            <span className="flex gap-1 shrink-0">
                              <img
                                src={sub.images[0]}
                                alt=""
                                className="w-14 h-11 rounded-lg object-cover"
                              />
                              <img
                                src={sub.images[1]}
                                alt=""
                                className="w-14 h-11 rounded-lg object-cover"
                              />
                            </span>
                            <span
                              className={`text-[13px] font-semibold leading-tight ${pathname === sub.href ? "text-violet-700" : "text-slate-700"
                                }`}
                            >
                              {sub.label}
                            </span>
                          </Link>
                        ) : (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-colors duration-150 ${pathname === sub.href
                                ? "text-violet-700 bg-violet-600/5"
                                : "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
                              }`}
                          >
                            {sub.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-2.5 py-2 rounded-[8px] text-[11px] font-bold tracking-wider uppercase transition-all duration-300 group whitespace-nowrap ${pathname === link.href
                      ? "text-violet-700 bg-violet-600/5 font-extrabold"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-900/5"
                    }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-600 shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Call to Actions & Hamburger */}
          <div className="flex items-center gap-[10px] shrink-0">
            <Link
              href="/portal"
              className="hidden min-[1251px]:inline-block px-4 py-2 rounded-lg text-[13px] font-bold tracking-wide border border-slate-900/10 text-slate-700 hover:border-slate-900/20 hover:bg-slate-900/5 transition-all duration-200"
            >
              Portal Login
            </Link>
            <Link
              href="/contact"
              className="hidden min-[1251px]:inline-block px-5 py-2.5 rounded-lg text-[13px] font-bold tracking-wide text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md hover:shadow-violet-600/25 hover:-translate-y-0.5 transition-all duration-250"
            >
              Get Started
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
                  className={`block w-5 h-0.5 bg-slate-900 rounded-sm transition-all duration-300 ${menuOpen
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
        className={`fixed inset-0 z-[999] bg-white/90 backdrop-blur-2xl transition-all duration-500 ease-in-out flex flex-col items-center justify-start pt-[110px] pb-10 gap-1 overflow-y-auto ${menuOpen
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

        {navLinks.map((link, i) =>
          link.subLinks ? (
            <div key={link.href} className="w-full flex flex-col items-center">
              <button
                onClick={() =>
                  setOpenMobileSection(openMobileSection === link.href ? null : link.href)
                }
                className={`relative text-lg font-bold tracking-tight px-8 py-2 rounded-[10px] transition-all duration-300 flex items-center gap-2 ${pathname.startsWith(link.href)
                    ? "text-violet-700 bg-violet-600/10 font-extrabold scale-105"
                    : "text-slate-800 hover:text-slate-950 hover:bg-slate-900/5"
                  }`}
                style={{
                  transitionDelay: `${i * 0.02}s`,
                  transform: menuOpen ? "translateY(0)" : "translateY(15px)",
                }}
              >
                {link.label}
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${openMobileSection === link.href ? "rotate-180" : ""
                    }`}
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                className={`flex flex-col items-stretch w-[260px] overflow-hidden transition-all duration-300 ${openMobileSection === link.href ? "max-h-[500px] opacity-100 mt-1 mb-1" : "max-h-0 opacity-0"
                  }`}
              >
                {link.subLinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={`flex items-center gap-2 text-[15px] font-semibold px-6 py-2 rounded-lg transition-colors duration-150 ${pathname === sub.href
                        ? "text-violet-700"
                        : "text-slate-600 hover:text-slate-950"
                      }`}
                  >
                    {sub.images && (
                      <img
                        src={sub.images[0]}
                        alt=""
                        className="w-6 h-6 rounded-md object-cover shrink-0"
                      />
                    )}
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-lg font-bold tracking-tight px-8 py-2 rounded-[10px] transition-all duration-300 ${pathname === link.href
                  ? "text-violet-700 bg-violet-600/10 font-extrabold scale-105"
                  : "text-slate-800 hover:text-slate-950 hover:bg-slate-900/5"
                }`}
              style={{
                transitionDelay: `${i * 0.02}s`,
                transform: menuOpen ? "translateY(0)" : "translateY(15px)",
              }}
            >
              {link.label}
            </Link>
          )
        )}

        <div className="w-12 h-px bg-slate-900/10 my-[10px]" />

        <Link
          href="/portal"
          className="px-8 py-3 rounded-[10px] text-base font-semibold border border-slate-900/10 text-slate-800 text-center w-[220px] hover:bg-slate-900/5 transition-all"
        >
          Portal Login
        </Link>
        <Link
          href="/contact"
          className="mt-[10px] px-8 py-3.5 rounded-[10px] text-base font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg text-center w-[220px] hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all"
        >
          Get Started →
        </Link>
      </div>
    </>
  );
}