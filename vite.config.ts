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
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log'] : [],
    },
    build: {
      outDir: 'dist',
      // minify: 'esbuild',
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: viteEnv.VITE_DROP_CONSOLE,
          drop_debugger: true,
        },
      },
      sourcemap: process.env.NODE_ENV === 'development',
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      // reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      // chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
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

              if (!pkgName) return

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

              if (isIgnored) {
                return
              }

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
          },
        },
      },
    },
  }
})
