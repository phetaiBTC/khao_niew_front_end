<template>
    <a-modal v-model:open="localOpen" :footer="null" @ok="onClose" @cancel="onClose" :width="'400px'" centered>
        <template #title>
            <h1 class="text-xl text-center" style="font-weight: 900;">{{ $t('add') + ' ' + $t('concert') }}</h1>
        </template>
        <a-form layout="vertical" ref="formRef" :model="formState" :rules="rulesConcert" @finish="onSumit">
            <a-row :gutter="[16, 0]">
                <a-divider
                    style="margin: 0 !important; color: var(--ant-primary-color); border-color: var(--ant-primary-color);">
                    {{ $t('information') }}
                </a-divider>
                <a-col :span="12">
                    <a-form-item name="date" :label="$t('date')">
                        <a-date-picker v-model:value="formState.date" class="w-full" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="price" :label="$t('price')">
                        <a-input-number v-model:value="formState.price" :placeholder="$t('price')" style="width: 100%;"
                            addon-after="Kip"
                            :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="(value: any) => value.replace(/\$\s?|(,*)/g, '')"
                            :controls="false"></a-input-number>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="startTime" :label="$t('startTime')">
                        <a-time-picker v-model:value="formState.startTime" format="HH:mm" class="w-full" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="endTime" :label="$t('endTime')">
                        <a-time-picker v-model:value="formState.endTime" format="HH:mm" class="w-full" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="limit" :label="$t('limit')">
                        <a-input-number v-model:value="formState.limit" :placeholder="$t('limit')" style="width: 100%;"
                            :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="(value: any) => value.replace(/\$\s?|(,*)/g, '')">
                            <template #addonAfter>
                                <UsergroupAddOutlined></UsergroupAddOutlined>
                            </template>
                        </a-input-number>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="venue" :label="$t('venue')">
                        <a-select v-model:value="formState.venueId" :placeholder="$t('venue')" :options="optionVenue">
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item name="entertainment" :label="$t('entertainment')">
                        <a-select v-model:value="formState.entertainmentIds" :options="optionEntertainment"
                            mode="multiple" :placeholder="$t('entertainment')"></a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <div class="flex justify-end gap-2">
                        <a-button @click="onClose">{{ $t('cancel') }}</a-button>
                        <a-button type="primary" htmlType="submit" :loading="loadingConcert">{{ $t('save')
                            }}</a-button>
                    </div>
                </a-col>
                {{ typeof (dayjs(formState.date).format('YYYY-MM-DD')) }}
            </a-row>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, onMounted } from 'vue';
import { rulesConcert } from '../rules';
import dayjs from 'dayjs';
import type { IConcert, ConcertEntity } from '../types';
import { useConcert } from '../composables/useConcert';
import { UsergroupAddOutlined } from '@ant-design/icons-vue';
import { useVenue } from '@/modules/venue/composables/useVenue';
import { useEntertainment } from '@/modules/entertainment/composables/useEntertainment';

const { optionVenue, getOptionsVenue } = useVenue()
const { optionEntertainment, getOptionsEntertainment } = useEntertainment()
const { createConcert, updateConcert, loadingConcert } = useConcert()
const formRef = ref()
const props = defineProps<{
    open: boolean,
    data: ConcertEntity | null
}>()
const emit = defineEmits(['isOpen'])

const formState = reactive<IConcert>({
    id: null,
    startTime: dayjs('16:00', 'HH:mm'),
    endTime: dayjs('16:00', 'HH:mm'),
    price: null,
    limit: 0,
    date: dayjs(),
    status: 'open',
    venueId: null,
    entertainmentIds: []
})
const localOpen = computed({
    get: () => props.open,
    set: (val) => emit('isOpen', val)
})
watch(
    () => props.data,
    (value) => {
        if (value) {
            console.log(typeof (value.date))
            formState.startTime = dayjs(value.startTime, 'HH:mm')
            formState.endTime = dayjs(value.endTime, 'HH:mm')
            formState.date = dayjs(value.date)
            formState.id = value.id
            formState.price = value.price
            formState.limit = value.limit
            formState.status = value.status
            formState.venueId = value.venue.id ? value.venue.id : null
            formState.entertainmentIds = value.entertainments ? value.entertainments.map((item: any) => item.id) : []
        }
    }
)
const onClose = () => {
    formRef.value?.resetFields()
    emit('isOpen', false)
}
const onSumit = async () => {
    if (props.data) {
        await updateConcert({
            ...formState,
            date: dayjs(formState.date).format('YYYY-MM-DD'),
            startTime: dayjs(formState.startTime).format('HH:mm'),
            endTime: dayjs(formState.endTime).format('HH:mm')
        })
    } else {
        await createConcert({
            ...formState,
            date: dayjs(formState.date).format('YYYY-MM-DD'),
            startTime: dayjs(formState.startTime).format('HH:mm'),
            endTime: dayjs(formState.endTime).format('HH:mm')
        })
    }
    onClose()
}

onMounted(async () => {
    await getOptionsVenue()
    await getOptionsEntertainment()
})
</script>

<style scoped></style>