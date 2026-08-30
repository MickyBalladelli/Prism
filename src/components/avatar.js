import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

const statusSizes = new Set(['small', 'medium', 'large'])

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
    statusSize = 'large',
    showStatus = true,
    variant = 'circle'
  } = props

  const nameValue = computed(() => readReactiveValue(name, 'User'))
  const srcValue = computed(() => readReactiveValue(src))
  const statusValue = computed(() => readReactiveValue(status))
  const sizeValue = computed(() => readReactiveValue(size, 'medium'))
  const variantValue = computed(() => readReactiveValue(variant, 'circle'))
  const statusSizeValue = computed(() => {
    const value = String(readReactiveValue(statusSize, 'large'))
    return statusSizes.has(value) ? value : 'large'
  })
  const showStatusValue = computed(() => Boolean(readReactiveValue(showStatus, true)))
  const altValue = computed(() => readReactiveValue(alt))
  const avatarMarkup = computed(() => srcValue.value
    ? html`<img src="${srcValue}" alt="${altValue.value ?? nameValue.value}" loading="lazy">`
    : html`<span aria-hidden="true">${initialsFor(nameValue.value)}</span>`)
  const statusMarkup = computed(() => showStatusValue.value && statusValue.value
    ? html`<span class="prism-avatar-status prism-avatar-status-${statusValue} prism-avatar-status-size-${statusSizeValue}" aria-label="${statusValue}"></span>`
    : null)

  return html`
    <span class="prism-avatar prism-avatar-${sizeValue} prism-avatar-${variantValue} ${classValue}" aria-label="${nameValue}">
      ${avatarMarkup}
      ${statusMarkup}
    </span>
  `
}

export const AvatarComponent = props => component(Avatar, props)
