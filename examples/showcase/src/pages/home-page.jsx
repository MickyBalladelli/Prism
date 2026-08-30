import { Card } from 'prism-ui'
import { componentRegistry } from '../component-registry.js'
import { ShowcaseShell } from '../showcase-shell.jsx'
import { ShowDetailsButton } from '../show-details-button.jsx'

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
          {componentRegistry.map(component => (
            <Card
              key={component.key}
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
                    <span class="component-badge" key={`${component.key}-${item}`}>{item}</span>
                  ))}
                </div>
                <ul class="component-points" aria-label={`${component.title} details`}>
                  {component.details.map(item => (
                    <li key={`${component.key}-${item}`}>{item}</li>
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
