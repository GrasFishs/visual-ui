<script lang="tsx">
import widgets from '../widget/components'
import { UIElement, UIElementProps } from '@/core/UIElement'
import { computed, watch } from 'vue'
import dragAreaDirective from '../widget/common/drag-area'
import draggableDirective from '../widget/common/draggable'
import { current } from '@/core/root'

export default {
  name: 'render',
  components: {
    ...widgets
  },
  props: {
    el: Object
  },
  directives: {
    area: dragAreaDirective,
    drag: draggableDirective
  },
  setup(props: { el: UIElement }) {
    const el = props.el

    function getPx(attr: keyof UIElementProps) {
      const v = el.props[attr].toString() as string
      return v.match(/^\d+$/) ? v + 'px' : v
    }

    function getInnerSize() {
      return {
        width: el.props.w.toString().endsWith('%') ? '100%' : getPx('w'),
        height: el.props.h.toString().endsWith('%') ? '100%' : getPx('h'),
      }
    }

    const style = computed(() => ({
      ...(el.widget?.style || {}),
      ...getInnerSize(),
      paddingLeft: getPx('pl'),
      paddingRight: getPx('pr'),
      paddingTop: getPx('pt'),
      paddingBottom: getPx('pb'),
      display: el.props.display,
    }))
    
    const outsideStyle = computed(() => ({
      width: getPx('w'),
      height: el.root ? '100%' : getPx('h'),
      marginLeft: getPx('ml'),
      marginRight: getPx('mr'),
      marginTop: getPx('mt'),
      marginBottom: getPx('mb'),
    }))

    function onSelect(e: MouseEvent) {
      e.stopPropagation()
      current.value = el
    }

    function renderWidget() {
      const node = widgets[el.component]
      return <node
        v-drag={[{ el, desc: el.widget }]}
        onClick={onSelect}
        class={['_box', current.value.id === el.id ? '_active' : '']}
        style={style.value}
        {...el.props}
        {...el.on}
      >
        {el.children.map(e => <render el={e} key={e.id} />)}
      </node>
    }

    function renderLayout() {
      const node = widgets[el.component]
      return <node
        v-drag={[{ el, desc: el.widget }]}
        v-area:arg={el}
        onClick={onSelect}
        class={`_layout ${current.value.id === el.id ? '_active' : ''}`}
        style={{
          ...style.value,
          ...outsideStyle.value,
        }}
      >
        {el.children.map(e => <render el={e} key={e.id} />)}
      </node>
    }

    function renderRoot() {
      const node = widgets[el.component]
      return <node v-area:arg={el}>{el.children.map(e => <render el={e} key={e.id} />)}</node>
    }

    return () => el?.root
      ? renderRoot()
      : el.widget.area ? renderLayout() : renderWidget()
  }
}
</script>
<style lang="scss">
@import '../widget/common/drag-area.scss';
</style>
<style lang="scss" scoped>
@mixin dash-line($color) {
  background: linear-gradient(90deg, $color 50%, transparent 0) repeat-x,
    linear-gradient(90deg, $color 50%, transparent 0) repeat-x,
    linear-gradient(0deg, $color 50%, transparent 0) repeat-y,
    linear-gradient(0deg, $color 50%, transparent 0) repeat-y;
  background-size: 8px 2px, 8px 2px, 2px 8px, 2px 8px;
  background-position: 0 0, 0 100%, 0 0, 100% 0;
}
._box:hover,
._box._active {
  @include dash-line(#0284c7);
}

._layout {
  @include dash-line(#cbd5e1);
  &:hover, &._active {
    @include dash-line(#10b981);
  }
}
</style>