# Prism TODO

Review of the full repo: `src/`, `types/`, `test/`, `examples/showcase/`, package files, and theme CSS.

## P0 — Fix before wider use

- [x] **Keep Table row keys stable across pages.** Table now normalizes rows into `{ row, sourceIndex, key }`, uses source indexes for callbacks and cell access, and reconciles visible rows with Matrix `keyed()`.
- [x] **Finish Popup focus behavior.** Popup now guarantees an accessible name, moves focus into the dialog on open, restores focus safely on close, traps visible focusable elements, and locks body scrolling while open.
- [x] **Make Select a real form control or clearly mark it non-form UI.** Select now mirrors its value into a hidden input and blocks form submission with an accessible invalid state when a required value is missing.
- [x] **Remove live `Function()` execution from the deployed showcase.** The showcase editor is now read-only and bundled recipes evaluate only once; editor text cannot change preview execution.
- [x] **Protect storage and clipboard paths.** Table and showcase persistence now use safe storage helpers, while Table settings copy shares the clipboard fallback used by CodeViewer.

## P1 — Accessibility and behavior

- [ ] **Complete CodeViewer tabs semantics.** The tablist has tabs but no `aria-controls`, tabpanel, roving focus, or Arrow-key navigation (`src/components/code-viewer.js:404-414`). Add a real tabpanel and announce copy success/failure in a live region.
- [ ] **Complete TreeView semantics.** Add `aria-level`, `aria-posinset`, `aria-setsize`, `aria-current` for active links, and roving `tabindex` (`src/components/tree-view.js:43-97`). Test the tree with a screen reader and keyboard-only navigation.
- [ ] **Add controlled expansion to TreeView.** `expanded` is read once while rendering branches (`src/components/tree-view.js:53-86`) and there is no `onExpandedChange`. Add a controlled/uncontrolled API, stable item IDs, and support empty or lazy branches.
- [x] **Fix Table keyboard event bubbling.** Row checkboxes now stop both click and keydown propagation, so Space does not activate the row.
- [ ] **Expose Table resize state to assistive tech.** The resize handle is a separator (`src/components/table.js:717`) but has no `aria-valuenow`, `aria-valuemin`, or `aria-valuemax`. Add those values and a clear keyboard help label.
- [ ] **Add Table loading state semantics.** Add `aria-busy`, a status announcement, and a useful empty state distinction. Current empty copy always says “Try another search” even when the data set is simply empty (`src/components/table.js:737`).
- [x] **Fix Select active descendant on first render.** Select omits `aria-activedescendant` until an active option exists.
- [ ] **Handle Select viewport overflow.** Placement logic measures width but never clamps the menu to the viewport (`src/components/select.js:113-172`). Add horizontal bounds and a max width for left/right placement.
- [ ] **Make reactive props consistent.** TextField and CheckBox bind only writable signals (`src/components/text-field.js:20`, `src/components/check-box.js:14`); Select, Popup, Table, and CodeViewer also copy some computed values into new signals. Define one Matrix reactive-value contract and use it everywhere, or narrow the TypeScript types to writable signals.
- [ ] **Improve standard form props.** TextField and CheckBox lack class/style, accessible description, autocomplete, input type, input mode, maxlength, and error/invalid support. Add these before the library grows more form components.
- [ ] **Add accessible names to icon-only and unlabeled surfaces.** Popup now defaults to the accessible name `Dialog`, but runtime development warnings and clearer required types would still help form controls and icon-only surfaces.

## P1 — Visual and runtime quality

- [ ] **Fix custom Background colors.** WebGL calls `parseHex()` (`src/components/background.js:244`) even though color props accept any string. `rgb()`, `hsl()`, named colors, and invalid hex values can render with the wrong color or NaN uniforms. Support CSS color formats or restrict and document hex input.
- [ ] **React to reduced-motion changes.** `prefersReducedMotion()` is checked during render (`src/components/background.js:319`) but no media-query listener exists. Stop and restart animation when the OS preference changes, and avoid starting WebGL when motion is already reduced.
- [ ] **Handle WebGL context loss.** The canvas renderer (`src/components/background.js:442-549`) has no `webglcontextlost`/`webglcontextrestored` path. Fall back to 2D and recover after GPU context loss.
- [ ] **Reduce theme file weight and duplication.** `src/theme.js` is 3,451 lines and mixes token data, palette recipes, model recipes, and all CSS. Split tokens, theme models, component styles, and generated CSS so changes are easier to review and consumers can load only what they need.
- [ ] **Add dark/native control support.** Theme models change Prism colors but do not declare `color-scheme` (`src/theme.js:452-726`). Native inputs and scrollbars can fight the Nocturne theme. Add `color-scheme: light` / `dark` per model and test forced-colors mode.
- [ ] **Make Button palette first-class.** Palette recipes exist in `src/theme.js:204-274`, but Button has no `palette` prop and the showcase needs a wrapper with `data-prism-palette`. Export a typed `ButtonPalette` and support it directly on Button.

## P1 — Data and performance

