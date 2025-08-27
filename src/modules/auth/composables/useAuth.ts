import { clientApi } from "@/plugins/axiosPlugin"
import { message } from "ant-design-vue"
import { useAuthStore } from "../store/useAuthStore"
import { storeToRefs } from "pinia"
import { router } from "@/router"
export const useAuth = () => {
    const { loadingAuth } = storeToRefs(useAuthStore())
    const Login = async (fromState: { email: string, password: string }): Promise<void> => {
        loadingAuth.value = true
        try {
            const { data } = await clientApi.post('/auth/login', fromState)
            localStorage.setItem('token', data.access_token)
            message.success("ລ໊ອກອິນສຳເລັດ")
            await router.push({ name: "user" })
        } catch (error: any) {
            message.error(error.response.data.message || "ລ໊ອກອິນບໍ່ສຳເລັດ")
        }
        finally {
            loadingAuth.value = false
        }
    }
    return {
        Login,
        loadingAuth
    }
}