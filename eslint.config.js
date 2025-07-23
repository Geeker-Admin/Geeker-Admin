// https://eslint.nodejs.cn/docs/latest/use/configure/configuration-files

import globals from 'globals'
import pluginJs from '@eslint/js' // JavaScript 规则
import eslintPluginVue from 'eslint-plugin-vue'
import typescriptEslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
// 不再需要单独引入 eslint-config-prettier，因为 prettier/recommended 已经包含了它

// 解析自动导入配置

import fs from 'fs'
const autoImportConfig = JSON.parse(fs.readFileSync('.eslintrc-auto-import.json', 'utf-8'))

/** @type {import('eslint').Linter.Config[]} */

// 全局变量
const GlobalType = {
  ...autoImportConfig.globals,
  ...globals.browser,
  ...globals.node,
  NodeJS: true,
  PageQuery: 'readonly',
  PageResult: 'readonly',
  OptionTreeType: 'readonly',
  SelectOption: 'readonly',
  ResponseData: 'readonly',
  ExcelResult: 'readonly',
  TagView: 'readonly',
  AppSettings: 'readonly',
  __APP_INFO__: 'readonly',
  NullableString: 'readonly',
  TreeLike: 'readonly',
  FileType: 'readonly',
  IObject: 'readonly',
  // Canvas API globals
  CanvasTextBaseline: 'readonly',
  CanvasRenderingContext2D: 'readonly',
  HTMLCanvasElement: 'readonly',
  Menu: 'readonly',
  ExcelMimeType: 'readonly',
  ImageMimeType: 'readonly',
  MetaProps: 'readonly',
  MenuOptions: 'readonly',
}

export default [
  // 基本配置 - 忽略文件
  {
    ignores: ['*.d.ts', '**/coverage', '**/dist', 'vite.config.ts', 'mock/**', 'src/types/**'],
  },

  // Prettier 规则 (放在前面，优先级更高)
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // 使用 prettier 推荐配置
      ...prettierPlugin.configs.recommended.rules,
      // 添加额外的 Prettier 规则，使用项目的 .prettierrc.mjs 配置
      'prettier/prettier': ['error'],
    },
  },

  // JavaScript 规则
  pluginJs.configs.recommended,

  // TypeScript 规则
  ...typescriptEslint.configs.recommended,

  // Vue 规则
  ...eslintPluginVue.configs['flat/recommended'],

  // JS/TS/Vue 文件配置
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: GlobalType,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      // 添加空行相关规则
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

      // TypeScript 规则
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Vue 规则 - 禁用可能与 Prettier 冲突的规则
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off', // 禁用可能与 Prettier 冲突的规则
      'vue/html-indent': 'off', // 禁用可能与 Prettier 冲突的规则
      'vue/singleline-html-element-content-newline': 'off', // 禁用可能与 Prettier 冲突的规则
      // 禁用组件名称转换为 kebab-case
      'vue/component-name-in-template-casing': 'off',
      'vue/require-default-prop': 'off',
      'vue/html-closing-bracket-newline': 'off',
      curly: ['error', 'all'],
      // 一般规则
      'no-console': ['error', { allow: ['error'] }],
      'no-debugger': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // 忽略参数名以 _ 开头的参数未使用警告
          varsIgnorePattern: '^[A-Z0-9_]+$', // 忽略变量名为大写字母、数字或下划线组合的未使用警告（枚举定义未使用场景）
          caughtErrors: 'none', // 忽略所有 catch 参数的未使用警告
          ignoreRestSiblings: true, // 忽略解构赋值中同级未使用变量的警告
        },
      ],
    },
  },

  // Vue 文件特定配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: eslintPluginVue.parser,
      parserOptions: {
        parser: typescriptEslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
]
