import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

export function Spinner(props = {}) {
  const {
    ariaLabel = 'Loading',
    class: classValue = '',
    size = 'medium',
    tone = 'accent'
  } = props

  const sizeValue = computed(() => readReactiveValue(size, 'medium'))
  const toneValue = computed(() => readReactiveValue(tone, 'accent'))
  const labelValue = computed(() => readReactiveValue(ariaLabel, 'Loading'))

  return html`
    <span class="prism-spinner prism-spinner-${sizeValue.value} prism-spinner-${toneValue.value} ${classValue}" role="status" aria-label="${labelValue.value}">
      <span class="prism-spinner-ring" aria-hidden="true"></span>
    </span>
  `
}

export const SpinnerComponent = props => component(Spinner, props)
