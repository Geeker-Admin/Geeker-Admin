# Geeker-Admin

## 项目背景

本项目 fork 自 [Geeker-Admin](https://github.com/HalseySpicy/Geeker-Admin)。 commit hash: [d05424c](https://github.com/HalseySpicy/Geeker-Admin/commit/d05424c2acda8dc3ffb25a47e1e3692c3bac5a17)。 fork 的原因是项目长时间未更新，作者也没有回复是否还会继续维护，所以决定 fork 一份出来，进行维护。因为 git 目录体积太大，所以没有保留之前的提交记录。

### 介绍 📖

Geeker-Admin 一款基于 Vue3.5、TypeScript、Vite7、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。项目提供强大的 [ProTable](https://juejin.cn/post/7166068828202336263) 组件，在一定程度上提高您的开发效率。另外本项目还封装了一些常用组件、Hooks、指令、动态路由、按钮级别权限控制等功能。

### 在线预览 👀

- Link：https://geeker-admin.maicss.com

### 代码仓库 ⭐

- GitHub：https://github.com/Geeker-Admin/Geeker-Admin

### 项目文档 📚

- 项目更新日志：[CHANGELOG.md](./CHANGELOG.md)

- 项目文档地址：https://maicss.com/geeker-admin/

### 项目功能 🔨

- 使用 Vue3.5 + TypeScript 开发，单文件组件**＜script setup＞**
- 采用 Vite7 作为项目开发、打包工具（配置 gzip/brotli 打包、tsx 语法、跨域代理…）
- 使用 Pinia 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
- 使用 TypeScript 对 Axios 整个二次封装（请求拦截、取消、常用请求封装…）
- 基于 Element 二次封装 [ProTable](https://juejin.cn/post/7166068828202336263) 组件，表格页面全部为配置项 Columns
- 支持 Element 组件大小切换、多主题布局、暗黑模式、i18n 国际化
- 使用 VueRouter 配置动态路由权限拦截、路由懒加载，支持页面按钮权限控制
- 使用 KeepAlive 对页面进行缓存，支持多级嵌套路由缓存
- 常用自定义指令开发（权限、复制、水印、拖拽、节流、防抖、长按…）
- 使用 Oxfmt 统一格式化代码，集成 Oxlint、Stylelint 代码校验规范
- 使用 husky、lint-staged、commitlint、czg、cz-git 规范提交信息

### 安装使用步骤 📔

- **Clone：**

```text
# GitHub
git clone https://github.com/Geeker-Admin/Geeker-Admin.git
```

- **Install：**

```text
pnpm install
```

- **Run：**

```text
pnpm dev
pnpm serve
```

- **Build：**

```text
# 开发环境
pnpm build:dev

# 测试环境
pnpm build:test

# 生产环境
pnpm build:pro
```

- **Lint：**

```text
# oxlint 检测代码
pnpm lint

# oxfmt 格式化代码
pnpm fmt

# stylelint 格式化样式
pnpm lint:stylelint
```

- **commit：**

```text
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
pnpm commit
```

### 项目截图 📷

- 登录页：

![login_light](https://i.imgtg.com/2023/04/13/8tknp.png)

![login_dark](https://i.imgtg.com/2023/04/13/8tmpP.png)

- 首页：

![home_light](https://i.imgtg.com/2023/04/13/8tl1j.png)

![home_dark](https://i.imgtg.com/2023/04/13/8tpfb.png)

- 表格页：

![table_light](https://i.imgtg.com/2023/04/13/8tfMx.png)

![table_dark](https://i.imgtg.com/2023/04/13/8tv8F.png)

- 数据可视化

![dashboard](https://i.imgtg.com/2023/04/14/82Grx.png)

- 数据大屏：

![dataScreen](https://i.imgtg.com/2023/01/16/QP8HF.png)

### 文件资源目录 📚

```text
Geeker-Admin
├─ .husky                  # husky 配置文件
├─ .vscode                 # VSCode 推荐配置
├─ build                   # Vite 配置项
├─ public                  # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                  # API 接口管理
│  ├─ assets               # 静态资源文件
│  ├─ components           # 全局组件
│  ├─ config               # 全局配置项
│  ├─ directives           # 全局指令文件
│  ├─ enums                # 项目常用枚举
│  ├─ hooks                # 常用 Hooks 封装
│  ├─ languages            # 语言国际化 i18n
│  ├─ layouts              # 框架布局模块
│  ├─ routers              # 路由管理
│  ├─ stores               # pinia store
│  ├─ styles               # 全局样式文件
│  ├─ typings              # 全局 ts 声明
│  ├─ utils                # 常用工具库
│  ├─ views                # 项目所有页面
│  ├─ App.vue              # 项目主组件
│  ├─ main.ts              # 项目入口文件
│  └─ vite-env.d.ts        # 指定 ts 识别 vue
├─ .editorconfig           # 统一不同编辑器的编码风格
├─ .env                    # vite 常用配置
├─ .env.development        # 开发环境配置
├─ .env.production         # 生产环境配置
├─ .env.test               # 测试环境配置
├─ .oxlintrc.json          # oxlint 校验配置文件
├─ .oxfmtrc.json           # oxfmt 格式化配置文件
├─ .gitignore              # 忽略 git 提交
├─ stylelint.config.mjs    # stylelint 样式校验配置
├─ CHANGELOG.md            # 项目更新日志
├─ commitlint.config.mjs   # git 提交规范配置
├─ index.html              # 入口 html
├─ LICENSE                 # 开源协议文件
├─ lint-staged.config.mjs  # lint-staged 配置文件
├─ pnpm-lock.yaml          # pnpm 依赖版本锁
├─ package.json            # 依赖包管理
├─ postcss.config.mjs      # postcss 配置
├─ README.md               # README 介绍
├─ tsconfig.json           # typescript 全局配置
└─ vite.config.ts          # vite 全局配置文件
```

### 浏览器支持 🌎

- 本地开发推荐使用 Chrome 最新版浏览器 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 生产环境支持现代浏览器，不再支持 IE 浏览器，更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)。

| ![IE](https://i.imgtg.com/2023/04/11/8z7ot.png) | ![Edge](https://i.imgtg.com/2023/04/11/8zr3p.png) | ![Firefox](https://i.imgtg.com/2023/04/11/8zKiU.png) | ![Chrome](https://i.imgtg.com/2023/04/11/8zNrx.png) | ![Safari](https://i.imgtg.com/2023/04/11/8zeGj.png) |
| :---------------------------------------------: | :-----------------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: |
|   <span style="color: red">not support</span>   |                  last 2 versions                  |                   last 2 versions                    |                   last 2 versions                   |                   last 2 versions                   |

### 项目后台接口 🧩

项目后台接口完全采用 Mock 数据，感谢以下 Mock 平台支持：

- FastMock： https://www.fastmock.site
- EasyMock：https://mock.mengxuegu.com
- 新版准备迁移到 apifox
