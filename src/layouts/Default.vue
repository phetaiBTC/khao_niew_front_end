<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible fixed />
        <a-layout-sider v-model:collapsed="collapsed" collapsible fixed
            :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }">
            <div class="logo">
                <img src="/src/assets/images/logoKhaoNiew.png" alt="" srcset="" class="w-35 mx-auto"
                    style="filter: drop-shadow(0 5px 10px #fff)">
                <h1 v-show="!collapsed" class="text-center text-white text-2xl">Khao Niew</h1>
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <template v-for="item in menuItems" :key="item.key">
                    <a-sub-menu v-if="item.children" :key="item.key">
                        <template #title>
                            <span>
                                <component :is="item.icon" />
                                <span>{{ item.label }}</span>
                            </span>
                        </template>
                        <a-menu-item v-for="child in item.children" :key="child.key">
                            <router-link :to="child.to">{{ child.label }}</router-link>
                        </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item v-else :key="item.key + '-' + item.label">
                        <component :is="item.icon" />
                        <span>
                            <router-link :to="item.to">{{ item.label }}</router-link>
                        </span>
                    </a-menu-item>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout class="min-h-screen">
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 10px 0">
                    <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
                        <router-link v-if="index < breadcrumbList.length - 1" :to="item.path">
                            {{ item.title }}
                        </router-link>
                        <span v-else>{{ item.title }}</span>
                    </a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ background: '#fff', borderRadius: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>

            <a-layout-footer style="text-align: center;background-color: white; margin-top: 10px;">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>

import { useRoute } from "vue-router";
import { computed, ref } from 'vue';
import { menuItems } from "./menuItem";
const route = useRoute();
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
const breadcrumbList = computed(() =>
    route.matched.map(r => ({
        path: r.path,
        title: r.meta.title as string
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

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>
