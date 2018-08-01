import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import wysiwyg from 'vue-wysiwyg'
import "../node_modules/vue-wysiwyg/dist/vueWysiwyg.css"
 
Vue.use(Vuetify)
Vue.use(wysiwyg, {
  maxHeight: "800px"
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')