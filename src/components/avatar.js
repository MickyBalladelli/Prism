import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

const initialsFor = name => String(name ?? '?')
  .trim()
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(part => part[0])
  .join('')
  .toUpperCase() || '?'

export function Avatar(props = {}) {
  const {
    alt,
    class: classValue = '',
    name,
    size = 'medium',
    src,
    status,
    variant = 'circle'
  } = props

  const nameValue = computed(() => readReactiveValue(name, 'User'))
  const srcValue = computed(() => readReactiveValue(src))
  const statusValue = computed(() => readReactiveValue(status))
  const sizeValue = computed(() => readReactiveValue(size, 'medium'))
  const variantValue = computed(() => readReactiveValue(variant, 'circle'))

  return html`
    <span class="prism-avatar prism-avatar-${sizeValue.value} prism-avatar-${variantValue.value} ${classValue}" aria-label="${nameValue.value}">
      ${srcValue.value ? html`<img src="${srcValue.value}" alt="${alt ?? nameValue.value}" loading="lazy">` : html`<span aria-hidden="true">${initialsFor(nameValue.value)}</span>`}
      ${statusValue.value ? html`<span class="prism-avatar-status prism-avatar-status-${statusValue.value}" aria-label="${statusValue.value}"></span>` : ''}
    </span>
  `
}

export const AvatarComponent = props => component(Avatar, props)
