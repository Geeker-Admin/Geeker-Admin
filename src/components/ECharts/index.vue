<template>
  <div id="echarts" ref="chartRef" :style="echartsStyle"></div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ECharts' })
import { ref, onMounted, onBeforeUnmount, watch, computed, markRaw, nextTick, onActivated } from 'vue'
import type { EChartsType, ECElementEvent } from 'echarts/core'
import type { ECOption } from './config'
import echarts from './config'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import { useGlobalStore } from '@/stores/modules/global'
import { storeToRefs } from 'pinia'

interface Props {
  option: ECOption
  renderer?: 'canvas' | 'svg'
  resize?: boolean
  theme?: object | string
  width?: number | string
  height?: number | string
  onClick?: (_event: ECElementEvent) => any
}

const props = withDefaults(defineProps<Props>(), {
  renderer: 'canvas',
  resize: true,
})

const echartsStyle = computed(() => {
  return props.width || props.height
    ? { height: props.height + 'px', width: props.width + 'px' }
    : { height: '100%', width: '100%' }
})

const chartRef = ref<HTMLDivElement | HTMLCanvasElement>()
const chartInstance = ref<EChartsType>()

const draw = () => {
  if (chartInstance.value) {
    chartInstance.value.setOption(props.option, { notMerge: true })
  }
}

watch(props, () => {
  draw()
})

const handleClick = (event: ECElementEvent) => props.onClick && props.onClick(event)

const init = () => {
  if (!chartRef.value) {
    return
  }
  chartInstance.value = echarts.getInstanceByDom(chartRef.value)

  if (!chartInstance.value) {
    chartInstance.value = markRaw(
      echarts.init(chartRef.value, props.theme, {
        renderer: props.renderer,
      })
    )
    chartInstance.value.on('click', handleClick)
    draw()
  }
}

const resize = () => {
  if (chartInstance.value && props.resize) {
    chartInstance.value.resize({ animation: { duration: 300 } })
  }
}

const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 })

const globalStore = useGlobalStore()
const { maximize, isCollapse, tabs, footer } = storeToRefs(globalStore)

watch(
  () => [maximize, isCollapse, tabs, footer],
  () => {
    debouncedResize()
  },
  { deep: true }
)

onMounted(() => {
  nextTick(() => init())
})

useEventListener(window, 'resize', debouncedResize)

onActivated(() => {
  if (chartInstance.value) {
    chartInstance.value.resize()
  }
})

onBeforeUnmount(() => {
  chartInstance.value?.dispose()
})

defineExpose({
  getInstance: () => chartInstance.value,
  resize,
  draw,
})
</script>
