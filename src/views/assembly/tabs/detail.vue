<template>
  <div class="card content-box">
    <span class="text"> 我是 Tab 详情页 🍓🍇🍈🍉</span>
    <span class="text">params:{{ route.params }}</span>
    <el-input v-model="value" placeholder="测试详情页缓存" />
  </div>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
defineOptions({ name: 'TabsDetail' })
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTabsStore } from '@/stores/modules/tabs'

const route = useRoute()
const tabStore = useTabsStore()
tabStore.setTabsTitle(`No.${route.params.id} - ${route.meta.title}`)

const value = ref('')
</script>
