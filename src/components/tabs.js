import { component, computed, html, onMount, signal } from '@mickyballadelli/matrix'
import { createWritableSignal, readReactiveValue } from '../reactive.js'

let tabsId = 0

const safeId = value => String(value).replace(/[^a-zA-Z0-9_-]/g, '-')

export function Tabs(props = {}) {
  const {
    activation = 'automatic',
    activeTab,
    ariaLabel = 'Tabs',
    class: classValue = '',
    items = [],
    onTabChange,
    orientation = 'horizontal'
  } = props

  const tabItems = computed(() => readReactiveValue(items, []) ?? [])
  const orientationValue = computed(() => readReactiveValue(orientation, 'horizontal'))
  const activationValue = computed(() => readReactiveValue(activation, 'automatic'))
  const firstId = tabItems.value.find(item => !item.disabled)?.id ?? tabItems.value[0]?.id
  const current = createWritableSignal(activeTab, firstId)
  const baseId = `prism-tabs-${++tabsId}`
  const activeId = computed(() => tabItems.value.some(item => String(item.id) === String(current.value) && !item.disabled)
    ? current.value
    : tabItems.value.find(item => !item.disabled)?.id)
  const setActive = id => {
    current.value = id
    onTabChange?.(id)
  }

  onMount(root => {
    const handleKeydown = event => {
      const tabs = Array.from(root.querySelectorAll('[role="tab"]')).filter(tab => !tab.disabled)
      const currentIndex = tabs.indexOf(event.target)
      if (currentIndex < 0) return
      const horizontal = orientationValue.value === 'horizontal'
      const forward = horizontal ? 'ArrowRight' : 'ArrowDown'
      const backward = horizontal ? 'ArrowLeft' : 'ArrowUp'
      let nextIndex = currentIndex
      if (event.key === forward) nextIndex = (currentIndex + 1) % tabs.length
      else if (event.key === backward) nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
      else if (event.key === 'Home') nextIndex = 0
      else if (event.key === 'End') nextIndex = tabs.length - 1
      else return
      event.preventDefault()
      tabs[nextIndex].focus()
      if (activationValue.value !== 'manual') tabs[nextIndex].click()
    }
    root.addEventListener('keydown', handleKeydown)
    return () => root.removeEventListener('keydown', handleKeydown)
  })

  const tabMarkup = computed(() => tabItems.value.map(item => {
    const id = String(item.id)
    const tabDomId = `${baseId}-tab-${safeId(id)}`
    const panelDomId = `${baseId}-panel-${safeId(id)}`
    const selected = String(activeId.value) === id
    return html`<button type="button" id="${tabDomId}" class="prism-tabs-tab ${selected ? 'is-active' : ''}" role="tab" aria-selected="${selected}" aria-controls="${panelDomId}" tabindex="${selected ? 0 : -1}" ?disabled=${item.disabled} @click=${() => !item.disabled && setActive(item.id)}>${item.icon ? html`<span aria-hidden="true">${item.icon}</span>` : ''}<span>${item.label}</span></button>`
  }))
  const panelMarkup = computed(() => tabItems.value.map(item => {
    const id = String(item.id)
    const selected = String(activeId.value) === id
    return html`<div id="${baseId}-panel-${safeId(id)}" class="prism-tabs-panel" role="tabpanel" aria-labelledby="${baseId}-tab-${safeId(id)}" tabindex="0" ?hidden=${!selected}>${typeof item.content === 'function' ? item.content(item) : item.content}</div>`
  }))

  return html`
    <div class="prism-tabs prism-tabs-${orientationValue} ${classValue}">
      <div class="prism-tabs-list" role="tablist" aria-label="${ariaLabel}" aria-orientation="${orientationValue}">${tabMarkup}</div>
      <div class="prism-tabs-panels">${panelMarkup}</div>
    </div>
  `
}

export const TabsComponent = props => component(Tabs, props)
