# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [Unreleased]

### Build System

- 🔧 migrate lint & formatting toolchain from ESLint + Prettier to Oxlint + Oxfmt (Stylelint, Commitlint and lint-staged are kept)
- 🔧 fix the broken `.husky/pre-commit` hook (was calling a non-existent script) and rewrite `lint-staged.config.mjs` to run oxc + Stylelint
- 🔧 remove stale ESLint/Prettier configs, dependencies and doc/VSCode references; update `.vscode` to the Oxc extension

### Bug Fixes

- 🐛 `v-copy` directive: `removeEventListener` passed a fresh arrow function, so the click listener could never be removed
- 🐛 `proForm`: `:key` accessed non-existent `item.prop` (now `item.formItem.prop`)
- 🐛 remove redundant `declare` keywords inside `declare global {}` in `global.d.ts` (TS1038)
- 🐛 fix malformed `.github/FUNDING.yml` value (`]#` missing whitespace)

## [1.2.0](https://github.com/HalseySpicy/Geeker-Admin/compare/v1.1.0...v1.2.0) (2023-09-15)

### Features

- 🚀 update and optimize project content ([17bc017](https://github.com/HalseySpicy/Geeker-Admin/commit/17bc017c5abbd2c87813d6c6f9d587ddf9d57da7))
- 🚀 upgrade plugins and add tab functionality ([f21a41d](https://github.com/HalseySpicy/Geeker-Admin/commit/f21a41d8df44efe5216dec39bf4abf0ea86a7781))

## [1.1.0](https://github.com/HalseySpicy/Geeker-Admin/compare/v1.0.0...v1.1.0) (2023-07-09)

### Features

- 🚀 add proTable instance type ([8262f04](https://github.com/HalseySpicy/Geeker-Admin/commit/8262f045734d055148720738a80fee0e0c779ceb))
- 🚀 optimize code and add VitePWA ([523f676](https://github.com/HalseySpicy/Geeker-Admin/commit/523f676feee5105eae15d05b57063227be26d3df))
- 🚀 optimize code and update plugins ([5cff3c7](https://github.com/HalseySpicy/Geeker-Admin/commit/5cff3c7e50331ede07d57613cc49658904e7cf1a))
- 🚀 optimize irregular code ([d406ef2](https://github.com/HalseySpicy/Geeker-Admin/commit/d406ef2bb5e0d0522f5e0ce38c3b9d0aa47c7cd2))
- 🚀 proTable radio selection example ([f58291f](https://github.com/HalseySpicy/Geeker-Admin/commit/f58291f96468b816607c31df87326ebd7d0a5c5a))
- 🚀 proTable search component custom rendering ([#189](https://github.com/HalseySpicy/Geeker-Admin/issues/189)) ([89f03db](https://github.com/HalseySpicy/Geeker-Admin/commit/89f03db2db41160b9ac5398d64712fabff399c4c))
- 🚀 proTable supports static table data ([9a3e85d](https://github.com/HalseySpicy/Geeker-Admin/commit/9a3e85d21d6c8872bbc915c42d48eb8658a1db63))
- 🚀 update Gitee address ([0608be9](https://github.com/HalseySpicy/Geeker-Admin/commit/0608be9ba6a9f01f73ed67671d340cf0c1d99261))
- 🚀 update stylelint configuration ([d62aae8](https://github.com/HalseySpicy/Geeker-Admin/commit/d62aae868e7d6aad87f0ba8706ab9744d5da04dd))
- 🚀 update theme, modify bugs ([7a3a7a3](https://github.com/HalseySpicy/Geeker-Admin/commit/7a3a7a3d665c0356c0272947292de750dd0be8d8))

### Bug Fixes

- 🧩 fix eslint error ([a980a1a](https://github.com/HalseySpicy/Geeker-Admin/commit/a980a1aa7808895af46c85e0e26a53f66d1119fa))

## [1.0.0](https://github.com/HalseySpicy/Geeker-Admin/compare/v0.0.7...v1.0.0) (2023-04-15)

### Features

- 🚀 升级依赖插件 && 新增树型 ProTbale 示例(更多查看详情) ([ed0ea75](https://github.com/HalseySpicy/Geeker-Admin/commit/ed0ea757555f047f6890632e598ee3293d3598cd))
- 🚀 升级依赖插件 && 修复 bug(查看详情) ([4febadc](https://github.com/HalseySpicy/Geeker-Admin/commit/4febadc10dd794ec8ea1c7864a3771b1b477f743))
- 🚀 新增路由白名单访问控制 ([97dc264](https://github.com/HalseySpicy/Geeker-Admin/commit/97dc26484c6eead2ae4c8c79d50b550f24f19a02))
- 🚀 优化 ProTable && 面包屑导航 ([905d7f1](https://github.com/HalseySpicy/Geeker-Admin/commit/905d7f1fd2b18d9650e6ba7d439dfdcf50363d11))
- 🚀 优化代码 ([cd333df](https://github.com/HalseySpicy/Geeker-Admin/commit/cd333dfe5de2aa7fa415326e6a06b83d3bd260d5))
- 🚀 优化代码和样式细节 ([5b4b926](https://github.com/HalseySpicy/Geeker-Admin/commit/5b4b9266de4f420f32fca70dadb76242d129e604))
- 🚀 优化代码和样式细节 ([756094c](https://github.com/HalseySpicy/Geeker-Admin/commit/756094c402e14841c07cd6062b701929f7f31737))
- 🚀 优化代码逻辑 && 更新微信群二维码 ([629e824](https://github.com/HalseySpicy/Geeker-Admin/commit/629e8243466fda5da9f0ec781aa0b584e49f4501))
- 🚀 优化代码细节问题 ([a6a6ced](https://github.com/HalseySpicy/Geeker-Admin/commit/a6a6cedeb40f2f7901f0dcd0ec7f1c283a491c61))
- 🚀 优化样式、代码细节 ([1b02f45](https://github.com/HalseySpicy/Geeker-Admin/commit/1b02f457162267b090ad946e0bad91e5d0dd14b1))
- 🚀 allow nested tree enum data ([c2fa2be](https://github.com/HalseySpicy/Geeker-Admin/commit/c2fa2be54a6af0309ba45bd4ca68170c66edc357))
- 🚀 refactoring project configuration ([7ede988](https://github.com/HalseySpicy/Geeker-Admin/commit/7ede988bae3ad0b33d9e5ac1ea6145c4d7aa89e6))
- **ProTable:** 🚀 插槽引入 ElTable 的 scope，可获取$index 等 ([4cb7dba](https://github.com/HalseySpicy/Geeker-Admin/commit/4cb7dba40c10e693e324b7c647aa65917aeb0b02))

### Bug Fixes

- 🧩 修复 ImportExcel 组件 bug ([ab7e9dd](https://github.com/HalseySpicy/Geeker-Admin/commit/ab7e9dde400aa80ec2e9fa58d9f2168fc3d14f18))
- 🧩 修复 ImportExcel 组件 bug ([803ba58](https://github.com/HalseySpicy/Geeker-Admin/commit/803ba58a2c3fae7f6d8783ca534e2b41c987f027))
- 🧩 修复 ProTable 组件打印功能 bug ([a88b7df](https://github.com/HalseySpicy/Geeker-Admin/commit/a88b7df4623e30459ef3c92196b720efcb200f2f))
- 🧩 修复 TreeFilter 组件默认值 bug ([8e515f0](https://github.com/HalseySpicy/Geeker-Admin/commit/8e515f0d4058f573cbd53281ef68aec38b8dacb9))
- 🧩 修复 TreeFilter 组件默认值 bug ([f23a94d](https://github.com/HalseySpicy/Geeker-Admin/commit/f23a94d6edf442babdc4cd5a52ea63ebbbcac44f))
- 🧩 修复 useDebounceFn 错误使用 ([99d4278](https://github.com/HalseySpicy/Geeker-Admin/commit/99d4278a29b7fa970caba55f43134cebd1d3bec6))
- 🧩 修复多图片上传预览初始化异常 ([d1a917f](https://github.com/HalseySpicy/Geeker-Admin/commit/d1a917f10326b7742b4445c495de12603df658c1))
- 🧩 修复分栏布局路径匹配 bug ([b06bd12](https://github.com/HalseySpicy/Geeker-Admin/commit/b06bd123fa6af0dcb7d5cc9bc9215f13b91ace5f))
- 🧩 修复横向布局下最大化失效 ([e416ddb](https://github.com/HalseySpicy/Geeker-Admin/commit/e416ddb732ae336ca4e7e43ebdeb89b24085d1b1))
- 🧩 修复路由重置 bug ([52b7e66](https://github.com/HalseySpicy/Geeker-Admin/commit/52b7e66febf1db9cd3325eb0e1e45213ff1528c2))
- 🧩 修复弱类型检查错误 ([b32310e](https://github.com/HalseySpicy/Geeker-Admin/commit/b32310ed2f546e3efa918d5f7eee2c3868a98cb7))

### 0.0.7 (2022-12-28)

### Features

- 🚀 二次封装 wangEditor 富文本编辑器(50%) ([4f8e266](https://gitee.com/HalseySpicy/Geeker-Admin/commit/4f8e266b7dd25a7df18d302e88e14454bfa3816b))
- 🚀 更新插件、优化代码(请查看详情) ([dac6dec](https://gitee.com/HalseySpicy/Geeker-Admin/commit/dac6dec75466c19731ad7cf083f8c39940342140))
- 🚀 更新微信群二维码 ([7e890d0](https://gitee.com/HalseySpicy/Geeker-Admin/commit/7e890d0afe0a11170d73e3c2c4ef04d37a582e94))
- 🚀 请求全局 loading 更改为可配置 ([a75d62f](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a75d62f627195ac420cf24ad7f51245b2e5bf04e))
- 🚀 升级 element-plus 到 2.25 ([e98c035](https://gitee.com/HalseySpicy/Geeker-Admin/commit/e98c035caa6d1ab04319673e0db65837c6887126))
- 🚀 升级 vite、vue 版本 && 优化分栏布局样式 ([b2b1b59](https://gitee.com/HalseySpicy/Geeker-Admin/commit/b2b1b599bc1fa0f1c64c5c58fb31d3719f415301))
- 🚀 使用属性透传重构 ProTable 组件 ([a428e89](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a428e89a3784c826eceaaee548b97975afbe1d45))
- 🚀 添加 wangEditor 组件 ([d6d2fa7](https://gitee.com/HalseySpicy/Geeker-Admin/commit/d6d2fa7d27887bb4a9e40e9d7037d4621812e16a))
- 🚀 完成 wangEditor 富文本二次封装 ([7362bfb](https://gitee.com/HalseySpicy/Geeker-Admin/commit/7362bfbff19224045e3bb20fa939a78c556cc805))
- 🚀 完善按钮、菜单权限示例 ([6793f0c](https://gitee.com/HalseySpicy/Geeker-Admin/commit/6793f0cd7372b8a080f6d2649b05cdd0c62bd853))
- 🚀 新增 主题色、灰色模式、色弱模式 配置 ([7821157](https://gitee.com/HalseySpicy/Geeker-Admin/commit/7821157059ed9c21d2844f75049f8fa999b19944))
- 🚀 新增 pro-form ([3ab5a5b](https://gitee.com/HalseySpicy/Geeker-Admin/commit/3ab5a5b4f63fca227944ab6cc7928f6bf1f88ed4))
- 🚀 新增 protable 打印、列对齐方式功能 ([c22879e](https://gitee.com/HalseySpicy/Geeker-Admin/commit/c22879e7e80ff9ef662c39daa25b11f5f17d17ca))
- 🚀 新增 protbale 功能, 请查看详情 ([17f2bcd](https://gitee.com/HalseySpicy/Geeker-Admin/commit/17f2bcd67362365579ed8a572a3a9d17368ac64e))
- 🚀 新增 SVG Icons ([977602c](https://gitee.com/HalseySpicy/Geeker-Admin/commit/977602c30b8997cb51426fe9498392edc249561d))
- 🚀 新增 treeFilter 组件标题属性 ([20c755f](https://gitee.com/HalseySpicy/Geeker-Admin/commit/20c755f59f3ae2b0380e6549bb56bb22317d750e))
- 🚀 新增 treeFilter data 参数 ([4280766](https://gitee.com/HalseySpicy/Geeker-Admin/commit/428076635d7a0e9f80109274d9523cf91aa5a10c))
- 🚀 新增暗黑模式 ([215e499](https://gitee.com/HalseySpicy/Geeker-Admin/commit/215e499634b516234e653eac27a611d5f51ea6da))
- 🚀 新增菜单搜索功能 ([4aa0eef](https://gitee.com/HalseySpicy/Geeker-Admin/commit/4aa0eefaf427a2aa1aebd2b78dc049ffa776e838))
- 🚀 新增动态路由 ([551fefc](https://gitee.com/HalseySpicy/Geeker-Admin/commit/551fefc2e66b067d9e64d3b0cfbf47dfa1057d98))
- 🚀 新增分栏布局 ([de37143](https://gitee.com/HalseySpicy/Geeker-Admin/commit/de37143e93c0cc5be2ff52466dce344ab9270f0d))
- 🚀 新增功能 && 修复 bug(查看详情) ([1ab183f](https://gitee.com/HalseySpicy/Geeker-Admin/commit/1ab183f1551cb8beb77243c2953b0119409dd6a5))
- 🚀 新增功能 && 修复 bug(查看详情) ([4c0bc5f](https://gitee.com/HalseySpicy/Geeker-Admin/commit/4c0bc5fd3c111e1cac636cad104c83ffb1168679))
- 🚀 新增功能(查看详情) ([cbd8dc2](https://gitee.com/HalseySpicy/Geeker-Admin/commit/cbd8dc2387576f525c0e49f81d540fbad3cb5e81))
- 🚀 新增横向、纵向、经典布局切换 ([1046de4](https://gitee.com/HalseySpicy/Geeker-Admin/commit/1046de4c7d5f805b10c5cea5325b063e3d6dd84f))
- 🚀 新增界面配置功能 ([39ffc5e](https://gitee.com/HalseySpicy/Geeker-Admin/commit/39ffc5e9a77da3294055f23f8c87a4a44f3622f7))
- 🚀 新增路由相关功能 ([9679eed](https://gitee.com/HalseySpicy/Geeker-Admin/commit/9679eed1edd0c1f08c17465f590d4ca0365985ee)), closes [#71](https://gitee.com/HalseySpicy/Geeker-Admin/issues/71) [#72](https://gitee.com/HalseySpicy/Geeker-Admin/issues/72) [#49](https://gitee.com/HalseySpicy/Geeker-Admin/issues/49)
- 🚀 新增请求示例，参见 loginApi ([d49b227](https://gitee.com/HalseySpicy/Geeker-Admin/commit/d49b227762ae48c3ca08f0dec02a3667daac8532))
- 🚀 新增图标选择组件 ([ce5e165](https://gitee.com/HalseySpicy/Geeker-Admin/commit/ce5e165aed842074a9f7ac66ea97290710b541ee))
- 🚀 新增图片上传组件 ([c50c421](https://gitee.com/HalseySpicy/Geeker-Admin/commit/c50c421bc3c5f7af68184cda88262c6fb1bd07e0))
- 🚀 新增图片上传组件属性 ([d7670ed](https://gitee.com/HalseySpicy/Geeker-Admin/commit/d7670ed94608c5410f3102d7b9427d8d856204b1))
- 🚀 新增系统管理模块 ([23748e1](https://gitee.com/HalseySpicy/Geeker-Admin/commit/23748e185e80e3b774b42114427934228a57d3aa))
- 🚀 新增消息通知 ([66836b6](https://gitee.com/HalseySpicy/Geeker-Admin/commit/66836b69781ccc55402a3887d091149885864442))
- 🚀 新增页面刷新功能 ([5223a41](https://gitee.com/HalseySpicy/Geeker-Admin/commit/5223a416d17568d5b2cae7b16b637e0f39134223))
- 🚀 新增引导页 ([4fb6fb3](https://gitee.com/HalseySpicy/Geeker-Admin/commit/4fb6fb3a3eb34f82576e2378c311ff580f65226d))
- 🚀 新增组件参数配置文档 ([0e11fc5](https://gitee.com/HalseySpicy/Geeker-Admin/commit/0e11fc59175d5d74730c3cb1fa2579effcca6e48))
- 🚀 修改 keepAlive 逻辑 ([168ca13](https://gitee.com/HalseySpicy/Geeker-Admin/commit/168ca13e796c8cc366caa3d6e05090acdaefef75))
- 🚀 修改 pinia 持久化插件 ([a7691ae](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a7691aea614a035c4d381838149e08ad8477e49f))
- 🚀 优化代码注释 && 升级 element 到 2.2.6 ([b84512b](https://gitee.com/HalseySpicy/Geeker-Admin/commit/b84512b3b102b00faa2f9241a32f5fbe27da4307))
- 🚀 优化注释 && 代码细节问题 ([9d0ffa5](https://gitee.com/HalseySpicy/Geeker-Admin/commit/9d0ffa5ddecc4c73bec51208b05a6d44b1523b1f))
- 🚀 预定义主题颜色 ([8219178](https://gitee.com/HalseySpicy/Geeker-Admin/commit/82191789bcf6d21c623aa61c5a64e502cea44c2c))
- 🚀 增加 SearchForm 属性透传 ([eadb89b](https://gitee.com/HalseySpicy/Geeker-Admin/commit/eadb89b687596980a82401f44c53430081078d04))
- 🚀 增加表格 treeFilter、更新整体布局样式 ([719b78f](https://gitee.com/HalseySpicy/Geeker-Admin/commit/719b78f317589b983bc4b852b3bfd63a60d42a46))
- 🚀 增加布局方式切换，样式已完成 ([5745b93](https://gitee.com/HalseySpicy/Geeker-Admin/commit/5745b93a6cc00519c1a02977b8c0437502d867e6))
- 🚀 增加分类筛选器 ([c95a1c0](https://gitee.com/HalseySpicy/Geeker-Admin/commit/c95a1c054ee9eacae470bcaae7574d5c989b86a2))
- 🚀 增加全局错误拦截 && 修改细节问题 请查看详情 ([0496184](https://gitee.com/HalseySpicy/Geeker-Admin/commit/04961847eb7df004d1e9f562e78ea3d5f851ea49))

### Bug Fixes

- 🧩 菜单搜索过滤掉 isHide 为 true 的菜单 ([c6bab35](https://gitee.com/HalseySpicy/Geeker-Admin/commit/c6bab356f0cde7e3dc6f69dfac115239c2453776))
- 🧩 解决 useTable 查询参数 bug ([a86e408](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a86e4089b6da8ab6a55bc84e069d665c06471676))
- 🧩 去除登陆页默认账号 ([3dda3fe](https://gitee.com/HalseySpicy/Geeker-Admin/commit/3dda3fee3fef38fdafcfdf3b1bf16e73033c6fe0))
- 🧩 删除 protable 组件 image 配置属性 ([d699fe7](https://gitee.com/HalseySpicy/Geeker-Admin/commit/d699fe7bd55eaaccfad9b94105c1b43ae64d1c34))
- 🧩 修复 国际化 产生的 bug ([ec4f74a](https://gitee.com/HalseySpicy/Geeker-Admin/commit/ec4f74ae654e7287fc08bb31fa3ee3d2c76164eb))
- 🧩 修复 axios 请求超时未拦截错误 ([856468e](https://gitee.com/HalseySpicy/Geeker-Admin/commit/856468e84f8356d35c25097f3115dfe3d496914c))
- 🧩 修复 bug ([3714abd](https://gitee.com/HalseySpicy/Geeker-Admin/commit/3714abdc4826034791ccb3fc8249d946ec3a4e16))
- 🧩 修复 Pro-Tabel 列设置 bug ([a3b86a0](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a3b86a06a6d9cd4b6f7ac6e108727a0b4852e9a0))
- 🧩 修复 pro-table 格式报错问题 ([2ef11fd](https://gitee.com/HalseySpicy/Geeker-Admin/commit/2ef11fda6d373c3214df801ae789cafc1a033dcb))
- 🧩 修复布局样式 bug ([2f1cd64](https://gitee.com/HalseySpicy/Geeker-Admin/commit/2f1cd6442f359909301e3d95b0ed4dc9d2dbe7c6))
- 🧩 修复打包错误 ([243ebfc](https://gitee.com/HalseySpicy/Geeker-Admin/commit/243ebfc5280ddc013056c6708b44df35fe18f613))
- 🧩 修复打包失败 ([31698fe](https://gitee.com/HalseySpicy/Geeker-Admin/commit/31698fea6478d60343a9ad49ae0fc6db7a42c184))
- 🧩 修复打包失败问题 ([1778651](https://gitee.com/HalseySpicy/Geeker-Admin/commit/1778651781a1bb8bfe4ea61dafb9b48773fef5d7))
- 🧩 修复分栏布局 bug ([113274a](https://gitee.com/HalseySpicy/Geeker-Admin/commit/113274a87e2dacf694648f3a304c7ac37e2262d0))
- 🧩 修复经典布局展示 bug ([b95e237](https://gitee.com/HalseySpicy/Geeker-Admin/commit/b95e2376d06c6a6a35f72743e3fe8c1569fda008))
- 🧩 修复路由跳转两次不能携带参数问题 ([8b583f3](https://gitee.com/HalseySpicy/Geeker-Admin/commit/8b583f3d5f05b77ec2a35082557bae431441a586))
- 🧩 修复请求 header 参数丢失 bug ([3598dbc](https://gitee.com/HalseySpicy/Geeker-Admin/commit/3598dbc2a83aaacf9dada4e2c38a3ca27cbe4cfd))
- 🧩 修复上传组件细节问题 ([8528358](https://gitee.com/HalseySpicy/Geeker-Admin/commit/8528358925ea809cf52f55015355345e87607351))
- 🧩 修复 BUG ([4bf2988](https://gitee.com/HalseySpicy/Geeker-Admin/commit/4bf29881dd41fad256f1beb5affcd5ba6599e17d))
- 🧩 修复 BUG ([c93aaf7](https://gitee.com/HalseySpicy/Geeker-Admin/commit/c93aaf700112decd158e9a5a9c1f83eff1773e91))
- 🧩 修复 loading 请求 bug ([a3270ec](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a3270ecfa2e7c2484729ae6fd599febcc4f7be6b))
- 🧩 修复 vercel 打包失败 ([e63dee1](https://gitee.com/HalseySpicy/Geeker-Admin/commit/e63dee1f9653f4f95d0330275c5f5e8b530564c9))
- 🧩 修改 Pro-Table 表头渲染方式 ([aa57294](https://gitee.com/HalseySpicy/Geeker-Admin/commit/aa5729489942eaa6dca9928b70153af2de753a9c))
- 🧩 修改 useTable 存在的 bug ([5bb55b3](https://gitee.com/HalseySpicy/Geeker-Admin/commit/5bb55b32c0b46bbf55fa0d49efe3a15d0b1673a4))
- 🧩 修改 useTable 钩子中的 bug ([675aed8](https://gitee.com/HalseySpicy/Geeker-Admin/commit/675aed806e62c236b40bc933402c86085289df4e))
- 🧩 修改 useTable 携带默认查询参数 bug ([ee585b2](https://gitee.com/HalseySpicy/Geeker-Admin/commit/ee585b29f3129b7143a10947fdd3184b197ad883))
- 🧩 修改代码细节 && 优化注释 ([d86cb1f](https://gitee.com/HalseySpicy/Geeker-Admin/commit/d86cb1feb32e11a29e1c2bee54ea788c6c828d75))
- 🧩 修改当菜单设置 isHide=true 时面包屑报错 ([66885c5](https://gitee.com/HalseySpicy/Geeker-Admin/commit/66885c5cc15c10ccadcd49a7bee27a821663e8a7))
- 🧩 修改文件导出失败 bug ([208e720](https://gitee.com/HalseySpicy/Geeker-Admin/commit/208e720688969d2bc0fa0a6cc2bae3e3b991c806))
- 🧩 修改 BUG ([540048a](https://gitee.com/HalseySpicy/Geeker-Admin/commit/540048a09be9b0df5443e275f38f43c80dcde51f))
- 🧩 fix use pinia bug ([609aa69](https://gitee.com/HalseySpicy/Geeker-Admin/commit/609aa69aa9b3e0bb4e667ee7f76ab44051c2d2e8))
- 修复登录后白屏 ([f986c5c](https://gitee.com/HalseySpicy/Geeker-Admin/commit/f986c5c44fc1df8d5c6a90e90239c06928e2f4a1))
- **el-table:** 🧩 修复 el-table 在 safari 浏览器错乱 ([b776a48](https://gitee.com/HalseySpicy/Geeker-Admin/commit/b776a483636547c7cee723846ec33b2842550d13))

### 0.0.6 (2022-08-22)

### Features

- 🚀 二次封装 wangEditor 富文本编辑器(50%) ([4f8e266](https://gitee.com/HalseySpicy/Geeker-Admin/commit/4f8e266b7dd25a7df18d302e88e14454bfa3816b))
- 🚀 请求全局 loading 更改为可配置 ([a75d62f](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a75d62f627195ac420cf24ad7f51245b2e5bf04e))
- 🚀 升级 element-plus 到 2.25 ([e98c035](https://gitee.com/HalseySpicy/Geeker-Admin/commit/e98c035caa6d1ab04319673e0db65837c6887126))
- 🚀 添加 wangEditor 组件 ([d6d2fa7](https://gitee.com/HalseySpicy/Geeker-Admin/commit/d6d2fa7d27887bb4a9e40e9d7037d4621812e16a))
- 🚀 完成 wangEditor 富文本二次封装 ([7362bfb](https://gitee.com/HalseySpicy/Geeker-Admin/commit/7362bfbff19224045e3bb20fa939a78c556cc805))
- 🚀 新增 主题色、灰色模式、色弱模式 配置 ([7821157](https://gitee.com/HalseySpicy/Geeker-Admin/commit/7821157059ed9c21d2844f75049f8fa999b19944))
- 🚀 新增 pro-form ([3ab5a5b](https://gitee.com/HalseySpicy/Geeker-Admin/commit/3ab5a5b4f63fca227944ab6cc7928f6bf1f88ed4))
- 🚀 新增 protbale 功能, 请查看详情 ([17f2bcd](https://gitee.com/HalseySpicy/Geeker-Admin/commit/17f2bcd67362365579ed8a572a3a9d17368ac64e))
- 🚀 新增 SVG Icons ([977602c](https://gitee.com/HalseySpicy/Geeker-Admin/commit/977602c30b8997cb51426fe9498392edc249561d))
- 🚀 新增 treeFilter data 参数 ([4280766](https://gitee.com/HalseySpicy/Geeker-Admin/commit/428076635d7a0e9f80109274d9523cf91aa5a10c))
- 🚀 新增暗黑模式 ([215e499](https://gitee.com/HalseySpicy/Geeker-Admin/commit/215e499634b516234e653eac27a611d5f51ea6da))
- 🚀 新增菜单搜索功能 ([4aa0eef](https://gitee.com/HalseySpicy/Geeker-Admin/commit/4aa0eefaf427a2aa1aebd2b78dc049ffa776e838))
- 🚀 新增界面配置功能 ([39ffc5e](https://gitee.com/HalseySpicy/Geeker-Admin/commit/39ffc5e9a77da3294055f23f8c87a4a44f3622f7))
- 🚀 新增请求示例，参见 loginApi ([d49b227](https://gitee.com/HalseySpicy/Geeker-Admin/commit/d49b227762ae48c3ca08f0dec02a3667daac8532))
- 🚀 新增图标选择组件 ([ce5e165](https://gitee.com/HalseySpicy/Geeker-Admin/commit/ce5e165aed842074a9f7ac66ea97290710b541ee))
- 🚀 新增图片上传组件 ([c50c421](https://gitee.com/HalseySpicy/Geeker-Admin/commit/c50c421bc3c5f7af68184cda88262c6fb1bd07e0))
- 🚀 新增图片上传组件属性 ([d7670ed](https://gitee.com/HalseySpicy/Geeker-Admin/commit/d7670ed94608c5410f3102d7b9427d8d856204b1))
- 🚀 新增引导页 ([4fb6fb3](https://gitee.com/HalseySpicy/Geeker-Admin/commit/4fb6fb3a3eb34f82576e2378c311ff580f65226d))
- 🚀 新增组件参数配置文档 ([0e11fc5](https://gitee.com/HalseySpicy/Geeker-Admin/commit/0e11fc59175d5d74730c3cb1fa2579effcca6e48))
- 🚀 修改 pinia 持久化插件 ([a7691ae](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a7691aea614a035c4d381838149e08ad8477e49f))
- 🚀 优化代码注释 && 升级 element 到 2.2.6 ([b84512b](https://gitee.com/HalseySpicy/Geeker-Admin/commit/b84512b3b102b00faa2f9241a32f5fbe27da4307))
- 🚀 优化注释 && 代码细节问题 ([9d0ffa5](https://gitee.com/HalseySpicy/Geeker-Admin/commit/9d0ffa5ddecc4c73bec51208b05a6d44b1523b1f))
- 🚀 预定义主题颜色 ([8219178](https://gitee.com/HalseySpicy/Geeker-Admin/commit/82191789bcf6d21c623aa61c5a64e502cea44c2c))
- 🚀 增加 SearchForm 属性透传 ([eadb89b](https://gitee.com/HalseySpicy/Geeker-Admin/commit/eadb89b687596980a82401f44c53430081078d04))
- 🚀 增加表格 treeFilter、更新整体布局样式 ([719b78f](https://gitee.com/HalseySpicy/Geeker-Admin/commit/719b78f317589b983bc4b852b3bfd63a60d42a46))

### Bug Fixes

- 🧩 解决 useTable 查询参数 bug ([a86e408](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a86e4089b6da8ab6a55bc84e069d665c06471676))
- 🧩 去除登陆页默认账号 ([3dda3fe](https://gitee.com/HalseySpicy/Geeker-Admin/commit/3dda3fee3fef38fdafcfdf3b1bf16e73033c6fe0))
- 🧩 删除 protable 组件 image 配置属性 ([d699fe7](https://gitee.com/HalseySpicy/Geeker-Admin/commit/d699fe7bd55eaaccfad9b94105c1b43ae64d1c34))
- 🧩 修复 国际化 产生的 bug ([ec4f74a](https://gitee.com/HalseySpicy/Geeker-Admin/commit/ec4f74ae654e7287fc08bb31fa3ee3d2c76164eb))
- 🧩 修复 axios 请求超时未拦截错误 ([856468e](https://gitee.com/HalseySpicy/Geeker-Admin/commit/856468e84f8356d35c25097f3115dfe3d496914c))
- 🧩 修复 Pro-Tabel 列设置 bug ([a3b86a0](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a3b86a06a6d9cd4b6f7ac6e108727a0b4852e9a0))
- 🧩 修复 pro-table 格式报错问题 ([2ef11fd](https://gitee.com/HalseySpicy/Geeker-Admin/commit/2ef11fda6d373c3214df801ae789cafc1a033dcb))
- 🧩 修复打包失败问题 ([1778651](https://gitee.com/HalseySpicy/Geeker-Admin/commit/1778651781a1bb8bfe4ea61dafb9b48773fef5d7))
- 🧩 修复路由跳转两次不能携带参数问题 ([8b583f3](https://gitee.com/HalseySpicy/Geeker-Admin/commit/8b583f3d5f05b77ec2a35082557bae431441a586))
- 🧩 修复请求 header 参数丢失 bug ([3598dbc](https://gitee.com/HalseySpicy/Geeker-Admin/commit/3598dbc2a83aaacf9dada4e2c38a3ca27cbe4cfd))
- 🧩 修复上传组件细节问题 ([8528358](https://gitee.com/HalseySpicy/Geeker-Admin/commit/8528358925ea809cf52f55015355345e87607351))
- 🧩 修复 loading 请求 bug ([a3270ec](https://gitee.com/HalseySpicy/Geeker-Admin/commit/a3270ecfa2e7c2484729ae6fd599febcc4f7be6b))
- 🧩 修改 Pro-Table 表头渲染方式 ([aa57294](https://gitee.com/HalseySpicy/Geeker-Admin/commit/aa5729489942eaa6dca9928b70153af2de753a9c))
- 🧩 修改 useTable 存在的 bug ([5bb55b3](https://gitee.com/HalseySpicy/Geeker-Admin/commit/5bb55b32c0b46bbf55fa0d49efe3a15d0b1673a4))
- 🧩 修改 useTable 钩子中的 bug ([675aed8](https://gitee.com/HalseySpicy/Geeker-Admin/commit/675aed806e62c236b40bc933402c86085289df4e))
- 🧩 修改 useTable 携带默认查询参数 bug ([ee585b2](https://gitee.com/HalseySpicy/Geeker-Admin/commit/ee585b29f3129b7143a10947fdd3184b197ad883))
- 🧩 修改代码细节 && 优化注释 ([d86cb1f](https://gitee.com/HalseySpicy/Geeker-Admin/commit/d86cb1feb32e11a29e1c2bee54ea788c6c828d75))
- 🧩 修改文件导出失败 bug ([208e720](https://gitee.com/HalseySpicy/Geeker-Admin/commit/208e720688969d2bc0fa0a6cc2bae3e3b991c806))
- 🧩 fix use pinia bug ([609aa69](https://gitee.com/HalseySpicy/Geeker-Admin/commit/609aa69aa9b3e0bb4e667ee7f76ab44051c2d2e8))
- 修复登录后白屏 ([f986c5c](https://gitee.com/HalseySpicy/Geeker-Admin/commit/f986c5c44fc1df8d5c6a90e90239c06928e2f4a1))

### [0.0.5](https://github.com/HalseySpicy/Geeker-Admin/compare/v0.0.4...v0.0.5) (2022-07-21)

### Features

- 🚀 新增请求示例，参见 loginApi ([d49b227](https://github.com/HalseySpicy/Geeker-Admin/commit/d49b227762ae48c3ca08f0dec02a3667daac8532))

### Bug Fixes

- 🧩 解决 useTable 查询参数 bug ([a86e408](https://github.com/HalseySpicy/Geeker-Admin/commit/a86e4089b6da8ab6a55bc84e069d665c06471676))
- 🧩 修复 axios 请求超时未拦截错误 ([856468e](https://github.com/HalseySpicy/Geeker-Admin/commit/856468e84f8356d35c25097f3115dfe3d496914c))
- 🧩 修复请求 header 参数丢失 bug ([3598dbc](https://github.com/HalseySpicy/Geeker-Admin/commit/3598dbc2a83aaacf9dada4e2c38a3ca27cbe4cfd))

### [0.0.4](https://github.com/HalseySpicy/Geeker-Admin/compare/v0.0.3...v0.0.4) (2022-07-12)

### Features

- 🚀 新增 主题色、灰色模式、色弱模式 配置 ([7821157](https://github.com/HalseySpicy/Geeker-Admin/commit/7821157059ed9c21d2844f75049f8fa999b19944))
- 🚀 新增 pro-form ([3ab5a5b](https://github.com/HalseySpicy/Geeker-Admin/commit/3ab5a5b4f63fca227944ab6cc7928f6bf1f88ed4))
- 🚀 新增菜单搜索功能 ([4aa0eef](https://github.com/HalseySpicy/Geeker-Admin/commit/4aa0eefaf427a2aa1aebd2b78dc049ffa776e838))
- 🚀 新增界面配置功能 ([39ffc5e](https://github.com/HalseySpicy/Geeker-Admin/commit/39ffc5e9a77da3294055f23f8c87a4a44f3622f7))
- 🚀 预定义主题颜色 ([8219178](https://github.com/HalseySpicy/Geeker-Admin/commit/82191789bcf6d21c623aa61c5a64e502cea44c2c))
- 🚀 增加 SearchForm 属性透传 ([eadb89b](https://github.com/HalseySpicy/Geeker-Admin/commit/eadb89b687596980a82401f44c53430081078d04))

### Bug Fixes

- 🧩 修复 pro-table 格式报错问题 ([2ef11fd](https://github.com/HalseySpicy/Geeker-Admin/commit/2ef11fda6d373c3214df801ae789cafc1a033dcb))
- 🧩 修改文件导出失败 bug ([208e720](https://github.com/HalseySpicy/Geeker-Admin/commit/208e720688969d2bc0fa0a6cc2bae3e3b991c806))
- 🧩 fix use pinia bug ([609aa69](https://github.com/HalseySpicy/Geeker-Admin/commit/609aa69aa9b3e0bb4e667ee7f76ab44051c2d2e8))

### [0.0.2](https://github.com/HalseySpicy/Geeker-Admin/compare/v0.0.3...v0.0.2) (2022-06-29)

### 0.0.2 (2022-06-20)

### Features

- 🚀 请求全局 loading 更改为可配置 ([a75d62f](https://github.com/HalseySpicy/Geeker-Admin/commit/a75d62f627195ac420cf24ad7f51245b2e5bf04e))
- 🚀 升级 element-plus 到 2.2.5 ([e98c035](https://github.com/HalseySpicy/Geeker-Admin/commit/e98c035caa6d1ab04319673e0db65837c6887126))
- 🚀 新增暗黑模式 ([215e499](https://github.com/HalseySpicy/Geeker-Admin/commit/215e499634b516234e653eac27a611d5f51ea6da))
- 🚀 新增图标选择组件 ([ce5e165](https://github.com/HalseySpicy/Geeker-Admin/commit/ce5e165aed842074a9f7ac66ea97290710b541ee))
- 🚀 修改 pinia 持久化插件 ([a7691ae](https://github.com/HalseySpicy/Geeker-Admin/commit/a7691aea614a035c4d381838149e08ad8477e49f))
- 🚀 优化代码注释 && 升级 element 到 2.2.6 ([b84512b](https://github.com/HalseySpicy/Geeker-Admin/commit/b84512b3b102b00faa2f9241a32f5fbe27da4307))

### Bug Fixes

- 🧩 去除登陆页默认账号 ([3dda3fe](https://github.com/HalseySpicy/Geeker-Admin/commit/3dda3fee3fef38fdafcfdf3b1bf16e73033c6fe0))
- 🧩 修复 Pro-Table 列设置 bug ([a3b86a0](https://github.com/HalseySpicy/Geeker-Admin/commit/a3b86a06a6d9cd4b6f7ac6e108727a0b4852e9a0))
- 🧩 修复 loading 请求 bug ([a3270ec](https://github.com/HalseySpicy/Geeker-Admin/commit/a3270ecfa2e7c2484729ae6fd599febcc4f7be6b))
- 🧩 修改 Pro-Table 表头渲染方式 ([aa57294](https://github.com/HalseySpicy/Geeker-Admin/commit/aa5729489942eaa6dca9928b70153af2de753a9c))
- 🧩 修改 useTable 存在的 bug ([5bb55b3](https://github.com/HalseySpicy/Geeker-Admin/commit/5bb55b32c0b46bbf55fa0d49efe3a15d0b1673a4))
- 🧩 修改 useTable 钩子中的 bug ([675aed8](https://github.com/HalseySpicy/Geeker-Admin/commit/675aed806e62c236b40bc933402c86085289df4e))
- 🧩 修改 useTable 携带默认查询参数 bug ([ee585b2](https://github.com/HalseySpicy/Geeker-Admin/commit/ee585b29f3129b7143a10947fdd3184b197ad883))
