import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

export function Skeleton(props = {}) {
  const {
    ariaLabel,
    class: classValue = '',
    height,
    radius = 'medium',
    variant = 'text',
    width = '100%'
  } = props

  const widthValue = computed(() => readReactiveValue(width, '100%'))
  const heightValue = computed(() => readReactiveValue(height))
  const variantValue = computed(() => readReactiveValue(variant, 'text'))
  const radiusValue = computed(() => readReactiveValue(radius, 'medium'))
  const labelValue = computed(() => readReactiveValue(ariaLabel))

  return html`
    <span
      class="prism-skeleton prism-skeleton-${variantValue.value} prism-skeleton-radius-${radiusValue.value} ${classValue}"
      style="width: ${widthValue.value}; height: ${heightValue.value ?? ''}"
      ${labelValue.value ? `role="progressbar" aria-label="${labelValue.value}"` : 'aria-hidden="true"'}
    ></span>
  `
}

export const SkeletonComponent = props => component(Skeleton, props)
