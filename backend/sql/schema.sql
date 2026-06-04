-- KissanCares — MySQL schema
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(32) PRIMARY KEY,
  name          VARCHAR(120),
  email         VARCHAR(190) UNIQUE,
  phone         VARCHAR(20)  UNIQUE,
  password_hash VARCHAR(255) NOT NULL DEFAULT '',
  role          ENUM('customer','seller','admin') NOT NULL DEFAULT 'customer',
  status        ENUM('pending','approved','suspended') NOT NULL DEFAULT 'approved',
  coins         INT NOT NULL DEFAULT 0,
  blocked       TINYINT(1) NOT NULL DEFAULT 0,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS addresses (
  id          VARCHAR(32) PRIMARY KEY,
  user_id     VARCHAR(32) NOT NULL,
  label       VARCHAR(40),
  name        VARCHAR(120),
  phone       VARCHAR(20),
  line1       VARCHAR(255),
  city        VARCHAR(80),
  province    VARCHAR(80),
  postal_code VARCHAR(20),
  is_default  TINYINT(1) DEFAULT 0,
  INDEX (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories (
  id            VARCHAR(32) PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  slug          VARCHAR(120) UNIQUE,
  parent        VARCHAR(32),
  product_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS crops (
  id            VARCHAR(32) PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  season        ENUM('kharif','rabi','perennial') DEFAULT 'kharif',
  product_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  slug         VARCHAR(255) UNIQUE,
  brand        VARCHAR(120),
  category     VARCHAR(40),
  image        VARCHAR(500),
  price        DECIMAL(10,2) NOT NULL DEFAULT 0,
  mrp          DECIMAL(10,2) DEFAULT 0,
  stock_count  INT NOT NULL DEFAULT 0,
  stock_status VARCHAR(20) DEFAULT 'in-stock',
  status       ENUM('active','draft','archived') DEFAULT 'active',
  seller_id    VARCHAR(32),
  target_crops JSON,
  target_problems JSON,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (category), INDEX (brand), INDEX (seller_id)
);

CREATE TABLE IF NOT EXISTS cart (
  user_id    VARCHAR(32) NOT NULL,
  product_id INT NOT NULL,
  qty        INT NOT NULL,
  PRIMARY KEY (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS wishlist (
  user_id    VARCHAR(32) NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
  id             VARCHAR(20) PRIMARY KEY,
  user_id        VARCHAR(32) NOT NULL,
  seller_id      VARCHAR(32),
  address_id     VARCHAR(32),
  payment_method ENUM('cod','online') DEFAULT 'cod',
  status         VARCHAR(30) DEFAULT 'pending',
  total          DECIMAL(10,2) DEFAULT 0,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (user_id), INDEX (seller_id), INDEX (status), INDEX (created_at)
);

CREATE TABLE IF NOT EXISTS order_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  order_id    VARCHAR(20) NOT NULL,
  product_id  INT NOT NULL,
  qty         INT NOT NULL,
  unit_price  DECIMAL(10,2) NOT NULL,
  INDEX (order_id),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_events (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  order_id   VARCHAR(20) NOT NULL,
  status     VARCHAR(30),
  note       VARCHAR(255),
  city       VARCHAR(80),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (order_id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id         VARCHAR(32) PRIMARY KEY,
  product_id INT NOT NULL,
  user_id    VARCHAR(32),
  rating     TINYINT NOT NULL,
  text       TEXT,
  photos     JSON,
  verified   TINYINT(1) DEFAULT 0,
  status     ENUM('pending','approved','hidden') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (product_id), INDEX (status)
);

CREATE TABLE IF NOT EXISTS questions (
  id         VARCHAR(32) PRIMARY KEY,
  product_id INT NOT NULL,
  user_id    VARCHAR(32),
  question   TEXT,
  answer     TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (product_id)
);

CREATE TABLE IF NOT EXISTS coupons (
  id          VARCHAR(32) PRIMARY KEY,
  code        VARCHAR(40) UNIQUE NOT NULL,
  type        ENUM('percent','flat') NOT NULL,
  value       INT NOT NULL,
  min_cart    INT DEFAULT 0,
  usage_cap   INT DEFAULT 0,
  used_count  INT DEFAULT 0,
  valid_from  DATE,
  valid_to    DATE,
  active      TINYINT(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS coins_ledger (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    VARCHAR(32) NOT NULL,
  type       ENUM('earn','redeem','grant') NOT NULL,
  coins      INT NOT NULL,
  reason     VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (user_id)
);

CREATE TABLE IF NOT EXISTS seller_applications (
  id         VARCHAR(20) PRIMARY KEY,
  brand      VARCHAR(120),
  owner_name VARCHAR(120),
  phone      VARCHAR(20),
  city       VARCHAR(80),
  status     ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payouts (
  id         VARCHAR(20) PRIMARY KEY,
  seller_id  VARCHAR(32) NOT NULL,
  date       DATE NOT NULL,
  amount_rs  DECIMAL(10,2) NOT NULL,
  status     ENUM('pending','paid') DEFAULT 'pending',
  INDEX (seller_id)
);

CREATE TABLE IF NOT EXISTS leads (
  id         VARCHAR(32) PRIMARY KEY,
  source     VARCHAR(40),
  name       VARCHAR(120),
  phone      VARCHAR(20),
  email      VARCHAR(190),
  message    TEXT,
  handled    TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (source), INDEX (handled)
);

CREATE TABLE IF NOT EXISTS content_items (
  id         VARCHAR(32) PRIMARY KEY,
  kind       ENUM('blog','video','marketRate','heroBanner','abVariant'),
  title      VARCHAR(255),
  slug       VARCHAR(255),
  body       MEDIUMTEXT,
  media_url  VARCHAR(500),
  published  TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (kind)
);

CREATE TABLE IF NOT EXISTS broadcasts (
  id        VARCHAR(32) PRIMARY KEY,
  channel   ENUM('push','sms','whatsapp'),
  subject   VARCHAR(255),
  body      TEXT,
  audience  VARCHAR(40),
  sent_at   DATETIME,
  sent_by   VARCHAR(190)
);

CREATE TABLE IF NOT EXISTS settings (
  id   VARCHAR(40) PRIMARY KEY,
  data JSON
);

CREATE TABLE IF NOT EXISTS audit_log (
  id         VARCHAR(32) PRIMARY KEY,
  actor      VARCHAR(190),
  role       VARCHAR(20),
  action     VARCHAR(60),
  target     VARCHAR(120),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (created_at)
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(80),
  props      JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX (name), INDEX (created_at)
);

SET FOREIGN_KEY_CHECKS = 1;
