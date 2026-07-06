import Link from "next/link";

const footerLinks = {
  Company:  [
    { label: "Home",      href: "/" },
    { label: "About Us",  href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Tech Stack",  href: "/technologies" },
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
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      background: "rgba(8,13,26,0.9)",
      backdropFilter: "blur(20px)",
      padding: "80px 0 32px",
    }}>
      <div className="container">
        {/* Top grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "64px",
        }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{
                width: "36px", height: "36px",
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", fontWeight: 800, color: "#fff",
              }}>J</div>
              <span style={{ fontSize: "20px", fontWeight: 700 }}>
                Jev<span style={{ color: "#7c3aed" }}>xo</span>
              </span>
            </Link>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.7, maxWidth: "280px", marginBottom: "24px" }}>
              We build high-performance digital products that help ambitious companies grow. From idea to launch and beyond.
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{
                  width: "36px", height: "36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: 700,
                  color: "var(--text-secondary)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)";
                  (e.currentTarget as HTMLElement).style.color = "#a78bfa";
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "20px" }}>
                {group}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ color: "var(--text-secondary)", fontSize: "14px", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#f1f5f9"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            © {new Date().getFullYear()} Jevxo. All rights reserved.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Built with ❤️ by the Jevxo team
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
