/**
 * All backend endpoints. Each function:
 *  - Calls the real backend when VITE_API_BASE_URL is set.
 *  - Falls back to mock (mockData + localStorage) so existing UI works.
 * Swap to real backend by setting VITE_API_BASE_URL in .env — no UI changes needed.
 *
 * Each section is grouped by resource.
 */
import { api, withMock, auth } from "./client";
import { mockLogin, mockGetSession, mockLogout } from "./mockAuth";
import type {
  AuthResponse, SessionUser, Address, CartLine, CartQuote,
  Order, OrderTracking, OrderStatus,
  CoinsBalance, CoinsTxn, ReferralStats,
  Review, QAEntry, SearchSuggest, ProductListResponse,
  NotificationPrefs, InboxMessage, CropProfileDTO,
  SellerKpis, SellerProduct, Payout, SellerOrder,
  QuoteRequest, QuoteResponse, ReturnRequestDTO, ReturnResponse, AnalyticsEvent,
  AdminKpis, AdminOrderRow, AdminProductRow, AdminCustomerRow, AdminSellerRow,
  Coupon, ContentItem, LeadRow, BroadcastMessage, AdminSettings, AuditLogEntry,
  Category, Crop,
} from "./types";
import { products as MOCK_PRODUCTS, type Product } from "@/data/mockData";
import * as MockAdmin from "./mockAdminData";


const ls = {
  get: <T>(k: string, fallback: T): T => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; } },
  set: (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v)),
};
const uid = () => (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2));

// ─── AUTH ────────────────────────────────────────────────────────────────────
export const AuthApi = {
  login: (email: string, password: string) =>
    withMock(
      () => api<AuthResponse>("/auth/login", { method: "POST", body: { email, password } }).then((r) => {
        auth.setToken(r.token);
        localStorage.setItem("kc-auth-user", JSON.stringify(r.user));
        return r;
      }),
      () => mockLogin(email, password),
    ),
  sendOtp: (phone: string) =>
    withMock(() => api<{ ok: true }>("/auth/send-otp", { method: "POST", body: { phone } }),
      () => ({ ok: true as const })),
  verifyOtp: (phone: string, otp: string) =>
    withMock(() => api<AuthResponse>("/auth/verify-otp", { method: "POST", body: { phone, otp } }),
      () => {
        const user: SessionUser = { id: "u_" + phone, phone, role: "customer" };
        const token = "mock." + btoa(phone) + ".token";
        auth.setToken(token);
        localStorage.setItem("kc-auth-user", JSON.stringify(user));
        return { token, user };
      }),
  me: () => withMock(() => api<SessionUser>("/auth/me"), () => mockGetSession()),
  logout: () => withMock(
    async () => { try { await api("/auth/logout", { method: "POST" }); } catch {} mockLogout(); },
    async () => { mockLogout(); },
  ),
};


// ─── PROFILE ─────────────────────────────────────────────────────────────────
export const ProfileApi = {
  get: () => withMock(() => api<Record<string, unknown>>("/me/profile"),
    () => ls.get("kc-profile", {})),
  update: (patch: Record<string, unknown>) => withMock(() => api("/me/profile", { method: "PUT", body: patch }),
    () => { const cur = ls.get<Record<string, unknown>>("kc-profile", {}); const next = { ...cur, ...patch }; ls.set("kc-profile", next); return next; }),
};

// ─── ADDRESSES ───────────────────────────────────────────────────────────────
export const AddressApi = {
  list: () => withMock(() => api<Address[]>("/me/addresses"), () => ls.get<Address[]>("kc-addresses", [])),
  create: (a: Omit<Address, "id">) => withMock(() => api<Address>("/me/addresses", { method: "POST", body: a }),
    () => { const list = ls.get<Address[]>("kc-addresses", []); const n = { ...a, id: uid() }; ls.set("kc-addresses", [...list, n]); return n; }),
  update: (id: string, patch: Partial<Address>) => withMock(() => api<Address>(`/me/addresses/${id}`, { method: "PUT", body: patch }),
    () => { const list = ls.get<Address[]>("kc-addresses", []).map(x => x.id === id ? { ...x, ...patch } : x); ls.set("kc-addresses", list); return list.find(x => x.id === id)!; }),
  remove: (id: string) => withMock(() => api<{ ok: true }>(`/me/addresses/${id}`, { method: "DELETE" }),
    () => { ls.set("kc-addresses", ls.get<Address[]>("kc-addresses", []).filter(x => x.id !== id)); return { ok: true as const }; }),
};

