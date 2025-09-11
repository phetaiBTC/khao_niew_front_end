<template>
    <div>
        <a-row :gutter="[0, 20]">
            <a-col :span="24" v-for="item in BookingList.data">
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
                            <h1 style="font-weight: bold;">ຂໍ້ມູນການຈອງ</h1>
                            <h1>ວັນທີ: {{ dayjs(item.concert.date).format('DD-MM-YYYY') }}</h1>
                            <h1>ເວລາຈັດສະແດງ : {{ item.concert.startTime }} - {{ item.concert.endTime }}</h1>
                        </div>
                    </div>
                    <a-button type="primary" style="width: 100%;">
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
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBooking } from '../composables/useBooking';
import dayjs from 'dayjs';
import { EyeOutlined } from '@ant-design/icons-vue';
const { fetchBookingList, BookingList } = useBooking()

onMounted(async () => {
    await fetchBookingList()
})
</script>

<style scoped></style>