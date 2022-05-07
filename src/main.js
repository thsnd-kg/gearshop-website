import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Default from './views/DefaultLayout'

Vue.component('default-layout', Default)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