// ─── CART ────────────────────────────────────────────────────────────────────
export const CartApi = {
  get: () => withMock(() => api<CartLine[]>("/cart"),
    () => { const items = ls.get<{ product: Product; qty: number }[]>("kc-cart", []); return items.map(i => ({ productId: i.product.id, qty: i.qty })); }),
  set: (lines: CartLine[]) => withMock(() => api<{ ok: true }>("/cart", { method: "PUT", body: { lines } }),
    () => ({ ok: true as const })),
  quote: (lines: CartLine[], coupon?: string) => withMock(() => api<CartQuote>("/cart/quote", { method: "POST", body: { lines, coupon } }),
    () => {
      const subtotal = lines.reduce((s, l) => { const p = MOCK_PRODUCTS.find(x => x.id === l.productId); return s + (p?.price || 0) * l.qty; }, 0);
      const discount = coupon === "WAPSI5" ? Math.round(subtotal * 0.05) : 0;
      const shipping = subtotal > 2000 ? 0 : 150;
      const tax = 0;
      return { subtotal, discount, shipping, tax, total: subtotal - discount + shipping + tax, appliedCoupon: coupon };
    }),
};

// ─── ORDERS ──────────────────────────────────────────────────────────────────
export const OrderApi = {
  create: (payload: { lines: CartLine[]; addressId: string; paymentMethod: "cod" | "online"; coupon?: string; coinsRedeem?: number }) =>
    withMock(() => api<Order>("/orders", { method: "POST", body: payload }),
      () => {
        const items: Order["items"] = payload.lines.map(l => { const p = MOCK_PRODUCTS.find(x => x.id === l.productId)!; return { productId: p.id, name: p.name, qty: l.qty, unitPrice: p.price, image: p.image }; });
        const total = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
        const addr = ls.get<Address[]>("kc-addresses", []).find(a => a.id === payload.addressId) || { id: payload.addressId, label: "Home", name: "", phone: "", line1: "", city: "", province: "" };
        const order: Order = { id: "KC-" + Math.floor(1000 + Math.random() * 9000), createdAt: new Date().toISOString(), status: "confirmed", items, total, address: addr, paymentMethod: payload.paymentMethod };
        const orders = ls.get<Order[]>("kc-orders", []); ls.set("kc-orders", [order, ...orders]);
        return order;
      }),
  list: () => withMock(() => api<Order[]>("/me/orders"), () => ls.get<Order[]>("kc-orders", [])),
  get: (id: string) => withMock(() => api<Order>(`/orders/${id}`),
    () => { const o = ls.get<Order[]>("kc-orders", []).find(x => x.id === id); if (!o) throw new Error("Not found"); return o; }),
  reorder: (id: string) => withMock(() => api<{ ok: true }>(`/orders/${id}/reorder`, { method: "POST" }), () => ({ ok: true as const })),
  tracking: (id: string) => withMock(() => api<OrderTracking>(`/orders/${id}/tracking`),
    () => {
      const events = [
        { at: new Date(Date.now() - 3 * 864e5).toISOString(), status: "confirmed" as OrderStatus, city: "Lahore" },
        { at: new Date(Date.now() - 2 * 864e5).toISOString(), status: "processing" as OrderStatus, city: "Lahore" },
        { at: new Date(Date.now() - 1 * 864e5).toISOString(), status: "shipped" as OrderStatus, city: "Multan" },
      ];
      return { orderId: id, current: "shipped" as OrderStatus, etaDays: 1, events };
    }),
  invoiceUrl: (id: string) => `${import.meta.env.VITE_API_BASE_URL || ""}/orders/${id}/invoice.pdf`,
};

