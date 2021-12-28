<template>
  <div class="w-300px box-border p-10px h-100vh right-0 overflow-y-auto shadow bg-white fixed z-5">
    <input
        v-if="editingName"
        ref="nameEditor"
        class="pl-4px py-6px text-14px bg-gray-100 border-none outline-blue-500 w-full"
        v-model="current.name"
      />
    <div v-else @dblclick="editName"  class="py-6px text-14px hover:bg-gray-100 hover:pl-4px transition">{{ current.name }}</div>
    <div v-if="!current?.root" class="text-14px mt-20px">
      <transform />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { current } from '@/core/root'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import Transform from './components/Transform.vue'

const displayOptions = ref([{
  label: '块级block',
  value: 'block'
}, {
  label: '内联inline',
  value: 'inline'
}, {
  label: '内联块级inline-block',
  value: 'inline-block'
}])

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
<style lang='scss' scoped>
.label {
  margin-bottom: 5px;
}

.distance {
  width: 80px;
}
</style>