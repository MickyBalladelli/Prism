import { computed, html, onMount, signal } from '@mickyballadelli/matrix'
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, CheckIcon, ClockIcon } from './icons.js'
import { isWritableSignal, readReactiveValue } from '../reactive.js'

const readValue = readReactiveValue
const dayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
const monthFormatter = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' })
const weekdayFormatter = new Intl.DateTimeFormat(undefined, { weekday: 'short' })

const pad = value => String(value).padStart(2, '0')

function cloneDate(date) {
  return new Date(date.getTime())
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function parseDateValue(value, fallback = new Date()) {
  const text = String(value ?? '')
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/)
  if (!match) {
    return cloneDate(fallback)
  }

  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4] ?? 0),
    Number(match[5] ?? 0)
  )

  return Number.isNaN(date.getTime()) ? cloneDate(fallback) : date
}

function formatDateValue(date, dateTime = false) {
  const value = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  return dateTime ? `${value}T${pad(date.getHours())}:${pad(date.getMinutes())}` : value
}

export function formatDateInputValue(value, dateTime = false) {
  if (!value) {
    return ''
  }

  const date = parseDateValue(value)
  return dateTime
    ? date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : date.toLocaleDateString(undefined, { dateStyle: 'medium' })
}

function compareDays(left, right) {
  return startOfDay(left).getTime() - startOfDay(right).getTime()
}

function isDateInRange(date, min, max) {
  const day = startOfDay(date)
  if (min && compareDays(day, parseDateValue(min)) < 0) {
    return false
  }

  if (max && compareDays(day, parseDateValue(max)) > 0) {
    return false
  }

  return true
}

function isValueInRange(date, min, max) {
  if (min && date.getTime() < parseDateValue(min).getTime()) {
    return false
  }

  if (max && date.getTime() > parseDateValue(max).getTime()) {
    return false
  }

  return true
}

function updateDatePart(source, selectedDay, dateTime) {
  const next = new Date(
    selectedDay.getFullYear(),
    selectedDay.getMonth(),
    selectedDay.getDate(),
    dateTime ? source.getHours() : 0,
    dateTime ? source.getMinutes() : 0
  )
  return formatDateValue(next, dateTime)
}

function getMinuteStep(step) {
  const numericStep = Number(step)
  if (!Number.isFinite(numericStep) || numericStep <= 0) {
    return 1
  }

  return Math.max(1, Math.min(60, Math.round(numericStep / 60)))
}

const weekdays = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(2023, 0, 1 + index)
  return weekdayFormatter.format(date)
})

