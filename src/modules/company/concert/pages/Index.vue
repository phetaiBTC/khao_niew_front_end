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
                <a-card>
                    <template #title>
                        <div class="flex items-center gap-2">
                            <h1 class="text-xl" style="margin: 0 !important;">{{ concert.entertainments[0].title }}</h1>
                        </div>
                    </template>
                    <template #cover>
                    </template>
                    <p>ວັນທີ: {{ concert.date }}</p>
                    <p>ສະຖານນະ: {{ concert.status }}</p>
                    <template #actions>
                        <!-- <EyeOutlined /> -->
                        <a-button type="primary" class="w-full h-full">
                            <div>
                                <ShoppingOutlined />
                                booking now
                            </div>
                        </a-button>
                    </template>
                </a-card>
            </a-col>
        </a-row>
    </a-card>
</template>

<script setup lang="ts">
import { EyeOutlined, PictureOutlined, ShoppingOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
import { useConcert } from '@/modules/admin/concert/composables/useConcert';
const { fetchConcertList, ConcertList } = useConcert()
const search = ref<string>('');
onMounted(async () => {
    await fetchConcertList()
})
</script>

<style scoped></style>