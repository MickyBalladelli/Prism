import { component, computed, html } from '@mickyballadelli/matrix'
import { isReactiveValue, isWritableSignal, readReactiveValue } from '../reactive.js'

const baseClassName = 'check-box'
let checkBoxId = 0

const hasContent = value => value !== undefined && value !== null && value !== ''

export function CheckBox(props = {}) {
  const {
    checked = false,
    children = [],
    onChange,
    onFocus,
    onBlur,
    id,
    name,
    value,
    disabled = false,
    required = false,
    ariaLabel,
    ariaDescription,
    ariaDescribedBy,
    ariaInvalid,
    error,
    class: classValue = '',
    style
  } = props

  const errorValue = computed(() => readReactiveValue(error))
  const descriptionValue = computed(() => hasContent(errorValue.value)
    ? errorValue.value
    : readReactiveValue(ariaDescription))
  const hasError = computed(() => hasContent(errorValue.value))
  const hasDescription = computed(() => hasContent(descriptionValue.value))
  const messageId = id ? `${id}-message` : `prism-check-box-${checkBoxId += 1}-message`
  const describedBy = computed(() => [
    readReactiveValue(ariaDescribedBy),
    hasDescription.value ? messageId : undefined
  ].filter(Boolean).join(' ') || undefined)
  const invalidValue = computed(() => {
    const explicit = readReactiveValue(ariaInvalid)
    return explicit === undefined || explicit === null ? hasError.value : Boolean(explicit)
  })
  const labelClass = computed(() => [
    baseClassName,
    invalidValue.value ? `${baseClassName}-invalid` : '',
    classValue
  ].filter(Boolean).join(' '))
  const styleValue = computed(() => readReactiveValue(style))
  const hasVisibleLabel = Array.isArray(children) ? children.length > 0 : hasContent(children)
  const accessibleLabel = computed(() => hasVisibleLabel
    ? readReactiveValue(ariaLabel)
    : String(readReactiveValue(ariaLabel, 'Checkbox') ?? '').trim() || 'Checkbox')
  const input = isWritableSignal(checked)
    ? html`<input type="checkbox" class="${baseClassName}-input" id="${id}" name="${name}" value="${value}" aria-label="${accessibleLabel}" aria-describedby="${describedBy}" aria-invalid="${computed(() => invalidValue.value ? 'true' : undefined)}" use:bind=${checked} ?disabled=${disabled} ?required=${required} @change=${onChange} @focus=${onFocus} @blur=${onBlur}>`
    : html`<input type="checkbox" class="${baseClassName}-input" id="${id}" name="${name}" value="${value}" aria-label="${accessibleLabel}" aria-describedby="${describedBy}" aria-invalid="${computed(() => invalidValue.value ? 'true' : undefined)}" .checked=${isReactiveValue(checked) ? checked : Boolean(checked)} ?disabled=${disabled} ?required=${required} @change=${onChange} @focus=${onFocus} @blur=${onBlur}>`
  const message = computed(() => {
    const content = descriptionValue.value
    if (!hasContent(content)) {
      return null
    }

    return html`<span id="${messageId}" class="${baseClassName}-message ${hasError.value ? `${baseClassName}-message-error` : ''}" role="${hasError.value ? 'alert' : undefined}">${content}</span>`
  })

  return html`<label class="${labelClass}" style="${styleValue}">${input}${children}${message}</label>`
}

export const CheckBoxComponent = props => component(CheckBox, props)
