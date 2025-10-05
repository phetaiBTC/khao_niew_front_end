import type { RouteRecordRaw } from 'vue-router'
import DashboardIndex from './pages/Index.vue'
export const DashboardRouter: RouteRecordRaw[] = [
    {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardIndex,
        meta: { title: 'Dashboard' },
    }
]