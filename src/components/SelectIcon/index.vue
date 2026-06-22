<template>
  <div class="icon-box">
    <el-input
      ref="inputRef"
      v-model="valueIcon"
      v-bind="$attrs"
      :placeholder="placeholder"
      :clearable="clearable"
      @clear="clearIcon"
      @click="openDialog"
    >
      <template #append>
        <template v-if="valueIcon.startsWith('i-')">
          <!-- <el-divider content-position="center"> 本地图标 </el-divider> -->
          <span :class="valueIcon" class="inline-block w-5 h-5"></span>
        </template>
        <template v-else>
          <!-- <el-divider content-position="center"> Element Plus 图标 </el-divider> -->
          <component :is="Icons[valueIcon]" class="inline-block w-5 h-5" />
        </template>
      </template>
    </el-input>
    <el-dialog v-model="dialogVisible" :title="placeholder" top="50px" width="66%">
      <el-input v-model="inputValue" placeholder="搜索图标" size="large" :prefix-icon="Icons.Search" class="my-5" />
      <el-scrollbar v-if="iconsList.length > 0" height="600px">
        <div class="icon-list">
          <div v-for="item in iconsList" :key="item.value" class="icon-item" @click="selectIcon(item)">
            <template v-if="item.label.startsWith('i-')">
              <!-- <el-divider content-position="center"> 本地图标 </el-divider> -->
              <span :class="item.value" class="inline-block w-11 h-11"></span>
            </template>
            <template v-else>
              <!-- <el-divider content-position="center"> Element Plus 图标 </el-divider> -->
              <component :is="Icons[item.value]" class="inline-block w-11 h-11" />
            </template>
            <span class="break-all">{{ item.label }}</span>
          </div>
        </div>
      </el-scrollbar>
      <el-empty v-else description="未搜索到您要找的图标~" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElDialog, ElEmpty, ElInput, ElScrollbar } from 'element-plus'
defineOptions({ name: 'SelectIcon' })
import { ref, computed } from 'vue'
import * as Icons from '@element-plus/icons-vue'

const allIcons = ref<{ label: string; value: string }[]>([])

const processIcons = () => {
  // 本地图标
  const localIconFiles = import.meta.glob('@/assets/icons/svg/*.svg', { eager: true })
  for (const key in localIconFiles) {
    const name = key.split('/').pop()?.replace('.svg', '')
    if (name) {
      // 前缀 i- 是 unocss.config.ts 中 presetIcons 的 prefix 配置，localSvgIcon 是 customCollections 的 key
      allIcons.value.push({ label: `i-localSvgIcon:${name}`, value: `i-localSvgIcon:${name}` })
    }
  }
  // Element Plus 图标
  for (const key in Icons) {
    allIcons.value.push({ label: `el-${key.toLocaleLowerCase()}`, value: key })
  }
}

processIcons()

interface SelectIconProps {
  iconValue?: string
  title?: string
  clearable?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<SelectIconProps>(), {
  iconValue: '',
  title: '请选择图标',
  clearable: true,
  placeholder: '请选择图标',
})

// 重新接收一下，防止打包后 clearable 报错
const valueIcon = ref(props.iconValue)

// open Dialog
const dialogVisible = ref(false)
const openDialog = () => (dialogVisible.value = true)

// 选择图标(触发更新父组件数据)
const emit = defineEmits<{
  'update:iconValue': [value: string]
}>()
const selectIcon = (item: any) => {
  dialogVisible.value = false
  valueIcon.value = item.value
  emit('update:iconValue', item.value)
  setTimeout(() => inputRef.value.blur(), 0)
}

// 清空图标
const inputRef = ref()
const clearIcon = () => {
  valueIcon.value = ''
  emit('update:iconValue', '')
  setTimeout(() => inputRef.value.blur(), 0)
}

// 监听搜索框值
const inputValue = ref('')
const iconsList = computed(() => {
  if (!inputValue.value) {
    return allIcons.value
  }
  return allIcons.value.filter(item => item.label.toLowerCase().includes(inputValue.value.toLowerCase()))
})
</script>

<style scoped lang="scss">
@use './index';
</style>
