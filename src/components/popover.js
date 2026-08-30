import { component, effect, html, onMount, signal } from '@mickyballadelli/matrix'
import { normalizePlacement, positionFloatingElement } from './overlay-utils.js'
import { createWritableSignal, readReactiveValue } from '../reactive.js'

let popoverId = 0

export function Popover(props = {}) {
  const {
    children,
    class: classValue = '',
    closeOnEscape = true,
    closeOnOutside = true,
    content,
    id,
    onOpenChange,
    open: openProp,
    placement = 'bottom',
    trigger
  } = props

  const open = createWritableSignal(openProp, false)
  const popoverDomId = id ?? `prism-popover-${++popoverId}`
  const setOpen = value => {
    open.value = value
    onOpenChange?.(value)
  }
  const toggle = () => setOpen(!open.value)
  const close = () => setOpen(false)
  const triggerValue = typeof trigger === 'function'
    ? trigger({ open: open.value, toggle, close })
    : children

  onMount(root => {
    if (typeof document === 'undefined') return
    const updatePosition = () => {
      const anchor = root.querySelector('.prism-popover-trigger') ?? root
      const floating = root.querySelector('.prism-popover')
      positionFloatingElement(anchor, floating, normalizePlacement(readReactiveValue(placement, 'bottom')))
    }
    const handleOutside = event => {
      if (closeOnOutside && open.value && !root.contains(event.target)) close()
    }
    const handleKeydown = event => {
      if (closeOnEscape && event.key === 'Escape' && open.value) {
        event.preventDefault()
        close()
        root.querySelector('.prism-popover-trigger')?.focus()
      }
    }
    document.addEventListener('pointerdown', handleOutside)
    root.addEventListener('keydown', handleKeydown)
    const dispose = effect(() => {
      if (open.value) requestAnimationFrame(updatePosition)
    })
    return () => {
      dispose?.()
      document.removeEventListener('pointerdown', handleOutside)
      root.removeEventListener('keydown', handleKeydown)
    }
  })

  return html`
    <span class="prism-popover-anchor ${classValue}">
      <span class="prism-popover-trigger" aria-expanded="${open.value}" aria-controls="${popoverDomId}" @click=${toggle}>${triggerValue}</span>
      ${open.value ? html`<div id="${popoverDomId}" class="prism-popover prism-popover-${normalizePlacement(readReactiveValue(placement, 'bottom'))}" role="dialog" tabindex="-1" aria-label="${props.ariaLabel ?? ''}">${typeof content === 'function' ? content({ close, open: open.value }) : content}</div>` : ''}
    </span>
  `
}

export const PopoverComponent = props => component(Popover, props)
