import { defineStore } from "pinia";
import { ref } from "vue";
import type { PaginateEntity, Params } from "@/common/interface/paramsPaginate";
import type { EntertainmentEntity } from "../types";
import type { SelectProps } from "ant-design-vue";
export const useEntertainmentStore = defineStore("entertainmentStore", () => {
    const loadingEntertainment = ref<boolean>(false)
    const EntertainmentList = ref<PaginateEntity<EntertainmentEntity>>({ data: [], pagination: { page: 1, per_page: 10, total: 0, total_pages: 0 } })
    const params = ref<Params>({ page: 1, per_page: 6, search: '', type: 'paginate' })
    const optionEntertainment = ref<SelectProps['options']>([]);

    return {
        loadingEntertainment,
        EntertainmentList,
        params,
        optionEntertainment
    }
}); 