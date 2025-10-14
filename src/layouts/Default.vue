<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" fixed />
    <a-layout-sider v-model:collapsed="collapsed" collapsible fixed :style="{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
    }" style="background-color: #1055c9">
      <template #trigger>
        <div style="width: 100%; height: 100%; background: #05339c">
          <LeftOutlined v-show="!collapsed" />
          <RightOutlined v-show="collapsed" />
        </div>
      </template>
      <div class="logo">
        <img src="/src/assets/images/logoKhaoNiew.png" alt="..." srcset="" class="w-35 mx-auto"
          style="filter: drop-shadow(0 5px 10px #fff)" />
        <h1 v-show="!collapsed" class="text-center text-white text-2xl">
          Khao Niew
        </h1>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" style="background-color: #1055c9">
        <template v-for="item in menuItems" :key="item.label">
          <a-sub-menu v-if="item.children" :key="item.label">
            <template #title>
              <span>
                <component :is="item.icon" />
                <span>{{ $t(item.label.toLowerCase()) }}</span>
              </span>
            </template>
            <a-menu-item v-for="child in item.children" :key="child.label"
              @click="router.push({ name: 'report.year' })">
              {{ $t(child.label.toLowerCase()) }}
              <!-- <router-link :to="child.to">{{ $t(child.label.toLowerCase()) }}</router-link> -->
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="item.label + '-' + item.label">
            <component :is="item.icon" />
            <span>
              <router-link :to="item.to">{{
                $t(item.label.toLowerCase())
              }}</router-link>
            </span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout class="min-h-screen">
      <HeaderLayout :text="'Admin'"
        :showbutton="false" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 10px 0">
          <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
            <router-link v-if="index < breadcrumbList.length - 1" :to="item.path">
              {{ $t(item.title.toLowerCase()) }}
            </router-link>
            <span v-else>{{ $t(item.title.toLowerCase()) }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{
          background: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
        }">
          <router-view></router-view>
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center; background-color: white; margin-top: 10px">
        Created by Khao Niew
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { menuItems } from "./menuItem";
import HeaderLayout from "./HeaderLayout.vue";
import router from "@/router";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
const route = useRoute();
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
const breadcrumbList = computed(() =>
  route.matched.map((r) => ({
    path: r.path,
    title: r.meta.title as string,
  }))
);
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
