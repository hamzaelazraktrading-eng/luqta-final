import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

// تعريف المسار الأساسي للبيانات (يمكن تغييره لاحقاً لعنوان سيرفرك)
const BASE_API_PATH = "/api/offers";

export function useOffers(filters?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: [BASE_API_PATH, filters],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (filters?.category && filters.category !== "all") params.category = filters.category;
      if (filters?.search) params.search = filters.search;
      
      const queryString = new URLSearchParams(params).toString();
      const url = `${BASE_API_PATH}${queryString ? `?${queryString}` : ''}`;

      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch offers");
      return await res.json();
    },
  });
}

export function useOffer(id: number) {
  return useQuery({
    queryKey: [BASE_API_PATH, id],
    queryFn: async () => {
      const res = await fetch(`${BASE_API_PATH}/${id}`, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch offer");
      return await res.json();
    },
    enabled: !!id,
  });
}

export function useCreateOffer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(BASE_API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to create offer");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_API_PATH] });
      toast({
        title: "تمت الإضافة بنجاح",
        description: "تم نشر العرض الجديد بنجاح",
      });
    },
  });
}

export function useDeleteOffer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${BASE_API_PATH}/${id}`, { 
        method: "DELETE", 
        credentials: "include" 
      });
      if (!res.ok) throw new Error("Failed to delete offer");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_API_PATH] });
      toast({
        title: "تم الحذف",
        description: "تم حذف العرض بنجاح",
      });
    },
  });
}
