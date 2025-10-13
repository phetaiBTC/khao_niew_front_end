<template>
  <a-layout-header style="background: #fff; padding: 0">
    <div class="w-full h-full items-center flex px-4 justify-between">
      <div class="flex items-center gap-4">
        <!-- ปุ่ม toggle -->
        <component
          :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
          class="text-2xl cursor-pointer"
          @click="$emit('toggleSidebar')"
          v-show="showbutton"
        />
        <span>{{ text }}</span>
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
import { BellOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

defineProps({
  collapsed: {
    type: Boolean,
  },
  text: {
    type: String,
  },
  showbutton: {
    type: Boolean
  }
});

defineEmits(["toggleSidebar"]);
</script>
