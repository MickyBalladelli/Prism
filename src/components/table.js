import { component, computed, html, keyed, signal } from '@mickyballadelli/matrix'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CopyIcon,
  DownloadIcon,
  SearchIcon,
  SettingsIcon
} from './icons.js'
import { copyText } from './clipboard.js'
import { readStorageValue, removeStorageValue, writeStorageValue } from '../storage.js'
import { createWritableSignal, isReactiveValue, isWritableSignal, readReactiveValue } from '../reactive.js'

const baseClassName = 'prism-table'
const directions = new Set(['asc', 'desc'])
const alignments = new Set(['start', 'center', 'end'])
const densities = new Set(['compact', 'comfortable', 'spacious'])
const pinnedSides = new Set(['left', 'right', 'none'])

const isReactive = isReactiveValue
const readValue = readReactiveValue
const createWritable = createWritableSignal

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum)
}

function normalizePageSize(value, fallback = 10) {
  if (value === 'all' || value === 'max') {
    return 'all'
  }

  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : fallback
}

function normalizeSort(value) {
  if (!value || typeof value !== 'object' || !value.key || !directions.has(value.direction)) {
    return null
  }

  return {
    key: String(value.key),
    direction: value.direction
  }
}

function normalizeSettings(value) {
  const parsed = parseTableSettings(value)
  if (!parsed) {
    return {}
  }

  return {
    version: 1,
    columnOrder: Array.isArray(parsed.columnOrder) ? parsed.columnOrder.map(String) : undefined,
    columnWidths: parsed.columnWidths && typeof parsed.columnWidths === 'object' ? parsed.columnWidths : undefined,
    hiddenColumns: Array.isArray(parsed.hiddenColumns) ? parsed.hiddenColumns.map(String) : undefined,
    pinnedColumns: parsed.pinnedColumns && typeof parsed.pinnedColumns === 'object'
      ? Object.fromEntries(Object.entries(parsed.pinnedColumns)
        .filter(([, side]) => pinnedSides.has(side))
        .map(([key, side]) => [String(key), side]))
      : undefined,
    sort: normalizeSort(parsed.sort),
    pageSize: parsed.pageSize === 'all' ? 'all' : normalizePageSize(parsed.pageSize),
    density: densities.has(parsed.density) ? parsed.density : undefined
  }
}

export function serializeTableSettings(settings) {
  return JSON.stringify(normalizeSettings(settings), null, 2)
}

export function parseTableSettings(value) {
  if (!value) {
    return null
  }

  if (typeof value === 'object') {
    return value
  }

  try {
    const parsed = JSON.parse(String(value))
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

function readStoredSettings(storageKey, fallback) {
  return normalizeSettings(readStorageValue(storageKey, fallback))
}

function writeStoredSettings(storageKey, value) {
  writeStorageValue(storageKey, value)
}

function removeStoredSettings(storageKey) {
  removeStorageValue(storageKey)
}

function normalizeColumn(column, index) {
  const source = column && typeof column === 'object' ? column : { key: column }
  const key = String(source.key ?? source.accessor ?? `column-${index + 1}`)

  return {
    ...source,
    key,
    header: source.header ?? key,
    align: alignments.has(source.align) ? source.align : 'start',
    sortable: source.sortable !== false,
    searchable: source.searchable !== false,
    resizable: source.resizable !== false,
    reorderable: source.reorderable !== false,
    pinnable: source.pinnable !== false,
    hideable: source.hideable !== false,
    minWidth: Number(source.minWidth) || 96,
    maxWidth: Number(source.maxWidth) || 720
  }
}

function getPathValue(source, path) {
  return String(path).split('.').reduce((value, key) => value?.[key], source)
}

function getCellValue(row, column, rowIndex) {
  if (typeof column.accessor === 'function') {
    return column.accessor(row, rowIndex)
  }

  return getPathValue(row, column.accessor ?? column.key)
}

function valueToSearchText(value) {
  if (value === undefined || value === null) {
    return ''
  }

  if (Array.isArray(value)) {
    return value.map(valueToSearchText).join(' ')
  }

  if (typeof value === 'object') {
    return Object.values(value).map(valueToSearchText).join(' ')
  }

  return String(value)
}

function compareValues(left, right) {
  if (left === right) {
    return 0
  }

  if (left === undefined || left === null) {
    return 1
  }

  if (right === undefined || right === null) {
    return -1
  }

  if (typeof left === 'number' && typeof right === 'number') {
    return left - right
  }

  return String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: 'base' })
}

