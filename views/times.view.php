<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tiempos del Juego</title>
</head>
<body>
    <h1>Tiempos del Juego</h1>
    <ul>
        <?php foreach ($times as $time): ?>
            <li><?=$time?></li>
        <?php endforeach; ?>
    </ul>
</body>
</html>