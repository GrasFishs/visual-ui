<template>
  <DragArea v-if="flattenWidgetsDesc[el.component].area" :el="el" :style="style">
    <component
      @click.stop="current = el"
      :class="{ _layout: !el.root, _active: !el.root && current === el }"
      :is="widgets[el.component]"
      :style="style"
      v-bind="el.props"
      v-on="el.on"
    >
      <render v-for="e in el.children" :el="e" :key="el.id" />
    </component>
  </DragArea>
  <component
    v-else
    class="_box"
    :class="{ _active: current === el }"
    @click.stop="current = el"
    :style="style"
    :is="widgets[el.component]"
    v-bind="el.props"
    v-on="el.on"
  >
    <render v-for="e in el.children" :el="e" :key="el.id" />
  </component>
</template>
<script lang="ts">
import widgets from '../widget/components'

export default {
  components: {
    ...widgets
  }
}
</script>

<script lang="ts" setup>
import { UIElement, UIElementProps } from '@/core/UIElement'
import { computed } from 'vue'
import DragArea from '../widget/common/drag-area.vue'
import { current } from '@/core/root'
import { flattenWidgetsDesc } from '../widget/desc'
const props = defineProps<{ el: UIElement }>()
defineExpose({
  widgets,
  flattenWidgetsDesc,
  current
})

function getPx(attr: keyof UIElementProps) {
  const v = props.el.props[attr].toString() as string
  return v.match(/^\d+$/) ? v + 'px' : v
}

const style = computed(() => ({
  ...(props.el.widget?.style || {}),
  width: getPx('w'),
  height: getPx('h'),
  paddingLeft: getPx('pl'),
  paddingRight: getPx('pr'),
  paddingTop: getPx('pt'),
  paddingBottom: getPx('pb'),
  marginLeft: getPx('pl'),
  marginRight: getPx('pr'),
  marginTop: getPx('pt'),
  marginBottom: getPx('pb'),
  display: props.el.props.display,
}))
</script>

<style lang="scss" scoped>
@mixin dash-line($color) {
  background: linear-gradient(90deg, $color 50%, transparent 0) repeat-x,
    linear-gradient(90deg, $color 50%, transparent 0) repeat-x,
    linear-gradient(0deg, $color 50%, transparent 0) repeat-y,
    linear-gradient(0deg, $color 50%, transparent 0) repeat-y;
  background-size: 8px 2px, 8px 2px, 2px 8px, 2px 8px;
  background-position: 0 0, 0 100%, 0 0, 100% 0;
}
._box:hover,
._box._active {
  @include dash-line(#0284c7);
}

.layout:hover,
._active {
  @include dash-line(#10b981);
}
</style>