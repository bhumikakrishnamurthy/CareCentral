<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

// Handle OPTIONS requests (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    http_response_code(200);
    exit();
}

class DbConnect {
    private $server = 'localhost';
    private $dbname = 'healthhub';
    private $user = 'root';
    private $pass = '';

    public function connect() {
        try {
            $conn = new PDO("mysql:host=$this->server;dbname=$this->dbname", $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo json_encode(["status" => 0, "message" => "Database Error: " . $e->getMessage()]);
            exit();
        }
    }
}

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST") {
    // Get JSON input
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['otp'])) {
        echo json_encode(["status" => 0, "message" => "OTP is required"]);
        exit();
    }

    session_start();
    $_SESSION['info'] = '';
    $otp_code = $data['otp'];

    // Check if OTP exists in the database
    $stmt = $conn->prepare("SELECT * FROM tblusers WHERE code = :otp_code");
    $stmt->bindParam(':otp_code', $otp_code);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $fetch_data = $stmt->fetch(PDO::FETCH_ASSOC);
        $fetch_code = $fetch_data['code'];

        // Update OTP status
        $code = 0;
        $status = 'verified';
        $update_otp = "UPDATE tblusers SET code = :code, status = :status WHERE code = :fetch_code";
        $stmt = $conn->prepare($update_otp);
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':fetch_code', $fetch_code);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(["status" => 1, "message" => "OTP verification successful"]);
        } else {
            echo json_encode(["status" => 0, "message" => "Failed to update OTP"]);
        }
    } else {
        echo json_encode(["status" => 0, "message" => "Incorrect OTP"]);
    }
} else {
    echo json_encode(["status" => 0, "message" => "Invalid request"]);
}
?>