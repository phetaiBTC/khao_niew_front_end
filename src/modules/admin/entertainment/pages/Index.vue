<template>
    <BaseCRUD :columns="UserCol.getColumns()" :data="EntertainmentList" :loading="loadingEntertainment"
        :icon="BookOutlined" title="entertainment" @on-delete="deleteEntertainment" @on-edit="onEdit($event)"
        @on-query="setQuery($event)" @on-create="onCreate" @on-search="setQuery($event)" :scroll="{ x: 'max-content' }">
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
import { UserOutlined, BookOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import manageCompany from '../components/ManageEntertainment.vue';
import { useEntertainment } from '../composables/useEntertainment';
import { BaseColumns } from '@/common/utils/baseColumn';
import type { EntertainmentEntity } from '../types/index';
const { setQuery, EntertainmentList, loadingEntertainment, deleteEntertainment, fetchEntertainmentList } = useEntertainment()

const open = ref<boolean>(false)
const companyRecord = ref<EntertainmentEntity | null>(null)
const onEdit = (record: EntertainmentEntity) => {
    console.log(record)
    companyRecord.value = record
    open.value = true
}
const onCreate = () => {
    companyRecord.value = null
    open.value = true
}
const UserCol = new BaseColumns<EntertainmentEntity>([
    { dataIndex: 'title', ellipsis: true, width: 200, fixed: 'left', sorter: (a: EntertainmentEntity, b: EntertainmentEntity) => a.title.localeCompare(b.title) },
    { dataIndex: 'description', ellipsis: true },
])
onMounted(async () => {
    await fetchEntertainmentList();
})
</script>

<style scoped>
:deep(.ant-table) {
    border: 1px solid rgb(204, 204, 204);
}
</style>