<?php

$game = filter_input(INPUT_GET, "game");
if (!$game) {
    echo "Es necesario el parámetro url [game]";
    exit();
}

$gameEncoded = urlencode($game);
$urlGetTimes = "http://primosoft.com.mx/games/api/gettimes.php?game=$gameEncoded";

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $urlGetTimes,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 30
]);

$responseContent = curl_exec($ch);
curl_close($ch);

$times = json_decode($responseContent, true);

include "views/times.view.php";