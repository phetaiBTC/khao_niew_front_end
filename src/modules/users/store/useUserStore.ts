import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserEntity } from "../type";
import type { Params } from "@/common/interface/paramsPaginate";
export const useUserStore = defineStore("userStore", () => {
    const loadingUser = ref<boolean>(false)
    const UserList = ref<UserEntity[]>()
    const params = ref<Params>({ page: 1, per_page: 10, search: '', type: 'paginate' })
    return {
        loadingUser,
        UserList,
        params
    }
});