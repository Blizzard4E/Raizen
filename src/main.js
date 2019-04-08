import GAuth from 'vue-google-oauth2'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

const gauthOption = {
  clientId: '16429804289-rj5621b7ncsoo2is3qs0stgebmcar9q0.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption);
