import type { RouteRecordRaw } from 'vue-router'
import BookingIndex from './pages/Index.vue'
import BookingCreate from './pages/BookingCreate.vue'
export const BookingRouter: RouteRecordRaw[] = [
    {
        path: 'booking',
        name: 'booking',
        component: BookingIndex,
        meta: { title: 'booking' },
    },
    {
        path: 'booking/create/:concert_id',
        name: 'company.booking.create',
        component: BookingCreate,
        meta: { title: 'booking' },
    }
]