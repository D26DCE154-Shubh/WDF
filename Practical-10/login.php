
<?php
require 'db.php';
require 'auth.php';

start_secure_session();

// Already logged in? Redirect to the correct dashboard.
if (isset($_SESSION['user_id'])) {
    redirect_by_role($_SESSION['role']);
}

if (login_from_remember_cookie($pdo)) {
    redirect_by_role($_SESSION['role']);
}

$error = '';
$messages = [
    'timeout'      => 'Session expired due to inactivity. Please log in again.',
    'unauthorized' => 'Please log in to access that page.',
    'forbidden'    => 'You do not have permission to access that page.',
    'loggedout'    => 'You have been logged out successfully.',
];

$info = $messages[$_GET['msg'] ?? ''] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare(
        "SELECT * FROM users WHERE username = ?"
    );
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        session_regenerate_id(true);

        $_SESSION['user_id']       = $user['id'];
        $_SESSION['username']      = $user['username'];
        $_SESSION['role']          = $user['role'];
        $_SESSION['last_activity'] = time();
        $_SESSION['prev_login']    = $user['last_login'];

        $pdo->prepare(
            "UPDATE users SET last_login = NOW() WHERE id = ?"
        )->execute([$user['id']]);

        if (!empty($_POST['remember'])) {
            issue_remember_token($pdo, (int)$user['id']);
        }

        redirect_by_role($user['role']);
    }

    $error = 'Invalid username or password.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Portal | Login</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            min-height: 100vh;
            padding: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "Segoe UI", Arial, sans-serif;
            color: #17243b;
            background: linear-gradient(135deg, #101b35, #173e52);
        }

        .box {
            width: 100%;
            max-width: 430px;
            padding: 38px;
            background: #ffffff;
            border: 1px solid #e4eaf0;
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.24);
        }

        .brand {
            display: inline-block;
            margin-bottom: 20px;
            padding: 8px 12px;
            color: #087e78;
            background: #e0f5f2;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
        }

        h1 {
            margin: 0 0 10px;
            color: #142641;
            font-size: 30px;
        }

        .subtitle {
            margin: 0 0 26px;
            color: #68778b;
            font-size: 14px;
            line-height: 1.6;
        }

        .message {
            margin: 0 0 18px;
            padding: 12px;
            border-radius: 8px;
            font-size: 14px;
            line-height: 1.5;
        }

        .error {
            color: #a61b1b;
            background: #fff0f0;
            border: 1px solid #ffd4d4;
        }

        .info {
            color: #087044;
            background: #e8f8ef;
            border: 1px solid #c6eed7;
        }

        .field {
            margin-bottom: 18px;
        }

        .field label {
            display: block;
            margin-bottom: 8px;
            color: #34445c;
            font-size: 14px;
            font-weight: 600;
        }

        .field input {
            width: 100%;
            padding: 13px 14px;
            color: #17243b;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            outline: none;
            font-size: 15px;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .field input:focus {
            border-color: #0d9488;
            box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.13);
        }

        .remember {
            display: flex;
            align-items: center;
            gap: 9px;
            margin: 2px 0 22px;
            color: #46556a;
            font-size: 14px;
        }

        .remember input {
            width: 16px;
            height: 16px;
            accent-color: #087e78;
            cursor: pointer;
        }

        button {
            width: 100%;
            padding: 14px;
            color: #ffffff;
            background: #087e78;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
        }

        button:hover {
            background: #06645f;
            transform: translateY(-1px);
        }

        .footer {
            margin: 24px 0 0;
            color: #8793a3;
            text-align: center;
            font-size: 12px;
        }

        @media (max-width: 480px) {
            body {
                padding: 16px;
            }

            .box {
                padding: 26px 22px;
            }

            h1 {
                font-size: 26px;
            }
        }
    </style>
</head>

<body>
    <main class="box">
        <div class="brand">SECURE PORTAL</div>

        <h1>Welcome back</h1>
        <p class="subtitle">
            Sign in to securely access your account and dashboard.
        </p>

        <?php if ($error): ?>
            <p class="message error" role="alert">
                <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?>
            </p>
        <?php endif; ?>

        <?php if ($info): ?>
            <p class="message info" role="status">
                <?= htmlspecialchars($info, ENT_QUOTES, 'UTF-8') ?>
            </p>
        <?php endif; ?>

        <form method="POST" autocomplete="on">
            <div class="field">
                <label for="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    autocomplete="username"
                    required
                >
            </div>

            <div class="field">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    autocomplete="current-password"
                    required
                >
            </div>

            <label class="remember">
                <input type="checkbox" name="remember" value="1">
                <span>Remember me on this device</span>
            </label>

            <button type="submit">Sign In Securely</button>
        </form>

        <p class="footer">
            Protected access · Session-based authentication
        </p>
    </main>
</body>
</html>
