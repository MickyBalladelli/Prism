import { component, html } from 'matrix'
import { TreeBranchIcon } from './icons.js'

const baseClassName = 'prism-pulse'

export function Pulse(props = {}) {
  const {
    status = 'info',
    size = 'medium',
    class: classValue = '',
    ariaLabel,
    children = []
  } = props

  const statusValue = status?.kind === 'signal' || status?.kind === 'computed'
    ? status
    : status || 'info'

  const sizeValue = size?.kind === 'signal' || size?.kind === 'computed'
    ? size
    : size || 'medium'

  return html`<span class="${baseClassName} ${baseClassName}-${statusValue} ${baseClassName}-${sizeValue} ${classValue}" role="${ariaLabel ? 'img' : undefined}" aria-label="${ariaLabel}"><span class="${baseClassName}-mark">${TreeBranchIcon({ class: `${baseClassName}-icon` })}</span>${children}</span>`
}

export const PulseComponent = props => component(Pulse, props)
