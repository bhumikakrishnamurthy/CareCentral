<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
    $user = json_decode(file_get_contents('php://input'), true);

    // Generate OTP
    $otp = rand(100000, 999999);

    // Store OTP in the database
    $sql = "INSERT INTO tblusers (firstname, lastname, emailid, userId, phone, password, userType, code) 
            VALUES (:firstname, :lastname, :emailid, :userId, :phone, :password, :userType, :code)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':firstname', $user['firstname']);
    $stmt->bindParam(':lastname', $user['lastname']);
    $stmt->bindParam(':emailid', $user['emailid']); // Email from the frontend
    $stmt->bindParam(':userId', $user['userId']);
    $stmt->bindParam(':phone', $user['phone']);
    $stmt->bindParam(':password', $user['password']);
    $stmt->bindParam(':userType', $user['userType']);
    $stmt->bindParam(':code', $otp);

    if ($stmt->execute()) {
        // Send OTP via email
        $mail = new PHPMailer(true);

        try {
            // Server settings
            //$mail->isSMTP();
            //$mail->Host       = 'smtp.gmail.com'; // SMTP server
            //$mail->SMTPAuth   = true;
            //$mail->Username   = '3918abs@gmail.com'; // SMTP username
            //$mail->Password   = 'aabbssaabbss'; // SMTP password
            //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
            //$mail->Port       = 587; // TCP port
            

            $mail->Host       = getenv('SMTP_HOST');
            $mail->SMTPAuth   = true;
            $mail->Username   = getenv('SMTP_USER');
            $mail->Password   = getenv('SMTP_PASS');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = getenv('SMTP_PORT');




            // Recipients
            $mail->setFrom('3918abs@gmail.com', 'HealthHub'); // Use your email here
            $mail->addAddress($user['emailid']); // Email from the frontend

            // Content
            $mail->isHTML(true); // Set email format to HTML
            $mail->Subject = 'Your OTP Code';
            $mail->Body    = 'Your OTP code is: ' . $otp;

            $mail->send();
            echo json_encode(["status" => 1, "message" => "OTP sent to your email"]);
        } catch (Exception $e) {
            echo json_encode(["status" => 0, "message" => "Failed to send OTP: " . $mail->ErrorInfo]);
        }
    } else {
        echo json_encode(["status" => 0, "message" => "Failed to store OTP"]);
    }
} else {
    echo json_encode(["status" => 0, "message" => "Invalid request"]);
}