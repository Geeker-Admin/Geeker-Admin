import { defineStore } from 'pinia'
import type { UserInfo } from '@/stores/interface/store'
import piniaPersistConfig from '@/stores/helper/persist'
import { useStorage } from '@vueuse/core'

const STORE_NAME = 'geeker-user'
export const useUserStore = defineStore(
  STORE_NAME,
  () => {
    const accessToken = useStorage('accessToken', '')
    const refreshToken = useStorage('refreshToken', '')
    const userInfo = useStorage<UserInfo>('userInfo', { name: 'Geeker' } as UserInfo)

    const setToken = (token: string) => {
      accessToken.value = token
      refreshToken.value = token
      userInfo.value.isLoggedIn = true
    }

    const setRefreshToken = (token: string) => {
      refreshToken.value = token
    }

    const clearUserInfo = () => {
      userInfo.value = {} as UserInfo
      accessToken.value = ''
      refreshToken.value = ''
    }

    const setUserInfo = (info: UserInfo) => {
      userInfo.value = info
    }

    const getUserToken = () => {
      return refreshToken.value || accessToken.value
    }

    return {
      userInfo,
      setToken,
      setUserInfo,
      clearUserInfo,
      setRefreshToken,
      getUserToken,
    }
  },
  {
    persist: piniaPersistConfig(STORE_NAME),
  }
)