// ─── WISHLIST ────────────────────────────────────────────────────────────────
export const WishlistApi = {
  list: () => withMock(() => api<number[]>("/me/wishlist"), () => ls.get<number[]>("kc-wishlist", [])),
  add: (productId: number) => withMock(() => api<{ ok: true }>("/me/wishlist", { method: "POST", body: { productId } }), () => ({ ok: true as const })),
  remove: (productId: number) => withMock(() => api<{ ok: true }>(`/me/wishlist/${productId}`, { method: "DELETE" }), () => ({ ok: true as const })),
};

// ─── LOYALTY / REFERRAL ──────────────────────────────────────────────────────
export const LoyaltyApi = {
  balance: () => withMock(() => api<CoinsBalance>("/me/coins"),
    () => ({ coins: Number(localStorage.getItem("kc-coins") || 250), rate: 2, redeemableRs: Math.floor(Number(localStorage.getItem("kc-coins") || 250) / 2) })),
  history: () => withMock(() => api<CoinsTxn[]>("/me/coins/history"), () => ls.get<CoinsTxn[]>("kc-coins-history", [])),
  redeem: (coins: number) => withMock(() => api<CoinsBalance>("/coins/redeem", { method: "POST", body: { coins } }),
    () => { const cur = Number(localStorage.getItem("kc-coins") || 0); const next = Math.max(0, cur - coins); localStorage.setItem("kc-coins", String(next)); return { coins: next, rate: 2, redeemableRs: Math.floor(next / 2) }; }),
};
export const ReferralApi = {
  me: () => withMock(() => api<ReferralStats>("/me/referral"),
    () => ({ code: "KC-" + (localStorage.getItem("kc-user-phone")?.slice(-4) || "0000"), invited: 3, converted: 1, coinsEarned: 100,
      leaderboard: [{ name: "Ali R.", coins: 1240, rank: 1 }, { name: "Hassan K.", coins: 980, rank: 2 }, { name: "You", coins: 100, rank: 7 }] })),
};

// ─── PRODUCTS / SEARCH / DISCOVERY ───────────────────────────────────────────
export const ProductApi = {
  list: (params: { q?: string; category?: string; brand?: string; crop?: string; problem?: string; minPrice?: number; maxPrice?: number; sort?: string; page?: number; pageSize?: number } = {}) =>
    withMock(() => api<ProductListResponse>("/products", { query: params as any }),
      () => {
        let list = [...MOCK_PRODUCTS];
        if (params.q) { const q = params.q.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)); }
        if (params.category) list = list.filter(p => p.category === params.category);
        if (params.brand) list = list.filter(p => p.brand === params.brand);
        if (params.crop) list = list.filter(p => p.targetCrops?.includes(params.crop!));
        if (params.problem) list = list.filter(p => p.targetProblems?.includes(params.problem!));
        const facets = {
          categories: [...new Set(MOCK_PRODUCTS.map(p => p.category))].map(v => ({ value: v, count: MOCK_PRODUCTS.filter(p => p.category === v).length })),
          brands: [...new Set(MOCK_PRODUCTS.map(p => p.brand))].map(v => ({ value: v, count: MOCK_PRODUCTS.filter(p => p.brand === v).length })),
          crops: [...new Set(MOCK_PRODUCTS.flatMap(p => p.targetCrops || []))].map(v => ({ value: v, count: MOCK_PRODUCTS.filter(p => p.targetCrops?.includes(v)).length })),
          problems: [...new Set(MOCK_PRODUCTS.flatMap(p => p.targetProblems || []))].map(v => ({ value: v, count: MOCK_PRODUCTS.filter(p => p.targetProblems?.includes(v)).length })),
          priceMin: Math.min(...MOCK_PRODUCTS.map(p => p.price)), priceMax: Math.max(...MOCK_PRODUCTS.map(p => p.price)),
        };
        return { products: list, total: list.length, facets };
      }),
  bySlug: (slug: string) => withMock(() => api<Product>(`/products/${slug}`),
    () => { const p = MOCK_PRODUCTS.find(x => x.slug === slug); if (!p) throw new Error("Not found"); return p; }),
  fbt: (id: number) => withMock(() => api<Product[]>(`/products/${id}/fbt`),
    () => { const me = MOCK_PRODUCTS.find(p => p.id === id); return MOCK_PRODUCTS.filter(p => p.id !== id && p.category === me?.category).slice(0, 3); }),
  recommendations: (limit = 6) => withMock(() => api<Product[]>("/me/recommendations", { query: { limit } }),
    () => MOCK_PRODUCTS.slice(0, limit)),
  stock: (id: number) => withMock(() => api<{ stockCount: number; status: Product["stockStatus"] }>(`/products/${id}/stock`),
    () => { const p = MOCK_PRODUCTS.find(x => x.id === id); return { stockCount: p?.stockCount || 0, status: p?.stockStatus || "in-stock" }; }),
};

