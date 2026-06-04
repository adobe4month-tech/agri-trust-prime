<?php
declare(strict_types=1);
namespace KissanCares\Controllers;

use KissanCares\Auth;
use KissanCares\Db;

/**
 * AdminController — all methods require role "admin".
 * Each method is intentionally short and uses PDO directly so you can
 * easily extend or swap in business logic. Validation is minimal —
 * harden before production.
 */
class AdminController {
    private function admin(): array { return Auth::requireRole('admin'); }
    private function audit(string $action, string $target): void {
        $u = Auth::currentUser();
        Db::pdo()->prepare('INSERT INTO audit_log (id, actor, role, action, target, created_at) VALUES (?, ?, ?, ?, ?, NOW())')
            ->execute([bin2hex(random_bytes(6)), $u['email'] ?? $u['id'], $u['role'], $action, $target]);
    }

    public function kpis(): array {
        $this->admin();
        $pdo = Db::pdo();
        return [
            'revenueToday' => (float)$pdo->query('SELECT COALESCE(SUM(total),0) FROM orders WHERE DATE(created_at) = CURDATE()')->fetchColumn(),
            'revenue7d'    => (float)$pdo->query('SELECT COALESCE(SUM(total),0) FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)')->fetchColumn(),
            'revenue30d'   => (float)$pdo->query('SELECT COALESCE(SUM(total),0) FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)')->fetchColumn(),
            'ordersToday'  => (int)$pdo->query('SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURDATE()')->fetchColumn(),
            'ordersPending'=> (int)$pdo->query("SELECT COUNT(*) FROM orders WHERE status IN ('pending','confirmed','processing')")->fetchColumn(),
            'newUsers7d'   => (int)$pdo->query("SELECT COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)")->fetchColumn(),
            'activeSellers'=> (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role = 'seller'")->fetchColumn(),
            'lowStock'     => (int)$pdo->query('SELECT COUNT(*) FROM products WHERE stock_count < 10')->fetchColumn(),
            'pendingSellerApplications' => (int)$pdo->query("SELECT COUNT(*) FROM seller_applications WHERE status = 'pending'")->fetchColumn(),
            'topSkus'      => $pdo->query("SELECT p.id AS productId, p.name, SUM(oi.qty) AS unitsSold, SUM(oi.qty * oi.unit_price) AS revenue FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY p.id ORDER BY unitsSold DESC LIMIT 5")->fetchAll(),
        ];
    }

    // --- Orders ---
    public function orders(array $p, array $q): array {
        $this->admin();
        $sql = 'SELECT o.*, u.name AS buyer, u.phone FROM orders o LEFT JOIN users u ON u.id = o.user_id WHERE 1=1';
        $args = [];
        if (!empty($q['status'])) { $sql .= ' AND o.status = ?'; $args[] = $q['status']; }
        if (!empty($q['q']))      { $sql .= ' AND (o.id LIKE ? OR u.name LIKE ? OR u.phone LIKE ?)'; $args[] = "%{$q['q']}%"; $args[] = "%{$q['q']}%"; $args[] = "%{$q['q']}%"; }
        $sql .= ' ORDER BY o.created_at DESC LIMIT 200';
        $st = Db::pdo()->prepare($sql); $st->execute($args);
        return $st->fetchAll();
    }
    public function setOrderStatus(array $p, array $q, array $b): array {
        $this->admin();
        Db::pdo()->prepare('UPDATE orders SET status = ? WHERE id = ?')->execute([(string)$b['status'], $p['id']]);
        $this->audit('admin_order_status', 'order#' . $p['id']);
        return ['ok' => true];
    }
    public function refundOrder(array $p): array {
        $this->admin();
        Db::pdo()->prepare('UPDATE orders SET status = "returned" WHERE id = ?')->execute([$p['id']]);
        $this->audit('admin_refund', 'order#' . $p['id']);
        return ['ok' => true];
    }

    // --- Products ---
    public function products(array $p, array $q): array {
        $this->admin();
        $sql = 'SELECT * FROM products WHERE 1=1';
        $args = [];
        if (!empty($q['q']))      { $sql .= ' AND (name LIKE ? OR brand LIKE ?)'; $args[] = "%{$q['q']}%"; $args[] = "%{$q['q']}%"; }
        if (!empty($q['status'])) { $sql .= ' AND status = ?'; $args[] = $q['status']; }
        $sql .= ' ORDER BY id DESC LIMIT 500';
        $st = Db::pdo()->prepare($sql); $st->execute($args);
        return $st->fetchAll();
    }
    public function saveProduct(array $p, array $q, array $b): array {
        $this->admin();
        $pdo = Db::pdo();
        if (!empty($b['id'])) {
            $pdo->prepare('UPDATE products SET name=?, slug=?, brand=?, category=?, image=?, price=?, mrp=?, stock_count=?, status=? WHERE id=?')
                ->execute([$b['name'] ?? '', $b['slug'] ?? '', $b['brand'] ?? '', $b['category'] ?? '', $b['image'] ?? '', (float)($b['price'] ?? 0), (float)($b['mrp'] ?? 0), (int)($b['stockCount'] ?? 0), $b['status'] ?? 'active', (int)$b['id']]);
        } else {
            $pdo->prepare('INSERT INTO products (name, slug, brand, category, image, price, mrp, stock_count, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
                ->execute([$b['name'] ?? '', $b['slug'] ?? '', $b['brand'] ?? '', $b['category'] ?? '', $b['image'] ?? '', (float)($b['price'] ?? 0), (float)($b['mrp'] ?? 0), (int)($b['stockCount'] ?? 0), $b['status'] ?? 'active']);
            $b['id'] = (int)$pdo->lastInsertId();
        }
        $this->audit('save_product', 'product#' . $b['id']);
        return $b;
    }
    public function deleteProduct(array $p): array {
        $this->admin();
        Db::pdo()->prepare('DELETE FROM products WHERE id = ?')->execute([(int)$p['id']]);
        $this->audit('delete_product', 'product#' . $p['id']);
        return ['ok' => true];
    }

    // --- Sellers ---
    public function sellers(array $p, array $q): array {
        $this->admin();
        $sql = 'SELECT * FROM users WHERE role = "seller"';
        $args = [];
        if (!empty($q['status'])) { $sql .= ' AND status = ?'; $args[] = $q['status']; }
        $st = Db::pdo()->prepare($sql); $st->execute($args);
        return $st->fetchAll();
    }
    public function setSellerStatus(array $p, array $q, array $b): array {
        $this->admin();
        Db::pdo()->prepare('UPDATE users SET status = ? WHERE id = ? AND role = "seller"')->execute([(string)$b['status'], $p['id']]);
        $this->audit('set_seller_status', 'seller#' . $p['id']);
        return ['ok' => true];
    }

    // --- Customers ---
    public function customers(array $p, array $q): array {
        $this->admin();
        $sql = 'SELECT id, name, email, phone, coins, blocked, created_at FROM users WHERE role = "customer"';
        $args = [];
        if (!empty($q['q'])) { $sql .= ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)'; $args[] = "%{$q['q']}%"; $args[] = "%{$q['q']}%"; $args[] = "%{$q['q']}%"; }
        $st = Db::pdo()->prepare($sql); $st->execute($args);
        return $st->fetchAll();
    }
    public function adjustCoins(array $p, array $q, array $b): array {
        $this->admin();
        Db::pdo()->prepare('UPDATE users SET coins = coins + ? WHERE id = ?')->execute([(int)$b['delta'], $p['id']]);
        $this->audit('adjust_coins', 'user#' . $p['id']);
        return ['ok' => true];
    }
    public function toggleBlock(array $p): array {
        $this->admin();
        Db::pdo()->prepare('UPDATE users SET blocked = NOT blocked WHERE id = ?')->execute([$p['id']]);
        $this->audit('toggle_block', 'user#' . $p['id']);
        return ['ok' => true];
    }

    // --- Coupons / categories / crops / content (CRUD pattern) ---
    private function crudList(string $table): array { $this->admin(); return Db::pdo()->query("SELECT * FROM $table")->fetchAll(); }
    public function coupons(): array        { return $this->crudList('coupons'); }
    public function categories(): array     { return $this->crudList('categories'); }
    public function crops(): array          { return $this->crudList('crops'); }
    public function content(array $p, array $q): array {
        $this->admin();
        $sql = 'SELECT * FROM content_items WHERE 1=1'; $args = [];
        if (!empty($q['kind'])) { $sql .= ' AND kind = ?'; $args[] = $q['kind']; }
        $st = Db::pdo()->prepare($sql); $st->execute($args); return $st->fetchAll();
    }
    public function saveCoupon(array $p, array $q, array $b): array  { $this->admin(); return $b; /* TODO insert/update */ }
    public function deleteCoupon(array $p): array                    { $this->admin(); Db::pdo()->prepare('DELETE FROM coupons WHERE id = ?')->execute([$p['id']]); return ['ok' => true]; }
    public function saveCategory(array $p, array $q, array $b): array{ $this->admin(); return $b; }
    public function deleteCategory(array $p): array                  { $this->admin(); Db::pdo()->prepare('DELETE FROM categories WHERE id = ?')->execute([$p['id']]); return ['ok' => true]; }
    public function saveCrop(array $p, array $q, array $b): array    { $this->admin(); return $b; }
    public function deleteCrop(array $p): array                      { $this->admin(); Db::pdo()->prepare('DELETE FROM crops WHERE id = ?')->execute([$p['id']]); return ['ok' => true]; }
    public function saveContent(array $p, array $q, array $b): array { $this->admin(); return $b; }
    public function deleteContent(array $p): array                   { $this->admin(); Db::pdo()->prepare('DELETE FROM content_items WHERE id = ?')->execute([$p['id']]); return ['ok' => true]; }

    // --- Reviews ---
    public function reviews(array $p, array $q): array {
        $this->admin();
        $sql = 'SELECT * FROM reviews WHERE 1=1'; $args = [];
        if (!empty($q['status'])) { $sql .= ' AND status = ?'; $args[] = $q['status']; }
        $st = Db::pdo()->prepare($sql); $st->execute($args); return $st->fetchAll();
    }
    public function setReviewStatus(array $p, array $q, array $b): array {
        $this->admin();
        Db::pdo()->prepare('UPDATE reviews SET status = ? WHERE id = ?')->execute([(string)$b['status'], $p['id']]);
        return ['ok' => true];
    }

    // --- Leads ---
    public function leads(): array { $this->admin(); return Db::pdo()->query('SELECT * FROM leads ORDER BY created_at DESC')->fetchAll(); }
    public function markLeadHandled(array $p): array {
        $this->admin();
        Db::pdo()->prepare('UPDATE leads SET handled = 1 WHERE id = ?')->execute([$p['id']]);
        return ['ok' => true];
    }

    // --- Broadcasts ---
    public function broadcasts(): array { $this->admin(); return Db::pdo()->query('SELECT * FROM broadcasts ORDER BY sent_at DESC')->fetchAll(); }
    public function sendBroadcast(array $p, array $q, array $b): array {
        $u = $this->admin();
        $id = bin2hex(random_bytes(6));
        Db::pdo()->prepare('INSERT INTO broadcasts (id, channel, subject, body, audience, sent_at, sent_by) VALUES (?, ?, ?, ?, ?, NOW(), ?)')
            ->execute([$id, $b['channel'], $b['subject'] ?? null, $b['body'], $b['audience'], $u['email']]);
        // TODO: dispatch through SMS / WhatsApp / push gateway.
        return ['id' => $id] + $b + ['sentAt' => date('c'), 'sentBy' => $u['email']];
    }

    // --- Settings ---
    public function settings(): array {
        $this->admin();
        return Db::pdo()->query("SELECT data FROM settings WHERE id = 'main'")->fetch()
            ? json_decode(Db::pdo()->query("SELECT data FROM settings WHERE id = 'main'")->fetchColumn(), true)
            : [];
    }
    public function saveSettings(array $p, array $q, array $b): array {
        $this->admin();
        $json = json_encode($b);
        Db::pdo()->prepare("INSERT INTO settings (id, data) VALUES ('main', ?) ON DUPLICATE KEY UPDATE data = VALUES(data)")->execute([$json]);
        $this->audit('save_settings', 'settings');
        return $b;
    }

    // --- Loyalty rules ---
    public function loyaltyRules(): array {
        $this->admin();
        $row = Db::pdo()->query("SELECT data FROM settings WHERE id = 'loyalty'")->fetchColumn();
        return $row ? json_decode($row, true) : ['earnRate' => 1, 'redeemRate' => 2, 'minRedeem' => 100];
    }
    public function saveLoyaltyRules(array $p, array $q, array $b): array {
        $this->admin();
        Db::pdo()->prepare("INSERT INTO settings (id, data) VALUES ('loyalty', ?) ON DUPLICATE KEY UPDATE data = VALUES(data)")->execute([json_encode($b)]);
        return ['ok' => true];
    }

    // --- Audit log ---
    public function audit(): array { Auth::requireRole('admin'); return Db::pdo()->query('SELECT * FROM audit_log ORDER BY created_at DESC LIMIT 500')->fetchAll(); }
}
