const placements = new Set(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'right'])

export function normalizePlacement(value, fallback = 'bottom') {
  return placements.has(value) ? value : fallback
}

export function positionFloatingElement(anchor, floating, placement = 'bottom', offset = 8) {
  if (!anchor || !floating) return

  const anchorRect = anchor.getBoundingClientRect()
  const floatingRect = floating.getBoundingClientRect()
  const viewportWidth = document.documentElement.clientWidth
  const viewportHeight = document.documentElement.clientHeight
  const [side, alignment] = placement.split('-')
  let top = anchorRect.bottom + offset
  let left = anchorRect.left

  if (side === 'top') top = anchorRect.top - floatingRect.height - offset
  if (side === 'left') {
    top = anchorRect.top
    left = anchorRect.left - floatingRect.width - offset
  }
  if (side === 'right') {
    top = anchorRect.top
    left = anchorRect.right + offset
  }
  if (side === 'bottom' || side === 'top') {
    if (alignment === 'end') left = anchorRect.right - floatingRect.width
    if (alignment === undefined) left = anchorRect.left + (anchorRect.width - floatingRect.width) / 2
  }
  if (side === 'left' || side === 'right') {
    if (alignment === 'end') top = anchorRect.bottom - floatingRect.height
    if (alignment === undefined) top = anchorRect.top + (anchorRect.height - floatingRect.height) / 2
  }

  const margin = 8
  left = Math.max(margin, Math.min(left, viewportWidth - floatingRect.width - margin))
  top = Math.max(margin, Math.min(top, viewportHeight - floatingRect.height - margin))
  floating.style.left = `${Math.round(left)}px`
  floating.style.top = `${Math.round(top)}px`
}
