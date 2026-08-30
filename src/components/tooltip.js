import { component, effect, html, onMount, signal } from '@mickyballadelli/matrix'
import { normalizePlacement, positionFloatingElement } from './overlay-utils.js'
import { readReactiveValue } from '../reactive.js'

let tooltipId = 0

export function Tooltip(props = {}) {
  const {
    children,
    class: classValue = '',
    content,
    delay = 300,
    disabled = false,
    id,
    placement = 'top',
    showDelay
  } = props

  const open = signal(false)
  let timer
  const tooltipDomId = id ?? `prism-tooltip-${++tooltipId}`
  const delayValue = showDelay ?? delay
  const show = () => {
    clearTimeout(timer)
    if (readReactiveValue(disabled, false)) return
    timer = setTimeout(() => { open.value = true }, Number(readReactiveValue(delayValue, 300)))
  }
  const hide = () => {
    clearTimeout(timer)
    open.value = false
  }
  const toggleTouch = event => {
    if (event.pointerType === 'touch') {
      event.preventDefault()
      open.value ? hide() : show()
    }
  }

  onMount(root => {
    if (typeof document === 'undefined' || !root?.addEventListener) return
    const updatePosition = () => {
      const tooltip = root.querySelector('.prism-tooltip')
      positionFloatingElement(root, tooltip, normalizePlacement(readReactiveValue(placement, 'top'), 'top'))
    }
    const handleKeydown = event => {
      if (event.key === 'Escape') hide()
    }
    root.addEventListener('mouseenter', show)
    root.addEventListener('mouseleave', hide)
    root.addEventListener('pointerdown', toggleTouch)
    root.addEventListener('focusin', show)
    root.addEventListener('focusout', hide)
    root.addEventListener('keydown', handleKeydown)
    const dispose = effect(() => {
      if (open.value) requestAnimationFrame(updatePosition)
    })
    return () => {
      clearTimeout(timer)
      root.removeEventListener('mouseenter', show)
      root.removeEventListener('mouseleave', hide)
      root.removeEventListener('pointerdown', toggleTouch)
      root.removeEventListener('focusin', show)
      root.removeEventListener('focusout', hide)
      root.removeEventListener('keydown', handleKeydown)
      dispose?.()
    }
  })

  return html`
    <span class="prism-tooltip-anchor ${classValue}" aria-describedby="${open.value ? tooltipDomId : ''}">
      ${children}
      ${open.value && !readReactiveValue(disabled, false) ? html`<span id="${tooltipDomId}" class="prism-tooltip prism-tooltip-${normalizePlacement(readReactiveValue(placement, 'top'), 'top')}" role="tooltip">${typeof content === 'function' ? content() : content}</span>` : ''}
    </span>
  `
}

export const TooltipComponent = props => component(Tooltip, props)
