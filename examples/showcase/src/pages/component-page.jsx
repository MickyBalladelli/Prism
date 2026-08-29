import { computed, html, signal } from 'matrix'
import { Box, Button, Card, CheckBox, TextField } from 'prism-ui'
import { ShowcaseShell } from '../showcase-shell.jsx'

const componentInfo = {
  box: {
    eyebrow: 'Layout',
    title: 'Box',
    description: 'Tune layout props and see the wrapper update live.'
  },
  'text-field': {
    eyebrow: 'Forms',
    title: 'TextField',
    description: 'Play with the value, placeholder, required, and disabled props.'
  },
  'check-box': {
    eyebrow: 'Forms',
    title: 'CheckBox',
    description: 'Change the label and toggle the reactive checked state.'
  },
  card: {
    eyebrow: 'Layout',
    title: 'Card',
    description: 'Explore semantic markup and the Card action area.'
  },
  button: {
    eyebrow: 'Forms',
    title: 'Button',
    description: 'Change the label, compare core and feedback variants, try three palettes, and test the click behavior.'
  }
}

const createDetails = (visible, message) => computed(() => visible.value
  ? html`<p class="playground-note">${message}</p>`
  : null)

function BoxPlayground() {
  const content = signal('Live Box content')
  const tone = signal('lavender')
  const density = signal('comfortable')
  const showRole = signal(false)
  const boxClass = computed(() => `playground-box ${tone.value} ${density.value}`)
  const boxRole = computed(() => showRole.value ? 'region' : undefined)

  return {
    preview: (
      <Box class={boxClass} role={boxRole}>
        <strong>{content}</strong>
        <span>Change the settings to reshape this Box.</span>
      </Box>
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="box-content">Content</label>
        <TextField id="box-content" value={content} placeholder="Box content" />
        <label class="setting-label" htmlFor="box-tone">Tone</label>
        <select id="box-tone" value={tone} onChange={event => tone.value = event.currentTarget.value}>
          <option value="lavender">Lavender</option>
          <option value="mint">Mint</option>
          <option value="peach">Peach</option>
        </select>
        <label class="setting-label" htmlFor="box-density">Density</label>
        <select id="box-density" value={density} onChange={event => density.value = event.currentTarget.value}>
          <option value="compact">Compact</option>
          <option value="comfortable">Comfortable</option>
          <option value="airy">Airy</option>
        </select>
        <CheckBox checked={showRole}>Add role="region"</CheckBox>
      </div>
    )
  }
}

function TextFieldPlayground() {
  const value = signal('Ada Lovelace')
  const placeholder = signal('Type your name')
  const required = signal(false)
  const disabled = signal(false)
  const size = signal('medium')

  return {
    preview: (
      <div class="field-playground">
        <TextField
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          size={size}
        />
        <p class="playground-note">Current value: <strong>{value}</strong></p>
      </div>
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="field-placeholder">Placeholder</label>
        <TextField id="field-placeholder" value={placeholder} placeholder="Placeholder" />
        <label class="setting-label" htmlFor="field-size">Size</label>
        <select id="field-size" value={size} onChange={event => size.value = event.currentTarget.value}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <CheckBox checked={required}>Required</CheckBox>
        <CheckBox checked={disabled}>Disabled</CheckBox>
      </div>
    )
  }
}

function CheckBoxPlayground() {
  const checked = signal(true)
  const disabled = signal(false)
  const label = signal('Send me design updates')

  return {
    preview: (
      <div class="checkbox-playground">
        <CheckBox checked={checked} disabled={disabled}>
          {label}
        </CheckBox>
      </div>
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="checkbox-label">Label</label>
        <TextField id="checkbox-label" value={label} placeholder="Checkbox label" />
        <CheckBox checked={checked}>Checked</CheckBox>
        <CheckBox checked={disabled}>Disabled</CheckBox>
      </div>
    )
  }
}

