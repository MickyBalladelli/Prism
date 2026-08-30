import { ArrowLeftIcon, ArrowRightIcon, Tag } from 'prism-ui'
import { ShowcaseShell } from '../showcase-shell.jsx'

export function ExamplePageShell({ example, link, children }) {
  return (
    <ShowcaseShell activeKey={`example-${example.key}`} link={link}>
      <main class={`app-shell detail-page example-page example-page-${example.key}`}>
        <a class="back-link" href="/" onClick={link('/')}>
          <ArrowLeftIcon size=".9em" /> Back to overview
        </a>
        <header class="detail-header example-detail-header">
          <div class="example-header-kicker">
            <p class="eyebrow">{example.eyebrow}</p>
            <Tag tone="neutral">Prism application</Tag>
          </div>
          <h1>{example.title}</h1>
          <p class="hero-copy">{example.description}</p>
        </header>

        {children}

        <footer class="footer example-footer">
          <span>Prism application study</span>
          <span class="footer-line"></span>
          <a href="/" onClick={link('/')}>Back to showcase <ArrowRightIcon size=".9em" /></a>
        </footer>
      </main>
    </ShowcaseShell>
  )
}

export function ExampleMetric({ label, value, detail, tone = 'neutral' }) {
  return (
    <div class={`example-metric example-metric-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  )
}
