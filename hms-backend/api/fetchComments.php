<?php
header('Access-Control-Allow-Origin: http://localhost/hms-backend/:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

class DbConnect {
    private $server = 'localhost';
    private $dbname = 'healthhub';
    private $user = 'root';
    private $pass = '';

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}

$objDb = new DbConnect;
$conn = $objDb->connect();

if (!$conn) {
    die("Database connection failed.");
}

try {
    if (isset($_GET['blogId'])) {
        $blogId = $_GET['blogId'];
        $stmt = $conn->prepare("SELECT * FROM tblComments WHERE BlogID = :blogId");
        $stmt->bindParam(':blogId', $blogId);
        $stmt->execute();
        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($comments);
    } else {
        echo json_encode([]);
    }
} catch (\PDOException $e) {
    echo "Database Error: " . $e->getMessage();
}
?>
