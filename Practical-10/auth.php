
<?php
const SESSION_TIMEOUT = 300;
const REMEMBER_DAYS = 30;

function start_secure_session(): void {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_set_cookie_params([
            'lifetime' => 0,
            'path' => '/',
            'secure' => !empty($_SERVER['HTTPS'])
                && $_SERVER['HTTPS'] !== 'off',
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        session_start();
    }
}

function clear_remember_cookie(): void {
    setcookie('remember_me', '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => !empty($_SERVER['HTTPS'])
            && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    unset($_COOKIE['remember_me']);
}

function destroy_session_completely(): void {
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', [
            'expires' => time() - 42000,
            'path' => $p['path'],
            'domain' => $p['domain'],
            'secure' => $p['secure'],
            'httponly' => $p['httponly'],
            'samesite' => 'Lax'
        ]);
    }

    session_destroy();
}

function redirect_by_role(string $role): void {
    if ($role === 'admin') {
        header('Location: admin_dashboard.php');
    } else {
        header('Location: student_dashboard.php');
    }
    exit;
}

function set_remember_cookie(string $value, int $expires): void {
    setcookie('remember_me', $value, [
        'expires' => $expires,
        'path' => '/',
        'secure' => !empty($_SERVER['HTTPS'])
            && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
}

function issue_remember_token(PDO $pdo, int $userId): void {
    $selector = bin2hex(random_bytes(12));
    $validator = bin2hex(random_bytes(32));
    $expires = time() + REMEMBER_DAYS * 86400;

    $stmt = $pdo->prepare(
        "INSERT INTO remember_tokens
         (user_id, selector, token_hash, expires_at)
         VALUES (?, ?, ?, ?)"
    );

    $stmt->execute([
        $userId,
        $selector,
        hash('sha256', $validator),
        date('Y-m-d H:i:s', $expires)
    ]);

    set_remember_cookie(
        $selector . ':' . $validator,
        $expires
    );
}

function revoke_remember_token(PDO $pdo): void {
    if (!empty($_COOKIE['remember_me'])) {
        $parts = explode(':', $_COOKIE['remember_me'], 2);

        if (count($parts) === 2) {
            $stmt = $pdo->prepare(
                "DELETE FROM remember_tokens WHERE selector = ?"
            );
            $stmt->execute([$parts[0]]);
        }
    }

    clear_remember_cookie();
}

function login_from_remember_cookie(PDO $pdo): bool {
    if (empty($_COOKIE['remember_me'])) {
        return false;
    }

    $parts = explode(':', $_COOKIE['remember_me'], 2);

    if (count($parts) !== 2) {
        clear_remember_cookie();
        return false;
    }

    [$selector, $validator] = $parts;

    $stmt = $pdo->prepare(
        "SELECT rt.id, rt.token_hash, u.id AS uid,
                u.username, u.role
         FROM remember_tokens rt
         JOIN users u ON u.id = rt.user_id
         WHERE rt.selector = ? AND rt.expires_at > NOW()"
    );
    $stmt->execute([$selector]);
    $row = $stmt->fetch();

    if (!$row ||
        !hash_equals(
            $row['token_hash'],
            hash('sha256', $validator)
        )) {
        clear_remember_cookie();
        return false;
    }

    $pdo->prepare(
        "DELETE FROM remember_tokens WHERE id = ?"
    )->execute([$row['id']]);

    session_regenerate_id(true);

    $_SESSION['user_id'] = (int)$row['uid'];
    $_SESSION['username'] = $row['username'];
    $_SESSION['role'] = $row['role'];
    $_SESSION['last_activity'] = time();
    $_SESSION['prev_login'] = null;

    issue_remember_token($pdo, (int)$row['uid']);

    return true;
}

function require_login(PDO $pdo, ?string $requiredRole = null): void {
    start_secure_session();

    if (isset($_SESSION['user_id'])) {
        if (
            !isset($_SESSION['last_activity']) ||
            time() - $_SESSION['last_activity'] > SESSION_TIMEOUT
        ) {
            destroy_session_completely();
            header('Location: login.php?msg=timeout');
            exit;
        }
    } else {
        if (!login_from_remember_cookie($pdo)) {
            header('Location: login.php?msg=unauthorized');
            exit;
        }
    }

    $_SESSION['last_activity'] = time();

    if (
        $requiredRole !== null &&
        $_SESSION['role'] !== $requiredRole
    ) {
        http_response_code(403);
        header('Location: login.php?msg=forbidden');
        exit;
    }
}
