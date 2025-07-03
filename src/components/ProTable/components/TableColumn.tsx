import { inject, ref, useSlots, defineComponent } from 'vue'
import type { ColumnProps, RenderScope, HeaderRenderScope } from '@/components/ProTable/interface'
import { filterEnum, formatValue, handleProp, handleRowAccordingToProp } from '@/utils'
import { ElTableColumn, ElTag } from 'element-plus'
import { TABLE_COLUMN_OPERATION_NAME } from '@/constants'

export default defineComponent({
  name: 'TableColumn',
  props: {
    column: {
      type: Object as () => ColumnProps,
      required: true,
    },
  },
  setup(props) {
    const slots = useSlots()
    const enumMap = inject('enumMap', ref(new Map()))

    // 渲染表格数据
    const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
      return enumMap.value.get(item.prop) && item.isFilterEnum
        ? filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop)!, item.fieldNames)
        : formatValue(handleRowAccordingToProp(scope.row, item.prop!))
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
              align={item.align ?? 'center'}
              showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== TABLE_COLUMN_OPERATION_NAME}
              label={item.label}
              fixed={item.fixed}
            >
              {{
                default: (scope: RenderScope<any>) => {
                  if (item._children) return item._children.map(child => RenderTableColumn(child))
                  if (item.render) return item.render(scope)
                  if (item.prop && slots[handleProp(item.prop)]) return slots[handleProp(item.prop)]!(scope)
                  if (item.tag) return <ElTag type={getTagType(item, scope)}>{renderCellData(item, scope)}</ElTag>
                  return renderCellData(item, scope)
                },
                header: (scope: HeaderRenderScope<any>) => {
                  if (item.headerRender) return item.headerRender(scope)
                  if (item.prop && slots[`${handleProp(item.prop)}Header`])
                    return slots[`${handleProp(item.prop)}Header`]!(scope)
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
