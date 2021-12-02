import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import list from '../views/list.vue'
import login from '../views/login.vue'
import history from '../views/history'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
 {
    path:'/main/:id',
    name:'main',
    component: main
  },{
    path:'/login',
    name:'login',
    component:login
  },{
    path:'/list',
    name:'list',
    component:list
  },{
    path:'/history',
    name:'history',
    component:history
  }
]

const router = new VueRouter({
  routes
})

export default router
