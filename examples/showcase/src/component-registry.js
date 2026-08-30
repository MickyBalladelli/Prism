export const componentRegistry = [
  {
    key: 'background',
    path: '/components/background',
    eyebrow: 'Layout',
    title: 'Background',
    mark: '13',
    description: 'A reusable animated backdrop with named motion recipes, Prism-toned palettes, and an overlay content slot.',
    highlights: ['Named animations', 'Theme-friendly palettes', 'Content stays readable'],
    details: ['Thirteen motion recipes', 'Toggle the motion layer', 'Works as a real layout surface']
  },
  {
    key: 'label',
    path: '/components/label',
    eyebrow: 'Layout',
    title: 'Label',
    mark: '14',
    description: 'Typographic labels with size, typeface, and a character outline that stays readable over motion.',
    highlights: ['Size and typeface', 'Always-visible outline', 'Works over animation'],
    details: ['Four sizes', 'Sans, serif, and mono', 'Light or dark character borders']
  },
  {
    key: 'header',
    path: '/components/header',
    eyebrow: 'Layout',
    title: 'Header',
    mark: '15',
    description: 'A sticky application bar with a leading slot and a trailing slot for tools.',
    highlights: ['Sticky by default', 'Leading and trailing', 'App chrome'],
    details: ['Pins to the top', 'Brand and tools', 'Works over animation']
  },
  {
    key: 'layout',
    path: '/components/layout',
    eyebrow: 'Layout',
    title: 'Layout',
    mark: '35',
    description: 'A page frame that keeps header, navigation, content, and footer regions in a clear hierarchy.',
    highlights: ['Page structure', 'Optional regions', 'Responsive grid'],
    details: ['Header and footer slots', 'Navigator-aware body', 'Mobile stacking']
  },
  {
    key: 'footer',
    path: '/components/footer',
    eyebrow: 'Layout',
    title: 'Footer',
    mark: '37',
    description: 'A semantic closing region for product metadata, utility links, and quiet status context.',
    highlights: ['Semantic footer', 'Split content', 'Responsive stack'],
    details: ['Leading and trailing slots', 'Accessible landmark', 'Theme-ready surface']
  },
  {
    key: 'box',
    path: '/components/box',
    eyebrow: 'Layout',
    title: 'Box',
    mark: '01',
    description: 'A simple div wrapper for grouping content and layout styles.',
    highlights: ['Structure first', 'Flexible wrapper', 'Semantic-ready'],
    details: ['Content grouping', 'Class hooks', 'Role support']
  },
  {
    key: 'text-field',
    path: '/components/text-field',
    eyebrow: 'Forms',
    title: 'TextField',
    mark: '02',
    description: 'A text input bound to a Matrix signal.',
    highlights: ['Reactive input', 'Three sizes', 'Validation states'],
    details: ['Signal binding', 'Placeholder control', 'Required and disabled']
  },
  {
    key: 'select',
    path: '/components/select',
    eyebrow: 'Forms',
    title: 'Select',
    mark: '03',
    description: 'A styled option picker bound to a Matrix signal.',
    highlights: ['Option lists', 'Reactive value', 'Native behavior'],
    details: ['Label and value pairs', 'Disabled options', 'Required support']
  },
  {
    key: 'check-box',
    path: '/components/check-box',
    eyebrow: 'Forms',
    title: 'CheckBox',
    mark: '04',
    description: 'A checkbox that keeps its checked state reactive.',
    highlights: ['Writable state', 'Label pairing', 'Simple toggles'],
    details: ['Reactive checked value', 'Accessible label flow', 'Disabled support']
  },
  {
    key: 'color-picker',
    path: '/components/color-picker',
    eyebrow: 'Forms',
    title: 'ColorPicker',
    mark: '38',
    description: 'A native color control with a signal-friendly value and an optional readable hex value.',
    highlights: ['Native color input', 'Reactive value', 'Gradient ready'],
    details: ['Hex value display', 'Three sizes', 'Accessible labeling']
  },
  {
    key: 'date-picker',
    path: '/components/date-picker',
    eyebrow: 'Forms',
    title: 'DatePicker',
    mark: '39',
    description: 'A themed calendar control with a reactive ISO date value and familiar picker affordances.',
    highlights: ['Native calendar', 'Reactive value', 'Form ready'],
    details: ['ISO date values', 'Min and max bounds', 'Three sizes']
  },
  {
    key: 'date-time-picker',
    path: '/components/date-time-picker',
    eyebrow: 'Forms',
    title: 'DateTimePicker',
    mark: '40',
    description: 'A local date and time control for scheduling moments without hidden timezone conversion.',
    highlights: ['Local date-time', 'Reactive value', 'Themed popup'],
    details: ['Minute-level input', 'Min and max bounds', 'Three sizes']
  },
  {
    key: 'card',
    path: '/components/card',
    eyebrow: 'Layout',
    title: 'Card',
    mark: '05',
    description: 'A semantic article wrapper for standalone content.',
    highlights: ['Article semantics', 'Optional action footer', 'Composed content'],
    details: ['Structured layouts', 'Footer actions', 'Standalone sections']
  },
  {
    key: 'button',
    path: '/components/button',
    eyebrow: 'Forms',
    title: 'Button',
    mark: '06',
    description: 'A button system with role variants, status states, and palette switching.',
    highlights: ['Seven variants', 'Pressed states', 'Palette-ready'],
    details: ['Primary to success', 'Hover and active motion', 'Theme-driven colors']
  },
  {
    key: 'badge',
    path: '/components/badge',
    eyebrow: 'Status',
    title: 'Badge',
    mark: '07',
    description: 'A compact count or state marker with optional change feedback.',
    highlights: ['Count-ready', 'Five tones', 'Change pulse'],
    details: ['Signal-friendly value', 'Semantic labels', 'Motion-aware']
  },
  {
    key: 'pulse',
    path: '/components/pulse',
    eyebrow: 'Status',
    title: 'Pulse',
    mark: '08',
    description: 'A pulsating status marker for live health, progress, and attention states.',
    highlights: ['Four statuses', 'Three sizes', 'Motion-aware'],
    details: ['Success to error', 'Button-ready scale', 'Reduced-motion safe']
  },
  {
    key: 'tree-view',
    path: '/components/tree-view',
    eyebrow: 'Navigation',
    title: 'TreeView',
    mark: '09',
    description: 'A polished navigation tree with nested branches, active items, and metadata chips.',
    highlights: ['Nested branches', 'Meta chips', 'Active states'],
    details: ['Expandable groups', 'Tree markers', 'Navigation structure']
  },
  {
    key: 'navigator',
    path: '/components/navigator',
    eyebrow: 'Navigation',
    title: 'Navigator',
    mark: '36',
    description: 'A semantic navigation pane for product sections, workspace trees, and persistent wayfinding.',
    highlights: ['Nav landmark', 'Title and status', 'Sticky-ready'],
    details: ['TreeView-friendly body', 'Optional footer slot', 'Mobile-aware composition']
  },
  {
    key: 'code-viewer',
    path: '/components/code-viewer',
    eyebrow: 'Data & Code',
    title: 'CodeViewer',
    mark: '10',
    description: 'An editable syntax-colored code surface with line numbers and one-click copying.',
    highlights: ['Live editing', 'Syntax colors', 'Copy action'],
    details: ['Line-number gutter', 'Custom token colors', 'Keyboard-friendly source']
  },
  {
    key: 'table',
    path: '/components/table',
    eyebrow: 'Data & Code',
    title: 'Table',
    mark: '11',
    description: 'A high-performance data surface with rich cells and durable user settings.',
    highlights: ['Rich columns', 'Resize + reorder', 'Settings as JSON'],
    details: ['Search, sort, and paginate', 'Selection and CSV export', 'Pinned columns and density modes']
  },
  {
    key: 'popup',
    path: '/components/popup',
    eyebrow: 'Overlay',
    title: 'Popup',
    mark: '12',
    description: 'An accessible dialog surface for focused decisions, details, and workflows.',
    highlights: ['Focus trapped', 'Four sizes', 'Three placements'],
    details: ['Backdrop and Escape dismissal', 'Flexible body and footer slots', 'Automatic focus restoration']
  },
  {
    key: 'form-field',
    path: '/components/form-field',
    eyebrow: 'Forms',
    title: 'FormField',
    mark: '16',
    description: 'A field wrapper that keeps labels, hints, validation, and control IDs connected.',
    highlights: ['Label wiring', 'Validation copy', 'Control callback'],
    details: ['Generated IDs', 'Described-by chain', 'Required state']
  },
  {
    key: 'alert',
    path: '/components/alert',
    eyebrow: 'Status',
    title: 'Alert',
    mark: '17',
    description: 'Inline feedback for success, information, warnings, and errors.',
    highlights: ['Four tones', 'Dismiss action', 'Live semantics'],
    details: ['Title and description', 'Status or alert role', 'Clear icon treatment']
  },
  {
    key: 'toast',
    path: '/components/toast',
    eyebrow: 'Status',
    title: 'ToastRegion',
    mark: '18',
    description: 'Transient feedback that queues cleanly and pauses while the user reads.',
    highlights: ['Queue controller', 'Pause on focus', 'Reduced motion'],
    details: ['Bounded visible stack', 'Dismissible notices', 'Polite announcements']
  },
  {
    key: 'menu',
    path: '/components/menu',
    eyebrow: 'Overlay',
    title: 'Menu',
    mark: '19',
    description: 'Action menus with keyboard navigation, groups, separators, and shortcuts.',
    highlights: ['Roving focus', 'Nested groups', 'Disabled actions'],
    details: ['Home and End keys', 'Typeahead', 'Submenu support']
  },
  {
    key: 'dropdown-menu',
    path: '/components/dropdown-menu',
    eyebrow: 'Overlay',
    title: 'DropdownMenu',
    mark: '20',
    description: 'A positioned menu trigger for compact action surfaces.',
    highlights: ['Anchored panel', 'Escape close', 'Collision aware'],
    details: ['Outside dismissal', 'Trigger restoration', 'Placement options']
  },
  {
    key: 'tooltip',
    path: '/components/tooltip',
    eyebrow: 'Overlay',
    title: 'Tooltip',
    mark: '21',
    description: 'Brief contextual help that works for hover, focus, and touch.',
    highlights: ['Hover and focus', 'Touch toggle', 'Viewport clamp'],
    details: ['Configurable delay', 'Tooltip role', 'Icon-button ready']
  },
  {
    key: 'popover',
    path: '/components/popover',
    eyebrow: 'Overlay',
    title: 'Popover',
    mark: '22',
    description: 'Richer contextual content anchored beside a trigger.',
    highlights: ['Rich content', 'Outside close', 'Escape close'],
    details: ['Dialog semantics', 'Placement helper', 'Focus return']
  },
  {
    key: 'tabs',
    path: '/components/tabs',
    eyebrow: 'Navigation',
    title: 'Tabs',
    mark: '23',
    description: 'Accessible related panels with automatic or manual activation.',
    highlights: ['Linked panels', 'Roving focus', 'Vertical mode'],
    details: ['Arrow navigation', 'Disabled tabs', 'Stable IDs']
  },
  {
    key: 'progress',
    path: '/components/progress',
    eyebrow: 'Status',
    title: 'Progress',
    mark: '24',
    description: 'Determinate or indeterminate progress with native semantics.',
    highlights: ['Real values', 'Four tones', 'Indeterminate mode'],
    details: ['Min and max', 'Optional percentage', 'Motion aware']
  },
  {
    key: 'spinner',
    path: '/components/spinner',
    eyebrow: 'Status',
    title: 'Spinner',
    mark: '25',
    description: 'A compact labeled signal for short waits.',
    highlights: ['Three sizes', 'Four tones', 'Status role'],
    details: ['Inline friendly', 'Accessible label', 'Reduced motion']
  },
  {
    key: 'skeleton',
    path: '/components/skeleton',
    eyebrow: 'Status',
    title: 'Skeleton',
    mark: '26',
    description: 'Shape-preserving loading placeholders for calm transitions.',
    highlights: ['Text and shapes', 'Radius options', 'Motion aware'],
    details: ['Circle variant', 'Rect variant', 'Decorative default']
  },
  {
    key: 'empty-state',
    path: '/components/empty-state',
    eyebrow: 'Status',
    title: 'EmptyState',
    mark: '27',
    description: 'A consistent next step for empty, filtered, or failed results.',
    highlights: ['Three states', 'Action slot', 'Retry action'],
    details: ['Shared language', 'Semantic status', 'Centered composition']
  },
  {
    key: 'icon-button',
    path: '/components/icon-button',
    eyebrow: 'Actions',
    title: 'IconButton',
    mark: '28',
    description: 'A compact action with an explicit accessible name.',
    highlights: ['Icon first', 'Label required', 'Button states'],
    details: ['Native title hint', 'Button variants', 'Tooltip ready']
  },
  {
    key: 'pagination',
    path: '/components/pagination',
    eyebrow: 'Navigation',
    title: 'Pagination',
    mark: '29',
    description: 'Reusable navigation for local and remote result sets.',
    highlights: ['Page windows', 'Remote totals', 'Page size'],
    details: ['Ellipsis logic', 'Previous and next', 'Accessible labels']
  },
  {
    key: 'avatar',
    path: '/components/avatar',
    eyebrow: 'Composition',
    title: 'Avatar',
    mark: '30',
    description: 'Identity markers with image, initials, size, and presence state.',
    highlights: ['Initials fallback', 'Presence dot', 'Three sizes'],
    details: ['Image alt text', 'Circle or square', 'Lazy image loading']
  },
  {
    key: 'tag',
    path: '/components/tag',
    eyebrow: 'Composition',
    title: 'Tag',
    mark: '31',
    description: 'Small metadata chips with optional removal.',
    highlights: ['Four tones', 'Removable', 'Compact shape'],
    details: ['Labeled remove button', 'Status-ready colors', 'Inline composition']
  },
  {
    key: 'separator',
    path: '/components/separator',
    eyebrow: 'Composition',
    title: 'Separator',
    mark: '32',
    description: 'Decorative or semantic rules for breaking up content.',
    highlights: ['Horizontal', 'Vertical', 'Labeled'],
    details: ['Separator role', 'Orientation', 'Content-aware line']
  },
  {
    key: 'stack',
    path: '/components/stack',
    eyebrow: 'Composition',
    title: 'Stack',
    mark: '33',
    description: 'Predictable flex spacing for rows and columns.',
    highlights: ['Row or column', 'Four gaps', 'Wrap support'],
    details: ['Align and justify', 'No custom CSS', 'Composable children']
  },
  {
    key: 'grid',
    path: '/components/grid',
    eyebrow: 'Composition',
    title: 'Grid',
    mark: '34',
    description: 'Responsive card layouts with a small, expressive API.',
    highlights: ['Auto-fit columns', 'Minimum width', 'Four gaps'],
    details: ['Responsive defaults', 'Explicit columns', 'Card-ready']
  }
]

export const componentGroups = [
  { key: 'layout', label: 'Layout' },
  { key: 'forms', label: 'Forms' },
  { key: 'navigation', label: 'Navigation' },
  { key: 'status', label: 'Status' },
  { key: 'overlay', label: 'Overlay' },
  { key: 'actions', label: 'Actions' },
  { key: 'composition', label: 'Composition' },
  { key: 'data-code', label: 'Data & Code' }
]

export const componentRegistryByKey = Object.fromEntries(componentRegistry.map(component => [component.key, component]))

export const componentRegistryByGroup = group => componentRegistry.filter(component => component.eyebrow === group)
