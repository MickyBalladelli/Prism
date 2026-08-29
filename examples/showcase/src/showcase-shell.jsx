import { html } from 'matrix'
import { FileIcon, FolderIcon, TreeView } from 'prism-ui'
import { iconCategories, iconCount } from './icon-catalog.js'
import { ThemePicker, showcaseThemeModel } from './theme-picker.jsx'

function sidebarItemDetail(item, context) {
  if (context.type === 'branch') {
    return `${item.children?.length ?? 0} items`
  }

  return item.detail ?? item.label
}

function renderSidebarItem(item, context) {
  const Icon = context.type === 'branch' ? FolderIcon : FileIcon
  const detail = sidebarItemDetail(item, context)

  return html`<span class="tree-rendered-rich"><span class="tree-rendered-icon" aria-hidden="true">${Icon({ size: '1.05em' })}</span><span class="tree-rendered-rich-copy"><strong>${item.label}</strong><small>${detail}</small></span></span>`
}

const iconCategoryDetails = {
  actions: 'Create, find, dismiss',
  navigation: 'Move through a product',
  communication: 'Mail, chat, share',
  status: 'State and progress',
  files: 'Docs, folders, media',
  workspace: 'People, time, place',
  data: 'Lists, code, grids'
}

function createSidebarItems(link, activeKey) {
  return [
    {
      label: 'Overview',
      href: '/',
      onClick: link('/'),
      active: activeKey === 'overview',
      meta: 'Home',
      detail: 'Start of the explorer'
    },
    {
      label: 'Components',
      meta: '14',
      expanded: true,
      children: [
        {
          label: 'Layout',
          meta: '4',
          expanded: true,
          children: [
            {
              label: 'Background',
              href: '/components/background',
              onClick: link('/components/background'),
              active: activeKey === 'background',
              detail: 'Animated backdrop'
            },
            {
              label: 'Label',
              href: '/components/label',
              onClick: link('/components/label'),
              active: activeKey === 'label',
              detail: 'Readable over motion'
            },
            {
              label: 'Box',
              href: '/components/box',
              onClick: link('/components/box'),
              active: activeKey === 'box',
              detail: 'Layout wrapper'
            },
            {
              label: 'Card',
              href: '/components/card',
              onClick: link('/components/card'),
              active: activeKey === 'card',
              detail: 'Standalone content'
            }
          ]
        },
        {
          label: 'Forms',
          meta: '4',
          expanded: true,
          children: [
            {
              label: 'TextField',
              href: '/components/text-field',
              onClick: link('/components/text-field'),
              active: activeKey === 'text-field',
              detail: 'Reactive text input'
            },
            {
              label: 'Select',
              href: '/components/select',
              onClick: link('/components/select'),
              active: activeKey === 'select',
              detail: 'Option picker'
            },
            {
              label: 'CheckBox',
              href: '/components/check-box',
              onClick: link('/components/check-box'),
              active: activeKey === 'check-box',
              detail: 'On or off toggle'
            },
            {
              label: 'Button',
              href: '/components/button',
              onClick: link('/components/button'),
              active: activeKey === 'button',
              detail: 'Actions and palettes'
            }
          ]
        },
        {
          label: 'Navigation',
          meta: '1',
          expanded: true,
          children: [
            {
              label: 'TreeView',
              href: '/components/tree-view',
              onClick: link('/components/tree-view'),
              active: activeKey === 'tree-view',
              detail: 'Nested navigation'
            }
          ]
        },
        {
          label: 'Status',
          meta: '2',
          expanded: true,
          children: [
            {
              label: 'Badge',
              href: '/components/badge',
              onClick: link('/components/badge'),
              active: activeKey === 'badge',
              detail: 'Compact count'
            },
            {
              label: 'Pulse',
              href: '/components/pulse',
              onClick: link('/components/pulse'),
              active: activeKey === 'pulse',
              detail: 'Live status beat'
            }
          ]
        },
        {
          label: 'Overlay',
          meta: '1',
          expanded: true,
          children: [
            {
              label: 'Popup',
              href: '/components/popup',
              onClick: link('/components/popup'),
              active: activeKey === 'popup',
              detail: 'Focused dialog'
            }
          ]
        },
        {
          label: 'Data & Code',
          meta: '2',
          expanded: true,
          children: [
            {
              label: 'CodeViewer',
              href: '/components/code-viewer',
              onClick: link('/components/code-viewer'),
              active: activeKey === 'code-viewer',
              detail: 'Editable syntax view'
            },
            {
              label: 'Table',
              href: '/components/table',
              onClick: link('/components/table'),
              active: activeKey === 'table',
              detail: 'Searchable data grid'
            }
          ]
        }
      ]
    },
    {
      label: 'Icons',
      meta: String(iconCount),
      expanded: true,
      children: [
        {
          label: 'All icons',
          href: '/icons',
          onClick: link('/icons'),
          active: activeKey === 'icons',
          detail: 'Full icon library'
        },
        ...iconCategories.map(category => ({
          label: category.label,
          meta: String(category.icons.length),
          href: `/icons/${category.key}`,
          onClick: link(`/icons/${category.key}`),
          active: activeKey === `icons-${category.key}`,
          detail: iconCategoryDetails[category.key] ?? 'Icon set'
        }))
      ]
    }
  ]
}

export function ShowcaseShell({ activeKey = 'overview', link, children }) {
  const items = createSidebarItems(link, activeKey)

  return (
    <div class="showcase-frame">
      <div class="showcase-topbar">
        <ThemePicker />
      </div>
      <aside class="showcase-sidebar">
        <div class="sidebar-brand">
          <div class="sidebar-brand-row">
            <span class="sidebar-brand-dot" aria-hidden="true"></span>
            <span class="sidebar-brand-name">prism ui</span>
          </div>
          <p class="sidebar-brand-copy">Component explorer</p>
        </div>
        <TreeView class="showcase-tree" ariaLabel="Prism UI navigation" items={items} model={showcaseThemeModel} itemVariant="minimal" onRender={renderSidebarItem} />
      </aside>
      <div class="showcase-main">{children}</div>
    </div>
  )
}
