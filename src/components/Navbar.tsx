import { Link, useLocation } from "wouter";
import { LayoutDashboard, Home } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <div className="max-w-screen-xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* الشعار والاسم */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform">
              <span className="text-2xl">🦅</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-slate-900">
              لُقطة <span className="text-orange-500">الخليج</span>
            </h1>
          </div>
        </Link>

        {/* أزرار التنقل */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${location === "/" ? "bg-orange-500 text-white shadow-md" : "text-slate-600 hover:bg-slate-50"}`}>
              <Home size={18} />
              <span className="hidden sm:inline">الرئيسية</span>
            </button>
          </Link>
          
          <Link href="/admin">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${location === "/admin" ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-50"}`}>
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">الإدارة</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
