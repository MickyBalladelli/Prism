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

## Showcase

Run the Vite showcase:

```bash
cd examples/showcase
npm install
npm run dev
```

Vite watches the local Prism and Matrix source during development, so saved changes hot-reload without a manual build.

Select `Show details` on any component card to open its playground page. Component pages expose live props and settings for `Box`, `TextField`, `CheckBox`, `Card`, and `Button`.
