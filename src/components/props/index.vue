<template>
  <div class="w-300px box-border p-10px h-100vh right-0 overflow-y-auto shadow bg-white fixed z-5">
    <div class="text-gray-700 font-bold mb-10px">属性节点</div>
    <template v-if="!current?.root">
      <input
        v-if="editingName"
        ref="nameEditor"
        class="text-14px py-6px px-4px bg-gray-100 border-none outline-blue-500 w-full"
        v-model="current.name"
      />
      <div
        v-else
        @dblclick="editName"
        class="text-14px py-6px px-4px hover:bg-gray-100"
      >{{ current.name }}</div>
      <div class="flex">
        <div>
          <div class="label">width</div>
          <el-input size="small" v-model="current.props.w"></el-input>
        </div>
        <div class="ml-10px">
          <div class="label">height</div>
          <el-input size="small" v-model="current.props.h"></el-input>
        </div>
      </div>
      <div class="mt-10px">
        <div class="label">布局</div>
        <el-select size="small" v-model="current.props.display">
          <el-option v-for="op in displayOptions" :label="op.label" :value="op.value"></el-option>
        </el-select>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { current } from '@/core/root'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'

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
</style>