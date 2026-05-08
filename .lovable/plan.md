# KissanCares v8 — Growth, Discovery, Operations & Customer Portal

Per project memory: frontend-only with mock data, premium light/green aesthetic, mobile-first, EN + Roman Urdu, WhatsApp checkout. No backend / no Lovable Cloud in this phase.

---

## Phase A — Conversion & Growth Optimization

**A1. Abandoned Cart WhatsApp Recovery**
`src/components/AbandonedCartNudge.tsx` — if cart has items and tab is idle 90s OR user returns after >1 hr (localStorage timestamp), show bottom-right card: "Aapka cart wait kar raha hai — 5% off code: WAPSI5" with "WhatsApp pe complete karein" button (prefilled message with cart contents).

**A2. Kissan Coins Loyalty Program**
- `src/contexts/LoyaltyContext.tsx` — points in localStorage. Earn 1 coin per Rs.100, 100 coins = Rs.50 off.
- `src/components/LoyaltyBadge.tsx` — header pill showing coin balance.
- `src/pages/Loyalty.tsx` — "Kissan Coins" page: balance, how-to-earn, redeem tiers, history.
- Hook into Cart/Checkout: show "Use 200 coins → Rs.100 off" toggle.

**A3. Referral Program**
`src/pages/Refer.tsx` — unique referral code (mock generated from localStorage user), share via WhatsApp/SMS, "You get Rs.200, friend gets Rs.200" copy bilingual, leaderboard of top referrers (mock).

**A4. Lead Capture Funnels**
- `src/components/ExitIntentModal.tsx` — desktop mouse-leave + mobile scroll-up-fast trigger; phone capture for "Free Crop Calendar PDF".
- `src/components/StickyWhatsAppCapture.tsx` — slim bar above BottomNav on category pages: "Get personalized crop advice on WhatsApp →".

**A5. Hero A/B Variants**
Update `HeroSection.tsx` to randomly pick 1 of 3 headline/CTA variants per session (logged to localStorage for "winner" demo). Variants stored in `src/data/heroVariants.ts`.

---

## Phase B — Advanced Merchandising & Discovery

**B1. Faceted Search with Autocomplete**
- Upgrade `Header.tsx` search: dropdown with live suggestions (products, categories, crops, brands) as user types — grouped sections, keyboard nav, recent searches.
- `src/components/SearchAutocomplete.tsx` reusable.

**B2. Smart Filter Sidebar**
Upgrade `Products.tsx` with rich facets: NPK ratio range slider, pack size multi-select, application type, crop stage, price slider, brand checklist, in-stock toggle, organic-only toggle. Active filter chips at top.

**B3. Frequently Bought Together (AI bundles)**
`src/components/FrequentlyBoughtTogether.tsx` on PDP — auto-suggest 2 complementary products based on category + targetCrops overlap. "Add all 3 to cart" with bundle discount preview.

**B4. Voice Search (Urdu/English)**
`src/components/VoiceSearchButton.tsx` — Web Speech API (lang=`ur-PK` toggleable to `en-US`), mic button in header, transcribed query → `/search`. Graceful fallback if unsupported.

**B5. Live Agronomist Chat (mock)**
`src/components/AgronomistChat.tsx` — floating chat widget (separate from WhatsApp FAB, on PDP/Education pages only). Mock auto-replies with typing indicator; "Connect to real agronomist on WhatsApp" CTA. Online/offline status badge.

---

## Phase C — Operations & Seller Tools

**C1. Seller Portal Dashboard**
`src/pages/seller/Dashboard.tsx` — protected by mock auth; shows KPIs (orders, revenue, top products), inventory table, recent orders, payouts ledger. Sub-routes:
- `src/pages/seller/Inventory.tsx` — product list, stock edit, low-stock alerts.
- `src/pages/seller/Orders.tsx` — order list with status filters.
- `src/pages/seller/Payouts.tsx` — payout history + next payout date.

Layout: `src/components/seller/SellerLayout.tsx` with sidebar nav.

**C2. B2B Bulk Quote Workflow**
Upgrade `GetQuote.tsx` into multi-step wizard: products + quantities → delivery location → company details → review → submit (WhatsApp + mock confirmation page `src/pages/QuoteSuccess.tsx` with quote ID).

**C3. Delivery Tracking with Map**
Upgrade `TrackOrder.tsx`: timeline (Confirmed → Packed → Dispatched → Out for Delivery → Delivered) with checkpoints, mock "current location" on a static map illustration (SVG of Pakistan with route line, no external maps API), ETA, courier name + WhatsApp.

