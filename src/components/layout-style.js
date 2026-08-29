import { computed } from 'matrix'

const reactiveKinds = new Set(['signal', 'computed'])

const isReactive = value => reactiveKinds.has(value?.kind)

const readValue = (value, fallback) => isReactive(value)
  ? value.value
  : value === undefined || value === null ? fallback : value

export function createLayoutStyle(props = {}) {
  return computed(() => {
    const baseStyle = readValue(props.style)
    const stickyEnabled = readValue(props.sticky, false)
    const stickyTop = readValue(props.stickyTop)
    const stickyStyle = stickyEnabled
      ? {
          position: 'sticky',
          top: stickyTop ?? '0px',
          alignSelf: 'start'
        }
      : null

    if (typeof baseStyle === 'string') {
      const stickyText = stickyStyle
        ? Object.entries(stickyStyle)
          .map(([name, value]) => `${name}: ${value}`)
          .join('; ')
        : ''

      return [baseStyle, stickyText].filter(Boolean).join('; ')
    }

    if (typeof baseStyle === 'object' && baseStyle !== null) {
      return Object.fromEntries(
        Object.entries({ ...baseStyle, ...(stickyStyle ?? {}) })
          .filter(([, value]) => value !== undefined && value !== null)
      )
    }

    return stickyStyle ?? {}
  })
}
