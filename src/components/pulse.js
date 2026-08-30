import { component, html } from '@mickyballadelli/matrix'
import { isReactiveValue } from '../reactive.js'

const baseClassName = 'prism-pulse'

export function Pulse(props = {}) {
  const {
    status = 'info',
    size = 'medium',
    animation = 'continuous',
    class: classValue = '',
    ariaLabel,
    children = []
  } = props

  const statusValue = isReactiveValue(status)
    ? status
    : status || 'info'

  const sizeValue = isReactiveValue(size)
    ? size
    : size || 'medium'

  const animationValue = isReactiveValue(animation)
    ? animation
    : animation || 'continuous'

  return html`<span class="${baseClassName} ${baseClassName}-${statusValue} ${baseClassName}-${sizeValue} ${baseClassName}-${animationValue} ${classValue}" role="${ariaLabel ? 'img' : undefined}" aria-label="${ariaLabel}"><span class="${baseClassName}-mark"><span class="${baseClassName}-core"></span></span><span class="${baseClassName}-label">${children}</span></span>`
}

export const PulseComponent = props => component(Pulse, props)
