/** Seed data used by AdminApi when running in mock mode (no VITE_API_BASE_URL). */
import type {
  AdminKpis, AdminOrderRow, AdminProductRow, AdminCustomerRow, AdminSellerRow,
  Coupon, ContentItem, LeadRow, BroadcastMessage, AdminSettings, AuditLogEntry,
  Category, Crop, Review,
} from "./types";
import { products as MOCK_PRODUCTS } from "@/data/mockData";

const isoDaysAgo = (d: number) => new Date(Date.now() - d * 86400000).toISOString();

export const adminKpis: AdminKpis = {
  revenueToday: 84500, revenue7d: 612400, revenue30d: 2845000,
  ordersToday: 23, ordersPending: 9,
  newUsers7d: 142, activeSellers: 38,
  lowStock: 7, pendingSellerApplications: 3,
  topSkus: MOCK_PRODUCTS.slice(0, 5).map((p, i) => ({
    productId: p.id, name: p.name, unitsSold: 120 - i * 18, revenue: (120 - i * 18) * p.price,
  })),
};

export const adminOrders: AdminOrderRow[] = Array.from({ length: 18 }).map((_, i) => ({
  id: "KC-" + (4500 + i),
  date: isoDaysAgo(i),
  buyer: ["Ali R.", "Hassan K.", "Sajjad", "Fatima B.", "Ahmed", "Bilal", "Rashid"][i % 7],
  phone: "0300" + (1000000 + i * 137).toString().slice(0, 7),
  city: ["Lahore", "Multan", "Faisalabad", "Sahiwal", "Bahawalpur"][i % 5],
  sellerId: "s_" + ((i % 3) + 1),
  sellerName: ["KissanCares Direct", "AgriPak", "GreenFields"][i % 3],
  amountRs: 1500 + i * 320,
  status: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"][i % 6] as AdminOrderRow["status"],
  paymentMethod: i % 3 === 0 ? "online" : "cod",
}));

export const adminProducts: AdminProductRow[] = MOCK_PRODUCTS.map((p, i) => ({
  ...p,
  sellerName: ["KissanCares Direct", "AgriPak", "GreenFields"][i % 3],
  status: (i % 7 === 0 ? "draft" : "active") as "draft" | "active",
}));

export const adminCustomers: AdminCustomerRow[] = Array.from({ length: 14 }).map((_, i) => ({
  id: "u_" + (100 + i),
  name: ["Ali R.", "Hassan K.", "Sajjad", "Fatima B.", "Ahmed M.", "Bilal A.", "Rashid M."][i % 7],
  phone: "0300" + (2000000 + i * 211).toString().slice(0, 7),
  email: `farmer${i + 1}@example.com`,
  ordersCount: (i % 6) + 1,
  lifetimeRs: 4500 + i * 870,
  coins: 50 + i * 17,
  createdAt: isoDaysAgo(i * 3),
  blocked: false,
}));

export const adminSellers: AdminSellerRow[] = [
  { id: "s_1", brand: "KissanCares Direct", ownerName: "Operations", phone: "03240287276", city: "Lahore", status: "approved", rating: 4.8, lifetimeRs: 1845000, createdAt: isoDaysAgo(180) },
  { id: "s_2", brand: "AgriPak Industries", ownerName: "M. Tariq", phone: "03001234567", city: "Multan", status: "approved", rating: 4.6, lifetimeRs: 985000, createdAt: isoDaysAgo(120) },
  { id: "s_3", brand: "GreenFields", ownerName: "S. Yousaf", phone: "03219876543", city: "Faisalabad", status: "approved", rating: 4.5, lifetimeRs: 612000, createdAt: isoDaysAgo(90) },
  { id: "s_4", brand: "Punjab Agri Co.", ownerName: "N. Hussain", phone: "03331122334", city: "Sahiwal", status: "pending", rating: 0, lifetimeRs: 0, createdAt: isoDaysAgo(2) },
  { id: "s_5", brand: "Crop Care", ownerName: "A. Khan", phone: "03455566778", city: "Bahawalpur", status: "pending", rating: 0, lifetimeRs: 0, createdAt: isoDaysAgo(1) },
];

export const coupons: Coupon[] = [
  { id: "c1", code: "WAPSI5", type: "percent", value: 5, minCart: 0, usageCap: 1000, usedCount: 412, validFrom: isoDaysAgo(30), validTo: isoDaysAgo(-60), active: true },
  { id: "c2", code: "RABI100", type: "flat", value: 100, minCart: 2000, usageCap: 500, usedCount: 89, validFrom: isoDaysAgo(15), validTo: isoDaysAgo(-30), active: true },
  { id: "c3", code: "FIRST10", type: "percent", value: 10, minCart: 1000, usageCap: 2000, usedCount: 1180, validFrom: isoDaysAgo(60), validTo: isoDaysAgo(-90), active: true },
];

