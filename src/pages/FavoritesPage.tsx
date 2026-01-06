import { Heart, Loader2, ArrowRight } from "lucide-react";
import { BottomNav, AdBanner } from "../components/Navigation";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { OfferCard } from "../components/OfferCard";
import { Footer } from "../components/Footer";

export default function FavoritesPage() {
  const [, setLocation] = useLocation();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-tajawal pb-24" dir="rtl">
      <header className="bg-[#0f172a] text-white p-8 shadow-2xl rounded-b-[3rem] flex flex-col items-center justify-center gap-4 relative">
        <div className="absolute top-8 right-6">
          <button 
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 px-4 py-2 bg-[#f97316] rounded-xl border border-white/10 text-white hover:bg-[#ea580c] transition-all text-xs font-bold shadow-lg"
          >
            <ArrowRight size={16} />
            رجوع
          </button>
        </div>
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Heart className="text-red-500 fill-red-500" size={28} />
            <h1 className="text-2xl font-bold">المفضلة</h1>
          </div>
          <p className="text-white/40 text-xs font-medium">عروضك التي حفظتها</p>
        </div>
      </header>

      <main className="p-4 pt-8 max-w-screen-xl mx-auto min-h-[50vh]">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-red-500" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-xl font-bold text-[#0f172a] mb-4">قائمة المفضلة فارغة</h2>
            <button 
              onClick={() => setLocation("/")} 
              className="bg-[#0f172a] text-white mt-4 rounded-2xl h-12 px-8 font-bold gap-2 flex items-center justify-center hover:bg-slate-800 transition-colors"
            >
              اكتشف العروض
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((offer: any) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </main>

      <div className="mt-10">
        <div className="px-6 mb-8"><AdBanner type="footer" /></div>
        <Footer />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-slate-100">
        <BottomNav />
      </div>
    </div>
  );
}
