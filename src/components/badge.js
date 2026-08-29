import { component, computed, html } from 'matrix'

const baseClassName = 'prism-badge'

const isReactiveValue = value => value?.kind === 'signal' || value?.kind === 'computed'

export function Badge(props = {}) {
  const {
    value,
    children = [],
    tone = 'neutral',
    size = 'medium',
    pulseOnChange = false,
    class: classValue = '',
    ariaLabel
  } = props

  const content = value === undefined ? children : value
  const toneValue = isReactiveValue(tone) ? tone : tone || 'neutral'
  const sizeValue = isReactiveValue(size) ? size : size || 'medium'

  const createBadge = shouldPulse => html`<span class="${baseClassName} ${baseClassName}-${toneValue} ${baseClassName}-${sizeValue} ${shouldPulse ? `${baseClassName}-pulse` : ''} ${classValue}" role="${ariaLabel ? 'img' : undefined}" aria-label="${ariaLabel}">${content}</span>`

  if (!pulseOnChange || !isReactiveValue(content)) {
    return createBadge(false)
  }

  let previousValue
  let initialized = false

  return computed(() => {
    const nextValue = content.value
    const shouldPulse = initialized && !Object.is(nextValue, previousValue)
    previousValue = nextValue
    initialized = true
    return createBadge(shouldPulse)
  })
}

export const BadgeComponent = props => component(Badge, props)
