import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'

const routes = [
 {
    path: '/',
    name:'index',
    // redirect:'/home'
    component: home
 },
//  {
//     path: '/home',
//     name:'home',
//     component: home
//  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router //这段后，要有回车保留一个空行否则会报错。
