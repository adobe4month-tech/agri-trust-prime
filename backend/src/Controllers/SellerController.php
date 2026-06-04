<?php
declare(strict_types=1);
namespace KissanCares\Controllers;

use KissanCares\Auth;
use KissanCares\Db;

class SellerController {
    private function sellerId(): string {
        $u = Auth::requireRole('seller', 'admin');
        return $u['id'];
    }

    public function kpis(): array {
        $id = $this->sellerId();
        $pdo = Db::pdo();
        $rev = (float)$pdo->query("SELECT COALESCE(SUM(total),0) FROM orders WHERE seller_id = " . $pdo->quote($id))->fetchColumn();
        $today = (int)$pdo->query("SELECT COUNT(*) FROM orders WHERE seller_id = " . $pdo->quote($id) . " AND DATE(created_at) = CURDATE()")->fetchColumn();
        $pending = (int)$pdo->query("SELECT COUNT(*) FROM orders WHERE seller_id = " . $pdo->quote($id) . " AND status IN ('confirmed','processing')")->fetchColumn();
        $low = (int)$pdo->query("SELECT COUNT(*) FROM products WHERE seller_id = " . $pdo->quote($id) . " AND stock_count < 10")->fetchColumn();
        return ['revenueRs' => $rev, 'ordersToday' => $today, 'pendingShipments' => $pending, 'lowStock' => $low, 'rating' => 4.7];
    }

    public function products(): array {
        $id = $this->sellerId();
        $stmt = Db::pdo()->prepare('SELECT *, stock_count AS sellerStock FROM products WHERE seller_id = ?');
        $stmt->execute([$id]);
        return $stmt->fetchAll();
    }

    public function setStock(array $p, array $q, array $b): array {
        $this->sellerId();
        Db::pdo()->prepare('UPDATE products SET stock_count = ? WHERE id = ?')->execute([(int)$b['stock'], (int)$p['id']]);
        return ['ok' => true];
    }

    public function orders(): array {
        $id = $this->sellerId();
        $stmt = Db::pdo()->prepare('SELECT id, created_at AS date, total AS amountRs, status FROM orders WHERE seller_id = ? ORDER BY created_at DESC');
        $stmt->execute([$id]);
        return $stmt->fetchAll();
    }

    public function setOrderStatus(array $p, array $q, array $b): array {
        $this->sellerId();
        Db::pdo()->prepare('UPDATE orders SET status = ? WHERE id = ?')->execute([(string)$b['status'], $p['id']]);
        return ['ok' => true];
    }

    public function payouts(): array {
        $id = $this->sellerId();
        $stmt = Db::pdo()->prepare('SELECT * FROM payouts WHERE seller_id = ? ORDER BY date DESC');
        $stmt->execute([$id]);
        return $stmt->fetchAll();
    }

    public function apply(array $p, array $q, array $b): array {
        $appId = 'APP-' . bin2hex(random_bytes(3));
        Db::pdo()->prepare('INSERT INTO seller_applications (id, brand, owner_name, phone, city, status, created_at) VALUES (?, ?, ?, ?, ?, "pending", NOW())')
            ->execute([$appId, $b['brand'] ?? '', $b['name'] ?? '', $b['phone'] ?? '', $b['city'] ?? '']);
        return ['applicationId' => $appId];
    }
}
