
# Gulp шаблон для web
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

После запуска gulp открыть проект в браузере и активировать расширение LiveReload для браузера.