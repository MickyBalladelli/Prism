import { component, computed, html } from '@mickyballadelli/matrix'
import { CloseIcon } from './icons.js'
import { readReactiveValue } from '../reactive.js'

export function Tag(props = {}) {
  const {
    children,
    class: classValue = '',
    dismissible,
    icon,
    label,
    onDismiss,
    onRemove,
    removable = false,
    tone = 'neutral'
  } = props

  const labelValue = computed(() => readReactiveValue(label ?? children))
  const toneValue = computed(() => readReactiveValue(tone, 'neutral'))
  const iconValue = computed(() => readReactiveValue(icon))
  const dismissibleValue = computed(() => dismissible === undefined
    ? Boolean(readReactiveValue(removable, false))
    : Boolean(readReactiveValue(dismissible, false)))
  const dismissHandler = onDismiss ?? onRemove
  const iconMarkup = computed(() => iconValue.value === undefined || iconValue.value === null || iconValue.value === false
    ? null
    : html`<span class="prism-tag-icon" aria-hidden="true">${iconValue}</span>`)
  const dismissMarkup = computed(() => dismissibleValue.value
    ? html`<button class="prism-tag-remove" type="button" aria-label="Remove ${labelValue ?? 'tag'}" @click=${dismissHandler}>${CloseIcon({ size: 12 })}</button>`
    : null)

  return html`
    <span class="prism-tag prism-tag-${toneValue} ${classValue}">
      ${iconMarkup}
      <span>${labelValue}</span>
      ${dismissMarkup}
    </span>
  `
}

export const TagComponent = props => component(Tag, props)
