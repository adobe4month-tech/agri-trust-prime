<?php
declare(strict_types=1);
namespace KissanCares;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth {
    public static function secret(): string { return $_ENV['JWT_SECRET'] ?? 'dev-secret-change-me'; }
    public static function ttl(): int { return ((int)($_ENV['JWT_TTL_DAYS'] ?? 7)) * 86400; }

    public static function hash(string $password): string {
        return password_hash($password, PASSWORD_BCRYPT);
    }
    public static function verifyPassword(string $password, string $hash): bool {
        return password_verify($password, $hash);
    }

    public static function issue(array $user): string {
        $now = time();
        $payload = [
            'iat' => $now,
            'exp' => $now + self::ttl(),
            'sub' => $user['id'],
            'role' => $user['role'],
            'email' => $user['email'] ?? null,
        ];
        return JWT::encode($payload, self::secret(), 'HS256');
    }

    public static function decode(?string $token): ?array {
        if (!$token) return null;
        try {
            $payload = JWT::decode($token, new Key(self::secret(), 'HS256'));
            return (array)$payload;
        } catch (\Throwable $e) { return null; }
    }

    public static function currentUser(): ?array {
        $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (!preg_match('/Bearer\s+(.+)/', $auth, $m)) return null;
        $payload = self::decode($m[1]);
        if (!$payload) return null;
        $stmt = Db::pdo()->prepare('SELECT id, name, email, phone, role FROM users WHERE id = ?');
        $stmt->execute([$payload['sub']]);
        return $stmt->fetch() ?: null;
    }

    public static function requireUser(): array {
        $u = self::currentUser();
        if (!$u) { http_response_code(401); throw new \RuntimeException('Unauthorized', 401); }
        return $u;
    }

    public static function requireRole(string ...$roles): array {
        $u = self::requireUser();
        if (!in_array($u['role'], $roles, true)) { http_response_code(403); throw new \RuntimeException('Forbidden', 403); }
        return $u;
    }
}