export const contentItems: ContentItem[] = [
  { id: "ct1", kind: "blog", title: "Best fertilizers for wheat", slug: "wheat-fertilizer", published: true, createdAt: isoDaysAgo(7) },
  { id: "ct2", kind: "blog", title: "Cotton pest control guide", slug: "cotton-pest", published: true, createdAt: isoDaysAgo(20) },
  { id: "ct3", kind: "video", title: "How to use sprayer correctly", mediaUrl: "https://youtu.be/demo", published: true, createdAt: isoDaysAgo(3) },
  { id: "ct4", kind: "marketRate", title: "Wheat — Lahore Mandi", body: "Rs 4,200 / 40kg", published: true, createdAt: isoDaysAgo(0) },
  { id: "ct5", kind: "heroBanner", title: "Rabi season sale", mediaUrl: "/banner.jpg", published: true, createdAt: isoDaysAgo(5) },
  { id: "ct6", kind: "abVariant", title: "Hero CTA — 'Order Now' vs 'Shop Rabi Deals'", published: true, createdAt: isoDaysAgo(2) },
];

export const leads: LeadRow[] = Array.from({ length: 11 }).map((_, i) => ({
  id: "ld_" + i,
  source: (["get-quote", "contact", "exit-intent", "footer", "chat"] as const)[i % 5],
  name: ["Ali", "Hassan", "Sajjad", "Fatima"][i % 4],
  phone: "0300" + (3000000 + i * 311).toString().slice(0, 7),
  message: ["Need DAP 50 bags", "Quote request for cotton", "How to use this product?"][i % 3],
  createdAt: isoDaysAgo(i),
  handled: i > 6,
}));

export const broadcasts: BroadcastMessage[] = [
  { id: "b1", channel: "whatsapp", body: "Rabi season sale: 10% off!", audience: "all", sentAt: isoDaysAgo(3), sentBy: "admin@test.com" },
  { id: "b2", channel: "sms", body: "Your order has been dispatched", audience: "buyers", sentAt: isoDaysAgo(1), sentBy: "admin@test.com" },
];

export const adminSettings: AdminSettings = {
  siteName: "KissanCares",
  whatsappNumber: "923240287276",
  supportEmail: "support@kissancares.com",
  codEnabled: true,
  onlinePayEnabled: false,
  freeShippingMin: 2000,
  taxPercent: 0,
  seoTitle: "KissanCares — Pakistan's Trusted Agri Marketplace",
  seoDescription: "Quality fertilizers, seeds, pesticides delivered to your farm. COD, free shipping over Rs 2,000.",
};

export const auditLog: AuditLogEntry[] = Array.from({ length: 12 }).map((_, i) => ({
  id: "al_" + i,
  actor: ["admin@test.com", "ops@kissancares.com"][i % 2],
  role: "admin",
  action: ["updated_product", "approved_seller", "issued_refund", "changed_settings", "created_coupon"][i % 5],
  target: ["product#" + (100 + i), "seller#s_4", "order#KC-" + (4500 + i), "settings", "coupon#WAPSI5"][i % 5],
  createdAt: isoDaysAgo(i),
}));

export const categories: Category[] = [
  { id: "cat1", name: "Fertilizers", slug: "fertilizers", productCount: 24 },
  { id: "cat2", name: "Pesticides", slug: "pesticides", productCount: 18 },
  { id: "cat3", name: "Seeds", slug: "seeds", productCount: 12 },
  { id: "cat4", name: "Tools & Equipment", slug: "tools", productCount: 9 },
  { id: "cat5", name: "Irrigation", slug: "irrigation", productCount: 6 },
];

export const crops: Crop[] = [
  { id: "cr1", name: "Wheat", season: "rabi", productCount: 22 },
  { id: "cr2", name: "Cotton", season: "kharif", productCount: 19 },
  { id: "cr3", name: "Rice", season: "kharif", productCount: 14 },
  { id: "cr4", name: "Sugarcane", season: "perennial", productCount: 11 },
  { id: "cr5", name: "Maize", season: "kharif", productCount: 8 },
];

export const adminReviews: Review[] = MOCK_PRODUCTS.slice(0, 6).map((p, i) => ({
  id: "rv_" + i,
  productId: p.id,
  user: ["Ali R.", "Hassan K.", "Fatima", "Ahmed", "Sajjad", "Bilal"][i],
  rating: 5 - (i % 2),
  text: ["Great product, worked well!", "Fast delivery, good packing", "Average quality", "Excellent value", "Recommended", "Will buy again"][i],
  createdAt: isoDaysAgo(i),
  verified: i % 2 === 0,
  status: (["pending", "approved", "approved", "pending", "approved", "hidden"] as const)[i],
}));
