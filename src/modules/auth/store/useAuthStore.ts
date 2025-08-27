import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
    const loadingAuth = ref<boolean>(false)

    return {
        loadingAuth
    }
});