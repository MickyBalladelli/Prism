import { component, computed, html } from '@mickyballadelli/matrix'
import { createLayoutStyle } from './layout-style.js'
import { readReactiveValue } from '../reactive.js'

const baseClassName = 'prism-navigator'
const readValue = readReactiveValue

function isEmptySlot(value) {
  return value === undefined || value === null || typeof value === 'boolean'
}

export function Navigator(props = {}) {
  const {
    ariaLabel = 'Primary navigation',
    children = [],
    class: classValue = '',
    description,
    footer,
    id,
    role,
    sticky = false,
    stickyTop = '0px',
    style,
    title
  } = props

  const classNames = computed(() => [
    baseClassName,
    readValue(sticky, false) ? `${baseClassName}-sticky` : '',
    readValue(classValue, '')
  ].filter(Boolean).join(' '))
  const styleValue = createLayoutStyle({ style, sticky, stickyTop })
  const bodyMarkup = computed(() => {
    const body = readValue(children)
    return isEmptySlot(body) ? null : body
  })
  const headingMarkup = computed(() => {
    const titleValue = readValue(title)
    const descriptionValue = readValue(description)
    if (isEmptySlot(titleValue) && isEmptySlot(descriptionValue)) return null

    return html`
      <header class="${baseClassName}-header">
        ${isEmptySlot(titleValue) ? null : html`<strong class="${baseClassName}-title">${titleValue}</strong>`}
        ${isEmptySlot(descriptionValue) ? null : html`<span class="${baseClassName}-description">${descriptionValue}</span>`}
      </header>
    `
  })
  const footerMarkup = computed(() => {
    const footerValue = readValue(footer)
    return isEmptySlot(footerValue)
      ? null
      : html`<div class="${baseClassName}-footer">${footerValue}</div>`
  })

  return html`
    <nav class="${classNames}" id="${id}" role="${role}" style="${styleValue}" aria-label="${ariaLabel}">
      ${headingMarkup}
      <div class="${baseClassName}-body">${bodyMarkup}</div>
      ${footerMarkup}
    </nav>
  `
}

export const NavigatorComponent = props => component(Navigator, props)
