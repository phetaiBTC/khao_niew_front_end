<template>
    <div>

        <a-row :gutter="[0, 20]">
            <div class="flex justify-end items-center p-2">
                <a-input-search v-model:value="search" placeholder="ຄົ້ນຫາ..." @search="onSearch" v-if="!token" />
                <a-select v-model:value="status" :placeholder="$t('status')"
                    @change="setQuery({ status: status ? status : '', page: 1 })">
                    <a-select-option value="pending">{{ $t('pending') }}</a-select-option>
                    <a-select-option value="success">{{ $t('success') }}</a-select-option>
                    <a-select-option value="failed">{{ $t('failed') }}</a-select-option>
                </a-select>
            </div>
            <a-col :span="24" v-if="loadingBooking">
                <a-card class="m-1" :loading="loadingBooking" v-if="loadingBooking">whatever content</a-card>
            </a-col>
            <a-col :span="24" v-for="item in BookingList.data" v-if="!loadingBooking">
                <div class="flex justify-between items-center rounded-xl flex-col overflow-hidden m-1"
                    style="box-shadow: 0px 2px 10px #8A959e;">
                    <div class="p-4 w-full flex flex-col gap-2">
                        <div class="flex items-center justify-between w-full">
                            <div class="text-xl font-bold">
                                ລາຍການຈອງ : <a-tag color="blue">#{{ item.id }}</a-tag>
                            </div>
                            <a-tag
                                :color="item.payment.status === 'pending' ? 'gold' : item.payment.status === 'success' ? 'green' : 'red'">{{
                                    $t(item.payment.status) }}</a-tag>
                        </div>
                        <div class=" bg-blue-100 w-full p-2 my-2 rounded-lg border border-blue-300">
                            <h1 style="font-weight: bold;">ຂໍ້ມູນການສະແດງ</h1>
                            <h1>ວັນທີ: {{ dayjs(item.concert.date).format('DD-MM-YYYY') }}</h1>
                            <h1>ເວລາຈັດສະແດງ : {{ item.concert.startTime }} - {{ item.concert.endTime }}</h1>
                        </div>
                        <div class="flex items-center justify-between w-full">
                            <div>
                                <h1>ລາຄາ: {{ item.concert.price.toLocaleString() }} kip/{{ $t('seat') }}</h1>
                                <h1>ຈຳນວນທີ່ຈອງ: {{ item.ticket_quantity }} {{ $t('seat') }}</h1>
                            </div>
                            <a-tag color="green" style="padding: 10px;font-weight: bold;">
                                ລວມ: {{ (item.total_amount).toLocaleString() }} kip
                            </a-tag>
                        </div>
                    </div>
                    <a-button type="primary" style="width: 100%;"
                        @click="router.push({ name: 'company.booking.detail', params: { id: item.id } })">
                        <div class="flex flex-row items-center justify-between">
                            <h1>
                                ຈອງເມື່ອ : {{ dayjs(item.payment.payment_date).format('DD-MM-YYYY') }}
                            </h1>
                            <h1>
                                <EyeOutlined class="mr-1" />
                                ເບິ່ງລາຍລະອຽດ
                            </h1>
                        </div>
                    </a-button>
                </div>
            </a-col>
            <a-col :span="24">
                <div class="flex justify-end mb-3">
                    <a-pagination v-model:current="BookingList.pagination.page"
                        v-model:pageSize="BookingList.pagination.per_page" :total="BookingList.pagination.total"
                        show-size-changer show-quick-jumper :show-total="(total: number) => `ລາຍການທັງຫມົດ ${total}`"
                        :page-size-options="['6', '10', '20', '30']" @change="onQuery">
                    </a-pagination>
                </div>
            </a-col>
        </a-row>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useBooking } from '../composables/useBooking';
import dayjs from 'dayjs';
import { EyeOutlined } from '@ant-design/icons-vue';
import router from '@/router';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { storeToRefs } from 'pinia';
const { token } = storeToRefs(useAuthStore())
const status = ref<string>("pending");
const search = ref<string>("");
const onSearch = async () => {
    await fetchBookingListByEmail(search.value, BookingList.value.pagination.page, BookingList.value.pagination.per_page)
}
const { fetchBookingList, BookingList, setQuery, loadingBooking, fetchBookingListByEmail } = useBooking()
const onQuery = async () => {
    await setQuery({ page: BookingList.value.pagination.page, per_page: BookingList.value.pagination.per_page })
    if (token.value) {
        await fetchBookingList()
    }
    else {
        await fetchBookingListByEmail(search.value, BookingList.value.pagination.page, BookingList.value.pagination.per_page)
    }

}
onMounted(async () => {
    if (token.value) {
        await fetchBookingList()
    }
})
</script>

<style scoped></style>