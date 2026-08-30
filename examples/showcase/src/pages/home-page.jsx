import { Card } from '@mickyballadelli/prism'
import { componentRegistry } from '../component-registry.js'
import { exampleRegistry } from '../example-registry.js'
import { ShowcaseShell } from '../showcase-shell.jsx'
import { ShowDetailsButton } from '../show-details-button.jsx'

export function HomePage({ link, navigateTo }) {
  return (
    <ShowcaseShell activeKey="overview" link={link} navigateTo={navigateTo}>
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

        <section class="example-gallery" aria-labelledby="example-gallery-title">
          <div class="example-gallery-heading">
            <div>
              <p class="eyebrow">Application studies</p>
              <h2 id="example-gallery-title">Prism in the wild.</h2>
            </div>
            <p>Four small products adapted from Matrix examples. Each one shows how Prism components behave inside a real interaction loop.</p>
          </div>
          <div class="example-gallery-grid">
            {exampleRegistry.map(example => (
              <Card
                key={example.key}
                class="example-gallery-card"
                actions={<ShowDetailsButton onClick={link(example.path)} />}
              >
                <div class="card-heading">
                  <div>
                    <p class="eyebrow">{example.eyebrow}</p>
                    <h3>{example.title}</h3>
                  </div>
                  <span class="component-mark">{example.mark}</span>
                </div>
                <p class="card-copy">{example.description}</p>
                <div class="component-badges" aria-label={`${example.title} highlights`}>
                  {example.highlights.map(highlight => <span class="component-badge" key={`${example.key}-${highlight}`}>{highlight}</span>)}
                </div>
              </Card>
            ))}
          </div>
        </section>

      </main>
    </ShowcaseShell>
  )
}
