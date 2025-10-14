import router from "@/router";
import axios from "axios";

export const clientApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Accept": "application/json",
    },
});

clientApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

clientApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            router.push({ name: "authorized" });
        }
        if (error.response.status === 403) {
            localStorage.removeItem("role");
            localStorage.removeItem("token");
            router.push({ name: "authorized" });
        }
        return Promise.reject(error);

    }
);
