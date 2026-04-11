

# KissanCares v4 — Revised Platform Expansion Plan

## Scope Clarification
- **No Lovable AI / Supabase** — pure frontend with mock data, structured for easy PHP backend integration
- **No product listing page** — existing category links will point to `kissancares.com` directly
- **Add Kissan Education / Blog page** — was missing from previous implementation
- **Add remaining pages**: Sell With Us, FAQ, Track Order, enhanced 404

---

## What Gets Built

### 1. Roman Urdu Language Toggle (Global)
- `src/contexts/LanguageContext.tsx` — React context with `en` / `ru` toggle, persisted in localStorage
- `src/data/translations.ts` — key-value map for all UI strings (nav, CTAs, section headings, trust bar)
- Toggle button in Header (simple "EN / اردو" switch)
- All existing components updated to use `useLanguage()` hook for labels
- Product data gets `nameUrdu`, `descriptionUrdu` fields in mockData

**Key translations**: Add to Cart → Cart Mein Daalein, Shop by Crop → Fasal Ke Mutabiq, Weekly Sale → Hafta War Sale, Ask Agronomist → Maahir Se Poochein, Cash on Delivery → Ghar Par Payment

### 2. Kissan Education / Blog Page
**Route**: `/education`
**File**: `src/pages/Education.tsx`

- Hero banner: "Kissan Education — Apni Fasal Ka Khayal Rakhein"
- Category tabs: All, Crop Guides, Pest & Disease, Seasonal Tips, Product Guides
- Blog card grid: thumbnail, title, category tag, date, read time, excerpt
- Mock blog data in `src/data/blogData.ts` (8-10 articles covering wheat care, rice pest control, cotton diseases, fertilizer guides — all bilingual)
- Individual blog post page at `/education/:slug` with rich content layout
- Sidebar: Popular articles, "Ask on WhatsApp" CTA, seasonal crop calendar widget
- Each article ends with: related products from our catalog + WhatsApp CTA

### 3. Sell With Us Page
**Route**: `/sell-with-us`
**File**: `src/pages/SellWithUs.tsx`

- Hero: "Apni Products Pakistan Bhar Mein Bechein"
- Benefits grid (4 cards): Nationwide reach, 12,500+ farmers, marketing support, easy onboarding
- How it works: 3-step visual process
- Mock brand partner testimonial
- CTA: WhatsApp inquiry button (links to wa.me)

### 4. FAQ Page
**Route**: `/faq`
**File**: `src/pages/FAQ.tsx`

- Accordion-style using existing shadcn Accordion component
- Categories: Ordering, Delivery, Returns, Products
- All answers in Roman Urdu + English
- Bottom CTA: "Still confused? WhatsApp par poochein"

### 5. Track Order Page
**Route**: `/track`
**File**: `src/pages/TrackOrder.tsx`

- Simple form: Order ID + Phone number
- Mock status stepper (Order Placed → Processing → Shipped → Delivered)
- WhatsApp CTA for live tracking assistance

### 6. Enhanced 404 Page
- Roman Urdu friendly message
- Search bar
- 4 popular products grid
- CTA buttons: Home & WhatsApp

### 7. Psychological Triggers & CTAs (Homepage + PDP)
- **Social proof ticker** (`src/components/SocialProofTicker.tsx`): "Muhammad Aslam from Multan ne abhi Spectar order kiya — 2 min pehle" — rotating mock notifications, bottom-left toast style
- **Urgency banner** (sticky top on homepage): "Aaj Ki Deal: Spectar 20EC — Sirf Rs.1,450! Code: KISSAN10"
- **Stock urgency on PDP**: "Sirf 12 Baqi Hain!" with low-stock warning color
- **Cross-sell on PDP**: "Is Ke Saath Yeh Bhi Lein" — related products section
- **Delivery estimate on PDP**: City dropdown → "Lahore: 2-3 Din Mein Delivery"
- **Share buttons on PDP**: WhatsApp share (primary), Copy link
- **Recently viewed** (localStorage): horizontal scroll section on homepage

### 8. SEO Infrastructure (Frontend Only)
- `src/components/SEOHead.tsx` using `react-helmet-async`
- Dynamic title + meta description per page
- JSON-LD structured data: Product schema on PDP, Organization on home, FAQ schema on FAQ page, Article schema on blog posts
- Open Graph + Twitter card meta tags
- Update `public/robots.txt` and create `public/sitemap.xml`
- Proper `<h1>` hierarchy and semantic HTML on all pages
- Breadcrumbs component with JSON-LD

### 9. Footer & Navigation Updates
- Footer: Add links to Education, FAQ, Sell With Us, Track Order
- Header nav: Add Education link (already exists), ensure all new routes in mobile menu
- All category links (Seeds, Pesticides, etc.) structured as `href` to kissancares.com PHP pages for easy backend linking
- Bottom nav: Add Education icon

---

## Files Summary

| File | Action |
|------|--------|
| `src/contexts/LanguageContext.tsx` | NEW — Language toggle context |
| `src/data/translations.ts` | NEW — EN + Roman Urdu strings |
| `src/data/blogData.ts` | NEW — Mock blog articles |
| `src/pages/Education.tsx` | NEW — Blog listing page |
| `src/pages/BlogPost.tsx` | NEW — Individual blog post |
| `src/pages/SellWithUs.tsx` | NEW — Seller partnership page |
| `src/pages/FAQ.tsx` | NEW — FAQ accordion page |
| `src/pages/TrackOrder.tsx` | NEW — Order tracking page |
| `src/components/SEOHead.tsx` | NEW — Dynamic meta/SEO |
| `src/components/Breadcrumbs.tsx` | NEW — Breadcrumb nav |
| `src/components/SocialProofTicker.tsx` | NEW — "X just bought Y" toasts |
| `src/components/ShareButtons.tsx` | NEW — WhatsApp/copy share |
| `src/components/DeliveryEstimate.tsx` | NEW — City-based estimate |
| `src/data/mockData.ts` | UPDATE — Add `nameUrdu`, `descriptionUrdu`, `stockCount` |
| `src/components/Header.tsx` | UPDATE — Language toggle, new nav links |
| `src/components/Footer.tsx` | UPDATE — New page links |
| `src/components/BottomNav.tsx` | UPDATE — Education link |
| `src/pages/ProductDetail.tsx` | UPDATE — Stock urgency, cross-sell, share, delivery estimate |
| `src/pages/Index.tsx` | UPDATE — Urgency banner, social proof ticker, recently viewed |
| `src/pages/NotFound.tsx` | UPDATE — Enhanced with search + products |
| `src/App.tsx` | UPDATE — New routes, LanguageProvider, HelmetProvider |
| `public/robots.txt` | UPDATE |
| `public/sitemap.xml` | NEW |

---

## CTA Strategy Per Page

| Page | Primary CTA | Secondary CTA |
|------|------------|---------------|
| Home | "Abhi Khareedein" on hero | WhatsApp FAB |
| PDP | "Cart Mein Daalein" + "WhatsApp Par Poochein" | Share + Cross-sell |
| Education | "Poora Parrhein" on cards | "Product Dekhein" in articles |
| Blog Post | Related products + "Abhi Khareedein" | WhatsApp CTA |
| Sell With Us | "WhatsApp Par Rabta Karein" | Phone call |
| FAQ | "WhatsApp Par Poochein" | Browse Products |
| Track Order | "Track Karein" | WhatsApp for help |
| 404 | "Home Jaayein" | "Products Dekhein" |

