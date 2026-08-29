import { TreeView } from 'prism-ui'
import { iconCategories, iconCount } from './icon-catalog.js'

function createSidebarItems(link, activeKey) {
  return [
    {
      label: 'Overview',
      href: '/',
      onClick: link('/'),
      active: activeKey === 'overview',
      meta: 'Home'
    },
    {
      label: 'Components',
      meta: '9',
      expanded: true,
      children: [
        {
          label: 'Layout',
          meta: '2',
          expanded: true,
          children: [
            {
              label: 'Box',
              href: '/components/box',
              onClick: link('/components/box'),
              active: activeKey === 'box'
            },
            {
              label: 'Card',
              href: '/components/card',
              onClick: link('/components/card'),
              active: activeKey === 'card'
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
              active: activeKey === 'text-field'
            },
            {
              label: 'Select',
              href: '/components/select',
              onClick: link('/components/select'),
              active: activeKey === 'select'
            },
            {
              label: 'CheckBox',
              href: '/components/check-box',
              onClick: link('/components/check-box'),
              active: activeKey === 'check-box'
            },
            {
              label: 'Button',
              href: '/components/button',
              onClick: link('/components/button'),
              active: activeKey === 'button'
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
              active: activeKey === 'tree-view'
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
              active: activeKey === 'badge'
            },
            {
              label: 'Pulse',
              href: '/components/pulse',
              onClick: link('/components/pulse'),
              active: activeKey === 'pulse'
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
          active: activeKey === 'icons'
        },
        ...iconCategories.map(category => ({
          label: category.label,
          meta: String(category.icons.length),
          href: `/icons/${category.key}`,
          onClick: link(`/icons/${category.key}`),
          active: activeKey === `icons-${category.key}`
        }))
      ]
    }
  ]
}

export function ShowcaseShell({ activeKey = 'overview', link, children }) {
  const items = createSidebarItems(link, activeKey)

  return (
    <div class="showcase-frame">
      <aside class="showcase-sidebar">
        <div class="sidebar-brand">
          <div class="sidebar-brand-row">
            <span class="sidebar-brand-dot" aria-hidden="true"></span>
            <span class="sidebar-brand-name">prism ui</span>
          </div>
          <p class="sidebar-brand-copy">Component explorer</p>
        </div>
        <TreeView class="showcase-tree" ariaLabel="Prism UI navigation" items={items} />
      </aside>
      <div class="showcase-main">{children}</div>
    </div>
  )
}
