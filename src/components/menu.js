import { component, computed, effect, html, onMount, signal } from '@mickyballadelli/matrix'
import { ChevronRightIcon, MoreHorizontalIcon } from './icons.js'
import { normalizePlacement, positionFloatingElement } from './overlay-utils.js'
import { readReactiveValue } from '../reactive.js'

let menuId = 0

const enabledItems = root => Array.from(root.querySelectorAll(':scope > [data-menu-index]')).filter(item => item.getAttribute('aria-disabled') !== 'true')

function MenuSubmenu({ item, onSelect }) {
  const open = signal(false)
  const id = `prism-submenu-${++menuId}`
  const toggle = event => {
    event.stopPropagation()
    open.value = !open.value
  }
  const select = (value, event) => {
    onSelect?.(value, event)
  }

  return html`
    <div class="prism-menu-submenu ${open.value ? 'is-open' : ''}" @mouseenter=${() => open.value = true} @mouseleave=${() => open.value = false}>
      <button type="button" class="prism-menu-item prism-menu-submenu-trigger" role="menuitem" aria-haspopup="menu" aria-expanded="${open.value}" aria-controls="${id}" ?disabled=${item.disabled} @click=${toggle}>
        ${item.icon ? html`<span class="prism-menu-item-icon" aria-hidden="true">${item.icon}</span>` : ''}
        <span class="prism-menu-item-label">${item.label}</span>
        <span class="prism-menu-item-end" aria-hidden="true">${ChevronRightIcon({ size: 14 })}</span>
      </button>
      ${open.value ? component(Menu, { items: item.items, id, nested: true, onSelect: select }) : ''}
    </div>
  `
}

function normalizeItems(value) {
  return (readReactiveValue(value, []) ?? []).map((item, index) => {
    if (typeof item === 'string' || typeof item === 'number') return { id: String(index), label: item }
    return item ?? { id: String(index), label: '' }
  })
}

