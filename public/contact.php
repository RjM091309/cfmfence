<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
  exit;
}

$to      = 'rjmanapsal@gmail.com';
$subject = 'New quote request from CFM Fence website';

$body = "Name: {$name}\n"
      . "Email: {$email}\n"
      . "Service: {$service}\n\n"
      . "Message:\n{$message}\n";

$headers  = "From: CFM Fence Website <no-reply@cfmfencesolutions.com>\r\n";
$headers .= "Reply-To: {$email}\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Failed to send email']);
}

