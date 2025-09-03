import { AuthRouter } from "@/modules/auth/router"
import { UserRouter } from "@/modules/users/router"
import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from "@/layouts/Default.vue"
import AuthorizedPage from "@/components/Authorized.vue"
import { authGuard } from "./guard/authGuard"
import { CompanyRouter } from "./modules/company/router"
import { EntertainmentRouter } from "./modules/entertainment/router"
import { ConcertRouter } from "./modules/concert/router"
import { VenueRouter } from "./modules/venue/router"
const routes = [
    {
        path: '/',
        component: DefaultLayout,
        meta: { title: 'Home' },
        children: [
            ...UserRouter,
            ...CompanyRouter,
            ...EntertainmentRouter,
            ...ConcertRouter,
            ...VenueRouter
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

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(authGuard)

export default router