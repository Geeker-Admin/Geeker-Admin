<template>
  <el-dropdown trigger="click" @command="setAssemblySize">
    <tabler-layout class="cursor-pointer" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in assemblySizeList"
          :key="item.value"
          :command="item.value"
          :disabled="assemblySize === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AssemblySize',
})
import { computed } from 'vue'
import { useGlobalStore } from '@/stores/modules/global'
import type { AssemblySizeType } from '@/stores/interface/store'
import TablerLayout from '~icons/tabler/layout?width=20px&height=20px'

const globalStore = useGlobalStore()
const assemblySize = computed(() => globalStore.assemblySize)

const assemblySizeList = [
  { label: '默认', value: 'default' },
  { label: '大型', value: 'large' },
  { label: '小型', value: 'small' },
]

const setAssemblySize = (item: AssemblySizeType) => {
  if (assemblySize.value === item) {
    return
  }
  globalStore.assemblySize = item
}
</script>
