import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { menuItems, selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

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

