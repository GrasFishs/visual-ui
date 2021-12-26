<template>
  <div
    :class="{ active }"
    @dragenter.stop="onEnter"
    @dragleave.stop="onLeave"
    @dragover.prevent
    @drop.stop="onDrop"
    class="relative area"
  >
    <div
      class="absolute -top-20px left-0 px-6px py-4px"
      :bg="[active ? 'gray-400' : 'gray-300']"
      text="white 12px"
      v-if="title"
    >{{ title }}</div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import root from '@/core/root'
import { addUIElement, moveUIElement, UIElement } from '@/core/UIElement'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import components from '../components'
import { WidgetDesc } from '../desc'

const props = defineProps<{
  el: UIElement,
  title?: string
}>()

const active = ref(false)

function onEnter(e: DragEvent) {
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'copyMove'
  }
  active.value = true
}

function onLeave(e: DragEvent) {
  active.value = false
}

function findElement(id: string) {
  const stack = [root.value]
  while (stack.length > 0) {
    const el = stack.pop()!
    if (el.id === id) {
      return el
    } else {
      stack.push(...el.children)
    }
  }
}

function onDrop(e: DragEvent) {
  active.value = false
  const { x, y, desc, id } = JSON.parse(e.dataTransfer?.getData('data')!) as {
    x: number,
    y: number,
    desc: WidgetDesc,
    id: string
  }
  // 移动节点
  if (id) {
    const el = findElement(id)
    if (el) {
      moveUIElement(el, props.el)
    }
  } else {
    if (desc.component in components) {
      addUIElement(props.el, desc)
    } else {
      ElMessage.warning(desc.component + '控件还未实现，尽情期待')
    }
  }
}
</script>
<style lang="scss">
@mixin dash-line($color) {
  background: linear-gradient(90deg, $color 50%, transparent 0) repeat-x,
    linear-gradient(90deg, $color 50%, transparent 0) repeat-x,
    linear-gradient(0deg, $color 50%, transparent 0) repeat-y,
    linear-gradient(0deg, $color 50%, transparent 0) repeat-y;
  background-size: 8px 2px, 8px 2px, 2px 8px, 2px 8px;
  background-position: 0 0, 0 100%, 0 0, 100% 0;
}
.area {
  @include dash-line(#cbd5e1);
}
.active {
  @include dash-line(#94a3b8);
  animation: move 0.3s infinite linear;
}

@keyframes move {
  100% {
    background-position: 8px 0, -8px 100%, 0 -8px, 100% 8px;
  }
}
</style>