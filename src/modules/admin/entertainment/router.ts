import type { RouteRecordRaw } from 'vue-router';
import IndexEntertainment from './pages/Index.vue'
export const EntertainmentRouter: RouteRecordRaw[] = [
    {
        path: 'entertainment',
        name: 'entertainment',
        component: IndexEntertainment,
        meta: { title: 'Entertainment' }
    }
]