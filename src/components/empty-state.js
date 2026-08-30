import { component, computed, html } from '@mickyballadelli/matrix'
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

  const statusValue = computed(() => readReactiveValue(status, 'empty'))
  const titleValue = computed(() => readReactiveValue(title, 'Nothing here yet'))
  const descriptionValue = computed(() => readReactiveValue(description ?? children))
  const actionValue = computed(() => typeof action === 'function' ? action() : action)
  const retry = onRetry ? html`<button class="prism-button prism-button-secondary" type="button" @click=${onRetry}>${retryLabel}</button>` : ''

  return html`
    <section class="prism-empty-state prism-empty-state-${statusValue.value} ${classValue}" role="status">
      ${icon ? html`<div class="prism-empty-state-icon" aria-hidden="true">${icon}</div>` : ''}
      <h3>${titleValue.value}</h3>
      ${descriptionValue.value ? html`<p>${descriptionValue.value}</p>` : ''}
      ${(actionValue.value || retry) ? html`<div class="prism-empty-state-actions">${actionValue.value}${retry}</div>` : ''}
    </section>
  `
}

export const EmptyStateComponent = props => component(EmptyState, props)
