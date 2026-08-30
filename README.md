# Prism UI

Prism is a small UI kit for [Matrix](https://github.com/MickyBalladelli/Matrix). It gives Matrix apps polished layout, form, navigation, feedback, overlay, data, code, and icon components.

Prism is alpha software. The API is small and useful today, but can change before the first stable release.

## Install

```bash
npm install prism-ui @mickyballadelli/matrix
```

Prism uses Matrix as a peer dependency. Use a Matrix version that satisfies Prism's peer range.

## Quick start

### JavaScript

Matrix components are functions. Pass a props object and compose the returned templates:

```js
import { Button, Card, CheckBox, TextField } from 'prism-ui'
import { signal } from '@mickyballadelli/matrix'

const name = signal('Ada')
const enabled = signal(true)

const view = Card({
  class: 'profile-card',
  children: [
    TextField({
      id: 'name',
      value: name,
      placeholder: 'Name'
    }),
    CheckBox({
      checked: enabled,
      children: 'Enabled'
    }),
    Button({
      children: 'Save',
      onClick: () => console.log(`Saving ${name.value}`)
    })
  ]
})
```

### JSX

The showcase uses Matrix's JSX runtime. Configure your bundler for `@mickyballadelli/matrix` and use Prism components directly:

```jsx
import { Button, Card, CheckBox, TextField } from 'prism-ui'
import { signal } from '@mickyballadelli/matrix'

const name = signal('Ada')
const enabled = signal(true)

const view = (
  <Card class="profile-card">
    <TextField id="name" value={name} placeholder="Name" />
    <CheckBox checked={enabled}>Enabled</CheckBox>
    <Button onClick={() => console.log(`Saving ${name.value}`)}>Save</Button>
  </Card>
)
```

## Apply the theme

Prism components use the exported Matrix style definition. Apply it to an app root or another ancestor:

```jsx
import { Button, prismTheme } from 'prism-ui'

const view = (
  <main use:style={prismTheme}>
    <Button>Ready</Button>
  </main>
)
```

`prismThemeValues` exposes the source token values. Components also accept normal `class` and `style` props so an app can add local styles on top of the theme.

## Component map

| Group | Components | Use them for |
| --- | --- | --- |
| Layout | `Background`, `Box`, `Card`, `Header`, `Label` | Surfaces, app chrome, layout, and readable type |
| Forms | `TextField`, `Select`, `CheckBox` | Basic input and choice controls |
| Actions | `Button` | Primary, secondary, status, and icon actions |
| Feedback | `Badge`, `Pulse` | Counts, state, health, and live signals |
| Navigation | `TreeView` | Nested product or workspace navigation |
| Overlay | `Popup` | Dialogs and focused workflows |
| Data | `Table` | Searchable, sortable, paginated data |
| Code | `CodeViewer` | Editable or read-only source code |
| Icons | 46 SVG icon components | Lightweight product and interface marks |

## Shared conventions

### Signals

Pass writable Matrix signals to controls when state must stay in sync. `TextField` writes to a `value` signal and `CheckBox` writes to a `checked` signal. `Select`, `Popup`, `Table`, and most visual props also accept reactive values.

```js
import { CheckBox, Select, TextField } from 'prism-ui'
import { signal } from '@mickyballadelli/matrix'

const query = signal('')
const filter = signal('all')
const showArchived = signal(false)

const view = [
  TextField({ value: query, placeholder: 'Search' }),
  Select({
    value: filter,
    options: [
      { value: 'all', label: 'All items' },
      { value: 'open', label: 'Open items' }
    ]
  }),
  CheckBox({ checked: showArchived, children: 'Show archived' })
]
```

### Labels

Use `Label({ htmlFor: 'control-id' })` or a normal HTML `<label>` for named controls. Give every icon-only action an `ariaLabel`.

### Events

Event handlers use Matrix's normal DOM event shape. Button handlers receive a mouse event. TextField and CheckBox expose native input/change events. Table and TreeView add component-specific callbacks described below.

## Layout

### Background

`Background` is a themed surface with optional animated WebGL motion and a 2D fallback. It keeps its children above the effect.

```jsx
import { Background, Button, Label } from 'prism-ui'

const view = (
  <Background
    palette="midnight"
    animation="veil"
    intensity={0.85}
    grain={0.018}
    minHeight="20rem"
  >
    <Label size="display" alwaysVisible>
      Deep focus
    </Label>
    <Button>Open workspace</Button>
  </Background>
)
```

Important props:

- `palette`: `midnight`, `aurora`, or `tide`
- `animation`: `veil`, `mist`, `sanctum`, `silk`, `halo`, `ember`, `orbit`, `gossamer`, `meridian`, `bloom`, `current`, `opal`, or `zephyr`
- `animated`: turn motion on or off
- `speed`, `intensity`, `grain`: tune the effect
- `overlayOpacity`: add a readable wash over the effect
- `minHeight`, `height`, `padding`, `radius`: shape the surface
- `baseColor`, `accentColor`, `glowColor`: provide CSS colors such as hex, `rgb()`, `hsl()`, or named colors

The component respects live `prefers-reduced-motion` changes. It uses a 2D fallback when WebGL is unavailable or loses its context, then retries WebGL when the context returns.

### Box and Card

`Box` is a plain `div` wrapper. `Card` is an `article` wrapper and can render an action footer:

```js
import { Button, Card } from 'prism-ui'

const view = Card({
  children: 'A standalone piece of content',
  actions: Button({ children: 'Continue' })
})
```

Both support `children`, `class`, `id`, `role`, `style`, `sticky`, and `stickyTop`.

### Header

`Header` renders an app bar. Put brand or navigation in `children`, and tools in `trailing`. It is sticky to the top by default.

```js
import { Header, SettingsIcon } from 'prism-ui'

const view = Header({
  children: 'Prism',
  trailing: SettingsIcon({ size: '1.1em', ariaLabel: 'Settings' }),
  sticky: true,
  stickyTop: '0px'
})
```

### Label

`Label` controls readable type over animated surfaces. Props include `size` (`small`, `medium`, `large`, `display`), `font` (`sans`, `serif`, `mono`), `weight`, `tone`, and `alwaysVisible`.

Set `backgroundColor` and `outlineColor` to customize the character fill and stroke. `fontSize`, `fontFamily`, `fontWeight`, `letterSpacing`, and `lineHeight` provide direct token overrides.

## Forms and actions

### TextField

```js
import { TextField } from 'prism-ui'
import { signal } from '@mickyballadelli/matrix'

const email = signal('')

const view = TextField({
  id: 'email',
  name: 'email',
  value: email,
  placeholder: 'you@example.com',
  required: true,
  size: 'medium'
})
```

Supported sizes are `small`, `medium`, and `large`. Use `onInput` or `onChange` for additional behavior. Standard input props include `type`, `autocomplete`, `inputMode`, `maxLength`, `minLength`, `pattern`, `readOnly`, `disabled`, and `required`. Use `ariaDescription`, `ariaDescribedBy`, `ariaInvalid`, and `error` for validation feedback.

### CheckBox

```js
import { CheckBox } from 'prism-ui'
import { signal } from '@mickyballadelli/matrix'

const accepted = signal(false)

const view = CheckBox({
  id: 'accepted',
  name: 'accepted',
  checked: accepted,
  children: 'Accept the terms'
})
```

The label wraps the input, so visible children provide the accessible name. `class`, `style`, `disabled`, `required`, `ariaDescription`, `ariaDescribedBy`, `ariaInvalid`, and `error` are supported for form state and validation feedback.

### Select

`Select` is a custom listbox with keyboard support. Arrow keys move, Home and End jump, letter keys cycle, Enter selects, and Escape closes.

```js
import { Select } from 'prism-ui'
import { signal } from '@mickyballadelli/matrix'

const selected = signal('design')

const view = Select({
  id: 'department',
  value: selected,
  placeholder: 'Choose a department',
  options: [
    { value: 'design', label: 'Design systems' },
    { value: 'research', label: 'User research' },
    { value: 'sales', label: 'Sales', disabled: true }
  ]
})
```

Options can also be strings or numbers. Use `onRender(option, context)` for custom selected and option content. The context has `location` (`trigger` or `option`) and `selected`.

Pass `name` when the selected value must submit with a form. Select mirrors its current value to a hidden input and reports a required-but-empty selection as invalid on submit.

### Button

```jsx
import { Button, SendIcon, SettingsIcon } from 'prism-ui'

const send = (
  <Button
    label="Send message"
    icon={<SendIcon />}
    iconPosition="end"
    variant="primary"
    size="large"
    shape="pill"
  />
)

const settings = (
  <Button
    label="Settings"
    showLabel={false}
    icon={<SettingsIcon />}
    ariaLabel="Settings"
  />
)
```

Props include:

- `variant`: `primary`, `secondary`, `tertiary`, `error`, `warning`, `information`, or `success`
- `size`: `small`, `medium`, or `large`
- `shape`: `rounded`, `pill`, or `square`
- `icon`, `iconPosition`, `showLabel`
- `fullWidth`, `loading`, `loadingLabel`, `pressed`, `disabled`
- `type`, `name`, `value`, `title`, `ariaLabel`, `palette`

Set `palette` to `cobalt`, `iris`, or `teal` for a first-class palette recipe. The older wrapper form with `data-prism-palette` also works for groups of buttons.

## Feedback

### Badge

`Badge` displays a count or state. Tones are `neutral`, `success`, `info`, `warning`, and `error`. Use `pulseOnChange` with a signal to animate value changes.

```js
import { Badge } from 'prism-ui'
import { signal } from '@mickyballadelli/matrix'

const unread = signal(12)
const view = Badge({ value: unread, tone: 'info', pulseOnChange: true })
```

### Pulse

`Pulse` shows a living state with `success`, `info`, `warning`, `error`, or `off` status. Sizes are `small`, `medium`, and `large`. Animation is `continuous` by default; use `once` for a single pulse.

```jsx
import { Pulse } from 'prism-ui'

const view = <Pulse status="success">Service healthy</Pulse>
```

## Navigation

### TreeView

`TreeView` renders nested branches and leaves with tree roles, stable item IDs, roving focus, and keyboard navigation. Leaves can use `href` or `onClick`. Branches use `children` and can start open with `expanded`.

```js
import { TreeView } from 'prism-ui'

const view = TreeView({
  ariaLabel: 'Workspace navigation',
  model: 'aurora',
  itemVariant: 'minimal',
  items: [
    { label: 'Overview', href: '/' },
    {
      label: 'Projects',
      expanded: true,
      children: [
        { label: 'Prism', href: '/projects/prism', active: true },
        { label: 'Matrix', href: '/projects/matrix' }
      ]
    }
  ]
})
```

Keyboard support includes Arrow Up and Down, Home and End, letter cycling, Enter or Space activation, Arrow Left and Right branch control, and Escape to close a branch.

For controlled expansion, pass an `expanded` map keyed by each item's `id` and update it from `onExpandedChange`. Use `hasChildren: true` for lazy or currently empty branches.

Available visual models are `prism`, `aurora`, `nocturne`, `editorial`, and `terminal`. `itemVariant="minimal"` is useful for dense navigation.

Use `onRender(item, context)` to render richer labels. The context includes `type`, `selected`, `expanded`, and `depth`.

## Overlay

### Popup

`Popup` is a modal dialog with a backdrop, Escape dismissal, focus trapping, and focus restoration.

```js
import { Button, Popup } from 'prism-ui'
import { signal } from '@mickyballadelli/matrix'

const open = signal(false)

const view = Popup({
  open,
  eyebrow: 'Table state',
  title: 'Serialized settings',
  size: 'large',
  children: 'Settings go here',
  footer: ({ close }) => Button({
    children: 'Done',
    onClick: event => close('done', event)
  })
})
```

Use `size` (`small`, `medium`, `large`, `full`) and `placement` (`center`, `top`, `bottom`). `closeOnBackdrop`, `closeOnEscape`, `showClose`, and `restoreFocus` control behavior. Provide a `title` or `ariaLabel` so the dialog has an accessible name.

`children` and `footer` can be values or callback slots. Callback slots receive `close(reason, event)`.

## Data and code

### Table

`Table` is a data surface with filtering, sorting, pagination, selection, sticky headers, pinned columns, drag ordering, keyboard resizing, density modes, custom cells, settings persistence, loading and error states, virtualization, and CSV export.

```js
import { Table } from 'prism-ui'

const rows = [
  { id: 'p-1', name: 'Prism', status: 'Live', owner: 'Micky' },
  { id: 'p-2', name: 'Matrix', status: 'Alpha', owner: 'Micky' }
]

const columns = [
  { key: 'name', header: 'Project', accessor: 'name', width: 220 },
  { key: 'status', header: 'Status', accessor: 'status' },
  { key: 'owner', header: 'Owner', accessor: 'owner' }
]

const view = Table({
  title: 'Projects',
  description: 'Current workspace projects',
  rows,
  columns,
  rowKey: 'id',
  pageSize: 10,
  pageSizeOptions: [10, 20, 'all'],
  selectable: true,
  exportable: true,
  storageKey: 'projects-table'
})
```

Column features include:

- `accessor`: a property path or `(row, rowIndex) => value`
- `render`: custom cell content
- `renderHeader`: custom header content
- `searchText`, `filter`, and `compare`: custom data behavior
- `width`, `minWidth`, `maxWidth`, `align`
- `sortable`, `searchable`, `resizable`, `reorderable`, `pinnable`, `hideable`, `exportable`
- `pinned`: `left` or `right`

Use `onSelectionChange`, `onFilterChange`, `onSortChange`, `onPageChange`, `onPageSizeChange`, `onColumnOrderChange`, `onColumnResize`, and `onSettingsChange` to connect the table to app state. Resizer handles support Left and Right Arrow keys and expose their current width to assistive technology. `loading` announces progress and marks the table busy. `serializeTableSettings` and `parseTableSettings` are exported for URLs or user preferences.

For remote data, set `serverSide: true`. Pass the current page rows through `rows`, the full result count through `totalRows`, and a controlled `query` with `filter`, `columnFilters`, `sort`, `page`, and `pageSize`. The table then skips client filtering, sorting, and slicing. `onQueryChange` receives the next query and may return a Promise; its pending and rejected states drive the built-in loading and error UI. Use `error`, `onError`, and `onRetry` when the data layer owns those states.

Global filtering waits 180ms by default; change it with `filterDebounce` or set it to `0` for immediate updates. Tables virtualize rendered pages over 100 rows by default. Set `virtualized: false` to opt out, or tune `virtualizationThreshold`, `virtualRowHeight`, and `virtualOverscan` when row content has a different height. CSV exports include a UTF-8 BOM and prefix spreadsheet formula-looking values with an apostrophe.

### CodeViewer

`CodeViewer` renders a lightweight syntax-colored editor with optional line numbers, accessible tabs, copying, and Matrix signal binding:

```js
import { CodeViewer } from 'prism-ui'
import { signal } from '@mickyballadelli/matrix'

const source = signal('const answer = 42')

const view = CodeViewer({
  code: source,
  language: 'javascript',
  filename: 'answer.js',
  lineNumbers: true,
  editable: true,
  copyable: true
})
```

Supported languages are `javascript`, `jsx`, `typescript`, `tsx`, `json`, `css`, `html`, `xml`, `bash`, and `text`. Common aliases such as `js`, `ts`, `sh`, and `txt` are normalized.

Use `tabs` for multiple sources. `activeTab` can be a signal or computed value, and `onTabChange`, `onChange`, and `onCopy` report user actions. Tab buttons support Arrow Left/Right, Home, and End. Syntax colors can override `keyword`, `string`, `number`, `comment`, `function`, `tag`, `attribute`, `property`, `boolean`, `operator`, and `punctuation`.

## Icons

Prism exports 46 original SVG components in seven groups: Actions, Navigation, Communication, Status, Files, Workspace, and Data & Code.

```jsx
import { Button, EyeIcon, SettingsIcon } from 'prism-ui'

const view = (
  <div>
    <EyeIcon size="20" />
    <Button showLabel={false} icon={<SettingsIcon />} ariaLabel="Settings" />
  </div>
)
```

Icons use `currentColor` and default to `1em`. Every icon accepts `size`, `class`, and optional `ariaLabel`. Icons are decorative by default. Add `ariaLabel` when an icon carries meaning without visible text.

Use `PrismIcon` for Prism identity and `MatrixIcon` when crediting the runtime. Brand marks keep their signature colors.

Import only the icon entry point when useful:

```js
import { TreeLeafIcon } from 'prism-ui/icons'

const view = TreeLeafIcon({ size: '14' })
```

## Accessibility checklist

- Apply `prismTheme` so focus styles and reduced-motion rules are present.
- Give controls visible labels, or provide `ariaLabel` for icon-only controls.
- Give every Popup a `title` or `ariaLabel`.
- Use a stable `rowKey` for every Table with selection or row actions.
- Keep status meaning in text, not color alone.
- Test custom `Select` and `TreeView` flows with keyboard navigation.
- Keep `prefers-reduced-motion` enabled for users who request less motion.

## Showcase

Run the local component explorer:

```bash
cd examples/showcase
npm install
npm run dev
```

Create a production build with `npm run build`. The showcase loads local Prism source through Vite and uses the published Matrix alpha dependency listed in its package file.

## Package exports

```text
prism-ui             Components, icons, theme, and settings helpers
prism-ui/components  Component entry point
prism-ui/icons       Icon entry point
prism-ui/theme       Theme values and theme models
```

Main exports include the `*Component` wrappers for Matrix component composition, all visual components, all icons, `prismTheme`, `prismThemeValues`, `treeViewModels`, `serializeTableSettings`, and `parseTableSettings`.
