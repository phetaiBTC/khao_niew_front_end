import { AuthRouter } from "@/modules/auth/router"
import { UserRouter } from "@/modules/admin/users/router"
import { createRouter, createWebHistory } from "vue-router"
import DefaultLayout from "@/layouts/Default.vue"
import AuthorizedPage from "@/components/Authorized.vue"
import { authGuard } from "./guard/authGuard"
import { CompanyRouter } from "./modules/admin/company/router"
import { EntertainmentRouter } from "./modules/admin/entertainment/router"
import { ConcertRouter } from "./modules/admin/concert/router"
import { VenueRouter } from "./modules/admin/venue/router"
import CompanyLayout from "./layouts/CompanyLayout.vue"
import { BookingRouter } from "./modules/company/booking/router"
import { CompanyConcertRouter } from "./modules/company/concert/router"
const routes = [
    {
        path: '/admin',
        component: DefaultLayout,
        meta: { title: 'Admin' },
        children: [
            ...UserRouter,
            ...CompanyRouter,
            ...EntertainmentRouter,
            ...ConcertRouter,
            ...VenueRouter
        ]
    },
    {
        path: '/companies',
        component: CompanyLayout,
        meta: { title: 'Companies' },
        children: [
            ...BookingRouter,
            ...CompanyConcertRouter
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