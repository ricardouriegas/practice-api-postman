<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Scores del Juego</title>
</head>
<body>
    <h1>Scores del Juego</h1>
    <ul>
        <?php foreach ($scores as $score): ?>
            <li>
                Jugador: <?= htmlspecialchars($score['player']) ?> - 
                Puntaje: <?= htmlspecialchars($score['score']) ?>
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>