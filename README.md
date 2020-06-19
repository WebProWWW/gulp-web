
# Gulp шаблон для web верстки
## Предназначен для локального веб сервера

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

#### <a href="https://github.com/WebProWWW/gulp-web/archive/v5.0.0.zip" target="_blank">Скачать</a> последний релиз этого проекта

- Релизы: https://github.com/WebProWWW/gulp-web/releases
- Распаковать скаченный архив в директорию вашего нового проекта

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