- [ ] **Add a server-side Table mode.** Current filtering, sorting, and pagination all operate on the full client array (`src/components/table.js:286-360`). Add controlled query state, async loading/error hooks, total row count, and callbacks for remote filter/sort/page changes.
- [ ] **Add virtualization for large tables.** `pageSize: 'all'` renders every row. Add windowed rows or document a hard size limit; do not call the current implementation “high-performance” for large data sets until this is solved (`README.md:231`).
- [ ] **Harden CSV export.** Append a UTF-8 BOM when useful, append the anchor before clicking, clean up after the download, and protect against spreadsheet formula injection for values beginning with `=`, `+`, `-`, or `@` (`src/components/table.js:636-654`).
- [ ] **Avoid repeated work in Table.** Filtering and sorting repeatedly resolve nested paths and stringify objects. Cache normalized accessors/search values per render, and debounce global filtering for large inputs.

## P2 — New components worth adding

- [ ] **FormField.** Label, hint, required mark, error text, `aria-describedby`, `aria-invalid`, and control ID wiring. This makes TextField, Select, and CheckBox compose cleanly.
- [ ] **Alert / Notice.** Inline success, info, warning, and error feedback with icon, title, description, dismiss action, and `role="status"` / `role="alert"` modes.
- [ ] **Toast / ToastRegion.** Transient feedback with queueing, timeout pause on hover/focus, dismissal, and reduced-motion behavior.
- [ ] **Menu / DropdownMenu.** Reusable action menu with roving focus, grouped items, separators, submenus, disabled items, and placement logic shared with Select.
- [ ] **Tooltip / Popover.** Shared anchor positioning, delay, Escape/outside dismissal, collision handling, and touch behavior. Reuse it for icon-only buttons and Table controls.
- [ ] **Tabs.** Generalize CodeViewer’s tabs into an accessible component, then use it in CodeViewer and the showcase.
- [ ] **Progress / Spinner / Skeleton.** Common loading primitives for async forms, tables, uploads, and page transitions. Respect reduced motion and expose determinate values.
- [ ] **EmptyState.** Shared empty, filtered-empty, error, and retry layouts so Table and the showcase use the same language.
- [ ] **IconButton.** A strict icon-only Button wrapper that requires an accessible label and optionally composes Tooltip.
- [ ] **Pagination.** Extract Table pagination so it can serve search results and remote data views too.
- [ ] **Avatar, Tag, Separator, Stack, and Grid.** Small composition primitives useful in Matrix apps without forcing custom CSS for common layouts.

## P2 — API, docs, and packaging

- [ ] **Fix the root lockfile.** `package.json` uses `@mickyballadelli/matrix`, but `package-lock.json` still records a `matrix` peer and `../Matrix` link. Regenerate it from the current package manifest.
- [ ] **Add package scripts and CI.** Add typecheck, build, and coverage scripts. CI should run Node 18/20/22, package import checks, DOM behavior checks, showcase build, and an accessibility smoke pass.
- [ ] **Expand TypeScript declarations.** Replace broad `unknown` component returns with Matrix result types where possible. Add missing standard HTML/form props, reactive variants, `ButtonPalette`, `Select` numeric values, Table controlled state, and richer render contexts.
- [ ] **Add runtime prop normalization helpers.** Choice validation and reactive detection are repeated in many component files. Centralize them to prevent drift and make invalid-prop behavior predictable.
- [ ] **Document the styling contract.** Explain that consumers must apply `prismTheme`, list all token groups, document button palettes, explain CSS color support, and show form-label/error patterns.
- [ ] **Add a component API page.** The showcase is a visual playground, but it does not replace concise prop tables, defaults, events, accessibility notes, and controlled-state examples.
- [ ] **Add release hygiene.** Add `engines`, repository/license/keywords metadata, a changelog, migration notes, and a clear Matrix compatibility policy before publishing beyond alpha.

## P2 — Showcase maintainability

- [ ] **Create one component registry.** Home cards, sidebar items, and component page metadata repeat the same names, groups, paths, and descriptions in three places (`examples/showcase/src/pages/home-page.jsx:5`, `examples/showcase/src/showcase-shell.jsx:31`, `examples/showcase/src/pages/component-page.jsx:8`). Build all navigation and page headers from one registry.
- [ ] **Move playgrounds into separate files.** `component-page.jsx` is a 1,659-line switchboard. Put each playground in its own file and keep the page shell focused on layout.
- [ ] **Test the recipe parser.** `examples/showcase/src/recipe-syntax.js` contains a custom parser/compiler with no direct tests. Cover strings, templates, nested expressions, arrays, JSX, malformed input, and error messages.
- [ ] **Audit keyed rendering.** Add stable keys to every mapped card, icon, tree item, table preview row, and tab where Matrix needs identity preservation.
- [ ] **Improve mobile navigation.** The sidebar becomes a long static block below 980px (`examples/showcase/src/style.css:2316-2329`). Add a compact navigation disclosure or drawer.
- [ ] **Add showcase error and loading states.** Route failures, preview compile errors, clipboard failures, and storage failures should have visible, keyboard-accessible, screen-reader-friendly feedback.
- [ ] **Add visual regression coverage.** Capture each theme, responsive breakpoint, component state, and reduced-motion mode. The visual system is a major product feature and needs a guard against CSS drift.
