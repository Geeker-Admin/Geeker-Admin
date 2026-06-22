<template>
  <el-icon class="collapse-icon" @click="changeCollapse">
    <component :is="globalStore.isCollapse ? 'expand' : 'fold'" />
  </el-icon>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'
import { useGlobalStore } from '@/stores/modules/global'

const globalStore = useGlobalStore()
const changeCollapse = () => (globalStore.isCollapse = !globalStore.isCollapse)
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--el-header-text-color);
  cursor: pointer;
}
</style>
