<template>
  <div class="card content-box">
    <el-form
      :model="form"
      label-width="auto"
      class="p-5 rounded-lg border border-dashed border-gray-500"
      label-position="top"
    >
      <el-form-item label="通过 options 传递数据">
        <Dict v-model="form.dict1" :options="passedData.options" prop="dict1" />
      </el-form-item>
      <el-form-item label="通过远程获取数据">
        <Dict
          v-model="form.dict2"
          :options="remoteData.options"
          type="radio-button"
          :code="remoteData.code"
          prop="dict2"
        />
      </el-form-item>
      <el-form-item label="全量Dict数据">
        <Dict v-model="form.dict3" code="notice_type" prop="dict3" type="radio-button" />
      </el-form-item>
      <el-form-item label="超过3个选项时，会自动切换为 select">
        <Dict v-model="form.dict4" code="wind_level" prop="dict4" />
      </el-form-item>
      <el-form-item label="绑定一个未定义的 code, 会报错" error="code [notice_type1] 不存在">
        <Dict v-model="form.dict5" code="notice_type1" prop="dict5" />
      </el-form-item>
      <p class="my-5 pt-2">表单数据: {{ form }}</p>
      <el-alert
        title="第二个表单项代码里设置了 options: [ { label: '3', value: 3 }, { label: '4', value: 4 } ]，但是 code 的优先级更高，所以会显示 code 的 options。"
        :closable="false"
        type="success"
      />
    </el-form>
    <el-divider />

    <div>
      <el-alert
        title="字典数据因为不常修改，所以设置了本地缓存，默认时间是30天。如果需要清除缓存，可以调用 clearDict 方法。ProTable 中 enum 的配置项也采用了这个机制。"
        :closable="false"
        type="success"
      />
    </div>
    <el-descriptions title="配置项 📚" :column="1" border>
      <el-descriptions-item label="code"> 字典编码，优先级最高，如果设置了 code，则 options 无效 </el-descriptions-item>
      <el-descriptions-item label="options"> 本地数据，如果设置了 code，则 options 无效 </el-descriptions-item>
      <el-descriptions-item label="type">
        类型，可选值为 radio、radio-button、select。字典数据长度小于等于3时，默认是 radio，否则是 select
      </el-descriptions-item>
      <el-descriptions-item label="prop"> el-form-item 的绑定字段 </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { ElAlert, ElDescriptions, ElDescriptionsItem, ElDivider, ElForm, ElFormItem } from 'element-plus'
import Dict from '@/components/Dict/index.vue'
import { ref } from 'vue'
const form = ref({
  dict1: 1,
  dict2: 1,
  dict3: 1,
  dict4: 1,
  dict5: 1,
})

const passedData = {
  options: [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
  ],
}

const remoteData = {
  code: 'gender',
  options: [
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ],
}
</script>
