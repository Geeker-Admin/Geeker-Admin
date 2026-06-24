<template>
  <div class="not-container">
    <img src="@/assets/images/403.webp" class="not-img" alt="403" />
    <div class="not-detail">
      <h2>403</h2>
      <h4>抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</h4>
      <el-button type="primary" @click="router.back"> 返回上一页 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: '403' })
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped lang="scss">
@use './index';
</style>
