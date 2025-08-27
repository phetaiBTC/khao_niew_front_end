import { AuthRouter } from "@/modules/auth/router"
import { UserRouter } from "@/modules/users/router"
import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from "@/layouts/Default.vue"
import AuthorizedPage from "@/components/Authorized.vue"
const routes = [
    {
        path: '/',
        component: DefaultLayout,
        meta: { title: 'Home' },
        children: [
            ...UserRouter
        ]
    },
    {
        path: '/authorized',
        name: 'authorized',
        component: AuthorizedPage,
        meta: { title: 'Authorized' }
    },
    ...AuthRouter

]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})