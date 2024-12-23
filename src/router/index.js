import { createRouter, createWebHashHistory } from "vue-router";

import login from '@/views/login/login.vue'
import register from '@/views/register/register.vue'
import main from '@/views/main/main.vue';
import home from '@/views/main/home/home.vue';



const routes = [
    {
        path: '/',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path: '/main',
        name: 'main',
        component: main,
        children: [
            {
                path: 'home',
                name: 'home',
                component: home,
            },
            {
                path: 'store',
                name: 'store',
                component: () => import('@/views/main/store/store.vue'),
            },
            {
                path: 'account',
                name: 'account',
                component: () => import('@/views/main/account/account.vue'),
            },
        ]
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
