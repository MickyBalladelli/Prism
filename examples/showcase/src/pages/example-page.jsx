import { exampleRegistryByKey } from '../example-registry.js'
import { ShowcaseShell } from '../showcase-shell.jsx'
import { examplePages } from './examples/index.jsx'

function ExampleNotFound({ link, navigateTo }) {
  return (
    <ShowcaseShell link={link} navigateTo={navigateTo}>
      <main class="app-shell empty-page" role="alert">
        <a class="back-link" href="/" onClick={link('/')}>← Back to overview</a>
        <h1>Application not found</h1>
        <p class="hero-copy">Prism does not have an application study with that name yet.</p>
      </main>
    </ShowcaseShell>
  )
}

export function ExamplePage({ name, link, navigateTo }) {
  const example = exampleRegistryByKey[name]
  const Page = examplePages[name]

  if (!example || !Page) {
    return <ExampleNotFound link={link} navigateTo={navigateTo} />
  }

  return <Page example={example} link={link} navigateTo={navigateTo} />
}
