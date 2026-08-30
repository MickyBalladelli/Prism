export async function copyText(text) {
  const value = String(text ?? '')

  if (globalThis.navigator?.clipboard?.writeText) {
    await globalThis.navigator.clipboard.writeText(value)
    return
  }

  if (typeof document === 'undefined') {
    throw new Error('Clipboard unavailable')
  }

  const helper = document.createElement('textarea')
  helper.value = value
  helper.setAttribute('readonly', '')
  helper.setAttribute('aria-hidden', 'true')
  helper.style.position = 'fixed'
  helper.style.top = '0'
  helper.style.left = '-9999px'
  helper.style.opacity = '0'

  const parent = document.body ?? document.documentElement
  parent.append(helper)

  try {
    helper.select()
    if (!document.execCommand?.('copy')) {
      throw new Error('Clipboard unavailable')
    }
  } finally {
    helper.remove()
  }
}
