<?php
declare(strict_types=1);
namespace KissanCares\Controllers;

use KissanCares\Auth;
use KissanCares\Db;

class AuthController {
    public function login(array $p, array $q, array $b): array {
        $email = trim((string)($b['email'] ?? ''));
        $password = (string)($b['password'] ?? '');
        if (!$email || !$password) { http_response_code(422); throw new \RuntimeException('Email and password required', 422); }

        $stmt = Db::pdo()->prepare('SELECT id, name, email, phone, role, password_hash FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        $row = $stmt->fetch();
        if (!$row || !Auth::verifyPassword($password, $row['password_hash'])) {
            http_response_code(401); throw new \RuntimeException('Invalid email or password', 401);
        }
        unset($row['password_hash']);
        return ['token' => Auth::issue($row), 'user' => $row];
    }

    public function logout(array $p, array $q, array $b): array {
        // Stateless JWT — clients drop the token. (Implement deny-list if needed.)
        return ['ok' => true];
    }

    public function me(array $p, array $q, array $b): array {
        return Auth::requireUser();
    }

    public function sendOtp(array $p, array $q, array $b): array {
        // TODO: integrate SMS gateway (Jazz/Veevo/Twilio). Stubbed.
        return ['ok' => true];
    }

    public function verifyOtp(array $p, array $q, array $b): array {
        $phone = (string)($b['phone'] ?? '');
        $otp = (string)($b['otp'] ?? '');
        if (!$phone || !$otp) { http_response_code(422); throw new \RuntimeException('Phone and OTP required', 422); }
        // TODO: validate OTP from cache. Find or create the user.
        $pdo = Db::pdo();
        $stmt = $pdo->prepare('SELECT id, name, email, phone, role FROM users WHERE phone = ? LIMIT 1');
        $stmt->execute([$phone]);
        $user = $stmt->fetch();
        if (!$user) {
            $id = bin2hex(random_bytes(8));
            $pdo->prepare('INSERT INTO users (id, phone, role, password_hash) VALUES (?, ?, "customer", "")')->execute([$id, $phone]);
            $user = ['id' => $id, 'name' => null, 'email' => null, 'phone' => $phone, 'role' => 'customer'];
        }
        return ['token' => Auth::issue($user), 'user' => $user];
    }
}
