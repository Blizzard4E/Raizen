import GAuth from 'vue-google-oauth2'
import Vue from 'vue'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

const gauthOption = {
  clientId: '16429804289-8o1ps023lc1dqoifrhlnt0krl67r7u56.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption);