function CardPlayground() {
  const actionLabel = signal('Open content')
  const actionDisabled = signal(false)
  const showRole = signal(false)
  const clickCount = signal(0)
  const cardRole = computed(() => showRole.value ? 'region' : undefined)

  return {
    preview: (
      <Card
        class="interactive-card"
        role={cardRole}
        actions={
          <Button
            class="card-action"
            disabled={actionDisabled}
            onClick={() => clickCount.update(value => value + 1)}
          >
            {actionLabel}
          </Button>
        }
      >
        <p class="eyebrow">Interactive Card</p>
        <h3>Card content</h3>
        <p class="card-copy">This Card has a configurable action area.</p>
        <p class="playground-note">Action clicks: <strong>{clickCount}</strong></p>
      </Card>
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="card-action-label">Action label</label>
        <TextField id="card-action-label" value={actionLabel} placeholder="Action label" />
        <CheckBox checked={actionDisabled}>Disable action</CheckBox>
        <CheckBox checked={showRole}>Add role="region"</CheckBox>
      </div>
    )
  }
}

function ButtonPlayground() {
  const label = signal('Press me')
  const disabled = signal(false)
  const clickCount = signal(0)
  const variant = signal('primary')
  const palette = signal('cobalt')
  const variantName = computed(() => {
    if (variant.value === 'secondary') {
      return 'Secondary'
    }

    if (variant.value === 'tertiary') {
      return 'Tertiary'
    }

    if (variant.value === 'error') {
      return 'Error'
    }

    if (variant.value === 'warning') {
      return 'Warning'
    }

    if (variant.value === 'information') {
      return 'Information'
    }

    if (variant.value === 'success') {
      return 'Success'
    }

    return 'Primary'
  })
  const paletteName = computed(() => {
    if (palette.value === 'iris') {
      return 'Iris'
    }

    if (palette.value === 'teal') {
      return 'Teal'
    }

    return 'Cobalt'
  })

  const handleVariantClick = nextVariant => {
    variant.value = nextVariant
    clickCount.update(value => value + 1)
  }

  return {
    preview: (
      <div class="button-playground" data-prism-palette={palette}>
        <div class="button-variant-group">
          <p class="button-group-label">Core roles</p>
          <div class="button-variant-preview" role="group" aria-label="Button variants in action">
            <div class="button-variant-card">
              <p class="button-variant-label">Primary</p>
              <Button
                variant="primary"
                disabled={disabled}
                onClick={() => handleVariantClick('primary')}
              >
                {label}
              </Button>
            </div>
            <div class="button-variant-card">
              <p class="button-variant-label">Secondary</p>
              <Button
                variant="secondary"
                disabled={disabled}
                onClick={() => handleVariantClick('secondary')}
              >
                {label}
              </Button>
            </div>
            <div class="button-variant-card">
              <p class="button-variant-label">Tertiary</p>
              <Button
                variant="tertiary"
                disabled={disabled}
                onClick={() => handleVariantClick('tertiary')}
              >
                {label}
              </Button>
            </div>
          </div>
        </div>
        <div class="button-variant-group">
          <p class="button-group-label">Feedback states</p>
          <div class="button-status-preview" role="group" aria-label="Feedback button states">
            <div class="button-variant-card">
              <p class="button-variant-label">Error</p>
              <Button
                variant="error"
                disabled={disabled}
                onClick={() => handleVariantClick('error')}
              >
                {label}
              </Button>
            </div>
            <div class="button-variant-card">
              <p class="button-variant-label">Warning</p>
              <Button
                variant="warning"
                disabled={disabled}
                onClick={() => handleVariantClick('warning')}
              >
                {label}
              </Button>
            </div>
            <div class="button-variant-card">
              <p class="button-variant-label">Information</p>
              <Button
                variant="information"
                disabled={disabled}
                onClick={() => handleVariantClick('information')}
              >
                {label}
              </Button>
            </div>
            <div class="button-variant-card">
              <p class="button-variant-label">Success</p>
              <Button
                variant="success"
                disabled={disabled}
                onClick={() => handleVariantClick('success')}
              >
                {label}
              </Button>
            </div>
          </div>
        </div>
        <p class="playground-note">Palette: <strong>{paletteName}</strong></p>
        <p class="playground-note">Last clicked: <strong>{variantName}</strong></p>
        <p class="playground-note">Clicks: <strong>{clickCount}</strong></p>
      </div>
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="button-label">Label</label>
        <TextField id="button-label" value={label} placeholder="Button label" />
        <p class="setting-label button-palette-label">Palette</p>
        <div class="button-palette-selector" role="group" aria-label="Button palette selector">
          <button
            type="button"
            class="button-palette-option button-palette-option-cobalt"
            data-selected={computed(() => palette.value === 'cobalt' ? 'true' : 'false')}
            onClick={() => palette.value = 'cobalt'}
          >
            <span class="button-palette-option-name">Cobalt</span>
            <span class="button-palette-swatches" aria-hidden="true">
              <span class="button-palette-swatch button-palette-swatch-primary"></span>
              <span class="button-palette-swatch button-palette-swatch-secondary"></span>
              <span class="button-palette-swatch button-palette-swatch-tertiary"></span>
            </span>
          </button>
          <button
            type="button"
            class="button-palette-option button-palette-option-iris"
            data-selected={computed(() => palette.value === 'iris' ? 'true' : 'false')}
            onClick={() => palette.value = 'iris'}
          >
            <span class="button-palette-option-name">Iris</span>
            <span class="button-palette-swatches" aria-hidden="true">
              <span class="button-palette-swatch button-palette-swatch-primary"></span>
              <span class="button-palette-swatch button-palette-swatch-secondary"></span>
              <span class="button-palette-swatch button-palette-swatch-tertiary"></span>
            </span>
          </button>
          <button
            type="button"
            class="button-palette-option button-palette-option-teal"
            data-selected={computed(() => palette.value === 'teal' ? 'true' : 'false')}
            onClick={() => palette.value = 'teal'}
          >
            <span class="button-palette-option-name">Teal</span>
            <span class="button-palette-swatches" aria-hidden="true">
              <span class="button-palette-swatch button-palette-swatch-primary"></span>
              <span class="button-palette-swatch button-palette-swatch-secondary"></span>
              <span class="button-palette-swatch button-palette-swatch-tertiary"></span>
            </span>
          </button>
        </div>
        <CheckBox checked={disabled}>Disabled</CheckBox>
      </div>
    )
  }
}

