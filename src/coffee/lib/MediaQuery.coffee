class MediaQuery
  @SM: '(min-width: 576px)'
  @MD: '(min-width: 768px)'
  @LG: '(min-width: 992px)'
  @XL: '(min-width: 1200px)'

  isSM: off
  isMD: off
  isLG: off
  isXL: off

  constructor: ($win) ->
    if Modernizr?
      if Modernizr.mq 'only all'
        if $?
          $win ?= $ window
          @init $win
        else
          console.log 'Подключите библиотеку jQuery. Библиотеку можно скачать по ссылке http://jquery.com'
      else
        console.log 'Браузер не поддерживает @media запросы'
    else
      console.log 'Не найден плагин "modernizr.js". Плагин можно скачать по ссылке https://modernizr.com/download/?-mq'

  init: ($win) ->
    do @detectMedia
    $win.on 'resize', (e) => do @detectMedia
    on

  detectMedia: () ->
    @isSM = Modernizr.mq MediaQuery.SM
    @isMD = Modernizr.mq MediaQuery.MD
    @isLG = Modernizr.mq MediaQuery.LG
    @isXL = Modernizr.mq MediaQuery.XL
    on