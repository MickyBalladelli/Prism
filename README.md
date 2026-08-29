# Prism

Small UI components for [Matrix](https://github.com/MickyBalladelli/Matrix).

```js
import { Box, Button, Card, CheckBox, TextField } from 'prism-ui'
import { signal } from 'matrix'

const name = signal('')
const enabled = signal(true)

const view = Box({
  class: 'form',
  children: [
    TextField({ value: name, placeholder: 'Name' }),
    CheckBox({ checked: enabled, children: 'Enabled' })
  ]
})

const card = Card({
  class: 'card',
  children: 'A semantic Prism card'
})

const button = Button({
  children: 'Save',
  onClick: () => console.log('saved')
})
```

Components accept Matrix signals for `value` and `checked`, keeping controls synchronized in both directions. `TextField` supports `small`, `medium`, and `large` sizes.
`Box` and `Card` support `sticky` and `stickyTop` for parent-bounded sticky layout, and `Card` can also render an `actions` footer.

`CodeViewer` renders editable, syntax-colored code with optional line numbers and a copy button:

```jsx
import { CodeViewer } from 'prism-ui'
import { signal } from 'matrix'

const source = signal('const answer = 42')

const view = <CodeViewer code={source} language="javascript" filename="answer.js" />
```

Customize the editor with `lineNumbers`, `editable`, `copyable`, `fontFamily`, `fontSize`, `lineHeight`, `tabSize`, `minHeight`, `maxHeight`, and `syntaxColors`. Syntax color keys include `keyword`, `string`, `number`, `comment`, `function`, `tag`, `attribute`, `property`, `boolean`, `operator`, and `punctuation`.

Prism exposes its design tokens and Matrix theme:

```jsx
import { prismTheme } from 'prism-ui'

const view = <main use:style={prismTheme}>Prism content</main>
```

## Icons

Prism exports 49 original icon components in seven groups: Actions, Navigation, Communication, Status, Files, Workspace, and Data & Code. They are SVG components, inherit `currentColor`, and default to `1em`:

```jsx
import { Button, EyeIcon } from 'prism-ui'

const view = (
  <Button>
    <EyeIcon />
    Show details
  </Button>
)
```

The full icon list and usage examples are in the showcase under Icons. Every icon supports `size`, `class`, and optional `ariaLabel` props.

Icons are decorative by default. Use `ariaLabel` when an icon carries meaning without visible text.

Use `size` for a fixed size, or import directly from `prism-ui/icons`:

```jsx
import { TreeLeafIcon } from 'prism-ui/icons'

const view = <TreeLeafIcon size="14" />
```

## Select

`Select` renders a styled listbox from an option list and keeps its selected value synchronized with a Matrix signal. It opens below by default, flips when there is not enough viewport space, and accepts `placement="top"`, `"right"`, or `"left"` when another direction is preferred:

```jsx
import { Select } from 'prism-ui'
import { signal } from 'matrix'

const view = Select({
  value: signal('design'),
  options: [
    { value: 'design', label: 'Design systems' },
    { value: 'research', label: 'User research' }
  ]
})
```

Use `onRender` to customize the selected value and each option. It receives the normalized option and a context with `location` (`trigger` or `option`) and `selected`:

```jsx
import { html } from 'matrix'

const renderMovie = option => html`<span class="movie-option">🎬 ${option.label}</span>`

const view = <Select options={movies} value={selectedMovie} onRender={renderMovie} />
```

Select also supports keyboard navigation: Arrow Up and Down move through options, letters cycle matching labels with wraparound, Enter accepts the active option, and Escape closes the menu.

## Badge

`Badge` displays a compact count or state. Use a Matrix signal with `pulseOnChange` to briefly highlight a changing value:

```jsx
import { Badge } from 'prism-ui'
import { signal } from 'matrix'

const unread = signal(12)

const view = <Badge value={unread} tone="info" pulseOnChange />
```

## Pulse

`Pulse` turns the TreeView branch mark into a living status signal. It supports `success`, `info`, `warning`, `error`, and `off` states, plus `small`, `medium`, and `large` sizes. Use `animation="once"` for one pulse or `animation="continuous"` for a repeating signal. Continuous animation is the default. The `off` state is muted and does not animate:

```jsx
import { Pulse } from 'prism-ui'

const view = (
  <Pulse status="success" size="medium">
    Service healthy
  </Pulse>
)
```

Use `ariaLabel` when the pulse has no visible label. The animation respects `prefers-reduced-motion`.

## TreeView

`TreeView` supports keyboard navigation with Arrow Up and Down, Home and End, letter cycling with wraparound, Enter or Space activation, and Arrow Left or Right branch control. Escape closes the focused branch. Choose a built-in visual model with `model="aurora"`, `model="nocturne"`, `model="editorial"`, or `model="terminal"`; the default is `model="prism"`:

```jsx
import { TreeView } from 'prism-ui'

const view = <TreeView model="aurora" items={items} />
```

Use `onRender` to customize each branch and leaf label. It receives the item and a context with `type`, `selected`, `expanded`, and `depth`, so you can render text, icons, or richer rows.

The exported `treeViewModels` map contains each model's display name and description.

## Popup

`Popup` renders a focused, accessible dialog with a backdrop, Escape dismissal, trapped keyboard focus, and automatic focus restoration. It supports `small`, `medium`, `large`, and `full` sizes plus `center`, `top`, and `bottom` placement:

```jsx
import { Popup } from 'prism-ui'
import { signal } from 'matrix'

const open = signal(false)

const view = <Popup
  open={open}
  eyebrow="Table state"
  title="Serialized settings"
  size="large"
>
  Settings go here
</Popup>
```

Use `closeOnBackdrop`, `closeOnEscape`, `showClose`, and `restoreFocus` to control dismissal. `children` and `footer` can be values or callback slots receiving a `close(reason, event)` function.

## Table

`Table` is a rich data surface with global and per-column filtering, stable sorting, pagination, Max rows, selection, sticky headers, pinned columns, drag ordering, keyboard-friendly resizing, density modes, loading and empty states, custom cell and header rendering, and CSV export:

```jsx
import { Table } from 'prism-ui'

const view = <Table
  title="Campaigns"
  rows={campaigns}
  columns={columns}
  pageSize={10}
  pageSizeOptions={[10, 20, 50, 'all']}
  selectable
  exportable
/>
```

Use `storageKey` to persist table shape automatically, including widths, order, visibility, left or right pinning, sort, page size, and density. Use `settings` to restore it yourself. `onSettingsChange` receives both the settings object and stable serialized JSON. `serializeTableSettings` and `parseTableSettings` are exported for storage, URLs, or server-side user preferences.

## Showcase

Run the Vite showcase:

```bash
cd examples/showcase
npm install
npm run dev
```

Vite watches the local Prism and Matrix source during development, so saved changes hot-reload without a manual build.

Select `Show details` on any component card to open its playground page. Component pages expose live props, settings, and an editable source recipe for `Box`, `TextField`, `Select`, `CheckBox`, `Card`, `Button`, `Badge`, `Pulse`, `TreeView`, `CodeViewer`, `Popup`, and `Table`.
