<template>
  <div class="card content-box">
    <span class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</span>
    <div v-draggable class="drag-box flex justify-center items-center">我可以拖拽哦~</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DragDirect' })
</script>

<style scoped lang="scss">
@use './index';
</style>
