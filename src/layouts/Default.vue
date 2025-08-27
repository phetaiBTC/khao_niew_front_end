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
                <a-menu-item key="1">
                    <pie-chart-outlined />
                    <span>{{ $t('dashboard') }}</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <user-outlined />
                    <span><router-link :to="{ name: 'user' }">{{ $t('user') }}</router-link></span>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <template #title>
                        <span>
                            <user-outlined />
                            <span>User</span>
                        </span>
                    </template>
                    <a-menu-item key="3">Tom</a-menu-item>
                    <a-menu-item key="4">Bill</a-menu-item>
                    <a-menu-item key="5">Alex</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <template #title>
                        <span>
                            <team-outlined />
                            <span>Team</span>
                        </span>
                    </template>
                    <a-menu-item key="6">Team 1</a-menu-item>
                    <a-menu-item key="8">Team 2</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="9">
                    <file-outlined />
                    <span>File</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout class="min-h-screen">
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 10px 0" >
                    <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
                        <router-link v-if="index < breadcrumbList.length - 1" :to="item.path">
                            {{ item.title }}
                        </router-link>
                        <span v-else>{{ item.title }}</span>
                    </a-breadcrumb-item>
                </a-breadcrumb>
                <div
                    :style="{ padding: '15px', background: '#fff', minHeight: '90%', borderRadius: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }">
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
import {
    PieChartOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined
} from '@ant-design/icons-vue';
import { useRoute } from "vue-router";

import { computed, ref } from 'vue';
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
