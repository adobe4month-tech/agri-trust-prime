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
  AdminApi,
} from "@/lib/api";
import type {
  Address, CartLine, OrderStatus, NotificationPrefs, CropProfileDTO,
  QuoteRequest, ReturnRequestDTO, AnalyticsEvent,
  Coupon, ContentItem, Category, Crop, AdminSettings, BroadcastMessage, AdminSellerRow,
} from "@/lib/api/types";


// ─── Auth / Session ──────────────────────────────────────────────────────────
export const useSession = () => useQuery({ queryKey: ["session"], queryFn: AuthApi.me, retry: false });
export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ email, password }: { email: string; password: string }) => AuthApi.login(email, password),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["session"] }) });
};
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

// ─── Admin ───────────────────────────────────────────────────────────────────
export const useAdminKpis = () => useQuery({ queryKey: ["admin-kpis"], queryFn: AdminApi.kpis });

export const useAdminOrders = (params: { status?: OrderStatus; q?: string } = {}) =>
  useQuery({ queryKey: ["admin-orders", params], queryFn: () => AdminApi.orders(params) });
export const useSetAdminOrderStatus = () => { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => AdminApi.setOrderStatus(id, status), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-orders"] }) }); };
export const useRefundOrder = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: string) => AdminApi.refundOrder(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-orders"] }) }); };

export const useAdminProducts = (params: { q?: string; status?: string } = {}) =>
  useQuery({ queryKey: ["admin-products", params], queryFn: () => AdminApi.products(params) });
export const useSaveAdminProduct = () => { const qc = useQueryClient(); return useMutation({ mutationFn: AdminApi.saveProduct, onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-products"] }) }); };
export const useDeleteAdminProduct = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: number) => AdminApi.deleteProduct(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-products"] }) }); };

export const useAdminCategories = () => useQuery({ queryKey: ["admin-cats"], queryFn: AdminApi.categories });
export const useSaveCategory = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (c: Partial<Category>) => AdminApi.saveCategory(c), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-cats"] }) }); };
export const useDeleteCategory = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: string) => AdminApi.deleteCategory(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-cats"] }) }); };
export const useAdminCrops = () => useQuery({ queryKey: ["admin-crops"], queryFn: AdminApi.crops });
export const useSaveCrop = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (c: Partial<Crop>) => AdminApi.saveCrop(c), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-crops"] }) }); };
export const useDeleteCrop = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: string) => AdminApi.deleteCrop(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-crops"] }) }); };

export const useAdminSellers = (status?: AdminSellerRow["status"]) => useQuery({ queryKey: ["admin-sellers", status], queryFn: () => AdminApi.sellers(status) });
export const useSetSellerStatus = () => { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, status }: { id: string; status: AdminSellerRow["status"] }) => AdminApi.setSellerStatus(id, status), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-sellers"] }) }); };

export const useAdminCustomers = (q?: string) => useQuery({ queryKey: ["admin-customers", q], queryFn: () => AdminApi.customers(q) });
export const useAdjustCustomerCoins = () => { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, delta }: { id: string; delta: number }) => AdminApi.adjustCoins(id, delta), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-customers"] }) }); };
export const useToggleBlockCustomer = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: string) => AdminApi.toggleBlockCustomer(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-customers"] }) }); };

export const useCoupons = () => useQuery({ queryKey: ["admin-coupons"], queryFn: AdminApi.coupons });
export const useSaveCoupon = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (c: Partial<Coupon>) => AdminApi.saveCoupon(c), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-coupons"] }) }); };
export const useDeleteCoupon = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: string) => AdminApi.deleteCoupon(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-coupons"] }) }); };

export const useLoyaltyRules = () => useQuery({ queryKey: ["admin-loyalty"], queryFn: AdminApi.loyaltyRules });
export const useSaveLoyaltyRules = () => { const qc = useQueryClient(); return useMutation({ mutationFn: AdminApi.saveLoyaltyRules, onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-loyalty"] }) }); };
export const useGrantCoins = () => useMutation({ mutationFn: ({ customerId, coins, reason }: { customerId: string; coins: number; reason: string }) => AdminApi.grantCoins(customerId, coins, reason) });

export const useAdminContent = (kind?: ContentItem["kind"]) => useQuery({ queryKey: ["admin-content", kind], queryFn: () => AdminApi.content(kind) });
export const useSaveContent = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (c: Partial<ContentItem>) => AdminApi.saveContent(c), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-content"] }) }); };
export const useDeleteContent = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: string) => AdminApi.deleteContent(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-content"] }) }); };

export const useAdminReviews = (status?: "pending" | "approved" | "hidden") => useQuery({ queryKey: ["admin-reviews", status], queryFn: () => AdminApi.reviewsAll(status) });
export const useSetReviewStatus = () => { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, status }: { id: string; status: "approved" | "hidden" }) => AdminApi.setReviewStatus(id, status), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-reviews"] }) }); };

export const useAdminLeads = () => useQuery({ queryKey: ["admin-leads"], queryFn: AdminApi.leadsList });
export const useMarkLeadHandled = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: string) => AdminApi.markLeadHandled(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-leads"] }) }); };

export const useBroadcasts = () => useQuery({ queryKey: ["admin-broadcasts"], queryFn: AdminApi.broadcasts });
export const useSendBroadcast = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (m: Omit<BroadcastMessage, "id" | "sentAt">) => AdminApi.sendBroadcast(m), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-broadcasts"] }) }); };

export const useAdminSettings = () => useQuery({ queryKey: ["admin-settings"], queryFn: AdminApi.settings });
export const useSaveAdminSettings = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (s: Partial<AdminSettings>) => AdminApi.saveSettings(s), onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-settings"] }) }); };

export const useAuditLog = () => useQuery({ queryKey: ["admin-audit"], queryFn: AdminApi.audit });
