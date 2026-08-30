function getStorage() {
  try {
    return typeof globalThis.localStorage === 'undefined' ? null : globalThis.localStorage
  } catch {
    return null
  }
}

export function readStorageValue(key, fallback = null) {
  const storage = getStorage()
  if (!key || !storage) {
    return fallback
  }

  try {
    return storage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

export function writeStorageValue(key, value) {
  const storage = getStorage()
  if (!key || !storage) {
    return false
  }

  try {
    storage.setItem(key, String(value))
    return true
  } catch {
    return false
  }
}

export function removeStorageValue(key) {
  const storage = getStorage()
  if (!key || !storage) {
    return false
  }

  try {
    storage.removeItem(key)
    return true
  } catch {
    return false
  }
}
