import { readReactiveValue, isReactiveValue } from './reactive.js'

export const readProp = readReactiveValue

export const normalizeBoolean = (value, fallback = false) => Boolean(readReactiveValue(value, fallback))

export const normalizeString = (value, fallback = '') => {
  const current = readReactiveValue(value, fallback)
  return current === undefined || current === null ? fallback : String(current)
}

export const normalizeNumber = (value, fallback, { min = -Infinity, max = Infinity } = {}) => {
  const current = Number(readReactiveValue(value, fallback))
  if (!Number.isFinite(current)) {
    return fallback
  }

  return Math.min(max, Math.max(min, current))
}

export const normalizeChoice = (value, allowed, fallback) => {
  const current = readReactiveValue(value, fallback)
  return allowed.has(current) ? current : fallback
}

export const normalizeArray = (value, fallback = []) => {
  const current = readReactiveValue(value, fallback)
  return Array.isArray(current) ? current : fallback
}

export { isReactiveValue }
