<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=RestaurantQRManagement;charset=utf8', 'root', '');
    $stmt = $pdo->query('SHOW TABLES');
    $tables = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach($tables as $t) {
        $name = array_values($t)[0];
        echo "Table: $name\n";
        $colStmt = $pdo->query("DESCRIBE `$name`");
        $cols = $colStmt->fetchAll(PDO::FETCH_ASSOC);
        foreach($cols as $c) {
            echo "  - " . $c['Field'] . " (" . $c['Type'] . ")\n";
        }
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
?>
