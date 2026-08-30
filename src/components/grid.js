import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

export function Grid(props = {}) {
  const {
    children,
    class: classValue = '',
    columns,
    gap = 'medium',
    minColumnWidth = '12rem',
    style
  } = props

  const columnsValue = computed(() => readReactiveValue(columns, 'auto-fit'))
  const gapValue = computed(() => readReactiveValue(gap, 'medium'))
  const minColumnWidthValue = computed(() => readReactiveValue(minColumnWidth, '12rem'))

  return html`
    <div class="prism-grid prism-grid-gap-${gapValue.value} ${classValue}" style="--prism-grid-columns:${columnsValue.value};--prism-grid-min-column-width:${minColumnWidthValue.value};${style ?? ''}">${children}</div>
  `
}

export const GridComponent = props => component(Grid, props)
