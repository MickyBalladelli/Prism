import { component, computed, html } from '@mickyballadelli/matrix'
import { CloseIcon } from './icons.js'
import { readReactiveValue } from '../reactive.js'

let alertId = 0

const alertTones = new Set(['success', 'info', 'warning', 'error'])

export function Alert(props = {}) {
  const {
    ariaLabel,
    children,
    class: classValue = '',
    dismissible = false,
    id,
    onDismiss,
    role,
    title,
    tone = 'info'
  } = props

  const toneValue = computed(() => {
    const value = readReactiveValue(tone, 'info')
    return alertTones.has(value) ? value : 'info'
  })
  const titleValue = computed(() => readReactiveValue(title))
  const description = children ?? props.description
  const titleId = `${id ?? `prism-alert-${++alertId}`}-title`
  const descriptionId = `${id ?? `prism-alert-${alertId}`}-description`
  const roleValue = role ?? (toneValue.value === 'error' || toneValue.value === 'warning' ? 'alert' : 'status')
  const hasTitle = titleValue.value !== undefined && titleValue.value !== null && titleValue.value !== ''
  const hasDescription = description !== undefined && description !== null && description !== ''

  return html`
    <div
      class="prism-alert prism-alert-${toneValue.value} ${classValue}"
      id="${id ?? ''}"
      role="${roleValue}"
      aria-label="${ariaLabel}"
      aria-labelledby="${hasTitle ? titleId : undefined}"
      aria-describedby="${hasDescription ? descriptionId : undefined}"
    >
      <span class="prism-alert-icon" aria-hidden="true">${toneValue.value === 'success' ? '✓' : toneValue.value === 'error' ? '!' : toneValue.value === 'warning' ? '!' : 'i'}</span>
      <div class="prism-alert-body">
        ${hasTitle ? html`<div class="prism-alert-title" id="${titleId}">${titleValue.value}</div>` : ''}
        ${hasDescription ? html`<div class="prism-alert-description" id="${descriptionId}">${description}</div>` : ''}
      </div>
      ${dismissible ? html`
        <button class="prism-alert-dismiss" type="button" aria-label="Dismiss" @click=${onDismiss}>
          ${CloseIcon({ size: 16 })}
        </button>
      ` : ''}
    </div>
  `
}

export const Notice = Alert
export const AlertComponent = props => component(Alert, props)
export const NoticeComponent = AlertComponent
