import { component, html } from 'matrix'

export function TextField(props = {}) {
  const {
    value = '',
    onInput,
    onChange,
    id,
    name,
    placeholder,
    disabled = false,
    required = false,
    size = 'medium'
  } = props

  const sizeValue = size?.kind === 'signal' || size?.kind === 'computed'
    ? size
    : size || 'medium'

  if (value?.kind === 'signal') {
    return html`<input type="text" class="text-field text-field-${sizeValue}" id="${id}" name="${name}" placeholder="${placeholder}" ?disabled=${disabled} ?required=${required} use:bind=${value} @input=${onInput} @change=${onChange}>`
  }

  return html`<input type="text" class="text-field text-field-${sizeValue}" id="${id}" name="${name}" placeholder="${placeholder}" ?disabled=${disabled} ?required=${required} .value=${value} @input=${onInput} @change=${onChange}>`
}

export const TextFieldComponent = props => component(TextField, props)
