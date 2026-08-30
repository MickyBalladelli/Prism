import { signal } from '@mickyballadelli/matrix'

const reactiveKinds = new Set(['signal', 'computed'])

export const isReactiveValue = value => reactiveKinds.has(value?.kind)

export const readReactiveValue = (value, fallback) => isReactiveValue(value)
  ? value.value
  : value === undefined || value === null ? fallback : value

export const isWritableSignal = value => value?.kind === 'signal'

export const createWritableSignal = (value, fallback) => isWritableSignal(value)
  ? value
  : signal(readReactiveValue(value, fallback))
