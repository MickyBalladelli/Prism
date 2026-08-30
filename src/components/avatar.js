import { component, html } from '@mickyballadelli/matrix'
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

  const nameValue = readReactiveValue(name, 'User')
  const srcValue = readReactiveValue(src)
  const statusValue = readReactiveValue(status)

  return html`
    <span class="prism-avatar prism-avatar-${size} prism-avatar-${variant} ${classValue}" aria-label="${nameValue}">
      ${srcValue ? html`<img src="${srcValue}" alt="${alt ?? nameValue}" loading="lazy">` : html`<span aria-hidden="true">${initialsFor(nameValue)}</span>`}
      ${statusValue ? html`<span class="prism-avatar-status prism-avatar-status-${statusValue}" aria-label="${statusValue}"></span>` : ''}
    </span>
  `
}

export const AvatarComponent = props => component(Avatar, props)
