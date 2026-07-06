"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topnav from "@/components/dashboard/Topnav";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/");
  const initialRole = segments[2] || "admin";

  const [storedRole, setStoredRole] = useState("admin");

  useEffect(() => {
    const role = segments[2];
    if (role && role !== "settings" && role !== "support") {
      setStoredRole(role);
      localStorage.setItem("jevxo_last_role", role);
    } else {
      const last = localStorage.getItem("jevxo_last_role");
      if (last) setStoredRole(last);
    }
  }, [pathname]);

  const activeRole = (segments[2] === "settings" || segments[2] === "support") ? storedRole : initialRole;

  const handleRoleChange = (role: string) => {
    router.push(`/dashboard/${role}`);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080d1a", color: "#f1f5f9" }}>
      
      {/* Modular Sidebar Component */}
      <Sidebar activeRole={activeRole} pathname={pathname} onRoleChange={handleRoleChange} />

      {/* Main Content Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
        
        {/* Modular Topnav Component */}
        <Topnav activeRole={activeRole} />

        {/* Scrollable Dashboard Body */}
        <div style={{ flex: 1, padding: "40px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
