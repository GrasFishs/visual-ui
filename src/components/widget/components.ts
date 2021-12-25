import { defineAsyncComponent } from 'vue'

export default {
  Text: defineAsyncComponent(() => import('./widgets/base/Text.vue')),
  Image: defineAsyncComponent(() => import('./widgets/base/Image.vue')),
  Layout: defineAsyncComponent(() => import('./widgets/layout/Layout.vue')),
  Flex: defineAsyncComponent(() => import('./widgets/layout/Flex.vue'))
}