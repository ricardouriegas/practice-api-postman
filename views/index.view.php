<!-- index.view.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Práctica 06: APIs</title>
</head>
<body>
    <h1>Práctica 06: APIs</h1>
    <h2>Games:</h2>
    <ul>
        <?php foreach ($games as $game): ?>
            <li>
                <?=htmlspecialchars($game)?>
                <a href="ver-scores.php?game=<?=urlencode($game)?>&orderAsc=1">Ver Scores Asc</a>
                <a href="ver-scores.php?game=<?=urlencode($game)?>&orderAsc=0">Ver Scores Desc</a>
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>