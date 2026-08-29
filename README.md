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

## Showcase

Run the Vite showcase:

```bash
cd examples/showcase
npm install
npm run dev
```

Vite watches the local Prism and Matrix source during development, so saved changes hot-reload without a manual build.

Select `Show details` on any component card to open its playground page. Component pages expose live props and settings for `Box`, `TextField`, `CheckBox`, `Card`, and `Button`.
