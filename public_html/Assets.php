<?php

class Assets {

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

