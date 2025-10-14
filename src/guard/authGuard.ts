import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import { storeToRefs } from "pinia";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // const authStore = useAuthStore();
  const { isAuthenticated, role } = storeToRefs(useAuthStore());
  // ✅ 1. หน้า public (ไม่ต้อง login)
  if (to.meta.public_auth) {
    // ถ้าไปหน้า Login แต่ token ยังอยู่ → redirect ตาม role
    if (to.name === "Login" && isAuthenticated.value) {
      console.log(role.value);
      const roleRedirectMap: Record<string, string> = {
        admin: "dashboard",
        company: "company.concert",
      };
      const redirectTo = roleRedirectMap[role.value] || "dashboard";
      return next({ name: redirectTo });
    }

    return next(); // เข้า page public ได้
  }

  // ✅ 2. ถ้ายังไม่ได้ login → ไป Login
  if (!isAuthenticated.value) {
    return next({ name: "login" });
  }

  // ✅ 3. ตรวจ role ถ้ามี meta.roles
  if (to.meta.roles && Array.isArray(to.meta.roles)) {
    const allowedRoles = to.meta.roles as string[];
    if (!allowedRoles.includes(role.value)) {
      const redirectMap: Record<string, string> = {
        admin: "dashboard",
        company: "company.concert",
      };
      const redirectTo = redirectMap[role.value] || "login";
      return next({ name: redirectTo });
    }
  }

  // ✅ 4. ผ่านทุกเงื่อนไข → เข้าได้
  return next();
}
