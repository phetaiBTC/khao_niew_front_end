import type { RouteRecordRaw } from 'vue-router'
import UserIndex from './pages/Index.vue'
export const UserRouter: RouteRecordRaw[] = [
    {
        path: '/user',
        name: 'user',
        component: UserIndex,
        meta: { title: 'User' },
    }
]