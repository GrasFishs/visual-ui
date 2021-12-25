<template>
  <span>{{ text }}</span>
</template>

<script setup lang="ts">

type TextProps = {
  text: string
}

defineProps<TextProps>()

</script>

<style>
</style>