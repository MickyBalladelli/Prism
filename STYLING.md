# Prism styling contract

Prism owns component structure, state, semantics, and the visual tokens used by its default theme. Applications own layout around Prism components and may add local classes or inline styles.

## Start with the theme

Apply `prismTheme` to the app root or another ancestor. This installs token variables, focus-visible treatment, reduced-motion rules, native control colors, forced-colors mappings, and the component styles:

```jsx
import { prismTheme } from '@mickyballadelli/prism'

const view = <main use:style={prismTheme}>{children}</main>
```

`prismThemeValues` exposes the source values when a product needs to build a matching chart, editor, or custom surface.

## Token groups

The public token groups are:

- `colors`: page, surface, raised surface, hover surface, panel, text, muted text, border, accent, action, focus, selection, and status colors
- `fontSizes`: display, heading, body, label, and caption sizes
- `radii`: surface, control, pill, and circle radii
- `shadows`: surface, floating, focus, and inset shadows

Use these groups as design references. Prefer an app-owned class for a local override instead of depending on internal `.prism-*` selectors.

## Component styling

Every component accepts `class` where a local styling hook is useful. Components that render a layout or surface also accept `style`; style values can be a CSS string or a Matrix style object. Keep layout rules on the parent when possible so component state selectors continue to work.

Button palettes are explicit: `cobalt`, `iris`, and `teal`. They work with `primary`, `secondary`, and status variants. Do not override a palette by reaching into its generated selector.

`Background` accepts CSS colors in hex, `rgb()`/`rgba()`, `hsl()`/`hsla()`, and browser-supported named-color formats. Invalid colors fall back safely.

## Forms

Use `FormField` when a control needs a visible label, hint, or error. Its `control` callback gives the child the generated ID and ARIA wiring:

```jsx
<FormField label="Workspace name" hint="Shown to teammates" error={error}>
  {control => <TextField {...control} value={name} />}
</FormField>
```

If a control is intentionally unlabeled, provide `ariaLabel`. Keep validation meaning in text as well as color, and preserve the focus ring from `prismTheme`.

`ColorPicker` uses a native color input, accepts six-digit hex values, and can bind a writable Matrix signal through `value`. Keep `showValue` enabled when users need to copy or compare the exact color.

## Motion and system colors

Prism responds to live `prefers-reduced-motion` changes. Avoid adding an app animation that makes a reduced-motion preference ineffective. The theme also maps focus, borders, surfaces, and selection to system colors in forced-colors mode.
