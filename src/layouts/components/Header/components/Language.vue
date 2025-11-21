<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <meteor-icons-language class="cursor-pointer" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in availableLocales" :key="item" :command="item" :disabled="locale === item">
          {{ localeMapping[item as keyof typeof localeMapping] }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Language',
})
import { useI18n } from 'vue-i18n'
import { useGlobalStore } from '@/stores/modules/global'
import type { LanguageType } from '@/stores/interface/store'
import MeteorIconsLanguage from '~icons/meteor-icons/language?width=20px&height=20px'
import { localeMapping } from '@/locales'

const { locale, availableLocales } = useI18n({ useScope: 'global' })

const globalStore = useGlobalStore()

const changeLanguage = (lang: string) => {
  locale.value = lang
  globalStore.language = lang as LanguageType
}
</script>
