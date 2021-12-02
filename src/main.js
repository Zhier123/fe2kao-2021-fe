import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'muse-ui/dist/muse-ui.css'
import MuseUI from 'muse-ui'
import 'typeface-roboto'
import Toast from 'muse-ui-toast'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import global_ from './views/global.vue'
Vue.prototype.GLOBAL = global_
Vue.use(Toast);
Vue.use(MuseUI);
Vue.config.productionTip = false

new Vue({
  
  router,
  render: h => h(App)
}).$mount('#app')