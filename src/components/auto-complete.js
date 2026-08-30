import { component, computed, html, onMount, signal } from '@mickyballadelli/matrix'
import { isReactiveValue, isWritableSignal, readReactiveValue } from '../reactive.js'
import { normalizeChoice } from '../props.js'
import { normalizePlacement as normalizeFloatingPlacement } from './overlay-utils.js'

const baseClassName = 'prism-auto-complete'
const sizeValues = new Set(['small', 'medium', 'large'])
const placementValues = new Set(['bottom', 'top'])
let autoCompleteId = 0

const readValue = readReactiveValue

function normalizePlacement(value) {
  return normalizeFloatingPlacement(normalizeChoice(value, placementValues, 'bottom'), 'bottom')
}

function normalizeOption(option) {
  if (option && typeof option === 'object') {
    return {
      value: option.value ?? option.label ?? '',
      label: option.label ?? option.value ?? '',
      disabled: Boolean(option.disabled)
    }
  }

  return {
    value: option ?? '',
    label: option ?? '',
    disabled: false
  }
}

function getEnabledIndex(options, start, direction) {
  if (options.length === 0) {
    return -1
  }

  for (let offset = 1; offset <= options.length; offset += 1) {
    const index = (start + direction * offset + options.length * 2) % options.length
    if (!options[index].disabled) {
      return index
    }
  }

  return -1
}

