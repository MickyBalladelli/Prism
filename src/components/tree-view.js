import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Badge } from './badge.js'
import { normalizeTreeViewModel } from '../tree-view-models.js'
import { isReactiveValue, readReactiveValue } from '../reactive.js'

const itemVariants = new Set(['framed', 'minimal'])
let treeId = 0

const isReactive = isReactiveValue
const readValue = readReactiveValue
const normalizeItemVariant = value => itemVariants.has(value) ? value : 'framed'

function renderMeta(meta) {
  return meta === undefined || meta === null
    ? null
    : component(Badge, { value: meta, pulseOnChange: true, class: 'prism-tree-meta' })
}

function renderLabel(item, label, onRender, context) {
  return typeof onRender === 'function'
    ? onRender({ ...item, label }, context)
    : label
}

function TreeLeaf({ item = {}, itemKey, domId, depth, position, setSize, onRender, onKeyDown, setFocus, getTabIndex }) {
  const {
    label = 'Untitled',
    href,
    onClick,
    active = false,
    meta
  } = item
  const tabIndex = computed(() => getTabIndex(itemKey))
  const content = html`
    <span class="prism-tree-entry-copy">
      <span class="prism-tree-dot" aria-hidden="true"></span>
      <span class="prism-tree-label">${renderLabel(item, label, onRender, { location: 'item', type: 'leaf', selected: active, depth })}</span>
    </span>
    ${renderMeta(meta)}
  `
  const classValue = active
    ? 'prism-tree-link prism-tree-link-active'
    : 'prism-tree-link'
  const handleClick = event => {
    onClick?.(event)
    setFocus(itemKey)
  }
  if (href !== undefined) {
    return html`<li class="prism-tree-leaf"><a class="${classValue}" id="${domId}" role="treeitem" aria-level="${depth + 1}" aria-posinset="${position}" aria-setsize="${setSize}" aria-current="${active ? 'page' : undefined}" tabindex="${tabIndex}" data-tree-key="${itemKey}" @click=${handleClick} @focus=${() => setFocus(itemKey)} @keydown=${onKeyDown}>${content}</a></li>`
  }

  if (onClick) {
    return html`<li class="prism-tree-leaf"><button type="button" class="${classValue}" id="${domId}" role="treeitem" aria-level="${depth + 1}" aria-posinset="${position}" aria-setsize="${setSize}" aria-current="${active ? 'true' : undefined}" tabindex="${tabIndex}" data-tree-key="${itemKey}" @click=${handleClick} @focus=${() => setFocus(itemKey)} @keydown=${onKeyDown}>${content}</button></li>`
  }

  return html`<li class="prism-tree-leaf"><div class="${classValue}" id="${domId}" role="treeitem" aria-level="${depth + 1}" aria-posinset="${position}" aria-setsize="${setSize}" aria-current="${active ? 'true' : undefined}" tabindex="${tabIndex}" data-tree-key="${itemKey}" @focus=${() => setFocus(itemKey)} @keydown=${onKeyDown}>${content}</div></li>`
}

function TreeBranch({ item = {}, itemKey, domId, depth, position, setSize, onRender, onKeyDown, setFocus, getTabIndex, getExpanded, setExpanded, getItemKey, getDomId, renderItem }) {
  const {
    label = 'Section',
    active = false,
    onClick,
    meta
  } = item
  const expanded = computed(() => getExpanded(itemKey, item))
  const tabIndex = computed(() => getTabIndex(itemKey))
  const childItems = computed(() => {
    const children = readValue(item.children, [])
    return Array.isArray(children) ? children : []
  })
  const childMarkup = computed(() => childItems.value.map((child, index) => {
    const childKey = getItemKey(child, index, itemKey)
    return renderItem(child, {
      onRender,
      onKeyDown,
      setFocus,
      getTabIndex,
      getExpanded,
      setExpanded,
      getItemKey,
      getDomId,
      renderItem,
      key: childKey,
      itemKey: childKey,
      domId: getDomId(childKey),
      depth: depth + 1,
      position: index + 1,
      setSize: childItems.value.length,
      parentKey: itemKey
    })
  }))
  const summaryClass = active
    ? 'prism-tree-summary prism-tree-summary-active'
    : 'prism-tree-summary'
  const groupId = `${domId}-group`

  const handleSummaryClick = event => {
    event.preventDefault()
    onClick?.(event)
    setFocus(itemKey)
    setExpanded(itemKey, !expanded.value, item)
  }

  return html`
    <li class="prism-tree-branch">
      <details class="prism-tree-details" .open=${expanded}>
        <summary
          class="${summaryClass}"
          id="${domId}"
          role="treeitem"
          aria-level="${depth + 1}"
          aria-posinset="${position}"
          aria-setsize="${setSize}"
          aria-expanded="${expanded}"
          aria-owns="${groupId}"
          tabindex="${tabIndex}"
          data-tree-key="${itemKey}"
          @click=${handleSummaryClick}
          @focus=${() => setFocus(itemKey)}
          @keydown=${onKeyDown}
        >
          <span class="prism-tree-entry-copy">
            <span class="prism-tree-toggle" aria-hidden="true">
              <span class="prism-tree-toggle-bar prism-tree-toggle-bar-horizontal"></span>
              <span class="prism-tree-toggle-bar prism-tree-toggle-bar-vertical"></span>
            </span>
            <span class="prism-tree-marker" aria-hidden="true"></span>
            <span class="prism-tree-label">${renderLabel(item, label, onRender, { location: 'item', type: 'branch', selected: active, expanded: expanded.value, depth })}</span>
          </span>
          ${renderMeta(meta)}
        </summary>
        <ul class="prism-tree-list prism-tree-list-nested" id="${groupId}" role="group">
          ${childMarkup}
        </ul>
      </details>
    </li>
  `
}

