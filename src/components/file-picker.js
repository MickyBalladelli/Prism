import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'
import { UploadIcon } from './icons.js'

const baseClassName = 'file-picker'
const sizes = new Set(['small', 'medium', 'large'])
let filePickerId = 0

const hasContent = value => value !== undefined && value !== null && value !== ''

export function FilePicker(props = {}) {
  const {
    accept,
    ariaDescription,
    ariaDescribedBy,
    ariaInvalid,
    ariaLabel,
    buttonLabel,
    capture,
    class: classValue = '',
    disabled = false,
    emptyText,
    error,
    id,
    label,
    multiple = false,
    name,
    onBlur,
    onChange,
    onFocus,
    onInput,
    required = false,
    size = 'medium',
    style
  } = props

  const inputId = id ?? `prism-file-picker-${++filePickerId}`
  const selectedFiles = signal([])
  const sizeValue = computed(() => sizes.has(String(readReactiveValue(size, 'medium')))
    ? String(readReactiveValue(size, 'medium'))
    : 'medium')
  const multipleValue = computed(() => Boolean(readReactiveValue(multiple, false)))
  const disabledValue = computed(() => Boolean(readReactiveValue(disabled, false)))
  const requiredValue = computed(() => Boolean(readReactiveValue(required, false)))
  const acceptValue = computed(() => readReactiveValue(accept))
  const captureValue = computed(() => {
    const value = readReactiveValue(capture)
    return value === true ? '' : value === false ? undefined : value
  })
  const labelValue = computed(() => readReactiveValue(label))
  const errorValue = computed(() => readReactiveValue(error))
  const descriptionValue = computed(() => hasContent(errorValue.value)
    ? errorValue.value
    : readReactiveValue(ariaDescription))
  const hasDescription = computed(() => hasContent(descriptionValue.value))
  const hasError = computed(() => hasContent(errorValue.value))
  const messageId = `${inputId}-message`
  const describedBy = computed(() => [
    readReactiveValue(ariaDescribedBy),
    hasDescription.value ? messageId : undefined
  ].filter(Boolean).join(' ') || undefined)
  const accessibleLabel = computed(() => {
    const value = readReactiveValue(ariaLabel) ?? labelValue.value
    return String(value ?? 'Choose a file').trim() || 'Choose a file'
  })
  const invalidValue = computed(() => {
    const explicit = readReactiveValue(ariaInvalid)
    return explicit === undefined || explicit === null ? hasError.value : Boolean(explicit)
  })
  const emptyTextValue = computed(() => {
    const value = readReactiveValue(emptyText)
    return hasContent(value) ? String(value) : 'No files selected'
  })
  const buttonLabelValue = computed(() => {
    const value = readReactiveValue(buttonLabel)
    return hasContent(value) ? String(value) : multipleValue.value ? 'Choose files' : 'Choose file'
  })
  const summary = computed(() => {
    const files = selectedFiles.value
    if (!files.length) return emptyTextValue.value
    if (files.length === 1) return files[0]?.name ?? emptyTextValue.value
    return `${files.length} files selected`
  })
  const classNames = computed(() => [
    `prism-${baseClassName}`,
    `prism-${baseClassName}-${sizeValue.value}`,
    invalidValue.value ? `prism-${baseClassName}-invalid` : '',
    classValue
  ].filter(Boolean).join(' '))
  const styleValue = computed(() => readReactiveValue(style))
  const labelMarkup = computed(() => hasContent(labelValue.value)
    ? html`<label class="prism-file-picker-label" for="${inputId}">${labelValue}</label>`
    : null)
  const summaryClass = computed(() => [
    'prism-file-picker-summary',
    selectedFiles.value.length ? '' : 'prism-file-picker-summary-empty'
  ].filter(Boolean).join(' '))
  const message = computed(() => {
    const content = descriptionValue.value
    if (!hasContent(content)) return null
    return html`<span id="${messageId}" class="prism-file-picker-message ${hasError.value ? 'prism-file-picker-message-error' : ''}" role="${hasError.value ? 'alert' : undefined}">${content}</span>`
  })
  const handleChange = event => {
    selectedFiles.value = Array.from(event.currentTarget?.files ?? [])
    onChange?.(event)
  }

  return html`<div class="${classNames}" style="${styleValue}">${labelMarkup}<div class="prism-file-picker-control"><input type="file" class="prism-file-picker-input" id="${inputId}" name="${name}" accept="${acceptValue}" capture="${captureValue}" aria-label="${accessibleLabel}" aria-describedby="${describedBy}" aria-invalid="${computed(() => invalidValue.value ? 'true' : undefined)}" ?multiple=${multipleValue} ?disabled=${disabledValue} ?required=${requiredValue} @input=${onInput} @change=${handleChange} @focus=${onFocus} @blur=${onBlur}><label class="prism-file-picker-trigger" for="${inputId}"><span class="prism-file-picker-action">${UploadIcon({ size: '1em' })}<span>${buttonLabelValue}</span></span><span class="${summaryClass}" aria-live="polite">${summary}</span></label></div>${message}</div>`
}

export const FilePickerComponent = props => component(FilePicker, props)
