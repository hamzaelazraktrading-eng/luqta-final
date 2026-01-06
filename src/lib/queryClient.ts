import { QueryClient, QueryFunction } from "@tanstack/react-query";

// دالة للتعامل مع أخطاء الاستجابة من السيرفر
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// الدالة المسؤولة عن إرسال البيانات (إضافة/حذف/تعديل)
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
}

// الدالة المسؤولة عن جلب البيانات (عرض العروض والكوبونات)
export const getQueryFn: <T>() => QueryFunction<T> =
  () =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string);
    await throwIfResNotOk(res);
    return await res.json();
  };

// إعداد عميل الاستعلامات الرئيسي للتطبيق
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn(),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
