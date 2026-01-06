import { useOffers } from "../hooks/use-offers";
import { OfferCard } from "../components/OfferCard";
import { Loader2, ArrowRight } from "lucide-react";
import { BottomNav, AdBanner } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { useRoute, useLocation } from "wouter";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const [, setLocation] = useLocation();
  const categoryId = params?.category || "all";

  const categories: Record<string, { label: string, desc: string }> = {
    electronics: { label: "إلكترونيات", desc: "أقوى العروض التقنية" },
    perfumes: { label: "عالم العطور", desc: "تشكيلة فاخرة من العطور" },
    fashion: { label: "أزياء وموضة", desc: "أحدث صيحات الموضة" },
    home: { label: "المنزل والمطبخ", desc: "كل ما يحتاجه منزلك" },
    accessories: { label: "الساعات والإكسسوارات", desc: "أفخم الساعات" },
  };

  const currentCategory = categories[categoryId] || { label: "عروض متنوعة", desc: "استكشف أفضل الخصومات" };
  
  // نمرر التصنيف للـ hook لجلب البيانات المفلترة
  const { data: offers, isLoading } = useOffers({ category: categoryId });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-tajawal pb-20" dir="rtl">
      
      <div className="p-4 bg-white border-b border-slate-100 flex items-center">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 bg-[#f97316] px-4 py-2 rounded-xl font-black text-xs text-white shadow-md active:scale-95 transition-transform"
        >
          <ArrowRight size={16} />
          رجوع للرئيسية
        </button>
      </div>

      <header className="bg-slate-900 text-white p-10 text-center relative">
        <h1 className="text-3xl font-black text-[#f97316] mb-2">{currentCategory.label}</h1>
        <p className="text-slate-400 text-sm font-bold">{currentCategory.desc}</p>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-8 min-h-[50vh]">
        <AdBanner type="hero" />
        
        {isLoading ? (
          <div className="flex justify-center py-40">
            <Loader2 className="h-12 w-12 animate-spin text-[#f97316]" />
          </div>
        ) : !offers || offers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-200">
            <p className="text-slate-400 font-bold">لا توجد عروض متوفرة في هذا القسم حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {offers.map((offer: any) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </main>

      <div className="px-6 mb-8"><AdBanner type="footer" /></div>
      <Footer />

      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-slate-100">
        <BottomNav />
      </div>
    </div>
  );
}
