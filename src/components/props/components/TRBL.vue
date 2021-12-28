<template>
  <div class="flex items-center">
    <div class="text-gray w-20px" :title="title">{{ label }}</div>
    <div class="flex">
      <div class="icon" @click="state.changeTotal(true)" :title="title">
        <div class="total" :class="{ 'active': state.useTotal }"></div>
      </div>
      <div
        class="icon"
        @click="state.changeTotal(false)"
        :title="titles[state.current]"
      >
        <div v-if="state.current === -1" class="box"></div>
        <template v-else>
          <div
            v-for="(k, i) in state.keys"
            :class="[`padding box ${k}`, state.current === i ? 'active' : '']"
          ></div>
        </template>
      </div>
    </div>
    <div class="flex">
      <NumInput
        :ref="getRef('total')"
        v-if="state.useTotal"
        v-model:value="state.value"
        @input="state.onTotalInput"
        class="value"
      />
      <template v-else>
        <NumInput
          class="value mr-5px"
          :ref="getRef(k)"
          :title="titles[i]"
          :key="i"
          v-model:value="current.props[k]"
          @focus="state.current = i"
          v-for="(k, i) of keys"
        ></NumInput>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import NumInput from '@/components/common/NumInput.vue'
import { current } from '../../../core/root'

const props = defineProps<{
  title: string
  label: string
  keys: string[]
  titles: string[]
}>()

const state = reactive({
  useTotal: true,
  value: '',
  current: -1,
  keys: ['t', 'r', 'b', 'l'],
  refs: {
    total: ref<HTMLInputElement>(),
    t: ref<HTMLInputElement>(),
    r: ref<HTMLInputElement>(),
    b: ref<HTMLInputElement>(),
    l: ref<HTMLInputElement>()
  },
  onTotalInput: (v: unknown) => {
    props.keys.forEach(k => {
      current.value.props[k] = v as string
    })
  },
  changeTotal: (change: boolean) => {
    if (change) {
      state.useTotal = true
      state.current = -1
      nextTick(() => {
        state.refs.total?.focus()
      })
    } else {
      state.useTotal = false
      state.current = 0
      nextTick(() => {
        state.refs.t?.focus()
      })
    }
  }
})

function getRef(key: string) {
  return (node: unknown) => {
    if (node) {
      // @ts-ignore
      state.refs[key] = node
    }
  }
}
</script>
<style lang="scss" scoped>
.value {
  border: none;
  outline: none;
  width: 30px;
  margin-left: 5px;
  border-bottom: 1px solid #e4e4e7;
  padding: 4px;
  color: #52525b;
  transition: 0.2s;
  font-size: 12px;

  &:focus {
    border-color: #0ea5e9;
  }

  &::placeholder {
    color: #d4d4d8;
  }
}
.icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e4e4e7;
  font-size: 16px;
  position: relative;
  cursor: pointer;
  &:first-child {
    border-radius: 4px 0 0 4px;
    border-right: 0;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  .total {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    border: 1px solid #a1a1aa;
    background-color: #e4e4e7;
    transition: 0.2s;
    &.active {
      border: 1px solid #0ea5e9;
      background-color: #bae6fd;
    }
  }

  .box {
    width: 6px;
    height: 6px;
    background-color: #e4e4e7;

    &.active {
      background-color: #bae6fd;
    }

    &.t,
    &.b,
    &.l,
    &.r {
      background-color: #e4e4e7;
      position: absolute;
      border: 1px solid #e4e4e7;

      &.active {
        background-color: #bae6fd;
        border: 1px solid #0ea5e9;
        z-index: 5;
      }
    }

    &.t,
    &.b {
      width: 14px;
      height: 4px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &.l,
    &.r {
      height: 14px;
      width: 4px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &.t {
      top: 4px;
      border-radius: 4px 4px 0 0;
    }

    &.b {
      bottom: 4px;
      border-radius: 0 0 4px 4px;
    }

    &.l {
      left: 4px;
      border-radius: 4px 0 0 4px;
    }

    &.r {
      right: 4px;
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>