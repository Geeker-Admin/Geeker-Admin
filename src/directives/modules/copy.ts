/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */

import type { Directive, DirectiveBinding } from 'vue'
import { ElMessage } from 'element-plus'
interface ElType extends HTMLElement {
  copyData: string | number
}
const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value
    el.addEventListener('click', () => void handleClick(el))
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', () => void handleClick(el))
  },
}

async function handleClick({ copyData }: any) {
  try {
    await navigator.clipboard.writeText(copyData)
    ElMessage({
      type: 'success',
      message: '复制成功',
    })
  } catch (err) {
    console.error('复制操作不被支持或失败: ', err)
  }
}

export default copy
