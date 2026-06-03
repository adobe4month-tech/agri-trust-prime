# Full Plan — Demo Accounts + Buyer/Seller/Admin Portals + PHP Backend Scaffold

## Can I build the PHP backend?

**Short answer:** I can write the full PHP backend **as code** (controllers, routes, models, SQL schema, `.htaccess`, composer setup) inside a `/backend` folder in this repo, and I can match it **1:1** to the API contract the frontend already expects. What this Lovable sandbox **cannot** do is *run* PHP — it only serves the React/Vite app. So you'd take the `/backend` folder, drop it on your PHP host (cPanel / VPS / Laravel Forge / XAMPP), point `VITE_API_BASE_URL` at it, and you're live.

Two flavors I can scaffold — pick one in the questions after this plan:
- **Vanilla PHP 8 + PDO** (single-folder, no framework, easiest to deploy on shared hosting)
- **Laravel 11** (proper migrations, Eloquent, Sanctum auth, queues — better long-term)

Everything below is the same regardless of choice.

---

## Part 1 — Demo accounts (so you can preview both portals NOW)

Demo credentials seeded into a frontend mock-auth layer (works without backend, auto-disables when `VITE_API_BASE_URL` is set):

| Role   | Email             | Password    | Lands on   |
|--------|-------------------|-------------|------------|
| Buyer  | `user@test.com`   | `user123`   | `/account` |
| Seller | `seller@test.com` | `seller123` | `/seller`  |
| Admin  | `admin@test.com`  | `admin123`  | `/admin`   |

Login screens show a hint box with these credentials.

### Frontend changes
- `src/lib/api/mockAuth.ts` (new) — three seeded accounts, `login/logout/getSession`, stores `kc-auth-token` + `kc-auth-user`.
- `AuthApi.login/logout/me` in `endpoints.ts` switched to `withMock(realPhpCall, mockCall)`.
- `AuthModal.tsx` → replace broken OTP with email + password, demo-hint box, redirect by role.
- `SellerLogin.tsx` → add password field, wire to `AuthApi.login`, redirect by role.
- New `/login` and `/admin-login` routes (reuse modal component as full pages).
- `AccountLayout`, `SellerLayout`, new `AdminLayout` → use `useSession()` instead of localStorage flags; logout buttons call `AuthApi.logout`.
- `App.tsx` → wrap `/account/*` in `<ProtectedRoute role="customer">`, `/seller/*` in `role="seller"`, `/admin/*` in `role="admin"`.
- Fix `LoyaltyProvider` placement (move inside `QueryClientProvider` in `main.tsx`).

---

## Part 2 — Admin Panel (new, frontend-only, backend-ready)

Layout: left sidebar + topbar, same premium light/green tokens as the rest of the site.

### Pages under `/admin`
1. **Dashboard** (`/admin`) — KPIs: revenue today/7d/30d, orders, new users, top SKUs, low-stock alerts, pending seller applications. Uses `useAdminKpis()` hook.
2. **Orders** (`/admin/orders`) — table with filter by status/date/seller, drawer for order detail, status override, refund trigger.
3. **Products** (`/admin/products`) — list, search, create/edit form (name, slug, price, MRP, stock, category, crop, images, variants), bulk import CSV stub.
4. **Categories & Crops** (`/admin/taxonomy`) — CRUD for categories, crops, problem-tags.
5. **Sellers** (`/admin/sellers`) — list, approve/reject applications, view payouts, suspend.
6. **Customers** (`/admin/customers`) — list, search by phone/email, view orders, adjust coins, block user.
7. **Coupons** (`/admin/coupons`) — CRUD: code, type (%/flat), min cart, usage cap, valid window.
8. **Loyalty / Coins** (`/admin/loyalty`) — earn rate, redemption rules, manual coin grants.
9. **Content** (`/admin/content`) — blog posts, education videos, market rates, hero banners, A/B variants.
10. **Reviews & Q&A** (`/admin/reviews`) — moderate, approve, hide, reply.
11. **Leads** (`/admin/leads`) — Get-Quote, Contact, exit-intent captures, agronomist chat threads.
12. **Notifications** (`/admin/notifications`) — broadcast push/SMS/WhatsApp blast composer.
13. **Settings** (`/admin/settings`) — site info, payment toggles, shipping rules, tax, WhatsApp number, SEO defaults.
14. **Audit log** (`/admin/audit`) — who did what when.

### Frontend deliverables
- `src/components/admin/AdminLayout.tsx` (sidebar + topbar + role guard).
- `src/pages/admin/*` — one file per page above, fully built with shadcn `Table`, `Dialog`, `Form`, skeletons, empty states, error states.
- `src/hooks/api.ts` — add `useAdminKpis`, `useAdminOrders`, `useAdminProducts`, `useAdminSellers`, `useAdminCustomers`, `useCoupons`, `useContentItems`, `useLeads`, etc.
- `src/lib/api/endpoints.ts` — add `AdminApi.*` block, all wired through `withMock(...)` so the panel is fully clickable with seed data today and live tomorrow.
- Mock seed data in `src/lib/api/mockAdminData.ts`.

