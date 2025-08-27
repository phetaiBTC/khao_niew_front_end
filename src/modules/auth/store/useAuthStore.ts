import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
    const loadingAuth = ref<boolean>(false)
    const token = ref(localStorage.getItem('token') || '')
    // const user = ref<{ name: string; email: string } | null>(null)
    const isAuthenticated = computed(() => !!token.value)
    function login(newToken: string) {
        token.value = newToken
        localStorage.setItem('token', newToken)
    }

    function logout() {
        token.value = ''
        localStorage.removeItem('token')
    }
    return {
        loadingAuth,
        token,
        isAuthenticated,
        login,
        logout
    }
});