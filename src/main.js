import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Default from './views/DefaultLayout'
import notify from './plugins/notify'
import { $http } from './plugins/http-wrapper'


Vue.component('default-layout', Default)

Vue.config.productionTip = false;
Vue.prototype.$notify = notify;
Vue.prototype.$http = $http;


const token = store.getters['auth/token']

if (token) {
  $http.setAccessToken(token)
}



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
