<template>
  <div :class="['editor-box', self_disabled ? 'editor-disabled' : '']">
    <toolbar
      v-if="!hideToolBar"
      class="editor-toolbar"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <editor
      v-model="valueHtml"
      class="editor-content"
      :style="{ height }"
      :mode="mode"
      :default-config="editorConfig"
      @on-created="handleCreated"
      @on-blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'WangEditor' })
import { nextTick, computed, inject, shallowRef, onBeforeUnmount } from 'vue'
import type { IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { CommonAPI } from '@/api/common'
import '@wangeditor/editor/dist/css/style.css'
import { ElMessage, formContextKey, formItemContextKey } from 'element-plus'

// 富文本 DOM 元素
const editorRef = shallowRef()

// 实列化编辑器
const handleCreated = (editor: any) => {
  editorRef.value = editor
}

// 接收父组件参数，并设置默认值
interface RichEditorProps {
  value: string // 富文本值 ==> 必传
  toolbarConfig?: Partial<IToolbarConfig> // 工具栏配置 ==> 非必传（默认为空）
  editorConfig?: Partial<IEditorConfig> // 编辑器配置 ==> 非必传（默认为空）
  height?: string // 富文本高度 ==> 非必传（默认为 500px）
  mode?: 'default' | 'simple' // 富文本模式 ==> 非必传（默认为 default）
  hideToolBar?: boolean // 是否隐藏工具栏 ==> 非必传（默认为false）
  disabled?: boolean // 是否禁用编辑器 ==> 非必传（默认为false）
}
const props = withDefaults(defineProps<RichEditorProps>(), {
  toolbarConfig: () => {
    return {
      excludeKeys: [],
    }
  },
  editorConfig: () => {
    return {
      placeholder: '请输入内容...',
      MENU_CONF: {},
    }
  },
  height: '500px',
  mode: 'default',
  hideToolBar: false,
  disabled: false,
})

// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0)
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0)
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
  return props.disabled || formContext?.disabled
})

// 判断当前富文本编辑器是否禁用
if (self_disabled.value) {
  nextTick(() => editorRef.value.disable())
}

// 富文本的内容监听，触发父组件改变，实现双向数据绑定
const emit = defineEmits<{
  'update:value': [value: string]
  'check-validate': []
}>()
const valueHtml = computed({
  get() {
    return props.value
  },
  set(val: string) {
    // 防止富文本内容为空时，校验失败
    if (editorRef.value.isEmpty()) {
      val = ''
    }
    emit('update:value', val)
  },
})

/**
 * @description 图片自定义上传
 * @param file 上传的文件
 * @param insertFn 上传成功后的回调函数（插入到富文本编辑器中）
 * */
type InsertFnTypeImg = (_url: string, _alt?: string, _href?: string) => void
props.editorConfig.MENU_CONF!['uploadImage'] = {
  async customUpload(file: File, insertFn: InsertFnTypeImg) {
    // if (!uploadImgValidate(file)) return
    let formData = new FormData()
    formData.append('file', file)
    try {
      const { fileUrl } = await CommonAPI.uploadImg(formData)
      insertFn(fileUrl)
    } catch (error) {
      ElMessage.error((error as Error).toString())
    }
  },
}

// 图片上传前判断
// const uploadImgValidate = (file: File): boolean => {
//   console.log(file)
//   return true
// }

/**
 * @description 视频自定义上传
 * @param file 上传的文件
 * @param insertFn 上传成功后的回调函数（插入到富文本编辑器中）
 * */
type InsertFnTypeVideo = (_url: string, _poster?: string) => void
props.editorConfig.MENU_CONF!['uploadVideo'] = {
  async customUpload(file: File, insertFn: InsertFnTypeVideo) {
    // if (!uploadVideoValidate(file)) return
    let formData = new FormData()
    formData.append('file', file)
    try {
      const { fileUrl } = await CommonAPI.uploadVideo(formData)
      insertFn(fileUrl)
    } catch (error) {
      ElMessage.error((error as Error).toString())
    }
  },
}

// 视频上传前判断
// const uploadVideoValidate = (file: File): boolean => {
//   console.log(file)
//   return true
// }

// 编辑框失去焦点时触发
const handleBlur = () => {
  formItemContext?.prop && formContext?.validateField([formItemContext.prop as string])
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  if (!editorRef.value) {
    return
  }
  editorRef.value.destroy()
})

defineExpose({
  editor: editorRef,
})
</script>

<style scoped lang="scss">
@use './index';
</style>
