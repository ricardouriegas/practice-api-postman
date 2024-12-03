<!-- ver-scores.php -->
<?php

$game = filter_input(INPUT_GET, "game", FILTER_SANITIZE_STRING);
if (!$game) {
    echo "Es necesario el parámetro URL 'game'";
    exit();
}

$orderAsc = filter_input(INPUT_GET, "orderAsc", FILTER_VALIDATE_INT);
if ($orderAsc === null) {
    $orderAsc = 0; // Valor por defecto
}

$gameEncoded = urlencode($game);
$urlGetScores = "http://primosoft.com.mx/games/api/getscores.php?game=$gameEncoded&orderAsc=$orderAsc";

// Llamada a la REST API
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $urlGetScores,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 30
]);

$responseContent = curl_exec($ch);
curl_close($ch);

$scores = json_decode($responseContent, true);

include "views/scores.view.php";