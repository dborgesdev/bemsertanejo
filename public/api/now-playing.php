<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo '{"error":"Method not allowed"}';
    exit;
}

function metadataUnavailable(): void
{
    http_response_code(502);
    echo '{"error":"Streaming metadata unavailable"}';
    exit;
}

if (!extension_loaded('curl')) {
    metadataUnavailable();
}

// The official player fetches this fixed station URL over HTTPS on port 443.
$handle = curl_init('https://player.svrdedicado.org/player-topo-html5/8090/musica/');
curl_setopt_array($handle, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 3,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_HTTPHEADER => ['Accept: application/json'],
    CURLOPT_USERAGENT => 'Bem Sertanejo FM',
]);
$body = curl_exec($handle);
$status = curl_getinfo($handle, CURLINFO_HTTP_CODE);

if (!is_string($body) || $status < 200 || $status >= 300) {
    metadataUnavailable();
}

// The provider wraps the JSON in parentheses. Decode it strictly as data.
$body = trim($body);
if (str_starts_with($body, '(') && str_ends_with($body, ')')) {
    $body = substr($body, 1, -1);
}
$data = json_decode($body);
if (!is_object($data)) {
    metadataUnavailable();
}

$title = $data->songtitle ?? null;
echo json_encode(['songtitle' => is_string($title) ? $title : null]);
