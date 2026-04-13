

# KissanCares v5 — Refined Expansion Plan

## Removed (per your request)
- ~~Kissan News page~~ (item 2)
- ~~Free Delivery Progress Bar in cart~~ (item 4)

## What Gets Built

### Phase 1: New Pages (2 pages)

**Get Quote** (`/get-quote`) — Bulk/dealer inquiry form with Name, Phone, Type (Kissan/Dealer), Province, City, product description. WhatsApp fallback CTA. Bilingual. Mock submit with toast.

**Privacy & Terms** (`/privacy`) — Return policy, shipping policy, terms of use. Anchor-linked sections. Bilingual.

### Phase 2: Psychology Trigger Components (5 items)

**Guarantee Badge** — `src/components/GuaranteeBadge.tsx` — "100% Asli Ya Paisa Wapas" shield icon. Added to ProductCard and ProductDetail page.

**Bulk Discount Indicator** — Tiered pricing table on PDP: 1 unit = full price, 3+ = 10% off, 5+ = 15% off. Visual badge.

**Seasonal Crop Calendar** — `src/components/home/SeasonalCalendar.tsx` — Detects current month, shows Kharif/Rabi season with recommended products. Added to homepage.

**Reorder Section** — Enhance recently viewed on homepage with "Dobara Order Karein" quick add-to-cart button.

**WhatsApp Order Preview** — Show formatted message preview in CartDrawer before redirecting to WhatsApp. Reduces ordering anxiety.

### Phase 3: New Features (2 features)

**Wishlist System** — `src/contexts/WishlistContext.tsx` with localStorage. Heart toggle on ProductCard and PDP. Wishlist count in Header. "Aapki Pasand" section on homepage.

**Product Comparison** — `src/components/ProductCompare.tsx` — "Compare" checkbox on ProductCard (max 3). Floating comparison bar. Side-by-side table: Name, Price, Active Ingredient, Brand, Rating, Target Crop.

### Phase 4: Navigation & Integration

- Add Get Quote link to Header nav, Footer, mobile menu
- Add Wishlist heart icon to Header (beside cart)
- Add Privacy/Terms link to Footer
- Update `sitemap.xml` with new routes
- Wire WishlistProvider in App.tsx

## Files Summary

| File | Action |
|------|--------|
| `src/pages/GetQuote.tsx` | NEW |
| `src/pages/Privacy.tsx` | NEW |
| `src/components/GuaranteeBadge.tsx` | NEW |
| `src/components/home/SeasonalCalendar.tsx` | NEW |
| `src/components/ProductCompare.tsx` | NEW |
| `src/contexts/WishlistContext.tsx` | NEW |
| `src/App.tsx` | UPDATE — 2 new routes, WishlistProvider |
| `src/components/CartDrawer.tsx` | UPDATE — WhatsApp message preview |
| `src/components/ProductCard.tsx` | UPDATE — Wishlist heart, compare checkbox, guarantee badge |
| `src/pages/ProductDetail.tsx` | UPDATE — Guarantee badge, bulk discount table |
| `src/pages/Index.tsx` | UPDATE — Seasonal calendar, reorder buttons on recently viewed |
| `src/components/Header.tsx` | UPDATE — Wishlist icon, Get Quote link |
| `src/components/Footer.tsx` | UPDATE — Privacy, Get Quote links |
| `src/components/BottomNav.tsx` | UPDATE — Wishlist icon |
| `public/sitemap.xml` | UPDATE |

