<!-- 经典布局 -->
<template>
  <ElContainer class="layout">
    <ElHeader>
      <div class="header-lf mask-image">
        <div class="logo flex justify-center items-center">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
          <span class="logo-text">{{ title }}</span>
        </div>
        <ToolBarLeft />
      </div>
      <div class="header-ri">
        <ToolBarRight />
      </div>
    </ElHeader>
    <ElContainer class="classic-content">
      <ElAside>
        <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
          <ElScrollbar>
            <ElMenu
              :router="false"
              :default-active="activeMenu"
              :collapse="isCollapse"
              :unique-opened="accordion"
              :collapse-transition="false"
            >
              <SubMenu :menu-list="menuList" />
            </ElMenu>
          </ElScrollbar>
        </div>
      </ElAside>
      <ElContainer class="classic-main">
        <MainContainer />
      </ElContainer>
    </ElContainer>
  </ElContainer>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LayoutClassic',
})
import { ElAside, ElContainer, ElHeader, ElMenu, ElScrollbar } from 'element-plus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useGlobalStore } from '@/stores/modules/global'
import MainContainer from '@/layouts/components/Main/index.vue'
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue'

const title = import.meta.env.VITE_GLOB_APP_TITLE

const route = useRoute()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
const accordion = computed(() => globalStore.accordion)
const isCollapse = computed(() => globalStore.isCollapse)
const menuList = computed(() => authStore.showMenuListGet)
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)
</script>

<style scoped lang="scss">
@use './index';
</style>
