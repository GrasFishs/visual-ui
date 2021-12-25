<template>
  <WorkArea />
  <Canvas />
  <Props />
</template>
<script setup lang="ts">
import WorkArea from '@/components/work-area/index.vue'
import Canvas from '@/components/canvas/index.vue'
import Props from '@/components/props/index.vue'
import { onMounted, onUnmounted } from 'vue'
import { delUIElement } from '@/core/UIElement'
import { current } from '@/core/root'

function onKeyUp(e: KeyboardEvent) {
  if (e.code === 'Backspace') {
    e.preventDefault()
    delUIElement(current.value)
  }
}

onMounted(() => {
  console.log('123')
  window.addEventListener('keyup', onKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyUp)
})

</script>