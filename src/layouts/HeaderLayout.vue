<template>
  <a-layout-header style="background: #fff; padding: 0">
    <div class="w-full h-full items-center flex px-4 justify-between">
      <div class="flex items-center gap-4">
        <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" class="text-2xl cursor-pointer"
          @click="$emit('toggleSidebar')" v-show="showbutton" />
        <span>{{ text }}</span>
      </div>

      <div class="flex items-center gap-4">
        <!-- <a-badge count="" class="cursor-pointer">
          <BellOutlined />
        </a-badge> -->
        <a-button type="primary" @click="confirmLogout" class="flex items-center">
          <a-badge count="" class="cursor-pointer" style="margin-right: 5px ; color: #fff;">
            <LogoutOutlined />
          </a-badge>

          {{ $t(token ? "logout" : "login") }}
        </a-button>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
const token = localStorage.getItem("token");
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

const auth = useAuthStore()

const confirmLogout = () => {
  if (token) {
    Modal.confirm({
      title: token ? "ອອກຈາກລະບົບ" : "ລົງທະບຽນ",
      content: token ? "ທ່ານແນ່ໃຈວ່າຕ້ອງການອອກຈາກລະບົບບໍ?" : "ທ່ານແນ່ໃຈວ່າຕ້ອງການເຂົ້າສູ່ລະບົບບໍ?",
      okText: "ຕົກລົງ",
      cancelText: "ຍົກເລິກ",
      centered: true,
      onOk() {
        auth.logout()
      },
    })
  }
  else {
    auth.logout()
  }
}



</script>
