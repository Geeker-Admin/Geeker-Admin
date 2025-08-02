<template>
  <!-- 列设置 -->
  <el-drawer v-model="drawerVisible" :title="$t('proTable.colSetting')" size="450px">
    <div class="table-main">
      <el-table
        :data="colSetting"
        :border="true"
        row-key="prop"
        default-expand-all
        :tree-props="{ children: '_children' }"
      >
        <el-table-column prop="label" align="center" :label="$t('proTable.colName')" />
        <el-table-column v-slot="scope" prop="isShow" align="center" :label="$t('proTable.colShow')">
          <el-switch v-model="scope.row.isShow" />
        </el-table-column>
        <el-table-column v-slot="scope" prop="sortable" align="center" :label="$t('proTable.colSort')">
          <el-switch v-model="scope.row.sortable" />
        </el-table-column>
        <template #empty>
          <el-empty :description="$t('proTable.noColSetting')" />
        </template>
      </el-table>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ColSetting',
})
import { ref } from 'vue'
import type { ColumnProps } from '@/components/ProTable/interface'

defineProps<{ colSetting: ColumnProps[] }>()

const drawerVisible = ref<boolean>(false)

const openColSetting = () => {
  drawerVisible.value = true
}

defineExpose({
  openColSetting,
})
</script>

<style scoped lang="scss">
.cursor-move {
  cursor: move;
}
</style>
