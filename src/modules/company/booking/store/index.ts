import { defineStore } from "pinia";
import { ref } from "vue";
import type { BookingEntity } from "../types";
import type { PaginateEntity, Params } from "@/common/interface/paramsPaginate";
export const useBookigStore = defineStore("bookginStore", () => {
    const loadingUser = ref<boolean>(false)
    const BookingList = ref<PaginateEntity<BookingEntity>>({ data: [], pagination: { page: 1, per_page: 10, total: 0, total_pages: 0 } })
    const params = ref<Params>({ page: 1, per_page: 6, search: '', type: 'paginate', order_by: 'DESC' })

    return {
        loadingUser,
        BookingList,
        params
    }
}); 