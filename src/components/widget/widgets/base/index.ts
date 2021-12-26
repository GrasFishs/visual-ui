import { WidgetGroup } from '../../desc'
// @unocss-include

export default {
  title: '基础控件',
  widgets: [
    {
      component: 'Text',
      name: '文本',
      title: '文本控件',
      description: '文本控件span',
      icon: 'i-ic-round-text-fields',
      defaultProps: {
        text: '请输入文字',
        display: 'inline-block'
      }
    },
    {
      component: 'Image',
      name: '图片',
      title: '图片控件',
      description: '图片控件img',
      icon: 'i-ic-round-image'
    }
  ]
} as WidgetGroup