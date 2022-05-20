<?php

define('IS_DEV', 1);
define('ASSET_V', '1');

class App {

    public function css() {
        return ''
            .$this->getStyle('css/depends.css')
            .$this->getStyle('css/main.css')
        .'';
    }

    public function js() {
        return ''
            .$this->getScript('js/depends.js')
            .$this->getScript('js/main.js')
            .$this->getScript('vue/app.js')
        .'';
    }

    private function getStyle($file) {
        $out = '';
        if (IS_DEV) {
            $out = '<style>' . file_get_contents(__DIR__ . '/' . $file) . '</style>';
        } else {
            $out = '<link rel="stylesheet" href="' . $file . '?v=' . ASSET_V . '">';
        }
        return $out;
    }

    private function getScript($file) {
        $out = '';
        if (IS_DEV) {
            $out = '<script>' . file_get_contents(__DIR__ . '/' . $file) . '</script>';
        } else {
            $out = '<script src="' . $file . '?v=' . ASSET_V . '"></script>';
        }
        return $out;
    }
}

$app = new App;

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
    <?= $app->css() ?>
    <title>New Project</title>
</head>
<body>

<div class="container pt-3">
    <p><a href="https://github.com/WebProWWW/gulp-web" target="_blank">README</a></p>
</div><!-- .container -->
<div class="js-vue-app"></div>

<?= $app->js() ?>

</body>
</html>