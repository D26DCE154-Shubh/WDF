<?php
require 'db.php';
require 'auth.php';
require_login($pdo, 'student');
?>
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Student Dashboard</title></head>
<body>
    <h1>Student Dashboard</h1>
    <p>Welcome, <b><?= htmlspecialchars($_SESSION['username']) ?></b> (<?= htmlspecialchars($_SESSION['role']) ?>)</p>
    <p>Last login: <?= htmlspecialchars($_SESSION['prev_login'] ?? 'First login') ?></p>
    <a href="logout.php">Logout</a>
</body>
</html>