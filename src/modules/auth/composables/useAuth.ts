import { clientApi } from "@/plugins/axiosPlugin";
import { message } from "ant-design-vue";
import { useAuthStore } from "../store/useAuthStore";
import { storeToRefs } from "pinia";
import router from "@/router";
export const useAuth = () => {
  const authStore = useAuthStore();
  const { loadingAuth, user } = storeToRefs(useAuthStore());
  const Login = async (fromState: {
    email: string;
    password: string;
  }): Promise<void> => {
    loadingAuth.value = true;
    try {
      const { data } = await clientApi.post("/auth/login", fromState);
      authStore.login(data);
      if (authStore.role === "admin") {
        await router.push({ name: "dashboard" });
      } else if (authStore.role === "company") {
        await router.push("/companies/concert");
      }
      message.success("ລ໊ອກອິນສຳເລັດ");
    } catch (error: any) {
      message.error(error.response.data.message || "ລ໊ອກອິນບໍ່ສຳເລັດ");
    } finally {
      loadingAuth.value = false;
    }
  };

  const profile = async () => {
    try {
      const { data } = await clientApi.get("/auth/profile");
      user.value = data;
    } catch (error: any) {
      message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ");
    }
  };
  return {
    Login,
    loadingAuth,
    profile,
  };
};
