import { createRouter, createWebHashHistory } from "vue-router";

import home from '@/views/home/home.vue';


const routes = [
    {
        path: '/',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
