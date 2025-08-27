<template>
    <div>
        <a-row>
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
                <a-table :columns="UserColumns" :data-source="UserList" :pagination="false">
                    <template #name="{ text }">
                        <a>{{ text }}</a>
                    </template>
                </a-table>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import { UserColumns } from '../type';
import { useUser } from '../composables/useUser';
const { UserList, fetchUserList } = useUser()

const search = ref<string>('');
onMounted(async () => {
    await fetchUserList();
})
</script>

<style scoped></style>