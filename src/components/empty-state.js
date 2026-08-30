import { component, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

export function EmptyState(props = {}) {
  const {
    action,
    children,
    class: classValue = '',
    description,
    icon,
    onRetry,
    retryLabel = 'Try again',
    status = 'empty',
    title = 'Nothing here yet'
  } = props

  const statusValue = readReactiveValue(status, 'empty')
  const descriptionValue = description ?? children
  const actionValue = typeof action === 'function' ? action() : action
  const retry = onRetry ? html`<button class="prism-button prism-button-secondary" type="button" @click=${onRetry}>${retryLabel}</button>` : ''

  return html`
    <section class="prism-empty-state prism-empty-state-${statusValue} ${classValue}" role="status">
      ${icon ? html`<div class="prism-empty-state-icon" aria-hidden="true">${icon}</div>` : ''}
      <h3>${title}</h3>
      ${descriptionValue ? html`<p>${descriptionValue}</p>` : ''}
      ${(actionValue || retry) ? html`<div class="prism-empty-state-actions">${actionValue}${retry}</div>` : ''}
    </section>
  `
}

export const EmptyStateComponent = props => component(EmptyState, props)
