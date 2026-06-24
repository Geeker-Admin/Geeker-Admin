<template>
  <div class="card content-box">
    <span class="text">我是menu2-2-1 🍓🍇🍈🍉</span>
    <el-input v-model="value" placeholder="测试缓存" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Menu221' })
import { ElInput } from 'element-plus'
import { ref } from 'vue'
const value = ref<string>('')
</script>

<style scoped lang="scss">
@use './index';
</style>
