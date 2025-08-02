<template>
  <template v-if="localType === 'select'">
    <el-select v-model="value" v-bind="rest" :disabled="localDisabled" :prop="prop">
      <el-option v-for="item in localOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </template>
  <template v-else-if="localType === 'radio'">
    <el-radio-group v-model="value" v-bind="rest" :disabled="localDisabled" :prop="prop">
      <el-radio v-for="item in localOptions" :key="item.value" :value="item.value">{{ item.label }}</el-radio>
    </el-radio-group>
  </template>
  <!-- <template v-else-if="localType === 'checkbox'">
    <el-checkbox-group v-model="value" v-bind="rest">
      <el-checkbox v-for="item in options" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
    </el-checkbox-group>
  </template> -->
  <template v-else-if="localType === 'radio-button'">
    <el-radio-group v-model="value" v-bind="rest" :disabled="localDisabled" :prop="prop">
      <el-radio-button v-for="item in localOptions" :key="item.value" :value="item.value">
        {{ item.label }}
      </el-radio-button>
    </el-radio-group>
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectProps } from 'element-plus'
import { useLoadingStore } from '@/stores/modules/loading'
import { useDictStore } from '@/stores/modules/dict'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface DictProps extends Partial<SelectProps> {
  modelValue: string | number | boolean
  options?: SelectOption[]
  type?: 'select' | 'radio' | 'checkbox' | 'radio-button'
  prop?: string
  code?: string
}

const dictStore = useDictStore()
const { modelValue, options, type, code, disabled, ...rest } = defineProps<DictProps>()
const loadingStore = useLoadingStore()

const emit = defineEmits<{
  (_e: 'update:modelValue', _value: string | number | boolean): void
}>()

const localOptions = ref<SelectOption[]>([])

if (code) {
  dictStore.getDict(code).then(data => {
    localOptions.value = data
  })
} else {
  if (!options?.length) {
    throw new Error(t('error.notRemoteDictNeedOptions'))
  } else {
    localOptions.value = options
  }
}

const localType = computed(() => {
  if (type) {
    return type
  }
  if (localOptions.value.length <= 3) {
    return 'radio'
  }
  return 'select'
})

const value = computed({
  get: () => modelValue,
  set: value => emit('update:modelValue', value),
})

const localDisabled = computed(() => {
  return disabled || loadingStore.loading
})
</script>
