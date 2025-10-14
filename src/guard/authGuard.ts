// router/authGuard.ts
import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();

  // ✅ 1. route สาธารณะ (ไม่ต้อง login)
  if (to.meta.public_auth) {
    return next();
  }

  // ✅ 2. ยังไม่ login → ไปหน้า Login
  if (!authStore.isAuthenticated) {
    return next({ name: "Login" });
  }

  // ✅ 3. ถ้ามีการกำหนด role ที่อนุญาตไว้ใน meta (ยืดหยุ่นกว่า)
  if (to.meta.roles && Array.isArray(to.meta.roles)) {
    const allowedRoles = to.meta.roles as string[];
    if (!allowedRoles.includes(authStore.role)) {
      // 🔒 ถ้า role ไม่ตรง → redirect ไปหน้าหลักของ role นั้น
      const redirectMap: Record<string, string> = {
        admin: "dashboard",
        company: "company.concert",
      };
      const redirectTo = redirectMap[authStore.role] || "Login";
      return next({ name: redirectTo });
    }
  }

  // ✅ 4. ผ่านทุกเงื่อนไข → เข้าได้
  return next();
}
