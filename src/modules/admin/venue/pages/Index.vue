<template>
    <BaseCRUD :columns="UserCol.getColumns()" :data="VenueList" :loading="loadingVenue" :icon="AimOutlined"
        title="venue" @on-delete="deleteVenue" @on-edit="onEdit($event)" @on-query="setQuery($event)"
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
    <ManageVenue :open="open" :data="companyRecord" @isOpen="open = $event"></ManageVenue>
</template>

<script setup lang="ts">
import BaseCRUD from '@/components/BaseCRUD/BaseCRUD.vue';
import { UserOutlined, AimOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import ManageVenue from '../components/ManageVenue.vue';
import { useVenue } from '../composables/useVenue';
import { BaseColumns } from '@/common/utils/baseColumn';
import type { venueEntity } from '../types/index';
const { setQuery, VenueList, loadingVenue, deleteVenue, fetchVenueList } = useVenue()

const open = ref<boolean>(false)
const companyRecord = ref<venueEntity | null>(null)
const onEdit = (record: venueEntity) => {
    console.log(record)
    companyRecord.value = record
    open.value = true
}
const onCreate = () => {
    companyRecord.value = null
    open.value = true
}
const UserCol = new BaseColumns<venueEntity>([
    { dataIndex: 'name', ellipsis: true, width: 200, fixed: 'left', sorter: (a: venueEntity, b: venueEntity) => a.name.localeCompare(b.name) },
    { dataIndex: 'address', ellipsis: true },
])
onMounted(async () => {
    await fetchVenueList();
})
</script>

<style scoped>
:deep(.ant-table) {
    border: 1px solid rgb(204, 204, 204);
}
</style>