export function Menu(props = {}) {
  const {
    ariaLabel = 'Menu',
    class: classValue = '',
    id,
    items = [],
    nested = false,
    onActiveChange,
    onSelect
  } = props

  const rootId = id ?? `prism-menu-${++menuId}`
  const itemValue = computed(() => normalizeItems(items))
  const activeIndex = signal(-1)

  const activate = (item, event) => {
    if (item.disabled || item.type === 'separator' || item.type === 'group' || Array.isArray(item.items)) return
    item.onSelect?.(item, event)
    onSelect?.(item, event)
  }

  const focusIndex = (root, nextIndex) => {
    const choices = enabledItems(root)
    if (!choices.length) return
    const index = Math.max(0, Math.min(nextIndex, choices.length - 1))
    activeIndex.value = Number(choices[index].dataset.menuIndex)
    onActiveChange?.(activeIndex.value)
    choices[index].focus()
  }

  const handleKeydown = event => {
    const root = event.currentTarget
    const choices = enabledItems(root)
    if (!choices.length) return
    const current = choices.indexOf(document.activeElement)
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusIndex(root, current < 0 ? 0 : (current + 1) % choices.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusIndex(root, current < 0 ? choices.length - 1 : (current - 1 + choices.length) % choices.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusIndex(root, 0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusIndex(root, choices.length - 1)
    } else if (event.key === 'Enter' || event.key === ' ') {
      const target = document.activeElement?.closest('[data-menu-index]')
      if (target) {
        event.preventDefault()
        target.click()
      }
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const match = choices.find(choice => choice.textContent.trim().toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()))
      if (match) {
        event.preventDefault()
        match.focus()
      }
    }
  }

  onMount(root => {
    const first = enabledItems(root)[0]
    if (first && activeIndex.value < 0) activeIndex.value = Number(first.dataset.menuIndex)
  })

  const itemMarkup = computed(() => itemValue.value.map((item, index) => {
    if (item.type === 'separator') return html`<div class="prism-menu-separator" role="separator"></div>`
    if (item.type === 'group') {
      return html`<div class="prism-menu-group" role="group" aria-label="${item.label ?? ''}"><div class="prism-menu-group-label">${item.label}</div>${component(Menu, { items: item.items ?? [], nested: true, onSelect }, item.id ?? `group-${index}`)}</div>`
    }
    if (Array.isArray(item.items)) return component(MenuSubmenu, { item, onSelect }, item.id ?? index)

    const tabIndex = computed(() => item.disabled ? -1 : activeIndex.value === index ? 0 : -1)
    const hasLink = item.href !== undefined && item.href !== null
    const content = html`
      ${item.icon ? html`<span class="prism-menu-item-icon" aria-hidden="true">${item.icon}</span>` : ''}
      <span class="prism-menu-item-label">${item.label ?? item.children ?? ''}</span>
      ${item.shortcut ? html`<span class="prism-menu-item-shortcut">${item.shortcut}</span>` : ''}
    `
    return hasLink
      ? html`<a class="prism-menu-item" href="${item.href}" role="menuitem" data-menu-index="${index}" aria-disabled="${item.disabled ? 'true' : undefined}" tabindex="${tabIndex}" @click=${event => {
        if (item.disabled) event.preventDefault()
        activate(item, event)
      }}>${content}</a>`
      : html`<button class="prism-menu-item" type="button" role="menuitem" data-menu-index="${index}" aria-disabled="${item.disabled ? 'true' : undefined}" tabindex="${tabIndex}" ?disabled=${item.disabled} @click=${event => activate(item, event)}>${content}</button>`
  }))

  return html`<div id="${rootId}" class="prism-menu ${nested ? 'prism-menu-nested' : ''} ${classValue}" role="menu" aria-label="${ariaLabel}" @keydown=${handleKeydown}>${itemMarkup}</div>`
}

export function DropdownMenu(props = {}) {
  const {
    ariaLabel = 'Menu',
    class: classValue = '',
    label = 'Menu',
    items = [],
    onOpenChange,
    placement = 'bottom-start',
    trigger,
    ...menuProps
  } = props

  const open = signal(false)
  const dropdownMenuId = `prism-dropdown-menu-${++menuId}`
  const toggle = () => {
    open.value = !open.value
    onOpenChange?.(open.value)
  }
  const close = () => {
    if (!open.value) return
    open.value = false
    onOpenChange?.(false)
  }
  const triggerValue = typeof trigger === 'function'
    ? trigger({ open, toggle, close })
    : html`<button type="button" class="prism-dropdown-trigger" aria-haspopup="menu" aria-expanded="${computed(() => open.value ? 'true' : 'false')}" aria-controls="${dropdownMenuId}" @click=${toggle}>${label}<span aria-hidden="true">${MoreHorizontalIcon({ size: 16 })}</span></button>`

  const currentPlacement = computed(() => normalizePlacement(readReactiveValue(placement, 'bottom-start'), 'bottom-start'))
  const panel = computed(() => {
    if (!open.value) {
      return null
    }

    return html`<div class="prism-dropdown-panel" data-placement="${currentPlacement.value}">${component(Menu, { ...menuProps, id: dropdownMenuId, items, ariaLabel, onSelect: (item, event) => {
      menuProps.onSelect?.(item, event)
      close()
    } })}</div>`
  })

  let dropdownRoot = null
  onMount(root => {
    dropdownRoot = root
    if (typeof document === 'undefined') return
    const updatePosition = () => {
      if (!open.value) return
      const anchor = root.querySelector('.prism-dropdown-trigger') ?? root.querySelector('button') ?? root
      const panelNode = root.querySelector('.prism-dropdown-panel')
      positionFloatingElement(anchor, panelNode, currentPlacement.value)
    }
    const handleOutside = event => {
      if (open.value && !root.contains(event.target)) close()
    }
    const handleKeydown = event => {
      if (event.key === 'Escape' && open.value) {
        event.preventDefault()
        close()
        root.querySelector('.prism-dropdown-trigger')?.focus()
      }
    }
    document.addEventListener('pointerdown', handleOutside)
    root.addEventListener('keydown', handleKeydown)
    const dispose = effect(() => {
      if (open.value) requestAnimationFrame(updatePosition)
    })
    return () => {
      dropdownRoot = null
      dispose?.()
      document.removeEventListener('pointerdown', handleOutside)
      root.removeEventListener('keydown', handleKeydown)
    }
  })

  return html`
    <div class="prism-dropdown ${classValue}" @keydown=${event => {
      if (event.key === 'ArrowDown' && !open.value) {
        event.preventDefault()
        open.value = true
        onOpenChange?.(true)
        requestAnimationFrame(() => dropdownRoot?.querySelector(`#${dropdownMenuId} [data-menu-index]`)?.focus())
      }
    }}>
      ${triggerValue}
      ${panel}
    </div>
  `
}

export const MenuComponent = props => component(Menu, props)
export const DropdownMenuComponent = props => component(DropdownMenu, props)
