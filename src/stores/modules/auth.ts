import { defineStore } from 'pinia'
import type { AuthState } from '@/stores/interface'
import { AccountAPI } from '@/api/account'
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from '@/utils'
import { useRoute } from 'vue-router'
import { computed, reactive, toRefs } from 'vue'

export const useAuthStore = defineStore('geeker-auth', () => {
  const route = useRoute()
  const state = reactive<AuthState>({
    // 全部的按钮权限列表
    allAuthButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: '',
  })

  const authButtonList = computed(() => {
    return state.allAuthButtonList[route.name as string] || []
  })

  const showMenuListGet = computed(() => getShowMenuList(state.authMenuList))
  const flatMenuListGet = computed(() => getFlatMenuList(state.authMenuList))
  const breadcrumbListGet = computed(() => getAllBreadcrumbList(state.authMenuList))
  const authMenuListGet = computed(() => state.authMenuList)

  const actions = {
    async getAuthButtonList() {
      state.allAuthButtonList = await AccountAPI.getUserButtons()
    },
    async getAuthMenuList() {
      state.authMenuList = await AccountAPI.getUserMenu()
    },
    async setRouteName(name: string) {
      state.routeName = name
    },
  }

  return {
    ...toRefs(state),
    authButtonList,
    showMenuListGet,
    flatMenuListGet,
    breadcrumbListGet,
    authMenuListGet,
    ...actions,
  }
})
