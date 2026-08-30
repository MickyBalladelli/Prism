import { component, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

export function Spinner(props = {}) {
  const {
    ariaLabel = 'Loading',
    class: classValue = '',
    size = 'medium',
    tone = 'accent'
  } = props

  return html`
    <span class="prism-spinner prism-spinner-${readReactiveValue(size, 'medium')} prism-spinner-${readReactiveValue(tone, 'accent')} ${classValue}" role="status" aria-label="${ariaLabel}">
      <span class="prism-spinner-ring" aria-hidden="true"></span>
    </span>
  `
}

export const SpinnerComponent = props => component(Spinner, props)
