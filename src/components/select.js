import { component, computed, html, onMount, signal } from '@mickyballadelli/matrix'
import { isReactiveValue, isWritableSignal, readReactiveValue } from '../reactive.js'
import { normalizePlacement as normalizeFloatingPlacement } from './overlay-utils.js'

const baseClassName = 'prism-select'
const placementValues = new Set(['bottom', 'top', 'left', 'right'])
const sizeValues = new Set(['small', 'medium', 'large'])
let selectId = 0

function normalizePlacement(value) {
  return placementValues.has(value) ? normalizeFloatingPlacement(value, 'bottom') : 'bottom'
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

function SelectFormLifecycle({ triggerId, required, disabled, formValue, invalid }) {
  onMount(() => {
    if (typeof document === 'undefined') {
      return
    }

    const trigger = document.getElementById(triggerId)
    const form = trigger?.closest('form')
    if (!form) {
      return
    }

    const isRequired = () => Boolean(readReactiveValue(required))
    const isDisabled = () => Boolean(readReactiveValue(disabled))
    const handleSubmit = event => {
      if (!isRequired() || isDisabled() || formValue.value !== '') {
        invalid.value = false
        return
      }

      event.preventDefault()
      invalid.value = true
      trigger.focus()
    }

    form.addEventListener('submit', handleSubmit, true)
    return () => form.removeEventListener('submit', handleSubmit, true)
  })

  return null
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
    ariaDescription,
    ariaDescribedBy,
    ariaInvalid,
    error,
    class: classValue = '',
    style,
    onFocus,
    onBlur
  } = props

  const open = signal(false)
  const invalid = signal(false)
  const selectedValue = isWritableSignal(value)
    ? value
    : signal(readReactiveValue(value))
  const currentPlacement = signal('bottom')
  const activeIndex = signal(-1)
  const sizeValue = computed(() => {
    const next = readReactiveValue(size, 'medium')
    return sizeValues.has(next) ? next : 'medium'
  })
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
  const formValue = computed(() => String(selectedValue.value ?? ''))
  const isRequired = () => Boolean(readReactiveValue(required))
  const isDisabled = () => Boolean(readReactiveValue(disabled))
  const errorValue = computed(() => readReactiveValue(error))
  const hasError = computed(() => errorValue.value !== undefined && errorValue.value !== null && errorValue.value !== '')
  const descriptionValue = computed(() => hasError.value ? errorValue.value : readReactiveValue(ariaDescription))
  const hasDescription = computed(() => descriptionValue.value !== undefined && descriptionValue.value !== null && descriptionValue.value !== '')

  let activeTrigger
  let removeOpenListeners = () => {}

  const instanceId = id ?? `prism-select-${selectId += 1}`
  const triggerId = id ?? `${instanceId}-trigger`
  const listboxId = `${triggerId}-listbox`
  const optionId = index => `${triggerId}-option-${index}`
  const messageId = `${triggerId}-message`
  const describedBy = computed(() => [
    readReactiveValue(ariaDescribedBy),
    hasDescription.value ? messageId : undefined
  ].filter(Boolean).join(' ') || undefined)
  const accessibleLabel = computed(() => String(readReactiveValue(ariaLabel, 'Select an option') ?? '').trim() || 'Select an option')
  const invalidValue = computed(() => {
    const explicit = readReactiveValue(ariaInvalid)
    return invalid.value || hasError.value || Boolean(explicit)
  })
  const styleValue = computed(() => readReactiveValue(style))

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
    currentPlacement.value = normalizePlacement(readReactiveValue(placement))
    activeIndex.value = index >= 0 ? index : getInitialActiveIndex()
    open.value = true
    addOpenListeners()
    schedulePosition()
  }

  const positionMenu = () => {
    if (!activeTrigger || !open.value) {
      return
    }

    const wrapper = activeTrigger.parentElement
    const menu = wrapper?.querySelector(`.${baseClassName}-menu`)
    if (!wrapper || !menu) {
      return
    }

    menu.style.position = ''
    menu.style.top = ''
    menu.style.right = ''
    menu.style.bottom = ''
    menu.style.left = ''
    menu.style.width = ''
    menu.style.maxHeight = ''
    menu.style.zIndex = ''
    menu.style.visibility = ''

    const previousHidden = menu.hidden
    menu.hidden = false
    const menuHeight = Math.max(menu.scrollHeight, menu.offsetHeight)
    const menuWidth = Math.max(menu.scrollWidth, menu.offsetWidth)
    menu.hidden = previousHidden

    const triggerRect = activeTrigger.getBoundingClientRect()
    const gutter = 8
    const viewportWidth = Math.max(8, window.innerWidth - gutter * 2)
    const wrapperRect = wrapper.getBoundingClientRect()
    const available = {
      bottom: window.innerHeight - triggerRect.bottom - gutter,
      top: triggerRect.top - gutter,
      right: window.innerWidth - triggerRect.right - gutter,
      left: triggerRect.left - gutter
    }
    const fits = {
      bottom: menuHeight <= available.bottom,
      top: menuHeight <= available.top,
      right: menuWidth <= available.right,
      left: menuWidth <= available.left
    }
    const preferred = normalizePlacement(readReactiveValue(placement))
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

    menu.style.maxWidth = `${viewportWidth}px`
    if (nextPlacement === 'bottom' || nextPlacement === 'top') {
      menu.style.left = `${Math.max(gutter - wrapperRect.left, 0)}px`
      menu.style.right = `${Math.max(wrapperRect.right - (window.innerWidth - gutter), 0)}px`
    } else if (nextPlacement === 'right' && triggerRect.right + menuWidth + gutter > window.innerWidth) {
      menu.style.left = 'auto'
      menu.style.right = '0'
    } else if (nextPlacement === 'left' && triggerRect.left - menuWidth - gutter < 0) {
      menu.style.right = 'auto'
      menu.style.left = '0'
    }

    const availableHeight = nextPlacement === 'top'
      ? available.top
      : nextPlacement === 'bottom'
        ? available.bottom
        : Math.max(available.top, available.bottom)

    menu.style.maxHeight = `${Math.min(288, Math.max(8, availableHeight))}px`
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
    const menu = activeTrigger?.parentElement?.querySelector(`.${baseClassName}-menu`)
    if (menu) {
      menu.style.maxHeight = ''
    }
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
    selectedValue.value = option.value
    invalid.value = false
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
    activeTrigger = event.currentTarget

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

  const activeOptionId = computed(() => activeIndex.value >= 0 ? optionId(activeIndex.value) : undefined)
  const menu = html`<div class="${baseClassName}-menu ${baseClassName}-menu-${currentPlacement}" id="${listboxId}" role="listbox" aria-label="${computed(() => `${accessibleLabel.value} options`)}" ?hidden=${computed(() => !open.value)}>${optionMarkup}</div>`
  const message = computed(() => hasDescription.value
    ? html`<span id="${messageId}" class="${baseClassName}-message ${hasError.value ? `${baseClassName}-message-error` : ''}" role="${hasError.value ? 'alert' : undefined}">${descriptionValue}</span>`
    : null)

  const formLifecycle = component(SelectFormLifecycle, { triggerId, required, disabled, formValue, invalid })

  return html`<div class="${baseClassName} ${baseClassName}-${sizeValue} ${classValue}" style="${styleValue}"><button type="button" class="${baseClassName}-trigger" id="${triggerId}" role="combobox" aria-haspopup="listbox" aria-expanded="${open}" aria-controls="${listboxId}" aria-activedescendant="${activeOptionId}" aria-label="${accessibleLabel}" aria-describedby="${describedBy}" aria-required="${computed(() => isRequired() ? 'true' : undefined)}" aria-invalid="${computed(() => invalidValue.value ? 'true' : undefined)}" ?disabled=${disabled} @click=${toggleMenu} @keydown=${handleKeyDown} @focus=${onFocus} @blur=${onBlur}><span class="${baseClassName}-value">${selectedLabel}</span><span class="${baseClassName}-chevron" aria-hidden="true"></span></button>${name === undefined ? null : html`<input type="hidden" name="${name}" .value=${formValue} ?disabled=${disabled}>`}${message}${formLifecycle}${menu}</div>`
}

export const SelectComponent = props => component(Select, props)
