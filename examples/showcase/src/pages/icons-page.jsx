import { Button, Card, CodeViewer, PlusIcon } from 'prism-ui'
import { iconCategories, iconCount } from '../icon-catalog.js'
import { ShowcaseShell } from '../showcase-shell.jsx'

function IconCard({ icon, category }) {
  return (
    <Card class="icon-card">
      <div class="icon-card-heading">
        <div class="icon-preview" aria-hidden="true">
          {icon.component({ class: 'gallery-icon' })}
        </div>
        <span class="icon-group">{category.label}</span>
      </div>
      <h3>{icon.name}</h3>
      <p class="icon-description">{icon.description}</p>
      <div class="icon-code-block">
        <p class="code-label">Import + use</p>
        <CodeViewer
          tabs={[
            { id: 'jsx', label: 'JSX', language: 'jsx', filename: `${icon.name}.jsx`, code: icon.exampleJsx },
            { id: 'javascript', label: 'JavaScript', language: 'javascript', filename: `${icon.name}.js`, code: icon.exampleJs }
          ]}
          editable={false}
          class="icon-code-viewer"
          ariaLabel={`${icon.name} example code`}
        />
      </div>
    </Card>
  )
}

function IconScaleDemo() {
  return (
    <Card class="icon-scale-card">
      <div class="icon-scale-copy">
        <p class="eyebrow">Scale</p>
        <h2>One icon language. Every button.</h2>
        <p>Icons use <code>currentColor</code> and stay crisp from compact controls to high-emphasis actions.</p>
      </div>
      <div class="icon-scale-row" aria-label="Icon button sizes">
        <Button class="icon-scale-button icon-scale-small">
          <PlusIcon size="14" />
          Small
        </Button>
        <Button class="icon-scale-button">
          <PlusIcon size="18" />
          Medium
        </Button>
        <Button class="icon-scale-button icon-scale-large">
          <PlusIcon size="24" />
          Large action
        </Button>
      </div>
      <pre class="icon-scale-code"><code>{`import { Button, PlusIcon } from 'prism-ui'

<Button class="compact-action">
  <PlusIcon size="14" />
  Add item
</Button>`}</code></pre>
    </Card>
  )
}

export function IconsPage({ category, link }) {
  const selectedCategory = iconCategories.find(item => item.key === category)
  const categories = selectedCategory ? [selectedCategory] : iconCategories
  const pageTitle = selectedCategory ? selectedCategory.label : 'All icons'
  const pageDescription = selectedCategory
    ? selectedCategory.description
    : `${iconCount} original marks for actions, navigation, communication, status, files, workspace, and data.`
  const backPath = selectedCategory ? '/icons' : '/'
  const backLabel = selectedCategory ? '← Back to all icons' : '← Back to overview'
  const activeKey = selectedCategory ? `icons-${selectedCategory.key}` : 'icons'

  if (category && !selectedCategory) {
    return (
      <ShowcaseShell activeKey="icons" link={link}>
        <main class="app-shell empty-page">
          <a class="back-link" href="/icons" onClick={link('/icons')}>← Back to icons</a>
          <h1>Icon category not found</h1>
          <p class="hero-copy">Prism has no icon category called “{category}”.</p>
        </main>
      </ShowcaseShell>
    )
  }

  return (
    <ShowcaseShell activeKey={activeKey} link={link}>
      <main class="app-shell detail-page icons-page">
        <a class="back-link" href={backPath} onClick={link(backPath)}>{backLabel}</a>
        <header class="detail-header icons-header">
          <p class="eyebrow">Icons / {selectedCategory ? selectedCategory.icons.length : iconCount} exports</p>
          <h1>{pageTitle}<br /><em>One visual language.</em></h1>
          <p class="hero-copy">{pageDescription} Every icon is a lightweight SVG component with a named import.</p>
        </header>

        {!selectedCategory && <IconScaleDemo />}

        <div class="icon-catalog">
          {categories.map(categoryItem => (
            <section class="icon-category-section" key={categoryItem.key} aria-labelledby={`icon-category-${categoryItem.key}`}>
              <div class="icon-category-heading">
                <div>
                  <p class="eyebrow">Icon category</p>
                  <h2 id={`icon-category-${categoryItem.key}`}>{categoryItem.label}</h2>
                  <p>{categoryItem.description}</p>
                </div>
                {!selectedCategory && (
                  <a class="icon-category-link" href={`/icons/${categoryItem.key}`} onClick={link(`/icons/${categoryItem.key}`)}>
                    Open category <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
              <div class="icon-grid" aria-label={`${categoryItem.label} icons`}>
                {categoryItem.icons.map(icon => (
                  <IconCard key={icon.name} icon={icon} category={categoryItem} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <Card class="icon-guidance">
          <div>
            <p class="eyebrow">Usage note</p>
            <h2>Built to scale</h2>
          </div>
          <p>Set <code>color</code> on the icon or its parent. Use <code>size</code> when the default <code>1em</code> needs a fixed size. Icons are decorative by default; use <code>ariaLabel</code> when an icon carries meaning without visible text.</p>
        </Card>
      </main>
    </ShowcaseShell>
  )
}
