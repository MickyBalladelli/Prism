import { component, computed, html, signal } from 'matrix'

const baseClassName = 'prism-select'
const placementValues = new Set(['bottom', 'top', 'left', 'right'])

const isReactiveValue = value => value?.kind === 'signal' || value?.kind === 'computed'

function normalizePlacement(value) {
  return placementValues.has(value) ? value : 'bottom'
}

function normalizeOption(option) {
  if (option && typeof option === 'object') {
    return {
      value: option.value ?? option.label ?? '',
      label: option.label ?? option.value ?? '',
      disabled: option.disabled ?? false
    }
  }

  return {
    value: option ?? '',
    label: option ?? '',
    disabled: false
  }
}

export function Select(props = {}) {
  const {
    options = [],
    value = '',
    onChange,
    id,
    name,
    placeholder = 'Select an option',
    disabled = false,
    required = false,
    size = 'medium',
    placement = 'bottom',
    ariaLabel,
    class: classValue = ''
  } = props

  const open = signal(false)
  const selectedValue = value?.kind === 'signal'
    ? value
    : signal(isReactiveValue(value) ? value.value : value)
  const currentPlacement = signal(normalizePlacement(isReactiveValue(placement) ? placement.value : placement))
  const sizeValue = isReactiveValue(size) ? size : size || 'medium'
  const optionList = isReactiveValue(options)
    ? computed(() => (options.value ?? []).map(normalizeOption))
    : (options ?? []).map(normalizeOption)

  const readOptions = () => isReactiveValue(optionList) ? optionList.value : optionList
  const selectedLabel = computed(() => {
    const selected = String(selectedValue.value ?? '')
    return readOptions().find(option => String(option.value) === selected)?.label ?? placeholder
  })

  let activeTrigger
  let removeOpenListeners = () => {}

  const positionMenu = () => {
    if (!activeTrigger) {
      return
    }

    const wrapper = activeTrigger.parentElement
    const menu = wrapper?.querySelector(`.${baseClassName}-menu`)
    if (!wrapper || !menu) {
      return
    }

    const triggerRect = activeTrigger.getBoundingClientRect()
    const menuRect = menu.getBoundingClientRect()
    const gutter = 8
    const available = {
      bottom: window.innerHeight - triggerRect.bottom - gutter,
      top: triggerRect.top - gutter,
      right: window.innerWidth - triggerRect.right - gutter,
      left: triggerRect.left - gutter
    }
    const fits = {
      bottom: menuRect.height <= available.bottom,
      top: menuRect.height <= available.top,
      right: menuRect.width <= available.right,
      left: menuRect.width <= available.left
    }
    const preferred = normalizePlacement(isReactiveValue(placement) ? placement.value : placement)
    const opposite = {
      bottom: 'top',
      top: 'bottom',
      right: 'left',
      left: 'right'
    }
    const fallback = opposite[preferred]
    const nextPlacement = fits[preferred]
      ? preferred
      : fits[fallback]
        ? fallback
        : available[fallback] > available[preferred] ? fallback : preferred

    const availableHeight = nextPlacement === 'top'
      ? available.top
      : nextPlacement === 'bottom'
        ? available.bottom
        : Math.max(available.top, available.bottom)

    menu.style.maxHeight = `${Math.max(4, Math.min(288, availableHeight))}px`
    currentPlacement.value = nextPlacement
  }

  const schedulePosition = () => {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(positionMenu)
      return
    }

    setTimeout(positionMenu, 0)
  }

  const closeMenu = restoreFocus => {
    open.value = false
    removeOpenListeners()
    if (restoreFocus) {
      activeTrigger?.focus()
    }
  }

  const addOpenListeners = () => {
    const closeOnOutsideClick = event => {
      if (!activeTrigger?.parentElement?.contains(event.target)) {
        closeMenu(false)
      }
    }
    const refreshPosition = () => schedulePosition()

    document.addEventListener('click', closeOnOutsideClick)
    window.addEventListener('resize', refreshPosition)
    window.addEventListener('scroll', refreshPosition, true)
    removeOpenListeners = () => {
      document.removeEventListener('click', closeOnOutsideClick)
      window.removeEventListener('resize', refreshPosition)
      window.removeEventListener('scroll', refreshPosition, true)
      removeOpenListeners = () => {}
    }
  }

  const toggleMenu = event => {
    activeTrigger = event.currentTarget
    if (open.value) {
      closeMenu(false)
      return
    }

    open.value = true
    addOpenListeners()
    schedulePosition()
  }

  const selectOption = (option, event) => {
    if (option.disabled) {
      return
    }

    event.preventDefault()
    selectedValue.value = String(option.value)
    onChange?.(event)
    closeMenu(true)
  }

  const handleMenuClick = event => {
    const optionElement = event.target?.closest?.(`.${baseClassName}-option`)
    if (!optionElement) {
      return
    }

    const option = readOptions().find(item => String(item.value) === optionElement.value)
    if (option) {
      selectOption(option, event)
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Escape' && open.value) {
      event.preventDefault()
      closeMenu(true)
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleMenu(event)
    }
  }

  const menu = computed(() => {
    if (!open.value) {
      return null
    }

    const selected = String(selectedValue.value ?? '')
    const listboxId = id === undefined ? undefined : `${id}-listbox`

    return html`<div class="${baseClassName}-menu ${baseClassName}-menu-${currentPlacement}" id="${listboxId}" role="listbox" aria-label="${ariaLabel ?? 'Options'}" @click=${handleMenuClick}>${readOptions().map(option => html`<button type="button" class="${baseClassName}-option" value="${option.value}" role="option" aria-selected="${String(option.value) === selected}" ?disabled=${option.disabled}>${option.label}</button>`)}</div>`
  })

  return html`<div class="${baseClassName} ${baseClassName}-${sizeValue} ${classValue}"><button type="button" class="${baseClassName}-trigger" id="${id}" name="${name}" aria-haspopup="listbox" aria-expanded="${open}" aria-label="${ariaLabel}" aria-required="${required}" ?disabled=${disabled} @click=${toggleMenu} @keydown=${handleKeyDown}><span class="${baseClassName}-value">${selectedLabel}</span><span class="${baseClassName}-chevron" aria-hidden="true"></span></button>${menu}</div>`
}

export const SelectComponent = props => component(Select, props)
