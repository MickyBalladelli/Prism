import { component, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

export function Stack(props = {}) {
  const {
    align,
    children,
    class: classValue = '',
    direction = 'column',
    gap = 'medium',
    justify,
    style,
    wrap = false
  } = props

  return html`
    <div class="prism-stack prism-stack-${readReactiveValue(direction, 'column')} prism-stack-gap-${readReactiveValue(gap, 'medium')} ${wrap ? 'prism-stack-wrap' : ''} ${classValue}" style="${style ?? ''};${align ? `align-items:${align};` : ''}${justify ? `justify-content:${justify};` : ''}">${children}</div>
  `
}

export const StackComponent = props => component(Stack, props)
