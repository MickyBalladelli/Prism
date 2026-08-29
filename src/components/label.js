import { component, computed, html } from 'matrix'

const baseClassName = 'prism-label'
const reactiveKinds = new Set(['signal', 'computed'])
const sizes = Object.freeze(['small', 'medium', 'large', 'display'])
const fonts = Object.freeze(['sans', 'serif', 'mono'])
const weights = Object.freeze(['regular', 'medium', 'semibold', 'bold'])
const tones = Object.freeze(['ink', 'muted', 'accent', 'inverse'])

const isReactive = value => reactiveKinds.has(value?.kind)

const readValue = (value, fallback) => isReactive(value)
  ? value.value
  : value === undefined || value === null ? fallback : value

const normalizeChoice = (value, options, fallback) => options.includes(value)
  ? value
  : fallback

function createStyleValue(props) {
  return computed(() => {
    const customStyle = readValue(props.style)
    const style = typeof customStyle === 'object' && customStyle !== null
      ? { ...customStyle }
      : customStyle

    const variables = {
      '--prism-label-size': readValue(props.fontSize),
      '--prism-label-font': readValue(props.fontFamily),
      '--prism-label-weight': readValue(props.fontWeight),
      '--prism-label-tracking': readValue(props.letterSpacing),
      '--prism-label-leading': readValue(props.lineHeight)
    }

    if (typeof style === 'string') {
      const variableText = Object.entries(variables)
        .filter(([, value]) => value !== undefined && value !== null && value !== '')
        .map(([name, value]) => `${name}: ${value}`)
        .join('; ')
      return [style, variableText].filter(Boolean).join('; ')
    }

    const nextStyle = style ?? {}
    return Object.fromEntries(Object.entries({ ...nextStyle, ...variables })
      .filter(([, value]) => value !== undefined && value !== null && value !== ''))
  })
}

export function Label(props = {}) {
  const {
    children = [],
    class: classValue = '',
    id,
    htmlFor,
    size = 'medium',
    font = 'sans',
    weight = 'semibold',
    tone = 'ink',
    alwaysVisible = false,
    fontSize,
    fontFamily,
    fontWeight,
    letterSpacing,
    lineHeight,
    style
  } = props

  const classNames = computed(() => [
    baseClassName,
    `${baseClassName}-size-${normalizeChoice(readValue(size, 'medium'), sizes, 'medium')}`,
    `${baseClassName}-font-${normalizeChoice(readValue(font, 'sans'), fonts, 'sans')}`,
    `${baseClassName}-weight-${normalizeChoice(readValue(weight, 'semibold'), weights, 'semibold')}`,
    `${baseClassName}-tone-${normalizeChoice(readValue(tone, 'ink'), tones, 'ink')}`,
    readValue(alwaysVisible, false) ? `${baseClassName}-always-visible` : '',
    classValue
  ].filter(Boolean).join(' '))

  const styleValue = createStyleValue({
    style,
    fontSize,
    fontFamily,
    fontWeight,
    letterSpacing,
    lineHeight
  })

  if (htmlFor !== undefined) {
    return html`<label class="${classNames}" id="${id}" for="${htmlFor}" style="${styleValue}">${children}</label>`
  }

  return html`<span class="${classNames}" id="${id}" style="${styleValue}">${children}</span>`
}

export const LabelComponent = props => component(Label, props)
