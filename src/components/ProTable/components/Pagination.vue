<template>
  <!-- 分页组件 -->
  <el-pagination
    :background="true"
    :current-page="pageable.pageNum"
    :page-size="pageable.pageSize"
    :page-sizes="[10, 25, 50, 100]"
    :page-count="Math.ceil(pageable.total / pageable.pageSize)"
    :total="pageable.total"
    :size="globalStore?.assemblySize ?? 'default'"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
defineOptions({ name: 'Pagination' })
import { ElPagination } from 'element-plus'
import { useGlobalStore } from '@/stores/modules/global'
const globalStore = useGlobalStore()

interface Pageable {
  pageNum: number
  pageSize: number
  total: number
}

interface PaginationProps {
  pageable: Pageable
  handleSizeChange: (_size: number) => void
  handleCurrentChange: (_currentPage: number) => void
}

defineProps<PaginationProps>()
</script>
