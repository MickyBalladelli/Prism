import { component, html } from '@mickyballadelli/matrix'
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

  return html`
    <span
      class="prism-skeleton prism-skeleton-${readReactiveValue(variant, 'text')} prism-skeleton-radius-${readReactiveValue(radius, 'medium')} ${classValue}"
      style="width: ${width}; height: ${height ?? ''}"
      ${ariaLabel ? `role="progressbar" aria-label="${ariaLabel}"` : 'aria-hidden="true"'}
    ></span>
  `
}

export const SkeletonComponent = props => component(Skeleton, props)
