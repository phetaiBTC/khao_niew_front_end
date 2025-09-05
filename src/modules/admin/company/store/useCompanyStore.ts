import { defineStore } from "pinia";
import { ref } from "vue";
import type { CompanyEntity } from "../type";
import type { PaginateEntity, Params } from "@/common/interface/paramsPaginate";
export const useCompanyStore = defineStore("companyStore", () => {
    const loadingCompany = ref<boolean>(false)
    const CompanyList = ref<PaginateEntity<CompanyEntity>>({ data: [], pagination: { page: 1, per_page: 10, total: 0, total_pages: 0 } })
    const params = ref<Params>({ page: 1, per_page: 6, search: '', type: 'paginate', order_by: 'DESC' })

    return {
        loadingCompany,
        CompanyList,
        params
    }
}); 