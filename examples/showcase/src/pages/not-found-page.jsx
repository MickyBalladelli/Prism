import { ShowcaseShell } from '../showcase-shell.jsx'

export function NotFoundPage({ link }) {
  return (
    <ShowcaseShell link={link}>
      <main class="app-shell empty-page" role="alert">
        <a class="back-link" href="/" onClick={link('/')}>← Back to components</a>
        <h1>Page not found</h1>
        <p class="hero-copy">This Prism page does not exist.</p>
      </main>
    </ShowcaseShell>
  )
}
