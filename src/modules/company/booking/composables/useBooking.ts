import { clientApi } from "@/plugins/axiosPlugin"
import { message } from "ant-design-vue"
// import { storeToRefs } from "pinia"


export const useBooking = () => {
    const createBooking = async (formData: { concert: number, ticket_quantity: number }) => {
        try {
            const { data } = await clientApi.post('/booking/create', formData)
            message.success(data.message || "ບັນທຶກຂໍ້ມູນສໍາເລັດ")
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    return {
        createBooking,

    }
}