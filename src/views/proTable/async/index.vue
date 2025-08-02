<template>
  <div class="table-box">
    <ProTable :columns="columns" :request-api="getList" :toolbar-middle="toolbarMiddle" />
    <el-dialog v-model="functionDialogVisible" title="功能说明" width="600px">
      <h3 class="mb-2 text-lg font-bold">本页面演示了 ProTable 的异步请求功能。使用场景：</h3>
      <div class="mt-2">
        有些搜索条件是需要调用接口获取默认值的，比如：下拉框的选项，需要调用接口获取。所以需要：
        <ul class="ml-4">
          <li>1，不阻塞页面渲染，使用异步请求获取默认值，然后赋值给搜索条件</li>
          <li>2，使用异步请求获取默认值</li>
          <li>3，作为默认值在搜索表单回显</li>
          <li>4，把请求到的默认值作为参数调用列表接口，获取列表数据</li>
          <li>5，点击重置搜索表单按钮时，表单重置为异步获的初始值</li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="tsx">
defineOptions({ name: 'AsyncProTable' })
import { ElButton, ElMessage } from 'element-plus'
import ProTable from '@/components/ProTable/index.vue'
import type { ColumnProps } from '@/components/ProTable/interface'
import { useLoadingStore } from '@/stores/modules/loading'

const loadingStore = useLoadingStore()

const getSearchDefaultValue = new Promise(resolve => {
  loadingStore.setLoading(true)
  setTimeout(() => {
    loadingStore.setLoading(false)
    ElMessage.success('获取查询条件成功，默认值为：张三123，调用列表接口获取数据，请稍等...')
    resolve('张三123')
  }, 5000)
})

const columns = ref<ColumnProps[]>([
  { type: 'index', label: '序号', width: 80 },
  {
    label: '名称',
    prop: 'name',
    search: { el: 'input', defaultValue: getSearchDefaultValue },
  },
  { label: '年龄', prop: 'age' },
  { label: '地址', prop: 'address' },
  { label: '手机号', prop: 'phone' },
  { label: '性别', prop: 'gender' },
  { label: '邮箱', prop: 'email' },
])
const MockData = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `张三${index + 1}`,
  age: Math.floor(Math.random() * 100),
  address: `地址${index + 1}`,
  phone: `1380013800${index + 1}`,
  gender: Math.random() > 0.5 ? '男' : '女',
  email: `zhangsan${index + 1}@example.com`,
}))

const functionDialogVisible = ref(false)

const toolbarMiddle = () => {
  return (
    <ElButton type="primary" icon="InfoFilled" onClick={() => (functionDialogVisible.value = true)}>
      功能说明
    </ElButton>
  )
}

const getList = async (_params: any) => {
  const data = MockData.filter(item => item.name.includes(_params.name)).slice(
    (_params.pageNum - 1) * _params.pageSize,
    _params.pageNum * _params.pageSize
  )
  loadingStore.setLoading(true)
  // 模拟请求
  await new Promise(resolve => setTimeout(resolve, 5000))
  loadingStore.setLoading(false)
  return {
    list: data,
    total: MockData.length,
  }
}
</script>
