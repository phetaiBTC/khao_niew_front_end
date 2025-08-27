// router/authGuard.ts
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
export function authGuard(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
    const authStore = useAuthStore() // เรียกใช้ภายใน guard
    if (to.meta.public_auth) {
        next()
    } else if (!authStore.isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
}

