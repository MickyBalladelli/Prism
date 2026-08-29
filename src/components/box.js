import { component, html } from 'matrix'

export function Box(props = {}) {
  const {
    children = [],
    class: classValue = '',
    id,
    role,
    style
  } = props

  if (id === undefined && role === undefined && style === undefined) {
    return html`<div class="${classValue}">${children}</div>`
  }

  if (role === undefined && style === undefined) {
    return html`<div class="${classValue}" id="${id}">${children}</div>`
  }

  if (style === undefined) {
    return html`<div class="${classValue}" id="${id}" role="${role}">${children}</div>`
  }

  if (role === undefined) {
    return html`<div class="${classValue}" id="${id}" style="${style}">${children}</div>`
  }

  return html`<div class="${classValue}" id="${id}" role="${role}" style="${style}">${children}</div>`
}

export const BoxComponent = props => component(Box, props)
