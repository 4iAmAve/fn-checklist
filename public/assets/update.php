<?php
// An array of HTTP methods that
// we want to allow.
$allowedMethods = array(
    'POST'
);

// The current request type.
$requestMethod = strtoupper($_SERVER['REQUEST_METHOD']);

// If the request method isn't in our
// list of allowed methods.
if(!in_array($requestMethod, $allowedMethods)){
    // Send a 405 Method Not Allowed header.
    header('Content-Type: application/json');
    header($_SERVER["SERVER_PROTOCOL"]." 405 Method Not Allowed", true, 405);
    $msg = [ "error" => true, "message" => "Method no allowed" ];
    echo json_encode($msg);
    // Halt the script's execution.
    exit;
}

$data = file_get_contents('php://input');
$decoded = json_decode($data);

if (json_last_error() != JSON_ERROR_NONE) {
    header('Content-Type: application/json');
    header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request", true, 400);
    $msg = [ "error" => true, "message" => "Malformed input" ];
    echo json_encode($msg);
    exit;
}

file_put_contents('./checklists.json', json_encode($decoded));
header('Content-Type: application/json');
$msg = [ "error" => false, "message" => "successfully updated selections list" ];
echo json_encode($msg);
