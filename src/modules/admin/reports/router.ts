import type { RouteRecordRaw } from 'vue-router'
import ReportYear from './pages/year.vue'
export const ReportsRouter: RouteRecordRaw[] = [
    {
        path: 'report',
        name: 'report.year',
        component: ReportYear,
        meta: { title: 'Report' }
    }
]