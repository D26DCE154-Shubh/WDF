<?php

require_once "db.php";

try {

    // Prepared Statement
    $stmt = $pdo->prepare(
        "SELECT student_id, full_name, email, department
         FROM students
         ORDER BY student_id"
    );

    // Execute the prepared statement
    $stmt->execute();

    // Fetch all records
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {

    die("Query failed: " . $e->getMessage());

}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Students</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            border: 1px solid #999;
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #eee;
        }
    </style>
</head>

<body>

    <h1>Student Records</h1>

    <table>

        <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
        </tr>

        <?php foreach ($students as $student): ?>

            <tr>
                <td>
                    <?= htmlspecialchars($student["student_id"]) ?>
                </td>

                <td>
                    <?= htmlspecialchars($student["full_name"]) ?>
                </td>

                <td>
                    <?= htmlspecialchars($student["email"]) ?>
                </td>

                <td>
                    <?= htmlspecialchars($student["department"]) ?>
                </td>
            </tr>

        <?php endforeach; ?>

    </table>

</body>

</html>