---

## Part 3 — PHP Backend Scaffold (in `/backend` folder of this repo)

> Generated as static files. Does not run inside Lovable. You deploy it to your PHP host.

### Vanilla PHP 8 + PDO option (default unless you pick Laravel)
```text
backend/
├── public/
│   ├── index.php           # front controller, routes API requests
│   └── .htaccess           # rewrite all /api/* → index.php, CORS
├── src/
│   ├── Router.php
│   ├── Db.php              # PDO singleton, reads .env
│   ├── Auth.php            # JWT issue/verify (firebase/php-jwt)
│   ├── Middleware/
│   │   ├── AuthMiddleware.php
│   │   └── RoleMiddleware.php
│   └── Controllers/
│       ├── AuthController.php
│       ├── ProductController.php
│       ├── CartController.php
│       ├── OrderController.php
│       ├── SellerController.php
│       ├── AdminController.php
│       ├── ReviewController.php
│       ├── CouponController.php
│       └── ... (one per AdminApi/SellerApi/etc.)
├── sql/
│   ├── schema.sql          # users, roles, products, categories, crops,
│   │                       # orders, order_items, addresses, cart,
│   │                       # wishlist, reviews, qa, coupons, coins,
│   │                       # loyalty_ledger, referrals, sellers,
│   │                       # seller_payouts, leads, content_*, audit_log
│   └── seed.sql            # demo user/seller/admin + sample products
├── composer.json           # firebase/php-jwt, vlucas/phpdotenv
├── .env.example            # DB_HOST, DB_NAME, JWT_SECRET, WHATSAPP_NUMBER
└── README.md               # deployment steps for cPanel + VPS + XAMPP
```

### Laravel 11 option (if picked)
- `php artisan`-ready project under `/backend`, with migrations for every table, Sanctum personal-access-token auth, policies for role checks, resource controllers, OpenAPI doc, queue stubs for SMS/WhatsApp.

### Endpoint coverage (matches `API.md` you already have, **plus** admin)
- `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`, `POST /auth/send-otp`, `POST /auth/verify-otp`
- Buyer: `/me/profile`, `/me/addresses`, `/me/orders`, `/me/wishlist`, `/me/coins`, `/me/notifications`, `/cart`, `/cart/quote`, `/orders`, `/orders/:id`, `/orders/:id/tracking`, `/orders/:id/invoice.pdf`, `/returns`
- Catalog: `/products`, `/products/:id`, `/products/:id/fbt`, `/products/:id/reviews`, `/products/:id/questions`, `/search`, `/search/suggest`, `/categories`, `/crops`
- Loyalty/growth: `/coins/redeem`, `/referrals/leaderboard`, `/coupons/validate`
- Seller: `/seller/kpis`, `/seller/products`, `/seller/products/:id/stock`, `/seller/orders`, `/seller/orders/:id/status`, `/seller/payouts`, `/seller/applications`, `/seller/settings`
- Admin: `/admin/kpis`, `/admin/orders`, `/admin/products`, `/admin/categories`, `/admin/sellers`, `/admin/customers`, `/admin/coupons`, `/admin/loyalty/rules`, `/admin/content/*`, `/admin/reviews`, `/admin/leads`, `/admin/notifications/broadcast`, `/admin/settings`, `/admin/audit`
- Uploads: `POST /uploads/signed-url` + direct multipart fallback
- Events: `POST /events` (A/B, hero variant, abandoned-cart triggers)

### Security
- Bcrypt passwords, JWT (HS256) with 7-day refresh, role middleware (`customer|seller|admin`), CSRF disabled for token API, rate-limit on `/auth/*`, prepared statements everywhere, request validation per endpoint.

### Deployment notes (in `backend/README.md`)
- cPanel: upload `backend/`, point subdomain `api.yourdomain.com` to `backend/public`, import `sql/schema.sql` + `sql/seed.sql`, copy `.env.example` → `.env`, set `VITE_API_BASE_URL=https://api.yourdomain.com/api` in the frontend, rebuild.
- VPS (Nginx + PHP-FPM): sample server block included.
- Local (XAMPP): one-paragraph guide.

---

## Build order (so each step is visibly usable)
1. Mock auth + demo accounts + protected routes → you can log in as all three roles immediately.
2. Admin layout + Dashboard + Products + Orders pages (most-used screens first).
3. Remaining admin pages (taxonomy, sellers, customers, coupons, loyalty, content, reviews, leads, notifications, settings, audit).
4. PHP backend scaffold under `/backend` (schema + auth + buyer endpoints + seller + admin in that order).
5. `backend/README.md` deployment guide + final `API.md` sync.

---

## Questions before I start (will ask after this plan)
1. **PHP flavor:** Vanilla PHP 8 + PDO, or Laravel 11?
2. **Database:** MySQL/MariaDB (default for shared hosting) or PostgreSQL?
3. **Admin scope today:** build *all 14* admin pages, or just the top 6 (Dashboard, Orders, Products, Sellers, Customers, Coupons) and stub the rest?

Approve to switch to build mode; I'll ask the three questions and then execute end-to-end.
