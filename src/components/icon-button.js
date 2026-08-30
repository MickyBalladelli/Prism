import { component, html } from '@mickyballadelli/matrix'
import { Button } from './button.js'

export function IconButton(props = {}) {
  const {
    ariaLabel,
    children,
    icon,
    label,
    title,
    ...buttonProps
  } = props

  return Button({
    ...buttonProps,
    ariaLabel: ariaLabel ?? title ?? label ?? 'Icon button',
    label: label ?? children,
    title,
    icon,
    showLabel: false
  })
}

export const IconButtonComponent = props => component(IconButton, props)
