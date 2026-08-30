import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { AlertIcon, ArrowRightIcon, BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'

const selectOptions = values => values.map(value => ({ value, label: value[0].toUpperCase() + value.slice(1) }))

function SettingLabel({ children, htmlFor }) {
  return <label class="setting-label" htmlFor={htmlFor}>{children}</label>
}

export function FormFieldPlayground() {
  const value = signal('Aurora workspace')
  const showError = signal(false)
  const error = computed(() => showError.value ? 'Use at least three characters.' : undefined)
  const codePreview = createCodePreview(codeLines(
    'FormField({',
    '  label: "Workspace name",',
    '  hint: "Shown in the app switcher.",',
    '  error: showError,',
    '  required: true,',
    '  control: field => TextField({',
    '    id: field.id,',
    '    ariaDescribedBy: field.ariaDescribedBy,',
    '    ariaInvalid: field.ariaInvalid,',
    '    required: field.required,',
    '    value',
    '  })',
    '})'
  ), { ...playgroundRuntime, value, showError: error })

  return {
    ...codePreview,
    controls: <div class="settings-list">
      <SettingLabel htmlFor="p2-field-value">Value</SettingLabel>
      <TextField id="p2-field-value" value={value} />
      <CheckBox checked={showError}>Show validation error</CheckBox>
      <p class="playground-note">The field passes one generated ID and one composed description chain into the control.</p>
    </div>
  }
}

export function AlertPlayground() {
  const tone = signal('success')
  const visible = signal(true)
  const codePreview = createCodePreview(codeLines(
    'computed(() => visible.value ? Alert({',
    '  tone,',
    '  title: "Deployment complete",',
    '  children: "Your new workspace is ready.",',
    '  dismissible: true,',
    '  onDismiss: () => visible.value = false',
    '}) : html``)'
  ), { ...playgroundRuntime, tone, visible, computed, html })

  return {
    ...codePreview,
    controls: <div class="settings-list">
      <SettingLabel htmlFor="p2-alert-tone">Tone</SettingLabel>
      <SelectForP2 id="p2-alert-tone" value={tone} options={selectOptions(['success', 'info', 'warning', 'error'])} />
      <Button variant="secondary" onClick={() => visible.value = true}>Show alert again</Button>
      <p class="playground-note">Dismiss the notice, then bring it back. Role changes between status and alert tones.</p>
    </div>
  }
}

function SelectForP2({ id, value, options }) {
  return <Select id={id} value={value} options={options} />
}

export function ToastPlayground() {
  const controller = createToastController()
  const codePreview = createCodePreview(codeLines(
    'html`<div class="p2-toast-demo">',
    '  ${Button({',
    '    children: "Save changes",',
    '    onClick: () => notices.push({',
    '      tone: "success",',
    '      title: "Saved",',
    '      children: "Your changes are safe."',
    '    })',
    '  })}',
    '  ${ToastRegion({ toasts: notices.toasts, onDismiss: notices.dismiss })}',
    '</div>`'
  ), { ...playgroundRuntime, notices: controller })

  const pushToast = () => controller.push({
    tone: 'success',
    title: 'Saved',
    children: 'Your changes are safe.'
  })

  return {
    ...codePreview,
    controls: <div class="settings-list">
      <Button onClick={pushToast} icon={CheckIcon({ size: '1em' })}>Push success toast</Button>
      <Button variant="secondary" onClick={() => controller.push({ tone: 'info', title: 'Heads up', children: 'This toast pauses while you read it.' })}>Push info toast</Button>
      <Button variant="tertiary" onClick={controller.clear}>Clear queue</Button>
      <p class="playground-note">Hover or focus a toast. Its timeout pauses until you leave.</p>
    </div>
  }
}

const menuItems = [
  { id: 'rename', label: 'Rename', shortcut: 'R' },
  { id: 'duplicate', label: 'Duplicate', shortcut: '⌘D' },
  { type: 'separator' },
  { type: 'group', label: 'Danger zone', items: [
    { id: 'archive', label: 'Archive', disabled: true },
    { id: 'delete', label: 'Delete project' }
  ] }
]

export function MenuPlayground() {
  const selected = signal('Nothing selected')
  const items = menuItems.map(item => item.type ? item : { ...item, onSelect: value => selected.value = value.label })
  const codePreview = createCodePreview(codeLines(
    'Menu({',
    '  ariaLabel: "Project actions",',
    '  items: [',
    '    { label: "Rename", shortcut: "R" },',
    '    { label: "Duplicate", shortcut: "⌘D" },',
    '    { type: "separator" },',
    '    { type: "group", label: "Danger zone", items: [',
    '      { label: "Archive", disabled: true },',
    '      { label: "Delete project" }',
    '    ] }',
    '  ]',
    '})'
  ), { ...playgroundRuntime, items })

  return {
    ...codePreview,
    preview: html`<div class="p2-menu-demo">${component(Menu, { ariaLabel: 'Project actions', items })}<p class="playground-note">Selected: <strong>${selected}</strong></p></div>`,
    controls: <div class="settings-list"><p class="playground-note">Use Arrow keys, Home, End, Enter, Space, or type to move through the menu.</p><p class="playground-note">Selected: <strong>{selected}</strong></p></div>
  }
}

export function DropdownMenuPlayground() {
  const selected = signal('Choose an action')
  const items = menuItems.map(item => item.type ? item : { ...item, onSelect: value => selected.value = value.label })
  const codePreview = createCodePreview(codeLines(
    'DropdownMenu({',
    '  label: "Project actions",',
    '  placement: "bottom-start",',
    '  items: actionItems,',
    '  onSelect: item => selected.value = item.label',
    '})'
  ), { ...playgroundRuntime, actionItems: items, selected })

  return {
    ...codePreview,
    preview: html`<div class="p2-dropdown-demo">${component(DropdownMenu, { label: 'Project actions', items })}<p class="playground-note">${selected}</p></div>`,
    controls: <div class="settings-list"><p class="playground-note">Open the menu, then use Arrow Down to enter it. Escape closes and restores the trigger.</p><p class="playground-note">Last action: <strong>{selected}</strong></p></div>
  }
}

export function TooltipPlayground() {
  const codePreview = createCodePreview(codeLines(
    'Tooltip({',
    '  content: "Open workspace settings",',
    '  children: IconButton({',
    '    icon: SettingsIcon(),',
    '    ariaLabel: "Workspace settings"',
    '  })',
    '})'
  ), { ...playgroundRuntime, SettingsIcon })

  return {
    ...codePreview,
    preview: html`<div class="p2-tooltip-demo">${component(Tooltip, { content: 'Open workspace settings', children: IconButton({ icon: SettingsIcon(), ariaLabel: 'Workspace settings' }) })}<span>Hover or focus the control</span></div>`,
    controls: <div class="settings-list"><p class="playground-note">Tooltip opens on hover and focus. Touch users can tap the anchor.</p></div>
  }
}

export function PopoverPlayground() {
  const codePreview = createCodePreview(codeLines(
    'Popover({',
    '  children: Button({ children: "Show details" }),',
    '  content: html`<div class="p2-popover-content">',
    '    <strong>Workspace pulse</strong>',
    '    <span>3 collaborators are active now.</span>',
    '  </div>`',
    '})'
  ), { ...playgroundRuntime })

  return {
    ...codePreview,
    preview: html`<div class="p2-popover-demo">${component(Popover, { children: Button({ children: 'Show details', icon: InfoIcon({ size: '1em' }) }), content: html`<div class="p2-popover-content"><strong>Workspace pulse</strong><span>3 collaborators are active now.</span></div>` })}</div>`,
    controls: <div class="settings-list"><p class="playground-note">Click outside or press Escape to close. The panel clamps to the viewport edge.</p></div>
  }
}

export function TabsPlayground() {
  const activeTab = signal('activity')
  const orientation = signal('horizontal')
  const items = [
    { id: 'activity', label: 'Activity', icon: SparkIcon({ size: '1em' }), content: html`<div class="p2-tab-panel"><strong>Everything is moving.</strong><span>Live workspace activity appears here.</span></div>` },
    { id: 'people', label: 'People', icon: BellIcon({ size: '1em' }), content: html`<div class="p2-tab-panel"><strong>12 collaborators</strong><span>See who is shaping this workspace.</span></div>` },
    { id: 'settings', label: 'Settings', disabled: false, content: html`<div class="p2-tab-panel"><strong>Ready to tune.</strong><span>Configuration stays one tab away.</span></div>` }
  ]
  const codePreview = createCodePreview(codeLines(
    'Tabs({',
    '  activeTab,',
    '  orientation,',
    '  items: [',
    '    { id: "activity", label: "Activity", content: "Live activity" },',
    '    { id: "people", label: "People", content: "Collaborators" },',
    '    { id: "settings", label: "Settings", content: "Configuration" }',
    '  ]',
    '})'
  ), { ...playgroundRuntime, activeTab, orientation })

  return {
    ...codePreview,
    preview: component(Tabs, { activeTab, orientation, items, onTabChange: id => activeTab.value = id }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-tabs-orientation">Orientation</SettingLabel><SelectForP2 id="p2-tabs-orientation" value={orientation} options={selectOptions(['horizontal', 'vertical'])} /><p class="playground-note">Arrow keys move focus. Automatic activation keeps the panel in sync.</p></div>
  }
}

export function ProgressPlayground() {
  const value = signal(68)
  const codePreview = createCodePreview(codeLines(
    'Progress({',
    '  label: "Upload progress",',
    '  value,',
    '  max: 100,',
    '  showValue: true,',
    '  tone: "accent"',
    '})'
  ), { ...playgroundRuntime, value })

  return {
    ...codePreview,
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-progress-value">Value</SettingLabel><input class="showcase-range" id="p2-progress-value" type="range" min="0" max="100" value={value} onInput={event => value.value = Number(event.target.value)} /><p class="playground-note"><strong>{value}%</strong> complete. Progress exposes min, max, and current value.</p></div>
  }
}

export function SpinnerPlayground() {
  const size = signal('medium')
  const tone = signal('accent')
  const codePreview = createCodePreview(codeLines(
    'Spinner({',
    '  size,',
    '  tone,',
    '  ariaLabel: "Loading workspace"',
    '})'
  ), { ...playgroundRuntime, size, tone })

  return {
    ...codePreview,
    preview: html`<div class="p2-spinner-demo">${Spinner({ size, tone, ariaLabel: 'Loading workspace' })}<span>Loading workspace</span></div>`,
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-spinner-size">Size</SettingLabel><SelectForP2 id="p2-spinner-size" value={size} options={selectOptions(['small', 'medium', 'large'])} /><SettingLabel htmlFor="p2-spinner-tone">Tone</SettingLabel><SelectForP2 id="p2-spinner-tone" value={tone} options={selectOptions(['accent', 'success', 'warning', 'error'])} /></div>
  }
}

export function SkeletonPlayground() {
  const variant = signal('text')
  const codePreview = createCodePreview(codeLines(
    'Stack({',
    '  gap: "small",',
    '  children: [',
    '    Skeleton({ width: "42%" }),',
    '    Skeleton({ width: "88%" }),',
    '    Skeleton({ variant: "rect", height: "5rem" })',
    '  ]',
    '})'
  ), { ...playgroundRuntime, variant })

  return {
    ...codePreview,
    preview: Stack({ class: 'p2-skeleton-demo', gap: 'small', children: [Skeleton({ variant, width: '42%' }), Skeleton({ width: '88%' }), Skeleton({ variant: 'rect', height: '5rem' })] }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-skeleton-variant">First shape</SettingLabel><SelectForP2 id="p2-skeleton-variant" value={variant} options={selectOptions(['text', 'circle', 'rect'])} /><p class="playground-note">Skeleton is decorative by default. Add ariaLabel when it represents a named loading region.</p></div>
  }
}

export function EmptyStatePlayground() {
  const status = signal('empty')
  const codePreview = createCodePreview(codeLines(
    'EmptyState({',
    '  status,',
    '  title: "No campaigns yet",',
    '  description: "Create your first campaign to see performance here.",',
    '  action: Button({ children: "Create campaign", icon: PlusIcon() })',
    '})'
  ), { ...playgroundRuntime, status, PlusIcon })

  return {
    ...codePreview,
    preview: EmptyState({ status, icon: SparkIcon({ size: '1.25em' }), title: 'No campaigns yet', description: 'Create your first campaign to see performance here.', action: Button({ children: 'Create campaign', icon: PlusIcon({ size: '1em' }) }) }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-empty-status">State</SettingLabel><SelectForP2 id="p2-empty-status" value={status} options={[{ value: 'empty', label: 'Empty' }, { value: 'filtered', label: 'Filtered empty' }, { value: 'error', label: 'Error' }]} /></div>
  }
}

export function IconButtonPlayground() {
  const count = signal(0)
  const codePreview = createCodePreview(codeLines(
    'IconButton({',
    '  icon: SettingsIcon(),',
    '  ariaLabel: "Open workspace settings",',
    '  title: "Workspace settings",',
    '  onClick: () => count.value += 1',
    '})'
  ), { ...playgroundRuntime, count, SettingsIcon })

  return {
    ...codePreview,
    preview: html`<div class="p2-icon-button-demo">${IconButton({ icon: SettingsIcon(), ariaLabel: 'Open workspace settings', title: 'Workspace settings', onClick: () => count.value += 1 })}<span>Clicked ${count} times</span></div>`,
    controls: <div class="settings-list"><p class="playground-note">Icon-only actions must have a useful ariaLabel. Hover for the native title hint.</p></div>
  }
}

export function PaginationPlayground() {
  const page = signal(3)
  const codePreview = createCodePreview(codeLines(
    'Pagination({',
    '  page,',
    '  totalItems: 240,',
    '  pageSize: 25,',
    '  showPageSize: true,',
    '  onPageChange: nextPage => page.value = nextPage',
    '})'
  ), { ...playgroundRuntime, page })

  return {
    ...codePreview,
    preview: html`<div class="p2-pagination-demo">${Pagination({ page, totalItems: 240, pageSize: 25, showPageSize: true, onPageChange: nextPage => page.value = nextPage })}<p class="playground-note">Page <strong>${page}</strong> of 10</p></div>`,
    controls: <div class="settings-list"><p class="playground-note">This is the same pagination contract a remote result list can use.</p><p class="playground-note">Current page: <strong>{page}</strong></p></div>
  }
}

export function AvatarPlayground() {
  const name = signal('Maya Chen')
  const size = signal('medium')
  const status = signal('online')
  const codePreview = createCodePreview(codeLines(
    'Avatar({',
    '  name,',
    '  size,',
    '  status,',
    '  alt: "Maya Chen"',
    '})'
  ), { ...playgroundRuntime, name, size, status })

  return {
    ...codePreview,
    preview: html`<div class="p2-avatar-demo">${Avatar({ name, size, status })}<strong>${name}</strong></div>`,
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-avatar-name">Name</SettingLabel><TextField id="p2-avatar-name" value={name} /><SettingLabel htmlFor="p2-avatar-size">Size</SettingLabel><SelectForP2 id="p2-avatar-size" value={size} options={selectOptions(['small', 'medium', 'large'])} /><SettingLabel htmlFor="p2-avatar-status">Status</SettingLabel><SelectForP2 id="p2-avatar-status" value={status} options={selectOptions(['online', 'away', 'offline'])} /></div>
  }
}

export function TagPlayground() {
  const tone = signal('success')
  const removed = signal(false)
  const codePreview = createCodePreview(codeLines(
    'Tag({',
    '  label: "In review",',
    '  tone: "success",',
    '  removable: true,',
    '  onRemove: () => removed.value = true',
    '})'
  ), { ...playgroundRuntime, removed })

  return {
    ...codePreview,
    preview: computed(() => removed.value ? Button({ variant: 'tertiary', onClick: () => removed.value = false, children: 'Restore tag' }) : Tag({ label: 'In review', tone, removable: true, onRemove: () => removed.value = true })),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-tag-tone">Tone</SettingLabel><SelectForP2 id="p2-tag-tone" value={tone} options={selectOptions(['neutral', 'success', 'warning', 'error'])} /><p class="playground-note">Removable tags keep the remove action labeled with the tag text.</p></div>
  }
}

export function SeparatorPlayground() {
  const orientation = signal('horizontal')
  const codePreview = createCodePreview(codeLines(
    'Separator({',
    '  orientation,',
    '  decorative: false,',
    '  label: "Or continue"',
    '})'
  ), { ...playgroundRuntime, orientation })

  return {
    ...codePreview,
    preview: html`<div class="p2-separator-demo">${Separator({ orientation, decorative: false, label: 'Or continue' })}</div>`,
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-separator-orientation">Orientation</SettingLabel><SelectForP2 id="p2-separator-orientation" value={orientation} options={selectOptions(['horizontal', 'vertical'])} /><p class="playground-note">A labeled separator exposes the correct separator role.</p></div>
  }
}

export function StackPlayground() {
  const direction = signal('row')
  const gap = signal('medium')
  const codePreview = createCodePreview(codeLines(
    'Stack({',
    '  direction,',
    '  gap,',
    '  wrap: true,',
    '  children: [',
    '    Tag({ label: "Research", tone: "info" }),',
    '    Tag({ label: "Design", tone: "success" }),',
    '    Tag({ label: "Launch", tone: "warning" })',
    '  ]',
    '})'
  ), { ...playgroundRuntime, direction, gap })

  return {
    ...codePreview,
    preview: Stack({ class: 'p2-stack-demo', direction, gap, wrap: true, children: [Tag({ label: 'Research', tone: 'info' }), Tag({ label: 'Design', tone: 'success' }), Tag({ label: 'Launch', tone: 'warning' })] }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-stack-direction">Direction</SettingLabel><SelectForP2 id="p2-stack-direction" value={direction} options={selectOptions(['row', 'column'])} /><SettingLabel htmlFor="p2-stack-gap">Gap</SettingLabel><SelectForP2 id="p2-stack-gap" value={gap} options={selectOptions(['small', 'medium', 'large'])} /></div>
  }
}

export function GridPlayground() {
  const columns = signal(3)
  const codePreview = createCodePreview(codeLines(
    'Grid({',
    '  columns: 3,',
    '  gap: "medium",',
    '  children: cards',
    '})'
  ), { ...playgroundRuntime, columns })
  const cards = ['Signal', 'Motion', 'Clarity', 'Focus', 'Flow', 'Craft']

  return {
    ...codePreview,
    preview: Grid({ class: 'p2-grid-demo', columns, gap: 'medium', children: cards.map((label, index) => html`<article><span>${String(index + 1).padStart(2, '0')}</span><strong>${label}</strong></article>`) }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-grid-columns">Columns</SettingLabel><SelectForP2 id="p2-grid-columns" value={columns} options={[{ value: 2, label: '2 columns' }, { value: 3, label: '3 columns' }, { value: 4, label: '4 columns' }]} /><p class="playground-note">Grid uses a responsive minimum column width, so cards stay readable as the viewport narrows.</p></div>
  }
}
