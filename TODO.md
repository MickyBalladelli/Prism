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
- [x] **Layout / Navigator / Footer.** Semantic page framing with a dedicated navigation pane and a reusable footer region.

## P2 — API, docs, and packaging

 - [x] **Fix the root lockfile.** Regenerated the lockfile against the published `@mickyballadelli/matrix` package.
- [x] **Add package scripts and CI.** Added typecheck, syntax build, coverage, package import/pack, metadata, accessibility smoke, and showcase build scripts; CI runs Node 18/20/22 plus DOM behavior checks.
- [x] **Expand TypeScript declarations.** Component functions now return Matrix `TemplateResult`, style values accept numeric CSS values, standard form callbacks are covered, reactive variants are declared, and controlled Table/Select APIs are typed.
- [x] **Add runtime prop normalization helpers.** Added shared reactive reads, booleans, strings, numbers, choices, and arrays in `src/props.js`; Button and Select use the shared choice rules.
- [x] **Document the styling contract.** Added `STYLING.md` and linked it from the README with tokens, palettes, CSS color support, forms, motion, and forced-colors guidance.
- [x] **Add a component API page.** Added the `/api` showcase route with prop tables, defaults, events, accessibility notes, and a controlled Matrix signal example.
- [x] **Add release hygiene.** Added Node engine metadata, repository/license/keywords metadata, public publish config, `CHANGELOG.md`, `MIGRATIONS.md`, and a Matrix compatibility note.

## P2 — Showcase maintainability

- [x] **Create one component registry.** Home cards, sidebar items, and component page metadata now come from `examples/showcase/src/component-registry.js`.
- [x] **Move playgrounds into separate files.** Every showcase playground now lives in `examples/showcase/src/playgrounds/`, with a small index map and a focused component page shell.
- [x] **Test the recipe parser.** Added direct Node coverage for strings, templates, nested expressions, arrays, JSX, malformed input, and useful closing-tag errors in `test/recipe-syntax.test.js`.
- [x] **Audit keyed rendering.** Added stable keys to mapped cards, icons, API rows, navigation items, and Matrix-keyed preview lists.
- [x] **Improve mobile navigation.** Added a keyboard-dismissible mobile disclosure, fixed drawer, backdrop, focus-visible trigger, and automatic close on navigation.
- [x] **Add showcase error and loading states.** Preview construction errors, missing routes, storage failures, and pending preview surfaces now expose visible status or alert feedback with accessible actions.
- [x] **Add visual regression coverage.** Added a Playwright matrix for every route, five themes, three responsive projects, reduced motion, and snapshot seed/update guidance in `examples/showcase/visual/README.md`.

## Example applications from Matrix, enhance them using Prism.
- [x] Create "Shopping Cart" example (routing, forms, API calls, state) — Added `/examples/shopping-cart` with cart state, checkout validation, async demo handoff, and Prism feedback surfaces.
- [x] Create "Notes App" example (complex forms, search, local storage) — Added `/examples/notes` with reactive search, validated editing, keyed rows, and safe local persistence.
- [x] Create "Dashboard" example (many components, performance considerations) — Added `/examples/dashboard` with async metrics, filters, Prism Table, trend view, and a local timeline recorder.
- [x] Create "Real-time Chat" example (WebSocket, message handling) — Added `/examples/chat` with connection states, keyed messages, and a replaceable local echo socket.
- [x] Each example should include tests and performance notes — Added registry/page coverage in `test/showcase-registry.test.js` and implementation notes in `examples/showcase/examples/README.md`.
