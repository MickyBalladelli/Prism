import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { createWritableSignal, readReactiveValue } from '../reactive.js'
import { DatePickerPopup, formatDateInputValue } from './date-picker-popup.js'
import { CalendarIcon, ClockIcon } from './icons.js'

const sizes = new Set(['small', 'medium', 'large'])
let dateInputId = 0

const readValue = readReactiveValue

function hasContent(value) {
  return value !== undefined && value !== null && value !== ''
}

export function createDateInput(props = {}, { baseClassName, dateTime = false, defaultLabel }) {
  const {
    ariaLabel,
    class: classValue = '',
    disabled = false,
    id,
    label,
    max,
    min,
    name,
    onBlur,
    onChange,
    onFocus,
    onInput,
    required = false,
    size = 'medium',
    step,
    style,
    value = ''
  } = props

  const inputId = id ?? `prism-${baseClassName}-${++dateInputId}`
  const sizeValue = computed(() => {
    const nextSize = String(readValue(size, 'medium'))
    return sizes.has(nextSize) ? nextSize : 'medium'
  })
  const selectedValue = createWritableSignal(value, '')
  const pickerOpen = signal(false)
  const pickerControls = {}
  const valueValue = computed(() => String(selectedValue.value ?? ''))
  const displayValue = computed(() => formatDateInputValue(valueValue.value, dateTime))
  const labelValue = computed(() => readValue(label))
  const accessibleLabel = computed(() => {
    const text = readValue(ariaLabel) ?? labelValue.value ?? defaultLabel
    return String(text ?? defaultLabel).trim() || defaultLabel
  })
  const classNames = computed(() => [
    `prism-${baseClassName}`,
    `prism-${baseClassName}-${sizeValue.value}`,
    classValue
  ].filter(Boolean).join(' '))
  const styleValue = computed(() => readValue(style))
  const openPicker = () => pickerControls.open?.()
  const handleInputKeydown = event => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault()
      openPicker()
    }
  }
  const handleCommit = nextValue => {
    selectedValue.value = nextValue
    if (typeof document === 'undefined') {
      return
    }

    const input = document.getElementById(inputId)
    if (!input) {
      return
    }

    input.value = formatDateInputValue(nextValue, dateTime)
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }
  const labelMarkup = computed(() => hasContent(labelValue.value)
    ? html`<label class="prism-date-input-label" for="${inputId}">${labelValue}</label>`
    : null)
  const icon = dateTime ? ClockIcon({ size: '1em' }) : CalendarIcon({ size: '1em' })
  const input = html`<input type="text" class="prism-date-input-control" id="${inputId}" aria-label="${accessibleLabel}" aria-haspopup="dialog" aria-expanded="${pickerOpen}" aria-controls="${inputId}-popup" autocomplete="off" inputmode="none" .value=${displayValue} ?disabled=${disabled} ?required=${required} readonly @click=${openPicker} @keydown=${handleInputKeydown} @focus=${onFocus} @blur=${onBlur}>`
  const trigger = html`<button type="button" class="prism-date-input-trigger" aria-label="Open ${accessibleLabel}" aria-haspopup="dialog" aria-expanded="${pickerOpen}" aria-controls="${inputId}-popup" ?disabled=${disabled} @click=${event => {
    event.stopPropagation()
    openPicker()
  }}>${icon}</button>`
  const hiddenInput = name === undefined ? null : html`<input type="hidden" name="${name}" .value=${valueValue} ?disabled=${disabled}>`
  const popup = component(DatePickerPopup, {
    controls: pickerControls,
    dateTime,
    disabled,
    inputId,
    max,
    min,
    onCommit: handleCommit,
    open: pickerOpen,
    step,
    value: selectedValue
  })

  return html`<div class="${classNames} prism-date-input-${sizeValue.value}" style="${styleValue}">${labelMarkup}<div class="prism-date-input-control-wrap"><div class="prism-date-input-control-row">${input}${trigger}</div>${hiddenInput}${popup}</div></div>`
}
