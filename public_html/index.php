<?php

$dev = true;
$v = 1;

if ($dev) $v = $v . 'r' . time();

?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="date=no">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="email=no">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
    <link rel="stylesheet" href="css/depends.css?v=<?= $v ?>">
    <link rel="stylesheet" href="css/main.css?v=<?= $v ?>">
    <title>New Project</title>
</head>
<body>

<div class="container">
    <a href="https://github.com/WebProWWW/gulp-web" target="_blank">README</a>
</div><!-- .container -->
<div class="js-vue-app"></div>

<script src="js/depends.js?v=<?= $v ?>"></script>
<script src="js/main.js?v=<?= $v ?>"></script>
<script src="vue/app.js?v=<?= $v ?>"></script>

</body>
</html>