export const SearchApi = {
  suggest: (q: string) => withMock(() => api<SearchSuggest>("/search/suggest", { query: { q } }),
    () => {
      const ql = q.toLowerCase();
      const products = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(ql)).slice(0, 5).map(p => ({ id: p.id, name: p.name, slug: p.slug, image: p.image }));
      return { products, queries: [q + " price", q + " dosage", q + " review"].slice(0, 3) };
    }),
};

// ─── REVIEWS / Q&A ───────────────────────────────────────────────────────────
export const ReviewApi = {
  list: (productId: number) => withMock(() => api<Review[]>(`/products/${productId}/reviews`), () => ls.get<Review[]>(`kc-reviews-${productId}`, [])),
  create: (productId: number, body: { rating: number; text: string; photos?: string[] }) =>
    withMock(() => api<Review>(`/products/${productId}/reviews`, { method: "POST", body }),
      () => { const r: Review = { id: uid(), productId, user: localStorage.getItem("kc-user-phone") || "Anonymous", createdAt: new Date().toISOString(), verified: false, ...body }; const list = ls.get<Review[]>(`kc-reviews-${productId}`, []); ls.set(`kc-reviews-${productId}`, [r, ...list]); return r; }),
};
export const QAApi = {
  list: (productId: number) => withMock(() => api<QAEntry[]>(`/products/${productId}/questions`), () => ls.get<QAEntry[]>(`kc-qa-${productId}`, [])),
  ask: (productId: number, question: string) => withMock(() => api<QAEntry>(`/products/${productId}/questions`, { method: "POST", body: { question } }),
    () => { const q: QAEntry = { id: uid(), productId, question, user: localStorage.getItem("kc-user-phone") || "Anonymous", createdAt: new Date().toISOString() }; const list = ls.get<QAEntry[]>(`kc-qa-${productId}`, []); ls.set(`kc-qa-${productId}`, [q, ...list]); return q; }),
};

// ─── NOTIFICATIONS / PREFS / CROP PROFILE ────────────────────────────────────
export const NotificationApi = {
  prefs: () => withMock(() => api<NotificationPrefs>("/me/notification-prefs"),
    () => ls.get<NotificationPrefs>("kc-notif-prefs", { whatsapp: true, sms: true, email: false, promo: true, orderUpdates: true, restock: true })),
  updatePrefs: (prefs: Partial<NotificationPrefs>) => withMock(() => api<NotificationPrefs>("/me/notification-prefs", { method: "PUT", body: prefs }),
    () => { const cur = ls.get<NotificationPrefs>("kc-notif-prefs", {} as NotificationPrefs); const next = { ...cur, ...prefs }; ls.set("kc-notif-prefs", next); return next; }),
  inbox: () => withMock(() => api<InboxMessage[]>("/me/notifications"), () => ls.get<InboxMessage[]>("kc-inbox", [])),
  markRead: (id: string) => withMock(() => api<{ ok: true }>(`/me/notifications/${id}/read`, { method: "POST" }),
    () => { ls.set("kc-inbox", ls.get<InboxMessage[]>("kc-inbox", []).map(m => m.id === id ? { ...m, read: true } : m)); return { ok: true as const }; }),
};
export const CropProfileApi = {
  get: () => withMock(() => api<CropProfileDTO>("/me/crop-profile"), () => ls.get<CropProfileDTO>("kc-crop-profile", { crops: [], acreage: 0 })),
  update: (p: CropProfileDTO) => withMock(() => api<CropProfileDTO>("/me/crop-profile", { method: "PUT", body: p }), () => { ls.set("kc-crop-profile", p); return p; }),
};

