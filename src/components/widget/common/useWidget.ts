import { reactive } from 'vue'
import mitt from 'mitt'

type WidgetParams = {
  isLayout: boolean
  name: string
}

export function useWidget (params: Partial<WidgetParams>) {
  const _props: WidgetParams = reactive({
    isLayout: !!params.isLayout,
    name: params.name!
  })

  const miter = mitt()
  
  return {
    _props,
    on: miter.on.bind(miter),
    off: miter.off.bind(miter),
    emit: miter.emit.bind(miter)
  }
}