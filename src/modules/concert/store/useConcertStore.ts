import { defineStore } from "pinia";
import { ref } from "vue";
import type { ConcertEntity } from "../types";
import type { PaginateEntity, Params } from "@/common/interface/paramsPaginate";
export const useConcertStore = defineStore("concertStore", () => {
    const loadingConcert = ref<boolean>(false)
    const ConcertList = ref<PaginateEntity<ConcertEntity>>({ data: [], pagination: { page: 1, per_page: 10, total: 0, total_pages: 0 } })
    const params = ref<Params>({ page: 1, per_page: 6, search: '', type: 'paginate' })
    return {
        loadingConcert,
        ConcertList,
        params
    }
}); 