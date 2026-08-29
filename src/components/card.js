import { component, html } from 'matrix'

export function Card(props = {}) {
  const {
    children = [],
    class: classValue = '',
    id,
    role,
    style,
    actions = null
  } = props

  const actionArea = actions
    ? html`<footer class="card-actions">${actions}</footer>`
    : null

  return html`<article class="${classValue}" id="${id}" role="${role}" style="${style}">${children}${actionArea}</article>`
}

export const CardComponent = props => component(Card, props)
