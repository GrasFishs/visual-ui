import { UIElementProps } from '@/core/UIElement'
import { CSSProperties, StyleValue } from 'vue'
import components from './components'
import base from './widgets/base'
import layout from './widgets/layout/index'

export type WidgetGroup = {
  title: string
  widgets: WidgetDesc[]
}

export type WidgetProps = {
  [key: string]: {}
}

type WidgetDefaultProps<Props> = {
  [key in keyof Props]: any
} & UIElementProps

export type WidgetDesc<Props extends WidgetProps = WidgetProps> = {
  component: keyof typeof components
  title: string
  name: string
  description: string
  icon: string
  area?: boolean
  props?: Props
  defaultProps?: WidgetDefaultProps<Props>
  style: CSSProperties
}

const widgetsDesc: WidgetGroup[] = [
  base,
  layout,
] 

export default widgetsDesc

type WidgetDescMap = {
  [key: string]: WidgetDesc
}

export const flattenWidgetsDesc = widgetsDesc.reduce((map, group) => {
  group.widgets.forEach(desc => {
    map[desc.component] = desc
  })
  return map
}, {} as WidgetDescMap)