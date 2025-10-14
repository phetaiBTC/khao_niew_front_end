import type { RouteRecordRaw } from 'vue-router'
import ProfileIndex from './pages/Index.vue'
export const CompanyAboutUstRouter: RouteRecordRaw[] = [
    {
        path: 'aboutus',
        name: 'company.aboutus',
        component: ProfileIndex,
        meta: { title: 'Profile' },
    }
]