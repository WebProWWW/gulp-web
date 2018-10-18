$ = jQuery

class jQueryMailer
  settings:
    action: '/'
    method: 'POST'
    dataType: 'json'
    sendingStr: 'Sending...'
    success: ($form, data) ->
    error: ($form) ->
  emailRegex: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
  process: off
  sendingCurrentHtml: ''

  constructor: (selector, options) ->
    $.extend @settings, options
    $('body').on 'submit', selector, @onSubmit

  onSubmit: (e) =>
    e.preventDefault()
    $form = $ e.target
    @send $form if (@validate $form.find '[validate]') and not @process
    off

  delay: (sec, fun) =>
    setTimeout fun, (sec * 1000)
    on

  send: ($form) ->
    @progress $form
    @process = on
    $.ajax
      method: @settings.method
      url: @settings.action
      data: $form.serialize()
      dataType: @settings.dataType
    .done (data) => @success $form, data
    .fail () => @error $form
    .always () =>
      @process = off
      @always $form
    on

  success: ($form, data) ->
    # $form.trigger 'reset'
    @settings.success $form, data

  error: ($form) ->
    @settings.error $form

  always: ($form) ->
    $sending = $form.find '.js-form-progress'
    $sending.html @sendingCurrentHtml
    on

  progress: ($form) ->
    $sending = $form.find '.js-form-progress'
    @sendingCurrentHtml = $sending.html()
    $sending.html @settings.sendingStr
    on

  inputError: ($input) ->
    $input.addClass 'error'
    $input.one 'focusin', (e) ->
      $(this).removeClass 'error'
    on

  validate: ($inputs) ->
    result = on
    $inputs.each (i, input) =>
      $input = $ input
      validate = $input.attr 'validate'
      inputVal = $input.val()
      inputRes = switch validate
        when 'text' then inputVal.length > 2
        when 'email' then @emailRegex.test inputVal
        else on
      unless inputRes
        result = inputRes
        @inputError $input
      on
    result