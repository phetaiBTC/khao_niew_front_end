import { defineStore } from "pinia";
import { ref } from "vue";
import type { venueEntity } from "../types";
import type { PaginateEntity, Params } from "@/common/interface/paramsPaginate";
import type { SelectProps } from "ant-design-vue";
export const useVenueStore = defineStore("venueStore", () => {
    const loadingVenue = ref<boolean>(false)
    const VenueList = ref<PaginateEntity<venueEntity>>({ data: [], pagination: { page: 1, per_page: 10, total: 0, total_pages: 0 } })
    const params = ref<Params>({ page: 1, per_page: 6, search: '', type: 'paginate', order_by: 'DESC' })

    const optionVenue = ref<SelectProps['options']>([]);
    return {
        loadingVenue,
        VenueList,
        params,
        optionVenue
    }
}); 