export function AutoComplete(props = {}) {
  const {
    ariaDescribedBy,
    ariaDescription,
    ariaInvalid,
    ariaLabel,
    class: classValue = '',
    disabled = false,
    error,
    id,
    loading = false,
    loadingText = 'Loading suggestions…',
    minChars = 0,
    name,
    noOptionsText = 'No matches found',
    onBlur,
    onChange,
    onFocus,
    onInput,
    onRender,
    onSelect,
    openOnFocus = true,
    options = [],
    placement = 'bottom',
    placeholder = 'Search or choose an option',
    required = false,
    size = 'medium',
    style,
    value = '',
    label
  } = props

  const inputId = id ?? `prism-auto-complete-${autoCompleteId += 1}`
  const listboxId = `${inputId}-listbox`
  const messageId = `${inputId}-message`
  const optionId = index => `${inputId}-option-${index}`
  const open = signal(false)
  const activeIndex = signal(-1)
  const invalid = signal(false)
  const inputValue = isWritableSignal(value)
    ? value
    : signal(readValue(value, ''))
  const sizeValue = computed(() => {
    const nextSize = String(readValue(size, 'medium'))
    return sizeValues.has(nextSize) ? nextSize : 'medium'
  })
  const placementValue = computed(() => normalizePlacement(readValue(placement, 'bottom')))
  const optionList = isReactiveValue(options)
    ? computed(() => (options.value ?? []).map(normalizeOption))
    : (options ?? []).map(normalizeOption)
  const readOptions = () => isReactiveValue(optionList) ? optionList.value : optionList
  const queryValue = computed(() => String(inputValue.value ?? '').trim().toLocaleLowerCase())
  const minimumCharacters = computed(() => Math.max(0, Number(readValue(minChars, 0)) || 0))
  const filteredOptions = computed(() => {
    const query = queryValue.value
    const source = readOptions()
    if (query.length < minimumCharacters.value) {
      return []
    }

    if (!query) {
      return source
    }

    return source.filter(option => String(option.label).toLocaleLowerCase().includes(query))
  })
  const currentOption = computed(() => {
    const current = String(inputValue.value ?? '')
    return readOptions().find(option => String(option.value) === current)
  })
  const errorValue = computed(() => readValue(error))
  const descriptionValue = computed(() => errorValue.value ?? readValue(ariaDescription))
  const hasDescription = computed(() => descriptionValue.value !== undefined && descriptionValue.value !== null && descriptionValue.value !== '')
  const invalidValue = computed(() => {
    const explicit = readValue(ariaInvalid)
    return invalid.value || explicit === true || hasDescription.value && errorValue.value !== undefined && errorValue.value !== null && errorValue.value !== ''
  })
  const accessibleLabel = computed(() => {
    const explicit = readValue(ariaLabel)
    const visible = readValue(label)
    return String(explicit ?? visible ?? 'Autocomplete').trim() || 'Autocomplete'
  })
  const describedBy = computed(() => [
    readValue(ariaDescribedBy),
    hasDescription.value ? messageId : undefined
  ].filter(Boolean).join(' ') || undefined)
  const styleValue = computed(() => readValue(style))
  const openOnFocusValue = computed(() => Boolean(readValue(openOnFocus, true)))
  const loadingValue = computed(() => Boolean(readValue(loading, false)))
  const isDisabled = computed(() => Boolean(readValue(disabled, false)))

  let removeOpenListeners = () => {}
  let inputElement

  const getInitialActiveIndex = () => {
    const selectedIndex = filteredOptions.value.findIndex(option => String(option.value) === String(inputValue.value ?? ''))
    if (selectedIndex >= 0 && !filteredOptions.value[selectedIndex].disabled) {
      return selectedIndex
    }

    return getEnabledIndex(filteredOptions.value, -1, 1)
  }

  const positionMenu = () => {
    if (!inputElement || !open.value) {
      return
    }

    const menu = inputElement.parentElement?.querySelector(`.${baseClassName}-menu`)
    if (!menu) {
      return
    }

    const rect = inputElement.getBoundingClientRect()
    const availableBottom = window.innerHeight - rect.bottom - 8
    const availableTop = rect.top - 8
    const menuHeight = Math.min(288, Math.max(8, menu.scrollHeight))
    const preferred = placementValue.value
    const nextPlacement = preferred === 'bottom' && menuHeight > availableBottom && availableTop > availableBottom
      ? 'top'
      : preferred === 'top' && menuHeight > availableTop && availableBottom >= availableTop
        ? 'bottom'
        : preferred

    menu.classList.toggle(`${baseClassName}-menu-top`, nextPlacement === 'top')
    menu.classList.toggle(`${baseClassName}-menu-bottom`, nextPlacement === 'bottom')
    menu.style.maxHeight = `${Math.min(288, Math.max(8, nextPlacement === 'top' ? availableTop : availableBottom))}px`
  }

  const schedulePosition = () => {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(positionMenu)
      return
    }

    setTimeout(positionMenu, 0)
  }

  const addOpenListeners = () => {
    const closeOnOutsideClick = event => {
      if (!inputElement?.parentElement?.contains(event.target)) {
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

  const openMenu = () => {
    if (isDisabled.value) {
      return
    }

    activeIndex.value = getInitialActiveIndex()
    open.value = true
    removeOpenListeners()
    addOpenListeners()
    schedulePosition()
  }

  const closeMenu = restoreFocus => {
    open.value = false
    activeIndex.value = -1
    removeOpenListeners()
    if (restoreFocus) {
      inputElement?.focus()
    }
  }

  const selectOption = (option, event, index) => {
    if (option.disabled) {
      return
    }

    event.preventDefault()
    inputValue.value = option.value
    activeIndex.value = index
    invalid.value = false
    onSelect?.(option, event)
    onInput?.(event)
    onChange?.(event)
    closeMenu(true)
  }

  const moveActive = direction => {
    const optionsToShow = filteredOptions.value
    const current = activeIndex.value >= 0 ? activeIndex.value : getInitialActiveIndex()
    const next = getEnabledIndex(optionsToShow, current, direction)
    if (next >= 0) {
      activeIndex.value = next
    }
  }

  const moveToBoundary = direction => {
    const optionsToShow = filteredOptions.value
    const next = getEnabledIndex(optionsToShow, direction > 0 ? -1 : optionsToShow.length, direction)
    if (next >= 0) {
      activeIndex.value = next
    }
  }

  const handleInput = event => {
    inputValue.value = event.currentTarget.value
    invalid.value = false
    onInput?.(event)
    openMenu()
  }

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      if (open.value) {
        event.preventDefault()
        closeMenu(true)
      }
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open.value) {
        openMenu()
      }
      moveActive(event.key === 'ArrowDown' ? 1 : -1)
      return
    }

    if (event.key === 'Home' || event.key === 'End') {
      if (!open.value) {
        return
      }
      event.preventDefault()
      moveToBoundary(event.key === 'Home' ? 1 : -1)
      return
    }

    if (event.key === 'Enter' && open.value) {
      const option = filteredOptions.value[activeIndex.value]
      if (option) {
        event.preventDefault()
        selectOption(option, event, activeIndex.value)
      }
      return
    }

    if (event.key === 'Tab') {
      closeMenu(false)
    }
  }

  const labelMarkup = computed(() => label === undefined || label === null || label === ''
    ? null
    : html`<label class="${baseClassName}-label" for="${inputId}">${label}</label>`)
  const optionMarkup = computed(() => filteredOptions.value.map((option, index) => {
    const selected = currentOption.value && String(currentOption.value.value) === String(option.value)
    const active = index === activeIndex.value
    const rendered = typeof onRender === 'function'
      ? onRender(option, { location: 'option', selected, active })
      : option.label
    return html`<button
      type="button"
      class="${baseClassName}-option ${active ? `${baseClassName}-option-active` : ''} ${selected ? `${baseClassName}-option-selected` : ''}"
      id="${optionId(index)}"
      role="option"
      aria-selected="${Boolean(selected)}"
      data-active="${active}"
      ?disabled=${option.disabled}
      @mousedown=${event => event.preventDefault()}
      @click=${event => selectOption(option, event, index)}
    >${rendered}</button>`
  }))
  const menuContent = computed(() => {
    if (loadingValue.value) {
      return html`<div class="${baseClassName}-status" role="status">${readValue(loadingText, 'Loading suggestions…')}</div>`
    }

    if (filteredOptions.value.length === 0) {
      return html`<div class="${baseClassName}-status" role="status">${readValue(noOptionsText, 'No matches found')}</div>`
    }

    return optionMarkup
  })
  const message = computed(() => hasDescription.value
    ? html`<span id="${messageId}" class="${baseClassName}-message ${invalidValue.value ? `${baseClassName}-message-error` : ''}" role="${invalidValue.value ? 'alert' : 'status'}">${descriptionValue}</span>`
    : null)
  const menu = html`<div class="${baseClassName}-menu ${baseClassName}-menu-${placementValue}" id="${listboxId}" role="listbox" aria-label="${computed(() => `${accessibleLabel.value} suggestions`)}" ?hidden=${computed(() => !open.value)}>${menuContent}</div>`

  onMount(root => {
    inputElement = document.getElementById(inputId) ?? root.querySelector('input')
    if (inputElement) {
      inputElement.addEventListener('focus', () => {
        if (openOnFocusValue.value) {
          openMenu()
        }
      })
    }

    return () => {
      removeOpenListeners()
    }
  })

  const activeOptionId = computed(() => activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length
    ? optionId(activeIndex.value)
    : undefined)
  const inputClass = computed(() => [
    `${baseClassName}-input`,
    invalidValue.value ? `${baseClassName}-input-invalid` : ''
  ].filter(Boolean).join(' '))

  return html`<div class="${baseClassName} ${baseClassName}-${sizeValue} ${classValue}" style="${styleValue}">
    ${labelMarkup}
    <div class="${baseClassName}-control">
      <input
        type="text"
        class="${inputClass}"
        id="${inputId}"
        name="${name}"
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded="${open}"
        aria-controls="${listboxId}"
        aria-activedescendant="${activeOptionId}"
        aria-label="${accessibleLabel}"
        aria-describedby="${describedBy}"
        aria-invalid="${computed(() => invalidValue.value ? 'true' : undefined)}"
        .value=${inputValue}
        placeholder="${readValue(placeholder, 'Search or choose an option')}"
        ?disabled=${disabled}
        ?required=${required}
        @input=${handleInput}
        @change=${onChange}
        @keydown=${handleKeyDown}
        @focus=${onFocus}
        @blur=${onBlur}
      >
      <span class="${baseClassName}-chevron" aria-hidden="true"></span>
    </div>
    ${message}
    ${menu}
  </div>`
}

export const AutoCompleteComponent = props => component(AutoComplete, props)
