"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Products",  href: "/products" },
  { label: "Services",  href: "/services" },
  { label: "Partners",  href: "/partners" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing",   href: "/pricing" },
  { label: "Process",   href: "/process" },
  { label: "Stack",     href: "/technologies" },
  { label: "Blog",      href: "/blog" },
  { label: "Jobs",      href: "/jobs" },
  { label: "FAQ",       href: "/faq" },
  { label: "Contact",   href: "/contact" },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s ease",
          background: scrolled
            ? "rgba(8,13,26,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", fontWeight: 800, color: "#fff",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}>J</div>
            <span style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Jev<span style={{ color: "#7c3aed" }}>xo</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: "4px" }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  color: pathname === link.href ? "#a78bfa" : "var(--text-secondary)",
                  background: pathname === link.href ? "rgba(124,58,237,0.12)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    (e.currentTarget as HTMLElement).style.color = "#f1f5f9";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/portal"
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                border: "1px solid rgba(124,58,237,0.4)",
                background: "rgba(124,58,237,0.06)",
                color: "#a78bfa",
                transition: "all 0.2s ease",
              }}
              className="cta-btn"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.06)";
              }}
            >
              Portal Login
            </Link>
            <Link
              href="/contact"
              style={{
                padding: "9px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                color: "#fff",
                transition: "all 0.2s ease",
                boxShadow: "0 0 20px rgba(124,58,237,0.3)",
              }}
              className="cta-btn"
            >
              Get Started
            </Link>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                display: "none",
                flexDirection: "column",
                gap: "5px",
                background: "none",
                border: "none",
                padding: "8px",
                cursor: "pointer",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#f1f5f9",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                    : i === 2 ? "rotate(-45deg) translate(5px, -5px)"
                    : "scaleX(0)"
                    : "none",
                }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(8,13,26,0.98)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "90px",
          paddingBottom: "40px",
          gap: "8px",
          overflowY: "auto",
          animation: "fadeIn 0.2s ease",
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute", top: "24px", right: "24px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50%",
              width: "40px", height: "40px",
              color: "#f1f5f9",
              fontSize: "18px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: pathname === link.href ? "#a78bfa" : "#f1f5f9",
                padding: "12px 32px",
                borderRadius: "12px",
                background: pathname === link.href ? "rgba(124,58,237,0.1)" : "transparent",
                animationDelay: `${i * 0.05}s`,
                animation: "fadeUp 0.4s ease forwards",
                opacity: 0,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/portal"
            style={{
              marginTop: "8px",
              padding: "12px 32px",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: 700,
              border: "1px solid rgba(124,58,237,0.4)",
              background: "rgba(124,58,237,0.06)",
              color: "#a78bfa",
              textAlign: "center",
              width: "200px",
            }}
          >Portal Login</Link>
          <Link
            href="/contact"
            style={{
              marginTop: "12px",
              padding: "14px 36px",
              borderRadius: "14px",
              fontSize: "18px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(124,58,237,0.4)",
              textAlign: "center",
              width: "200px",
            }}
          >Get Started →</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 1250px) {
          .desktop-nav { display: none !important; }
          .cta-btn { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
