import { component, computed, html } from '@mickyballadelli/matrix'
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

  const directionValue = computed(() => readReactiveValue(direction, 'column'))
  const gapValue = computed(() => readReactiveValue(gap, 'medium'))
  const wrapValue = computed(() => Boolean(readReactiveValue(wrap, false)))

  return html`
    <div class="prism-stack prism-stack-${directionValue.value} prism-stack-gap-${gapValue.value} ${wrapValue.value ? 'prism-stack-wrap' : ''} ${classValue}" style="${style ?? ''};${align ? `align-items:${align};` : ''}${justify ? `justify-content:${justify};` : ''}">${children}</div>
  `
}

export const StackComponent = props => component(Stack, props)
