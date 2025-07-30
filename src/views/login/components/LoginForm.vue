<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="密码：123456"
        show-password
        autocomplete="new-password"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
    <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
      登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { HOME_URL } from '@/config'
import { encryptPassword, getTimeState } from '@/utils'
import { ElNotification } from 'element-plus'
import { AuthApi, type ReqLoginForm } from '@/api/auth'
import { useUserStore } from '@/stores/modules/user'
import { useTabsStore } from '@/stores/modules/tabs'
import { useKeepAliveStore } from '@/stores/modules/keepAlive'
import { initDynamicRouter } from '@/routers/modules/dynamicRouter'
import { CircleClose, UserFilled } from '@element-plus/icons-vue'
import type { ElForm } from 'element-plus'
import { useLoadingStore } from '@/stores/modules/loading'
import { storeToRefs } from 'pinia'
import { useDictStore } from '@/stores/modules/dict'

// todo caps lock
// todo forget password
// todo remember me
const router = useRouter()
const userStore = useUserStore()
const tabsStore = useTabsStore()
const keepAliveStore = useKeepAliveStore()

type FormInstance = InstanceType<typeof ElForm>
const loginFormRef = ref<FormInstance>()
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const { loading } = storeToRefs(useLoadingStore())
const loginForm = reactive<ReqLoginForm>({
  username: 'admin',
  password: '123456',
})

// login
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate(async valid => {
    if (!valid) {
      return
    }
    // 1.执行登录接口
    const hashedPassword = await encryptPassword(loginForm.password)
    const { access_token } = await AuthApi.login({ ...loginForm, password: hashedPassword })
    localStorage.setItem('userCode', loginForm.username)
    userStore.setToken(access_token)

    // 2.添加动态路由
    await initDynamicRouter()
    useDictStore().getAllDict()

    // 3.清空 tabs、keepAlive 数据
    tabsStore.setTabs([])
    keepAliveStore.setKeepAliveName([])

    // 4.跳转到首页
    router.push(HOME_URL)
    ElNotification({
      title: getTimeState(),
      message: '欢迎登录 Geeker-Admin',
      type: 'success',
      duration: 3000,
    })
  })
}

// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.resetFields()
}

onMounted(() => {
  // 监听 enter 事件（调用登录）
  document.onkeydown = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
      if (loading.value) {
        return
      }
      login(loginFormRef.value)
    }
  }
})

onBeforeUnmount(() => {
  document.onkeydown = null
})
</script>

<style scoped lang="scss">
@use '../index';
</style>
