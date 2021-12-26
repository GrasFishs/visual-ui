<script lang="tsx">
import widgets from '../widget/components'
import { UIElement, UIElementProps } from '@/core/UIElement'
import { computed } from 'vue'
import DragArea from '../widget/common/drag-area.vue'
import { current } from '@/core/root'
import Draggable from '../widget/common/draggable.vue'

export default {
  name: 'render',
  components: {
    ...widgets,
    Draggable,
    DragArea
  },
  props: {
    el: Object
  },
  setup(props: { el: UIElement }) {
    const el = props.el

    function getPx(attr: keyof UIElementProps) {
      const v = el.props[attr].toString() as string
      return v.match(/^\d+$/) ? v + 'px' : v
    }

    const style = computed(() => ({
      ...(el.widget?.style || {}),
      width: getPx('w'),
      height: el.root ? '100%' : getPx('h'),
      paddingLeft: getPx('pl'),
      paddingRight: getPx('pr'),
      paddingTop: getPx('pt'),
      paddingBottom: getPx('pb'),
      marginLeft: getPx('pl'),
      marginRight: getPx('pr'),
      marginTop: getPx('pt'),
      marginBottom: getPx('pb'),
      display: el.props.display,
    }))

    function onSelect(e: MouseEvent) {
      e.stopPropagation()
      current.value = el
    }

    function renderWidget() {
      const node = widgets[el.component]
      return <node
        onClick={onSelect}
        class={[!el.root && el.widget.area ? '_layout' : '_box', !el.root && current.value.id === el.id ? '_active' : '']}
        style={style.value}
        {...el.props}
        {...el.on}
      >
        {el.children.map(e => <render el={e} key={e.id} />)}
      </node>
    }

    function renderLayout() {
      return <DragArea el={el} style={style.value}>
        {renderWidget()}
      </DragArea>
    }

    return () => el?.root
      ? renderLayout()
      : <Draggable widgetDesc={el.widget} el={el}>
        {el.widget.area ? renderLayout() : renderWidget()}
      </Draggable>
  }
}
</script>

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

.layout:hover,
._active {
  @include dash-line(#10b981);
}
</style>