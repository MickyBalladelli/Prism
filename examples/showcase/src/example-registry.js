export const exampleRegistry = [
  {
    key: 'shopping-cart',
    path: '/examples/shopping-cart',
    eyebrow: 'Application / Commerce',
    title: 'Shopping Cart',
    mark: '01',
    description: 'A focused storefront with reactive cart state, validated checkout, and an async order adapter.',
    highlights: ['Cart state', 'Validated checkout', 'Async adapter']
  },
  {
    key: 'notes',
    path: '/examples/notes',
    eyebrow: 'Application / Knowledge',
    title: 'Notes',
    mark: '02',
    description: 'A calm writing desk with reactive search, a structured editor, and local persistence.',
    highlights: ['Search everywhere', 'Form validation', 'Local storage']
  },
  {
    key: 'dashboard',
    path: '/examples/dashboard',
    eyebrow: 'Application / Operations',
    title: 'Dashboard',
    mark: '03',
    description: 'A dense operations view with async metrics, filters, a data table, and performance recording.',
    highlights: ['Async metrics', 'Table filters', 'Performance timeline']
  },
  {
    key: 'chat',
    path: '/examples/chat',
    eyebrow: 'Application / Collaboration',
    title: 'Real-time Chat',
    mark: '04',
    description: 'A small conversation surface with connection lifecycle, keyed messages, and a local echo socket.',
    highlights: ['Socket lifecycle', 'Keyed messages', 'Offline demo']
  }
]

export const exampleRegistryByKey = Object.fromEntries(exampleRegistry.map(example => [example.key, example]))
