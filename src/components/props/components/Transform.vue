<template>
  <Panel title="变换" class="text-14px">
    <div class="flex">
      <div>
        <div class="flex items-center" title="宽度">
          <div class="text-gray label">W</div>
          <NumInput :value="current.props.w" class="value" @input="handleSize('w', $event)" />
        </div>
        <div class="flex items-center" title="高度">
          <div class="text-gray label">H</div>
          <NumInput :value="current.props.h" class="value" @input="handleSize('h', $event)" />
        </div>
      </div>
      <div class="relative lock">
        <div class="absolute lock-icon cursor-pointer" @click="lock = !lock" title="锁定宽高比">
          <div
            class="icon text-12px"
            :class="[lock ? 'i-ic-round-lock locked' : 'i-ic-round-lock-open']"
          />
        </div>
      </div>
      <div>
        <div class="flex items-center" title="X位置">
          <div class="text-gray label">X</div>
          <NumInput :value="current.props.x" class="value" @input="handlePos('x', $event)" />
        </div>
        <div class="flex items-center" title="Y位置">
          <div class="text-gray label">Y</div>
          <NumInput :value="current.props.y" class="value" @input="handlePos('y', $event)" />
        </div>
      </div>
    </div>
    <TRBL class="mt-5px" :keys="p.keys" :titles="p.titles" :min="0" title="内边距" label="内" />
    <TRBL class="mt-5px" :keys="m.keys" :titles="m.titles" :min="-Infinity" title="外边距" label="外" />
  </Panel>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { current } from '@/core/root'
import Panel from './Panel.vue'
import NumInput from '@/components/common/NumInput.vue'

const lock = ref(false)

function handleSize(type: 'w' | 'h', v: string) {
  const props = current.value.props
  if (lock.value) {
    const side = type === 'w' ? 'h' : 'w'
    if (props[side] && Number(props[type])) {
      props[side] = (Number(props[side]) / Number(props[type]) * Number(v)).toFixed(0)
      props[type] = v
    } else {
      props.w = props.h = v
    }
  } else {
    props[type] = v
  }
}

function handlePos(type: 'x' | 'y', v: string) {
  // TODO
}

const p = reactive({
  keys: ['pt', 'pr', 'pb', 'pl'],
  titles: ['上内边距', '右内边距', '下内边距', '左内边距'],
})

const m = reactive({
  keys: ['mt', 'mr', 'mb', 'ml'],
  titles: ['上外边距', '右外边距', '下外边距', '左外边距'],
})

</script>
<style lang="scss" scoped>
.label {
  width: 15px;
}
.value {
  border: none;
  outline: none;
  width: 50px;
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

.lock {
  width: 5px;
  height: 35px;
  border: 1px solid #e4e4e7;
  border-left: none;
  top: 8px;
  margin-left: 5px;
  margin-right: 20px;

  .lock-icon {
    top: 50%;
    transform: translateY(-50%);
    background-color: white;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;

    .icon {
      color: #e4e4e7;

      &.locked {
        color: #a1a1aa;
      }
    }
  }
}
</style>