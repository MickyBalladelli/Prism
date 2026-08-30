import { component, computed, html, keyed, onMount, signal } from '@mickyballadelli/matrix'
import { Alert } from './alert.js'
import { isWritableSignal, readReactiveValue } from '../reactive.js'

let toastId = 0

export function createToastController(initial = []) {
  const toasts = signal(initial)
  return {
    toasts,
    push(toast = {}) {
      const id = toast.id ?? `toast-${++toastId}`
      toasts.value = [...toasts.value, { ...toast, id }]
      return id
    },
    dismiss(id) {
      toasts.value = toasts.value.filter(toast => toast.id !== id)
    },
    clear() {
      toasts.value = []
    }
  }
}

export function Toast(props = {}) {
  const {
    children,
    class: classValue = '',
    description,
    dismissible = true,
    id,
    onDismiss,
    title,
    tone = 'info'
  } = props

  return html`<div class="prism-toast ${classValue}" data-toast-id="${id ?? ''}">${Alert({ children, description, dismissible, onDismiss, title, tone })}</div>`
}

function ToastItem({ toast, duration, onDismiss }) {
  onMount(root => {
    let remaining = Number(readReactiveValue(toast.duration, readReactiveValue(duration, 4000)))
    let startedAt = Date.now()
    let timer
    const dismiss = () => onDismiss(toast.id, toast)
    const start = () => {
      if (!remaining || remaining < 0) return
      startedAt = Date.now()
      timer = setTimeout(dismiss, remaining)
    }
    const pause = () => {
      if (timer) clearTimeout(timer)
      remaining -= Date.now() - startedAt
    }
    root.addEventListener('pointerenter', pause)
    root.addEventListener('pointerleave', start)
    root.addEventListener('focusin', pause)
    root.addEventListener('focusout', start)
    start()
    return () => {
      if (timer) clearTimeout(timer)
      root.removeEventListener('pointerenter', pause)
      root.removeEventListener('pointerleave', start)
      root.removeEventListener('focusin', pause)
      root.removeEventListener('focusout', start)
    }
  })

  return Toast({ ...toast, onDismiss: () => onDismiss(toast.id, toast) })
}

export function ToastRegion(props = {}) {
  const {
    ariaLabel = 'Notifications',
    class: classValue = '',
    duration = 4000,
    maxVisible = 5,
    onDismiss,
    position = 'bottom-end',
    toasts = []
  } = props

  const dismiss = (id, toast) => {
    if (typeof onDismiss === 'function') {
      onDismiss(id, toast)
      return
    }

    if (isWritableSignal(toasts)) {
      toasts.value = toasts.value.filter(item => item.id !== id)
    }
  }

  const visibleToasts = computed(() => {
    const items = readReactiveValue(toasts, []) ?? []
    const limit = Math.max(1, Number(readReactiveValue(maxVisible, 5)) || 5)
    return items.slice(-limit).map(toast => component(ToastItem, { toast, duration, onDismiss: dismiss }, toast.id))
  })

  return html`<div class="prism-toast-region prism-toast-region-${position} ${classValue}" role="region" aria-label="${ariaLabel}" aria-live="polite">${keyed(visibleToasts, item => item.key ?? item.props.toast.id)}</div>`
}

export const ToastComponent = props => component(Toast, props)
export const ToastRegionComponent = props => component(ToastRegion, props)
