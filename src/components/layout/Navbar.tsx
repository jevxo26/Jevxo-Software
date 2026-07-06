"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Partners", href: "/partners" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Process", href: "/process" },
  { label: "Stack", href: "/technologies" },
  { label: "Blog", href: "/blog" },
  { label: "Jobs", href: "/jobs" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

type IndicatorState = { left: number; top: number; width: number; height: number; opacity: number };

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<IndicatorState>({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const moveIndicator = useCallback((href: string | null) => {
    const container = navRef.current;
    const target = href ? linkRefs.current[href] : null;
    if (!container || !target) {
      setIndicator((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    setIndicator({
      left: tRect.left - cRect.left,
      top: tRect.top - cRect.top,
      width: tRect.width,
      height: tRect.height,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    moveIndicator(pathname);
    const onResize = () => moveIndicator(pathname);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, moveIndicator]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-[background,border-color] duration-300 ease-in-out border-b ${
          scrolled
            ? "bg-white/85 backdrop-blur-md border-slate-900/5 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto px-4 flex items-center justify-between h-[76px] w-11/12 max-w-[1400px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[10px]">
            <img src="/logo.svg" alt="Jevxo Logo" className="w-9 h-9" />
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Jev<span className="text-violet-600">xo</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div
            ref={navRef}
            className="relative hidden min-[1251px]:flex gap-[2px] items-center"
            onMouseLeave={() => moveIndicator(pathname)}
          >
            <div
              className="absolute bg-violet-600/10 border border-violet-600/20 rounded-[8px] pointer-events-none"
              style={{
                left: indicator.left,
                top: indicator.top,
                width: indicator.width,
                height: indicator.height,
                opacity: indicator.opacity,
                transition:
                  "left 0.35s cubic-bezier(0.22,1,0.36,1), width 0.35s cubic-bezier(0.22,1,0.36,1), top 0.35s ease, opacity 0.25s ease",
              }}
            />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => { linkRefs.current[link.href] = el; }}
                onMouseEnter={() => moveIndicator(link.href)}
                className={`relative px-4 py-2.5 rounded-[8px] text-[11px] font-bold tracking-wider uppercase transition-colors duration-200 ${
                  pathname === link.href ? "text-violet-700" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-[10px]">
            <Link
              href="/portal"
              className="hidden min-[1251px]:inline-block px-4 py-2 rounded-lg text-[13px] font-bold tracking-wide border border-slate-900/10 text-slate-700 hover:border-slate-900/20 hover:bg-slate-900/5 transition-all duration-200"
            >
              Portal Login
            </Link>
            <Link
              href="/contact"
              className="hidden min-[1251px]:inline-block px-5 py-2.5 rounded-lg text-[13px] font-bold tracking-wide text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md hover:shadow-violet-600/20 hover:-translate-y-0.5 transition-all duration-250"
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-white/98 flex flex-col items-center justify-start pt-[88px] pb-10 gap-1 overflow-y-auto animate-[fadeIn_0.2s_ease]">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 z-[1] bg-slate-900/5 border border-slate-900/10 rounded-full w-[38px] h-[38px] text-slate-950 text-base flex items-center justify-center hover:bg-slate-900/10 transition-colors"
          >
            ✕
          </button>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-2xl font-bold tracking-tight px-8 py-2 rounded-[10px] opacity-0 animate-[fadeUp_0.4s_ease_forwards] ${
                pathname === link.href ? "text-violet-600 bg-violet-600/10" : "text-slate-800"
              }`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-12 h-px bg-slate-900/10 my-[14px]" />
          <Link
            href="/portal"
            className="px-8 py-3 rounded-[10px] text-base font-semibold border border-slate-900/10 text-slate-800 text-center w-[200px]"
          >
            Portal Login
          </Link>
          <Link
            href="/contact"
            className="mt-[10px] px-8 py-3.5 rounded-[10px] text-base font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg text-center w-[200px]"
          >
            Get Started →
          </Link>
        </div>
      )}
    </>
  );
}