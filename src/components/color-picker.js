import { component, computed, html } from '@mickyballadelli/matrix'
import { isWritableSignal, readReactiveValue } from '../reactive.js'

const baseClassName = 'color-picker'
const sizes = new Set(['small', 'medium', 'large'])
let colorPickerId = 0

const normalizeColor = value => {
  const color = String(value ?? '').trim()
  return /^#[0-9a-f]{6}$/i.test(color) ? color : '#000000'
}

export function ColorPicker(props = {}) {
  const {
    ariaLabel,
    class: classValue = '',
    disabled = false,
    id,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    onInput,
    required = false,
    showValue = true,
    size = 'medium',
    style,
    value = '#000000'
  } = props

  const inputId = id ?? `prism-color-picker-${++colorPickerId}`
  const sizeValue = computed(() => sizes.has(String(readReactiveValue(size, 'medium'))) ? String(readReactiveValue(size, 'medium')) : 'medium')
  const colorValue = computed(() => normalizeColor(readReactiveValue(value, '#000000')))
  const labelValue = computed(() => readReactiveValue(label))
  const accessibleLabel = computed(() => {
    const text = readReactiveValue(ariaLabel) ?? labelValue.value
    return String(text ?? 'Color').trim() || 'Color'
  })
  const showValueValue = computed(() => Boolean(readReactiveValue(showValue, true)))
  const classNames = computed(() => [
    `prism-${baseClassName}`,
    `prism-${baseClassName}-${sizeValue.value}`,
    classValue
  ].filter(Boolean).join(' '))
  const styleValue = computed(() => readReactiveValue(style))
  const labelMarkup = computed(() => {
    if (labelValue.value === undefined || labelValue.value === null || labelValue.value === '') return null
    return html`<label class="prism-color-picker-label" for="${inputId}">${labelValue}</label>`
  })
  const valueMarkup = computed(() => showValueValue.value
    ? html`<code class="prism-color-picker-value">${colorValue}</code>`
    : null)
  const input = isWritableSignal(value)
    ? html`<input type="color" class="prism-color-picker-input" id="${inputId}" name="${name}" aria-label="${accessibleLabel}" use:bind=${value} ?disabled=${disabled} ?required=${required} @input=${onInput} @change=${onChange} @focus=${onFocus} @blur=${onBlur}>`
    : html`<input type="color" class="prism-color-picker-input" id="${inputId}" name="${name}" aria-label="${accessibleLabel}" .value=${colorValue} ?disabled=${disabled} ?required=${required} @input=${onInput} @change=${onChange} @focus=${onFocus} @blur=${onBlur}>`

  return html`<div class="${classNames}" style="${styleValue}">${labelMarkup}<div class="prism-color-picker-control">${input}${valueMarkup}</div></div>`
}

export const ColorPickerComponent = props => component(ColorPicker, props)
