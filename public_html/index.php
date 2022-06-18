<?php

define('IS_DEV', 1);
define('ASSET_V', '1');

require __DIR__ . '/Assets.php';

$assets = new Assets;

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
    <?= $assets->css() ?>
    <title>New Project</title>
</head>
<body>

<div class="container pt-3">
    <div class="row">
        <div class="col-auto">
            <h5>Utilities</h5>
        </div>
        <div class="col-auto ms-auto em-8">
            <a href="https://github.com/WebProWWW/gulp-web" target="_blank">README</a>
        </div>
        <div class="col-auto em-8">
            <a href="https://ru.vuejs.org/v2/guide/" target="_blank">Vue 2.6.14</a>
        </div>
    </div>
    <hr>
</div><!-- .container -->

<div class="js-vue-app"></div>


<?= $assets->js() ?>
</body>
</html>