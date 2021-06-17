
import App from './App.vue'

$('.js-vue-app').each (i, el) ->
    new Vue
        render: (h) -> h App
    .$mount el
