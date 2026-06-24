<template>
  <div class="">
    <el-alert
      title="SVG 图标使用 unplugin-icons 插件引入，官方文档请查看 ：https://github.com/unplugin/unplugin-icons。"
      description="默认安装了全量的 SVG 图标，体积比较大，但是只会打包使用到的图标，所以不必担心最终打包的体积。图标集合地址：https://icones.js.org/。如有自定义图标的需求，请放在 src/assets/icons/svg 目录下，如需修改配置请查看 uno.config.ts 文件。"
      type="warning"
      :closable="false"
    />
    <el-divider content-position="center"> 自定义图标 </el-divider>
    <div class="flex flex-wrap gap-2">
      <local-svg-icon-island />
      <local-svg-icon-map />
      <local-svg-icon-sail />
      <local-svg-icon-plane />
      <local-svg-icon-notebook />
      <local-svg-icon-weather />
      <local-svg-icon-camera />
      <local-svg-icon-drinking />
    </div>
    <div class="flex flex-wrap gap-2">
      <local-svg-icon-earth class="w-10 h-10 animate-spin" />
      <local-svg-icon-ship class="w-10 h-10" />
      <local-svg-icon-car class="w-10 h-10" />
    </div>
    <el-divider content-position="center"> Iconify 图标 </el-divider>
    <div class="flex flex-wrap gap-2">
      <IconAccessibility class="w-10 h-10 text-red-500" />
      <IconAccountBox class="w-10 h-10 text-blue-500 hover:scale-110 transition-all duration-300 cursor-pointer" />
      <svg-spinners-blocks-wave class="w-12 h-12" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SvgIcon1' })
import { ElAlert, ElDivider } from 'element-plus'
import localSvgIconIsland from '~icons/localSvgIcon/island?width=4em&height=4em'
import localSvgIconEarth from '~icons/localSvgIcon/earth'
import localSvgIconMap from '~icons/localSvgIcon/map'
import localSvgIconSail from '~icons/localSvgIcon/sail'
import localSvgIconPlane from '~icons/localSvgIcon/plane'
import localSvgIconNotebook from '~icons/localSvgIcon/notebook'
import localSvgIconWeather from '~icons/localSvgIcon/weather'
import localSvgIconCamera from '~icons/localSvgIcon/camera'
import localSvgIconDrinking from '~icons/localSvgIcon/drinking'
import localSvgIconShip from '~icons/localSvgIcon/ship'
import localSvgIconCar from '~icons/localSvgIcon/car'

import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'
import SvgSpinnersBlocksWave from '~icons/svg-spinners/blocks-wave'
</script>

<style lang="scss" scoped>
::v-deep(.el-divider__text) {
  background-color: var(--el-bg-color-page);
}
</style>
