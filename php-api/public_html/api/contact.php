<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

$name = trim((string)($payload['name'] ?? ''));
$email = trim((string)($payload['email'] ?? ''));
$message = trim((string)($payload['message'] ?? ''));
$website = trim((string)($payload['website'] ?? ''));

if ($website !== '') {
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
}

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid email format']);
    exit;
}

session_start();
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$now = time();
$windowSeconds = 60;
$maxRequests = 3;

if (!isset($_SESSION['contact_rate_limit']) || !is_array($_SESSION['contact_rate_limit'])) {
    $_SESSION['contact_rate_limit'] = [];
}

$ipTimestamps = array_values(array_filter(
    $_SESSION['contact_rate_limit'][$ip] ?? [],
    static fn ($timestamp): bool => is_int($timestamp) && ($now - $timestamp) < $windowSeconds
));

if (count($ipTimestamps) >= $maxRequests) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many requests. Please try again later.']);
    exit;
}

$ipTimestamps[] = $now;
$_SESSION['contact_rate_limit'][$ip] = $ipTimestamps;

require_once __DIR__ . '/../vendor/PHPMailer/src/Exception.php';
require_once __DIR__ . '/../vendor/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../vendor/PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'h65.seohost.pl';
    $mail->Port = 465;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPAuth = true;
    $mail->Username = 'srv93718@h65.seohost.pl';
    $mail->Password = 'snMngHNu2xmB';
    $mail->CharSet = 'UTF-8';

    $mail->setFrom('srv93718@h65.seohost.pl', "Sewing at Aga's Website");
    $mail->addAddress('srv93718@h65.seohost.pl');
    $mail->addAddress('sewingataga@gmail.com');
    $mail->addReplyTo($email, $name);

    $mail->Subject = "New contact form message from {$name}";
    $mail->Body = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";

    $mail->send();

    http_response_code(200);
    echo json_encode(['ok' => true]);
} catch (Exception $e) {
  http_response_code(502);
  echo json_encode([
    'ok' => false,
    'error' => 'Failed to send message',
    'detail' => $mail->ErrorInfo ?: $e->getMessage()
  ]);
  exit;
}

