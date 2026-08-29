import { computed, html, signal } from 'matrix'
import { Box, Button, Card, CheckBox, Pulse, TextField, TreeView } from 'prism-ui'
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
  },
  pulse: {
    eyebrow: 'Status',
    title: 'Pulse',
    description: 'Tune a living status marker for healthy, informative, cautionary, and failing states.'
  },
  'tree-view': {
    eyebrow: 'Navigation',
    title: 'TreeView',
    description: 'Inspect nested navigation, active states, metadata chips, and branch expansion.'
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

function PulsePlayground() {
  const status = signal('success')
  const size = signal('large')
  const exampleClass = nextStatus => computed(() => status.value === nextStatus ? 'pulse-example-active' : '')

  return {
    preview: (
      <div class="pulse-playground">
        <div class="pulse-status-strip" role="group" aria-label="Pulse status examples">
          <Pulse status="success" size={size} class={exampleClass('success')}>Healthy</Pulse>
          <Pulse status="info" size={size} class={exampleClass('info')}>Syncing</Pulse>
          <Pulse status="warning" size={size} class={exampleClass('warning')}>Review</Pulse>
          <Pulse status="error" size={size} class={exampleClass('error')}>Offline</Pulse>
          <Pulse status="off" size={size} class={exampleClass('off')}>Off</Pulse>
        </div>
      </div>
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="pulse-status">Status</label>
        <select id="pulse-status" value={status} onChange={event => status.value = event.currentTarget.value}>
          <option value="success">Success</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
          <option value="off">Off</option>
        </select>
        <label class="setting-label" htmlFor="pulse-size">Size</label>
        <select id="pulse-size" value={size} onChange={event => size.value = event.currentTarget.value}>
          <option value="small">Small — dense UI</option>
          <option value="medium">Medium — default</option>
          <option value="large">Large — hero status</option>
        </select>
      </div>
    )
  }
}

function TreeViewPlayground() {
  const activeItem = signal('button')
  const showMeta = signal(true)
  const expanded = signal(true)

  const items = computed(() => [
    {
      label: 'Overview',
      active: activeItem.value === 'overview',
      meta: showMeta.value ? 'Home' : undefined
    },
    {
      label: 'Components',
      expanded: expanded.value,
      meta: showMeta.value ? '6' : undefined,
      children: [
        {
          label: 'Layout',
          expanded: expanded.value,
          meta: showMeta.value ? '2' : undefined,
          children: [
            {
              label: 'Box',
              active: activeItem.value === 'box'
            },
            {
              label: 'Card',
              active: activeItem.value === 'card'
            }
          ]
        },
        {
          label: 'Forms',
          expanded: expanded.value,
          meta: showMeta.value ? '3' : undefined,
          children: [
            {
              label: 'TextField',
              active: activeItem.value === 'text-field'
            },
            {
              label: 'CheckBox',
              active: activeItem.value === 'check-box'
            },
            {
              label: 'Button',
              active: activeItem.value === 'button'
            }
          ]
        },
        {
          label: 'Navigation',
          expanded: expanded.value,
          meta: showMeta.value ? '1' : undefined,
          children: [
            {
              label: 'TreeView',
              active: activeItem.value === 'tree-view'
            }
          ]
        }
      ]
    }
  ])

  return {
    preview: (
      <TreeView class="component-tree-preview" ariaLabel="Tree view playground" items={items} />
    ),
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="tree-active-item">Active item</label>
        <select id="tree-active-item" value={activeItem} onChange={event => activeItem.value = event.currentTarget.value}>
          <option value="overview">Overview</option>
          <option value="box">Box</option>
          <option value="card">Card</option>
          <option value="text-field">TextField</option>
          <option value="check-box">CheckBox</option>
          <option value="button">Button</option>
          <option value="tree-view">TreeView</option>
        </select>
        <CheckBox checked={showMeta}>Show metadata chips</CheckBox>
        <CheckBox checked={expanded}>Expand sections</CheckBox>
      </div>
    )
  }
}

const playgrounds = {
  box: BoxPlayground,
  'text-field': TextFieldPlayground,
  'check-box': CheckBoxPlayground,
  card: CardPlayground,
  button: ButtonPlayground,
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
