# KissanCares — Backend API Contract

The frontend is fully wired through `src/lib/api/*` and `src/hooks/api.ts`.
To go live: implement the endpoints below and set `VITE_API_BASE_URL` in `.env`.

- **Auth header:** `Authorization: Bearer <token>` (token stored in `localStorage["kc-auth-token"]`)
- **Content-Type:** `application/json` (uploads use multipart / signed URL)
- **CORS:** allow your frontend origin; `credentials: include` is set
- All amounts in PKR (integer rupees). Dates ISO-8601.

## Auth
| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/auth/send-otp` | `{ phone }` | `{ ok: true }` |
| POST | `/auth/verify-otp` | `{ phone, otp }` | `{ token, user }` |
| GET  | `/auth/me` | — | `SessionUser` |
| POST | `/auth/logout` | — | `{ ok: true }` |

`SessionUser = { id, phone, name?, role: "customer"|"seller"|"admin" }`

## Profile / Addresses / Crop Profile
- `GET/PUT /me/profile`
- `GET/POST /me/addresses`, `PUT/DELETE /me/addresses/:id`
- `GET/PUT /me/crop-profile` → `{ crops: string[], acreage: number, province? }`

## Cart & Orders
- `GET/PUT /cart` → `{ lines: [{ productId, qty }] }`
- `POST /cart/quote` → `{ subtotal, discount, shipping, tax, total, appliedCoupon? }`
- `POST /orders` body `{ lines, addressId, paymentMethod, coupon?, coinsRedeem? }` → `Order`
- `GET /me/orders`, `GET /orders/:id`
- `POST /orders/:id/reorder`
- `GET /orders/:id/tracking` → `{ orderId, current, etaDays?, events[] }`
- `GET /orders/:id/invoice.pdf` (binary)

## Wishlist
- `GET /me/wishlist` → `number[]`
- `POST /me/wishlist` `{ productId }` · `DELETE /me/wishlist/:productId`

## Loyalty / Referral
- `GET /me/coins` → `{ coins, rate, redeemableRs }`
- `GET /me/coins/history`
- `POST /coins/redeem` `{ coins }`
- `GET /me/referral` → `{ code, invited, converted, coinsEarned, leaderboard[] }`

## Products / Search
- `GET /products?q=&category=&brand=&crop=&problem=&minPrice=&maxPrice=&sort=&page=&pageSize=` → `{ products, total, facets }`
- `GET /products/:slug`
- `GET /products/:id/fbt` → frequently-bought-together
- `GET /products/:id/stock` → `{ stockCount, status }`
- `GET /me/recommendations?limit=`
- `GET /search/suggest?q=` → `{ products[], queries[] }`

## Reviews / Q&A
- `GET/POST /products/:id/reviews`
- `GET/POST /products/:id/questions`

## Notifications
- `GET/PUT /me/notification-prefs`
- `GET /me/notifications`
- `POST /me/notifications/:id/read`

## Seller Portal
- `GET /seller/kpis`
- `GET /seller/products` · `PATCH /seller/products/:id/stock`
- `GET /seller/orders` · `PATCH /seller/orders/:id/status`
- `GET /seller/payouts`
- `POST /seller/applications`

## B2B / Returns / Leads / Events
- `POST /quotes` → `{ quoteId, etaHours, whatsappLink }`
- `POST /returns` → `{ rmaId, etaDays }`
- `POST /leads` `{ phone?, email?, source, meta? }`
- `POST /events` `{ name, props?, ts }` (analytics)

## Uploads
- `POST /uploads/sign` `{ filename, contentType }` → `{ uploadUrl, publicUrl }`
- Client `PUT`s the file directly to `uploadUrl`, then sends `publicUrl` in subsequent payloads.

## Switching from mock to real
1. Set `VITE_API_BASE_URL=https://api.kissancares.com` in `.env`
2. Implement endpoints above with matching shapes.
3. No frontend changes needed — every hook in `src/hooks/api.ts` already calls the right endpoint.

Mock fallback lives in `src/lib/api/endpoints.ts` (each function uses `withMock(real, mock)`), so the UI keeps working in environments without a backend.
