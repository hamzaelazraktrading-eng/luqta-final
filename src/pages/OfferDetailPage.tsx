import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Loader2, ArrowRight, MessageCircle, ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav, AdBanner } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";

export default function OfferDetailPage() {
  const [, params] = useRoute("/offer/:id");
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // جلب بيانات العرض بناءً على المعرف (ID)
  const { data: offer, isLoading } = useQuery<any>({
    queryKey: [`/api/offers/${params?.id}`],
  });

  useEffect(() => {
    if (offer) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some((f: any) => f.id === offer.id));
    }
  }, [offer]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!offer) return null;

  const images = [offer.imageUrl, ...(offer.galleryUrls || [])].filter(Boolean);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((f: any) => f.id !== offer.id);
    } else {
      newFavorites = [...favorites, offer];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`شاهد هذا العرض الرائع من لُقطة: ${offer.title}\n${offer.affiliateUrl || ''}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-tajawal pb-32" dir="rtl">
      
      {/* زر الرجوع العلوي */}
      <div className="sticky top-0 z-[60] p-4 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 bg-[#f97316] px-4 py-2 rounded-xl font-bold text-xs text-white shadow-lg"
        >
          <ArrowRight size={16} />
          رجوع للرئيسية
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto">
        <main className="w-full">
          {/* معرض الصور المطور */}
          <div className="w-full aspect-square md:aspect-[21/9] overflow-hidden relative group bg-slate-100">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                src={images[currentImageIndex]} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full object-contain" 
              />
            </AnimatePresence>
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <div className="max-w-screen-md mx-auto px-6 py-8">
            <div className="flex flex-col mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-black text-slate-900 leading-tight flex-1">{offer.title}</h1>
                {offer.discount && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-xl font-black shadow-lg ml-2 rotate-3">
                    {offer.discount}%
                  </div>
                )}
              </div>
              
              {/* قسم السعر */}
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">السعر الحالي</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900">{offer.newPrice}</span>
                    <span className="text-sm font-bold text-slate-500">ر.س</span>
                  </div>
                  {offer.oldPrice && (
                    <p className="text-sm text-slate-400 line-through decoration-red-500/30">{offer.oldPrice} ر.س</p>
                  )}
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black text-slate-400 block mb-1">المتجر</span>
                  <span className="text-md font-bold text-[#f97316]">{offer.storeName || "متجر موثوق"}</span>
                </div>
              </div>

              {/* الوصف */}
              <div className="prose prose-slate">
                <h2 className="text-lg font-black text-slate-900 mb-4 border-r-4 border-[#f97316] pr-3">تفاصيل العرض</h2>
                <div className="text-slate-600 leading-relaxed text-md whitespace-pre-wrap">
                  {offer.longDescription || offer.description}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      
      {/* شريط الأزرار السفلي الثابت */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 shadow-xl">
        <div className="max-w-screen-md mx-auto flex gap-3">
          <a 
            href={offer.affiliateUrl || "#"} 
            target="_blank"
            className="flex-[3] h-14 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <ShoppingCart size={20} />
            شراء الآن
          </a>
          <button 
            onClick={handleWhatsApp} 
            className="flex-1 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <MessageCircle size={24} />
          </button>
          <button 
            onClick={toggleFavorite}
            className={`h-14 w-14 rounded-2xl border flex items-center justify-center transition-all ${isFavorite ? 'bg-red-50 text-red-500 border-red-100' : 'bg-white border-slate-200'}`}
          >
            <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 z-[90] px-4">
        <AdBanner type="hero" />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-[110]">
        <BottomNav />
      </div>
    </div>
  );
}
