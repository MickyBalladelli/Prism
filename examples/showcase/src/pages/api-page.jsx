import { Card, CodeViewer } from '@mickyballadelli/prism'
import { ShowcaseShell } from '../showcase-shell.jsx'

const apiGroups = [
  {
    label: 'Layout',
    description: 'Surfaces and page structure that carry the Prism visual language.',
    components: [
      { name: 'Background', props: [['palette', 'BackgroundPalette', 'midnight'], ['animation', 'BackgroundAnimation', 'veil'], ['animated', 'boolean | Reactive<boolean>', 'true'], ['intensity', 'number | Reactive<number>', '0.85']], events: '—', a11y: 'Content stays above the effect; provide ariaLabel for an unlabeled surface.' },
      { name: 'Box', props: [['children', 'unknown', '—'], ['role', 'string', '—'], ['sticky', 'boolean | Signal<boolean>', 'false'], ['style', 'string | StyleObject', '—']], events: '—', a11y: 'Choose a semantic role when the wrapper represents more than layout.' },
      { name: 'Card', props: [['children', 'unknown', '—'], ['actions', 'unknown', '—'], ['class', 'string', '—']], events: '—', a11y: 'Renders an article surface; give it a heading when it is a standalone region.' },
      { name: 'Header', props: [['children', 'unknown', '—'], ['trailing', 'unknown', '—'], ['sticky', 'boolean | Signal<boolean>', 'true']], events: '—', a11y: 'Use ariaLabel when the app bar has no visible name.' },
      { name: 'Layout', props: [['children', 'unknown', '—'], ['header / navigator / footer', 'unknown', '—'], ['contentClass / bodyClass', 'string', '—']], events: '—', a11y: 'Creates predictable page regions; preserve heading and landmark semantics in each slot.' },
      { name: 'Footer', props: [['children', 'unknown', '—'], ['leading / trailing', 'unknown', '—'], ['sticky / stickyBottom', 'boolean / string', 'false / 0px'], ['ariaLabel', 'string', 'Site footer']], events: '—', a11y: 'Renders a footer landmark; use split slots when content has distinct start and end regions.' },
      { name: 'Label', props: [['children', 'unknown', '—'], ['size', 'LabelSize', 'medium'], ['tone', 'LabelTone', 'ink'], ['alwaysVisible', 'boolean', 'false']], events: '—', a11y: 'Use htmlFor for a form label; do not use it as a visual-only heading.' }
    ]
  },
  {
    label: 'Forms and actions',
    description: 'Controls with Matrix state binding and native event callbacks.',
    components: [
      { name: 'TextField', props: [['value', 'string | Reactive<string>', "''"], ['type', 'string', 'text'], ['required', 'boolean | Reactive<boolean>', 'false'], ['error', 'unknown', '—']], events: 'onInput, onChange, onFocus, onBlur', a11y: 'Use FormField or ariaLabel; error adds described-by and invalid state.' },
      { name: 'Select', props: [['options', 'SelectOptionInput[] | Reactive<...>', '[]'], ['value', 'string | number | Reactive<...>', "''"], ['placement', 'SelectPlacement', 'bottom'], ['required', 'boolean | Reactive<boolean>', 'false']], events: 'onChange, onFocus, onBlur, onRender', a11y: 'Listbox keyboard behavior, required form submission, and active descendant are built in.' },
      { name: 'CheckBox', props: [['checked', 'boolean | Reactive<boolean>', 'false'], ['children', 'unknown', '—'], ['required', 'boolean | Reactive<boolean>', 'false'], ['error', 'unknown', '—']], events: 'onChange, onFocus, onBlur', a11y: 'Visible children label the input; use ariaLabel for an unlabeled checkbox.' },
      { name: 'ColorPicker', props: [['value', 'string | Reactive<string>', '#000000'], ['label', 'unknown | Reactive<unknown>', '—'], ['showValue', 'boolean | Reactive<boolean>', 'true'], ['size', 'small | medium | large', 'medium']], events: 'onInput, onChange, onFocus, onBlur', a11y: 'Uses a native color input with an associated visible label or ariaLabel.' },
      { name: 'DatePicker', props: [['value', 'string | Reactive<string>', "''"], ['label', 'unknown | Reactive<unknown>', '—'], ['min / max', 'string | Reactive<string>', '—'], ['size', 'small | medium | large', 'medium']], events: 'onInput, onChange, onFocus, onBlur', a11y: 'Uses a themed calendar popup with an associated visible label or ariaLabel.' },
      { name: 'DateTimePicker', props: [['value', 'string | Reactive<string>', "''"], ['label', 'unknown | Reactive<unknown>', '—'], ['min / max / step', 'string / number | Reactive<...>', '—'], ['size', 'small | medium | large', 'medium']], events: 'onInput, onChange, onFocus, onBlur', a11y: 'Uses a themed calendar and time popup with an associated visible label or ariaLabel.' },
      { name: 'Button', props: [['variant', 'ButtonVariant', 'primary'], ['palette', 'ButtonPalette', '—'], ['loading', 'boolean | Reactive<boolean>', 'false'], ['disabled', 'boolean | Reactive<boolean>', 'false']], events: 'onClick, onFocus, onBlur', a11y: 'Native button semantics, busy state, pressed state, and icon-only label fallback.' },
      { name: 'FormField', props: [['label', 'unknown', '—'], ['hint', 'unknown | Reactive<unknown>', '—'], ['error', 'unknown | Reactive<unknown>', '—'], ['control', '(context) => unknown', '—']], events: '—', a11y: 'Connects generated IDs, described-by, required, and invalid state to the child control.' },
      { name: 'IconButton', props: [['icon', 'unknown', '—'], ['label', 'unknown', '—'], ['variant', 'ButtonVariant', 'secondary']], events: 'onClick, onFocus, onBlur', a11y: 'Requires a visible label or ariaLabel fallback for icon-only actions.' }
    ]
  },
  {
    label: 'Feedback and loading',
    description: 'Clear state communication for inline, transient, and async work.',
    components: [
      { name: 'Alert', props: [['tone', 'AlertTone', 'info'], ['title', 'unknown', '—'], ['description', 'unknown', '—'], ['dismissible', 'boolean', 'false']], events: 'onDismiss', a11y: 'Uses status or alert role; keep the important meaning in text.' },
      { name: 'ToastRegion', props: [['toasts', 'ToastItem[] | Reactive<...>', '[]'], ['position', 'ToastPosition', 'bottom-end'], ['maxVisible', 'number', '4'], ['duration', 'number', '5000']], events: 'onDismiss', a11y: 'Polite announcements pause while hovered or focused and support dismissal.' },
      { name: 'Progress', props: [['value', 'number | Reactive<number>', '—'], ['max', 'number | Reactive<number>', '100'], ['indeterminate', 'boolean | Reactive<boolean>', 'false'], ['showValue', 'boolean', 'false'], ['gradient', 'boolean | Reactive<boolean>', 'false'], ['gradientStart / gradientEnd', 'string | Reactive<string>', 'theme accent / accent bright']], events: '—', a11y: 'Uses progressbar semantics with value text when determinate; gradient colors are decorative.' },
      { name: 'Spinner', props: [['size', 'small | medium | large', 'medium'], ['tone', 'ProgressTone', 'accent'], ['ariaLabel', 'string', 'Loading']], events: '—', a11y: 'Status label is provided through ariaLabel.' },
      { name: 'Skeleton', props: [['variant', 'text | circle | rect', 'text'], ['width', 'string', '100%'], ['height', 'string', '1rem'], ['ariaLabel', 'string', '—']], events: '—', a11y: 'Decorative by default; use ariaLabel when it communicates loading.' },
      { name: 'EmptyState', props: [['status', 'empty | filtered | error', 'empty'], ['title', 'unknown', '—'], ['action', 'unknown | () => unknown', '—'], ['onRetry', '(event) => void', '—']], events: 'onRetry', a11y: 'Explains the state and offers a keyboard-accessible next action.' },
      { name: 'Badge / Pulse', props: [['value / status', 'string | number / PulseStatus', '—'], ['tone / size', 'BadgeTone / PulseSize', 'neutral / medium'], ['pulseOnChange / animation', 'boolean / PulseAnimation', 'false / once']], events: '—', a11y: 'Provide ariaLabel when meaning is not present in visible text.' }
    ]
  },
  {
    label: 'Navigation and overlays',
    description: 'Keyboard-first movement through hierarchy, actions, and focused content.',
    components: [
      { name: 'TreeView', props: [['items', 'TreeViewItem[] | Reactive<...>', '[]'], ['model', 'TreeViewModel', 'prism'], ['expanded', 'Record<string, boolean> | Reactive<...>', 'uncontrolled'], ['itemVariant', 'framed | minimal', 'framed'], ['filter / expandCollapse', 'boolean | Reactive<boolean>', 'false / false']], events: 'onExpandedChange, item onClick, onRender', a11y: 'Tree roles, hierarchy metadata, roving focus, branch keyboard behavior, optional filtering, and expand/collapse controls are built in.' },
      { name: 'Navigator', props: [['children', 'unknown', '—'], ['title / description', 'unknown', '—'], ['sticky / stickyTop', 'boolean / string', 'false / 0px']], events: '—', a11y: 'Renders a named navigation landmark; pair it with TreeView or links that expose current state.' },
      { name: 'Tabs', props: [['items', 'TabsItem[] | Reactive<...>', '[]'], ['activeTab', 'string | number | Signal<...>', 'first enabled'], ['activation', 'automatic | manual', 'automatic'], ['orientation', 'horizontal | vertical', 'horizontal']], events: 'onTabChange', a11y: 'Linked tabpanels, roving focus, Arrow/Home/End navigation, and disabled tabs.' },
      { name: 'Pagination', props: [['page', 'number | Signal<number>', '1'], ['pageCount', 'number | Reactive<number>', '—'], ['totalItems', 'number | Reactive<number>', '—'], ['pageSize', 'number | Signal<number>', '10']], events: 'onPageChange, onPageSizeChange', a11y: 'Navigation landmark and labels identify previous, next, and page buttons.' },
      { name: 'Popup', props: [['open', 'boolean | Signal<boolean>', 'false'], ['title', 'unknown', '—'], ['size', 'small | medium | large | full', 'medium'], ['restoreFocus', 'boolean', 'true']], events: 'onClose', a11y: 'Dialog naming, focus placement, focus trap, Escape, backdrop close, and scroll lock.' },
      { name: 'Menu / DropdownMenu', props: [['items', 'MenuItemInput[] | Reactive<...>', '[]'], ['placement', 'FloatingPlacement', 'bottom-start'], ['label', 'unknown', '—']], events: 'onSelect, onActiveChange, onOpenChange', a11y: 'Menu roles, roving focus, typeahead, disabled items, groups, and separators.' },
      { name: 'Tooltip / Popover', props: [['content', 'unknown | () => unknown', '—'], ['placement', 'FloatingPlacement', 'bottom'], ['delay', 'number', '—'], ['closeOnEscape', 'boolean', 'true']], events: 'onOpenChange (Popover)', a11y: 'Tooltip and dialog roles use collision-aware positioning, Escape, outside close, and touch behavior.' }
    ]
  },
  {
    label: 'Composition, data, and code',
    description: 'Small primitives for building dense product interfaces.',
    components: [
      { name: 'Avatar / Tag', props: [['name / children', 'string | Reactive<string> / unknown', '—'], ['src / tone', 'string / TagTone', '—'], ['size / removable', 'AvatarSize / boolean', 'medium / false']], events: 'onRemove (Tag)', a11y: 'Avatar alt text and Tag remove labeling keep identity and metadata understandable.' },
      { name: 'Separator', props: [['orientation', 'horizontal | vertical', 'horizontal'], ['decorative', 'boolean', 'true'], ['label', 'unknown', '—']], events: '—', a11y: 'Uses separator semantics when non-decorative.' },
      { name: 'Stack / Grid', props: [['direction / columns', 'row | column / string | number', 'column / auto-fit'], ['gap', 'SpacingToken', 'medium'], ['wrap / minColumnWidth', 'boolean / string', 'false / 14rem']], events: '—', a11y: 'Layout-only wrappers; preserve heading and landmark semantics in children.' },
      { name: 'Table', props: [['rows / columns', 'Row[] / TableColumn<Row>[]', '[]'], ['serverSide', 'boolean | Signal<boolean>', 'false'], ['virtualized', 'boolean | Reactive<boolean>', 'false'], ['settings', 'TableSettings | string', '—']], events: 'onQueryChange, onSelectionChange, onSortChange, onPageChange, onError', a11y: 'Grid semantics, loading/empty announcements, row keys, resize help, and keyboard selection.' },
      { name: 'CodeViewer', props: [['code', 'string | Reactive<string>', "''"], ['language', 'CodeLanguage', 'text'], ['editable', 'boolean | Reactive<boolean>', 'false'], ['tabs', 'CodeViewerTab[] | Reactive<...>', '—']], events: 'onChange, onCopy, onTabChange', a11y: 'Read-only by default; linked tabs, tabpanel semantics, keyboard navigation, and copy status.' }
    ]
  }
]

