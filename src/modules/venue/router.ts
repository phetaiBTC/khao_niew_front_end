import type { RouteRecordRaw } from "vue-router";
import IndexVenue from "./pages/Index.vue"
export const VenueRouter: RouteRecordRaw[] = [
    {
        path: '/venue',
        name: 'venue',
        component: IndexVenue,
        meta: { title: 'Venue' }
    }
] 