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
  const columnCount = computed(() => {
    const value = Number(columnsValue.value)
    return Number.isInteger(value) && value > 0 ? value : null
  })
  const gridTemplateValue = computed(() => {
    if (!columnCount.value) {
      return 'repeat(auto-fit, minmax(min(var(--prism-grid-min-column-width), 100%), 1fr))'
    }

    return `repeat(auto-fit, minmax(min(100%, max(var(--prism-grid-min-column-width), calc((100% - (var(--prism-grid-gap) * ${columnCount.value - 1})) / ${columnCount.value}))), 1fr))`
  })

  return html`
    <div class="prism-grid prism-grid-gap-${gapValue} ${classValue}" style="--prism-grid-columns:${columnsValue};--prism-grid-min-column-width:${minColumnWidthValue};grid-template-columns:${gridTemplateValue};${style ?? ''}">${children}</div>
  `
}

export const GridComponent = props => component(Grid, props)
