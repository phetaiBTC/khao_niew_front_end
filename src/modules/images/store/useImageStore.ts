import { defineStore } from "pinia";
import { ref } from "vue";
import type { ImageEntity } from "../types";

export const useImageStore = defineStore("imageStore", () => {
    const loadingImage = ref<boolean>(false)
    const image = ref<ImageEntity>()
    const imagesList = ref<number[]>([])
    return {
        loadingImage,
        imagesList,
        image
    }
}); 