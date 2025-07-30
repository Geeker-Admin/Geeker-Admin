// https://eslint.nodejs.cn/docs/latest/use/configure/configuration-files

import globals from 'globals'
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'

// 读取自动导入配置
import fs from 'fs'
const autoImportConfig = JSON.parse(fs.readFileSync('.eslintrc-auto-import.json', 'utf-8'))

/** @type {import('eslint').Linter.Config[]} */

// 全局变量定义
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
  // 忽略文件配置
  {
    ignores: [
      '*.d.ts',
      '**/coverage',
      '**/dist',
      'vite.config.ts',
      'mock/**',
      'src/types/**',
      'webhook-receivers/**', // 忽略 webhook 接收器目录
    ],
  },

  // JavaScript 推荐配置
  js.configs.recommended,

  // TypeScript 推荐配置
  ...tseslint.configs.recommended,

  // Vue 推荐配置
  ...vue.configs['flat/recommended'],

  // 全局配置 - 适用于所有 JS/TS/Vue 文件
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: GlobalType,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier,
      '@typescript-eslint': tseslint.plugin,
      vue,
    },
    rules: {
      // Prettier 规则
      'prettier/prettier': 'error',

      // 空行规则
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

      // TypeScript 规则
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Vue 规则
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-indent': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/component-name-in-template-casing': 'off',
      'vue/require-default-prop': 'off',
      'vue/html-closing-bracket-newline': 'off',

      // 一般规则
      curly: ['error', 'all'],
      'no-console': ['error', { allow: ['error'] }],
      'no-debugger': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^[A-Z0-9_]+$',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // Vue 文件特定配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        jsx: true,
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // TypeScript 文件特定配置
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
    },
  },
]
