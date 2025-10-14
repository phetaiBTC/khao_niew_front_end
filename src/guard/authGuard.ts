// router/authGuard.ts
import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();

  // ✅ 1. ถ้า route นี้ public ก็ปล่อยผ่านได้เลย
  if (to.meta.public_auth) {
    return next();
  }

  // ✅ 2. ถ้ายังไม่ login ให้ redirect ไปหน้า Login
  if (!authStore.isAuthenticated) {
    return next({ name: "Login" });
  }

  // ✅ 3. ตรวจสิทธิ์ role แล้ว redirect เฉพาะตอนเข้าหน้าไม่ตรง role
  if (authStore.role === "admin" && to.name !== "dashboard") {
    return next({ name: "dashboard" });
  }

  if (authStore.role === "company" && to.name !== "company.concert") {
    return next({ name: "company.concert" });
  }

  // ✅ 4. ผ่านทุกเงื่อนไขแล้ว ปล่อยให้เข้าได้
  return next();
}