const apiGroupId = group => `api-group-${group.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

const controlledExample = `import { Button, Card, FormField, TextField } from '@mickyballadelli/prism'
import { signal } from '@mickyballadelli/matrix'

const name = signal('Ada')
const saved = signal(false)

const view = Card({
  children: [
    FormField({
      label: 'Workspace name',
      control: control => TextField({ ...control, value: name })
    }),
    Button({
      children: 'Save',
      onClick: () => { saved.value = true }
    })
  ]
})`

function PropTable({ component }) {
  return (
    <div class="api-props-table-wrap">
      <table class="api-props-table">
        <thead>
          <tr><th scope="col">Prop</th><th scope="col">Type</th><th scope="col">Default</th></tr>
        </thead>
        <tbody>
          {component.props.map(([name, type, defaultValue]) => (
            <tr key={name}><th scope="row"><code>{name}</code></th><td><code>{type}</code></td><td><code>{defaultValue}</code></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ApiComponent({ component }) {
  return (
    <Card class="api-component-card">
      <div class="api-readable-surface">
        <div class="api-component-heading">
          <div>
            <p class="eyebrow">Component</p>
            <h3>{component.name}</h3>
          </div>
          <span class="api-component-mark">API</span>
        </div>
        <PropTable component={component} />
        <div class="api-component-notes">
          <p><strong>Events</strong> {component.events}</p>
          <p><strong>Accessibility</strong> {component.a11y}</p>
        </div>
      </div>
    </Card>
  )
}

export function ApiPage({ link, navigateTo }) {
  return (
    <ShowcaseShell activeKey="api" link={link} navigateTo={navigateTo}>
      <main class="app-shell detail-page api-page">
        <a class="back-link" href="/" onClick={link('/')}>← Back to overview</a>
        <header class="detail-header api-header">
          <p class="eyebrow">Public contract / {apiGroups.reduce((count, group) => count + group.components.length, 0)} components</p>
          <h1>Build with intent.<br /><em>Know every surface.</em></h1>
          <p class="hero-copy">Compact API notes for the Prism component system. Start with the theme, bind state with Matrix signals, and keep the semantics visible.</p>
        </header>

        <section class="api-example-section" aria-labelledby="api-controlled-title">
          <div class="api-section-heading">
            <div>
              <p class="eyebrow">Controlled composition</p>
              <h2 id="api-controlled-title">Signals make state explicit.</h2>
            </div>
            <p>Use writable signals for controls, and keep labels and validation in the same composition boundary.</p>
          </div>
          <CodeViewer code={controlledExample} language="javascript" filename="controlled-form.js" editable={false} copyable ariaLabel="Controlled form example" />
        </section>

        <div class="api-groups">
          {apiGroups.map(group => (
            <section class="api-group" key={group.label} aria-labelledby={apiGroupId(group)}>
              <div class="api-section-heading">
                <div>
                  <p class="eyebrow">API group</p>
                  <h2 id={apiGroupId(group)}>{group.label}</h2>
                </div>
                <p>{group.description}</p>
              </div>
              <div class="api-component-grid">
                {group.components.map(component => <ApiComponent key={component.name} component={component} />)}
              </div>
            </section>
          ))}
        </div>

      </main>
    </ShowcaseShell>
  )
}
