<?php
declare(strict_types=1);
namespace KissanCares\Controllers;

use KissanCares\Db;

class ProductController {
    public function list(array $p, array $q, array $b): array {
        $pdo = Db::pdo();
        $sql = 'SELECT * FROM products WHERE status = "active"';
        $args = [];
        if (!empty($q['q']))        { $sql .= ' AND (name LIKE ? OR brand LIKE ?)'; $args[] = "%{$q['q']}%"; $args[] = "%{$q['q']}%"; }
        if (!empty($q['category'])) { $sql .= ' AND category = ?'; $args[] = $q['category']; }
        if (!empty($q['brand']))    { $sql .= ' AND brand = ?';    $args[] = $q['brand']; }
        $sql .= ' ORDER BY id DESC LIMIT 100';
        $stmt = $pdo->prepare($sql); $stmt->execute($args);
        $rows = $stmt->fetchAll();
        return ['products' => $rows, 'total' => count($rows), 'facets' => ['categories' => [], 'brands' => [], 'crops' => [], 'problems' => [], 'priceMin' => 0, 'priceMax' => 0]];
    }

    public function bySlug(array $p): array {
        $stmt = Db::pdo()->prepare('SELECT * FROM products WHERE slug = ? LIMIT 1');
        $stmt->execute([$p['slug']]);
        $row = $stmt->fetch();
        if (!$row) { http_response_code(404); throw new \RuntimeException('Not found', 404); }
        return $row;
    }

    public function fbt(array $p): array {
        $stmt = Db::pdo()->prepare('SELECT * FROM products WHERE id != ? AND status = "active" ORDER BY RAND() LIMIT 3');
        $stmt->execute([(int)$p['id']]);
        return $stmt->fetchAll();
    }

    public function stock(array $p): array {
        $stmt = Db::pdo()->prepare('SELECT stock_count AS stockCount, stock_status AS status FROM products WHERE id = ?');
        $stmt->execute([(int)$p['id']]);
        return $stmt->fetch() ?: ['stockCount' => 0, 'status' => 'out-of-stock'];
    }

    public function suggest(array $p, array $q): array {
        $term = (string)($q['q'] ?? '');
        $stmt = Db::pdo()->prepare('SELECT id, name, slug, image FROM products WHERE name LIKE ? LIMIT 5');
        $stmt->execute(["%$term%"]);
        return ['products' => $stmt->fetchAll(), 'queries' => [$term . ' price', $term . ' dosage']];
    }

    public function categories(): array { return Db::pdo()->query('SELECT * FROM categories ORDER BY name')->fetchAll(); }
    public function crops(): array      { return Db::pdo()->query('SELECT * FROM crops ORDER BY name')->fetchAll(); }
}
