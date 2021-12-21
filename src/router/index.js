// 路由-相关模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
 import Play from '@/views/Play/index.vue'
import { NavBar } from 'vant';

Vue.use(NavBar);

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout',
        component: Layout,
        redirect: '/layout/home',
        children: [
            {
                path: 'home',
                component: Home,
                meta:{
                    title:'首页'
                }
                
            },

            {
                path: 'search',
                component: Search,
                meta:{
                    title:'搜索'
                }
            }
        ]
    },
    {
        path:'/play',
        component:Play
    }
]

const router = new VueRouter({
    routes
})

export default router