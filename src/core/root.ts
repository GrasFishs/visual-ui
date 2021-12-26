import base from '@/components/widget/widgets/base'
import layout from '@/components/widget/widgets/layout'
import { ref } from 'vue'
import { getDefaultSizeProps, UIElement } from './UIElement'

const root = ref<UIElement>({
  // @ts-ignore
  parent: null,
  id: 'root',
  name: '页面',
  root: true,
  component: 'Layout',
  props: getDefaultSizeProps(),
  on: {},
  children: [],
  widget: layout.widgets.find(w => w.component === 'Layout')!
})

// @ts-ignore
export const current = ref<UIElement>(root.value)

export default root