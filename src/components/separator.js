import { component, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

export function Separator(props = {}) {
  const {
    class: classValue = '',
    decorative = true,
    label,
    orientation = 'horizontal'
  } = props

  const orientationValue = readReactiveValue(orientation, 'horizontal')
  const labelValue = readReactiveValue(label)
  const decorativeValue = Boolean(readReactiveValue(decorative, true))

  return html`
    <div
      class="prism-separator prism-separator-${orientationValue} ${classValue}"
      role="${decorativeValue ? '' : 'separator'}"
      aria-orientation="${decorativeValue ? '' : orientationValue}"
    >${labelValue ? html`<span>${labelValue}</span>` : ''}</div>
  `
}

export const SeparatorComponent = props => component(Separator, props)
