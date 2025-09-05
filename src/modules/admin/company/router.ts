import type { RouteRecordRaw } from 'vue-router';
import IndexCompany from './pages/Index.vue'
export const CompanyRouter: RouteRecordRaw[] = [
    {
        path: 'company',
        name: 'company',
        component: IndexCompany,
        meta: { title: 'Company' }
    }
]