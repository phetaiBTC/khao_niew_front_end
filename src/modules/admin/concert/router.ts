import type { RouteRecordRaw } from 'vue-router'
import IndexConcert from './pages/Index.vue'
export const ConcertRouter: RouteRecordRaw[] = [
    {
        path: 'concert',
        name: 'concert',
        component: IndexConcert,
        meta: { title: 'Concert' }
    }
]