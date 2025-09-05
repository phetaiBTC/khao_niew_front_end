<template>
    <BaseCRUD :columns="UserCol.getColumns()" :data="CompanyList" :loading="loadingCompany" :icon="BankOutlined"
        title="company" @on-delete="deleteCompany" @on-edit="onEdit($event)" @on-query="setQuery($event)"
        @on-create="onCreate" @on-search="setQuery($event)" :scroll="{ x: 'max-content' }">
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
    </BaseCRUD>
    <manageCompany :open="open" :data="companyRecord" @isOpen="open = $event"></manageCompany>
</template>

<script setup lang="ts">
import BaseCRUD from '@/components/BaseCRUD/BaseCRUD.vue';
import { UserOutlined, BankOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import manageCompany from '../components/ManageCompany.vue';
import { useCompany } from '../composables/useCompany';
import { BaseColumns } from '@/common/utils/baseColumn';
import type { CompanyEntity } from '../type';
const { setQuery, CompanyList, loadingCompany, deleteCompany, fetchCompanyList, } = useCompany()

const open = ref<boolean>(false)
const companyRecord = ref<CompanyEntity | null>(null)
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