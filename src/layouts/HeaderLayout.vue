<template>
    <a-layout-header style="background: #fff; padding: 0">
        <div class="w-full h-full items-center flex px-4 justify-between">
            <div>
                Admin
            </div>
            <div class="flex items-center gap-4">
                <a-badge count="" class="cursor-pointer">
                    <BellOutlined />
                </a-badge>
                <a-button type="primary" @click="useAuthStore().logout()">
                    {{ $t('logout') }}
                </a-button>
            </div>
        </div>
    </a-layout-header>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import { BellOutlined } from "@ant-design/icons-vue";

</script>

<style scoped></style>