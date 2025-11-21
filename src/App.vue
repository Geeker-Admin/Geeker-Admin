<template>
  <ElConfigProvider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getBrowserLang } from '@/utils'
import { useTheme } from '@/hooks/useTheme'
import { ElConfigProvider } from 'element-plus'
import type { LanguageType } from './stores/interface/store'
import { useGlobalStore } from '@/stores/modules/global'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const globalStore = useGlobalStore()

// init theme
const { initTheme } = useTheme()
initTheme()

// init language
const i18n = useI18n()
onMounted(() => {
  const language = globalStore.language ?? (getBrowserLang() as LanguageType)
  i18n.locale.value = language || ''
  globalStore.language = language
})

// element language
const locale = computed(() => {
  if (globalStore.language == 'zh') {
    return zhCn
  }
  if (globalStore.language == 'en') {
    return en
  }
  return getBrowserLang() == 'zh' ? zhCn : en
})

// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize)

// element button config
const buttonConfig = reactive({ autoInsertSpace: false })
</script>
