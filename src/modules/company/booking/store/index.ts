import { defineStore } from "pinia";
import { ref } from "vue";
import type { BookingEntity } from "../types";
import type { PaginateEntity, Params } from "@/common/interface/paramsPaginate";
export interface BookingQuery extends Params {
    status?: string
    companyId?: number
}
export const useBookigStore = defineStore("bookginStore", () => {
    const loadingBooking = ref<boolean>(false)
    const Booking = ref<BookingEntity | null>(null)
    const BookingList = ref<PaginateEntity<BookingEntity>>({ data: [], pagination: { page: 1, per_page: 10, total: 0, total_pages: 0 } })
    const params = ref<BookingQuery>({ page: 1, per_page: 6, search: '', type: 'paginate', order_by: 'DESC', status: undefined })
    return {
        loadingBooking,
        BookingList,
        params,
        Booking
    }
}); 