export function DatePickerPopup(props = {}) {
  const {
    controls = {},
    dateTime = false,
    disabled = false,
    inputId,
    max,
    min,
    onCommit,
    open,
    step,
    value
  } = props

  const openValue = isWritableSignal(open) ? open : signal(Boolean(readValue(open, false)))
  const draftValue = signal('')
  const viewMonth = signal(startOfMonth(new Date()))
  const popupId = `${inputId}-popup`
  const titleId = `${popupId}-title`
  const isDisabled = computed(() => Boolean(readValue(disabled, false)))
  const draftDate = computed(() => parseDateValue(draftValue.value))
  const monthLabel = computed(() => monthFormatter.format(viewMonth.value))
  const selectedDateLabel = computed(() => dayFormatter.format(draftDate.value))
  const minuteStep = computed(() => getMinuteStep(readValue(step)))
  const minuteOptions = computed(() => Array.from(
    { length: Math.floor(59 / minuteStep.value) + 1 },
    (_, index) => index * minuteStep.value
  ))
  const canCommit = computed(() => !dateTime || isValueInRange(draftDate.value, readValue(min), readValue(max)))

  const closePicker = (restoreFocus = false) => {
    openValue.value = false
    if (restoreFocus && typeof document !== 'undefined') {
      document.getElementById(inputId)?.focus()
    }
  }

  const openPicker = () => {
    if (isDisabled.value) {
      return
    }

    if (openValue.value) {
      closePicker(true)
      return
    }

    const current = String(readValue(value, '') ?? '')
    const initial = current || formatDateValue(new Date(), dateTime)
    draftValue.value = initial
    viewMonth.value = startOfMonth(parseDateValue(initial))
    openValue.value = true
  }

  controls.open = openPicker
  controls.close = closePicker

  const commit = (event, nextValue = draftValue.value) => {
    const nextDate = parseDateValue(nextValue)
    if (!isValueInRange(nextDate, readValue(min), readValue(max))) {
      return
    }

    onCommit?.(formatDateValue(nextDate, dateTime), event)
    closePicker(true)
  }

  const selectDay = (date, event) => {
    if (!isDateInRange(date, readValue(min), readValue(max))) {
      return
    }

    const nextValue = updateDatePart(draftDate.value, date, dateTime)
    if (dateTime) {
      draftValue.value = nextValue
      return
    }

    commit(event, nextValue)
  }

  const changeMonth = offset => {
    const current = viewMonth.value
    viewMonth.value = new Date(current.getFullYear(), current.getMonth() + offset, 1)
  }

  const selectToday = event => {
    const today = startOfDay(new Date())
    if (isDateInRange(today, readValue(min), readValue(max))) {
      viewMonth.value = startOfMonth(today)
      selectDay(today, event)
    }
  }

  const updateTime = (part, event) => {
    const next = cloneDate(draftDate.value)
    const nextValue = Number(event.currentTarget.value)
    if (part === 'hour') {
      next.setHours(nextValue)
    } else {
      next.setMinutes(nextValue)
    }
    draftValue.value = formatDateValue(next, true)
  }

  const handlePanelKeydown = event => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closePicker(true)
    }
  }

  const dayMarkup = computed(() => {
    const month = viewMonth.value
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
    const firstGridDay = new Date(month.getFullYear(), month.getMonth(), 1 - firstDay.getDay())
    const selected = draftDate.value
    const today = startOfDay(new Date())
    const minimum = readValue(min)
    const maximum = readValue(max)

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(firstGridDay.getFullYear(), firstGridDay.getMonth(), firstGridDay.getDate() + index)
      const isCurrentMonth = date.getMonth() === month.getMonth()
      const isSelected = compareDays(date, selected) === 0
      const isToday = compareDays(date, today) === 0
      const dayDisabled = !isDateInRange(date, minimum, maximum)
      return html`<button
        type="button"
        class="prism-date-picker-day ${isCurrentMonth ? '' : 'prism-date-picker-day-outside'} ${isSelected ? 'prism-date-picker-day-selected' : ''} ${isToday ? 'prism-date-picker-day-today' : ''}"
        aria-label="${dayFormatter.format(date)}"
        aria-pressed="${isSelected}"
        aria-current="${isToday ? 'date' : undefined}"
        ?disabled=${dayDisabled}
        @click=${event => selectDay(date, event)}
      >${date.getDate()}</button>`
    })
  })

  const timeMarkup = dateTime
    ? html`<div class="prism-date-picker-time" aria-label="Time">
        <div class="prism-date-picker-time-heading">Time</div>
        <label class="prism-date-picker-time-field">
          <span>Hour</span>
          <select aria-label="Hour" .value=${computed(() => pad(draftDate.value.getHours()))} @change=${event => updateTime('hour', event)}>
            ${Array.from({ length: 24 }, (_, hour) => html`<option value="${pad(hour)}">${pad(hour)}</option>`)}
          </select>
        </label>
        <span class="prism-date-picker-time-separator" aria-hidden="true">:</span>
        <label class="prism-date-picker-time-field">
          <span>Minute</span>
          <select aria-label="Minute" .value=${computed(() => pad(draftDate.value.getMinutes()))} @change=${event => updateTime('minute', event)}>
            ${minuteOptions.value.map(minute => html`<option value="${pad(minute)}">${pad(minute)}</option>`)}
          </select>
        </label>
      </div>`
    : null

  onMount(root => {
    if (typeof document === 'undefined') {
      return
    }

    const handleOutsideClick = event => {
      const field = event.target?.closest?.('.prism-date-input')
      const popup = event.target?.closest?.('.prism-date-picker-popup')
      if (openValue.value && !field && !popup) {
        closePicker()
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  })

  return html`<div class="prism-date-picker-popup-wrap">
    <div
      id="${popupId}"
      class="prism-date-picker-popup"
      role="dialog"
      aria-modal="false"
      aria-labelledby="${titleId}"
      ?hidden=${computed(() => !openValue.value)}
      @click=${event => event.stopPropagation()}
      @keydown=${handlePanelKeydown}
    >
      <div class="prism-date-picker-popup-header">
        <button type="button" class="prism-date-picker-nav" aria-label="Previous month" @click=${() => changeMonth(-1)}>${ArrowLeftIcon({ size: '1em' })}</button>
        <strong id="${titleId}" class="prism-date-picker-month" aria-live="polite">${monthLabel}</strong>
        <button type="button" class="prism-date-picker-nav" aria-label="Next month" @click=${() => changeMonth(1)}>${ArrowRightIcon({ size: '1em' })}</button>
      </div>
      <div class="prism-date-picker-weekdays" role="row">
        ${weekdays.map(label => html`<span role="columnheader">${label}</span>`)}
      </div>
      <div class="prism-date-picker-grid" role="grid" aria-label="${monthLabel}">
        ${dayMarkup}
      </div>
      ${timeMarkup}
      <div class="prism-date-picker-popup-footer">
        <span class="prism-date-picker-selected" aria-live="polite">${selectedDateLabel}</span>
        <div class="prism-date-picker-popup-actions">
          <button type="button" class="prism-date-picker-today" @click=${selectToday}>${CalendarIcon({ size: '0.9em' })} Today</button>
          ${dateTime
            ? html`<button type="button" class="prism-date-picker-close" @click=${() => closePicker(true)}>Cancel</button><button type="button" class="prism-date-picker-confirm" ?disabled=${computed(() => !canCommit.value)} @click=${commit}>${CheckIcon({ size: '0.9em' })} Done</button>`
            : html`<button type="button" class="prism-date-picker-close" @click=${() => closePicker(true)}>Close</button>`}
        </div>
      </div>
    </div>
  </div>`
}
