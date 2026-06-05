-- Seed data: demo accounts + a few products and settings.
-- Passwords below are bcrypt hashes:
--   user@test.com    / user123
--   seller@test.com  / seller123
--   admin@test.com   / admin123
-- If you change passwords, regenerate hashes with:
--   php -r "echo password_hash('newpassword', PASSWORD_BCRYPT) . PHP_EOL;"

-- Bcrypt hashes below are REAL (cost 10). PHP password_verify accepts $2b$ and $2y$.
INSERT INTO users (id, name, email, phone, password_hash, role) VALUES
 ('u_demo_user',   'Demo Buyer',  'user@test.com',   '03001112233', '$2b$10$y0olQKSCXxNPjKbFuPYt7Oy1hX9T6AXsAfPWvFrPsPAptPJVBd2rm', 'customer'),
 ('u_demo_seller', 'Demo Seller', 'seller@test.com', '03002223344', '$2b$10$L34RcIeSdxseF87esdVfFOgf1qXz9UloyLOipRSWvTbuNu5PkKlXu', 'seller'),
 ('u_demo_admin',  'Demo Admin',  'admin@test.com',  '03003334455', '$2b$10$u6yTW9ncp4/a.WqpXaRkbe3Vj.BXHwhzPVHygzN1wHTZUE69cH9RC', 'admin');

INSERT INTO categories (id, name, slug, product_count) VALUES
 ('cat1','Fertilizers','fertilizers',24),
 ('cat2','Pesticides','pesticides',18),
 ('cat3','Seeds','seeds',12),
 ('cat4','Tools & Equipment','tools',9),
 ('cat5','Irrigation','irrigation',6);

INSERT INTO crops (id, name, season, product_count) VALUES
 ('cr1','Wheat','rabi',22),
 ('cr2','Cotton','kharif',19),
 ('cr3','Rice','kharif',14),
 ('cr4','Sugarcane','perennial',11),
 ('cr5','Maize','kharif',8);

INSERT INTO products (name, slug, brand, category, image, price, mrp, stock_count, status, seller_id) VALUES
 ('DAP Fertilizer 50kg', 'dap-50kg', 'FFC', 'fertilizer', '/dap.jpg', 11500, 12500, 40, 'active', 'u_demo_seller'),
 ('Urea 50kg',           'urea-50kg', 'EFERT', 'fertilizer', '/urea.jpg', 4800, 5200, 80, 'active', 'u_demo_seller'),
 ('Cotton Pesticide 1L', 'cotton-pesticide-1l', 'Syngenta', 'pesticide', '/pest.jpg', 1850, 2100, 25, 'active', 'u_demo_seller');

INSERT INTO coupons (id, code, type, value, min_cart, usage_cap, used_count, valid_from, valid_to, active) VALUES
 ('c1', 'WAPSI5',  'percent', 5,  0,    1000, 412,  CURDATE() - INTERVAL 30 DAY, CURDATE() + INTERVAL 60 DAY, 1),
 ('c2', 'RABI100', 'flat',    100,2000, 500,  89,   CURDATE() - INTERVAL 15 DAY, CURDATE() + INTERVAL 30 DAY, 1),
 ('c3', 'FIRST10', 'percent', 10, 1000, 2000, 1180, CURDATE() - INTERVAL 60 DAY, CURDATE() + INTERVAL 90 DAY, 1);

INSERT INTO settings (id, data) VALUES
 ('main', JSON_OBJECT('siteName','KissanCares','whatsappNumber','923240287276','supportEmail','support@kissancares.com','codEnabled',true,'onlinePayEnabled',false,'freeShippingMin',2000,'taxPercent',0,'seoTitle','KissanCares — Pakistan agri marketplace','seoDescription','Quality fertilizers, seeds, pesticides delivered.')),
 ('loyalty', JSON_OBJECT('earnRate',1,'redeemRate',2,'minRedeem',100));
