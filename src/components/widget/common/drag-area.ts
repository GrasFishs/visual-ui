import root from '@/core/root'
import { addUIElement, moveUIElement, UIElement } from '@/core/UIElement'
import { ElMessage } from 'element-plus'
import { Directive, DirectiveBinding, ref } from 'vue'
import components from '../components'
import { WidgetDesc } from '../desc'

function onEnter(e: DragEvent) {
  e.stopPropagation()
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'copyMove'
  }
  (e.target as HTMLElement).classList.add('drag-area-active')
}

function onLeave(e: DragEvent) {
  (e.target as HTMLElement).classList.remove('drag-area-active')
  e.stopPropagation()
}

function findElement(id: string) {
  const stack = [root.value]
  while (stack.length > 0) {
    const el = stack.pop()!
    if (el.id === id) {
      return el
    } else {
      stack.push(...el.children)
    }
  }
}

function onDragOver (e: DragEvent) {
  e.preventDefault()
}

function createOnDrop (el: UIElement) {
  return function onDrop(e: DragEvent) {
    (e.target as HTMLElement).classList.remove('drag-area-active')
    e.stopPropagation()
    const { x, y, desc, id } = JSON.parse(e.dataTransfer?.getData('data')!) as {
      x: number,
      y: number,
      desc: WidgetDesc,
      id: string
    }
    // 移动节点
    if (id) {
      const e = findElement(id)
      if (e) {
        moveUIElement(e, el)
      }
    } else {
      if (desc.component in components) {
        addUIElement(el, desc)
      } else {
        ElMessage.warning(desc.component + '控件还未实现，尽情期待')
      }
    }
  }  
}

const elMap = new Map<HTMLElement, (e: DragEvent) => void>()

const dragArea: Directive = {
  mounted (el: HTMLElement, binding: DirectiveBinding<UIElement>) {
    const onDrop = createOnDrop(binding.value)
    elMap.set(el, onDrop)
    el.addEventListener('dragenter', onEnter)
    el.addEventListener('dragleave', onLeave)
    el.addEventListener('dragover', onDragOver)
    el.addEventListener('drop', onDrop)
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('dragenter', onEnter)
    el.removeEventListener('dragleave', onLeave)
    el.removeEventListener('dragover', onDragOver)
    el.removeEventListener('drop', elMap.get(el)!)
    elMap.delete(el)
  }
}

export default dragArea