import { component, computed, html } from '@mickyballadelli/matrix'
import { isReactiveValue, isWritableSignal, readReactiveValue } from '../reactive.js'

const baseClassName = 'text-field'
const sizes = new Set(['small', 'medium', 'large'])
let fieldId = 0

const hasContent = value => value !== undefined && value !== null && value !== ''

export function TextField(props = {}) {
  const {
    value = '',
    onInput,
    onChange,
    onFocus,
    onBlur,
    id,
    name,
    placeholder,
    disabled = false,
    required = false,
    size = 'medium',
    type = 'text',
    autocomplete,
    inputMode,
    maxLength,
    minLength,
    pattern,
    readOnly = false,
    ariaLabel,
    ariaDescription,
    ariaDescribedBy,
    ariaInvalid,
    error,
    class: classValue = '',
    style
  } = props

  const sizeValue = computed(() => sizes.has(String(readReactiveValue(size, 'medium')))
    ? String(readReactiveValue(size, 'medium'))
    : 'medium')
  const typeValue = computed(() => String(readReactiveValue(type, 'text')))
  const errorValue = computed(() => readReactiveValue(error))
  const descriptionValue = computed(() => hasContent(errorValue.value)
    ? errorValue.value
    : readReactiveValue(ariaDescription))
  const hasError = computed(() => hasContent(errorValue.value))
  const hasDescription = computed(() => hasContent(descriptionValue.value))
  const messageId = id ? `${id}-message` : `prism-text-field-${fieldId += 1}-message`
  const describedBy = computed(() => [
    readReactiveValue(ariaDescribedBy),
    hasDescription.value ? messageId : undefined
  ].filter(Boolean).join(' ') || undefined)
  const invalidValue = computed(() => {
    const explicit = readReactiveValue(ariaInvalid)
    return explicit === undefined || explicit === null ? hasError.value : Boolean(explicit)
  })
  const fieldClass = computed(() => [
    baseClassName,
    `${baseClassName}-${sizeValue.value}`,
    invalidValue.value ? `${baseClassName}-invalid` : '',
    classValue
  ].filter(Boolean).join(' '))
  const styleValue = computed(() => readReactiveValue(style))

  const input = isWritableSignal(value)
    ? null
    : html`<input
      type="${typeValue}"
      class="${fieldClass}"
      id="${id}"
      name="${name}"
      placeholder="${placeholder}"
      autocomplete="${autocomplete}"
      inputmode="${inputMode}"
      maxlength="${maxLength}"
      minlength="${minLength}"
      pattern="${pattern}"
      aria-label="${ariaLabel}"
      aria-describedby="${describedBy}"
      aria-invalid="${computed(() => invalidValue.value ? 'true' : undefined)}"
      .value=${isReactiveValue(value) ? value : String(value ?? '')}
      ?disabled=${disabled}
      ?required=${required}
      ?readonly=${readOnly}
      style="${styleValue}"
      @input=${onInput}
      @change=${onChange}
      @focus=${onFocus}
      @blur=${onBlur}
    >`
  const boundInput = isWritableSignal(value)
    ? html`<input
      type="${typeValue}"
      class="${fieldClass}"
      id="${id}"
      name="${name}"
      placeholder="${placeholder}"
      autocomplete="${autocomplete}"
      inputmode="${inputMode}"
      maxlength="${maxLength}"
      minlength="${minLength}"
      pattern="${pattern}"
      aria-label="${ariaLabel}"
      aria-describedby="${describedBy}"
      aria-invalid="${computed(() => invalidValue.value ? 'true' : undefined)}"
      use:bind=${value}
      ?disabled=${disabled}
      ?required=${required}
      ?readonly=${readOnly}
      style="${styleValue}"
      @input=${onInput}
      @change=${onChange}
      @focus=${onFocus}
      @blur=${onBlur}
    >`
    : input
  const message = computed(() => {
    const content = descriptionValue.value
    if (!hasContent(content)) {
      return null
    }

    return html`<span id="${messageId}" class="${baseClassName}-message ${hasError.value ? `${baseClassName}-message-error` : ''}" role="${hasError.value ? 'alert' : undefined}">${content}</span>`
  })

  return html`${boundInput}${message}`
}

export const TextFieldComponent = props => component(TextField, props)
