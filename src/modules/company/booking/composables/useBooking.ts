import { clientApi } from "@/plugins/axiosPlugin"
import { message } from "ant-design-vue"
// import { storeToRefs } from "pinia"
import { useBookigStore } from "../store"
import { storeToRefs } from "pinia"
import type { Params } from "@/common/interface/paramsPaginate"

export const useBooking = () => {
    const { BookingList, loadingUser, params } = storeToRefs(useBookigStore())

    const createBooking = async (formData: { concert: number, ticket_quantity: number }) => {
        try {
            const { data } = await clientApi.post('/booking/create', formData)
            message.success(data.message || "ບັນທຶກຂໍ້ມູນສໍາເລັດ")
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    const fetchBookingList = async () => {
        loadingUser.value = true
        try {
            const { data } = await clientApi.get('/booking/all-bookings', { params: params.value })
            BookingList.value = data
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
        finally {
            loadingUser.value = false
        }
    }
    const setQuery = async (newParams: Params) => {
        params.value.page = newParams.page ?? params.value.page
        params.value.per_page = newParams.per_page ?? params.value.per_page
        params.value.search = newParams.search ?? params.value.search
        params.value.type = newParams.type ?? params.value.type
        params.value.order_by = newParams.order_by ?? params.value.order_by

        await fetchBookingList()
    }
    return {
        createBooking,
        fetchBookingList,
        BookingList,
        loadingUser,
        setQuery
    }
}