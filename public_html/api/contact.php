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

$name = trim((string) ($payload['name'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));
$message = trim((string) ($payload['message'] ?? ''));
$website = trim((string) ($payload['website'] ?? ''));

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

$autoloadCandidates = [
    __DIR__ . '/../vendor/autoload.php',
    __DIR__ . '/vendor/autoload.php',
    __DIR__ . '/../../vendor/autoload.php',
    __DIR__ . '/../../php-api/public_html/vendor/autoload.php',
];

foreach ($autoloadCandidates as $autoloadFile) {
    if (is_file($autoloadFile)) {
        require_once $autoloadFile;
        break;
    }
}

$phpMailerCandidateDirs = [
    __DIR__ . '/../vendor/PHPMailer/src',
    __DIR__ . '/vendor/PHPMailer/src',
    __DIR__ . '/../vendor/PHPMailer/phpmailer/src',
    __DIR__ . '/../vendor/phpmailer/phpmailer/src',
    __DIR__ . '/../../vendor/phpmailer/phpmailer/src',
    __DIR__ . '/../../php-api/public_html/vendor/PHPMailer/src',
    __DIR__ . '/../../php-api/public_html/vendor/phpmailer/phpmailer/src',
];

$phpMailerSrcDir = null;

foreach ($phpMailerCandidateDirs as $candidateDir) {
    if (
        is_file($candidateDir . '/Exception.php')
        && is_file($candidateDir . '/PHPMailer.php')
        && is_file($candidateDir . '/SMTP.php')
    ) {
        $phpMailerSrcDir = $candidateDir;
        break;
    }
}

if (!class_exists(PHPMailer::class) && $phpMailerSrcDir === null) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Missing PHPMailer library. Run composer install in public_html or upload vendor/phpmailer/phpmailer/src.',
        'checked_autoload' => $autoloadCandidates,
        'checked_phpmailer_dirs' => $phpMailerCandidateDirs,
    ]);
    exit;
}

if (!class_exists(PHPMailer::class) && $phpMailerSrcDir !== null) {
    require_once $phpMailerSrcDir . '/Exception.php';
    require_once $phpMailerSrcDir . '/PHPMailer.php';
    require_once $phpMailerSrcDir . '/SMTP.php';
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'h65.seohost.pl';
    $mail->Port = 465;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPAuth = true;
    $mail->Username = 'srv93718';
    $mail->Password = 'snMngHNu2xmB';
    $mail->CharSet = 'UTF-8';

    $mail->setFrom('srv93718@sewingataga.co.uk', "Sewing at Aga's Website");
    $mail->addAddress('srv93718@sewingataga.co.uk');
    $mail->addAddress('sewingataga@gmail.com');
    $mail->addReplyTo($email, $name);

    $mail->Subject = "New contact form message from {$name}";
    $mail->Body = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";

    $mail->send();

    http_response_code(200);
    echo json_encode(['ok' => true]);
} catch (Exception $exception) {
    http_response_code(502);
    echo json_encode([
        'ok' => false,
        'error' => 'Failed to send message',
        'detail' => $mail->ErrorInfo ?: $exception->getMessage(),
    ]);
}
