import { clientApi } from "@/plugins/axiosPlugin"
import { message } from "ant-design-vue"
import { useUserStore } from "../store/useUserStore"
import { storeToRefs } from "pinia"
import type { Params } from "@/common/interface/paramsPaginate"
export const useUser = () => {
    const { UserList, loadingUser, params } = storeToRefs(useUserStore())
    const fetchUserList = async () => {
        loadingUser.value = true
        try {
            const { data } = await clientApi.get('/users', { params: params.value })
            UserList.value = data
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
        finally {
            loadingUser.value = false
        }
    }
    const setQuery = (newParams: Params) => {
        params.value.page = newParams.page ?? params.value.page
        params.value.per_page = newParams.per_page ?? params.value.per_page
        params.value.search = newParams.search ?? params.value.search
        params.value.type = newParams.type ?? params.value.type
    }

    return {
        UserList,
        loadingUser,
        fetchUserList,
        setQuery
    }
}