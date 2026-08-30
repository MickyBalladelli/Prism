import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

const variants = new Set(['text', 'circle', 'rect'])
const radii = new Set(['small', 'medium', 'pill'])

function cssSize(value) {
  return typeof value === 'number' ? `${value}px` : value
}

export function Skeleton(props = {}) {
  const {
    ariaLabel,
    class: classValue = '',
    height,
    radius = 'medium',
    variant = 'text',
    width = '100%'
  } = props

  const className = computed(() => {
    const currentVariant = readReactiveValue(variant, 'text')
    const currentRadius = readReactiveValue(radius, 'medium')
    return [
      'prism-skeleton',
      `prism-skeleton-${variants.has(currentVariant) ? currentVariant : 'text'}`,
      `prism-skeleton-radius-${radii.has(currentRadius) ? currentRadius : 'medium'}`,
      classValue
    ].filter(Boolean).join(' ')
  })
  const styleValue = computed(() => {
    const widthValue = readReactiveValue(width, '100%')
    const heightValue = readReactiveValue(height)
    const parts = []
    if (widthValue !== undefined && widthValue !== null && widthValue !== '') {
      parts.push(`width:${cssSize(widthValue)}`)
    }
    if (heightValue !== undefined && heightValue !== null && heightValue !== '') {
      parts.push(`height:${cssSize(heightValue)}`)
    }
    return parts.join(';')
  })
  const labelValue = computed(() => {
    const label = readReactiveValue(ariaLabel)
    return label === undefined || label === null || String(label).trim() === ''
      ? undefined
      : String(label)
  })

  return html`
    <span
      class="${className}"
      style="${styleValue}"
      role="${computed(() => labelValue.value ? 'progressbar' : undefined)}"
      aria-label="${labelValue}"
      aria-hidden="${computed(() => labelValue.value ? undefined : 'true')}"
    ></span>
  `
}

export const SkeletonComponent = props => component(Skeleton, props)