function escapeCsv(value) {
  const text = valueToSearchText(value).replaceAll('"', '""')
  return /[",\n]/.test(text) ? `"${text}"` : text
}

function resolveWidth(width, fallback) {
  if (typeof width === 'number') {
    return `${width}px`
  }

  return width ?? fallback
}

function numericWidth(width, fallback = 180) {
  const value = Number.parseFloat(width)
  return Number.isFinite(value) ? value : fallback
}

export function Table(props = {}) {
  const {
    rows = [],
    columns = [],
    rowKey = 'id',
    filter = '',
    filterPlaceholder = 'Search every column…',
    page = 1,
    pageSize = 10,
    pageSizeOptions = [5, 10, 20, 50, 'all'],
    sort,
    selectedKeys,
    columnFilters = {},
    settings,
    storageKey,
    title,
    description,
    toolbar,
    searchable = true,
    sortable = true,
    resizable = true,
    reorderable = true,
    selectable = false,
    paginated = true,
    exportable = false,
    showSettings = true,
    stickyHeader = true,
    striped = false,
    hoverable = true,
    loading = false,
    density = 'comfortable',
    emptyMessage = 'No rows found',
    class: classValue = '',
    id,
    ariaLabel = 'Data table',
    onRowClick,
    onSelectionChange,
    onSortChange,
    onPageChange,
    onPageSizeChange,
    onColumnOrderChange,
    onColumnResize,
    onSettingsChange
  } = props

  const normalizedColumns = computed(() => (readValue(columns, []) ?? []).map(normalizeColumn))
  const initialSettings = readStoredSettings(readValue(storageKey), readValue(settings))
  const defaultOrder = normalizedColumns.value.map(column => column.key)
  const defaultWidths = Object.fromEntries(normalizedColumns.value
    .filter(column => column.width !== undefined)
    .map(column => [column.key, Number.parseFloat(column.width)])
    .filter(([, width]) => Number.isFinite(width)))
  const defaultHidden = normalizedColumns.value.filter(column => column.hidden).map(column => column.key)
  const defaultPinned = Object.fromEntries(normalizedColumns.value
    .filter(column => column.pinned === 'left' || column.pinned === 'right')
    .map(column => [column.key, column.pinned]))
  const defaultDensity = densities.has(readValue(density)) ? readValue(density) : 'comfortable'
  const queryValue = createWritable(filter, '')
  const pageValue = createWritable(page, 1)
  const pageSizeValue = isWritableSignal(pageSize)
    ? pageSize
    : signal(initialSettings.pageSize ?? normalizePageSize(readValue(pageSize), 10))
  const selectedValue = createWritable(selectedKeys, [])
  const sortValue = signal(initialSettings.sort ?? normalizeSort(readValue(sort)))
  const orderValue = signal(initialSettings.columnOrder ?? defaultOrder)
  const widthsValue = signal({ ...defaultWidths, ...(initialSettings.columnWidths ?? {}) })
  const hiddenValue = signal(initialSettings.hiddenColumns ?? defaultHidden)
  const pinnedValue = signal({ ...defaultPinned, ...(initialSettings.pinnedColumns ?? {}) })
  const densityValue = isWritableSignal(density)
    ? density
    : signal(initialSettings.density ?? defaultDensity)
  const settingsOpen = signal(false)
  const settingsCopyState = signal('ready')
  const draggingColumn = signal('')
  let draggedColumnKey = ''

  const orderedColumns = computed(() => {
    const source = normalizedColumns.value
    const byKey = new Map(source.map(column => [column.key, column]))
    const applyPinnedSide = column => {
      const side = pinnedValue.value[column.key] ?? column.pinned
      return {
        ...column,
        pinned: side === 'left' || side === 'right' ? side : undefined
      }
    }
    const ordered = orderValue.value
      .map(key => byKey.get(key))
      .filter(Boolean)
      .map(applyPinnedSide)
    const existing = new Set(ordered.map(column => column.key))
    return [...ordered, ...source.filter(column => !existing.has(column.key)).map(applyPinnedSide)]
  })

  const visibleColumns = computed(() => {
    const hidden = new Set(hiddenValue.value)
    return orderedColumns.value.filter(column => !hidden.has(column.key))
  })

  const sourceRows = computed(() => readValue(rows, []) ?? [])
  const getRowKey = (row, index) => String(typeof rowKey === 'function'
    ? rowKey(row, index)
    : getPathValue(row, rowKey) ?? index)
  const sourceRecords = computed(() => sourceRows.value.map((row, sourceIndex) => ({
    row,
    sourceIndex,
    key: getRowKey(row, sourceIndex)
  })))
  const filteredRows = computed(() => {
    const query = String(queryValue.value ?? '').trim().toLocaleLowerCase()
    const filters = readValue(columnFilters, {}) ?? {}
    const availableColumns = normalizedColumns.value

    return sourceRecords.value.filter(record => {
      const { row, sourceIndex } = record
      const matchesQuery = !query || availableColumns.some(column => {
        if (!column.searchable) {
          return false
        }

        const value = getCellValue(row, column, sourceIndex)
        const text = typeof column.searchText === 'function'
          ? column.searchText(value, row)
          : valueToSearchText(value)
        return String(text).toLocaleLowerCase().includes(query)
      })

      if (!matchesQuery) {
        return false
      }

      return Object.entries(filters).every(([key, expected]) => {
        if (expected === '' || expected === undefined || expected === null) {
          return true
        }

        const column = availableColumns.find(candidate => candidate.key === key)
        if (!column) {
          return true
        }

        const value = getCellValue(row, column, sourceIndex)
        if (typeof column.filter === 'function') {
          return column.filter(value, expected, row)
        }

        return valueToSearchText(value).toLocaleLowerCase().includes(String(expected).toLocaleLowerCase())
      })
    })
  })

  const sortedRows = computed(() => {
    const activeSort = sortValue.value
    if (!activeSort) {
      return filteredRows.value
    }

    const column = normalizedColumns.value.find(candidate => candidate.key === activeSort.key)
    if (!column) {
      return filteredRows.value
    }

    const multiplier = activeSort.direction === 'desc' ? -1 : 1
    return [...filteredRows.value]
      .sort((left, right) => {
        const leftValue = getCellValue(left.row, column, left.sourceIndex)
        const rightValue = getCellValue(right.row, column, right.sourceIndex)
        const result = typeof column.compare === 'function'
          ? column.compare(leftValue, rightValue, left.row, right.row)
          : compareValues(leftValue, rightValue)
        return result === 0 ? left.sourceIndex - right.sourceIndex : result * multiplier
      })
  })

  const rowsPerPage = computed(() => normalizePageSize(pageSizeValue.value, 10))
  const totalPages = computed(() => {
    if (!readValue(paginated, true) || rowsPerPage.value === 'all') {
      return 1
    }

    return Math.max(1, Math.ceil(sortedRows.value.length / rowsPerPage.value))
  })
  const activePage = computed(() => clamp(Number(pageValue.value) || 1, 1, totalPages.value))
  const pageRows = computed(() => {
    if (!readValue(paginated, true) || rowsPerPage.value === 'all') {
      return sortedRows.value
    }

    const start = (activePage.value - 1) * rowsPerPage.value
    return sortedRows.value.slice(start, start + rowsPerPage.value)
  })
  const rangeStart = computed(() => sortedRows.value.length === 0
    ? 0
    : rowsPerPage.value === 'all' ? 1 : (activePage.value - 1) * rowsPerPage.value + 1)
  const rangeEnd = computed(() => rowsPerPage.value === 'all'
    ? sortedRows.value.length
    : Math.min(sortedRows.value.length, activePage.value * rowsPerPage.value))
  const hasActiveFilters = computed(() => {
    const query = String(queryValue.value ?? '').trim()
    const filters = readValue(columnFilters, {}) ?? {}
    return Boolean(query || Object.values(filters).some(value => value !== '' && value !== undefined && value !== null))
  })
  const emptyMessageValue = computed(() => readValue(emptyMessage, 'No rows found'))
  const emptyDescription = computed(() => hasActiveFilters.value
    ? 'Try another search or clear your filters.'
    : 'There are no rows to show yet.')
  const loadingStatus = computed(() => readValue(loading, false) ? 'Loading rows' : '')
  const tableLabel = computed(() => String(readValue(ariaLabel, 'Data table') ?? '').trim() || 'Data table')

  const selectedSet = () => new Set(Array.isArray(selectedValue.value)
    ? selectedValue.value.map(String)
    : selectedValue.value instanceof Set ? [...selectedValue.value].map(String) : [])

  const settingsSnapshot = () => ({
    version: 1,
    columnOrder: orderedColumns.value.map(column => column.key),
    columnWidths: { ...widthsValue.value },
    hiddenColumns: [...hiddenValue.value],
    pinnedColumns: { ...pinnedValue.value },
    sort: sortValue.value ? { ...sortValue.value } : null,
    pageSize: rowsPerPage.value,
    density: densityValue.value
  })

  const emitSettings = () => {
    const snapshot = settingsSnapshot()
    const serialized = serializeTableSettings(snapshot)
    const key = readValue(storageKey)

    writeStoredSettings(key, serialized)

    onSettingsChange?.(snapshot, serialized)
  }

  const setPage = nextPage => {
    const next = clamp(Number(nextPage) || 1, 1, totalPages.value)
    pageValue.value = next
    onPageChange?.(next)
  }

  const handleSearch = event => {
    queryValue.value = event.currentTarget.value
    setPage(1)
  }

  const handlePageSize = event => {
    const next = normalizePageSize(event.currentTarget.value, 10)
    pageSizeValue.value = next
    setPage(1)
    onPageSizeChange?.(next)
    emitSettings()
  }

  const handleSort = column => {
    if (!readValue(sortable, true) || !column.sortable) {
      return
    }

    const current = sortValue.value
    const next = current?.key !== column.key
      ? { key: column.key, direction: 'asc' }
      : current.direction === 'asc'
        ? { key: column.key, direction: 'desc' }
        : null
    sortValue.value = next
    setPage(1)
    onSortChange?.(next)
    emitSettings()
  }

  const setSelected = keys => {
    const next = [...new Set(keys.map(String))]
    selectedValue.value = next
    const selected = new Set(next)
    onSelectionChange?.(next, sourceRecords.value
      .filter(record => selected.has(record.key))
      .map(record => record.row))
  }

  const toggleRow = (record, event) => {
    event?.stopPropagation()
    const key = record.key
    const selected = selectedSet()
    if (selected.has(key)) {
      selected.delete(key)
    } else {
      selected.add(key)
    }
    setSelected([...selected])
  }

  const togglePageRows = event => {
    event?.stopPropagation()
    const selected = selectedSet()
    const keys = pageRows.value.map(record => record.key)
    const allSelected = keys.length > 0 && keys.every(key => selected.has(key))
    keys.forEach(key => allSelected ? selected.delete(key) : selected.add(key))
    setSelected([...selected])
  }

  const moveColumn = (key, direction) => {
    const order = orderedColumns.value.map(column => column.key)
    const currentIndex = order.indexOf(key)
    const nextIndex = clamp(currentIndex + direction, 0, order.length - 1)
    if (currentIndex < 0 || currentIndex === nextIndex) {
      return
    }

    order.splice(currentIndex, 1)
    order.splice(nextIndex, 0, key)
    orderValue.value = order
    onColumnOrderChange?.(order)
    emitSettings()
  }

  const toggleColumn = key => {
    const hidden = new Set(hiddenValue.value)
    if (hidden.has(key)) {
      hidden.delete(key)
    } else if (visibleColumns.value.length > 1) {
      hidden.add(key)
    }
    hiddenValue.value = [...hidden]
    emitSettings()
  }

  const setPinnedColumn = (column, event) => {
    const side = event.currentTarget.value
    if (!column.pinnable || !pinnedSides.has(side)) {
      return
    }

    pinnedValue.value = { ...pinnedValue.value, [column.key]: side }

    if (side === 'left' || side === 'right') {
      const order = orderedColumns.value.map(candidate => candidate.key)
      const currentIndex = order.indexOf(column.key)
      if (currentIndex >= 0) {
        order.splice(currentIndex, 1)
        if (side === 'left') {
          const lastPinnedLeft = order.reduce((lastIndex, key, index) => (
            pinnedValue.value[key] === 'left' ? index : lastIndex
          ), -1)
          order.splice(lastPinnedLeft + 1, 0, column.key)
        } else {
          const firstPinnedRight = order.findIndex(key => pinnedValue.value[key] === 'right')
          order.splice(firstPinnedRight < 0 ? order.length : firstPinnedRight, 0, column.key)
        }
        orderValue.value = order
        onColumnOrderChange?.(order)
      }
    }

    emitSettings()
  }

  const handleDragStart = (column, event) => {
    if (!readValue(reorderable, true) || !column.reorderable) {
      event.preventDefault()
      return
    }

    draggedColumnKey = column.key
    draggingColumn.value = column.key
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', column.key)
  }

  const handleDrop = (column, event) => {
    event.preventDefault()
    const sourceKey = draggedColumnKey || event.dataTransfer.getData('text/plain')
    const order = orderedColumns.value.map(candidate => candidate.key)
    const sourceIndex = order.indexOf(sourceKey)
    const targetIndex = order.indexOf(column.key)
    draggingColumn.value = ''
    draggedColumnKey = ''

    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
      return
    }

    order.splice(sourceIndex, 1)
    order.splice(targetIndex, 0, sourceKey)
    orderValue.value = order
    onColumnOrderChange?.(order)
    emitSettings()
  }

  const resizeColumnBy = (column, delta) => {
    const current = numericWidth(widthsValue.value[column.key] ?? column.width)
    const next = clamp(current + delta, column.minWidth, column.maxWidth)
    widthsValue.value = { ...widthsValue.value, [column.key]: next }
    onColumnResize?.(column.key, next)
  }

  const handleResizeStart = (column, event) => {
    if (!readValue(resizable, true) || !column.resizable) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    const startX = event.clientX
    const configuredWidth = numericWidth(widthsValue.value[column.key] ?? column.width, 0)
    const startWidth = configuredWidth || event.currentTarget.parentElement?.getBoundingClientRect().width || 180

    const handleMove = moveEvent => {
      const next = clamp(startWidth + moveEvent.clientX - startX, column.minWidth, column.maxWidth)
      widthsValue.value = { ...widthsValue.value, [column.key]: next }
      onColumnResize?.(column.key, next)
    }

    const handleUp = () => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleUp)
      emitSettings()
    }

    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', handleUp)
  }

  const handleResizeKey = (column, event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return
    }

    event.preventDefault()
    resizeColumnBy(column, event.key === 'ArrowRight' ? 12 : -12)
    emitSettings()
  }

  const resetSettings = () => {
    orderValue.value = defaultOrder
    widthsValue.value = defaultWidths
    hiddenValue.value = defaultHidden
    pinnedValue.value = defaultPinned
    sortValue.value = normalizeSort(readValue(sort))
    pageSizeValue.value = normalizePageSize(readValue(pageSize), 10)
    densityValue.value = defaultDensity
    const key = readValue(storageKey)
    removeStoredSettings(key)
    setPage(1)
    emitSettings()
  }

  const copySettings = async () => {
    try {
      await copyText(serializeTableSettings(settingsSnapshot()))
      settingsCopyState.value = 'copied'
    } catch {
      settingsCopyState.value = 'error'
    }

    setTimeout(() => {
      settingsCopyState.value = 'ready'
    }, 1400)
  }

  const exportCsv = () => {
    const exportColumns = visibleColumns.value.filter(column => column.exportable !== false)
    const lines = [
      exportColumns.map(column => escapeCsv(column.header)).join(','),
      ...sortedRows.value.map(record => exportColumns
        .map(column => escapeCsv(getCellValue(record.row, column, record.sourceIndex)))
        .join(','))
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${String(title ?? 'table').toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const columnStyle = (column, columnsToRender) => {
    const style = {
      width: resolveWidth(widthsValue.value[column.key], resolveWidth(column.width))
    }

    if (column.pinned === 'left') {
      const previous = columnsToRender.slice(0, columnsToRender.indexOf(column))
      const offset = previous
        .filter(candidate => candidate.pinned === 'left')
        .reduce((total, candidate) => total + numericWidth(widthsValue.value[candidate.key] ?? candidate.width), readValue(selectable, false) ? 44 : 0)
      style.left = `${offset}px`
    }

    if (column.pinned === 'right') {
      const following = columnsToRender.slice(columnsToRender.indexOf(column) + 1)
      const offset = following
        .filter(candidate => candidate.pinned === 'right')
        .reduce((total, candidate) => total + numericWidth(widthsValue.value[candidate.key] ?? candidate.width), 0)
      style.right = `${offset}px`
    }

    return style
  }

  const columnClass = column => [
    `${baseClassName}-cell`,
    `${baseClassName}-cell-${column.align}`,
    column.pinned ? `${baseClassName}-cell-pinned ${baseClassName}-cell-pinned-${column.pinned}` : '',
    column.class ?? ''
  ].filter(Boolean).join(' ')

  const renderTableRow = ({ record }) => {
    const columnsToRender = visibleColumns.value
    const selected = selectedSet()
    const selectionEnabled = readValue(selectable, false)
    const { row, sourceIndex, key } = record
    const isSelected = selected.has(key)
    const rowClass = [
      `${baseClassName}-row`,
      isSelected ? `${baseClassName}-row-selected` : '',
      onRowClick ? `${baseClassName}-row-interactive` : ''
    ].filter(Boolean).join(' ')
    const activateRow = event => {
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
        return
      }
      if (event.type === 'keydown') {
        event.preventDefault()
      }
      onRowClick?.(row, { key, rowIndex: sourceIndex, event })
    }

    return html`
      <tr class="${rowClass}" data-selected="${isSelected}" tabindex="${onRowClick ? 0 : undefined}" @click=${activateRow} @keydown=${activateRow}>
        ${selectionEnabled ? html`<td class="${baseClassName}-selection-cell"><input type="checkbox" aria-label="Select row ${sourceIndex + 1}" .checked=${isSelected} @click=${event => event.stopPropagation()} @keydown=${event => event.stopPropagation()} @change=${event => toggleRow(record, event)}></td>` : null}
        ${columnsToRender.map(column => {
          const value = getCellValue(row, column, sourceIndex)
          const content = typeof column.render === 'function'
            ? column.render(value, row, { rowIndex: sourceIndex, column, selected: isSelected })
            : value ?? column.fallback ?? '—'
          return html`<td class="${columnClass(column)}" style="${columnStyle(column, columnsToRender)}">${content}</td>`
        })}
      </tr>
    `
  }

  const headerMarkup = computed(() => {
    const columnsToRender = visibleColumns.value
    const selected = selectedSet()
    const currentKeys = pageRows.value.map(record => record.key)
    const allSelected = currentKeys.length > 0 && currentKeys.every(key => selected.has(key))
    const someSelected = !allSelected && currentKeys.some(key => selected.has(key))

    return html`
      <colgroup>
        ${readValue(selectable, false) ? html`<col class="${baseClassName}-selection-column">` : null}
        ${columnsToRender.map(column => html`<col style="${columnStyle(column, columnsToRender)}">`)}
      </colgroup>
      <thead class="${readValue(stickyHeader, true) ? `${baseClassName}-head ${baseClassName}-head-sticky` : `${baseClassName}-head`}">
        <tr>
          ${readValue(selectable, false) ? html`<th class="${baseClassName}-selection-cell" scope="col"><input type="checkbox" aria-label="Select rows on this page" .checked=${allSelected} .indeterminate=${someSelected} @change=${togglePageRows}></th>` : null}
          ${columnsToRender.map(column => {
            const activeSort = sortValue.value?.key === column.key ? sortValue.value.direction : 'none'
            const canSort = readValue(sortable, true) && column.sortable
            const canResize = readValue(resizable, true) && column.resizable
            const canReorder = readValue(reorderable, true) && column.reorderable
            const label = typeof column.renderHeader === 'function'
              ? column.renderHeader(column, { sort: activeSort })
              : column.header

            return html`
              <th class="${columnClass(column)} ${baseClassName}-header-cell" scope="col" style="${columnStyle(column, columnsToRender)}" aria-sort="${activeSort === 'none' ? 'none' : activeSort === 'asc' ? 'ascending' : 'descending'}" ?draggable=${canReorder} data-dragging="${draggingColumn.value === column.key}" @dragstart=${event => handleDragStart(column, event)} @dragover=${event => canReorder && event.preventDefault()} @drop=${event => handleDrop(column, event)} @dragend=${() => {
                draggingColumn.value = ''
                draggedColumnKey = ''
              }}>
                <button type="button" class="${baseClassName}-sort" ?disabled=${!canSort} @click=${() => handleSort(column)}>
                  <span class="${baseClassName}-header-label">${label}</span>
                  <span class="${baseClassName}-sort-mark" data-direction="${activeSort}" aria-hidden="true"></span>
                </button>
                ${canResize ? html`<span class="${baseClassName}-resizer" role="separator" aria-label="Resize ${column.header} column. Use Left and Right Arrow keys." aria-orientation="vertical" aria-valuemin="${column.minWidth}" aria-valuemax="${column.maxWidth}" aria-valuenow="${computed(() => clamp(numericWidth(widthsValue.value[column.key] ?? column.width), column.minWidth, column.maxWidth))}" aria-valuetext="${computed(() => `${clamp(numericWidth(widthsValue.value[column.key] ?? column.width), column.minWidth, column.maxWidth)} pixels`)}" tabindex="0" @pointerdown=${event => handleResizeStart(column, event)} @keydown=${event => handleResizeKey(column, event)}></span>` : null}
              </th>
            `
          })}
        </tr>
      </thead>
    `
  })

  const bodyMarkup = computed(() => {
    const columnsToRender = visibleColumns.value
    const selectionEnabled = readValue(selectable, false)
    const colspan = columnsToRender.length + (selectionEnabled ? 1 : 0)

    if (readValue(loading, false)) {
      return html`<tbody class="${baseClassName}-body">${Array.from({ length: 5 }, (_, rowIndex) => html`<tr class="${baseClassName}-row ${baseClassName}-row-loading">${selectionEnabled ? html`<td class="${baseClassName}-selection-cell"><span class="${baseClassName}-skeleton ${baseClassName}-skeleton-check"></span></td>` : null}${columnsToRender.map((column, columnIndex) => html`<td class="${columnClass(column)}" style="${columnStyle(column, columnsToRender)}"><span class="${baseClassName}-skeleton" style="width: ${50 + (rowIndex + columnIndex) % 4 * 11}%"></span></td>`)}</tr>`)}</tbody>`
    }

    if (pageRows.value.length === 0) {
      return html`<tbody class="${baseClassName}-body"><tr><td class="${baseClassName}-empty" colspan="${colspan}"><span class="${baseClassName}-empty-mark" aria-hidden="true">✦</span><strong>${emptyMessageValue}</strong><span>${emptyDescription}</span></td></tr></tbody>`
    }

    return html`
      <tbody class="${baseClassName}-body">
        ${keyed(pageRows.value.map(record => component(renderTableRow, { record }, record.key)), result => result.key)}
      </tbody>
    `
  })

  const settingsPanel = computed(() => {
    if (!settingsOpen.value) {
      return null
    }

    const hidden = new Set(hiddenValue.value)
    const columnsToRender = orderedColumns.value
    return html`
      <span class="${baseClassName}-settings-scrim" aria-hidden="true" @click=${() => settingsOpen.value = false}></span>
      <div class="${baseClassName}-settings" role="dialog" aria-label="Table settings" @keydown=${event => {
        if (event.key === 'Escape') {
          settingsOpen.value = false
        }
      }}>
        <div class="${baseClassName}-settings-heading">
          <div><strong>Shape this table</strong><span>Visibility, pinning, and column order</span></div>
          <button type="button" class="${baseClassName}-icon-button" data-state="${settingsCopyState}" aria-label="Copy serialized settings" title="Copy serialized settings" @click=${copySettings}>${CopyIcon({ size: '1em' })}</button>
        </div>
        <div class="${baseClassName}-settings-columns">
          ${columnsToRender.map((column, index) => html`
            <div class="${baseClassName}-settings-column">
              <label><input type="checkbox" .checked=${!hidden.has(column.key)} ?disabled=${!column.hideable || !hidden.has(column.key) && visibleColumns.value.length === 1} @change=${() => toggleColumn(column.key)}><span>${column.header}</span></label>
              <span class="${baseClassName}-settings-column-controls">
                <select aria-label="Pin ${column.header} column" title="Pin column" .value=${column.pinned ?? 'none'} ?disabled=${!column.pinnable} @change=${event => setPinnedColumn(column, event)}>
                  <option value="none">None</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
                <span class="${baseClassName}-settings-column-actions">
                  <button type="button" aria-label="Move ${column.header} left" ?disabled=${index === 0 || !column.reorderable} @click=${() => moveColumn(column.key, -1)}>${ArrowLeftIcon({ size: '.9em' })}</button>
                  <button type="button" aria-label="Move ${column.header} right" ?disabled=${index === columnsToRender.length - 1 || !column.reorderable} @click=${() => moveColumn(column.key, 1)}>${ArrowRightIcon({ size: '.9em' })}</button>
                </span>
              </span>
            </div>
          `)}
        </div>
        <div class="${baseClassName}-settings-density">
          <span>Density</span>
          <div role="group" aria-label="Table density">
            ${['compact', 'comfortable', 'spacious'].map(option => html`<button type="button" data-active="${densityValue.value === option}" @click=${() => {
              densityValue.value = option
              emitSettings()
            }}>${option}</button>`)}
          </div>
        </div>
        <button type="button" class="${baseClassName}-reset" @click=${resetSettings}>Reset table settings</button>
      </div>
    `
  })

  const pageButtons = computed(() => {
    const total = totalPages.value
    const current = activePage.value
    const start = Math.max(1, Math.min(current - 2, total - 4))
    const end = Math.min(total, start + 4)
    return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index)
      .map(number => html`<button type="button" class="${baseClassName}-page-number" data-active="${number === current}" aria-label="Page ${number}" aria-current="${number === current ? 'page' : undefined}" @click=${() => setPage(number)}>${number}</button>`)
  })

  const rootClass = computed(() => [
    baseClassName,
    `${baseClassName}-${densityValue.value}`,
    readValue(striped, false) ? `${baseClassName}-striped` : '',
    readValue(hoverable, true) ? `${baseClassName}-hoverable` : '',
    classValue
  ].filter(Boolean).join(' '))

  return html`
    <section class="${rootClass}" id="${id}" aria-label="${tableLabel}">
      <span class="${baseClassName}-status" role="status" aria-live="polite" aria-atomic="true">${loadingStatus}</span>
      <div class="${baseClassName}-toolbar">
        <div class="${baseClassName}-identity">
          ${title ? html`<strong>${title}</strong>` : null}
          ${description ? html`<span>${description}</span>` : null}
        </div>
        <div class="${baseClassName}-toolbar-actions">
          ${computed(() => readValue(searchable, true) ? html`<label class="${baseClassName}-search"><span aria-hidden="true">${SearchIcon({ size: '1em' })}</span><input type="search" placeholder="${filterPlaceholder}" aria-label="Filter rows" .value=${queryValue} @input=${handleSearch}></label>` : null)}
          ${toolbar ?? null}
          ${computed(() => readValue(exportable, false) ? html`<button type="button" class="${baseClassName}-icon-button" aria-label="Export filtered rows as CSV" title="Export CSV" @click=${exportCsv}>${DownloadIcon({ size: '1em' })}</button>` : null)}
          ${computed(() => readValue(showSettings, true) ? html`<div class="${baseClassName}-settings-anchor"><button type="button" class="${baseClassName}-icon-button" aria-label="Table settings" title="Table settings" aria-expanded="${settingsOpen}" @click=${() => settingsOpen.value = !settingsOpen.value}>${SettingsIcon({ size: '1em' })}</button>${settingsPanel}</div>` : null)}
        </div>
      </div>

      <div class="${baseClassName}-viewport">
        <table aria-busy="${computed(() => readValue(loading, false) ? 'true' : undefined)}">
          ${headerMarkup}
          ${bodyMarkup}
        </table>
      </div>

      <footer class="${baseClassName}-footer">
        <div class="${baseClassName}-result-count"><strong>${rangeStart}–${rangeEnd}</strong><span>of ${computed(() => sortedRows.value.length)} rows</span>${computed(() => sourceRows.value.length !== sortedRows.value.length ? html`<span class="${baseClassName}-filtered-count">${sourceRows.value.length - sortedRows.value.length} filtered</span>` : null)}</div>
        ${computed(() => readValue(paginated, true) ? html`
          <div class="${baseClassName}-pagination">
            <label class="${baseClassName}-page-size"><span>Rows</span><select aria-label="Rows per page" .value=${pageSizeValue} @change=${handlePageSize}>${pageSizeOptions.map(option => html`<option value="${option}">${option === 'all' || option === 'max' ? 'Max' : option}</option>`)}</select></label>
            <div class="${baseClassName}-pages" aria-label="Pagination">
              <button type="button" class="${baseClassName}-page-arrow" aria-label="Previous page" ?disabled=${computed(() => activePage.value <= 1)} @click=${() => setPage(activePage.value - 1)}>${ArrowLeftIcon({ size: '1em' })}</button>
              ${pageButtons}
              <button type="button" class="${baseClassName}-page-arrow" aria-label="Next page" ?disabled=${computed(() => activePage.value >= totalPages.value)} @click=${() => setPage(activePage.value + 1)}>${ArrowRightIcon({ size: '1em' })}</button>
            </div>
          </div>
        ` : null)}
      </footer>
    </section>
  `
}

export const TableComponent = props => component(Table, props)
