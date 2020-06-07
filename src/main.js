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
  clientId: '594234124010-hrg1m633s3j2g0cpad1s76s0kitrki6s.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption);
