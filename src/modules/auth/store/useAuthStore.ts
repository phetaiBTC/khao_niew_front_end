import type { UserEntity } from "@/modules/admin/users/type";
import router from "@/router";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const loadingAuth = ref<boolean>(false);
  const token = ref(localStorage.getItem("token") || "");
  const role = ref(localStorage.getItem("role") || "");
  const user = ref<UserEntity>();
  // const user = ref<{ name: string; email: string } | null>(null)
  const isAuthenticated = computed(() => !!token.value);
  function login(data: { access_token: string; role: string }) {
    token.value = data.access_token;
    role.value = data.role;
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("role", data.role);
  }

  function logout() {
    token.value = "";
    role.value = "";
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push({ name: "Login" });
  }
  return {
    loadingAuth,
    token,
    isAuthenticated,
    login,
    logout,
    role,
    user,
  };
});
