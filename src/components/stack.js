import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

const alignValues = new Set(['left', 'center', 'right'])
const alignCssValues = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
}

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
  const wrapClass = computed(() => wrapValue.value ? 'prism-stack-wrap' : '')
  const alignValue = computed(() => {
    const value = readReactiveValue(align)
    return alignValues.has(value) ? value : undefined
  })
  const alignStyle = computed(() => {
    const value = alignCssValues[alignValue.value]
    if (!value) {
      return ''
    }

    return directionValue.value === 'row'
      ? `justify-content:${value};`
      : `align-items:${value};`
  })
  const justifyValue = computed(() => readReactiveValue(justify))
  const justifyStyle = computed(() => justifyValue.value ? `justify-content:${justifyValue.value};` : '')
  const styleValue = computed(() => `${readReactiveValue(style, '') ?? ''};${alignStyle.value}${justifyStyle.value}`)

  return html`
    <div class="prism-stack prism-stack-${directionValue} prism-stack-gap-${gapValue} ${wrapClass} ${classValue}" style="${styleValue}">${children}</div>
  `
}

export const StackComponent = props => component(Stack, props)
