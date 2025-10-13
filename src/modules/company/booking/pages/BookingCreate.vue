<template>
    <div class="flex flex-col items-center gap-4 p-4" v-if="Concert">
        <img src="/src/assets/images/qr.jpg" alt="" width="60%">
        <a-tag color="blue">
            <h1 class="text-xl">
                ວັນທີ: {{ Concert?.date }}
            </h1>
        </a-tag>
        <div class="flex flex-col items-start gap-2 w-full">
            <h1>
                {{ $t('entertainment') }} : <a-tag v-for="item in Concert.entertainments">{{ item.title }}</a-tag>
            </h1>
            <h1>
                {{ $t('venue') }} : {{ Concert.venue.name }} - {{ Concert.venue.address }} <a
                    :href="`https://www.google.com/maps/search/?api=1&query=${Concert.venue.latitude},${Concert.venue.longitude}`"
                    target="_blank" style="color: red;">
                    <AimOutlined class="ml-2" />
                </a>
            </h1>
            <h1>
                {{ $t('status') }} : <a-tag :color="Concert.status === 'open' ? 'green' : 'red'">{{ Concert.status
                }}</a-tag>
            </h1>
            <h1>
                {{ $t('price') }} : <a-tag color="gold">{{ Concert.price.toLocaleString() + ' kip' }}/{{ $t('seat')
                }}</a-tag>
            </h1>
            <h1>
                {{ $t('seat') }} : {{ Concert.totalTicket }} / {{ Concert.limit }}
            </h1>
            <h1>
                {{ $t('Show_time') }} : {{ Concert.startTime }} - {{ Concert.endTime }}
            </h1>
            <div>
                <a-carousel autoplay>
                    <div v-for="item in listImages">
                        <!-- {{ base_api + item }} -->

                        <img :src="base_api + item" alt="..." class="w-full h-96 object-cover rounded-lg" />
                    </div>
                </a-carousel>

            </div>
        </div>

        <a-form class="sticky bottom-0 flex items-center flex-col gap-3 left-0 w-full bg-white"
            style="padding: 5px 5px;" ref="formRef" :model="formState" @finish="showPropsConfirm">
            <a-tag color="green" style="font-size: 1.2rem;width: 100%;padding: 10px;">
                {{ $t('total_price') }} : {{ (Concert.price * formState.ticket_quantity).toLocaleString() }} kip
            </a-tag>
            <div class="w-full flex flex-row gap-2" v-if="!isToken">
                <a-form-item name="email" :label="$t('email')" :rules="[{ required: true }, { type: 'email' }]">
                    <a-input v-model:value="formState.email" :placeholder="$t('name')" />
                </a-form-item>
                <a-form-item name="phone" :label="$t('phone')" :rules="[{ required: true }]">
                    <a-input v-model:value="formState.phone" :placeholder="$t('phone')" />
                </a-form-item>
            </div>
            <div class="flex justify-between items-center w-full">
                <a-upload v-model:file-list="fileList" name="file" :custom-request="handleUpload">
                    <a-button>
                        <UploadOutlined /> เลือกไฟล์
                    </a-button>
                </a-upload>
                <div>
                    <a-space-compact block>
                        <a-button type="primary"
                            @click="() => { if (Concert && formState.ticket_quantity > 1) formState.ticket_quantity-- }"
                            :disabled="formState.ticket_quantity === 1">
                            -
                        </a-button>
                        <a-input-number v-model:value="formState.ticket_quantity" :min="1" :max="Concert.limit"
                            style="width: 40px;" />
                        <a-button type="primary"
                            @click="() => { if (Concert && formState.ticket_quantity < Concert.limit) formState.ticket_quantity++ }"
                            :disabled="Concert.limit === formState.ticket_quantity">
                            +
                        </a-button>
                    </a-space-compact>
                </div>
            </div>
            <a-button type="primary" class="w-full mt-2" size="large" htmlType="submit"
                :disabled="Concert.limit === Concert.totalTicket || imagesList.length === 0">
                {{ $t('book_now') }}
            </a-button>
        </a-form>
    </div>

</template>

<script setup lang="ts">
import { computed, createVNode, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useConcert } from '@/modules/admin/concert/composables/useConcert'
import { AimOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { useBooking } from '../composables/useBooking'
import type { IBooking } from '../types'
import { Modal } from 'ant-design-vue'
import { tI18n } from '@/common/utils/i18n'
import { useImage } from '@/modules/images/composables/useImage'
import { jwtDecode } from 'jwt-decode'

const base_api = import.meta.env.VITE_API_BASE_URL
const { createBooking } = useBooking()
const formRef = ref()
const isToken = computed(() => localStorage.getItem('token'))
const formState = reactive<IBooking>({
    concert: null,
    ticket_quantity: 1
})
const fileList = ref([]);
const { createImage, imagesList } = useImage()
const handleUpload = async (options: any) => {
    try {
        await createImage({ file: options.file })
        options.onSuccess()
    } catch (error) {
        console.error(error)
        options.onError()
    }
};
const { fetchConcert, Concert } = useConcert()
const route = useRoute()
const concertId = route.params.concert_id
const listImages = computed(() =>
    Concert.value?.entertainments.flatMap(e => e.images.map(i => i.url)) ?? []
)

const onSumit = async () => {
    if (Number(concertId)) {
        if (isToken.value) {
            formState.userId = jwtDecode<any>(isToken.value).id
        }
        formState.concert = Number(concertId)
        await createBooking(formState)
        await fetchConcert(Number(concertId))
    }
}
onMounted(async () => {
    await fetchConcert(Number(concertId))
})

const showPropsConfirm = () => {
    Modal.confirm({
        title: 'Confirm Booking',
        icon: createVNode(ExclamationCircleOutlined),
        content: 'Are you sure to book ' + formState.ticket_quantity + ' ticket(s)?',
        okText: tI18n('yes'),
        cancelText: tI18n('cancel'),
        centered: true,
        async onOk() {
            await onSumit()
            // router.push({ name: 'company.booking.index' })
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};
</script>

<style scoped></style>