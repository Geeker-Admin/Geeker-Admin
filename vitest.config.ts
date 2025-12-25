import { defineConfig, mergeConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig(configEnv =>
  mergeConfig(viteConfig(configEnv), {
    test: {
      exclude: [...configDefaults.exclude, '**/e2e/**'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        thresholds: {
          lines: 10,
          functions: 10,
          branches: 10,
          statements: 10,
        },
      },
      projects: [
        {
          name: 'unit',
          environment: 'node',
          include: ['src/utils/**/*.test.ts', 'src/api/**/*.test.ts', 'src/stores/**/*.test.ts', 'src/**/*.test.ts'],
        },
        {
          name: 'dom',
          environment: 'happy-dom',
          include: ['src/**/*.spec.ts'],
          exclude: [
            'src/utils/**/*.test.ts',
            'src/api/**/*.test.ts',
            'src/stores/**/*.test.ts',
            'src/**/*.test.ts',
            '**/node_modules/**',
            ...configDefaults.exclude,
            '**/e2e/**',
          ],
        },
      ],
    },
  })
)
