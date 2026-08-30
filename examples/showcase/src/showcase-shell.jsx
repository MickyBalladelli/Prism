import { computed, html, onMount, signal } from '@mickyballadelli/matrix'
import { componentGroups, componentRegistry, componentRegistryByGroup } from './component-registry.js'
import { exampleRegistry } from './example-registry.js'
import { FileIcon, FolderIcon, Footer, Header, Layout, MatrixIcon, Navigator, PrismIcon, TreeView } from 'prism-ui'
import { iconCategories, iconCount } from './icon-catalog.js'
import { ThemePicker, SettingsPopup, showcaseThemeModel } from './theme-picker.jsx'

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

function createComponentSidebarGroup(group, link, activeKey) {
  const components = componentRegistryByGroup(group.label)

  return {
    id: group.key,
    label: group.label,
    meta: String(components.length),
    expanded: true,
    children: components.map(component => ({
      id: component.key,
      label: component.title,
      href: component.path,
      onClick: link(component.path),
      active: activeKey === component.key,
      detail: component.description
    }))
  }
}

function createSidebarItems(link, activeKey) {
  return [
    {
      id: 'overview',
      label: 'Overview',
      href: '/',
      onClick: link('/'),
      active: activeKey === 'overview',
      meta: 'Home',
      detail: 'Start of the explorer'
    },
    {
      id: 'api',
      label: 'API reference',
      href: '/api',
      onClick: link('/api'),
      active: activeKey === 'api',
      meta: 'Docs',
      detail: 'Props and contracts'
    },
    {
      id: 'examples',
      label: 'Applications',
      meta: String(exampleRegistry.length),
      expanded: true,
      children: exampleRegistry.map(example => ({
        id: `example-${example.key}`,
        label: example.title,
        href: example.path,
        onClick: link(example.path),
        active: activeKey === `example-${example.key}`,
        detail: example.description
      }))
    },
    {
      id: 'components',
      label: 'Components',
      meta: String(componentRegistry.length),
      expanded: true,
      children: componentGroups.map(group => createComponentSidebarGroup(group, link, activeKey))
    },
    {
      id: 'icons',
      label: 'Icons',
      meta: String(iconCount),
      expanded: true,
      children: [
        {
          id: 'all-icons',
          label: 'All icons',
          href: '/icons',
          onClick: link('/icons'),
          active: activeKey === 'icons',
          detail: 'Full icon library'
        },
        ...iconCategories.map(category => ({
          id: `icons-${category.key}`,
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


export function ShowcaseShell({ activeKey = 'overview', link, navigateTo, children }) {
  const mobileNavigationOpen = signal(false)
  const closeNavigation = () => mobileNavigationOpen.value = false
  const isPlainPrimaryClick = event => event
    && !event.defaultPrevented
    && event.button === 0
    && !event.metaKey
    && !event.ctrlKey
    && !event.shiftKey
    && !event.altKey
  const navigate = path => event => {
    closeNavigation()
    if (typeof navigateTo !== 'function') return link(path)(event)
    if (!isPlainPrimaryClick(event)) return
    event.preventDefault()
    return navigateTo(path)
  }
  const items = createSidebarItems(navigate, activeKey)

  onMount(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeNavigation()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <div class="showcase-shell">
      <Layout
        class="showcase-layout"
        header={(
          <Header
            class="showcase-header"
            ariaLabel="Prism UI"
            trailing={(
              <div class="showcase-header-actions">
                <span class="showcase-matrix-badge" title="Powered by Matrix">
                  {MatrixIcon({ size: '1.35rem' })}
                  <span><small>Powered by</small><strong>Matrix</strong></span>
                </span>
                <ThemePicker />
              </div>
            )}
          >
            <a class="showcase-header-brand" href="/" onClick={navigate('/')}>
              <span class="showcase-prism-mark" aria-hidden="true">{PrismIcon({ size: '1.8rem' })}</span>
              <span class="showcase-header-brand-copy">
                <strong>prism ui</strong>
                <small>Component explorer</small>
              </span>
            </a>
          </Header>
        )}
        navigator={(
          <Navigator
            id="showcase-navigator"
            class={computed(() => `showcase-navigator ${mobileNavigationOpen.value ? 'is-open' : ''}`)}
            ariaLabel="Prism UI navigation"
          >
            <TreeView class="showcase-tree" ariaLabel="Prism UI navigation" items={items} model={showcaseThemeModel} itemVariant="minimal" onRender={renderSidebarItem} />
          </Navigator>
        )}
        footer={(
          <Footer class="showcase-footer">
            <span>Prism UI</span>
            <span class="footer-line" aria-hidden="true"></span>
            <span>Built with Matrix + Vite</span>
          </Footer>
        )}
      >
        <SettingsPopup />
        <div class="showcase-content">
          <div class="showcase-mobile-nav-bar">
            <span class="showcase-mobile-nav-label">Explore Prism</span>
            <button
              class="showcase-nav-toggle"
              type="button"
              aria-controls="showcase-navigator"
              aria-expanded={mobileNavigationOpen}
              onClick={() => mobileNavigationOpen.value = !mobileNavigationOpen.value}
            >
              <span class="showcase-nav-toggle-icon" aria-hidden="true">{mobileNavigationOpen.value ? '×' : '☰'}</span>
              <span>{mobileNavigationOpen.value ? 'Close navigation' : 'Browse navigation'}</span>
            </button>
          </div>
          {mobileNavigationOpen.value ? <button class="showcase-nav-backdrop" type="button" aria-label="Close navigation" onClick={closeNavigation}></button> : null}
          <div class="showcase-main">{children}</div>
        </div>
      </Layout>
    </div>
  )
}
