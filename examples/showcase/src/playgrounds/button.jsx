import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function ButtonPlayground() {
  const label = signal('Launch project')
  const showLabel = signal(true)
  const iconName = signal('spark')
  const iconPosition = signal('start')
  const variant = signal('primary')
  const size = signal('large')
  const shape = signal('rounded')
  const fullWidth = signal(false)
  const loading = signal(false)
  const loadingLabel = signal('Launching project')
  const pressed = signal(false)
  const disabled = signal(false)
  const ariaLabel = signal('Launch project')
  const palette = signal('cobalt')
  const clickCount = signal(0)
  const buttonIcons = {
    spark: SparkIcon,
    plus: PlusIcon,
    send: SendIcon,
    download: DownloadIcon,
    settings: SettingsIcon
  }
  const buttonIcon = computed(() => {
    const Icon = buttonIcons[iconName.value]
    return Icon ? Icon({ size: '1em' }) : undefined
  })
  const variantName = computed(() => ({
    primary: 'Primary',
    secondary: 'Secondary',
    tertiary: 'Tertiary',
    error: 'Error',
    warning: 'Warning',
    information: 'Information',
    success: 'Success'
  })[variant.value] || 'Primary')
  const iconNameLabel = computed(() => ({
    none: 'No icon',
    spark: 'Spark',
    plus: 'Plus',
    send: 'Send',
    download: 'Download',
    settings: 'Settings'
  })[iconName.value] || 'No icon')
  const buttonIconRecipe = computed(() => iconName.value === 'none'
    ? 'undefined'
    : `${iconName.value[0].toUpperCase()}${iconName.value.slice(1)}Icon({ size: "1em" })`)
  const javascript = computed(() => codeLines(
    'html`',
    `  <div class="button-playground" data-prism-palette="${palette.value}">`,
    '    <section class="button-composer">',
    '      <div class="button-composer-head">',
    '        <div>',
    '          <p class="button-group-label">Live composition</p>',
    '          <h3>One button, every voice.</h3>',
    '          <p>Remove the text, move the icon, or turn the action into a loading state.</p>',
    '        </div>',
    '        <span class="button-click-count"><strong>${clickCount}</strong> clicks</span>',
    '      </div>',
    '      <div class="button-demo-well">',
    '        ${Button({',
    '          class: "button-live-example",',
    `          label: ${JSON.stringify(label.value)},`,
    `          showLabel: ${showLabel.value},`,
    `          icon: ${buttonIconRecipe.value},`,
    `          iconPosition: "${iconPosition.value}",`,
    `          variant: "${variant.value}",`,
    `          size: "${size.value}",`,
    `          shape: "${shape.value}",`,
    `          fullWidth: ${fullWidth.value},`,
    `          loading: ${loading.value},`,
    `          loadingLabel: ${JSON.stringify(loadingLabel.value)},`,
    `          pressed: ${pressed.value},`,
    `          disabled: ${disabled.value},`,
    `          ariaLabel: ${JSON.stringify(ariaLabel.value)},`,
    '          onClick: () => clickCount.update(value => value + 1)',
    '        })}',
    '      </div>',
    '      <div class="button-composer-meta" aria-label="Current button configuration">',
    '        <span>${variantName}</span>',
    '        <span>${size}</span>',
    '        <span>${shape}</span>',
    '        <span>${iconNameLabel}</span>',
    '      </div>',
    '      <div class="button-recipe-shelf">',
    '        <p class="button-group-label">Composition recipes</p>',
    '        <div class="button-recipe-row" role="group" aria-label="Button composition examples">',
    '          ${Button({ variant: "secondary", size: "small", label: "Text only" })}',
    '          ${Button({ variant: "tertiary", size: "small", label: "Create", icon: PlusIcon({ size: "1em" }) })}',
    '          ${Button({ variant: "information", size: "small", label: "Send", icon: SendIcon({ size: "1em" }), iconPosition: "end" })}',
    '          ${Button({ variant: "secondary", size: "small", shape: "pill", label: "Settings", showLabel: false, icon: SettingsIcon({ size: "1em" }), ariaLabel: "Settings" })}',
    '        </div>',
    '      </div>',
    '    </section>',
    '  </div>',
    '`'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))

  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="button-playground" data-prism-palette="${palette}">',
    '    <section class="button-composer">',
    '      <div class="button-composer-head">',
    '        <div>',
    '          <p class="button-group-label">Live composition</p>',
    '          <h3>One button, every voice.</h3>',
    '          <p>Remove the text, move the icon, or turn the action into a loading state.</p>',
    '        </div>',
    '        <span class="button-click-count"><strong>${clickCount}</strong> clicks</span>',
    '      </div>',
    '      <div class="button-demo-well">',
    '        ${Button({',
    '          class: "button-live-example",',
    '          label,',
    '          showLabel,',
    '          icon: buttonIcon,',
    '          iconPosition,',
    '          variant,',
    '          size,',
    '          shape,',
    '          fullWidth,',
    '          loading,',
    '          loadingLabel,',
    '          pressed,',
    '          disabled,',
    '          ariaLabel,',
    '          onClick: () => clickCount.update(value => value + 1)',
    '        })}',
    '      </div>',
    '      <div class="button-composer-meta" aria-label="Current button configuration">',
    '        <span>${variantName}</span>',
    '        <span>${size}</span>',
    '        <span>${shape}</span>',
    '        <span>${iconNameLabel}</span>',
    '      </div>',
    '      <div class="button-recipe-shelf">',
    '        <p class="button-group-label">Composition recipes</p>',
    '        <div class="button-recipe-row" role="group" aria-label="Button composition examples">',
    '          ${Button({ variant: "secondary", size: "small", label: "Text only" })}',
    '          ${Button({ variant: "tertiary", size: "small", label: "Create", icon: PlusIcon({ size: "1em" }) })}',
    '          ${Button({ variant: "information", size: "small", label: "Send", icon: SendIcon({ size: "1em" }), iconPosition: "end" })}',
    '          ${Button({ variant: "secondary", size: "small", shape: "pill", label: "Settings", showLabel: false, icon: SettingsIcon({ size: "1em" }), ariaLabel: "Settings" })}',
    '        </div>',
    '      </div>',
    '    </section>',
    '  </div>',
    '`'
  ), {
    ...playgroundRuntime,
    ariaLabel,
    buttonIcon,
    clickCount,
    disabled,
    fullWidth,
    iconNameLabel,
    iconPosition,
    label,
    loading,
    loadingLabel,
    palette,
    pressed,
    shape,
    showLabel,
    size,
    variant,
    variantName
  })

  return {
    javascript,
    jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="button-label">Label</label>
        <TextField id="button-label" value={label} placeholder="Button label" />
        <CheckBox checked={showLabel}>Show label</CheckBox>
        <label class="setting-label" htmlFor="button-icon">Icon</label>
        <Select
          id="button-icon"
          value={iconName}
          options={[
            { value: 'none', label: 'No icon' },
            { value: 'spark', label: 'Spark' },
            { value: 'plus', label: 'Plus' },
            { value: 'send', label: 'Send' },
            { value: 'download', label: 'Download' },
            { value: 'settings', label: 'Settings' }
          ]}
        />
        <label class="setting-label" htmlFor="button-icon-position">Icon position</label>
        <Select
          id="button-icon-position"
          value={iconPosition}
          options={[
            { value: 'start', label: 'Start' },
            { value: 'end', label: 'End' }
          ]}
        />
        <label class="setting-label" htmlFor="button-variant">Variant</label>
        <Select
          id="button-variant"
          value={variant}
          options={[
            { value: 'primary', label: 'Primary' },
            { value: 'secondary', label: 'Secondary' },
            { value: 'tertiary', label: 'Tertiary' },
            { value: 'success', label: 'Success' },
            { value: 'information', label: 'Information' },
            { value: 'warning', label: 'Warning' },
            { value: 'error', label: 'Error' }
          ]}
        />
        <label class="setting-label" htmlFor="button-size">Size</label>
        <Select
          id="button-size"
          value={size}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]}
        />
        <label class="setting-label" htmlFor="button-shape">Shape</label>
        <Select
          id="button-shape"
          value={shape}
          options={[
            { value: 'rounded', label: 'Rounded' },
            { value: 'pill', label: 'Pill' },
            { value: 'square', label: 'Square' }
          ]}
        />
        <label class="setting-label" htmlFor="button-aria-label">Accessible label</label>
        <TextField id="button-aria-label" value={ariaLabel} placeholder="Required for icon-only buttons" />
        <label class="setting-label" htmlFor="button-loading-label">Loading label</label>
        <TextField id="button-loading-label" value={loadingLabel} placeholder="Loading" />
        <CheckBox checked={fullWidth}>Full width</CheckBox>
        <CheckBox checked={loading}>Loading</CheckBox>
        <CheckBox checked={pressed}>Pressed</CheckBox>
        <CheckBox checked={disabled}>Disabled</CheckBox>
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
      </div>
    )
  }
}
