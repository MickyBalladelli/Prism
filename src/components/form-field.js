import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

let formFieldId = 0

const hasValue = value => value !== undefined && value !== null && value !== ''

export function FormField(props = {}) {
  const {
    children,
    class: classValue = '',
    control,
    error,
    errorClass = '',
    hint,
    hintClass = '',
    id,
    label,
    labelClass = '',
    required = false,
    style
  } = props

  const fieldId = id ?? `prism-form-field-${++formFieldId}`
  const hintId = `${fieldId}-hint`
  const errorId = `${fieldId}-error`
  const requiredValue = computed(() => Boolean(readReactiveValue(required, false)))
  const hintValue = computed(() => readReactiveValue(hint))
  const errorValue = computed(() => readReactiveValue(error))
  const hasError = computed(() => hasValue(errorValue.value))
  const describedBy = computed(() => {
    const ids = []
    if (hasValue(hintValue.value)) ids.push(hintId)
    if (hasError.value) ids.push(errorId)
    return ids.length ? ids.join(' ') : undefined
  })
  const controlValue = typeof control === 'function'
    ? control({
      id: fieldId,
      ariaDescribedBy: describedBy.value,
      ariaInvalid: hasError.value,
      required: requiredValue.value
    })
    : children

  return html`
    <div class="prism-form-field ${classValue}" style="${style ?? ''}">
      ${hasValue(label) ? html`
        <label class="prism-form-field-label ${labelClass}" for="${fieldId}">
          <span>${label}</span>
          ${requiredValue.value ? html`<span class="prism-form-field-required" aria-hidden="true">*</span>` : ''}
        </label>
      ` : ''}
      <div class="prism-form-field-control">
        ${controlValue}
      </div>
      ${hasValue(hintValue.value) ? html`<div class="prism-form-field-hint ${hintClass}" id="${hintId}">${hintValue.value}</div>` : ''}
      ${hasError.value ? html`<div class="prism-form-field-error ${errorClass}" id="${errorId}" role="alert">${errorValue.value}</div>` : ''}
    </div>
  `
}

export const FormFieldComponent = props => component(FormField, props)
