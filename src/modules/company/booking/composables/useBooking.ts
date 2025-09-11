import { clientApi } from "@/plugins/axiosPlugin"
import { message } from "ant-design-vue"
// import { storeToRefs } from "pinia"
import { useBookigStore } from "../store"
import { storeToRefs } from "pinia"

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
    return {
        createBooking,
        fetchBookingList,
        BookingList,
        loadingUser,
    }
}