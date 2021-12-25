<template>
  <div class="w-240px h-100vh fixed bg-white z-5 flex-col">
    <div class="flex mb-10px">
      <div
        class="flex items-center px-8px py-6px text-gray-400 cursor-pointer"
        :class="{ 'text-gray-500 font-bold bg-gray-100': current === i }"
        v-for="(tab, i) in tabs"
        :key="i"
        @click="current = i"
      >
        <div class="mr-4px" :class="tab.icon"></div>
        {{ tab.title }}
      </div>
    </div>
    <component :is="tabs[current].component" v-bind="tabs[current].props" />
  </div>
</template>

<script lang="ts" setup>
import root from '@/core/root'
import { defineAsyncComponent, ref } from 'vue'

const current = ref(0)

const tabs = [{
  title: '设计',
  icon: 'i-ic-round-book',
  component: defineAsyncComponent(() => import('./design.vue')),
  props: {
  }
}, {
  title: '层级',
  icon: 'i-ic-round-layers text-16px',
  component: defineAsyncComponent(() => import('./layer.vue')),
  props: {
    el: root.value
  }
}]
</script>