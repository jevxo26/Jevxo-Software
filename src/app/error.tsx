"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
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
    }}>
      <div style={{ fontSize: "64px", marginBottom: "24px" }}>⚠️</div>
      <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, marginBottom: "16px" }}>
        Something Went Wrong
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "17px", maxWidth: "400px", margin: "0 auto 40px", lineHeight: 1.7 }}>
        An unexpected error occurred. Our team has been notified.
      </p>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={reset} style={{ padding: "14px 32px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", border: "none", cursor: "pointer" }}>
          Try Again
        </button>
        <Link href="/" style={{ padding: "14px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#f1f5f9" }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
