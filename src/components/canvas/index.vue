<template>
  <div
    class="h-100vh w-100vw bg-gray-100 fixed top-0 left-0 overflow-y-auto"
    :style="{ cursor: pos.isGrabbing ? 'grab' : 'inherit' }"
    @mousedown="pos.onStart"
  >
    <div
      class="actions fixed left-50% top-10px -translate-x-50% z-100 flex justify-center items-center"
    >
      <input
        type="number"
        class="outline-none border-none py-4px px-6px w-60px text-14px shadow"
        v-model="size.width"
      />
      <div class="i-ic-round-close mx-5px" />
      <input
        type="number"
        class="outline-none border-none py-4px px-6px w-60px text-14px shadow"
        v-model="size.height"
      />
      <button
        class="text-14px ml-2px border-none bg-blue text-white px-8px py-4px rounded"
        @click="pos.reset"
      >复位</button>
    </div>
    <div
      ref="area"
      :style="{ width: size.width + 'px', height: size.height + 'px', left: pos.x + 'px', top: pos.y + 'px' }"
      class="bg-white shadow absolute"
    >
      <Render :el="root" class="w-full h-full" />
      <div class="h-100px"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import DragArea from '../widget/common/drag-area.vue'
import Render from './render.vue'
import root from '@/core/root'

const size = reactive({
  width: 750,
  height: 1334
})

const area = ref<HTMLDivElement>()

const pos = reactive({
  x: size.width / 2,
  y: 60,
  isGrabbing: false,
  isStart: false,
  lastX: 0,
  lastY: 0,
  onStart: (e: MouseEvent) => {
    pos.isStart = true
    if (pos.isGrabbing) {
      const left = area.value?.offsetLeft ?? 0
      const top = area.value?.offsetTop ?? 0
      pos.lastX = e.clientX - left
      pos.lastY = e.clientY - top
    }
  },
  onMove: (e: MouseEvent) => {
    if (pos.isGrabbing && pos.isStart) {
      pos.x = e.clientX - pos.lastX
      pos.y = e.clientY - pos.lastY
    }
  },
  onEnd: (e: MouseEvent) => {
    pos.isStart = false
  },
  reset: () => {
    pos.x = size.width / 2
    pos.y = 50
  }
})

onMounted(() => {
  window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault()
      pos.isGrabbing = e.key === ' '
    }
  })

  document.addEventListener('mousemove', pos.onMove)

  document.addEventListener('mouseup', pos.onEnd)

  window.addEventListener('keyup', () => {
    pos.isGrabbing = false
    pos.isStart = false
  })
})

</script>