**C4. Returns / RMA Workflow**
`src/pages/ReturnRequest.tsx` — pick order → pick items → reason (dropdown bilingual) → upload photo (mock) → submit → confirmation with RMA number. Linked from Account & OrderSuccess.

**C5. Invoice PDF Download**
`src/components/InvoiceButton.tsx` on OrderSuccess + Account orders — generates simple HTML invoice in new tab (window.print friendly), branded header, GST line, totals. Use react-to-print pattern with plain CSS.

---

## Phase D — Customer Portal

Expand current `Account.tsx` from single page into a real portal with sidebar.

**D1. Account Layout**
`src/components/account/AccountLayout.tsx` — left sidebar nav (mobile: top tabs), right content area. Mock-auth gated (redirect to AuthModal if no localStorage user).

**D2. Sub-pages**
- `src/pages/account/Profile.tsx` — name, phone, language pref, farm size, primary crops (chips).
- `src/pages/account/Orders.tsx` — order history with status, reorder button, view invoice, request return.
- `src/pages/account/Addresses.tsx` — saved delivery addresses CRUD (localStorage), set default.
- `src/pages/account/Wishlist.tsx` — replaces standalone, embedded in portal.
- `src/pages/account/Coins.tsx` — embedded loyalty view.
- `src/pages/account/CropProfile.tsx` — unique: select crops grown + acreage → personalized product feed + season alerts.
- `src/pages/account/Notifications.tsx` — preferences (WhatsApp/SMS/Email toggles per category) + notification inbox (mock).

**D3. Personalization Engine (frontend)**
`src/lib/personalization.ts` — based on CropProfile + purchase history (mock localStorage), expose `getRecommendedProducts()` used on Index "Just For You" + Account dashboard.

---

## Files Summary

| File | Action |
|---|---|
| `src/contexts/LoyaltyContext.tsx` | NEW |
| `src/components/AbandonedCartNudge.tsx` | NEW |
| `src/components/LoyaltyBadge.tsx` | NEW |
| `src/components/ExitIntentModal.tsx` | NEW |
| `src/components/StickyWhatsAppCapture.tsx` | NEW |
| `src/components/SearchAutocomplete.tsx` | NEW |
| `src/components/FrequentlyBoughtTogether.tsx` | NEW |
| `src/components/VoiceSearchButton.tsx` | NEW |
| `src/components/AgronomistChat.tsx` | NEW |
| `src/components/InvoiceButton.tsx` | NEW |
| `src/components/seller/SellerLayout.tsx` | NEW |
| `src/components/account/AccountLayout.tsx` | NEW |
| `src/pages/Loyalty.tsx` | NEW |
| `src/pages/Refer.tsx` | NEW |
| `src/pages/QuoteSuccess.tsx` | NEW |
| `src/pages/ReturnRequest.tsx` | NEW |
| `src/pages/seller/Dashboard.tsx` | NEW |
| `src/pages/seller/Inventory.tsx` | NEW |
| `src/pages/seller/Orders.tsx` | NEW |
| `src/pages/seller/Payouts.tsx` | NEW |
| `src/pages/account/Profile.tsx` | NEW |
| `src/pages/account/Orders.tsx` | NEW |
| `src/pages/account/Addresses.tsx` | NEW |
| `src/pages/account/Wishlist.tsx` | NEW |
| `src/pages/account/Coins.tsx` | NEW |
| `src/pages/account/CropProfile.tsx` | NEW |
| `src/pages/account/Notifications.tsx` | NEW |
| `src/data/heroVariants.ts` | NEW |
| `src/lib/personalization.ts` | NEW |
| `src/App.tsx` | UPDATE — register all new routes |
| `src/main.tsx` | UPDATE — wrap with LoyaltyProvider |
| `src/components/Header.tsx` | UPDATE — autocomplete + voice + coins badge |
| `src/components/home/HeroSection.tsx` | UPDATE — A/B variants |
| `src/pages/Products.tsx` | UPDATE — smart facets |
| `src/pages/ProductDetail.tsx` | UPDATE — FBT, agronomist chat |
| `src/pages/Index.tsx` | UPDATE — exit intent, personalized feed |
| `src/pages/GetQuote.tsx` | UPDATE — wizard |
| `src/pages/TrackOrder.tsx` | UPDATE — timeline + map |
| `src/pages/Account.tsx` | UPDATE — becomes portal shell with redirects |
| `src/pages/OrderSuccess.tsx` | UPDATE — invoice + return links |
| `src/contexts/CartContext.tsx` | UPDATE — abandon timestamp + coins redemption |
| `public/sitemap.xml` | UPDATE |

Approve to execute all four phases.
