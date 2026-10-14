
<?php
require 'db.php';
require 'auth.php';

require_login($pdo, 'admin');

$username = htmlspecialchars(
    $_SESSION['username'], ENT_QUOTES, 'UTF-8'
);
$lastLogin = $_SESSION['prev_login'] ?? null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Admin Dashboard | Secure Portal</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:"Segoe UI",Arial,sans-serif;background:#f1f5f9;color:#17243b}
header{padding:20px 7%;display:flex;justify-content:space-between;align-items:center;
background:#142641;color:white}
.brand{font-size:19px;font-weight:700}
.badge{padding:7px 13px;background:#d8f5ed;color:#087e78;border-radius:20px;
font-size:12px;font-weight:700}
main{width:min(900px,90%);margin:42px auto}
h1{margin:0 0 10px;font-size:34px}
.muted{color:#64748b;line-height:1.6}
.card{padding:26px;margin:24px 0;background:white;border:1px solid #e2e8f0;
border-radius:14px;box-shadow:0 6px 20px #0f172a0c}
h2{margin-top:0;font-size:19px}
.detail{display:flex;justify-content:space-between;gap:16px;padding:15px 0;
border-bottom:1px solid #edf1f5}
.detail:last-child{border-bottom:0}
.detail span:first-child{color:#64748b}
.value{text-align:right;font-weight:600;overflow-wrap:anywhere}
.notice{padding:16px;border-radius:9px;background:#e8f8ef;color:#176b45;line-height:1.6}
.logout{display:inline-block;margin-top:5px;padding:12px 20px;border-radius:8px;
background:#b42332;color:white;text-decoration:none;font-weight:600}
.logout:hover{background:#921d29}
footer{text-align:center;padding:25px;color:#94a3b8;font-size:13px}
@media(max-width:520px){header{padding:18px 5%}main{margin:28px auto}
.card{padding:20px}.detail{align-items:flex-start}}
</style>
</head>
<body>
<header>
    <div class="brand">Secure Portal</div>
    <span class="badge">ADMIN</span>
</header>

<main>
    <h1>Admin Dashboard</h1>
    <p class="muted">Welcome back, <strong><?= $username ?></strong>.
    You have administrator access.</p>

    <section class="card">
        <h2>Account Information</h2>
        <div class="detail"><span>Username</span><span class="value"><?= $username ?></span></div>
        <div class="detail"><span>Role</span><span class="value">Administrator</span></div>
        <div class="detail">
            <span>Previous Login</span>
            <span class="value">
                <?= $lastLogin
                    ? htmlspecialchars($lastLogin, ENT_QUOTES, 'UTF-8')
                    : 'First login' ?>
            </span>
        </div>
    </section>

    <section class="card">
        <h2>Session Security</h2>
        <div class="detail"><span>Authentication</span><span class="value">Active</span></div>
        <div class="detail">
            <span>Inactivity Timeout</span>
            <span class="value"><?= (int)SESSION_TIMEOUT ?> seconds</span>
        </div>
        <p class="notice">✓ Your protected administrator session is active.
        Log out when you finish using this device.</p>
    </section>

    <a class="logout" href="logout.php">Log Out</a>
</main>
<footer>Secure Portal · Role-Based Access Control</footer>
</body>
</html>
