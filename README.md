
# Gulp шаблон для web

<a href="https://www.jetbrains.com" target="_blank">
    <img height="60" style="max-width: 100%; margin: 15px;" src="https://raw.githubusercontent.com/JetBrains/logos/master/web/jetbrains/jetbrains-variant-2.svg">
</a>
<a href="https://gulpjs.com" target="_blank">
    <img height="60" style="max-width: 100%; margin: 15px;" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
</a>
<a href="https://webpack.js.org" target="_blank">
    <img height="60" style="max-width: 100%; margin: 15px;" src="https://camo.githubusercontent.com/b0573f87b0786eda63c76f2a9a1358e7a653783c25c03c6c908a00b70c713d78/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667">
</a>
<a href="https://coffeescript.org">
    <img height="60" style="max-width: 100%; margin: 15px;" src="https://raw.githubusercontent.com/jashkenas/coffeescript/master/documentation/site/icon.svg">
</a>
<a href="https://stylus-lang.com" target="_blank">
    <img height="60" style="max-width: 100%; margin: 15px;" src="https://raw.githubusercontent.com/stylus/stylus/dev/graphics/Vectors/stylus.svg">
</a>
<a href="https://ru.vuejs.org" target="_blank">
    <img height="60" style="max-width: 100%; margin: 15px;" src="https://camo.githubusercontent.com/c8f91d18976e27123643a926a2588b8d931a0292fd0b6532c3155379e8591629/68747470733a2f2f7675656a732e6f72672f696d616765732f6c6f676f2e706e67">
</a>
<a href="https://nodejs.org" target="_blank">
    <img height="60" style="max-width: 100%; margin: 15px;" src="https://raw.githubusercontent.com/nodejs/nodejs.org/master/static/images/logos/js-green.svg">
</a>

## Компиляция Stylus CoffeeScript Vue и LiveReload
### Перед началом

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
    css/                    Скомпилированные файлы Stylus
    js/                     Скомпилированные файлы CoffeeScript
    vue/                    Скомпилированные Vue приложении 
    index.html              

src/
    coffee/                 
        inc/                Классы, библиотеки, ...
        main.coffee         Компилируется в public_html/js/main.js
        example.coffee      Компилируется в public_html/js/example.js                        

    stylus/                 
        lib/                Функции и т.п.
        main.styl           Компилируется в public_html/css/main.css
        example.styl        Компилируется в public_html/css/example.css

    depends/
        vendor/             Библиотеки jQuery, Bootstrap, ...
        depends.css         Копируется в public_html/css/depends.css
        depends.js          Копируется в public_html/js/depends.js
        any.depends.css     Копируется в public_html/css/any.depends.css
        any.depends.js      Копируется в public_html/js/any.depends.js
    
    vue/                    Файлы компилирует webpack (webpack-stream)
      App.vue               Vue компонент
      app.coffee            Компилируктся в public_html/vue/app.js
      Any.vue               Vue компонент
      any.coffee            Компилируктся в public_html/vue/any.js

gulpfile.js                 Конфигурация Gulp
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

- Открыть директорию в терминале `cd /path-to/my-project`
- Выполните команду `npm install`
- После успешной установки зависимостей
    - Команда для разработки: `gulp --dev`
    - Команда для сборки (Vue минифицируется): `gulp`

```Shell
$ cd /path/to/my-project
$ npm install
...
```
#### Для разработки:
```Shell
$ gulp --dev
```
Команда `gulp` с ключом `--dev` следит за изменениями файлов (указанные в файле `gulpfile.js`) компилирует Stylus, CoffeeScript, Vue компонент и обновляет содержимое браузера.

После запуска открыть проект в браузере и активировать расширение LiveReload для браузера.
#### Для сборки:
```Shell
$ gulp
```
