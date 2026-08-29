import { component, computed, html, signal } from 'matrix'
import { CloseIcon } from './icons.js'

const baseClassName = 'prism-popup'
const reactiveKinds = new Set(['signal', 'computed'])
const sizes = new Set(['small', 'medium', 'large', 'full'])
const placements = new Set(['center', 'top', 'bottom'])
let popupId = 0

const isReactive = value => reactiveKinds.has(value?.kind)
const readValue = (value, fallback) => isReactive(value)
  ? value.value
  : value === undefined || value === null ? fallback : value

export function Popup(props = {}) {
  const {
    open = false,
    title,
    eyebrow,
    children,
    footer,
    size = 'medium',
    placement = 'center',
    showClose = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    restoreFocus = true,
    class: classValue = '',
    id,
    ariaLabel,
    ariaDescription,
    onClose
  } = props

  const openValue = open?.kind === 'signal' ? open : signal(Boolean(readValue(open, false)))
  const instanceId = id ?? `prism-popup-${popupId += 1}`
  const titleId = `${instanceId}-title`
  const descriptionId = `${instanceId}-description`
  let returnFocusTarget
  let wasOpen = false

  const close = (reason = 'programmatic', event) => {
    const focusTarget = returnFocusTarget
    openValue.value = false
    onClose?.(reason, event)

    if (readValue(restoreFocus, true) && focusTarget?.focus) {
      requestAnimationFrame(() => focusTarget.focus())
    }
  }

  const handleKeydown = event => {
    if (event.key === 'Escape' && readValue(closeOnEscape, true)) {
      event.preventDefault()
      close('escape', event)
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const focusable = [...event.currentTarget.querySelectorAll(
      'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
    )].filter(element => !element.hidden)

    if (focusable.length === 0) {
      event.preventDefault()
      event.currentTarget.querySelector(`.${baseClassName}-panel`)?.focus()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const renderSlot = slot => typeof slot === 'function' ? slot({ close }) : slot

  return computed(() => {
    if (!openValue.value) {
      wasOpen = false
      return null
    }

    if (!wasOpen) {
      returnFocusTarget = typeof document === 'undefined' ? undefined : document.activeElement
      wasOpen = true
    }

    const currentSize = sizes.has(readValue(size)) ? readValue(size) : 'medium'
    const currentPlacement = placements.has(readValue(placement)) ? readValue(placement) : 'center'
    const hasHeader = title !== undefined || eyebrow !== undefined || readValue(showClose, true)
    const panelClass = [
      `${baseClassName}-panel`,
      `${baseClassName}-${currentSize}`,
      classValue
    ].filter(Boolean).join(' ')

    return html`
      <div class="${baseClassName}-layer ${baseClassName}-placement-${currentPlacement}" @keydown=${handleKeydown}>
        <span class="${baseClassName}-backdrop" aria-hidden="true" @click=${event => {
          if (readValue(closeOnBackdrop, true)) {
            close('backdrop', event)
          }
        }}></span>
        <section
          class="${panelClass}"
          id="${instanceId}"
          role="dialog"
          aria-modal="true"
          aria-label="${title === undefined ? ariaLabel : undefined}"
          aria-labelledby="${title === undefined ? undefined : titleId}"
          aria-describedby="${ariaDescription === undefined ? undefined : descriptionId}"
          tabindex="-1"
          ?autofocus=${!readValue(showClose, true)}
        >
          ${hasHeader ? html`
            <header class="${baseClassName}-header">
              <div class="${baseClassName}-heading">
                ${eyebrow === undefined ? null : html`<span class="${baseClassName}-eyebrow">${eyebrow}</span>`}
                ${title === undefined ? null : html`<strong class="${baseClassName}-title" id="${titleId}">${title}</strong>`}
                ${ariaDescription === undefined ? null : html`<span class="${baseClassName}-description" id="${descriptionId}">${ariaDescription}</span>`}
              </div>
              ${readValue(showClose, true) ? html`<button type="button" class="${baseClassName}-close" aria-label="Close popup" autofocus @click=${event => close('close-button', event)}>${CloseIcon({ size: '1em' })}</button>` : null}
            </header>
          ` : null}
          <div class="${baseClassName}-body">${renderSlot(children)}</div>
          ${footer === undefined || footer === null ? null : html`<footer class="${baseClassName}-footer">${renderSlot(footer)}</footer>`}
        </section>
      </div>
    `
  })
}

export const PopupComponent = props => component(Popup, props)
