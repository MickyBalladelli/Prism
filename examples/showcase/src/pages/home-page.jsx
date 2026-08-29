import { signal } from 'matrix'
import { Box, Button, Card, CheckBox, TextField, TreeView } from 'prism-ui'
import { ShowcaseShell } from '../showcase-shell.jsx'
import { ShowDetailsButton } from '../show-details-button.jsx'

const name = signal('')
const updates = signal(true)
const buttonMessage = signal('Ready to click')
const treePreviewItems = [
  {
    label: 'Overview',
    active: true,
    meta: 'Home'
  },
  {
    label: 'Components',
    meta: '6',
    expanded: true,
    children: [
      {
        label: 'Forms',
        meta: '3',
        expanded: true,
        children: [
          { label: 'Button' },
          { label: 'TextField' },
          { label: 'CheckBox' }
        ]
      }
    ]
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
          <Card
            class="component-card"
            actions={<ShowDetailsButton onClick={link('/components/box')} />}
          >
            <div class="card-heading">
              <div>
                <p class="eyebrow">Layout</p>
                <h2>Box</h2>
              </div>
              <span class="component-mark">01</span>
            </div>
            <p class="card-copy">A simple div wrapper for grouping content and layout styles.</p>
            <Box class="box-preview">
              <span class="box-preview-icon">✦</span>
              <div>
                <strong>Content lives here</strong>
                <span>Box can hold text, templates, and other Prism components.</span>
              </div>
            </Box>
          </Card>

          <Card
            class="component-card"
            actions={<ShowDetailsButton onClick={link('/components/text-field')} />}
          >
            <div class="card-heading">
              <div>
                <p class="eyebrow">Forms</p>
                <h2>TextField</h2>
              </div>
              <span class="component-mark">02</span>
            </div>
            <p class="card-copy">A text input bound to a Matrix signal.</p>
            <label class="field-label" htmlFor="name-field">Your name</label>
            <TextField
              id="name-field"
              value={name}
              placeholder="Type something"
            />
          </Card>

          <Card
            class="component-card"
            actions={<ShowDetailsButton onClick={link('/components/check-box')} />}
          >
            <div class="card-heading">
              <div>
                <p class="eyebrow">Forms</p>
                <h2>CheckBox</h2>
              </div>
              <span class="component-mark">03</span>
            </div>
            <p class="card-copy">A checkbox that keeps its checked state reactive.</p>
            <div class="checkbox-preview">
              <CheckBox id="updates-checkbox" checked={updates}>
                Send me design updates
              </CheckBox>
            </div>
          </Card>

          <Card
            class="component-card"
            actions={<ShowDetailsButton onClick={link('/components/card')} />}
          >
            <div class="card-heading">
              <div>
                <p class="eyebrow">Layout</p>
                <h2>Card</h2>
              </div>
              <span class="component-mark">04</span>
            </div>
            <p class="card-copy">A semantic article wrapper for standalone content.</p>
            <Card class="card-preview">
              <p class="eyebrow">Nested Card</p>
              <strong>Content with meaning</strong>
              <span>Card renders as an article element.</span>
            </Card>
          </Card>

          <Card
            class="component-card"
            actions={<ShowDetailsButton onClick={link('/components/button')} />}
          >
            <div class="card-heading">
              <div>
                <p class="eyebrow">Forms</p>
                <h2>Button</h2>
              </div>
              <span class="component-mark">05</span>
            </div>
            <p class="card-copy">A button with Matrix event handling and disabled state.</p>
            <div class="button-preview">
              <Button
                onClick={() => buttonMessage.value = 'Button clicked'}
              >
                Click me
              </Button>
              <span>{buttonMessage}</span>
            </div>
          </Card>

          <Card
            class="component-card"
            actions={<ShowDetailsButton onClick={link('/components/tree-view')} />}
          >
            <div class="card-heading">
              <div>
                <p class="eyebrow">Navigation</p>
                <h2>TreeView</h2>
              </div>
              <span class="component-mark">06</span>
            </div>
            <p class="card-copy">A polished navigation tree with nested branches, active items, and metadata chips.</p>
            <TreeView class="tree-card-preview" items={treePreviewItems} ariaLabel="Tree view preview" />
          </Card>
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
