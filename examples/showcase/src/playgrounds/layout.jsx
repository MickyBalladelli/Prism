import { component, html } from '@mickyballadelli/matrix'
import { Card, Footer, Layout, Navigator, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'

const navigationItems = [
  { id: 'overview', label: 'Overview', active: true },
  { id: 'activity', label: 'Activity', meta: '12' },
  { id: 'settings', label: 'Settings' }
]

export function LayoutPlayground() {
  const codePreview = createCodePreview(codeLines(
    'Layout({',
    '  navigator: Navigator({',
    '    children: TreeView({ items: [{ label: "Overview" }] })',
    '  }),',
    '  children: Card({ children: "Workspace content" }),',
    '  footer: Footer({ children: "Made with intent." })',
    '})'
  ), { ...playgroundRuntime })

  return {
    ...codePreview,
    preview: html`<div class="p2-layout-demo">${component(Layout, {
      navigator: component(Navigator, {
        title: 'Workspace',
        description: 'Your focused command center.',
        children: component(TreeView, { items: navigationItems, itemVariant: 'minimal', ariaLabel: 'Workspace navigation' })
      }),
      children: Card({ children: html`<div class="p2-layout-content-demo"><span class="eyebrow">Main content</span><strong>One clear frame.</strong><span>Layout keeps navigation, content, and footer regions predictable.</span></div>` }),
      footer: component(Footer, { children: html`<span>Made with intent.</span>` })
    })}</div>`,
    controls: <div class="settings-list"><p class="playground-note">Layout composes an optional header, left navigator, content region, and footer without hiding the page structure.</p></div>
  }
}
