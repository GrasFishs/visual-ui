import { UIElement } from '@/core/UIElement'
import { Directive, DirectiveBinding, ref } from 'vue'
import { WidgetDesc } from '../desc'

const elMap = new Map<HTMLElement, (e: DragEvent) => void>()

function createOnStart(desc: WidgetDesc, el?: UIElement) {
  return function (e: DragEvent) {
    e.stopPropagation()
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'copyMove'
      e.dataTransfer.setData('data', JSON.stringify({
        x: e.clientX,
        y: e.clientY,
        desc,
        id: el?.id ?? ''
      }))
    }
  }
}

const draggable: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<{
    desc: WidgetDesc,
    el?: UIElement
  }>) {
    el.setAttribute('draggable', 'true')
    const onStart = createOnStart(binding.value.desc, binding.value.el)
    el.addEventListener('dragstart', onStart)
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('dragstart', elMap.get(el)!)
    elMap.delete(el)
  }
}

export default draggable