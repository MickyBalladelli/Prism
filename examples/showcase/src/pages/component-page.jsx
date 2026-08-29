import { computed, html, signal } from 'matrix'
import { AlertIcon, Badge, Box, Button, Card, CheckBox, ClockIcon, ImageIcon, Pulse, Select, SparkIcon, TextField, TreeView, treeViewModels } from 'prism-ui'
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
  select: {
    eyebrow: 'Forms',
    title: 'Select',
    description: 'Choose one option from a list while keeping the selected value reactive.'
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
  },
  badge: {
    eyebrow: 'Status',
    title: 'Badge',
    description: 'Show compact counts and states, with an optional pulse when a reactive value changes.'
  },
  pulse: {
    eyebrow: 'Status',
    title: 'Pulse',
    description: 'Tune a living status marker for healthy, informative, cautionary, and failing states.'
  },
  'tree-view': {
    eyebrow: 'Navigation',
    title: 'TreeView',
    description: 'Inspect nested navigation, active states, metadata chips, branch expansion, and five visual models.'
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
        <Select
          id="box-tone"
          value={tone}
          options={[
            { value: 'lavender', label: 'Lavender' },
            { value: 'mint', label: 'Mint' },
            { value: 'peach', label: 'Peach' }
          ]}
        />
        <label class="setting-label" htmlFor="box-density">Density</label>
        <Select
          id="box-density"
          value={density}
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'comfortable', label: 'Comfortable' },
            { value: 'airy', label: 'Airy' }
          ]}
        />
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
        <Select
          id="field-size"
          value={size}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]}
        />
        <CheckBox checked={required}>Required</CheckBox>
        <CheckBox checked={disabled}>Disabled</CheckBox>
      </div>
    )
  }
}

function SelectPlayground() {
  const value = signal('spirited-away')
  const size = signal('medium')
  const placement = signal('bottom')
  const renderMode = signal('text')
  const options = [
    { value: 'spirited-away', label: 'Spirited Away' },
    { value: 'moonlight', label: 'Moonlight' },
    { value: 'midsommar', label: 'Midsommar' },
    { value: 'mulholland-drive', label: 'Mulholland Drive' },
    { value: 'parasite', label: 'Parasite' },
    { value: 'arrival', label: 'Arrival' },
    { value: 'grand-budapest-hotel', label: 'The Grand Budapest Hotel' }
  ]
  const movieDetails = {
    'spirited-away': { year: '2001', genre: 'Fantasy', rating: '8.6', icon: SparkIcon, poster: 'coral' },
    moonlight: { year: '2016', genre: 'Drama', rating: '7.4', icon: ClockIcon, poster: 'violet' },
    midsommar: { year: '2019', genre: 'Folk horror', rating: '7.1', icon: SparkIcon, poster: 'gold' },
    'mulholland-drive': { year: '2001', genre: 'Mystery', rating: '7.9', icon: ImageIcon, poster: 'blue' },
    parasite: { year: '2019', genre: 'Thriller', rating: '8.5', icon: AlertIcon, poster: 'gold' },
    arrival: { year: '2016', genre: 'Sci-Fi', rating: '7.9', icon: ImageIcon, poster: 'blue' },
    'grand-budapest-hotel': { year: '2014', genre: 'Comedy', rating: '8.1', icon: SparkIcon, poster: 'peach' }
  }
  const selectedLabel = computed(() => options.find(option => option.value === value.value)?.label ?? 'Nothing selected')
  const renderModeLabel = computed(() => ({
    text: 'Text',
    'icon-text': 'Icon + Text',
    'film-card': 'Film card'
  }[renderMode.value] ?? 'Text'))
  const renderMovieOption = option => {
    if (renderMode.value === 'text') {
      return option.label
    }

    const details = movieDetails[option.value] ?? movieDetails.arrival
    const Icon = details.icon

    if (renderMode.value === 'film-card') {
      return html`<span class="select-film-option"><span class="select-film-poster select-film-poster-${details.poster}" aria-hidden="true">${Icon({ size: '1.05em' })}</span><span class="select-film-copy"><span class="select-film-title">${option.label}</span><span class="select-film-meta">${details.year} · ${details.genre}</span></span><span class="select-film-rating">★ ${details.rating}</span></span>`
    }

    return html`<span class="select-rendered-option">${Icon({ class: 'select-rendered-icon', size: '1em' })}<span>${option.label}</span></span>`
  }

  return {
    preview: (
      <div class="select-playground">
        <div class="select-demo-card">
          <p class="select-demo-label">Movie night</p>
          <Select value={value} options={options} size={size} placement={placement} onRender={renderMovieOption} />
          <p class="playground-note">Selected movie: <strong>{selectedLabel}</strong></p>
          <p class="playground-note">Option rendering: <strong>{renderModeLabel}</strong></p>
        </div>
      </div>
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="select-size">Size</label>
        <Select
          id="select-size"
          value={size}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]}
        />
        <label class="setting-label" htmlFor="select-placement">Menu placement</label>
        <Select
          id="select-placement"
          value={placement}
          options={[
            { value: 'bottom', label: 'Bottom — default' },
            { value: 'top', label: 'Top' },
            { value: 'right', label: 'Right' },
            { value: 'left', label: 'Left' }
          ]}
        />
        <label class="setting-label" htmlFor="select-render-mode">Custom option rendering</label>
        <Select
          id="select-render-mode"
          value={renderMode}
          options={[
            { value: 'text', label: 'Text' },
            { value: 'icon-text', label: 'Icon + Text' },
            { value: 'film-card', label: 'Film card' }
          ]}
        />
        <p class="playground-note">The live movie Select uses <code>onRender</code> to follow this choice.</p>
        <p class="playground-note">Keyboard: ↑↓ move, type a letter to cycle, Enter accepts.</p>
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

function BadgePlayground() {
  const count = signal(12)
  const tone = signal('info')
  const size = signal('large')

  return {
    preview: (
      <div class="badge-playground">
        <div class="badge-live-card">
          <div class="badge-live-copy">
            <p class="badge-mode-label">Reactive count</p>
            <p class="badge-live-title">Unread messages</p>
            <p class="badge-live-description">Change the number to see the badge respond.</p>
          </div>
          <span class="badge-value-slot">
            <Badge value={count} tone={tone} size={size} pulseOnChange />
          </span>
          <Button variant="secondary" onClick={() => count.update(value => value + 1)}>
            Add message
          </Button>
        </div>
        <div class="badge-variant-strip" role="group" aria-label="Badge tone examples">
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="success">Ready</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="warning">Review</Badge>
          <Badge tone="error">Alert</Badge>
        </div>
      </div>
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="badge-tone">Tone</label>
        <Select
          id="badge-tone"
          value={tone}
          options={[
            { value: 'neutral', label: 'Neutral' },
            { value: 'success', label: 'Success' },
            { value: 'info', label: 'Info' },
            { value: 'warning', label: 'Warning' },
            { value: 'error', label: 'Error' }
          ]}
        />
        <label class="setting-label" htmlFor="badge-size">Size</label>
        <Select
          id="badge-size"
          value={size}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]}
        />
      </div>
    )
  }
}

