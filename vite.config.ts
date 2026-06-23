import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import { resolve, dirname } from 'path'
import { wrapperEnv } from './build/getEnv'
import { createProxy } from './build/proxy'
import { createVitePlugins } from './build/plugins'
import pkg from './package.json'
import { dayjs } from 'element-plus'
import { fileURLToPath } from 'url'

// Create equivalents for __dirname and __filename
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

/**
 * 按模块路径推导分块名，用于 Rolldown 的 codeSplitting（替代已废弃的 manualChunks）。
 * node_modules：按包名拆分（兼容 pnpm，忽略部分微小包）。
 * /src/：按目录归类（components-xxx / utils / stores / routers / styles / views-xxx）。
 * 返回 null 表示该模块不参与手动分块，交由 Rolldown 自动分块。
 */
function getChunkName(id: string): string | null {
  if (id.includes('node_modules')) {
    let pkgName = ''
    if (id.includes('.pnpm')) {
      // pnpm compatible - extract package name and version
      const match = id.match(/\.pnpm\/([^/]+)\//)
      if (match) {
        let pkgStr = match[1]
        // Handle pnpm scoped packages and peer dependencies
        if (pkgStr.includes('+')) {
          pkgStr = pkgStr.split('+').pop()!
        }
        pkgStr = pkgStr.split('_')[0]
        pkgName = pkgStr
      }
    } else {
      const parts = id.split('node_modules/')
      let name = parts[parts.length - 1].split('/')[0]
      if (name.startsWith('@')) {
        name = parts[parts.length - 1].split('/').slice(0, 2).join('/')
      }
      pkgName = name
    }

    if (!pkgName) return null

    // Ignore specific packages causing empty chunks or known to be problematic
    const ignoreList = [
      'birpc',
      'devtools-api',
      'devtools-kit',
      'devtools-shared',
      'hookable',
      'lodash-unified',
      'perfect-debounce',
      'vue-demi',
    ]

    // Check if pkgName exactly matches or starts with "name@" (for versioned pnpm names)
    const isIgnored = ignoreList.some(item => {
      return pkgName === item || pkgName.startsWith(item + '@')
    })

    if (isIgnored) return null

    return pkgName
  }
  if (id.includes('/src/')) {
    if (id.includes('/components/')) {
      const match = id.match(/\/src\/components\/([^/]+)/)
      return match ? `components-${match[1]}` : 'components-common'
    }
    if (id.includes('/utils/')) return 'utils'
    if (id.includes('/stores/')) return 'stores'
    if (id.includes('/routers/')) return 'routers'
    if (id.includes('/styles/')) return 'styles'
    if (id.includes('/views/')) {
      const relativePath = id.split('/views/')[1]
      if (relativePath) {
        const folders = relativePath.split('/')
        folders.pop()
        return folders.length > 0 ? folders.join('-') : 'views-root'
      }
    }
  }
  return null
}

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/var.scss" as *;`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
    plugins: createVitePlugins(viteEnv),
    build: {
      outDir: 'dist',
      sourcemap: process.env.NODE_ENV === 'development',
      rolldownOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          // 使用 Oxc 压缩器（Vite 8 默认），替代旧 terser drop_console / 失效的 esbuild.pure
          minify: {
            compress: {
              dropConsole: viteEnv.VITE_DROP_CONSOLE,
            },
          },
          // 手动分块（替代已废弃的 manualChunks）。返回 null 的模块交由 Rolldown 自动分块。
          codeSplitting: {
            groups: [
              {
                name: getChunkName,
              },
            ],
          },
        },
      },
    },
  }
})
