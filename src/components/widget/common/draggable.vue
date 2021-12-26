<template>
  <component :is="isInline ? 'span' : 'div'" :class="[isInline ? 'inline-block' : '']" draggable="true" @dragstart.stop="onStart">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { UIElement } from '@/core/UIElement'
import { computed, reactive } from 'vue'
import type { WidgetDesc } from '../desc'

const props = defineProps<{
  widgetDesc: WidgetDesc
  el?: UIElement
}>()

const isInline = computed(() => ['Text', 'Image'].includes(props.widgetDesc.component))

const pos = reactive({
  x: 0,
  y: 0
})
function onStart(e: DragEvent) {
  pos.x = e.clientX
  pos.y = e.clientY
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'copyMove'
    e.dataTransfer.setData('data', JSON.stringify({
      x: pos.x,
      y: pos.y,
      desc: props.widgetDesc,
      id: props.el?.id ?? ''
    }))
  }
}
</script>

<style>
</style>