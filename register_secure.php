<?php

// Database connection
$conn = new mysqli("localhost", "root", "", "studenthub_db");

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get and sanitize input
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    // Backend validation
    if (empty($username) || empty($email) || empty($password)) {

        $message = "All fields are required.";

    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

        $message = "Invalid email format.";

    } elseif (strlen($password) < 6) {

        $message = "Password must be at least 6 characters.";

    } else {

        // Check duplicate username/email
        $check = $conn->prepare(
            "SELECT user_id FROM users WHERE username = ? OR email = ?"
        );

        $check->bind_param("ss", $username, $email);
        $check->execute();

        $result = $check->get_result();

        if ($result->num_rows > 0) {

            $message = "Username or Email already exists.";

        } else {

            // Hash password securely
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Insert user using prepared statement
            $stmt = $conn->prepare(
                "INSERT INTO users (username, email, password)
                 VALUES (?, ?, ?)"
            );

            $stmt->bind_param(
                "sss",
                $username,
                $email,
                $hashedPassword
            );

            if ($stmt->execute()) {

                $message = "Registration successful!";

            } else {

                $message = "Registration failed.";
            }

            $stmt->close();
        }

        $check->close();
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Secure User Registration</title>
</head>

<body>

    <h2>Secure User Registration</h2>

    <?php if ($message != ""): ?>
        <p><strong><?php echo htmlspecialchars($message); ?></strong></p>
    <?php endif; ?>

    <form method="POST" action="">

        <label>Username:</label><br>
        <input
            type="text"
            name="username"
            required
        >
        <br><br>

        <label>Email:</label><br>
        <input
            type="email"
            name="email"
            required
        >
        <br><br>

        <label>Password:</label><br>
        <input
            type="password"
            name="password"
            minlength="6"
            required
        >
        <br><br>

        <button type="submit">Register</button>

    </form>

</body>
</html>