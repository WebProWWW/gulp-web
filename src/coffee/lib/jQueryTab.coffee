
class jQueryTab

  constructor: (@selector) ->
    $('body').on 'click', "#{@selector} .tab-btn", @onBtnClick


  onBtnClick: (e) =>
    e.preventDefault()
    $target = $ e.currentTarget
    id = $target.attr 'href'
    @showContent id if id?
    off


  showContent: (id) ->
    $content = $ id
    $parent = $content.closest @selector
    $sibContents = $parent.find '.tab-content'
    $sibBtns = $parent.find '.tab-btn'
    $btn = $parent.find ".tab-btn[href=\'#{id}\']"
    $sibContents.removeClass 'active'
    $content.addClass 'active'
    $sibBtns.removeClass 'active'
    $btn.addClass 'active'
    on


