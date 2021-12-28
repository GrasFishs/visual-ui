<template>
  <div class="mb-15px">
    <div class="text-13px text-gray mb-10px">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>