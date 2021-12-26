<template>
  <div
    v-if="root.children.length === 0"
    class="text-center text-gray h-80% flex items-center justify-center"
  >暂无元素</div>
  <div v-else>
    <div
      class="hover:bg-gray-100 flex items-center px-6px py-4px"
      :class="{ 'bg-gray-200': el.id === current.id }"
      @dblclick="editName"
      @click="current = el"
      v-if="!el.root"
    >
      <div class="text-gray" :class="el.widget?.area ? 'i-ic-round-folder' : el.widget?.icon"></div>
      <input
        ref="nameEditor"
        v-if="editingName"
        class="pl-5px py-2px text-14px text-gray-600 border-none outline-blue-500"
        v-model="el.name"
      />
      <div v-else class="pl-5px py-2px text-14px text-gray-600">{{ el.name }}</div>
    </div>
    <div :class="{ 'ml-20px': !el.root }" v-if="show">
      <layer v-for="child in el.children" :el="child"></layer>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { UIElement } from '@/core/UIElement'
import root, { current } from '@/core/root'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'

defineProps<{
  el: UIElement
}>()

const show = ref(true)

const editingName = ref(false)
const nameEditor = ref<HTMLInputElement>()

function offEdit(e: MouseEvent) {
  if (e.target !== nameEditor.value) {
    editingName.value = false
  }
}

function editName() {
  editingName.value = true
  nextTick(() => {
    nameEditor.value?.focus()
  })
}

onMounted(() => {
  document.addEventListener('click', offEdit)
})

onUnmounted(() => {
  document.removeEventListener('click', offEdit)
})
</script>