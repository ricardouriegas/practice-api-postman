<?php
// get-best-times.php

$game = 'UriegasTicTacToe'; // Nombre de tu juego
$orderAsc = 1;

$gameEncoded = urlencode($game);
$urlGetScores = "http://primosoft.com.mx/games/api/getscores.php?game=$gameEncoded&orderAsc=$orderAsc";

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $urlGetScores,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 30,
]);

$responseContent = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');
echo $responseContent;