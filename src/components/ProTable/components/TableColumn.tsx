import type { ColumnProps, RenderScope, HeaderRenderScope } from '../interface'
import { filterEnum, formatValue, handleProp, handleRowAccordingToProp } from '@/utils'
import { ElTableColumn, ElTag, ElText } from 'element-plus'
import { TABLE_COLUMN_OPERATIONS_NAME } from '@/constants/proTable'

const highlightKeyword = (value: string, keyword: string) => {
  const index = value.indexOf(keyword)
  if (index === -1) {
    return value
  }
  return (
    <>
      {value.slice(0, index)}
      <ElText type="success">{keyword}</ElText>
      {value.slice(index + keyword.length)}
    </>
  )
}

export default defineComponent({
  name: 'TableColumn',
  props: {
    column: {
      type: Object as () => ColumnProps,
      required: true,
    },
    searchParam: {
      type: Object as () => Record<string, any>,
      required: true,
    },
  },
  setup(props) {
    const slots = useSlots()
    const enumMap = inject('enumMap', ref(new Map()))

    // 渲染表格数据
    const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
      if (enumMap.value.get(item.prop) && item.isFilterEnum) {
        return filterEnum(
          handleRowAccordingToProp(scope.row, item.prop!),
          enumMap.value.get(item.prop)!,
          item.fieldNames
        )
      }
      // 如果搜索项配置了 highlightKeyword === true, 表格项有值且搜索关键词不为空，则高亮搜索关键词
      if (item.search?.highlightKeyword && scope.row[item.prop!]) {
        return highlightKeyword(handleRowAccordingToProp(scope.row, item.prop!), props.searchParam[item.prop!])
      }
      return formatValue(handleRowAccordingToProp(scope.row, item.prop!))
    }

    // 获取 tag 类型
    const getTagType = (item: ColumnProps, scope: RenderScope<any>) => {
      return (
        filterEnum(
          handleRowAccordingToProp(scope.row, item.prop!),
          enumMap.value.get(item.prop),
          item.fieldNames,
          'tag'
        ) || 'primary'
      )
    }

    const RenderTableColumn = (item: ColumnProps) => {
      return (
        <>
          {item.isShow && (
            <ElTableColumn
              {...item}
              align={item.align}
              showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== TABLE_COLUMN_OPERATIONS_NAME}
              label={unref(item.label)}
              fixed={item.fixed}
            >
              {{
                default: (scope: RenderScope<any>) => {
                  if (item.children) {
                    return item.children.map(child => RenderTableColumn(child))
                  }
                  if (item.render) {
                    return item.render(scope)
                  }
                  if (item.prop && slots[handleProp(item.prop)]) {
                    return slots[handleProp(item.prop)]!(scope)
                  }
                  if (item.tag) {
                    return <ElTag type={getTagType(item, scope)}>{renderCellData(item, scope)}</ElTag>
                  }
                  return renderCellData(item, scope)
                },
                header: (scope: HeaderRenderScope<any>) => {
                  if (item.headerRender) {
                    return item.headerRender(scope)
                  }
                  if (item.prop && slots[`${handleProp(item.prop)}Header`]) {
                    return slots[`${handleProp(item.prop)}Header`]!(scope)
                  }
                  return item.label
                },
              }}
            </ElTableColumn>
          )}
        </>
      )
    }

    return () => <RenderTableColumn {...props.column} />
  },
})
