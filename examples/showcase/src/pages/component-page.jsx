import { html } from '@mickyballadelli/matrix'
import { Box, Card, CodeViewer } from '@mickyballadelli/prism'
import { componentRegistryByKey } from '../component-registry.js'
import { ShowcaseShell } from '../showcase-shell.jsx'
import { playgrounds } from '../playgrounds/index.jsx'

function createPlaygroundState(createPlayground) {
  try {
    return { status: 'ready', value: createPlayground() }
  } catch (error) {
    return { status: 'error', error }
  }
}

function PreviewState({ info, playgroundState }) {
  if (playgroundState.status === 'error') {
    return html`<div class="playground-code-error" role="alert"><strong>Preview paused</strong><span>${String(playgroundState.error?.message ?? playgroundState.error)}</span><button type="button" @click=${() => window.location.reload()}>Reload preview</button></div>`
  }

  return playgroundState.value?.preview ?? html`<div class="playground-loading" role="status" aria-live="polite"><span class="playground-loading-spinner" aria-hidden="true"></span><span>Preparing ${info.title} preview…</span></div>`
}

function ComponentNotFound({ link, navigateTo }) {
  return (
    <ShowcaseShell link={link} navigateTo={navigateTo}>
      <main class="app-shell empty-page" role="alert">
        <a class="back-link" href="/" onClick={link('/')}>← Back to components</a>
        <h1>Component not found</h1>
        <p class="hero-copy">Prism does not have a page for this component yet.</p>
      </main>
    </ShowcaseShell>
  )
}

export function ComponentPage({ name, link, navigateTo }) {
  const info = componentRegistryByKey[name]
  const createPlayground = playgrounds[name]

  if (!info || !createPlayground) {
    return <ComponentNotFound link={link} navigateTo={navigateTo} />
  }

  const playgroundState = createPlaygroundState(createPlayground)
  const playground = playgroundState.value

  return (
    <ShowcaseShell activeKey={name} link={link} navigateTo={navigateTo}>
      <main class="app-shell detail-page">
        <a class="back-link" href="/" onClick={link('/')}>← Back to components</a>
        <header class="detail-header">
          <p class="eyebrow">{info.eyebrow}</p>
          <h1>{info.title}</h1>
          <p class="hero-copy">{info.description}</p>
        </header>

        <section class={`detail-layout detail-layout-${name}`} aria-label={`${info.title} playground`}>
          <Card class="detail-stage">
            <div class="stage-heading">
              <div>
                <p class="eyebrow">Live preview</p>
                <h2>{info.title} in action</h2>
              </div>
              <span class="live-dot">Live</span>
            </div>
            <div class="preview-surface" aria-live="polite">
              <PreviewState info={info} playgroundState={playgroundState} />
            </div>
          </Card>

          <Box class="detail-settings-rail">
            <Card class="settings-card">
              <p class="eyebrow">Props & settings</p>
              <h2>Play with it</h2>
              <p class="settings-copy">Change a setting. Preview updates instantly.</p>
              {playground?.controls ?? html`<p class="playground-code-error" role="alert">Settings are unavailable while this preview is paused.</p>`}
            </Card>
          </Box>

          <Card class="detail-code-card">
            <div class="detail-code-heading">
              <div>
                <p class="eyebrow">Source recipe</p>
                <h2>Inspect the recipe</h2>
              </div>
              <span class="detail-code-hint">Preview follows</span>
            </div>
            {playground ? (
              <CodeViewer
                class="detail-code-viewer"
                activeTab={playground.recipeLanguage}
                tabs={[
                  { id: 'jsx', label: 'JSX', language: 'jsx', filename: `${info.title}.recipe.jsx`, code: playground.jsxCode },
                  { id: 'javascript', label: 'JavaScript', language: 'javascript', filename: `${info.title}.recipe.js`, code: playground.javascript }
                ]}
                editable={false}
                ariaLabel={`${info.title} source recipe`}
              />
            ) : (
              <div class="playground-code-error" role="alert"><strong>Recipe unavailable</strong><span>Fix the preview error before inspecting this source.</span></div>
            )}
            <p class="playground-note">Read the recipe above. Use the controls to change the safe live preview.</p>
          </Card>
        </section>
      </main>
    </ShowcaseShell>
  )
}
