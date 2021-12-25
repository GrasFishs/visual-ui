<template>
  <div draggable="true" @dragstart="onStart">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { WidgetDesc } from '../desc'

const props = defineProps<{
  widgetDesc: WidgetDesc
}>()

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
      desc: props.widgetDesc
    }))
  }
}
</script>

<style>
</style>