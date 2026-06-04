<?php
declare(strict_types=1);
namespace KissanCares\Controllers;

use KissanCares\Auth;
use KissanCares\Db;

class OrderController {
    public function create(array $p, array $q, array $b): array {
        $user = Auth::requireUser();
        $pdo = Db::pdo();
        $orderId = 'KC-' . random_int(10000, 99999);
        $lines = $b['lines'] ?? [];
        $total = 0;

        $pdo->beginTransaction();
        $pdo->prepare('INSERT INTO orders (id, user_id, address_id, payment_method, status, total, created_at) VALUES (?, ?, ?, ?, "confirmed", 0, NOW())')
            ->execute([$orderId, $user['id'], (string)($b['addressId'] ?? ''), (string)($b['paymentMethod'] ?? 'cod')]);

        $ins = $pdo->prepare('INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES (?, ?, ?, ?)');
        foreach ($lines as $l) {
            $stmt = $pdo->prepare('SELECT price FROM products WHERE id = ?');
            $stmt->execute([(int)$l['productId']]);
            $price = (float)($stmt->fetchColumn() ?: 0);
            $ins->execute([$orderId, (int)$l['productId'], (int)$l['qty'], $price]);
            $total += $price * (int)$l['qty'];
        }
        $pdo->prepare('UPDATE orders SET total = ? WHERE id = ?')->execute([$total, $orderId]);
        $pdo->prepare('DELETE FROM cart WHERE user_id = ?')->execute([$user['id']]);
        $pdo->commit();

        return $this->get(['id' => $orderId], [], []);
    }

    public function mine(array $p, array $q, array $b): array {
        $user = Auth::requireUser();
        $stmt = Db::pdo()->prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC');
        $stmt->execute([$user['id']]);
        return $stmt->fetchAll();
    }

    public function get(array $p): array {
        $stmt = Db::pdo()->prepare('SELECT * FROM orders WHERE id = ?');
        $stmt->execute([$p['id']]);
        $order = $stmt->fetch();
        if (!$order) { http_response_code(404); throw new \RuntimeException('Order not found', 404); }
        $it = Db::pdo()->prepare('SELECT oi.product_id AS productId, oi.qty, oi.unit_price AS unitPrice, p.name, p.image FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = ?');
        $it->execute([$p['id']]);
        $order['items'] = $it->fetchAll();
        return $order;
    }

    public function tracking(array $p): array {
        $stmt = Db::pdo()->prepare('SELECT created_at AS at, status, note, city FROM order_events WHERE order_id = ? ORDER BY created_at');
        $stmt->execute([$p['id']]);
        $events = $stmt->fetchAll();
        return ['orderId' => $p['id'], 'current' => end($events)['status'] ?? 'pending', 'events' => $events];
    }

    public function reorder(array $p): array {
        // TODO: copy past order's items into the buyer's cart.
        return ['ok' => true];
    }
}
