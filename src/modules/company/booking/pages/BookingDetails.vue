<template>
    <a-card class="m-1" :loading="loadingBooking" v-if="loadingBooking">whatever content</a-card>
    <div v-if="Booking">
        <div class="flex justify-between items-center rounded-xl flex-col overflow-hidden m-1"
            style="box-shadow: 0px 2px 10px #8A959e;">
            <div class="p-4 w-full flex flex-col gap-2">
                <div class="flex items-center justify-between w-full">
                    <div class="text-xl font-bold">
                        ລາຍການຈອງ : <a-tag color="blue">#{{ Booking.id }}</a-tag>
                    </div>
                    <a-tag
                        :color="Booking.payment.status === 'pending' ? 'gold' : Booking.payment.status === 'success' ? 'green' : 'red'">{{
                            $t(Booking.payment.status) }}</a-tag>
                </div>
                <div class=" bg-blue-100 w-full p-2 my-2 rounded-lg border border-blue-300">
                    <h1 style="font-weight: bold;">ຂໍ້ມູນການສະແດງ</h1>
                    <h1>ວັນທີ: {{ dayjs(Booking.concert.date).format('DD-MM-YYYY') }}</h1>
                    <h1>ເວລາຈັດສະແດງ : {{ Booking.concert.startTime }} - {{ Booking.concert.endTime }}</h1>
                </div>
                <div class="flex items-center justify-between w-full">
                    <div>
                        <h1>ລາຄາ: {{ Booking.concert.price.toLocaleString() }} kip/{{ $t('seat') }}</h1>
                        <h1>ຈຳນວນທີ່ຈອງ: {{ Booking.ticket_quantity }} {{ $t('seat') }}</h1>
                    </div>
                    <a-tag color="green" style="padding: 10px;font-weight: bold;">
                        ລວມ: {{ (Booking.total_amount).toLocaleString() }} kip
                    </a-tag>
                </div>
            </div>
        </div>
        <a-row :gutter="[0, 16]">
            <a-col :span="24" v-for="item in Booking.details" v-if="Booking.payment.status === 'success'">
                <div class=" flex justify-between m-2 shadow p-2">
                    <a-qrcode :value="String(item.id)" />
                    <div>
                        <h1 class="text-lg font-bold text-center">
                            <a-tag color="blue"># {{ item.id }}</a-tag>
                        </h1>
                        <h1 class="font-bold">ວັນທີ: {{ Booking.concert.date }}</h1>
                        <h1 class="font-bold">ລາຄາ: {{ Booking.concert.price }}</h1>
                        <h1 class="font-bold">{{ $t('Show_time') }}: {{ Booking.concert.startTime }}-{{
                            Booking.concert.endTime }}</h1>
                        <a-tag :color="item.status === 'not_checked_in' ? 'green' : 'red'" class="text-center">
                            {{ $t(item.status) }}
                        </a-tag>
                    </div>
                </div>
            </a-col>
            <div v-else class=" flex justify-center m-2 shadow p-2 w-full items-center flex-col">
                <HistoryOutlined style="font-size: 100px;" />
                <a-tag color="yellow">ກຳລັງດຳເນີນການ</a-tag>
            </div>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useBooking } from '../composables/useBooking';
import dayjs from 'dayjs';
import { HistoryOutlined } from '@ant-design/icons-vue';
const { Booking, fetchBooking, loadingBooking } = useBooking()
const route = useRoute()
const bookingId = route.params.id

onMounted(async () => {
    await fetchBooking(Number(bookingId))
})
</script>

<style scoped></style>