<?php
declare(strict_types=1);
namespace KissanCares\Controllers;

use KissanCares\Auth;
use KissanCares\Db;

class CartController {
    public function get(array $p, array $q, array $b): array {
        $user = Auth::requireUser();
        $stmt = Db::pdo()->prepare('SELECT product_id AS productId, qty FROM cart WHERE user_id = ?');
        $stmt->execute([$user['id']]);
        return $stmt->fetchAll();
    }

    public function set(array $p, array $q, array $b): array {
        $user = Auth::requireUser();
        $pdo = Db::pdo();
        $pdo->beginTransaction();
        $pdo->prepare('DELETE FROM cart WHERE user_id = ?')->execute([$user['id']]);
        $ins = $pdo->prepare('INSERT INTO cart (user_id, product_id, qty) VALUES (?, ?, ?)');
        foreach (($b['lines'] ?? []) as $l) {
            $ins->execute([$user['id'], (int)$l['productId'], (int)$l['qty']]);
        }
        $pdo->commit();
        return ['ok' => true];
    }

    public function quote(array $p, array $q, array $b): array {
        $lines = $b['lines'] ?? [];
        $coupon = $b['coupon'] ?? null;
        if (!$lines) return ['subtotal' => 0, 'discount' => 0, 'shipping' => 0, 'tax' => 0, 'total' => 0];

        $ids = array_map(fn($l) => (int)$l['productId'], $lines);
        $in = implode(',', array_fill(0, count($ids), '?'));
        $stmt = Db::pdo()->prepare("SELECT id, price FROM products WHERE id IN ($in)");
        $stmt->execute($ids);
        $prices = [];
        foreach ($stmt->fetchAll() as $r) $prices[(int)$r['id']] = (float)$r['price'];

        $subtotal = 0;
        foreach ($lines as $l) $subtotal += ($prices[(int)$l['productId']] ?? 0) * (int)$l['qty'];

        $discount = 0;
        $appliedCoupon = null;
        if ($coupon) {
            $stmt = Db::pdo()->prepare('SELECT * FROM coupons WHERE code = ? AND active = 1 LIMIT 1');
            $stmt->execute([$coupon]);
            if ($c = $stmt->fetch()) {
                $discount = $c['type'] === 'percent' ? (int)round($subtotal * $c['value'] / 100) : (int)$c['value'];
                $appliedCoupon = $c['code'];
            }
        }
        $shipping = $subtotal > 2000 ? 0 : 150;
        $tax = 0;
        return [
            'subtotal' => $subtotal, 'discount' => $discount, 'shipping' => $shipping,
            'tax' => $tax, 'total' => $subtotal - $discount + $shipping + $tax,
            'appliedCoupon' => $appliedCoupon,
        ];
    }
}
