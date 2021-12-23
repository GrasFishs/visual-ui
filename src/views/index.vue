<template>
  <el-button round type="primary" @click="countUp">{{ count }}</el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'


const count = ref(0)

function countUp() {
  count.value++
}
</script>