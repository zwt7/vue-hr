import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'

Vue.use(VueRouter)

// 设置路由，不能加上s，就是一个
const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/login',
    name: 'Login',
    component: Login
}

]

const router = new VueRouter({
    routes
})

export default router
