import { component, html } from 'matrix'

const baseClassName = 'prism-button'

export function Button(props = {}) {
  const {
    children = [],
    class: classValue = '',
    id,
    type = 'button',
    name,
    value,
    variant = 'primary',
    disabled = false,
    onClick,
    onFocus,
    onBlur
  } = props

  const variantValue = variant?.kind === 'signal' || variant?.kind === 'computed'
    ? variant
    : variant || 'primary'

  return html`<button type="${type}" class="${baseClassName} ${baseClassName}-${variantValue} ${classValue}" id="${id}" name="${name}" value="${value}" ?disabled=${disabled} @click=${onClick} @focus=${onFocus} @blur=${onBlur}>${children}</button>`
}

export const ButtonComponent = props => component(Button, props)
