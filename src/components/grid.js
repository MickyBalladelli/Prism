import { component, html } from '@mickyballadelli/matrix'
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

  return html`
    <div class="prism-grid prism-grid-gap-${readReactiveValue(gap, 'medium')} ${classValue}" style="--prism-grid-columns:${columns ?? 'auto-fit'};--prism-grid-min-column-width:${minColumnWidth};${style ?? ''}">${children}</div>
  `
}

export const GridComponent = props => component(Grid, props)
