<template>
    <a-card class="w-full">
        <template #title>
            <div class="flex items-center gap-2">
                <UserOutlined />
                <h1 class="text-xl" style="margin: 0 !important;">User</h1>
            </div>
        </template>
        <template #extra>
            <div class="flex justify-between">
                <div class="flex items-center gap-2">
                    <a-input-search v-model:value="search" placeholder="ຄົ້ນຫາ..." @search="onSearch" />
                    <a-button type="primary" @click="() => { open = true; userRecord = null }">{{ $t('add') + ' ' +
                        $t('user') }}</a-button>
                </div>
            </div>
        </template>
        <a-row :gutter="[16, 16]">
            <a-col :span="24">
                <a-table :columns="UserCol.getColumns()" :data-source="UserList.data" :loading="loadingUser"
                    :scroll="{ x: 1500, y: 1900 }" :pagination="false" size="small">
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
                        <template v-else-if="column.key === 'actions'">
                            <div class="flex gap-2 items-center justify-center">
                                <a-button type="primary" @click="() => { open = true; userRecord = record }">
                                    <template #icon>
                                        <EditOutlined />
                                    </template>
                                    {{ $t('edit') }}
                                </a-button>
                                <a-popconfirm :title="$t('Are_you_sure_delete_this')" @confirm="deleteUser(record.id)"
                                    :ok-text="$t('yes')" :cancel-text="$t('cancel')">
                                    <a-button type="primary" danger ghost>
                                        <div>
                                            <DeleteOutlined />
                                            {{ $t('delete') }}
                                        </div>
                                    </a-button>
                                </a-popconfirm>
                            </div>
                        </template>
                    </template>
                </a-table>
            </a-col>
            <a-col :span="24">
                <div class="flex justify-end">
                    <a-pagination v-model:current="UserList.pagination.page"
                        v-model:pageSize="UserList.pagination.per_page" :total="UserList.pagination.total"
                        show-size-changer show-quick-jumper :show-total="(total: number) => `ຜູ້ໃຊ້ທັງຫມົດ ${total}`"
                        :page-size-options="['6', '10', '20', '30']" @change="onQuery">
                    </a-pagination>
                </div>
            </a-col>
        </a-row>
        <manage-user :open="open" @is-open="open = $event" :data="userRecord" />
    </a-card>
</template>

<script setup lang="ts">
import { DeleteOutlined, EditOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import manageUser from '../components/manageUser.vue';
import { useUser } from '../composables/useUser';
import { BaseColumns } from '@/common/utils/baseColumn';
import type { UserEntity } from '../type';

const open = ref<boolean>(false)
const userRecord = ref<UserEntity | null>(null)
const UserCol = new BaseColumns<UserEntity>([
    { dataIndex: 'username', ellipsis: true, fixed: 'left', sorter: (a: UserEntity, b: UserEntity) => a.username.localeCompare(b.username) },
    { dataIndex: 'email' },
    { dataIndex: 'phone' },
    { dataIndex: 'role' }
])
const { UserList, loadingUser, fetchUserList, setQuery, deleteUser } = useUser()
const search = ref<string>('');
const onSearch = async () => {
    setQuery({
        search: search.value,
        page: 1,
        per_page: 5,
        type: 'paginate'
    })
    await fetchUserList()
}
const onQuery = async (page?: number, pageSize?: number) => {
    setQuery({
        page: page ?? UserList.value.pagination.page,
        per_page: pageSize ?? UserList.value.pagination.per_page,
        search: search.value,
        type: 'paginate'
    })
    await fetchUserList()
}
onMounted(async () => {
    await fetchUserList();
    console.log(UserCol);
})
</script>

<style scoped>
:deep(.ant-table) {
    border: 1px solid rgb(204, 204, 204);
}
</style>