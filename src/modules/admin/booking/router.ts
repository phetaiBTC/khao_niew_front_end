import type { RouteRecordRaw } from "vue-router";
import BookingIndex from "./pages/Index.vue";
export const BookingRouter: RouteRecordRaw[] = [
    {
        path: 'booking',
        name: 'booking',
        component: BookingIndex,
        meta: { title: 'booking' },
    }
]