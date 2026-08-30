# Prism TODO

Review of the full repo: `src/`, `types/`, `test/`, `examples/showcase/`, package files, and theme CSS.

## P0 — Fix before wider use

- [x] **Keep Table row keys stable across pages.** Table now normalizes rows into `{ row, sourceIndex, key }`, uses source indexes for callbacks and cell access, and reconciles visible rows with Matrix `keyed()`.
- [x] **Finish Popup focus behavior.** Popup now guarantees an accessible name, moves focus into the dialog on open, restores focus safely on close, traps visible focusable elements, and locks body scrolling while open.
- [x] **Make Select a real form control or clearly mark it non-form UI.** Select now mirrors its value into a hidden input and blocks form submission with an accessible invalid state when a required value is missing.
- [x] **Remove live `Function()` execution from the deployed showcase.** The showcase editor is now read-only and bundled recipes evaluate only once; editor text cannot change preview execution.
- [x] **Protect storage and clipboard paths.** Table and showcase persistence now use safe storage helpers, while Table settings copy shares the clipboard fallback used by CodeViewer.

## P1 — Accessibility and behavior

- [x] **Complete CodeViewer tabs semantics.** Tabs now have linked `aria-controls` and tabpanel semantics, roving focus, Arrow/Home/End navigation, and copy success/failure announcements.
- [x] **Complete TreeView semantics.** Tree items now expose hierarchy metadata, active-link state, stable IDs, and roving keyboard focus with branch navigation.
- [x] **Add controlled expansion to TreeView.** TreeView now supports controlled or uncontrolled expansion through `expanded` and `onExpandedChange`, stable item IDs, and empty or lazy branches.
- [x] **Fix Table keyboard event bubbling.** Row checkboxes now stop both click and keydown propagation, so Space does not activate the row.
- [x] **Expose Table resize state to assistive tech.** Resize handles now expose min, max, current width, pixel text, and keyboard help.
- [x] **Add Table loading state semantics.** Loading now sets `aria-busy`, announces progress, and distinguishes an empty data set from an empty filtered result.
- [x] **Fix Select active descendant on first render.** Select omits `aria-activedescendant` until an active option exists.
- [x] **Handle Select viewport overflow.** Select now clamps menu width and horizontal placement to the viewport while preserving the best available placement.
- [x] **Make reactive props consistent.** Shared Matrix reactive helpers now distinguish readable reactive values from writable signals across components and declarations.
- [x] **Improve standard form props.** TextField and CheckBox now support standard input attributes, class/style, focus events, descriptions, invalid state, and error feedback.
- [x] **Add accessible names to icon-only and unlabeled surfaces.** Popup, Select, Table, CodeViewer, Button, and unlabeled CheckBox instances now have safe fallback names; visible form labels remain supported.

## P1 — Visual and runtime quality

- [x] **Fix custom Background colors.** Background now parses hex, `rgb()`/`rgba()`, `hsl()`/`hsla()`, and browser-supported named colors, with a finite fallback for invalid values.
- [x] **React to reduced-motion changes.** Background listens for live `prefers-reduced-motion` changes, avoids creating WebGL while reduced motion is active, and switches between live and static layers as the preference changes.
- [x] **Handle WebGL context loss.** Background now owns a separate 2D fallback canvas, handles `webglcontextlost`, and retries WebGL after `webglcontextrestored`.
- [x] **Reduce theme file weight and duplication.** Button palette recipes and TreeView model data now live in focused `src/theme-palettes.js` and `src/tree-view-models.js` modules; `theme.js` consumes them and keeps the existing public exports.
- [x] **Add dark/native control support.** Theme models now declare light or dark `color-scheme` values, and forced-colors rules map controls, surfaces, focus, and selection to system colors.
- [x] **Make Button palette first-class.** Button now accepts reactive `palette` values (`cobalt`, `iris`, or `teal`), while the typed `ButtonPalette` API and legacy wrapper selector remain supported.

## P1 — Data and performance

- [x] **Add a server-side Table mode.** `serverSide` now accepts controlled `query` state, current-page rows, `totalRows`, async `onQueryChange`, `error`, `onError`, and `onRetry`; remote filter, sort, page, and page-size changes share one query contract.
- [x] **Add virtualization for large tables.** Large rendered pages, including `pageSize: 'all'`, now use windowed rows with spacer rows, stable `aria-rowindex` values, and configurable row height, threshold, and overscan.
- [x] **Harden CSV export.** CSV now includes a UTF-8 BOM, protects formula-looking cell values, appends the download anchor before clicking, cleans it up, and revokes the object URL after the click.
- [x] **Avoid repeated work in Table.** Filtering now caches each row’s accessed column values and column lookup map per pass, sorting caches sort values, and global filtering is debounced by default.

## P2 — New components worth adding

- [x] **FormField.** Label, hint, required mark, error text, `aria-describedby`, `aria-invalid`, and control ID wiring. Use the `control` callback to pass the generated control props into TextField, Select, or CheckBox.
- [x] **Alert / Notice.** Inline success, info, warning, and error feedback with icon, title, description, dismiss action, and `role="status"` / `role="alert"` modes.
- [x] **Toast / ToastRegion.** Transient feedback with a `createToastController()` queue, timeout pause on hover/focus, dismissal, and reduced-motion behavior.
- [x] **Menu / DropdownMenu.** Reusable action menu with roving focus, grouped items, separators, nested submenus, disabled items, and placement-aware dropdown styling.
- [x] **Tooltip / Popover.** Shared anchor positioning helper, delay, Escape/outside dismissal, collision clamping, and touch behavior.
- [x] **Tabs.** General accessible tabs with linked tabpanels, roving focus, automatic/manual activation, and horizontal/vertical orientation.
- [x] **Progress / Spinner / Skeleton.** Common loading primitives for async forms, tables, uploads, and page transitions. Respect reduced motion and expose determinate values.
- [x] **EmptyState.** Shared empty, filtered-empty, error, and retry layouts.
- [x] **IconButton.** Icon-only Button wrapper with an accessible label fallback and Button behavior.
- [x] **Pagination.** Standalone pagination with page windows, ellipses, remote totals, and optional page-size selection.
- [x] **Avatar, Tag, Separator, Stack, and Grid.** Small composition primitives for common identity, metadata, divider, flex, and responsive grid layouts.

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
