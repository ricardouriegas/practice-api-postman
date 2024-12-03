<?php
// save-score.php

$score = filter_input(INPUT_POST, 'score', FILTER_VALIDATE_INT);
$player = filter_input(INPUT_POST, 'player', FILTER_SANITIZE_STRING);
// Cambia el nombre del juego aquí
$game = 'UriegasTictactoe';

if ($score === null || $player === null || $game === null) {
    echo "Datos inválidos";
    exit();
}

$postData = http_build_query([
    'score' => $score,
    'player' => $player,
    'game' => $game
]);

$ch = curl_init('http://primosoft.com.mx/games/api/addscore.php');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $postData,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 30,
]);

$responseContent = curl_exec($ch);
curl_close($ch);

echo $responseContent;