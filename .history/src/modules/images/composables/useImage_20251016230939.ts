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

    return {
        createImage,
        imagesList
    }
}
