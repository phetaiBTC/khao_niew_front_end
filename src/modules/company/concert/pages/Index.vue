<template>
    <a-card class="w-full">
        <template #title>
            <!-- <div class="flex items-center gap-2">
                <PictureOutlined></PictureOutlined>
                <h1 class="text-xl" style="margin: 0 !important;">{{ $t('concert') }}</h1>
            </div> -->
        </template>
        <template #extra>
            <div class="flex justify-between">
                <div class="flex items-center gap-2">
                    <a-input-search v-model:value="search" placeholder="ຄົ້ນຫາ..." @search="" />
                </div>
            </div>
        </template>
        <a-row :gutter="[16, 16]">
            <a-col :span="12" v-for="concert in ConcertList.data" :key="concert.id">
                <div class="bg-white rounded-lg cursor-pointer flex flex-col justify-center items-center hover:shadow-lg overflow-hidden"
                    style="box-shadow: 0px 5px 10px #d9d9d9;">
                    <h1 class="text-center py-1 text-nowrap border-b w-4/5 "
                        :class="concert.limit != concert.totalTicket ? 'border-green-500' : 'border-red-500'"
                        style="margin: 0 !important;">
                        {{ dayjs(concert.date).format('dddd DD-MM-YYYY') }}
                    </h1>
                    <h1 class="text-center p-2 mx-auto text-2xl bg-gray-100 w-4/5 rounded-xl text-blue-950"
                        style="margin: 10px 0 !important;">{{ concert.totalTicket +
                            ' / ' +
                            concert.limit }}</h1>
                    <a-tag color="green" style="margin: 0 !important;">{{ concert.price.toLocaleString() + ' kip' }} /
                        {{
                            $t('seat')
                        }}</a-tag>
                    <a-button type="primary" class="w-full" style="margin-top: 5px;" size="large"
                        @click="router.push({ name: 'company.booking.create', params: { concert_id: concert.id } })"
                        :disabled="concert.limit === concert.totalTicket">
                        <div>
                            <ShoppingOutlined />
                            {{ $t(concert.limit === concert.totalTicket ? 'sold_out' : 'book_now') }}
                        </div>
                    </a-button>
                </div>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup lang="ts">
import { ShoppingOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/lo';
dayjs.locale('lo');
import { useConcert } from '@/modules/admin/concert/composables/useConcert';
import router from '@/router';
const { fetchConcertList, ConcertList } = useConcert()
const search = ref<string>('');
onMounted(async () => {
    await fetchConcertList()
})
</script>

<style scoped></style>