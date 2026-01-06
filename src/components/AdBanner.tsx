import { useEffect } from "react";

/**
 * وظيفة إظهار إعلان المكافأة (Rewarded Ad)
 * يتم استدعاؤها عند الضغط على "كشف الكود" في صفحة الكوبونات
 */
export const showRewardedAd = (onComplete: () => void) => {
  // معرف وحدة إعلان المكافأة الخاص بك من Replit
  const REWARDED_ID = "ca-app-pub-9595557636226050/2618267271"; 

  console.log("AdMob: Loading Rewarded Ad Unit:", REWARDED_ID);

  // منطق العمل: في المتصفح سيقوم بعمل محاكاة (ثانية ونصف) ثم يفتح الكود
  // وفي التطبيق الحقيقي بعد تحويله لـ APK سيتم ربطه بالمحرك
  if (typeof window !== "undefined" && (window as any).AdMob) {
    onComplete(); 
  } else {
    setTimeout(() => {
      onComplete();
    }, 1500);
  }
};

/**
 * مكون إعلان البانر (Banner Ad)
 * يظهر في أعلى وأسفل الصفحات
 */
export function AdBanner({ type = "standard" }: { type?: string }) {
  // معرف وحدة إعلان البانر الخاص بك
  const AD_UNIT_ID = "ca-app-pub-9595557636226050/2945570332";

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      // نتجاهل الخطأ هنا لأنه سيعمل فقط عند التشغيل الفعلي
    }
  }, []);

  return (
    <div className="w-full my-4 flex justify-center px-2">
      <div className="relative w-full max-w-[350px] min-h-[100px] bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 bg-slate-100 text-[10px] px-2 py-0.5 rounded-bl-xl text-slate-400 font-bold">
          AD / إعلان
        </div>
        
        {/* منطقة إعلان جوجل */}
        <ins className="adsbygoogle"
             style={{ display: 'inline-block', width: '320px', height: '100px' }}
             data-ad-client="ca-app-pub-9595557636226050"
             data-ad-slot="2945570332"></ins>
        
        <div className="text-center">
          <p className="text-slate-300 text-[10px] font-bold tracking-widest uppercase">
            مساحة إعلانية نشطة
          </p>
          <p className="text-slate-200 text-[8px] mt-1 italic">AdMob ID: {AD_UNIT_ID}</p>
        </div>
      </div>
    </div>
  );
}