// ─── SELLER ──────────────────────────────────────────────────────────────────
export const SellerApi = {
  kpis: () => withMock(() => api<SellerKpis>("/seller/kpis"),
    () => ({ revenueRs: 184500, ordersToday: 12, pendingShipments: 4, lowStock: 3, rating: 4.7 })),
  inventory: () => withMock(() => api<SellerProduct[]>("/seller/products"),
    () => MOCK_PRODUCTS.slice(0, 8).map(p => ({ ...p, sellerStock: p.stockCount }))),
  setStock: (productId: number, stock: number) => withMock(() => api<{ ok: true }>(`/seller/products/${productId}/stock`, { method: "PATCH", body: { stock } }), () => ({ ok: true as const })),
  orders: () => withMock(() => api<SellerOrder[]>("/seller/orders"), () => []),
  setOrderStatus: (id: string, status: OrderStatus) => withMock(() => api<{ ok: true }>(`/seller/orders/${id}/status`, { method: "PATCH", body: { status } }), () => ({ ok: true as const })),
  payouts: () => withMock(() => api<Payout[]>("/seller/payouts"),
    () => [{ id: "PO-115", date: "2026-05-01", amountRs: 184500, status: "paid" as const }]),
  apply: (body: { name: string; brand: string; phone: string; city: string; categories: string[] }) =>
    withMock(() => api<{ applicationId: string }>("/seller/applications", { method: "POST", body }),
      () => ({ applicationId: "APP-" + uid().slice(0, 6) })),
};

// ─── B2B / LEADS / RETURNS ───────────────────────────────────────────────────
export const QuoteApi = {
  create: (body: QuoteRequest) => withMock(() => api<QuoteResponse>("/quotes", { method: "POST", body }),
    () => ({ quoteId: "Q-" + uid().slice(0, 6), etaHours: 24, whatsappLink: `https://wa.me/923001234567?text=${encodeURIComponent("Quote " + body.name)}` })),
};
export const ReturnApi = {
  create: (body: ReturnRequestDTO) => withMock(() => api<ReturnResponse>("/returns", { method: "POST", body }),
    () => ({ rmaId: "RMA-" + uid().slice(0, 6), etaDays: 3 })),
};

// ─── LEAD CAPTURE / ANALYTICS ────────────────────────────────────────────────
export const LeadApi = {
  capture: (body: { phone?: string; email?: string; source: string; meta?: Record<string, unknown> }) =>
    withMock(() => api<{ ok: true }>("/leads", { method: "POST", body }),
      () => { const list = ls.get<unknown[]>("kc-leads", []); ls.set("kc-leads", [{ ...body, ts: Date.now() }, ...list]); return { ok: true as const }; }),
};
export const AnalyticsApi = {
  track: (e: AnalyticsEvent) => withMock(() => api<{ ok: true }>("/events", { method: "POST", body: { ...e, ts: e.ts ?? Date.now() } }),
    () => { const list = ls.get<AnalyticsEvent[]>("kc-events", []); ls.set("kc-events", [{ ...e, ts: e.ts ?? Date.now() }, ...list].slice(0, 100)); return { ok: true as const }; }),
};

// ─── UPLOADS ─────────────────────────────────────────────────────────────────
export const UploadApi = {
  signedUrl: (filename: string, contentType: string) =>
    withMock(() => api<{ uploadUrl: string; publicUrl: string }>("/uploads/sign", { method: "POST", body: { filename, contentType } }),
      () => ({ uploadUrl: "data:mock", publicUrl: URL.createObjectURL(new Blob([filename])) })),
};

// ─── ADMIN ───────────────────────────────────────────────────────────────────
const adminLs = <T>(k: string, fb: T): T => ls.get(k, fb);
const adminSet = (k: string, v: unknown) => ls.set(k, v);

