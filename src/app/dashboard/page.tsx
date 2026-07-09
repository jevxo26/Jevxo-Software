"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/admin");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080d1a] text-[#f1f5f9]">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-violet-600/30 border-t-violet-600 rounded-full animate-spin mx-auto mb-4" />
        <div className="text-sm text-slate-400 font-medium">Redirecting to Jevxo Node...</div>
      </div>
    </div>
  );
}
