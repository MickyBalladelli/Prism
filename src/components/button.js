import { component, computed, html } from '@mickyballadelli/matrix'

const baseClassName = 'prism-button'
const variants = new Set(['primary', 'secondary', 'tertiary', 'error', 'warning', 'information', 'success'])
const sizes = new Set(['small', 'medium', 'large'])
const shapes = new Set(['rounded', 'pill', 'square'])
const iconPositions = new Set(['start', 'end'])
const reactiveKinds = new Set(['signal', 'computed'])

const isReactive = value => reactiveKinds.has(value?.kind)
const readValue = (value, fallback) => isReactive(value)
  ? value.value
  : value === undefined || value === null ? fallback : value

export function Button(props = {}) {
  const {
    children = [],
    label,
    showLabel = true,
    icon,
    iconPosition = 'start',
    class: classValue = '',
    id,
    type = 'button',
    name,
    value,
    variant = 'primary',
    size = 'medium',
    shape = 'rounded',
    fullWidth = false,
    loading = false,
    loadingLabel = 'Loading',
    pressed,
    disabled = false,
    ariaLabel,
    title,
    onClick,
    onFocus,
    onBlur
  } = props

  const buttonClass = computed(() => {
    const currentVariant = variants.has(readValue(variant)) ? readValue(variant) : 'primary'
    const currentSize = sizes.has(readValue(size)) ? readValue(size) : 'medium'
    const currentShape = shapes.has(readValue(shape)) ? readValue(shape) : 'rounded'
    const labelVisible = readValue(showLabel, true)

    return [
      baseClassName,
      `${baseClassName}-${currentVariant}`,
      `${baseClassName}-${currentSize}`,
      `${baseClassName}-${currentShape}`,
      labelVisible ? '' : `${baseClassName}-icon-only`,
      readValue(fullWidth, false) ? `${baseClassName}-full-width` : '',
      readValue(loading, false) ? `${baseClassName}-loading` : '',
      readValue(pressed, false) ? `${baseClassName}-pressed` : '',
      classValue
    ].filter(Boolean).join(' ')
  })

  const buttonContent = computed(() => {
    const labelVisible = readValue(showLabel, true)
    const currentPosition = iconPositions.has(readValue(iconPosition)) ? readValue(iconPosition) : 'start'
    const labelContent = readValue(loading, false)
      ? readValue(loadingLabel, 'Loading')
      : label === undefined ? children : label
    const iconContent = readValue(loading, false)
      ? html`<span class="${baseClassName}-spinner" aria-hidden="true"></span>`
      : readValue(icon)
    const iconMarkup = iconContent === undefined || iconContent === null
      ? null
      : html`<span class="${baseClassName}-icon" aria-hidden="true">${iconContent}</span>`
    const labelMarkup = labelVisible
      ? html`<span class="${baseClassName}-label">${labelContent}</span>`
      : null

    return currentPosition === 'end' && labelVisible
      ? html`${labelMarkup}${iconMarkup}`
      : html`${iconMarkup}${labelMarkup}`
  })

  const disabledValue = computed(() => readValue(disabled, false) || readValue(loading, false))
  const busyValue = computed(() => String(readValue(loading, false)))
  const pressedValue = computed(() => pressed === undefined ? undefined : String(readValue(pressed, false)))
  const accessibleLabel = computed(() => {
    const explicitLabel = readValue(ariaLabel)
    if (explicitLabel !== undefined) {
      return explicitLabel
    }

    if (readValue(loading, false)) {
      return readValue(loadingLabel, 'Loading')
    }

    if (!readValue(showLabel, true)) {
      const labelContent = readValue(label === undefined ? children : label)
      return typeof labelContent === 'string' || typeof labelContent === 'number'
        ? String(labelContent)
        : undefined
    }

    return undefined
  })

  return html`<button type="${type}" class="${buttonClass}" id="${id}" name="${name}" value="${value}" title="${title}" aria-label="${accessibleLabel}" aria-busy="${busyValue}" aria-pressed="${pressedValue}" ?disabled=${disabledValue} @click=${onClick} @focus=${onFocus} @blur=${onBlur}>${buttonContent}</button>`
}

export const ButtonComponent = props => component(Button, props)
