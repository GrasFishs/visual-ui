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
  if (e.code === 'Backspace' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
    e.preventDefault()
    delUIElement(current.value)
  }
}

onMounted(() => {
  window.addEventListener('keyup', onKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyUp)
})

</script>