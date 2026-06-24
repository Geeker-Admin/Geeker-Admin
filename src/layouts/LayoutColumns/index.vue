<!-- 分栏布局 -->
<template>
  <ElContainer class="layout">
    <div class="aside-split">
      <div class="logo flex justify-center items-center">
        <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
      </div>
      <ElScrollbar>
        <div class="split-list">
          <div
            v-for="item in menuList"
            :key="item.path"
            class="split-item"
            :class="{ 'split-active': splitActive === item.path || `/${splitActive.split('/')[1]}` === item.path }"
            @click="changeSubMenu(item)"
          >
            <ElIcon>
              <component :is="item.meta.icon" />
            </ElIcon>
            <span class="title">{{ item.meta.title }}</span>
          </div>
        </div>
      </ElScrollbar>
    </div>
    <ElAside :class="{ 'not-aside': !subMenuList.length }" :style="{ width: isCollapse ? '65px' : '210px' }">
      <div class="logo flex justify-center items-center">
        <span v-show="subMenuList.length" class="logo-text">{{ isCollapse ? 'G' : title }}</span>
      </div>
      <ElScrollbar>
        <ElMenu
          :router="false"
          :default-active="activeMenu"
          :collapse="isCollapse"
          :unique-opened="accordion"
          :collapse-transition="false"
        >
          <SubMenu :menu-list="subMenuList" />
        </ElMenu>
      </ElScrollbar>
    </ElAside>
    <ElContainer>
      <ElHeader>
        <ToolBarLeft />
        <ToolBarRight />
      </ElHeader>
      <MainContainer />
    </ElContainer>
  </ElContainer>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LayoutColumns',
})
import { ElAside, ElContainer, ElHeader, ElIcon, ElMenu, ElScrollbar } from 'element-plus'
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useGlobalStore } from '@/stores/modules/global'
import MainContainer from '@/layouts/components/Main/index.vue'
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue'
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'
import type { MenuOptions } from '@/api/system/menu'

const title = import.meta.env.VITE_GLOB_APP_TITLE

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
const accordion = computed(() => globalStore.accordion)
const isCollapse = computed(() => globalStore.isCollapse)
const menuList = computed(() => authStore.showMenuListGet)
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)

const subMenuList = ref<MenuOptions[]>([])
const splitActive = ref('')
watch(
  () => [menuList, route],
  () => {
    // 当前菜单没有数据直接 return
    if (!menuList.value.length) {
      return
    }
    splitActive.value = route.path
    const menuItem = menuList.value.filter((item: MenuOptions) => {
      return route.path === item.path || `/${route.path.split('/')[1]}` === item.path
    })
    if (menuItem[0].children?.length) {
      return (subMenuList.value = menuItem[0].children)
    }
    subMenuList.value = []
  },
  {
    deep: true,
    immediate: true,
  }
)

// change SubMenu
const changeSubMenu = (item: MenuOptions) => {
  splitActive.value = item.path
  if (item.children?.length) {
    return (subMenuList.value = item.children)
  }
  subMenuList.value = []
  router.push(item.path)
}
</script>

<style scoped lang="scss">
@use './index';
</style>
