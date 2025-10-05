import type { RouteRecordRaw } from 'vue-router'
import UserIndex from './pages/Index.vue'
export const CompanyUserRouter: RouteRecordRaw[] = [
    {
        path: 'user',
        name: 'company.user',
        component: UserIndex,
        meta: { title: 'User' },
    }
]