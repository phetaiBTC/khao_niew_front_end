// guard/roleGuard.ts
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function roleGuard(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const authStore = useAuthStore()

    if (!to.meta.role) {
        return next()
    }

    if (to.meta.role === authStore.role) {
        return next()
    }

    next({ name: 'authorized' })
}
