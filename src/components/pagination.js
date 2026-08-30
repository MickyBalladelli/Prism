import { component, computed, html } from '@mickyballadelli/matrix'
import { ArrowLeftIcon, ArrowRightIcon } from './icons.js'
import { createWritableSignal, readReactiveValue } from '../reactive.js'

const range = (start, end) => Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index)

export function Pagination(props = {}) {
  const {
    ariaLabel = 'Pagination',
    class: classValue = '',
    onPageChange,
    onPageSizeChange,
    page = 1,
    pageCount,
    pageSize = 25,
    pageSizeOptions = [10, 25, 50, 100],
    showPageSize = false,
    siblingCount = 1,
    totalItems
  } = props

  const pageValue = createWritableSignal(page, 1)
  const pageSizeValue = createWritableSignal(pageSize, 25)
  const count = computed(() => pageCount !== undefined
    ? Math.max(1, Number(readReactiveValue(pageCount, 1)) || 1)
    : Math.max(1, Math.ceil((Number(readReactiveValue(totalItems, 0)) || 0) / (Number(pageSizeValue.value) || 1))))
  const current = computed(() => Math.max(1, Math.min(count.value, Number(pageValue.value) || 1)))
  const changePage = next => {
    const value = Math.max(1, Math.min(count.value, next))
    pageValue.value = value
    onPageChange?.(value)
  }

  const pageItems = computed(() => {
    if (count.value <= 7 + siblingCount * 2) return range(1, count.value)
    const left = Math.max(2, current.value - siblingCount)
    const right = Math.min(count.value - 1, current.value + siblingCount)
    const values = [1]
    if (left > 2) values.push('ellipsis-left')
    values.push(...range(left, right))
    if (right < count.value - 1) values.push('ellipsis-right')
    values.push(count.value)
    return values
  })
  const previousDisabled = computed(() => current.value <= 1)
  const nextDisabled = computed(() => current.value >= count.value)
  const pageMarkup = computed(() => pageItems.value.map(item => typeof item === 'string'
    ? html`<span class="prism-pagination-ellipsis" aria-hidden="true">…</span>`
    : html`<button type="button" class="prism-pagination-button ${item === current.value ? 'is-active' : ''}" aria-current="${item === current.value ? 'page' : undefined}" aria-label="Page ${item}" @click=${() => changePage(item)}>${item}</button>`))

  return html`
    <nav class="prism-pagination ${classValue}" aria-label="${ariaLabel}">
      ${showPageSize ? html`<label class="prism-pagination-size"><span>Rows</span><select aria-label="Rows per page" .value=${pageSizeValue} @change=${event => {
        pageSizeValue.value = Number(event.target.value)
        onPageSizeChange?.(pageSizeValue.value)
        changePage(1)
      }}>${pageSizeOptions.map(size => html`<option value="${size}">${size}</option>`)}</select></label>` : ''}
      <div class="prism-pagination-pages">
        <button type="button" class="prism-pagination-button" aria-label="Previous page" ?disabled=${previousDisabled} @click=${() => changePage(current.value - 1)}>${ArrowLeftIcon({ size: 15 })}</button>
        ${pageMarkup}
        <button type="button" class="prism-pagination-button" aria-label="Next page" ?disabled=${nextDisabled} @click=${() => changePage(current.value + 1)}>${ArrowRightIcon({ size: 15 })}</button>
      </div>
    </nav>
  `
}

export const PaginationComponent = props => component(Pagination, props)
