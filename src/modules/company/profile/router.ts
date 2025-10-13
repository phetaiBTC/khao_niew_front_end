import type { RouteRecordRaw } from 'vue-router'
import ProfileIndex from './pages/Index.vue'
export const CompanyProfileRouter: RouteRecordRaw[] = [
    {
        path: 'profile',
        name: 'company.profile',
        component: ProfileIndex,
        meta: { title: 'Profile' },
    }
]