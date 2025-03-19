import { createRouter, createWebHashHistory } from "vue-router";

import login from '@/views/login/login.vue'
import register from '@/views/register/register.vue'
import main from '@/views/main/main.vue';
import home from '@/views/main/home/home.vue';



const routes = [
    {
        path: '/',
        redirect: {
            name: 'main'
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
            {
                path: 'wallet',
                name: 'wallet',
                component: () => import('@/views/main/wallet/wallet.vue'),
            },
            {
                path: 'tutorial',
                name: 'tutorial',
                component: () => import('@/views/main/tutorial/tutorial.vue'),
            },
            {
                path: 'problem',
                name: 'problem',
                component: () => import('@/views/main/problem/problem.vue'),
            },
            {
                path: 'manageDicts',
                name: 'manageDicts',
                component: () => import('@/views/main/manageDicts/manageDicts.vue'),
            },
            {
                path: 'manageGoods',
                name: 'manageGoods',
                component: () => import('@/views/main/mangeGoods/manageGoods.vue'),
            }
        ]
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
