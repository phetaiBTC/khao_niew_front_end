import { clientApi } from "@/plugins/axiosPlugin"
import { message } from "ant-design-vue"
import { useVenueStore } from "../store/useVenueStore"
import { storeToRefs } from "pinia"
import type { Params } from "@/common/interface/paramsPaginate"
import type { IVenue, venueEntity } from "../types"
export const useVenue = () => {
    const { VenueList, loadingVenue, params, optionVenue } = storeToRefs(useVenueStore())
    const fetchVenueList = async () => {
        loadingVenue.value = true
        try {
            const { data } = await clientApi.get('/venues', { params: params.value })
            VenueList.value = data
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
        finally {
            loadingVenue.value = false
        }
    }
    const setQuery = async (newParams: Params) => {
        params.value.page = newParams.page ?? params.value.page
        params.value.per_page = newParams.per_page ?? params.value.per_page
        params.value.search = newParams.search ?? params.value.search
        params.value.type = newParams.type ?? params.value.type
        params.value.order_by = newParams.order_by ?? params.value.order_by
        await fetchVenueList()
    }

    const deleteVenue = async (id: number) => {
        try {
            const { data } = await clientApi.delete(`/venues/${id}`)
            await fetchVenueList()
            message.success(data.message || "ລົບຂໍ້ມູນສໍາເລັດ")

        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    const createVenue = async (formData: IVenue) => {
        try {
            const { id, ...rest } = formData
            const { data } = await clientApi.post('/venues', rest)
            await fetchVenueList()
            message.success(data.message || "ບັນທຶກຂໍ້ມູນສໍາເລັດ")
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    const updateVenue = async (formData: IVenue) => {
        try {
            const { id, ...rest } = formData
            const { data } = await clientApi.patch(`/venues/${formData.id}`, rest)
            await fetchVenueList()
            message.success(data.message || "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ")
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    const getOptionsVenue = async () => {
        const { data } = await clientApi.get('/venues', { params: { search: '', type: 'all' } })
        optionVenue.value = data.data.map((item: venueEntity) => ({ value: item.id, label: item.name }))
    }
    return {
        VenueList,
        loadingVenue,
        fetchVenueList,
        setQuery,
        deleteVenue,
        createVenue,
        updateVenue,
        getOptionsVenue,
        optionVenue
    }
}