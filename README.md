
# Gulp шаблон для web верстки
## Stylus CoffeeScript Vue

Убедитесь, что у вас установлен
<a href="https://nodejs.org/en/download/" target="_blank">Node</a>
и
<a href="https://gulpjs.com/docs/en/getting-started/quick-start" target="_blank">Gulp CLI</a>

- Node: https://nodejs.org/en/download/
- Gulp: https://gulpjs.com/docs/en/getting-started/quick-start

## Установка

#### Расширение <a href="http://livereload.com" target="_blank">LiveReload</a> для браузера
- Google Chrome: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
- Firefox: https://addons.mozilla.org/ru/firefox/addon/livereload-web-extension/

#### <a href="https://github.com/WebProWWW/gulp-web/archive/v5.0.1.zip" target="_blank">Скачать</a> последний релиз этого проекта
- Релизы: https://github.com/WebProWWW/gulp-web/releases
- Распаковать скаченный архив в директорию вашего нового проекта

#### Структура директории

```
public_html/                Корень сайта доступная через браузер.
    css/                    Вывод скомпилированных CSS
    js/                     Вывод скомпилированных JavaScript
    index.html              Входной файл
src/                        Ресурсы для Gulp
    stylus/                 Препроцессор Stylus
        lib/                Функции и т.п.
        main.styl           Компилируется в public_html/css/main.css
        example.styl        Компилируется в public_html/css/example.css
    coffee/                 Синтаксический сахар CoffeeScript
        lib/                Классы файлы и т.п
        main.coffee         Компилируется в public_html/js/main.js
        example.coffee      Компилируется в public_html/js/example.js
    depends/                Зависимости
        vendor/             Библиотеки jQuery, Bootstrap и т.п
        main.depends.css    Копируется в public_html/css/main.depends.css
        main.depends.js     Копируется в public_html/js/main.depends.js
        any.depends.css     Копируется в public_html/css/any.depends.css
        any.depends.js      Копируется в public_html/js/any.depends.js
    html/                   HTML страницы
        tpl/                HTML кусочки кода header, footer и т.п.
        index.html          Копируется в public_html/index.html
        about.html          Копируется в public_html/about.html
Gulpfile.js                 Конфигурация Gulp
.browserslistrc             Совместимость с браузерами
```

#### Локальный сервер
> Путь `/path-to/my-project` указан только для примера, вы должны указать свой
- Настроить локальный сервер так чтобы публичная директория была `public_html` в вашем проекте
- Убедитесь что ваш проект открывается в браузере и корнем сайта является директория `public_html`

Пример конфигурации Apache:
```ApacheConf
<VirtualHost 127.0.0.1:80>
    <Directory "/path-to/my-project/*">
        Options Indexes FollowSymLinks ExecCGI Includes MultiViews
        AllowOverride All
        Require all granted
    </Directory>
    ServerAdmin webmaster@example.com
    DocumentRoot "/path-to/my-project/public_html"
    ServerName my-project.loc
    ErrorLog "/path-to/my-project/error_log"
    CustomLog "/path-to/my-project/access_log" common
</VirtualHost>
```

#### Установка зависимостей и запуск

- Открыть директорию проекта в консоле `cd /path-to/my-project`
- Выполните команду `npm install`
- После успешной установки зависимостей запустить `gulp`

```Shell
$ cd /path/to/my-project
$ npm install
...
$ gulp
```

После запуска gulp открыть проект в браузере и активировать расширение LiveReload для браузера.