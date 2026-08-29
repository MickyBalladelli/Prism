import { Card } from 'prism-ui'
import { ShowcaseShell } from '../showcase-shell.jsx'
import { ShowDetailsButton } from '../show-details-button.jsx'

const components = [
  {
    key: 'background',
    path: '/components/background',
    eyebrow: 'Layout',
    title: 'Background',
    mark: '13',
    description: 'A reusable animated backdrop with named motion recipes, Prism-toned palettes, and an overlay content slot.',
    highlights: ['Named animations', 'Theme-friendly palettes', 'Content stays readable'],
    details: ['Thirteen motion recipes', 'Toggle the motion layer', 'Works as a real layout surface']
  },
  {
    key: 'label',
    path: '/components/label',
    eyebrow: 'Layout',
    title: 'Label',
    mark: '14',
    description: 'Typographic labels with size, typeface, and a character outline that stays readable over motion.',
    highlights: ['Size and typeface', 'Always-visible outline', 'Works over animation'],
    details: ['Four sizes', 'Sans, serif, and mono', 'Light or dark character borders']
  },
  {
    key: 'box',
    path: '/components/box',
    eyebrow: 'Layout',
    title: 'Box',
    mark: '01',
    description: 'A simple div wrapper for grouping content and layout styles.',
    highlights: ['Structure first', 'Flexible wrapper', 'Semantic-ready'],
    details: ['Content grouping', 'Class hooks', 'Role support']
  },
  {
    key: 'text-field',
    path: '/components/text-field',
    eyebrow: 'Forms',
    title: 'TextField',
    mark: '02',
    description: 'A text input bound to a Matrix signal.',
    highlights: ['Reactive input', 'Three sizes', 'Validation states'],
    details: ['Signal binding', 'Placeholder control', 'Required and disabled']
  },
  {
    key: 'select',
    path: '/components/select',
    eyebrow: 'Forms',
    title: 'Select',
    mark: '03',
    description: 'A styled option picker bound to a Matrix signal.',
    highlights: ['Option lists', 'Reactive value', 'Native behavior'],
    details: ['Label and value pairs', 'Disabled options', 'Required support']
  },
  {
    key: 'check-box',
    path: '/components/check-box',
    eyebrow: 'Forms',
    title: 'CheckBox',
    mark: '04',
    description: 'A checkbox that keeps its checked state reactive.',
    highlights: ['Writable state', 'Label pairing', 'Simple toggles'],
    details: ['Reactive checked value', 'Accessible label flow', 'Disabled support']
  },
  {
    key: 'card',
    path: '/components/card',
    eyebrow: 'Layout',
    title: 'Card',
    mark: '05',
    description: 'A semantic article wrapper for standalone content.',
    highlights: ['Article semantics', 'Optional action footer', 'Composed content'],
    details: ['Structured layouts', 'Footer actions', 'Standalone sections']
  },
  {
    key: 'button',
    path: '/components/button',
    eyebrow: 'Forms',
    title: 'Button',
    mark: '06',
    description: 'A button system with role variants, status states, and palette switching.',
    highlights: ['Seven variants', 'Pressed states', 'Palette-ready'],
    details: ['Primary to success', 'Hover and active motion', 'Theme-driven colors']
  },
  {
    key: 'badge',
    path: '/components/badge',
    eyebrow: 'Status',
    title: 'Badge',
    mark: '07',
    description: 'A compact count or state marker with optional change feedback.',
    highlights: ['Count-ready', 'Five tones', 'Change pulse'],
    details: ['Signal-friendly value', 'Semantic labels', 'Motion-aware']
  },
  {
    key: 'pulse',
    path: '/components/pulse',
    eyebrow: 'Status',
    title: 'Pulse',
    mark: '08',
    description: 'A pulsating status marker for live health, progress, and attention states.',
    highlights: ['Four statuses', 'Three sizes', 'Motion-aware'],
    details: ['Success to error', 'Button-ready scale', 'Reduced-motion safe']
  },
  {
    key: 'tree-view',
    path: '/components/tree-view',
    eyebrow: 'Navigation',
    title: 'TreeView',
    mark: '09',
    description: 'A polished navigation tree with nested branches, active items, and metadata chips.',
    highlights: ['Nested branches', 'Meta chips', 'Active states'],
    details: ['Expandable groups', 'Tree markers', 'Navigation structure']
  },
  {
    key: 'code-viewer',
    path: '/components/code-viewer',
    eyebrow: 'Data & Code',
    title: 'CodeViewer',
    mark: '10',
    description: 'An editable syntax-colored code surface with line numbers and one-click copying.',
    highlights: ['Live editing', 'Syntax colors', 'Copy action'],
    details: ['Line-number gutter', 'Custom token colors', 'Keyboard-friendly source']
  },
  {
    key: 'table',
    path: '/components/table',
    eyebrow: 'Data & Code',
    title: 'Table',
    mark: '11',
    description: 'A high-performance data surface with rich cells and durable user settings.',
    highlights: ['Rich columns', 'Resize + reorder', 'Settings as JSON'],
    details: ['Search, sort, and paginate', 'Selection and CSV export', 'Pinned columns and density modes']
  },
  {
    key: 'popup',
    path: '/components/popup',
    eyebrow: 'Overlay',
    title: 'Popup',
    mark: '12',
    description: 'An accessible dialog surface for focused decisions, details, and workflows.',
    highlights: ['Focus trapped', 'Four sizes', 'Three placements'],
    details: ['Backdrop and Escape dismissal', 'Flexible body and footer slots', 'Automatic focus restoration']
  }
]

export function HomePage({ link }) {
  return (
    <ShowcaseShell activeKey="overview" link={link}>
      <main class="app-shell">
        <header class="hero">
          <p class="eyebrow">Matrix component library</p>
          <h1>Small pieces.<br /><em>Clear interfaces.</em></h1>
          <p class="hero-copy">A tiny showcase of Prism components running on Matrix and bundled with Vite.</p>
        </header>

        <section class="component-grid" aria-label="Prism components">
          {components.map(component => (
            <Card
              class="component-card"
              actions={<ShowDetailsButton onClick={link(component.path)} />}
            >
              <div class="card-heading">
                <div>
                  <p class="eyebrow">{component.eyebrow}</p>
                  <h2>{component.title}</h2>
                </div>
                <span class="component-mark">{component.mark}</span>
              </div>
              <p class="card-copy">{component.description}</p>
              <div class="component-summary">
                <div class="component-badges" aria-label={`${component.title} highlights`}>
                  {component.highlights.map(item => (
                    <span class="component-badge">{item}</span>
                  ))}
                </div>
                <ul class="component-points" aria-label={`${component.title} details`}>
                  {component.details.map(item => (
                    <li>{item}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </section>

        <footer class="footer">
          <span>Prism</span>
          <span class="footer-line"></span>
          <span>Built with Matrix + Vite</span>
        </footer>
      </main>
    </ShowcaseShell>
  )
}
