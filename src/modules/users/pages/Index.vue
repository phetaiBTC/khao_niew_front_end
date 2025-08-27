<template>
    <div>
        <a-row :gutter="[16, 16]">
            <a-col :span="24">
                <div class="flex justify-between">
                    <div class="flex items-center gap-2">
                        <UserOutlined />
                        <h1 class="text-xl" style="margin: 0 !important;">User</h1>
                    </div>
                    <div class="flex items-center gap-2">
                        <a-input-search v-model:value="search" placeholder="ຄົ້ນຫາ..." enter-button @search="" />
                        <a-button type="primary">{{ $t('add') + ' ' + $t('user') }}</a-button>
                    </div>
                </div>
            </a-col>
            <a-col :span="24">
                <a-table :columns="UserCol.getColumns()" :data-source="UserList" :pagination="false">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'role'">
                            <a-tag :color="record.role === 'admin' ? 'blue' : 'green'">{{ record.role }}</a-tag>
                        </template>
                    </template>
                </a-table>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import { useUser } from '../composables/useUser';
import { BaseColumns } from '@/common/utils/baseColumn';

const UserCol = new BaseColumns([
    { dataIndex: 'username' },
    { dataIndex: 'email' },
    { dataIndex: 'phone' },
    { dataIndex: 'role' }
])
const { UserList, fetchUserList } = useUser()

const search = ref<string>('');
onMounted(async () => {
    await fetchUserList();
    console.log(UserCol);
})
</script>

<style scoped></style>