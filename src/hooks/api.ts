/**
 * React Query hooks for every backend resource.
 * Use these in pages instead of localStorage / mock arrays.
 * Example:
 *   const { data: orders } = useOrders();
 *   const placeOrder = useCreateOrder();
 *   placeOrder.mutate({ lines, addressId, paymentMethod: "cod" });
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AuthApi, ProfileApi, AddressApi, CartApi, OrderApi, WishlistApi,
  LoyaltyApi, ReferralApi, ProductApi, SearchApi, ReviewApi, QAApi,
  NotificationApi, CropProfileApi, SellerApi, QuoteApi, ReturnApi, LeadApi, AnalyticsApi,
} from "@/lib/api";
import type {
  Address, CartLine, OrderStatus, NotificationPrefs, CropProfileDTO,
  QuoteRequest, ReturnRequestDTO, AnalyticsEvent,
} from "@/lib/api/types";

// ─── Auth / Session ──────────────────────────────────────────────────────────
export const useSession = () => useQuery({ queryKey: ["session"], queryFn: AuthApi.me, retry: false });
export const useSendOtp = () => useMutation({ mutationFn: (phone: string) => AuthApi.sendOtp(phone) });
export const useVerifyOtp = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ phone, otp }: { phone: string; otp: string }) => AuthApi.verifyOtp(phone, otp),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["session"] }) });
};
export const useLogout = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: AuthApi.logout, onSuccess: () => qc.clear() });
};

// ─── Profile / Addresses / Crop ──────────────────────────────────────────────
export const useProfile = () => useQuery({ queryKey: ["profile"], queryFn: ProfileApi.get });
export const useUpdateProfile = () => { const qc = useQueryClient(); return useMutation({ mutationFn: ProfileApi.update, onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }) }); };

export const useAddresses = () => useQuery({ queryKey: ["addresses"], queryFn: AddressApi.list });
export const useCreateAddress = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (a: Omit<Address, "id">) => AddressApi.create(a), onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }) }); };
export const useUpdateAddress = () => { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, patch }: { id: string; patch: Partial<Address> }) => AddressApi.update(id, patch), onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }) }); };
export const useDeleteAddress = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: string) => AddressApi.remove(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["addresses"] }) }); };

export const useCropProfile = () => useQuery({ queryKey: ["crop-profile"], queryFn: CropProfileApi.get });
export const useUpdateCropProfile = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (p: CropProfileDTO) => CropProfileApi.update(p), onSuccess: () => qc.invalidateQueries({ queryKey: ["crop-profile"] }) }); };

// ─── Cart ────────────────────────────────────────────────────────────────────
export const useCartServer = () => useQuery({ queryKey: ["cart"], queryFn: CartApi.get });
export const useCartQuote = (lines: CartLine[], coupon?: string) => useQuery({ queryKey: ["cart-quote", lines, coupon], queryFn: () => CartApi.quote(lines, coupon), enabled: lines.length > 0 });

// ─── Orders ──────────────────────────────────────────────────────────────────
export const useOrders = () => useQuery({ queryKey: ["orders"], queryFn: OrderApi.list });
export const useOrder = (id: string | undefined) => useQuery({ queryKey: ["order", id], queryFn: () => OrderApi.get(id!), enabled: !!id });
export const useCreateOrder = () => { const qc = useQueryClient(); return useMutation({ mutationFn: OrderApi.create, onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }) }); };
export const useReorder = () => useMutation({ mutationFn: (id: string) => OrderApi.reorder(id) });
export const useTracking = (id: string | undefined) => useQuery({ queryKey: ["tracking", id], queryFn: () => OrderApi.tracking(id!), enabled: !!id });

// ─── Wishlist ────────────────────────────────────────────────────────────────
export const useServerWishlist = () => useQuery({ queryKey: ["wishlist"], queryFn: WishlistApi.list });
export const useAddWishlist = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (productId: number) => WishlistApi.add(productId), onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist"] }) }); };
export const useRemoveWishlist = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (productId: number) => WishlistApi.remove(productId), onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist"] }) }); };

// ─── Loyalty / Referral ──────────────────────────────────────────────────────
export const useCoinsBalance = () => useQuery({ queryKey: ["coins"], queryFn: LoyaltyApi.balance });
export const useCoinsHistory = () => useQuery({ queryKey: ["coins-history"], queryFn: LoyaltyApi.history });
export const useRedeemCoins = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (coins: number) => LoyaltyApi.redeem(coins), onSuccess: () => qc.invalidateQueries({ queryKey: ["coins"] }) }); };
export const useReferral = () => useQuery({ queryKey: ["referral"], queryFn: ReferralApi.me });

// ─── Products / Search / Discovery ───────────────────────────────────────────
export const useProducts = (params: Parameters<typeof ProductApi.list>[0] = {}) => useQuery({ queryKey: ["products", params], queryFn: () => ProductApi.list(params) });
export const useProduct = (slug: string | undefined) => useQuery({ queryKey: ["product", slug], queryFn: () => ProductApi.bySlug(slug!), enabled: !!slug });
export const useFBT = (id: number | undefined) => useQuery({ queryKey: ["fbt", id], queryFn: () => ProductApi.fbt(id!), enabled: !!id });
export const useRecommendations = (limit = 6) => useQuery({ queryKey: ["recs", limit], queryFn: () => ProductApi.recommendations(limit) });
export const useStock = (id: number | undefined) => useQuery({ queryKey: ["stock", id], queryFn: () => ProductApi.stock(id!), enabled: !!id, staleTime: 30_000 });
export const useSearchSuggest = (q: string) => useQuery({ queryKey: ["search-suggest", q], queryFn: () => SearchApi.suggest(q), enabled: q.length >= 2 });

// ─── Reviews / Q&A ───────────────────────────────────────────────────────────
export const useReviews = (productId: number | undefined) => useQuery({ queryKey: ["reviews", productId], queryFn: () => ReviewApi.list(productId!), enabled: !!productId });
export const useCreateReview = (productId: number) => { const qc = useQueryClient(); return useMutation({ mutationFn: (b: { rating: number; text: string; photos?: string[] }) => ReviewApi.create(productId, b), onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews", productId] }) }); };
export const useQuestions = (productId: number | undefined) => useQuery({ queryKey: ["qa", productId], queryFn: () => QAApi.list(productId!), enabled: !!productId });
export const useAskQuestion = (productId: number) => { const qc = useQueryClient(); return useMutation({ mutationFn: (q: string) => QAApi.ask(productId, q), onSuccess: () => qc.invalidateQueries({ queryKey: ["qa", productId] }) }); };

// ─── Notifications ───────────────────────────────────────────────────────────
export const useNotifPrefs = () => useQuery({ queryKey: ["notif-prefs"], queryFn: NotificationApi.prefs });
export const useUpdateNotifPrefs = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (p: Partial<NotificationPrefs>) => NotificationApi.updatePrefs(p), onSuccess: () => qc.invalidateQueries({ queryKey: ["notif-prefs"] }) }); };
export const useInbox = () => useQuery({ queryKey: ["inbox"], queryFn: NotificationApi.inbox });
export const useMarkRead = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: string) => NotificationApi.markRead(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["inbox"] }) }); };

// ─── Seller ──────────────────────────────────────────────────────────────────
export const useSellerKpis = () => useQuery({ queryKey: ["seller-kpis"], queryFn: SellerApi.kpis });
export const useSellerInventory = () => useQuery({ queryKey: ["seller-inventory"], queryFn: SellerApi.inventory });
export const useSetSellerStock = () => { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, stock }: { id: number; stock: number }) => SellerApi.setStock(id, stock), onSuccess: () => qc.invalidateQueries({ queryKey: ["seller-inventory"] }) }); };
export const useSellerOrders = () => useQuery({ queryKey: ["seller-orders"], queryFn: SellerApi.orders });
export const useSetSellerOrderStatus = () => { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => SellerApi.setOrderStatus(id, status), onSuccess: () => qc.invalidateQueries({ queryKey: ["seller-orders"] }) }); };
export const useSellerPayouts = () => useQuery({ queryKey: ["seller-payouts"], queryFn: SellerApi.payouts });
export const useApplySeller = () => useMutation({ mutationFn: SellerApi.apply });

// ─── B2B Quote / Returns / Leads / Analytics ─────────────────────────────────
export const useCreateQuote = () => useMutation({ mutationFn: (b: QuoteRequest) => QuoteApi.create(b) });
export const useCreateReturn = () => useMutation({ mutationFn: (b: ReturnRequestDTO) => ReturnApi.create(b) });
export const useCaptureLead = () => useMutation({ mutationFn: LeadApi.capture });
export const useTrackEvent = () => useMutation({ mutationFn: (e: AnalyticsEvent) => AnalyticsApi.track(e) });