function PulsePlayground() {
  const size = signal('large')
  const oncePulseTrigger = signal(0)
  const oncePulse = computed(() => {
    oncePulseTrigger.value
    return <Pulse status="success" animation="once" size={size}>Connected</Pulse>
  })

  return {
    preview: (
      <div class="pulse-playground">
        <div class="pulse-mode-examples" role="group" aria-label="Pulse animation examples">
          <div class="pulse-mode-card">
            <p class="pulse-mode-label">Once</p>
            <span class="pulse-example-slot">{oncePulse}</span>
            <Button variant="secondary" onClick={() => oncePulseTrigger.update(value => value + 1)}>
              Pulse once
            </Button>
            <p class="pulse-mode-description">One signal on mount or button press.</p>
          </div>
          <div class="pulse-mode-card">
            <p class="pulse-mode-label">Continuous</p>
            <Pulse status="info" animation="continuous" size={size}>Syncing</Pulse>
            <p class="pulse-mode-description">A repeating signal for live activity.</p>
          </div>
        </div>
        <div class="pulse-status-strip" role="group" aria-label="Pulse status examples">
          <Pulse status="success" size={size}>Healthy</Pulse>
          <Pulse status="info" size={size}>Syncing</Pulse>
          <Pulse status="warning" size={size}>Review</Pulse>
          <Pulse status="error" size={size}>Offline</Pulse>
          <Pulse status="off" size={size}>Off</Pulse>
        </div>
      </div>
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="pulse-size">Size</label>
        <Select
          id="pulse-size"
          value={size}
          options={[
            { value: 'small', label: 'Small — dense UI' },
            { value: 'medium', label: 'Medium — default' },
            { value: 'large', label: 'Large — hero status' }
          ]}
        />
      </div>
    )
  }
}

function TreeViewPlayground() {
  const showMeta = signal(true)
  const expanded = signal(true)
  const model = signal('nocturne')
  const modelName = computed(() => treeViewModels[model.value]?.label ?? treeViewModels.prism.label)
  const modelDescription = computed(() => treeViewModels[model.value]?.description ?? treeViewModels.prism.description)
  const modelOptions = Object.entries(treeViewModels).map(([value, definition]) => ({
    value,
    label: definition.label
  }))

  const items = computed(() => [
    {
      label: 'Overview',
      meta: showMeta.value ? 'Home' : undefined
    },
    {
      label: 'Components',
      expanded: expanded.value,
      meta: showMeta.value ? '7' : undefined,
      children: [
        {
          label: 'Layout',
          expanded: expanded.value,
          meta: showMeta.value ? '2' : undefined,
          children: [
            {
              label: 'Box'
            },
            {
              label: 'Card'
            }
          ]
        },
        {
          label: 'Forms',
          expanded: expanded.value,
          meta: showMeta.value ? '4' : undefined,
          children: [
            {
              label: 'TextField'
            },
            {
              label: 'Select'
            },
            {
              label: 'CheckBox'
            },
            {
              label: 'Button',
              active: true
            }
          ]
        },
        {
          label: 'Navigation',
          expanded: expanded.value,
          meta: showMeta.value ? '1' : undefined,
          children: [
            {
              label: 'TreeView'
            }
          ]
        }
      ]
    }
  ])

  return {
    preview: (
      <TreeView class="component-tree-preview" ariaLabel="Tree view playground" items={items} model={model} />
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="tree-model">Visual model</label>
        <Select id="tree-model" value={model} options={modelOptions} />
        <p class="tree-model-description"><strong>{modelName}</strong><span>{modelDescription}</span></p>
        <CheckBox checked={showMeta}>Show metadata chips</CheckBox>
        <CheckBox checked={expanded}>Expand sections</CheckBox>
        <p class="playground-note">Keyboard: ↑↓ move, type a letter to cycle, ←→ open or close, Enter or Space activates.</p>
      </div>
    )
  }
}

const playgrounds = {
  box: BoxPlayground,
  'text-field': TextFieldPlayground,
  select: SelectPlayground,
  'check-box': CheckBoxPlayground,
  card: CardPlayground,
  button: ButtonPlayground,
  badge: BadgePlayground,
  pulse: PulsePlayground,
  'tree-view': TreeViewPlayground
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
