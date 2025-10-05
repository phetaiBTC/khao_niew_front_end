<template>
    <BaseCRUD :columns="UserCol.getColumns()" :data="UserList" :loading="loadingUser" :icon="UserOutlined" title="user"
        @on-delete="deleteUser" @on-edit="onEdit($event)" @on-query="setQuery($event)" @on-create="onCreate"
        @on-search="setQuery($event)">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'role'">
                <a-tag :color="record.role === 'admin' ? 'blue' : 'green'"
                    style="text-transform: capitalize;font-size: 1rem">{{ record.role }}</a-tag>
            </template>
            <template v-if="column.key === 'phone'">
                <a :href="`https://wa.me/856${record.phone.replace(/^0/, '')}`" target="_blank">
                    <PhoneOutlined style="color: green;font-size: 1rem;" class="mr-2" />
                </a>
                {{ record.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3') }}
            </template>
        </template>
    </BaseCRUD>
    <manageUser :open="open" :data="userRecord" @isOpen="open = $event"></manageUser>
</template>

<script setup lang="ts">
import BaseCRUD from '@/components/BaseCRUD/BaseCRUD.vue';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import ManageUser from '../components/manageUser.vue';
import { useUser } from '../composables/useUser';
import { BaseColumns } from '@/common/utils/baseColumn';
import type { UserEntity } from '../type';
const { UserList, loadingUser, fetchUserList, setQuery, deleteUser } = useUser()

const open = ref<boolean>(false)
const userRecord = ref<UserEntity | null>(null)
const onEdit = (record: UserEntity) => {
    userRecord.value = record
    open.value = true
}
const onCreate = () => {
    userRecord.value = null
    open.value = true
}
const UserCol = new BaseColumns<UserEntity>([
    { dataIndex: 'username', ellipsis: true, fixed: 'left', sorter: (a: UserEntity, b: UserEntity) => a.username.localeCompare(b.username) },
    { dataIndex: 'email' },
    { dataIndex: 'phone' },
    { dataIndex: 'role' }
])
onMounted(async () => {
    await fetchUserList();
})
</script>

<style scoped>
:deep(.ant-table) {
    border: 1px solid rgb(204, 204, 204);
}
</style>