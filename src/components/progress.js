import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

const progressTones = new Set(['accent', 'success', 'warning', 'error'])

export function Progress(props = {}) {
  const {
    ariaLabel,
    class: classValue = '',
    indeterminate = false,
    label,
    max = 100,
    showValue = false,
    gradient = false,
    gradientStart = 'var(--prism-color-accent)',
    gradientEnd = 'var(--prism-color-accent-bright)',
    size = 'medium',
    tone = 'accent',
    value,
    style
  } = props

  const valueValue = computed(() => readReactiveValue(value))
  const maxValue = computed(() => Math.max(1, Number(readReactiveValue(max, 100)) || 100))
  const indeterminateValue = computed(() => Boolean(readReactiveValue(indeterminate, false)) || valueValue.value === undefined || valueValue.value === null)
  const progressValue = computed(() => Math.min(maxValue.value, Math.max(0, Number(valueValue.value) || 0)))
  const sizeValue = computed(() => readReactiveValue(size, 'medium'))
  const showValueValue = computed(() => Boolean(readReactiveValue(showValue, false)))
  const toneValue = computed(() => {
    const value = readReactiveValue(tone, 'accent')
    return progressTones.has(value) ? value : 'accent'
  })
  const labelText = computed(() => readReactiveValue(label) ?? readReactiveValue(ariaLabel) ?? 'Progress')
  const ariaLabelValue = computed(() => readReactiveValue(ariaLabel) ?? labelText.value)
  const valueText = computed(() => `${Math.round((progressValue.value / maxValue.value) * 100)}%`)
  const progressClass = computed(() => `prism-progress prism-progress-${sizeValue.value} prism-progress-${toneValue.value} ${classValue}`)
  const valueMarkup = computed(() => showValueValue.value && !indeterminateValue.value
    ? html`<span>${valueText}</span>`
    : null)
  const progressBarClass = computed(() => `${indeterminateValue.value ? 'is-indeterminate' : ''}`)
  const gradientValue = computed(() => Boolean(readReactiveValue(gradient, false)))
  const gradientStartValue = computed(() => readReactiveValue(gradientStart, 'var(--prism-color-accent)'))
  const gradientEndValue = computed(() => readReactiveValue(gradientEnd, 'var(--prism-color-accent-bright)'))
  const progressBarStyle = computed(() => {
    const width = `width: ${indeterminateValue.value ? '35%' : `${(progressValue.value / maxValue.value) * 100}%`}`
    if (!gradientValue.value) return width
    return `${width}; background: linear-gradient(90deg, ${gradientStartValue.value}, ${gradientEndValue.value})`
  })
  const ariaValueNow = computed(() => indeterminateValue.value ? '' : progressValue.value)

  return html`
    <div class="${progressClass}" style="${style ?? ''}">
      <div class="prism-progress-header">
        <span>${labelText}</span>
        ${valueMarkup}
      </div>
      <div
        class="prism-progress-track"
        role="progressbar"
        aria-label="${ariaLabelValue}"
        aria-valuemin="0"
        aria-valuemax="${maxValue}"
        aria-valuenow="${ariaValueNow}"
      >
        <div class="prism-progress-bar ${progressBarClass}" style="${progressBarStyle}"></div>
      </div>
    </div>
  `
}

export const ProgressComponent = props => component(Progress, props)