const playgrounds = {
  box: BoxPlayground,
  'text-field': TextFieldPlayground,
  'check-box': CheckBoxPlayground,
  card: CardPlayground,
  button: ButtonPlayground
}

export function ComponentPage({ name, link }) {
  const info = componentInfo[name]
  const createPlayground = playgrounds[name]

  if (!info || !createPlayground) {
    return (
      <ShowcaseShell link={link}>
        <main class="app-shell empty-page">
          <a class="back-link" href="/" onClick={link('/')}>← Back to components</a>
          <h1>Component not found</h1>
          <p class="hero-copy">Prism does not have a page for this component yet.</p>
        </main>
      </ShowcaseShell>
    )
  }

  const playground = createPlayground()

  return (
    <ShowcaseShell activeKey={name} link={link}>
      <main class="app-shell detail-page">
        <a class="back-link" href="/" onClick={link('/')}>← Back to components</a>
        <header class="detail-header">
          <p class="eyebrow">{info.eyebrow}</p>
          <h1>{info.title}</h1>
          <p class="hero-copy">{info.description}</p>
        </header>

        <section class="detail-layout" aria-label={`${info.title} playground`}>
          <Card class="detail-stage">
            <div class="stage-heading">
              <div>
                <p class="eyebrow">Live preview</p>
                <h2>{info.title} in action</h2>
              </div>
              <span class="live-dot">Live</span>
            </div>
            <div class="preview-surface">
              {playground.preview}
            </div>
          </Card>

          <Card class="settings-card">
            <p class="eyebrow">Props & settings</p>
            <h2>Play with it</h2>
            <p class="settings-copy">Change a setting. Preview updates instantly.</p>
            {playground.controls}
          </Card>
        </section>
      </main>
    </ShowcaseShell>
  )
}
