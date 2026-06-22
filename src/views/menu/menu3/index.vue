<template>
  <div class="card content-box">
    <span class="text">我是menu3 🍓🍇🍈🍉</span>
    <el-input v-model="value" placeholder="测试缓存" />
  </div>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
defineOptions({ name: 'Menu3' })
import { ref } from 'vue'
const value = ref<string>('')
</script>

<style scoped lang="scss">
@use './index';
</style>
