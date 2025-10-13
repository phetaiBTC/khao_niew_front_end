<template>

    <div v-if="companyProfileTotal">
        <div class="text-center mb-4">
            <h2 class="text-lg font-semibold">{{ companyProfileTotal.company.name }}</h2>
            <p class="text-gray-500 text-sm">ຂໍ້ມູນບໍລິສັດ</p>
        </div>

        <a-divider />

        <div class="grid grid-cols-2 gap-3">
            <a-card size="small" class="text-center shadow-sm rounded-lg">
                <p class="text-gray-500 text-xs">ຈຳນວນຜູ້ໃຊ້</p>
                <p class="text-lg font-bold">{{ companyProfileTotal.statistics.total_users }}</p>
            </a-card>

            <a-card size="small" class="text-center shadow-sm rounded-lg">
                <p class="text-gray-500 text-xs">ຈຳນວນການຈອງ</p>
                <p class="text-lg font-bold">{{ companyProfileTotal.statistics.total_bookings }}</p>
            </a-card>

            <a-card size="small" class="text-center shadow-sm rounded-lg">
                <p class="text-gray-500 text-xs">ຈຳນວນຄົນທັງຫມົດ</p>
                <p class="text-lg font-bold">{{ companyProfileTotal.statistics.total_people }}</p>
            </a-card>

            <a-card size="small" class="text-center shadow-sm rounded-lg">
                <p class="text-gray-500 text-xs">ລາຍໄດ້ທັງຫມົດ</p>
                <p class="text-lg font-bold text-green-600">
                    {{ companyProfileTotal.statistics.total_revenue.toLocaleString() }} ₭
                </p>
            </a-card>
        </div>

        <a-divider class="my-4" />

        <div>
            <h3 class="font-semibold mb-2 text-sm px-3 text-gray-700">ສະຖານະ</h3>
            <div class="space-y-2 text-sm px-3">
                <div class="flex justify-between">
                    <span class="text-gray-500">ກຳລັງດຳເນິນການ</span>
                    <span class="text-yellow-500 font-semibold">{{ companyProfileTotal.payment_status.pending }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-500">ສຳເລັດ</span>
                    <span class="text-green-600 font-semibold">{{ companyProfileTotal.payment_status.completed }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-500">ຍົກເລິກ</span>
                    <span class="text-red-500 font-semibold">{{ companyProfileTotal.payment_status.failed }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCompany } from '@/modules/admin/company/composables/useCompany';
import { onMounted } from 'vue';

const { fetchCompanyTotal, companyProfileTotal } = useCompany()
onMounted(async () => {
    await fetchCompanyTotal()
})
</script>

<style scoped></style>