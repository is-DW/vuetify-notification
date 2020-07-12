import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import MSnackBar from './plugin/index.js'

Vue.config.productionTip = false
Vue.use(MSnackBar, { vuetify })

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
