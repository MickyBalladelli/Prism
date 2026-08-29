import { component, computed, html } from 'matrix'
import { Badge } from './badge.js'
import { normalizeTreeViewModel } from './tree-view-models.js'

function renderMeta(meta) {
  return meta === undefined || meta === null
    ? null
    : component(Badge, { value: meta, pulseOnChange: true, class: 'prism-tree-meta' })
}

function renderLeaf(item = {}, onKeyDown) {
  const {
    label = 'Untitled',
    href,
    onClick,
    active = false,
    meta
  } = item

  const content = html`
    <span class="prism-tree-entry-copy">
      <span class="prism-tree-dot" aria-hidden="true"></span>
      <span class="prism-tree-label">${label}</span>
    </span>
    ${renderMeta(meta)}
  `

  const classValue = active
    ? 'prism-tree-link prism-tree-link-active'
    : 'prism-tree-link'

  if (href !== undefined) {
    return html`<li class="prism-tree-leaf"><a class="${classValue}" href="${href}" role="treeitem" @click=${onClick} @keydown=${onKeyDown}>${content}</a></li>`
  }

  if (onClick) {
    return html`<li class="prism-tree-leaf"><button type="button" class="${classValue}" role="treeitem" @click=${onClick} @keydown=${onKeyDown}>${content}</button></li>`
  }

  return html`<li class="prism-tree-leaf"><div class="${classValue}" role="treeitem" tabindex="0" @keydown=${onKeyDown}>${content}</div></li>`
}

function renderBranch(item = {}, onKeyDown, onToggle) {
  const {
    label = 'Section',
    children = [],
    expanded = true,
    meta
  } = item

  return html`
    <li class="prism-tree-branch">
      <details class="prism-tree-details" ?open=${expanded} @toggle=${onToggle}>
        <summary class="prism-tree-summary" role="treeitem" aria-expanded="${expanded}" @keydown=${onKeyDown}>
          <span class="prism-tree-entry-copy">
            <span class="prism-tree-toggle" aria-hidden="true">
              <span class="prism-tree-toggle-bar prism-tree-toggle-bar-horizontal"></span>
              <span class="prism-tree-toggle-bar prism-tree-toggle-bar-vertical"></span>
            </span>
            <span class="prism-tree-marker" aria-hidden="true"></span>
            <span class="prism-tree-label">${label}</span>
          </span>
          ${renderMeta(meta)}
        </summary>
        <ul class="prism-tree-list prism-tree-list-nested" role="group">
          ${children.map(child => renderItem(child, onKeyDown, onToggle))}
        </ul>
      </details>
    </li>
  `
}

function renderItem(item = {}, onKeyDown, onToggle) {
  return Array.isArray(item.children) && item.children.length > 0
    ? renderBranch(item, onKeyDown, onToggle)
    : renderLeaf(item, onKeyDown)
}

export function TreeView(props = {}) {
  const {
    items = [],
    class: classValue = '',
    id,
    ariaLabel = 'Tree view',
    model = 'prism'
  } = props

  const itemList = items?.kind === 'signal' || items?.kind === 'computed'
    ? items.value
    : items
  const modelValue = model?.kind === 'signal' || model?.kind === 'computed'
    ? computed(() => normalizeTreeViewModel(model.value))
    : normalizeTreeViewModel(model)

  const getVisibleEntries = root => [...root.querySelectorAll('.prism-tree-summary, .prism-tree-link')]
    .filter(entry => {
      let ancestor = entry.parentElement
      while (ancestor && ancestor !== root) {
        if (ancestor.tagName === 'DETAILS' && !ancestor.open && ancestor.firstElementChild !== entry) {
          return false
        }
        ancestor = ancestor.parentElement
      }
      return true
    })

  const getParentSummary = entry => {
    if (entry.matches('.prism-tree-summary')) {
      const parentDetails = entry.closest('details')?.parentElement?.closest('details')
      return parentDetails?.querySelector(':scope > .prism-tree-summary')
    }

    const details = entry.closest('details')
    return details?.querySelector(':scope > .prism-tree-summary')
  }

  const syncBranchState = summary => {
    if (!summary) {
      return null
    }

    const details = summary.closest('details')
    if (details) {
      summary.setAttribute('aria-expanded', String(details.open))
    }
    return details
  }

  const handleToggle = event => {
    const summary = event.currentTarget.querySelector(':scope > .prism-tree-summary')
    syncBranchState(summary)
  }

  const handleKeyDown = event => {
    const entry = event.currentTarget
    const root = entry.closest('.prism-tree-view')
    if (!root) {
      return
    }

    const entries = getVisibleEntries(root)
    const currentIndex = entries.indexOf(entry)
    const focusEntry = index => {
      const nextEntry = entries[index]
      if (nextEntry) {
        event.preventDefault()
        nextEntry.focus()
      }
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const direction = event.key === 'ArrowDown' ? 1 : -1
      const nextIndex = (currentIndex + direction + entries.length) % entries.length
      focusEntry(nextIndex)
      return
    }

    if (event.key === 'Home' || event.key === 'End') {
      focusEntry(event.key === 'Home' ? 0 : entries.length - 1)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      entry.click?.()
      return
    }

    if (event.key === 'ArrowRight') {
      const details = entry.matches('.prism-tree-summary') ? entry.closest('details') : null
      if (details && !details.open) {
        details.open = true
        syncBranchState(entry)
        event.preventDefault()
      }
      return
    }

    if (event.key === 'ArrowLeft') {
      const details = entry.matches('.prism-tree-summary') ? entry.closest('details') : null
      if (details?.open) {
        details.open = false
        syncBranchState(entry)
        event.preventDefault()
        return
      }

      const parentSummary = getParentSummary(entry)
      if (parentSummary && parentSummary !== entry) {
        event.preventDefault()
        parentSummary.focus()
      }
      return
    }

    if (event.key === 'Escape') {
      const details = entry.closest('details')
      if (details?.open) {
        const summary = details.querySelector(':scope > .prism-tree-summary')
        details.open = false
        syncBranchState(summary)
        event.preventDefault()
        summary?.focus()
      }
      return
    }

    if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey && entries.length > 0) {
      event.preventDefault()
      const key = event.key.toLocaleLowerCase()
      const start = currentIndex >= 0 ? currentIndex : 0

      for (let offset = 1; offset <= entries.length; offset += 1) {
        const index = (start + offset) % entries.length
        const label = entries[index].querySelector('.prism-tree-label')?.textContent?.trim().toLocaleLowerCase() ?? ''
        if (label.startsWith(key)) {
          entries[index].focus()
          return
        }
      }
    }
  }

  if (id === undefined) {
    return html`<nav class="prism-tree-view prism-tree-model-${modelValue} ${classValue}" aria-label="${ariaLabel}"><ul class="prism-tree-list" role="tree">${itemList.map(item => renderItem(item, handleKeyDown, handleToggle))}</ul></nav>`
  }

  return html`<nav class="prism-tree-view prism-tree-model-${modelValue} ${classValue}" id="${id}" aria-label="${ariaLabel}"><ul class="prism-tree-list" role="tree">${itemList.map(item => renderItem(item, handleKeyDown, handleToggle))}</ul></nav>`
}

export const TreeViewComponent = props => component(TreeView, props)
