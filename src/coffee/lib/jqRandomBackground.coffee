

class jqRandomBackground

  @firstLoad: on

  constructor: (@jqObj, @conf={images, delay}) ->
    @load @randomSrc @conf.images

  load: (src) ->
    tmpImg = new Image()
    tmpImg.onload = () => @replaceBackground src
    tmpImg.src = src

  randomSrc: (images) ->
    index = Math.floor Math.random() * images.length
    images[index]

  replaceBackground: (src) ->
    @jqObj.animate {'opacity': 0}, 400, () =>
      @jqObj.css {'background-image': "url(#{src})"}
      @jqObj.animate {'opacity': 1}, 400, () =>
        if @firstLoad
          @firstLoad = off

  delay: (ms, callBack) -> setTimeOut callBack ms



