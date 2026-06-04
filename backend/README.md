# KissanCares — PHP 8 + MySQL Backend

Drop-in PHP backend that matches the frontend's API contract.
The React app auto-switches from mock mode to this backend when
`VITE_API_BASE_URL` points to `https://your-api.example.com/api`.

## Stack
- PHP 8.1+
- MySQL / MariaDB
- PDO (no ORM)
- JWT via `firebase/php-jwt`
- Single front controller (`public/index.php`) with a tiny custom router

## Folder layout
```
backend/
  public/
    index.php       # front controller, all /api/* requests land here
    .htaccess       # URL rewrite + CORS
  src/
    Router.php
    Db.php          # PDO singleton (reads .env)
    Auth.php        # JWT issue + verify + bcrypt
    Middleware/
      AuthMiddleware.php
      RoleMiddleware.php
    Controllers/
      AuthController.php
      ProductController.php
      CartController.php
      OrderController.php
      SellerController.php
      AdminController.php
      LeadController.php
  sql/
    schema.sql      # all tables
    seed.sql        # demo accounts + sample data
  composer.json
  .env.example
```

## Quick deploy (cPanel / shared hosting)

1. Upload the `backend/` folder.
2. Point a subdomain (e.g. `api.kissancares.com`) at `backend/public/`.
3. In phpMyAdmin: create database `kissancares`, import `sql/schema.sql`, then `sql/seed.sql`.
4. Copy `.env.example` → `.env`, fill in DB credentials + `JWT_SECRET`.
5. `composer install` (or upload the `vendor/` folder produced locally).
6. In the React frontend: `.env` → `VITE_API_BASE_URL=https://api.kissancares.com/api`, rebuild.

## Quick deploy (XAMPP)
```
cp -r backend /Applications/XAMPP/htdocs/api
# then http://localhost/api/public/api/products
```

## Demo accounts seeded (`sql/seed.sql`)
| Role   | Email             | Password    |
|--------|-------------------|-------------|
| Buyer  | user@test.com     | user123     |
| Seller | seller@test.com   | seller123   |
| Admin  | admin@test.com    | admin123    |

## Endpoint contract
The complete endpoint list lives in `/API.md` at the project root.
Every endpoint already has a matching method in `src/lib/api/endpoints.ts`
on the frontend, so once you implement an endpoint here it goes live
without any UI change.

## Security notes
- Passwords hashed with `password_hash(..., PASSWORD_BCRYPT)`.
- JWT HS256, 7-day expiry; refresh by re-login (extend with refresh tokens if needed).
- All queries use prepared statements (PDO).
- Role checks in `RoleMiddleware`; never trust the client.
- CORS configured in `.htaccess` (edit allowed origin for prod).
- Rate-limit `POST /api/auth/*` via your web server / Cloudflare.
