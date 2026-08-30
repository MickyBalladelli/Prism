import { component, computed, html } from '@mickyballadelli/matrix'
import { createLayoutStyle } from './layout-style.js'
import { readReactiveValue } from '../reactive.js'

const baseClassName = 'prism-footer'
const readValue = readReactiveValue

export function Footer(props = {}) {
  const {
    ariaLabel = 'Site footer',
    children = [],
    class: classValue = '',
    id,
    leading,
    role,
    style,
    trailing
  } = props

  const classNames = computed(() => [baseClassName, readValue(classValue, '')].filter(Boolean).join(' '))
  const styleValue = createLayoutStyle({ style })
  const leadingValue = computed(() => {
    const value = readValue(leading)
    return typeof value === 'boolean' ? null : value
  })
  const trailingValue = computed(() => {
    const value = readValue(trailing)
    return typeof value === 'boolean' ? null : value
  })
  const childrenValue = computed(() => {
    const value = readValue(children)
    return typeof value === 'boolean' ? null : value
  })
  const hasSplitContent = leading !== undefined || trailing !== undefined
  const content = hasSplitContent
    ? html`
        <div class="${baseClassName}-start">${leadingValue}</div>
        <div class="${baseClassName}-end">${trailingValue}</div>
      `
    : childrenValue

  return html`
    <footer class="${classNames}" id="${id}" role="${role}" style="${styleValue}" aria-label="${ariaLabel}">
      <div class="${baseClassName}-inner">${content}</div>
    </footer>
  `
}

export const FooterComponent = props => component(Footer, props)
