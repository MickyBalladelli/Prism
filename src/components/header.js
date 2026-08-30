import { component, computed, html } from '@mickyballadelli/matrix'
import { createLayoutStyle } from './layout-style.js'
import { readReactiveValue } from '../reactive.js'

const baseClassName = 'prism-header'
const readValue = readReactiveValue

export function Header(props = {}) {
  const {
    children = [],
    trailing = null,
    class: classValue = '',
    id,
    role,
    style,
    sticky = true,
    stickyTop = '0px',
    ariaLabel = 'Site header'
  } = props

  const classNames = computed(() => [
    baseClassName,
    readValue(sticky, true) ? `${baseClassName}-sticky` : '',
    classValue
  ].filter(Boolean).join(' '))

  const styleValue = createLayoutStyle({ style, sticky, stickyTop })
  const trailingMarkup = computed(() => {
    const end = readValue(trailing, null)
    return end === undefined || end === null
      ? null
      : html`<div class="${baseClassName}-end">${end}</div>`
  })

  return html`
    <header class="${classNames}" id="${id}" role="${role}" style="${styleValue}" aria-label="${ariaLabel}">
      <div class="${baseClassName}-bar">
        <div class="${baseClassName}-start">${children}</div>
        ${trailingMarkup}
      </div>
    </header>
  `
}

export const HeaderComponent = props => component(Header, props)
