import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [
 {
    pat: '/',
    name:'index',
    component: HelloWorld,
    redirect:'/home'
 },
 {
    path: '/home',
    name:'home',
    component: home,
    
 },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router 
//这段后，要有回车保留一个空行否则会报错。