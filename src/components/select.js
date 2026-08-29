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
    onRender,
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
  const currentPlacement = signal('bottom')
  const activeIndex = signal(-1)
  const sizeValue = isReactiveValue(size) ? size : size || 'medium'
  const optionList = isReactiveValue(options)
    ? computed(() => (options.value ?? []).map(normalizeOption))
    : (options ?? []).map(normalizeOption)

  const readOptions = () => isReactiveValue(optionList) ? optionList.value : optionList
  const renderOption = (option, context) => typeof onRender === 'function'
    ? onRender(option, context)
    : option.label
  const selectedOption = computed(() => {
    const selected = String(selectedValue.value ?? '')
    return readOptions().find(option => String(option.value) === selected)
  })
  const selectedLabel = computed(() => {
    const option = selectedOption.value
    return option ? renderOption(option, { location: 'trigger', selected: true }) : placeholder
  })

  let activeTrigger
  let removeOpenListeners = () => {}

  const listboxId = id === undefined ? undefined : `${id}-listbox`
  const optionId = index => id === undefined ? undefined : `${id}-option-${index}`

  const getSelectedIndex = () => {
    const selected = String(selectedValue.value ?? '')
    return readOptions().findIndex(option => String(option.value) === selected)
  }

  const getEnabledIndex = (start, direction) => {
    const optionList = readOptions()
    if (optionList.length === 0) {
      return -1
    }

    for (let offset = 1; offset <= optionList.length; offset += 1) {
      const index = (start + direction * offset + optionList.length * 2) % optionList.length
      if (!optionList[index].disabled) {
        return index
      }
    }

    return -1
  }

  const getInitialActiveIndex = () => {
    const selectedIndex = getSelectedIndex()
    if (selectedIndex >= 0 && !readOptions()[selectedIndex].disabled) {
      return selectedIndex
    }

    return getEnabledIndex(-1, 1)
  }

  const openMenu = index => {
    currentPlacement.value = normalizePlacement(isReactiveValue(placement) ? placement.value : placement)
    activeIndex.value = index >= 0 ? index : getInitialActiveIndex()
    open.value = true
    addOpenListeners()
    schedulePosition()
  }

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
    activeIndex.value = -1
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

    openMenu(getSelectedIndex())
  }

  const selectOption = (option, event, index = readOptions().indexOf(option)) => {
    if (option.disabled) {
      return
    }

    event.preventDefault()
    activeIndex.value = index
    selectedValue.value = String(option.value)
    onChange?.(event)
    closeMenu(true)
  }

  const moveActive = direction => {
    const current = activeIndex.value >= 0 ? activeIndex.value : getSelectedIndex()
    const next = getEnabledIndex(current, direction)
    if (next >= 0) {
      activeIndex.value = next
    }
  }

  const moveToBoundary = direction => {
    const optionList = readOptions()
    const start = direction > 0 ? -1 : optionList.length
    const next = getEnabledIndex(start, direction)
    if (next >= 0) {
      activeIndex.value = next
    }
  }

  const moveToMatchingOption = key => {
    const optionList = readOptions()
    if (optionList.length === 0) {
      return
    }

    const current = activeIndex.value >= 0 ? activeIndex.value : getSelectedIndex()

    for (let offset = 1; offset <= optionList.length; offset += 1) {
      const index = (current + offset + optionList.length * 2) % optionList.length
      const option = optionList[index]
      if (!option.disabled && String(option.label).toLocaleLowerCase().startsWith(key)) {
        activeIndex.value = index
        return
      }
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Escape' && open.value) {
      event.preventDefault()
      closeMenu(true)
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open.value) {
        openMenu(getSelectedIndex())
      }
      moveActive(event.key === 'ArrowDown' ? 1 : -1)
      return
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      if (!open.value) {
        openMenu(getSelectedIndex())
      }
      moveToBoundary(event.key === 'Home' ? 1 : -1)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (!open.value) {
        openMenu(getSelectedIndex())
        return
      }

      const option = readOptions()[activeIndex.value]
      if (option) {
        selectOption(option, event, activeIndex.value)
      }
      return
    }

    if (event.key === ' ') {
      event.preventDefault()
      toggleMenu(event)
      return
    }

    if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
      event.preventDefault()
      if (!open.value) {
        openMenu(getSelectedIndex())
      }
      moveToMatchingOption(event.key.toLocaleLowerCase())
    }
  }

  const optionMarkup = computed(() => {
    const selected = String(selectedValue.value ?? '')

    return readOptions().map((option, index) => html`<button type="button" class="${baseClassName}-option" id="${optionId(index)}" value="${option.value}" role="option" aria-selected="${String(option.value) === selected}" data-active="${index === activeIndex.value}" ?disabled=${option.disabled} .onclick=${event => selectOption(option, event, index)}>${renderOption(option, { location: 'option', selected: String(option.value) === selected })}</button>`)
  })

  const activeOptionId = computed(() => optionId(activeIndex.value))
  const menu = html`<div class="${baseClassName}-menu ${baseClassName}-menu-${currentPlacement}" id="${listboxId}" role="listbox" aria-label="${ariaLabel ?? 'Options'}" ?hidden=${computed(() => !open.value)}>${optionMarkup}</div>`

  return html`<div class="${baseClassName} ${baseClassName}-${sizeValue} ${classValue}"><button type="button" class="${baseClassName}-trigger" id="${id}" name="${name}" role="combobox" aria-haspopup="listbox" aria-expanded="${open}" aria-controls="${listboxId}" aria-activedescendant="${activeOptionId}" aria-label="${ariaLabel}" aria-required="${required}" ?disabled=${disabled} @click=${toggleMenu} @keydown=${handleKeyDown}><span class="${baseClassName}-value">${selectedLabel}</span><span class="${baseClassName}-chevron" aria-hidden="true"></span></button>${menu}</div>`
}

export const SelectComponent = props => component(Select, props)
