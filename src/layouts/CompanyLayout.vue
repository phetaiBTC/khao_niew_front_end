<template>
    <a-layout class="h-screen">
        <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint"
            :style="{ position: 'fixed', top: '0', height: '100vh', left: '0', zIndex: 1000}">
            <div class="logo">
                <img src="/src/assets/images/logoKhaoNiew.png" alt="" srcset="" class="w-35 mx-auto"
                    style="filter: drop-shadow(0 5px 10px #fff)">
                <h1 class="text-center text-white text-2xl">Khao Niew</h1>
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <template v-for="item in menuItemsCompany" :key="item.label">
                    <a-sub-menu v-if="item.children" :key="item.label">
                        <template #title>
                            <span>
                                <component :is="item.icon" />
                                <span>{{ $t(item.label.toLowerCase()) }}</span>
                            </span>
                        </template>
                        <a-menu-item v-for="child in item.children" :key="child.label">
                            <router-link :to="child.to">{{ $t(child.label.toLowerCase()) }}</router-link>
                        </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item v-else :key="item.label + '-' + item.label">
                        <component :is="item.icon" />
                        <span>
                            <router-link :to="item.to">{{ $t(item.label.toLowerCase()) }}</router-link>
                        </span>
                    </a-menu-item>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <HeaderLayout />
            <a-layout-content :style="{ margin: '24px 16px 0', minHeight: '280px' }" class=" overflow-scroll">
                <div :style="{ background: '#fff' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { menuItemsCompany } from './menuItimeCompany';
import HeaderLayout from "./HeaderLayout.vue";

const onCollapse = (collapsed: boolean, type: string) => {
    console.log(collapsed, type);
};

const onBreakpoint = (broken: boolean) => {
    console.log(broken);
};

const selectedKeys = ref<string[]>(['4']);
</script>
<style scoped>
#components-layout-demo-responsive .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}

.site-layout-sub-header-background {
    background: #fff;
}

.site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
    background: #141414;
}
</style>
