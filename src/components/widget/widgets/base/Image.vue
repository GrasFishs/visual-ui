<template>
  <img v-if="src" :src="src" />
  <div class="inline-flex justify-center items-center" v-else>
    <div class="i-ic-round-image text-blue-400 w-50px h-50px inline-block"></div>
  </div>
</template>
<script lang="ts" setup>

const props = defineProps<{
  src?: string
}>()
</script>