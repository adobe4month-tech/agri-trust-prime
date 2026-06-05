<?php
declare(strict_types=1);
namespace KissanCares\Controllers;

use KissanCares\Auth;
use KissanCares\Db;

/**
 * Single buyer-scoped controller covering:
 *   profile, addresses, wishlist, notifications, coins/loyalty,
 *   referral, crop profile, reviews, Q&A, quotes, returns, uploads.
 * Splitting into separate classes is fine later; one class keeps wiring simple.
 */
class BuyerController {
    private function uid(): string { return Auth::requireUser()['id']; }
    private function nid(): string { return bin2hex(random_bytes(8)); }

    // ─── Profile ─────────────────────────────────────────
    public function getProfile(): array {
        $u = Auth::requireUser();
        $st = Db::pdo()->prepare('SELECT id, name, email, phone, coins, created_at FROM users WHERE id = ?');
        $st->execute([$u['id']]);
        return $st->fetch() ?: [];
    }
    public function updateProfile(array $p, array $q, array $b): array {
        $id = $this->uid();
        $cols = []; $args = [];
        foreach (['name', 'email', 'phone'] as $k) {
            if (isset($b[$k])) { $cols[] = "$k = ?"; $args[] = $b[$k]; }
        }
        if ($cols) { $args[] = $id; Db::pdo()->prepare('UPDATE users SET ' . implode(',', $cols) . ' WHERE id = ?')->execute($args); }
        return $this->getProfile();
    }

