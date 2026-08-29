import { component, html } from 'matrix'
import { createLayoutStyle } from './layout-style.js'

export function Box(props = {}) {
  const {
    children = [],
    class: classValue = '',
    id,
    role,
    style,
    sticky,
    stickyTop
  } = props

  const shouldRenderStyle = style !== undefined || sticky !== undefined || stickyTop !== undefined
  const styleValue = shouldRenderStyle
    ? createLayoutStyle({ style, sticky, stickyTop })
    : undefined

  if (id === undefined && role === undefined && !shouldRenderStyle) {
    return html`<div class="${classValue}">${children}</div>`
  }

  if (role === undefined && !shouldRenderStyle) {
    return html`<div class="${classValue}" id="${id}">${children}</div>`
  }

  if (!shouldRenderStyle) {
    return html`<div class="${classValue}" id="${id}" role="${role}">${children}</div>`
  }

  if (id === undefined && role === undefined) {
    return html`<div class="${classValue}" style="${styleValue}">${children}</div>`
  }

  if (role === undefined) {
    return html`<div class="${classValue}" id="${id}" style="${styleValue}">${children}</div>`
  }

  if (id === undefined) {
    return html`<div class="${classValue}" role="${role}" style="${styleValue}">${children}</div>`
  }

  return html`<div class="${classValue}" id="${id}" role="${role}" style="${styleValue}">${children}</div>`
}

export const BoxComponent = props => component(Box, props)
