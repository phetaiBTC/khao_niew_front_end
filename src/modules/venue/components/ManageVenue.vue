<template>
    <a-modal v-model:open="localOpen" :footer="null" @ok="onClose" @cancel="onClose" :width="'400px'" centered>
        <template #title>
            <h1 class="text-xl text-center" style="font-weight: 900;">{{ $t('add') + ' ' + $t('user') }}</h1>
        </template>
        <a-form layout="vertical" ref="formRef" :model="formState" :rules="rulesVenue" @finish="onSumit">
            <a-row :gutter="[16, 0]">
                <a-divider
                    style="margin: 0 !important; color: var(--ant-primary-color); border-color: var(--ant-primary-color);">
                    {{ $t('information') }}
                </a-divider>
                <a-col :span="24">
                    <FormInputString label="name" v-model="formState.name" :placeholder="$t('name')"
                        :prefix="AimOutlined" />
                </a-col>
                <a-col :span="24">
                    <FormInputString label="address" v-model="formState.address" :placeholder="$t('address')"
                        :prefix="FullscreenOutlined" />
                </a-col>
                <a-col :span="12">
                    <a-form-item name="latitude" :label="$t('latitude')">
                        <a-input-number v-model:value="formState.latitude" :placeholder="$t('latitude')"
                            style="width: 100%;"></a-input-number>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="longitude" :label="$t('longitude')">
                        <a-input-number v-model:value="formState.longitude" :placeholder="$t('longitude')"
                            style="width: 100%;"></a-input-number>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <div class="flex justify-end gap-2">
                        <a-button @click="onClose">{{ $t('cancel') }}</a-button>
                        <a-button type="primary" htmlType="submit" :loading="loadingVenue">{{ $t('save')
                            }}</a-button>
                    </div>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import FormInputString from '@/components/FormInputString.vue';
import { AimOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
import { computed, reactive, ref, watch } from 'vue';
import type { IVenue, venueEntity } from '../types';
import { useVenue } from '../composables/useVenue';
import { rulesVenue } from '../rules.ts';

const { createVenue, updateVenue, loadingVenue } = useVenue()
const formRef = ref()
const props = defineProps<{
    open: boolean,
    data: venueEntity | null
}>()
const emit = defineEmits(['isOpen'])

const formState = reactive<IVenue>({
    id: null,
    name: '',
    address: '',
    latitude: 0,
    longitude: 0
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
            formState.name = value.name
            formState.address = value.address
            formState.latitude = value.latitude
            formState.longitude = value.longitude
        }
    }
)
const onClose = () => {
    formRef.value?.resetFields()
    emit('isOpen', false)
}
const onSumit = async () => {
    if (props.data) {
        await updateVenue(formState)
    } else {
        await createVenue(formState)
    }
    onClose()
}
</script>

<style scoped></style>