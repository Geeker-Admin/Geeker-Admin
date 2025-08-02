import type { PluginOption } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { createHtmlPlugin } from 'vite-plugin-html'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import NextDevTools from 'vite-plugin-vue-devtools'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import devtoolsJson from 'vite-plugin-devtools-json'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import { cdn } from './cdn'

const iconsDir = './src/assets/icons/svg'

/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_DEVTOOLS, VITE_PWA, VITE_CODE_INSPECTOR, VITE_CDN } = viteEnv
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    // unocss
    UnoCSS(),
    // chrome dev tools
    devtoolsJson(),
    // devTools
    VITE_DEVTOOLS && NextDevTools({ launchEditor: 'code' }),
    // esLint 报错信息显示在浏览器界面上
    eslintPlugin({
      failOnError: false,
    }),
    // 创建打包压缩配置
    createCompression(viteEnv),
    // 自动导入组件 https://github.com/element-plus/element-plus-vite-starter/blob/main/vite.config.ts
    AutoImport({
      imports: ['vue'],
      dumpUnimportItems: false,
      viteOptimizeDeps: true,
      vueTemplate: true,
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/auto-imports.d.ts',
    }),
    // 自动导入组件
    Components({
      resolvers: [
        ElementPlusResolver(),
        // icon auto import
        // IconsResolver({
        //   enabledCollections: ['localSvgIcon'],
        // }),
      ],
      dts: 'src/types/components.d.ts',
    }),
    // 注入变量到 html 文件
    createHtmlPlugin({
      minify: true,
      inject: {
        data: { title: VITE_GLOB_APP_TITLE },
      },
    }),
    // 使用 svg 图标
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      customCollections: {
        localSvgIcon: FileSystemIconLoader(iconsDir, svg => {
          // const symbol = svg.includes('fill="') ? svg : svg.replace(/^<svg /, '<svg fill="currentColor" ')
          // console.log(1111, symbol)
          // return symbol.replace(/width="[\d.]+" height="[\d.]+"/, '')
          return svg
        }),
      },
      // todo w/h not working
      // defaultClass: 'inline-block w-10 h-10',
      // defaultStyle: 'width: 20px; height: 20px;',
      // scale: 1.2,
      // iconCustomizer: (collection, icon, props) => {
      //   if (collection === 'mdi' && icon === 'account') {
      //     props.width = '2em'
      //     props.height = '2em'
      //   }
      // },
      // transform(svg, collection, icon) {
      //   // apply fill to this icon on this collection
      //   if (collection === 'my-icons' && icon === 'account') return svg.replace(/^<svg /, '<svg fill="currentColor" ')

      //   return svg
      // },
    }),
    VITE_CDN && cdn,
    // vitePWA
    VITE_PWA && createVitePwa(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && (visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }) as PluginOption),
    // 自动 IDE 并将光标定位到 DOM 对应的源代码位置。see: https://inspector.fe-dev.cn/guide/start.html
    VITE_CODE_INSPECTOR &&
      codeInspectorPlugin({
        bundler: 'vite',
      }),
    // mock
    // mockDevServerPlugin(),
  ]
}

/**
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv
  const compressList = VITE_BUILD_COMPRESS.split(',')
  const plugins: PluginOption[] = []
  if (compressList.includes('gzip')) {
    plugins.push(
      viteCompression({
        ext: '.gz',
        algorithm: 'gzip',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      })
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      viteCompression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      })
    )
  }
  return plugins
}

/**
 * @description VitePwa
 * @param viteEnv
 */
const createVitePwa = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_GLOB_APP_TITLE } = viteEnv
  return VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_TITLE,
      theme_color: '#ffffff',
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  })
}
