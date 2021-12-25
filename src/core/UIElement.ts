import components from '@/components/widget/components'
import { WidgetDesc } from '@/components/widget/desc'

type Components = typeof components

type UIElementSizeProps = {
  w: string
  h: string
  pt: string
  pb: string
  pl: string
  pr: string
  mt: string
  mb: string
  mr: string
  ml: string
}

export type UIElementProps = {
  display: string
  [key: string]: any
} & UIElementSizeProps

export interface UIElement {
  parent: UIElement
  id: string
  root?: boolean
  name: string
  component: keyof Components
  props: UIElementProps
  on: object
  children: UIElement[]
  widget?: WidgetDesc
}

export function getDefaultSizeProps(): UIElementProps {
  return {
    w: '',
    h: '',
    pl: '',
    pr: '',
    pt: '',
    pb: '',
    ml: '',
    mr: '',
    mt: '',
    mb: '',
    display: ''
  }
}

export function addUIElement(el: UIElement, desc: WidgetDesc) {
  const props: UIElementProps = {
    ...getDefaultSizeProps(),
    ...(desc.defaultProps || {})
  }
  el.children.push({
    parent: el,
    component: desc.component,
    name: desc.name,
    id: Math.random().toString(36).slice(2),
    props,
    on: {},
    children: [],
    widget: desc
  })
}

export function delUIElement(el: UIElement) {
  if (!el.root) {
    const p = el.parent
    p.children.splice(p.children.indexOf(el), 1)
  }
}