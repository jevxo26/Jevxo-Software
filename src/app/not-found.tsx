import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-primary)",
      textAlign: "center",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="orb orb-violet" style={{ width: "400px", height: "400px", top: "-100px", left: "50%", transform: "translateX(-50%)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "120px", fontWeight: 900, lineHeight: 1, marginBottom: "16px" }}>
          <span className="gradient-text">404</span>
        </div>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, marginBottom: "16px" }}>
          Page Not Found
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "17px", maxWidth: "420px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Looks like this page took a detour. Let&apos;s get you back on track.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ padding: "14px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", boxShadow: "0 0 30px rgba(124,58,237,0.4)" }}>
            Go Home →
          </Link>
          <Link href="/contact" style={{ padding: "14px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9" }}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
