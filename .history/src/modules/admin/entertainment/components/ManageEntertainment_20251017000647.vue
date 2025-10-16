<template>
    <a-modal v-model:open="localOpen" :footer="null" @ok="onClose" @cancel="onClose" :width="'400px'" centered>
        <template #title>
            <h1 class="text-xl text-center" style="font-weight: 900;">{{ $t('add') + ' ' + $t('entertainment') }}</h1>
        </template>
        <a-form layout="vertical" ref="formRef" :model="formState" :rules="rulesEntertainment" @finish="onSumit">
            <a-row>
                <a-divider
                    style="margin: 0 !important; color: var(--ant-primary-color); border-color: var(--ant-primary-color);">
                    {{ $t('entertainment') }}
                </a-divider>
                <a-col :span="24">
                    <FormInputString label="title" v-model="formState.title" :placeholder="$t('title')"
                        :prefix="BulbOutlined" />
                </a-col>
                <a-col :span="24">
                    <a-form-item :label="$t('description')" name="description">
                        <a-textarea v-model:value="formState.description" placeholder="..." allow-clear />
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-upload v-model:file-list="fileList" name="file" :custom-request="handleUpload">
                        <a-button>
                            <UploadOutlined /> เลือกไฟล์
                        </a-button>
                    </a-upload>
                </a-col>
                <a-col :span="24">
                    <div class="w-full overflow-x-auto my-5">
                        <div class="flex flex-nowrap gap-3 flex-row">
                            <div
                                v-for="image in props.data?.images"
                                :key="image.id"
                                class="relative flex-shrink-0"
                            >
                                <!-- The image with relative positioning -->
                                <div class="relative w-[120px] h-[120px] rounded-lg overflow-hidden">
                                    <a-image
                                        :src="image.url"
                                        :preview="true"
                                        style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;"
                                    />
                                    
                                    <!-- Delete button positioned absolutely inside the image -->
                                    <button
                                        @click="handleDeleteImage(image.id as number)"
                                        class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg z-10 transition-all duration-200"
                                        style="border: 2px solid white;"
                                    >
                                        <CloseOutlined style="font-size: 12px;" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </a-col>
                <a-col :span="24">
                    <div class="flex justify-end gap-2">
                        <a-button @click="onClose">{{ $t('cancel') }}</a-button>
                        <a-button type="primary" htmlType="submit" :loading="loadingEntertainment">{{ $t('save')
                            }}</a-button>
                    </div>
                </a-col>
            </a-row>    
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import FormInputString from '@/components/FormInputString.vue';
import { BulbOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { computed, reactive, ref, watch } from 'vue';
import { rulesEntertainment } from '../rules';
import type { IEntertainment, EntertainmentEntity } from '../types';
import { useEntertainment } from '../composables/useEntertainment';
import { useImage } from '@/modules/images/composables/useImage';
const fileList = ref([]);
const { createImage, deleteImage } = useImage()
const { createEntertainment, updateEntertainment, loadingEntertainment } = useEntertainment()
const formRef = ref()
const props = defineProps<{
    open: boolean,
    data: EntertainmentEntity | null
}>()
const emit = defineEmits(['isOpen'])

const handleUpload = async (options: any) => {
    try {
        await createImage({ file: options.file })
        options.onSuccess()
    } catch (error) {
        console.error(error)
        options.onError()
    }
};

const handleDeleteImage = async (id: number) => {
    try {
        console.log("Deleting image with ID:", id);
        console.log("Current props.data:", props.data);
        console.log("Image to delete:", props.data?.images.find(img => img.id === id));
        
        await deleteImage(id);
        
        // Update the formState.imageIds to remove the deleted image ID
        if (formState.imageIds) {
            formState.imageIds = formState.imageIds.filter(imageId => imageId !== id);
        }
        
        // If props.data exists, update it locally to remove the deleted image
        if (props.data && props.data.images) {
            props.data.images = props.data.images.filter((img: any) => img.id !== id);
        }
        
        console.log('Delete image with id success:', id);
        console.log("Updated imageIds:", formState.imageIds);
    } catch (error) {
        console.error('Error deleting image:', error);
        // Handle the error here
    }
};


const formState = reactive<IEntertainment>({
    id: null,
    title: '',
    description: '',
    imageIds: []
})
const localOpen = computed({
    get: () => props.open,
    set: (val) => emit('isOpen', val)
})
watch(
    () => props.data,
    (value) => {
        if (value) {
            formState.id = value.id
            formState.description = value.description
            formState.title = value.title
            formState.imageIds = value.images.map((item: any) => item.id)
        }
    }
)
const onClose = () => {
    formRef.value?.resetFields()
    emit('isOpen', false)
    fileList.value = []
}
const onSumit = async () => {
    if (props.data) {
        await updateEntertainment(formState)
    } else {
        await createEntertainment(formState)
    }
    onClose()
}
</script>

<style scoped>

</style>

