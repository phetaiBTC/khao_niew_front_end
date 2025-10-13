<template>
    <BaseCRUD :columns="UserCol.getColumns()" :data="CompanyList" :loading="loadingCompany" :icon="BankOutlined"
        title="company" @on-delete="deleteCompany" @on-edit="onEdit($event)" @on-query="setQuery($event)"
        @on-create="onCreate" @on-search="setQuery($event)" :scroll="{ x: 'max-content' }" :view="true"
        @on-view="onView">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'user'">
                <a-tag color="blue">
                    <div class="flex gap-2 items-center justify-center">
                        <UserOutlined />
                        <h1 style="font-size: 1rem;margin: 0;">{{ record.user.length }}</h1>
                    </div>
                </a-tag>
            </template>
        </template>
        <template #actions="{ record }">
            <a-tooltip :title="$t('add') + ' ' + $t('user')">
                <a-button type="primary" @click="() => { open1 = true; company_id = record.id }">
                    <div>
                        <UserAddOutlined />
                    </div>
                </a-button>
            </a-tooltip>
        </template>
    </BaseCRUD>
    <manageCompany :open="open" :data="companyRecord" @isOpen="open = $event"></manageCompany>
    <ManageUser :open="open1" :company-id="company_id" @isOpen="open1 = $event"></ManageUser>
    <a-modal v-model:open="open2" :footer="null" @cancel="open2 = false" :width="'420px'" centered
        v-if="companyProfileTotal">
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
            <h3 class="font-semibold mb-2 text-sm text-gray-700">ສະຖານະ</h3>
            <div class="space-y-2 text-sm">
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
    </a-modal>
</template>

<script setup lang="ts">
import BaseCRUD from '@/components/BaseCRUD/BaseCRUD.vue';
import ManageUser from '../components/addUserCompany.vue';
import { UserOutlined, BankOutlined, UserAddOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import manageCompany from '../components/ManageCompany.vue';
import { useCompany } from '../composables/useCompany';
import { BaseColumns } from '@/common/utils/baseColumn';
import type { CompanyEntity } from '../type';
const { setQuery, CompanyList, loadingCompany, deleteCompany, fetchCompanyList, fetchCompanyTotal, companyProfileTotal } = useCompany()

const open = ref<boolean>(false)
const open1 = ref<boolean>(false)
const open2 = ref<boolean>(false)
const company_id = ref<number | null>(null)
const companyRecord = ref<CompanyEntity | null>(null)
const onView = async (record: number) => {
    await fetchCompanyTotal(record)
    open2.value = true
}
const onEdit = (record: CompanyEntity) => {
    console.log(record)
    companyRecord.value = record
    open.value = true
}
const onCreate = () => {
    companyRecord.value = null
    open.value = true
}
const UserCol = new BaseColumns<CompanyEntity>([
    { dataIndex: 'name', ellipsis: true, fixed: 'left', sorter: (a: CompanyEntity, b: CompanyEntity) => a.name.localeCompare(b.name) },
    { dataIndex: 'contact' },
    { dataIndex: 'user' },
])
onMounted(async () => {
    await fetchCompanyList();
})
</script>

<style scoped>
:deep(.ant-table) {
    border: 1px solid rgb(204, 204, 204);
}
</style>