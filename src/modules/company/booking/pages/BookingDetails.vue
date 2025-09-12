<template>
    <div v-if="Booking">
        <a-row :gutter="[0, 16]">
            <a-col :span="24" v-for="item in Booking.details">
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
                        <!-- <h1 class="font-bold">{{ $t('Show_time') }}: {{ Booking.concert.startTime }}-{{
                            Booking.concert.endTime }}</h1> -->
                        <a-tag :color="item.status === 'not_checked_in' ? 'green' : 'red'" class="text-center">
                            {{ $t(item.status) }}
                        </a-tag>
                        <!-- <h1 class="text-lg font-bold">ເລກທີ: {{ item.code }}</h1>
                        <h1 class="text-lg font-bold">ສະຖານະ: {{ item.status }}</h1> -->
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useBooking } from '../composables/useBooking';
const { Booking, fetchBooking } = useBooking()
const route = useRoute()
const bookingId = route.params.id

onMounted(async () => {
    await fetchBooking(Number(bookingId))
})
</script>

<style scoped></style>