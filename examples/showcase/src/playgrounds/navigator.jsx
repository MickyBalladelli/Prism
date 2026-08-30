import { component, html } from '@mickyballadelli/matrix'
import { Navigator, TreeView } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'

const navigationItems = [
  { id: 'overview', label: 'Overview', active: true },
  { id: 'projects', label: 'Projects', meta: '4' },
  { id: 'team', label: 'Team', meta: '8' }
]

export function NavigatorPlayground() {
  const codePreview = createCodePreview(codeLines(
    'Navigator({',
    '  title: "Workspace",',
    '  description: "Your focused command center.",',
    '  children: TreeView({',
    '    items: [{ label: "Overview", active: true }],',
    '    itemVariant: "minimal"',
    '  })',
    '})'
  ), { ...playgroundRuntime })

  return {
    ...codePreview,
    preview: html`<div class="p2-navigator-demo">${component(Navigator, {
      title: 'Workspace',
      description: 'Your focused command center.',
      children: component(TreeView, { items: navigationItems, itemVariant: 'minimal', ariaLabel: 'Workspace navigation' }),
      footer: html`<span class="p2-navigator-status"><span class="p2-navigator-status-dot"></span>All systems clear</span>`
    })}</div>`,
    controls: <div class="settings-list"><p class="playground-note">Navigator is a semantic navigation landmark designed to sit in a Layout pane.</p></div>
  }
}
