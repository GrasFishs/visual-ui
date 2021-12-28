<template>
  <input ref="input" :value="value" :disabled="disabled" @input="onChange" @mousedown="onStart" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  value: string,
  disabled?: boolean,
  min?: number
}>(), {
  min: 0
})

const emit = defineEmits(['input', 'update:value'])

const pos = ref({
  x: 0,
  y: 0
})
const valueCopy = ref(0)
const unit = ref('')

function onChange(e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('input', value)
  emit('update:value', value)
}

function onMove(e: MouseEvent) {
  const value = Math.max(props.min, valueCopy.value - (e.clientY - pos.value.y)) + unit.value
  emit('input', value)
  emit('update:value', value)
}

function onEnd() {
  document.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseup', onEnd)
}

function formatValue() {
  const v = props.value
  let i = 0
  for (; i < v.length; i++) {
    if (!v[i].match(/\d/)) {
      break
    }
  }
  valueCopy.value = Number(v.slice(0, i))
  unit.value = v.slice(i)
}

function onStart(e: MouseEvent) {
  if (props.disabled) return
  pos.value.x = e.clientX
  pos.value.y = e.clientY
  formatValue()
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onEnd)
}

const input = ref<HTMLInputElement>()

defineExpose({
  focus: () => {
    input.value?.focus()
  },
  blur: () => {
    input.value?.blur()
  }
})
</script>
<style lang="scss" setup>
input:disabled {
  cursor: not-allowed;
}
</style>