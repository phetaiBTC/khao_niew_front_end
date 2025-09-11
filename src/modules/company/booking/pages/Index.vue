<template>
    <a-list item-layout="vertical" size="large" :pagination="false" :data-source="listData">
        <template #renderItem="{ item }">
            <a-list-item :key="item.title">
                <a-list-item-meta>
                    <template #title>
                        <a :href="item.href" class="text-lg font-bold text-blue-950 hover:underline">{{ item.title
                            }}</a>
                    </template>
                    <template #description>
                        <div class="flex items-center gap-2">
                            <a-tag color="blue">{{ item.description }}</a-tag>
                        </div>
                    </template>
                </a-list-item-meta>
                <div>{{ item.content }}</div>
                <template #extra>
                    <a-tag color="gold" v-if="item.status === 'pending'">{{ item.status }}</a-tag>
                    <a-tag color="green" v-if="item.status === 'success'">{{ item.status }}</a-tag>
                    <a-tag color="red" v-if="item.status === 'failed'">{{ item.status }}</a-tag>
                    <a-tag color="red" v-if="item.status === 'refunded'">{{ item.status }}</a-tag>
                </template>
            </a-list-item>
        </template>

    </a-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useBooking } from '../composables/useBooking';
import dayjs from 'dayjs';
const { fetchBookingList, BookingList } = useBooking()
const listData = ref<Record<string, string>[]>([]);
// const listData: Record<string, string>[] = [];

onMounted(async () => {
    await fetchBookingList()
    listData.value = BookingList.value.data.map((item) => ({
        href: '#',
        title: `ລາຍການຈອງທີ່ : ${item.id}`,
        description: `ວັນທີ່: ${dayjs(item.concert.date).format('DD-MM-YYYY')} | ລາຄາ: ${item.concert.price.toLocaleString()} kip`,
        content: `ຈຳນວນບັດ: ${item.ticket_quantity}`,
        status: item.payment.status
    }))
})
</script>

<style scoped></style>