    // ─── Addresses ───────────────────────────────────────
    public function listAddresses(): array {
        $st = Db::pdo()->prepare('SELECT * FROM addresses WHERE user_id = ?');
        $st->execute([$this->uid()]);
        return $st->fetchAll();
    }
    public function createAddress(array $p, array $q, array $b): array {
        $id = $this->nid();
        Db::pdo()->prepare('INSERT INTO addresses (id, user_id, label, name, phone, line1, city, province, postal_code, is_default)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([$id, $this->uid(), $b['label'] ?? null, $b['name'] ?? null, $b['phone'] ?? null,
                       $b['line1'] ?? null, $b['city'] ?? null, $b['province'] ?? null, $b['postalCode'] ?? null,
                       !empty($b['isDefault']) ? 1 : 0]);
        return ['id' => $id] + $b;
    }
    public function updateAddress(array $p, array $q, array $b): array {
        $cols = []; $args = [];
        foreach (['label','name','phone','line1','city','province','postal_code','is_default'] as $k) {
            $key = lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $k))));
            if (isset($b[$key])) { $cols[] = "$k = ?"; $args[] = $b[$key]; }
        }
        if ($cols) { $args[] = $p['id']; $args[] = $this->uid(); Db::pdo()->prepare('UPDATE addresses SET ' . implode(',', $cols) . ' WHERE id = ? AND user_id = ?')->execute($args); }
        return ['ok' => true];
    }
    public function deleteAddress(array $p): array {
        Db::pdo()->prepare('DELETE FROM addresses WHERE id = ? AND user_id = ?')->execute([$p['id'], $this->uid()]);
        return ['ok' => true];
    }

    // ─── Wishlist ────────────────────────────────────────
    public function listWishlist(): array {
        $st = Db::pdo()->prepare('SELECT product_id FROM wishlist WHERE user_id = ?');
        $st->execute([$this->uid()]);
        return array_map(fn($r) => (int)$r['product_id'], $st->fetchAll());
    }
    public function addWishlist(array $p, array $q, array $b): array {
        Db::pdo()->prepare('INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)')->execute([$this->uid(), (int)$b['productId']]);
        return ['ok' => true];
    }
    public function removeWishlist(array $p): array {
        Db::pdo()->prepare('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?')->execute([$this->uid(), (int)$p['productId']]);
        return ['ok' => true];
    }

    // ─── Coins / Loyalty ─────────────────────────────────
    private function loyaltyRules(): array {
        $row = Db::pdo()->query("SELECT data FROM settings WHERE id = 'loyalty'")->fetchColumn();
        return $row ? json_decode($row, true) : ['earnRate' => 1, 'redeemRate' => 2, 'minRedeem' => 100];
    }
    public function coinsBalance(): array {
        $rules = $this->loyaltyRules();
        $st = Db::pdo()->prepare('SELECT coins FROM users WHERE id = ?');
        $st->execute([$this->uid()]);
        $coins = (int)$st->fetchColumn();
        return ['coins' => $coins, 'rate' => $rules['redeemRate'], 'redeemableRs' => intdiv($coins, max(1, $rules['redeemRate']))];
    }
    public function coinsHistory(): array {
        $st = Db::pdo()->prepare('SELECT id, type, coins, reason, created_at FROM coins_ledger WHERE user_id = ? ORDER BY created_at DESC');
        $st->execute([$this->uid()]);
        return $st->fetchAll();
    }
    public function redeemCoins(array $p, array $q, array $b): array {
        $uid = $this->uid();
        $coins = (int)($b['coins'] ?? 0);
        $rules = $this->loyaltyRules();
        if ($coins < (int)$rules['minRedeem']) { http_response_code(422); throw new \RuntimeException('Below minimum redeem', 422); }
        $pdo = Db::pdo();
        $pdo->beginTransaction();
        $pdo->prepare('UPDATE users SET coins = coins - ? WHERE id = ? AND coins >= ?')->execute([$coins, $uid, $coins]);
        $pdo->prepare('INSERT INTO coins_ledger (user_id, type, coins, reason) VALUES (?, "redeem", ?, "checkout redeem")')->execute([$uid, -$coins]);
        $pdo->commit();
        return $this->coinsBalance();
    }

    // ─── Referral ────────────────────────────────────────
    public function referral(): array {
        $u = Auth::requireUser();
        return [
            'code' => 'KC-' . strtoupper(substr($u['id'], -4)),
            'invited' => 0, 'converted' => 0, 'coinsEarned' => 0,
            'leaderboard' => [],
        ];
    }

    // ─── Notifications ───────────────────────────────────
    public function notifPrefs(): array {
        $st = Db::pdo()->prepare("SELECT data FROM settings WHERE id = ?");
        $st->execute(['notif:' . $this->uid()]);
        $row = $st->fetchColumn();
        return $row ? json_decode($row, true) : ['whatsapp' => true, 'sms' => true, 'email' => false, 'promo' => true, 'orderUpdates' => true, 'restock' => true];
    }
    public function updateNotifPrefs(array $p, array $q, array $b): array {
        $cur = $this->notifPrefs();
        $next = array_merge($cur, $b);
        Db::pdo()->prepare("INSERT INTO settings (id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)")
            ->execute(['notif:' . $this->uid(), json_encode($next)]);
        return $next;
    }
    public function inbox(): array { return []; }
    public function markRead(array $p): array { return ['ok' => true]; }

    // ─── Crop profile ────────────────────────────────────
    public function getCropProfile(): array {
        $st = Db::pdo()->prepare("SELECT data FROM settings WHERE id = ?");
        $st->execute(['crop:' . $this->uid()]);
        $row = $st->fetchColumn();
        return $row ? json_decode($row, true) : ['crops' => [], 'acreage' => 0];
    }
    public function updateCropProfile(array $p, array $q, array $b): array {
        Db::pdo()->prepare("INSERT INTO settings (id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)")
            ->execute(['crop:' . $this->uid(), json_encode($b)]);
        return $b;
    }

    // ─── Reviews & Q&A ───────────────────────────────────
    public function listReviews(array $p): array {
        $st = Db::pdo()->prepare('SELECT * FROM reviews WHERE product_id = ? AND status = "approved" ORDER BY created_at DESC');
        $st->execute([(int)$p['id']]);
        return $st->fetchAll();
    }
    public function createReview(array $p, array $q, array $b): array {
        $uid = $this->uid();
        $id = $this->nid();
        Db::pdo()->prepare('INSERT INTO reviews (id, product_id, user_id, rating, text, photos, status) VALUES (?, ?, ?, ?, ?, ?, "pending")')
            ->execute([$id, (int)$p['id'], $uid, (int)$b['rating'], $b['text'] ?? '', json_encode($b['photos'] ?? [])]);
        return ['id' => $id, 'productId' => (int)$p['id'], 'rating' => (int)$b['rating'], 'text' => $b['text'] ?? '', 'status' => 'pending'];
    }
    public function listQuestions(array $p): array {
        $st = Db::pdo()->prepare('SELECT * FROM questions WHERE product_id = ? ORDER BY created_at DESC');
        $st->execute([(int)$p['id']]);
        return $st->fetchAll();
    }
    public function askQuestion(array $p, array $q, array $b): array {
        $uid = $this->uid();
        $id = $this->nid();
        Db::pdo()->prepare('INSERT INTO questions (id, product_id, user_id, question) VALUES (?, ?, ?, ?)')
            ->execute([$id, (int)$p['id'], $uid, $b['question'] ?? '']);
        return ['id' => $id, 'productId' => (int)$p['id'], 'question' => $b['question'] ?? ''];
    }

    // ─── Quotes / Returns ────────────────────────────────
    public function createQuote(array $p, array $q, array $b): array {
        $id = 'Q-' . strtoupper(bin2hex(random_bytes(3)));
        Db::pdo()->prepare('INSERT INTO leads (id, source, name, phone, email, message) VALUES (?, "get-quote", ?, ?, ?, ?)')
            ->execute([$id, $b['name'] ?? null, $b['phone'] ?? null, $b['email'] ?? null, json_encode($b)]);
        $wa = $_ENV['WHATSAPP_NUMBER'] ?? '923240287276';
        return ['quoteId' => $id, 'etaHours' => 24, 'whatsappLink' => "https://wa.me/$wa?text=" . rawurlencode('Quote ' . ($b['name'] ?? ''))];
    }
    public function createReturn(array $p, array $q, array $b): array {
        return ['rmaId' => 'RMA-' . strtoupper(bin2hex(random_bytes(3))), 'etaDays' => 3];
    }

    // ─── Uploads (signed URL stub) ───────────────────────
    public function signUpload(array $p, array $q, array $b): array {
        // Replace with S3 / Cloudflare R2 signed URL logic.
        $base = rtrim($_ENV['UPLOAD_PUBLIC_BASE'] ?? '/uploads', '/');
        $fn = preg_replace('/[^a-zA-Z0-9._-]/', '_', $b['filename'] ?? 'file');
        $key = $this->uid() . '/' . time() . '_' . $fn;
        return ['uploadUrl' => "$base/upload?key=$key", 'publicUrl' => "$base/$key"];
    }
}