function renderItem(item = {}, context) {
  const children = readValue(item.children, undefined)
  const isBranch = item.hasChildren === true || Array.isArray(children) || isReactive(item.children)
  const itemKey = context.itemKey ?? context.key
  const props = { ...context, item, itemKey }
  if (!isBranch) {
    return component(TreeLeaf, props, itemKey)
  }

  return component(TreeBranch, props, itemKey)
}

export function TreeView(props = {}) {
  const {
    items = [],
    class: classValue = '',
    id,
    ariaLabel = 'Tree view',
    model = 'prism',
    itemVariant = 'framed',
    expanded,
    onExpandedChange,
    onRender
  } = props

  const instanceId = id ?? `prism-tree-${treeId += 1}`
  const isReactiveItems = isReactive(items)
  const expandedState = signal({})
  const focusedKey = signal('')
  const isControlledExpansion = expanded !== undefined
  const modelValue = isReactive(model)
    ? computed(() => normalizeTreeViewModel(model.value))
    : normalizeTreeViewModel(model)
  const itemVariantValue = isReactive(itemVariant)
    ? computed(() => normalizeItemVariant(itemVariant.value))
    : normalizeItemVariant(itemVariant)

  const readItems = () => {
    const source = isReactiveItems ? items.value : items
    return Array.isArray(source) ? source : []
  }
  const getChildren = item => {
    const children = readValue(item?.children, [])
    return Array.isArray(children) ? children : []
  }
  const isBranch = item => item?.hasChildren === true || Array.isArray(item?.children) || isReactive(item?.children)
  const getItemKey = (item, index, parentKey = 'root') => String(item?.id ?? `${parentKey}-${index}`)
  const getDomId = key => `${instanceId}-item-${key}`
  const readExpansionMap = () => {
    const source = readValue(expanded, {})
    return source && typeof source === 'object' ? source : {}
  }
  const getExpanded = (key, item) => {
    const controlledMap = readExpansionMap()
    if (Object.prototype.hasOwnProperty.call(controlledMap, key)) {
      return Boolean(controlledMap[key])
    }

    if (Object.prototype.hasOwnProperty.call(expandedState.value, key)) {
      return Boolean(expandedState.value[key])
    }

    return Boolean(readValue(item?.expanded, true))
  }
  const collectRecords = (sourceItems, depth = 0, parentKey = 'root', includeCollapsed = false, records = []) => {
    sourceItems.forEach((item, index) => {
      const key = getItemKey(item, index, parentKey)
      const children = getChildren(item)
      const branch = isBranch(item)
      const expandedValue = branch ? getExpanded(key, item) : false
      records.push({
        item,
        key,
        domId: getDomId(key),
        parentKey,
        depth,
        position: index + 1,
        setSize: sourceItems.length,
        isBranch: branch,
        expanded: expandedValue
      })

      if (branch && (includeCollapsed || expandedValue)) {
        collectRecords(children, depth + 1, key, includeCollapsed, records)
      }
    })

    return records
  }
  const allRecords = computed(() => collectRecords(readItems(), 0, 'root', true))
  const visibleRecords = computed(() => collectRecords(readItems()))
  const focusedTarget = computed(() => {
    const visible = visibleRecords.value
    return visible.some(record => record.key === focusedKey.value)
      ? focusedKey.value
      : visible[0]?.key ?? ''
  })
  const getTabIndex = key => focusedTarget.value === key ? 0 : -1

  const setFocus = key => {
    if (focusedKey.value === key) {
      return
    }
    focusedKey.value = key
  }
  const setExpanded = (key, nextValue, item) => {
    const next = Boolean(nextValue)
    const currentMap = isControlledExpansion ? readExpansionMap() : expandedState.value
    const nextMap = { ...currentMap, [key]: next }
    if (!isControlledExpansion) {
      expandedState.value = nextMap
    }
    onExpandedChange?.(nextMap, item, next)
  }
  const findRecord = key => allRecords.value.find(record => record.key === key)

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

  const focusEntry = (entry, event) => {
    if (!entry) {
      return
    }

    setFocus(entry.dataset.treeKey ?? '')
    event.preventDefault()
    entry.focus()
  }

  const handleKeyDown = event => {
    const entry = event.currentTarget
    const root = entry.closest('.prism-tree-view')
    if (!root) {
      return
    }

    const entries = getVisibleEntries(root)
    const currentIndex = entries.indexOf(entry)
    const moveTo = index => focusEntry(entries[index], event)
    const record = findRecord(entry.dataset.treeKey)

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const direction = event.key === 'ArrowDown' ? 1 : -1
      const nextIndex = (Math.max(currentIndex, 0) + direction + entries.length) % entries.length
      moveTo(nextIndex)
      return
    }

    if (event.key === 'Home' || event.key === 'End') {
      moveTo(event.key === 'Home' ? 0 : entries.length - 1)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      entry.click?.()
      return
    }

    if (event.key === 'ArrowRight' && record?.isBranch) {
      if (!record.expanded) {
        setExpanded(record.key, true, record.item)
        event.preventDefault()
        return
      }

      const firstChild = visibleRecords.value.find(candidate => candidate.parentKey === record.key)
      if (firstChild) {
        focusEntry(entries.find(candidate => candidate.dataset.treeKey === firstChild.key), event)
      }
      return
    }

    if (event.key === 'ArrowLeft') {
      if (record?.isBranch && record.expanded) {
        setExpanded(record.key, false, record.item)
        event.preventDefault()
        return
      }

      const parentSummary = getParentSummary(entry)
      if (parentSummary && parentSummary !== entry) {
        focusEntry(parentSummary, event)
      }
      return
    }

    if (event.key === 'Escape') {
      const details = entry.closest('details')
      const summary = details?.querySelector(':scope > .prism-tree-summary')
      const summaryRecord = findRecord(summary?.dataset.treeKey)
      if (details?.open && summaryRecord) {
        setExpanded(summaryRecord.key, false, summaryRecord.item)
        event.preventDefault()
        focusEntry(summary, event)
      }
      return
    }

    if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey && entries.length > 0) {
      event.preventDefault()
      const searchKey = event.key.toLocaleLowerCase()
      const start = currentIndex >= 0 ? currentIndex : 0

      for (let offset = 1; offset <= entries.length; offset += 1) {
        const index = (start + offset) % entries.length
        const label = entries[index].querySelector('.prism-tree-label')?.textContent?.trim().toLocaleLowerCase() ?? ''
        if (label.startsWith(searchKey)) {
          focusEntry(entries[index], event)
          return
        }
      }
    }
  }

  const itemMarkup = computed(() => {
    const context = {
      onRender,
      onKeyDown: handleKeyDown,
      setFocus,
      getTabIndex,
      getExpanded,
      setExpanded,
      getItemKey,
      getDomId,
      renderItem: (item, childContext) => renderItem(item, childContext)
    }
    return readItems().map((item, index, sourceItems) => {
      const key = getItemKey(item, index)
      return renderItem(item, {
        ...context,
        key,
        domId: getDomId(key),
        depth: 0,
        position: index + 1,
        setSize: sourceItems.length,
        parentKey: 'root'
      })
    })
  })

  const labelValue = computed(() => String(readValue(ariaLabel, 'Tree view') ?? '').trim() || 'Tree view')
  return html`<nav class="prism-tree-view prism-tree-model-${modelValue} prism-tree-items-${itemVariantValue} ${classValue}" id="${instanceId}" aria-label="${labelValue}"><ul class="prism-tree-list" role="tree" aria-label="${labelValue}">${itemMarkup}</ul></nav>`
}

export const TreeViewComponent = props => component(TreeView, props)
