import { component, computed, effect, html, onMount, signal } from '@mickyballadelli/matrix'
import { CloseIcon } from './icons.js'
import { isWritableSignal, readReactiveValue } from '../reactive.js'

const baseClassName = 'prism-popup'
const sizes = new Set(['small', 'medium', 'large', 'full'])
const placements = new Set(['center', 'top', 'bottom'])
let popupId = 0
let bodyScrollLockCount = 0
let previousBodyOverflow = ''

const readValue = readReactiveValue

function lockBodyScroll() {
  if (typeof document === 'undefined' || !document.body) {
    return
  }

  if (bodyScrollLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  bodyScrollLockCount += 1
}

function unlockBodyScroll() {
  if (typeof document === 'undefined' || !document.body || bodyScrollLockCount === 0) {
    return
  }

  bodyScrollLockCount -= 1
  if (bodyScrollLockCount === 0) {
    document.body.style.overflow = previousBodyOverflow
    previousBodyOverflow = ''
  }
}

function scheduleTask(callback) {
  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame(callback)
  }

  return setTimeout(callback, 0)
}

function cancelTask(task) {
  if (task === null || task === undefined) {
    return
  }

  if (typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(task)
  } else {
    clearTimeout(task)
  }
}

function isVisible(element) {
  if (element.hidden || element.getAttribute('aria-hidden') === 'true') {
    return false
  }

  const styles = globalThis.getComputedStyle?.(element)
  return !styles || (styles.display !== 'none' && styles.visibility !== 'hidden')
}

function getFocusableElements(panel) {
  if (!panel) {
    return []
  }

  return [...panel.querySelectorAll(
    'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [contenteditable="true"], [tabindex]:not([tabindex="-1"])'
  )].filter(isVisible)
}

function PopupLifecycle({ openValue, instanceId, restoreFocus, focusState }) {
  onMount(() => {
    let focusTask = null
    let restoreTask = null
    let bodyLocked = false
    let wasOpen = false

    const stop = effect(() => {
      if (!openValue.value) {
        cancelTask(focusTask)
        focusTask = null

        if (wasOpen && readValue(restoreFocus, true) && focusState.returnFocusTarget?.focus) {
          const focusTarget = focusState.returnFocusTarget
          restoreTask = scheduleTask(() => {
            restoreTask = null
            if (focusTarget.isConnected !== false) {
              focusTarget.focus()
            }
          })
        }
        wasOpen = false

        if (bodyLocked) {
          unlockBodyScroll()
          bodyLocked = false
        }
        return
      }

      if (!wasOpen) {
        cancelTask(restoreTask)
        restoreTask = null
        focusState.returnFocusTarget = typeof document === 'undefined' ? undefined : document.activeElement
        wasOpen = true
      }

      if (!bodyLocked) {
        lockBodyScroll()
        bodyLocked = true
      }

      cancelTask(focusTask)
      focusTask = scheduleTask(() => {
        focusTask = null
        if (!openValue.value || typeof document === 'undefined') {
          return
        }

        const panel = document.getElementById(instanceId)
        const focusable = getFocusableElements(panel)
        const target = focusable[0] ?? panel
        target?.focus()
      })
    }, { flush: 'microtask' })

    return () => {
      stop()
      cancelTask(focusTask)
      cancelTask(restoreTask)
      if (bodyLocked) {
        unlockBodyScroll()
      }
    }
  })

  return null
}

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
    ariaLabel = 'Dialog',
    ariaDescription,
    onClose
  } = props

  const openValue = isWritableSignal(open) ? open : signal(Boolean(readValue(open, false)))
  const instanceId = id ?? `prism-popup-${popupId += 1}`
  const titleId = `${instanceId}-title`
  const descriptionId = `${instanceId}-description`
  const focusState = {}
  const lifecycle = component(PopupLifecycle, { openValue, instanceId, restoreFocus, focusState })

  const close = (reason = 'programmatic', event) => {
    openValue.value = false
    onClose?.(reason, event)
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

    const panel = event.currentTarget.querySelector(`.${baseClassName}-panel`)
    const focusable = getFocusableElements(panel)

    if (focusable.length === 0) {
      event.preventDefault()
      panel?.focus()
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

  const popupMarkup = computed(() => {
    if (!openValue.value) {
      return null
    }

    const currentSize = sizes.has(readValue(size)) ? readValue(size) : 'medium'
    const currentPlacement = placements.has(readValue(placement)) ? readValue(placement) : 'center'
    const titleValue = readValue(title)
    const hasTitle = titleValue !== undefined && titleValue !== null && String(titleValue).trim() !== ''
    const accessibleLabel = String(readValue(ariaLabel, 'Dialog') ?? '').trim() || 'Dialog'
    const hasHeader = hasTitle || eyebrow !== undefined || readValue(showClose, true)
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
          aria-label="${hasTitle ? undefined : accessibleLabel}"
          aria-labelledby="${hasTitle ? titleId : undefined}"
          aria-describedby="${ariaDescription === undefined ? undefined : descriptionId}"
          tabindex="-1"
          ?autofocus=${!readValue(showClose, true)}
        >
          ${hasHeader ? html`
            <header class="${baseClassName}-header">
              <div class="${baseClassName}-heading">
                ${eyebrow === undefined ? null : html`<span class="${baseClassName}-eyebrow">${eyebrow}</span>`}
                ${hasTitle ? html`<strong class="${baseClassName}-title" id="${titleId}">${title}</strong>` : null}
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

  return html`${lifecycle}${popupMarkup}`
}

export const PopupComponent = props => component(Popup, props)
