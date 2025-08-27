import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserEntity } from "../type";
import type { PaginateEntity, Params } from "@/common/interface/paramsPaginate";
export const useUserStore = defineStore("userStore", () => {
    const loadingUser = ref<boolean>(false)
    const UserList = ref<PaginateEntity<UserEntity>>({ data: [], pagination: { page: 1, per_page: 10, total: 0, total_pages: 0 } })
    const params = ref<Params>({ page: 1, per_page: 5, search: '', type: 'paginate' })
    return {
        loadingUser,
        UserList,
        params
    }
});