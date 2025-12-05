# 超级表格

在管理端页面开发的时候，会遇到很多CRUD的页面，而且要求风格操作习惯一致，为了快速的做出这样的页面，本组件库提供了 ProTable 这样的组件，以提高开发人员的效率。

![页面设计](https://gw.alipayobjects.com/zos/antfincdn/Hw%26ryTueTW/bianzu%2525204.png)

**图片来源于 [Antd Pro Components](https://procomponents.ant.design/components/table#protable---%E9%AB%98%E7%BA%A7%E8%A1%A8%E6%A0%BC)**

> Element-Plus 下文简称为 El+。

## API

### 表格

::: tip
支持后端分页和不分页，不支持前端分页
:::

| 属性名  | 说明   | 类型                    | 默认值   |
| :------ | :----- | :---------------------- | :------- |
| columns | 列设置 | [ColumnItem](#column)[] | 无，必传 |

### 表格列

column 的配置继承自 El+ 的 table-column-item。下表列出的是扩展的或者新增的 API。

| 属性名             | 说明                                                                                                                                          | 类型                                                             | 默认值  |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- | :------ |
| type               | 单元格类型，替换原有属性                                                                                                                      | `enum` `'index' \| 'selection' \| 'radio' \| 'expand' \| 'sort'` | -       |
| tag                | 是否以标签展示                                                                                                                                | `boolean`                                                        | -       |
| isShow             | 是否展示，一般 layout 用于隐藏和展示某列                                                                                                      | `boolean`                                                        | `true`  |
| disableUICustomize | 是否可在 layout 中可配置                                                                                                                      | `boolean`                                                        | `false` |
| search             | [高级筛选栏配置](#search)                                                                                                                     | `object`                                                         | -       |
| enum               | 字段的枚举值，用来做字段映射，用法类似于[CascaderProps](https://element-plus.org/zh-CN/component/cascader.html#cascaderprops)，支持数组和函数 | `EnumProps[]` \| ()=> Promise<EnumProps[]> \| EnumProps[]        |
| -                  |
| isFilterEnum       | 是否使用enum的值格式化表格单元格，默认为true，jiji                                                                                            |

### 高级筛选栏

此部分对应示例图的高级筛选栏。

不支持高级表格操作，也没有计划支持：

- 根据某个表单项的变更，隐藏、禁用某些表单项
- 动态表单

支持功能：

- responsive 根据屏幕宽度显示不同个数的表单项
- 操作按钮在最右边，视觉和操作习惯保持统一
- 支持表单校验
- 默认只展示一行表单，可以折叠和展开更多表单

| 属性名                     | 说明                  | 类型                                                                                                                                                        | 默认值 |
| :------------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| el                         | 表单类型              | `enum` `'input'\| 'input-number'\| 'select'\| 'select-v2'\| 'tree-select'\| 'cascader'\| 'date-picker'\'time-picker'\| 'time-select'\| 'switch'\| 'slider'` | -      |
| label                      | El+ FormItem 的 label | string                                                                                                                                                      | -      |
| props                      | El+ FormItem 的 props | string                                                                                                                                                      | -      |
| tooltip                    | 表单项 tooltip        | string                                                                                                                                                      | -      |
| order                      | 表单项排序            | number                                                                                                                                                      | -      |
| span                       | 表单项占用空间        | number                                                                                                                                                      | 1      |
| offset                     | 表单项偏移量          | number                                                                                                                                                      | 0      |
| defaultValue               | 表单项初始值          | any                                                                                                                                                         | -      |
| render                     | 表单项渲染函数        | ({searchParam, placeholder, clearable, options, data}) => VNode                                                                                             | -      |
| xs \| sm \| md \| lg \| xl | responsive 断点       | {span: number, offset: number}                                                                                                                              | -      |

### toolbar

此部分对应示例图的标题栏。分三个部分，左中右。左边是一般新建等操作，默认为空，中间是预留，右边是布局等按钮。

按钮不支持设置 `size` 等。如果有需要，建议根据项目需要修改 ProTable 组件的默认按钮渲染。

```typescript
interface {
  // ...
  toolbarLeft?: Array<
  | 'add'
  | 'delete'
  | 'import'
  | {
      auth: string // 权限标识
      icon?: string // 图标 可以使用 @element-plus/icons-vue 、 /src/assets/icon/svg 下的 svg 文件和 https://icones.js.org/ 的图标
      name: string // 事件名标识
      text: string // 显示文本
      type: ButtonProps['type']
      attrs?: Omit<ButtonProps, 'icon' | 'text' | 'loading'|'type'> // 其他属性都是继承
    }
    >,
  toolbarMiddle?: VNodeChild | Component,
  toolbarRight?: Array<
  | 'refresh'
  | 'layout'
  | 'export'
  | 'download'
  | 'search'
  | {
      name: string
      icon: string
      text?: string
      auth?: string
      attrs?: Omit<ButtonProps, 'icon' | 'text' | 'circle' | 'loading'> // 默认是圆形按钮
    }
  >
}
```

## Events

## Exposes

:::
aaa
:::
