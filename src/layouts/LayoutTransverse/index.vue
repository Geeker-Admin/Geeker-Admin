<!-- 横向布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="logo flex justify-center items-center">
        <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
        <span class="logo-text">{{ title }}</span>
      </div>
      <el-menu mode="horizontal" :router="false" :default-active="activeMenu">
        <!-- 不能直接使用 SubMenu 组件，无法触发 el-menu 隐藏省略功能 -->
        <template v-for="subItem in menuList" :key="subItem.path">
          <el-sub-menu v-if="subItem.children?.length" :key="subItem.path" :index="subItem.path + 'el-sub-menu'">
            <template #title>
              <el-icon>
                <component :is="subItem.meta.icon" />
              </el-icon>
              <span>{{ subItem.meta.title }}</span>
            </template>
            <sub-menu :menu-list="subItem.children" />
          </el-sub-menu>
          <el-menu-item
            v-else
            :key="subItem.path + 'el-menu-item'"
            :index="subItem.path"
            @click="handleClickMenu(subItem)"
          >
            <el-icon>
              <component :is="subItem.meta.icon" />
            </el-icon>
            <template #title>
              <span>{{ subItem.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
      <tool-bar-right />
    </el-header>
    <MainContainer />
  </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElHeader, ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
defineOptions({
  name: 'LayoutTransverse',
})
import { computed } from 'vue'
import { useAuthStore } from '@/stores/modules/auth'
import { useRoute, useRouter } from 'vue-router'
import MainContainer from '@/layouts/components/Main/index.vue'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue'
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'
import type { MenuOptions } from '@/api/system/menu'

const title = import.meta.env.VITE_GLOB_APP_TITLE

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const menuList = computed(() => authStore.showMenuListGet)
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)

const handleClickMenu = (subItem: MenuOptions) => {
  if (subItem.meta.isLink) {
    return window.open(subItem.meta.isLink, '_blank')
  }
  router.push(subItem.path)
}
</script>

<style scoped lang="scss">
@use './index';
</style>
