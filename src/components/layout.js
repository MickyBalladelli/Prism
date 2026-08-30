import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

const baseClassName = 'prism-layout'
const readValue = readReactiveValue

function isEmptySlot(value) {
  return value === undefined || value === null || typeof value === 'boolean'
}

function slotMarkup(value, className) {
  const nextValue = readValue(value)
  return isEmptySlot(nextValue)
    ? null
    : html`<div class="${className}">${nextValue}</div>`
}

export function Layout(props = {}) {
  const {
    children = [],
    class: classValue = '',
    contentClass = '',
    footer,
    footerClass = '',
    header,
    headerClass = '',
    id,
    navigator,
    navigatorClass = '',
    role,
    bodyClass = ''
  } = props

  const classNames = computed(() => [baseClassName, readValue(classValue, '')].filter(Boolean).join(' '))
  const contentMarkup = computed(() => {
    const content = readValue(children)
    return isEmptySlot(content) ? null : content
  })
  const headerMarkup = computed(() => slotMarkup(header, `prism-layout-header ${readValue(headerClass, '')}`))
  const navigatorMarkup = computed(() => slotMarkup(navigator, `prism-layout-navigator ${readValue(navigatorClass, '')}`))
  const footerMarkup = computed(() => slotMarkup(footer, `prism-layout-footer ${readValue(footerClass, '')}`))

  return html`
    <div class="${classNames}" id="${id}" role="${role}">
      ${headerMarkup}
      <div class="prism-layout-body ${readValue(bodyClass, '')}">
        ${navigatorMarkup}
        <div class="prism-layout-content ${readValue(contentClass, '')}">${contentMarkup}</div>
      </div>
      ${footerMarkup}
    </div>
  `
}

export const LayoutComponent = props => component(Layout, props)
