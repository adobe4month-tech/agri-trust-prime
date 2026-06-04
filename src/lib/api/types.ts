import type { Product } from "@/data/mockData";

export interface SessionUser { id: string; phone: string; name?: string; role: "customer" | "seller" | "admin"; }
export interface AuthResponse { token: string; user: SessionUser; }

export interface Address { id: string; label: string; name: string; phone: string; line1: string; city: string; province: string; postalCode?: string; isDefault?: boolean; }

export interface CartLine { productId: number; qty: number; }
export interface CartQuote { subtotal: number; discount: number; shipping: number; tax: number; total: number; appliedCoupon?: string; }

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled" | "returned";
export interface OrderItem { productId: number; name: string; qty: number; unitPrice: number; image?: string; }
export interface Order { id: string; createdAt: string; status: OrderStatus; items: OrderItem[]; total: number; address: Address; paymentMethod: "cod" | "online"; whatsappLink?: string; }
export interface TrackingEvent { at: string; status: OrderStatus; note?: string; city?: string; }
export interface OrderTracking { orderId: string; current: OrderStatus; etaDays?: number; events: TrackingEvent[]; }

export interface CoinsBalance { coins: number; rate: number; redeemableRs: number; }
export interface CoinsTxn { id: string; date: string; type: "earn" | "redeem"; coins: number; reason: string; }
export interface ReferralStats { code: string; invited: number; converted: number; coinsEarned: number; leaderboard: { name: string; coins: number; rank: number }[]; }

export interface Review { id: string; productId: number; user: string; rating: number; text: string; photos?: string[]; createdAt: string; verified: boolean; status?: "pending" | "approved" | "hidden"; }
export interface QAEntry { id: string; productId: number; question: string; answer?: string; user: string; createdAt: string; }

export interface SearchSuggest { products: Pick<Product, "id" | "name" | "slug" | "image">[]; queries: string[]; }
export interface ProductFacets { categories: { value: string; count: number }[]; brands: { value: string; count: number }[]; crops: { value: string; count: number }[]; problems: { value: string; count: number }[]; priceMin: number; priceMax: number; }
export interface ProductListResponse { products: Product[]; total: number; facets: ProductFacets; }

export interface NotificationPrefs { whatsapp: boolean; sms: boolean; email: boolean; promo: boolean; orderUpdates: boolean; restock: boolean; }
export interface InboxMessage { id: string; title: string; body: string; createdAt: string; read: boolean; link?: string; }

export interface CropProfileDTO { crops: string[]; acreage: number; province?: string; }

export interface SellerKpis { revenueRs: number; ordersToday: number; pendingShipments: number; lowStock: number; rating: number; }
export interface SellerProduct extends Product { sellerStock: number; }
export interface Payout { id: string; date: string; amountRs: number; status: "pending" | "paid"; }
export interface SellerOrder { id: string; date: string; buyer: string; city: string; amountRs: number; status: OrderStatus; }

export interface QuoteRequest { name: string; phone: string; org?: string; products: { productId: number; qty: number }[]; notes?: string; }
export interface QuoteResponse { quoteId: string; etaHours: number; whatsappLink: string; }

export interface ReturnRequestDTO { orderId: string; reason: string; items: { productId: number; qty: number }[]; photos?: string[]; }
export interface ReturnResponse { rmaId: string; etaDays: number; }

export interface AnalyticsEvent { name: string; props?: Record<string, unknown>; ts?: number; }

// ─── ADMIN ───────────────────────────────────────────────────────────────────
export interface AdminKpis {
  revenueToday: number; revenue7d: number; revenue30d: number;
  ordersToday: number; ordersPending: number;
  newUsers7d: number; activeSellers: number;
  lowStock: number; pendingSellerApplications: number;
  topSkus: { productId: number; name: string; unitsSold: number; revenue: number }[];
}
export interface AdminOrderRow { id: string; date: string; buyer: string; phone: string; city: string; sellerId?: string; sellerName?: string; amountRs: number; status: OrderStatus; paymentMethod: "cod" | "online"; }
export interface AdminProductRow extends Product { sellerName?: string; status: "active" | "draft" | "archived"; }
export interface AdminCustomerRow { id: string; name: string; phone: string; email?: string; ordersCount: number; lifetimeRs: number; coins: number; createdAt: string; blocked?: boolean; }
export interface AdminSellerRow { id: string; brand: string; ownerName: string; phone: string; city: string; status: "pending" | "approved" | "suspended"; rating: number; lifetimeRs: number; createdAt: string; }
export interface Coupon { id: string; code: string; type: "percent" | "flat"; value: number; minCart?: number; usageCap?: number; usedCount: number; validFrom: string; validTo: string; active: boolean; }
export interface ContentItem { id: string; kind: "blog" | "video" | "marketRate" | "heroBanner" | "abVariant"; title: string; slug?: string; body?: string; mediaUrl?: string; published: boolean; createdAt: string; }
export interface LeadRow { id: string; source: "get-quote" | "contact" | "exit-intent" | "footer" | "chat"; name?: string; phone?: string; email?: string; message?: string; createdAt: string; handled?: boolean; }
export interface BroadcastMessage { id: string; channel: "push" | "sms" | "whatsapp"; subject?: string; body: string; audience: "all" | "buyers" | "sellers" | "vip"; sentAt?: string; sentBy?: string; }
export interface AdminSettings { siteName: string; whatsappNumber: string; supportEmail: string; codEnabled: boolean; onlinePayEnabled: boolean; freeShippingMin: number; taxPercent: number; seoTitle: string; seoDescription: string; }
export interface AuditLogEntry { id: string; actor: string; role: string; action: string; target: string; createdAt: string; }
export interface Category { id: string; name: string; slug: string; parent?: string; productCount: number; }
export interface Crop { id: string; name: string; season: "kharif" | "rabi" | "perennial"; productCount: number; }
