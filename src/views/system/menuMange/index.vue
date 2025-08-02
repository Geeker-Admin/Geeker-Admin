<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="菜单列表"
      row-key="path"
      :indent="20"
      :columns="columns"
      :pagination="ProTablePaginationEnum.NONE"
      :request-api="menuData"
    >
      <!-- 表格 header 按钮 -->
      <template #toolbarLeft>
        <ElButton type="primary" :icon="CirclePlus"> 新增菜单 </ElButton>
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <ElIcon :size="18">
          <component :is="scope.row.meta.icon" />
        </ElIcon>
      </template>
      <!-- 菜单操作 -->
      <template #[TABLE_COLUMN_OPERATIONS_NAME]>
        <ElButton type="primary" link :icon="EditPen"> 编辑 </ElButton>
        <ElButton type="primary" link :icon="Delete"> 删除 </ElButton>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MenuMange' })
import { ref } from 'vue'
import type { ColumnProps } from '@/components/ProTable/interface'
import { Delete, EditPen, CirclePlus } from '@element-plus/icons-vue'
import authMenuList from '@/assets/json/authMenuList.json'
import ProTable from '@/components/ProTable/index.vue'
import { ProTablePaginationEnum } from '@/enums'
import { TABLE_COLUMN_OPERATIONS_NAME } from '@/constants/proTable'

const proTable = ref()

const menuData = () => Promise.resolve(authMenuList.data)

// 表格配置项
const columns: ColumnProps[] = [
  { prop: 'meta.title', label: '菜单名称', align: 'left', search: { el: 'input' } },
  { prop: 'meta.icon', label: '菜单图标' },
  { prop: 'name', label: '菜单 name', search: { el: 'input' } },
  { prop: 'path', label: '菜单路径', width: 300, search: { el: 'input' } },
  { prop: 'component', label: '组件路径', width: 300 },
  { prop: TABLE_COLUMN_OPERATIONS_NAME, label: '操作', width: 250, fixed: 'right' },
]
</script>
