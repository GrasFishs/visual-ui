<template>
  <div class="groups">
    <div class="group p-10px" v-for="g in groups" :key="g.title">
      <div class="text-gray-700 font-bold">{{ g.title }}</div>
      <div class="widgets flex flex-wrap">
        <Draggable
          v-for="w in g.widgets"
          class="widget w-100px h-100px flex flex-col justify-center items-center cursor-pointer"
          bg="white hover:gray-100"
          :widget-desc="w"
        >
          <div class="w-50px h-50px text-50px text-gray-500" :class="w.icon" />
          <div text="14px gray-500" class="mt-2px">{{ w.title }}</div>
        </Draggable>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import groups from '../widget/desc'
import Draggable from '../widget/common/draggable.vue'

</script>