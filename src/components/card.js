import { component, html } from '@mickyballadelli/matrix'
import { createLayoutStyle } from './layout-style.js'

export function Card(props = {}) {
  const {
    children = [],
    class: classValue = '',
    id,
    role,
    style,
    sticky,
    stickyTop,
    actions = null
  } = props

  const actionArea = actions
    ? html`<footer class="card-actions">${actions}</footer>`
    : null
  const shouldRenderStyle = style !== undefined || sticky !== undefined || stickyTop !== undefined
  const styleValue = shouldRenderStyle
    ? createLayoutStyle({ style, sticky, stickyTop })
    : undefined

  if (!shouldRenderStyle) {
    return html`<article class="${classValue}" id="${id}" role="${role}">${children}${actionArea}</article>`
  }

  return html`<article class="${classValue}" id="${id}" role="${role}" style="${styleValue}">${children}${actionArea}</article>`
}

export const CardComponent = props => component(Card, props)
