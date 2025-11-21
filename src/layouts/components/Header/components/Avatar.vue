<template>
  <el-dropdown trigger="click">
    <div class="avatar">
      <span class="username">{{ username }}</span>
      <img src="@/assets/images/avatar.gif" alt="avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openDialog('infoRef')">
          <el-icon><User /></el-icon>{{ $t('header.personalData') }}
        </el-dropdown-item>
        <el-dropdown-item @click="openDialog('passwordRef')">
          <el-icon><Edit /></el-icon>{{ $t('header.changePassword') }}
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <el-icon><SwitchButton /></el-icon>{{ $t('header.logout') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- infoDialog -->
  <info-dialog ref="infoRef" />
  <!-- passwordDialog -->
  <password-dialog ref="passwordRef" />
</template>

<script setup lang="ts">
defineOptions({
  name: 'Avatar',
})
import { computed, ref } from 'vue'
import { AuthApi } from '@/api/auth'
import { useUserStore } from '@/stores/modules/user'
import { ElMessageBox, ElMessage } from 'element-plus'
import InfoDialog from './InfoDialog.vue'
import PasswordDialog from './PasswordDialog.vue'
import { logoutWithRedirect } from '@/utils'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()
const username = computed(() => userStore.userInfo.name)

// 退出登录
const logout = () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 1.执行退出登录接口
    await AuthApi.logout()

    // 2.清除 Token
    userStore.clearUserInfo()
    ElMessage.success('退出登录成功！')
    // 3.重定向到登陆页
    logoutWithRedirect(route)
  })
}

// 打开修改密码和个人信息弹窗
const infoRef = ref<InstanceType<typeof InfoDialog> | null>(null)
const passwordRef = ref<InstanceType<typeof PasswordDialog> | null>(null)
const openDialog = (ref: string) => {
  if (ref == 'infoRef') {
    infoRef.value?.openDialog()
  }
  if (ref == 'passwordRef') {
    passwordRef.value?.openDialog()
  }
}
</script>

<style scoped lang="scss">
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  .username {
    margin: 0 20px;
    font-size: 15px;
    color: var(--el-header-text-color);
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
