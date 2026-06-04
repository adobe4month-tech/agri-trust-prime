<?php
declare(strict_types=1);
namespace KissanCares\Controllers;

use KissanCares\Db;

class LeadController {
    public function capture(array $p, array $q, array $b): array {
        $id = bin2hex(random_bytes(6));
        Db::pdo()->prepare('INSERT INTO leads (id, source, name, phone, email, message, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())')
            ->execute([$id, $b['source'] ?? 'unknown', $b['name'] ?? null, $b['phone'] ?? null, $b['email'] ?? null, $b['message'] ?? null]);
        return ['ok' => true];
    }
    public function event(array $p, array $q, array $b): array {
        Db::pdo()->prepare('INSERT INTO analytics_events (name, props, created_at) VALUES (?, ?, NOW())')
            ->execute([$b['name'] ?? '', json_encode($b['props'] ?? [])]);
        return ['ok' => true];
    }
}
