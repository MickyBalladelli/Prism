import { component, computed, html } from '@mickyballadelli/matrix'
import { CloseIcon } from './icons.js'
import { readReactiveValue } from '../reactive.js'

export function Tag(props = {}) {
  const {
    children,
    class: classValue = '',
    label,
    onRemove,
    removable = false,
    tone = 'neutral'
  } = props

  const labelValue = computed(() => readReactiveValue(label ?? children))
  const toneValue = computed(() => readReactiveValue(tone, 'neutral'))

  return html`
    <span class="prism-tag prism-tag-${toneValue.value} ${classValue}">
      <span>${labelValue.value}</span>
      ${removable ? html`<button class="prism-tag-remove" type="button" aria-label="Remove ${labelValue.value ?? 'tag'}" @click=${onRemove}>${CloseIcon({ size: 12 })}</button>` : ''}
    </span>
  `
}

export const TagComponent = props => component(Tag, props)
