<template>
    <a-layout class="h-screen relative overflow-hidden">

        <transition name="slide">
            <a-layout-sider v-if="!collapsed" key="sidebar" collapsed-width="0" width="250" theme="dark" :trigger="null"
                :style="{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    height: '100vh',
                    zIndex: 2000,
                    transition: 'all 0.3s ease'
                }">
                <div class="logo py-4">
                    <img src="/src/assets/images/logoKhaoNiew.png" alt="" class="w-35 mx-auto"
                        style="filter: drop-shadow(0 5px 10px #fff)" />
                    <h1 class="text-center text-white text-2xl">Khao Niew</h1>
                </div>

                <a-menu v-model:selectedKeys="selectedKeys" :openKeys="openKeys" theme="dark" mode="inline">
                    <template v-for="item in menuItemsCompany" :key="item.label">

                        <a-sub-menu v-if="item.children" :key="item.label">
                            <template #title>
                                <span>
                                    <component :is="item.icon" />
                                    <span>{{ $t(item.label.toLowerCase()) }}</span>
                                </span>
                            </template>

                            <a-menu-item v-for="child in item.children" :key="child.label" @click="handleMenuSelect">
                                <router-link :to="child.to">
                                    {{ $t(child.label.toLowerCase()) }}
                                </router-link>
                            </a-menu-item>
                        </a-sub-menu>

                        <a-menu-item v-else :key="item.label+'-'+item.label" @click="handleMenuSelect">
                            <component :is="item.icon" />
                            <router-link v-if="item.to" :to="item.to" class="ml-2">
                                {{ $t(item.label.toLowerCase()) }}
                            </router-link>
                        </a-menu-item>
                    </template>
                </a-menu>
            </a-layout-sider>
        </transition>

        <div v-if="!collapsed" class="fixed inset-0  bg-opacity-60 z-[1500]" @click="collapsed = true"></div>

        <a-layout>
            <HeaderLayout :collapsed="collapsed" @toggleSidebar="collapsed = !collapsed" :text="'khaoNiewLaos'"
                :showbutton="true" />

            <a-layout-content :style="{ margin: '24px 16px 0', minHeight: '280px', transition: 'margin-left 0.2s' }"
                class="overflow-scroll">
                <div :style="{ background: '#fff' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { menuItemsCompany } from "./menuItimeCompany";
import HeaderLayout from "./HeaderLayout.vue";
import { useRoute } from 'vue-router';
const collapsed = ref(true);
const selectedKeys = ref<string[]>(["4"]);

const openKeys = ref<string[]>([]);


const handleMenuSelect = () => {
    collapsed.value = true;
};


const route = useRoute();

// map route.name -> menu key
const routeToMenuKey: Record<string, string> = {
    'company.profile': 'profile',
    'company.user': 'user',
    'company.concert': 'concert',
    'company.booking': 'booking',
};

watch(
    () => route.name,
    (routeName: any) => {
        if (routeName) {
            const menuKey = routeToMenuKey[routeName as string];
            selectedKeys.value = menuKey ? [menuKey] : [];
        }

        // กำหนด openKeys ตาม selectedKeys ทันที
        const keys = selectedKeys.value;
        if (keys.some(k => ['profile', 'user', 'bestname'].includes(k))) {
            openKeys.value = ['company'];
        } else {
            openKeys.value = [];
        }
    },
    { immediate: true }
);


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

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from {
    transform: translateX(-100%);
}

.slide-leave-to {
    transform: translateX(-100%);
}
</style>
