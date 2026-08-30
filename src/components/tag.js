import { component, html } from '@mickyballadelli/matrix'
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

  const labelValue = label ?? children

  return html`
    <span class="prism-tag prism-tag-${readReactiveValue(tone, 'neutral')} ${classValue}">
      <span>${labelValue}</span>
      ${removable ? html`<button class="prism-tag-remove" type="button" aria-label="Remove ${labelValue ?? 'tag'}" @click=${onRemove}>${CloseIcon({ size: 12 })}</button>` : ''}
    </span>
  `
}

export const TagComponent = props => component(Tag, props)
