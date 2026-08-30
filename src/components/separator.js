import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

export function Separator(props = {}) {
  const {
    class: classValue = '',
    decorative = true,
    label,
    orientation = 'horizontal'
  } = props

  const orientationValue = computed(() => readReactiveValue(orientation, 'horizontal'))
  const labelValue = computed(() => readReactiveValue(label))
  const decorativeValue = computed(() => Boolean(readReactiveValue(decorative, true)))

  return html`
    <div
      class="prism-separator prism-separator-${orientationValue.value} ${classValue}"
      role="${decorativeValue.value ? '' : 'separator'}"
      aria-orientation="${decorativeValue.value ? '' : orientationValue.value}"
    >${labelValue.value ? html`<span>${labelValue.value}</span>` : ''}</div>
  `
}

export const SeparatorComponent = props => component(Separator, props)
