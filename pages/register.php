<?php

// 1. Allow only POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request method.");
}


// 2. Store validation errors
$errors = [];


// 3. Get form data
$fullName = trim($_POST["full-name"] ?? "");
$email = trim($_POST["email"] ?? "");
$role = trim($_POST["role"] ?? "");
$department = trim($_POST["department"] ?? "");
$password = $_POST["password"] ?? "";
$confirmPassword = $_POST["confirm-password"] ?? "";
$agree = $_POST["agree"] ?? "";


// 4. Validate Full Name
if ($fullName === "") {
    $errors[] = "Full name is required.";
} elseif (strlen($fullName) < 2) {
    $errors[] = "Full name must contain at least 2 characters.";
}


// 5. Validate Email
if ($email === "") {
    $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Please enter a valid email address.";
}


// 6. Validate Role
$allowedRoles = ["student", "teacher", "admin"];

if (!in_array($role, $allowedRoles, true)) {
    $errors[] = "Invalid role selected.";
}


// 7. Validate Department
if ($department === "") {
    $errors[] = "Department is required.";
}


// 8. Validate Password
if (strlen($password) < 8) {
    $errors[] = "Password must be at least 8 characters.";
}


// 9. Confirm Password
if ($password !== $confirmPassword) {
    $errors[] = "Passwords do not match.";
}


// 10. Validate Terms and Conditions
if ($agree !== "yes") {
    $errors[] = "You must agree to the terms and conditions.";
}


// 11. Display errors if validation fails
if (!empty($errors)) {

    echo "<h2>Registration Failed</h2>";

    echo "<ul>";

    foreach ($errors as $error) {
        echo "<li>" . htmlspecialchars($error) . "</li>";
    }

    echo "</ul>";

    echo '<a href="register.html">Go Back</a>';

    exit;
}


// 12. Sanitize input data
$fullName = htmlspecialchars($fullName, ENT_QUOTES, "UTF-8");
$email = htmlspecialchars($email, ENT_QUOTES, "UTF-8");
$department = htmlspecialchars($department, ENT_QUOTES, "UTF-8");


// 13. Hash password before storing
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);


// 14. CSV file location
$csvFile = __DIR__ . "/../data/registrations.csv";


// 15. Create CSV file if it does not exist
if (!file_exists($csvFile)) {

    $file = fopen($csvFile, "w");

    if ($file === false) {
        die("Unable to create CSV file.");
    }

    // CSV Header
    fputcsv($file, [
        "Full Name",
        "Email",
        "Role",
        "Department",
        "Password Hash"
    ]);

    fclose($file);
}


// 16. Open CSV file for adding new record
$file = fopen($csvFile, "a");

if ($file === false) {
    die("Unable to open CSV file.");
}


// 17. Store registration data in CSV
fputcsv($file, [
    $fullName,
    $email,
    $role,
    $department,
    $hashedPassword
]);


// 18. Close CSV file
fclose($file);


// 19. Display success message
echo "<h2>Registration Successful!</h2>";

echo "<p>Welcome, " . $fullName . ".</p>";

echo "<p>Your registration data has been stored successfully.</p>";

echo '<a href="register.html">Register Another Student</a>';

?>