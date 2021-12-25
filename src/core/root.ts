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
  children: []
})

// @ts-ignore
export const current = ref<UIElement>(root.value)

export default root