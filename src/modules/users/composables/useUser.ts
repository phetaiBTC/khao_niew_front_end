import { clientApi } from "@/plugins/axiosPlugin"
import { message } from "ant-design-vue"
import { useUserStore } from "../store/useUserStore"
import { storeToRefs } from "pinia"
export const useUser = () => {
    const { UserList, loadingUser, params } = storeToRefs(useUserStore())
    const fetchUserList = async () => {
        try {
            loadingUser.value = true
            const { data } = await clientApi.get('/users', { params: params.value })
            UserList.value = data.data
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }

    return {
        UserList,
        loadingUser,
        fetchUserList
    }
}