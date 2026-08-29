import { component, html } from 'matrix'

function renderMeta(meta) {
  return meta === undefined || meta === null
    ? null
    : html`<span class="prism-tree-meta">${meta}</span>`
}

function renderLeaf(item = {}) {
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
    return html`<li class="prism-tree-leaf"><a class="${classValue}" href="${href}" @click=${onClick}>${content}</a></li>`
  }

  if (onClick) {
    return html`<li class="prism-tree-leaf"><button type="button" class="${classValue}" @click=${onClick}>${content}</button></li>`
  }

  return html`<li class="prism-tree-leaf"><div class="${classValue}">${content}</div></li>`
}

function renderBranch(item = {}) {
  const {
    label = 'Section',
    children = [],
    expanded = true,
    meta
  } = item

  return html`
    <li class="prism-tree-branch">
      <details class="prism-tree-details" ?open=${expanded}>
        <summary class="prism-tree-summary">
          <span class="prism-tree-entry-copy">
            <span class="prism-tree-chevron" aria-hidden="true"></span>
            <span class="prism-tree-marker" aria-hidden="true"></span>
            <span class="prism-tree-label">${label}</span>
          </span>
          ${renderMeta(meta)}
        </summary>
        <ul class="prism-tree-list prism-tree-list-nested">
          ${children.map(renderItem)}
        </ul>
      </details>
    </li>
  `
}

function renderItem(item = {}) {
  return Array.isArray(item.children) && item.children.length > 0
    ? renderBranch(item)
    : renderLeaf(item)
}

export function TreeView(props = {}) {
  const {
    items = [],
    class: classValue = '',
    id,
    ariaLabel = 'Tree view'
  } = props

  const itemList = items?.kind === 'signal' || items?.kind === 'computed'
    ? items.value
    : items

  if (id === undefined) {
    return html`<nav class="prism-tree-view ${classValue}" aria-label="${ariaLabel}"><ul class="prism-tree-list">${itemList.map(renderItem)}</ul></nav>`
  }

  return html`<nav class="prism-tree-view ${classValue}" id="${id}" aria-label="${ariaLabel}"><ul class="prism-tree-list">${itemList.map(renderItem)}</ul></nav>`
}

export const TreeViewComponent = props => component(TreeView, props)
