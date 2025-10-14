<template>
    <a-card class="m-1" :loading="loadingCompany" v-if="loadingCompany">whatever content</a-card>

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

        <div class="bg-white rounded-2xl shadow-sm p-5">
            <h3 class="font-semibold mb-4 text-gray-800 text-base border-b border-gray-200 pb-2">
                ສະຖານະການຈອງໃນປະຈຸບັນ
            </h3>

            <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center bg-yellow-50 px-4 py-2 rounded-xl">
                    <span class="text-gray-600 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
                        ກຳລັງດຳເນິນການ
                    </span>
                    <span class="text-yellow-600 font-bold">
                        {{ companyProfileTotal.payment_status.pending }}
                    </span>
                </div>

                <div class="flex justify-between items-center bg-green-50 px-4 py-2 rounded-xl">
                    <span class="text-gray-600 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-green-500"></span>
                        ສຳເລັດ
                    </span>
                    <span class="text-green-600 font-bold">
                        {{ companyProfileTotal.payment_status.completed }}
                    </span>
                </div>

                <div class="flex justify-between items-center bg-red-50 px-4 py-2 rounded-xl">
                    <span class="text-gray-600 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-red-500"></span>
                        ຍົກເລິກ
                    </span>
                    <span class="text-red-600 font-bold">
                        {{ companyProfileTotal.payment_status.failed }}
                    </span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useCompany } from '@/modules/admin/company/composables/useCompany';
import { onMounted } from 'vue';

const { fetchCompanyTotal, companyProfileTotal,loadingCompany } = useCompany()
onMounted(async () => {
    await fetchCompanyTotal()
})
</script>

<style scoped></style>