export const AdminApi = {
  kpis: () => withMock(() => api<AdminKpis>("/admin/kpis"), () => MockAdmin.adminKpis),

  // Orders
  orders: (params: { status?: OrderStatus; q?: string } = {}) =>
    withMock(() => api<AdminOrderRow[]>("/admin/orders", { query: params as any }),
      () => {
        let rows = [...MockAdmin.adminOrders];
        if (params.status) rows = rows.filter(r => r.status === params.status);
        if (params.q) { const q = params.q.toLowerCase(); rows = rows.filter(r => r.id.toLowerCase().includes(q) || r.buyer.toLowerCase().includes(q) || r.phone.includes(q)); }
        return rows;
      }),
  setOrderStatus: (id: string, status: OrderStatus) =>
    withMock(() => api<{ ok: true }>(`/admin/orders/${id}/status`, { method: "PATCH", body: { status } }), () => ({ ok: true as const })),
  refundOrder: (id: string) => withMock(() => api<{ ok: true }>(`/admin/orders/${id}/refund`, { method: "POST" }), () => ({ ok: true as const })),

  // Products
  products: (params: { q?: string; status?: string } = {}) =>
    withMock(() => api<AdminProductRow[]>("/admin/products", { query: params as any }),
      () => {
        let rows = [...MockAdmin.adminProducts];
        if (params.q) { const q = params.q.toLowerCase(); rows = rows.filter(r => r.name.toLowerCase().includes(q) || r.brand.toLowerCase().includes(q)); }
        if (params.status) rows = rows.filter(r => r.status === params.status);
        return rows;
      }),
  saveProduct: (p: Partial<AdminProductRow> & { id?: number }) =>
    withMock(() => api<AdminProductRow>("/admin/products", { method: p.id ? "PUT" : "POST", body: p }),
      () => ({ ...(MockAdmin.adminProducts[0]), ...p } as AdminProductRow)),
  deleteProduct: (id: number) =>
    withMock(() => api<{ ok: true }>(`/admin/products/${id}`, { method: "DELETE" }), () => ({ ok: true as const })),

  // Taxonomy
  categories: () => withMock(() => api<Category[]>("/admin/categories"), () => adminLs("kc-admin-cats", MockAdmin.categories)),
  saveCategory: (c: Partial<Category>) =>
    withMock(() => api<Category>("/admin/categories", { method: c.id ? "PUT" : "POST", body: c }),
      () => { const cur = adminLs<Category[]>("kc-admin-cats", MockAdmin.categories); const next = c.id ? cur.map(x => x.id === c.id ? { ...x, ...c } as Category : x) : [...cur, { ...c, id: uid(), productCount: 0 } as Category]; adminSet("kc-admin-cats", next); return next.find(x => x.id === (c.id ?? next[next.length - 1].id))!; }),
  deleteCategory: (id: string) =>
    withMock(() => api<{ ok: true }>(`/admin/categories/${id}`, { method: "DELETE" }),
      () => { adminSet("kc-admin-cats", adminLs<Category[]>("kc-admin-cats", MockAdmin.categories).filter(x => x.id !== id)); return { ok: true as const }; }),
  crops: () => withMock(() => api<Crop[]>("/admin/crops"), () => adminLs("kc-admin-crops", MockAdmin.crops)),
  saveCrop: (c: Partial<Crop>) =>
    withMock(() => api<Crop>("/admin/crops", { method: c.id ? "PUT" : "POST", body: c }),
      () => { const cur = adminLs<Crop[]>("kc-admin-crops", MockAdmin.crops); const next = c.id ? cur.map(x => x.id === c.id ? { ...x, ...c } as Crop : x) : [...cur, { ...c, id: uid(), productCount: 0 } as Crop]; adminSet("kc-admin-crops", next); return next[next.length - 1]; }),
  deleteCrop: (id: string) =>
    withMock(() => api<{ ok: true }>(`/admin/crops/${id}`, { method: "DELETE" }),
      () => { adminSet("kc-admin-crops", adminLs<Crop[]>("kc-admin-crops", MockAdmin.crops).filter(x => x.id !== id)); return { ok: true as const }; }),

  // Sellers
  sellers: (status?: "pending" | "approved" | "suspended") =>
    withMock(() => api<AdminSellerRow[]>("/admin/sellers", { query: { status } }),
      () => { const all = adminLs<AdminSellerRow[]>("kc-admin-sellers", MockAdmin.adminSellers); return status ? all.filter(s => s.status === status) : all; }),
  setSellerStatus: (id: string, status: AdminSellerRow["status"]) =>
    withMock(() => api<{ ok: true }>(`/admin/sellers/${id}/status`, { method: "PATCH", body: { status } }),
      () => { const all = adminLs<AdminSellerRow[]>("kc-admin-sellers", MockAdmin.adminSellers).map(s => s.id === id ? { ...s, status } : s); adminSet("kc-admin-sellers", all); return { ok: true as const }; }),

  // Customers
  customers: (q?: string) =>
    withMock(() => api<AdminCustomerRow[]>("/admin/customers", { query: { q } }),
      () => { const all = adminLs<AdminCustomerRow[]>("kc-admin-customers", MockAdmin.adminCustomers); if (!q) return all; const ql = q.toLowerCase(); return all.filter(c => c.name.toLowerCase().includes(ql) || c.phone.includes(q) || c.email?.toLowerCase().includes(ql)); }),
  adjustCoins: (id: string, delta: number) =>
    withMock(() => api<{ ok: true }>(`/admin/customers/${id}/coins`, { method: "POST", body: { delta } }),
      () => { const all = adminLs<AdminCustomerRow[]>("kc-admin-customers", MockAdmin.adminCustomers).map(c => c.id === id ? { ...c, coins: c.coins + delta } : c); adminSet("kc-admin-customers", all); return { ok: true as const }; }),
  toggleBlockCustomer: (id: string) =>
    withMock(() => api<{ ok: true }>(`/admin/customers/${id}/block`, { method: "POST" }),
      () => { const all = adminLs<AdminCustomerRow[]>("kc-admin-customers", MockAdmin.adminCustomers).map(c => c.id === id ? { ...c, blocked: !c.blocked } : c); adminSet("kc-admin-customers", all); return { ok: true as const }; }),

  // Coupons
  coupons: () => withMock(() => api<Coupon[]>("/admin/coupons"), () => adminLs("kc-admin-coupons", MockAdmin.coupons)),
  saveCoupon: (c: Partial<Coupon>) =>
    withMock(() => api<Coupon>("/admin/coupons", { method: c.id ? "PUT" : "POST", body: c }),
      () => { const cur = adminLs<Coupon[]>("kc-admin-coupons", MockAdmin.coupons); const next = c.id ? cur.map(x => x.id === c.id ? { ...x, ...c } as Coupon : x) : [...cur, { ...c, id: uid(), usedCount: 0, active: true } as Coupon]; adminSet("kc-admin-coupons", next); return next[next.length - 1]; }),
  deleteCoupon: (id: string) =>
    withMock(() => api<{ ok: true }>(`/admin/coupons/${id}`, { method: "DELETE" }),
      () => { adminSet("kc-admin-coupons", adminLs<Coupon[]>("kc-admin-coupons", MockAdmin.coupons).filter(x => x.id !== id)); return { ok: true as const }; }),

  // Loyalty / coins rules
  loyaltyRules: () => withMock(() => api<{ earnRate: number; redeemRate: number; minRedeem: number }>("/admin/loyalty/rules"),
    () => adminLs("kc-admin-loyalty", { earnRate: 1, redeemRate: 2, minRedeem: 100 })),
  saveLoyaltyRules: (r: { earnRate: number; redeemRate: number; minRedeem: number }) =>
    withMock(() => api<{ ok: true }>("/admin/loyalty/rules", { method: "PUT", body: r }), () => { adminSet("kc-admin-loyalty", r); return { ok: true as const }; }),
  grantCoins: (customerId: string, coins: number, reason: string) =>
    withMock(() => api<{ ok: true }>("/admin/loyalty/grant", { method: "POST", body: { customerId, coins, reason } }), () => ({ ok: true as const })),

  // Content
  content: (kind?: ContentItem["kind"]) =>
    withMock(() => api<ContentItem[]>("/admin/content", { query: { kind } }),
      () => { const all = adminLs<ContentItem[]>("kc-admin-content", MockAdmin.contentItems); return kind ? all.filter(c => c.kind === kind) : all; }),
  saveContent: (c: Partial<ContentItem>) =>
    withMock(() => api<ContentItem>("/admin/content", { method: c.id ? "PUT" : "POST", body: c }),
      () => { const cur = adminLs<ContentItem[]>("kc-admin-content", MockAdmin.contentItems); const next = c.id ? cur.map(x => x.id === c.id ? { ...x, ...c } as ContentItem : x) : [...cur, { ...c, id: uid(), createdAt: new Date().toISOString(), published: false } as ContentItem]; adminSet("kc-admin-content", next); return next[next.length - 1]; }),
  deleteContent: (id: string) =>
    withMock(() => api<{ ok: true }>(`/admin/content/${id}`, { method: "DELETE" }),
      () => { adminSet("kc-admin-content", adminLs<ContentItem[]>("kc-admin-content", MockAdmin.contentItems).filter(x => x.id !== id)); return { ok: true as const }; }),

  // Reviews moderation
  reviewsAll: (status?: "pending" | "approved" | "hidden") =>
    withMock(() => api<Review[]>("/admin/reviews", { query: { status } }),
      () => { const all = adminLs<Review[]>("kc-admin-reviews", MockAdmin.adminReviews); return status ? all.filter(r => r.status === status) : all; }),
  setReviewStatus: (id: string, status: "approved" | "hidden") =>
    withMock(() => api<{ ok: true }>(`/admin/reviews/${id}/status`, { method: "PATCH", body: { status } }),
      () => { const all = adminLs<Review[]>("kc-admin-reviews", MockAdmin.adminReviews).map(r => r.id === id ? { ...r, status } : r); adminSet("kc-admin-reviews", all); return { ok: true as const }; }),

  // Leads
  leadsList: () => withMock(() => api<LeadRow[]>("/admin/leads"), () => adminLs("kc-admin-leads", MockAdmin.leads)),
  markLeadHandled: (id: string) =>
    withMock(() => api<{ ok: true }>(`/admin/leads/${id}/handled`, { method: "POST" }),
      () => { const all = adminLs<LeadRow[]>("kc-admin-leads", MockAdmin.leads).map(l => l.id === id ? { ...l, handled: true } : l); adminSet("kc-admin-leads", all); return { ok: true as const }; }),

  // Notifications / broadcast
  broadcasts: () => withMock(() => api<BroadcastMessage[]>("/admin/notifications"), () => adminLs("kc-admin-broadcasts", MockAdmin.broadcasts)),
  sendBroadcast: (m: Omit<BroadcastMessage, "id" | "sentAt">) =>
    withMock(() => api<BroadcastMessage>("/admin/notifications/broadcast", { method: "POST", body: m }),
      () => { const msg: BroadcastMessage = { ...m, id: uid(), sentAt: new Date().toISOString(), sentBy: "admin@test.com" }; const cur = adminLs<BroadcastMessage[]>("kc-admin-broadcasts", MockAdmin.broadcasts); adminSet("kc-admin-broadcasts", [msg, ...cur]); return msg; }),

  // Settings
  settings: () => withMock(() => api<AdminSettings>("/admin/settings"), () => adminLs("kc-admin-settings", MockAdmin.adminSettings)),
  saveSettings: (s: Partial<AdminSettings>) =>
    withMock(() => api<AdminSettings>("/admin/settings", { method: "PUT", body: s }),
      () => { const cur = adminLs<AdminSettings>("kc-admin-settings", MockAdmin.adminSettings); const next = { ...cur, ...s }; adminSet("kc-admin-settings", next); return next; }),

  // Audit
  audit: () => withMock(() => api<AuditLogEntry[]>("/admin/audit"), () => MockAdmin.auditLog),
};

