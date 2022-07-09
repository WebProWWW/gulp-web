<?php

class Asset {

    public function css($files=[]) {
        $out = '';
        foreach ($files as $file) {
            $out .= $this->getStyle($file);
        }
        return $out;
    }

    public function js($files=[]) {
        $out = '';
        foreach ($files as $file) {
            $out .= $this->getScript($file);
        }
        return $out;
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

