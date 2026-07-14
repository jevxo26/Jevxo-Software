"use client";

import Link from "next/link";

const footerLinks = {
  Company:  [
    { label: "Home",      href: "/" },
    { label: "About Us",  href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Tech Stack",  href: "/technologies" },
    { label: "Country Partners", href: "/partners" },
    { label: "Careers",   href: "/jobs" },
  ],
  Resources: [
    { label: "Products Catalog", href: "/products" },
    { label: "Services Catalog", href: "/services" },
    { label: "Project Portfolio", href: "/portfolio" },
    { label: "Pricing Packages", href: "/pricing" },
    { label: "FAQ Center",        href: "/faq" },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Service",  href: "/privacy" },
    { label: "Cookie Policy",     href: "#" },
  ],
};

const socials = [
  { label: "Twitter",  href: "#", icon: "𝕏" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "GitHub",   href: "#", icon: "⌨" },
  { label: "Dribbble", href: "#", icon: "◎" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-900/5 bg-white/90 backdrop-blur-md py-20 pb-8">
      <div className="mx-auto px-4 w-11/12 max-w-[1700px]">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <img src="/logo.svg" alt="Jevxo Logo" className="w-9 h-9" />
              <span className="text-xl font-bold text-slate-900">
                Jev<span className="text-violet-600">xo</span>
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-[280px] mb-6">
              We build high-performance digital products that help ambitious companies grow. From idea to launch and beyond.
            </p>
            {/* Socials */}
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-slate-900/10 bg-slate-900/5 flex items-center justify-center text-xs font-bold text-slate-600 transition-all duration-200 hover:border-violet-600 hover:text-violet-600 hover:bg-violet-600/10"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="md:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-5">
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-600 text-sm transition-colors duration-200 hover:text-violet-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900/5 pt-8 flex justify-between items-center flex-wrap gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Jevxo. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Built with ❤️ by the Jevxo team
          </p>
        </div>
      </div>
    </footer>
  );
}