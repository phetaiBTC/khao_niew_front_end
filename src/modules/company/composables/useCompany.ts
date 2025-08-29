import { clientApi } from "@/plugins/axiosPlugin"
import { message } from "ant-design-vue"
import { useCompanyStore } from "../store/useCompanyStore"
import { storeToRefs } from "pinia"
import type { Params } from "@/common/interface/paramsPaginate"
import type { ICompany } from "../type"

export const useCompany = () => {
    const { CompanyList, loadingCompany, params } = storeToRefs(useCompanyStore())
    const fetchCompanyList = async () => {
        loadingCompany.value = true
        try {
            const { data } = await clientApi.get('/companies', { params: params.value })
            CompanyList.value = data
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
        finally {
            loadingCompany.value = false
        }
    }
    const setQuery = async (newParams: Params) => {
        params.value.page = newParams.page ?? params.value.page
        params.value.per_page = newParams.per_page ?? params.value.per_page
        params.value.search = newParams.search ?? params.value.search
        params.value.type = newParams.type ?? params.value.type
        await fetchCompanyList()
    }

    const deleteCompany = async (id: number) => {
        try {
            const { data } = await clientApi.delete(`/companies/${id}`)
            await fetchCompanyList()
            message.success(data.message || "ລົບຂໍ້ມູນສໍາເລັດ")

        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    const createCompany = async (formData: ICompany) => {
        try {
            const { id, ...rest } = formData
            const { data } = await clientApi.post('/companies', rest)
            await fetchCompanyList()
            message.success(data.message || "ບັນທຶກຂໍ້ມູນສໍາເລັດ")
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    const updateCompany = async (formData: ICompany) => {
        try {
            const { user, id, ...rest } = formData
            const { data } = await clientApi.patch(`/companies/${formData.id}`, rest)
            await fetchCompanyList()
            message.success(data.message || "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ")
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    return {
        CompanyList,
        loadingCompany,
        fetchCompanyList,
        setQuery,
        deleteCompany,
        createCompany,
        updateCompany
    }
}