import { WidgetGroup } from '../../desc'
// @unocss-include

export default {
  title: '布局组件',
  widgets: [
    {
      component: 'Layout',
      title: '常规布局',
      name: '常规布局',
      description: '常规布局div',
      icon: 'i-ic-round-inbox',
      area: true,
      defaultProps: {

      },
      style: {
        minHeight: '50px'
      }
    },
    {
      component: 'Flex',
      title: '弹性布局',
      name: '弹性布局',
      description: 'flex布局',
      icon: 'i-ic-round-move-to-inbox',
      area: true,
      style: {
        minHeight: '50px'
      }
    }
  ]
} as WidgetGroup