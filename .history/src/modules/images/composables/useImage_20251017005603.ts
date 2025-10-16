import { clientApi } from "@/plugins/axiosPlugin"
import { message } from "ant-design-vue"
import { storeToRefs } from "pinia"

import { useImageStore } from "../store/useImageStore"
import type { IImage, ImageEntity } from "../types"

export const useImage = () => {
    const { imagesList } = storeToRefs(useImageStore())
    const createImage = async (req: IImage) => {
        try {
            const formData = new FormData()
            if (req.file) {
                formData.append('files', req.file)
            }
            const { data } = await clientApi.post('/images', formData)
            data.forEach((element: ImageEntity) => {
                imagesList.value.push(element.id)
            });
            console.log(imagesList.value);
        } catch (error: any) {
            message.error(error.response.data.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }
    const deleteImage = async (id: number) => {
        try {
          
            
            const response = await clientApi.delete(`/images/${id}`)
            console.log("Delete response:", response);
            
            message.success("ລົບຮູບພາບສຳເລັດແລ້ວ")
        } catch (error: any) {
            console.error("Delete image error:", error);
            console.error("Error response:", error.response);
            console.error("Error response data:", error.response?.data);
            console.error("Error status:", error.response?.status);
            console.error("Error message:", error.response?.data?.message);
            
            const errorMessage = error.response?.data?.message || 
                               error.response?.data?.error || 
                               error.message || 
                               "ເກີດຂໍ້ຜິດພາດໃນການລົບຮູບພາບ";
            
            message.error(errorMessage);
            throw error; // Re-throw so the calling function knows it failed
        }
    }

    return {
        createImage,
        deleteImage,
        imagesList
    }
}
