import type { RouteRecordRaw } from 'vue-router';

export const ScanRouter: RouteRecordRaw[] = [
    {
        path: '/scan',
        name: 'scan',
        component: () => import('./pages/Index.vue'),
        meta: { title: 'Scan' }
    }
]