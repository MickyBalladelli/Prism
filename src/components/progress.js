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
  const labelValue = computed(() => readReactiveValue(label))
  const labelText = labelValue.value ?? ariaLabel ?? 'Progress'
  const valueText = `${Math.round((progressValue.value / maxValue.value) * 100)}%`

  return html`
    <div class="prism-progress prism-progress-${sizeValue.value} prism-progress-${toneValue.value} ${classValue}" style="${style ?? ''}">
      <div class="prism-progress-header">
        <span>${labelText}</span>
        ${showValueValue.value && !indeterminateValue.value ? html`<span>${valueText}</span>` : ''}
      </div>
      <div
        class="prism-progress-track"
        role="progressbar"
        aria-label="${ariaLabel ?? labelText}"
        aria-valuemin="0"
        aria-valuemax="${maxValue.value}"
        aria-valuenow="${indeterminateValue.value ? '' : progressValue.value}"
      >
        <div class="prism-progress-bar ${indeterminateValue.value ? 'is-indeterminate' : ''}" style="width: ${indeterminateValue.value ? '35%' : `${(progressValue.value / maxValue.value) * 100}%`}"></div>
      </div>
    </div>
  `
}

export const ProgressComponent = props => component(Progress, props)
