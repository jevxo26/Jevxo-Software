import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center py-10 px-6 relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] -top-24 left-1/2 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[80px]" />
      <div className="relative z-10">
        <div className="text-[120px] font-black leading-none mb-4">
          <span className="bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">404</span>
        </div>
        <h1 className="text-2xl md:text-[40px] font-extrabold mb-4 text-slate-900">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-lg max-w-[420px] mx-auto mb-10 leading-relaxed">
          Looks like this page took a detour. Let&apos;s get you back on track.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="px-8 py-3.5 rounded-xl font-bold text-[15px] bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] transition-all duration-200 hover:-translate-y-0.5">
            Go Home →
          </Link>
          <Link href="/contact" className="px-7 py-3.5 rounded-xl font-bold text-[15px] border border-slate-900/10 bg-slate-900/5 text-slate-700 hover:bg-slate-900/10 transition-all duration-200 hover:-translate-y-0.5">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
