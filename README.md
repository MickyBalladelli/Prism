# Prism

Small UI components for [Matrix](../Matrix).

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
`Card` renders an `<article>`, accepts the same layout props as `Box`, and can render an `actions` footer.

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

`TreeView` supports keyboard navigation with Arrow Up and Down, Home and End, letter cycling with wraparound, Enter or Space activation, and Arrow Left or Right branch control. Escape closes the focused branch.

## Showcase

Run the Vite showcase:

```bash
cd examples/showcase
npm install
npm run dev
```

Vite watches the local Prism and Matrix source during development, so saved changes hot-reload without a manual build.

Select `Show details` on any component card to open its playground page. Component pages expose live props and settings for `Box`, `TextField`, `Select`, `CheckBox`, `Card`, `Button`, `Badge`, `Pulse`, and `TreeView`.
