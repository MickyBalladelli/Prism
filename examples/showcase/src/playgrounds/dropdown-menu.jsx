import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { menuItems, selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function DropdownMenuPlayground() {
  const selected = signal('Choose an action')
  const items = menuItems.map(item => item.type ? item : { ...item, onSelect: value => selected.value = value.label })
  const javascript = computed(() => codeLines(
    `// Last action: ${JSON.stringify(selected.value)}`,
    'DropdownMenu({',
    '  label: "Project actions",',
    '  placement: "bottom-start",',
    '  items: actionItems,',
    '  onSelect: item => selected.value = item.label',
    '})'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
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
    javascript,
    jsxCode,
    preview: html`<div class="p2-dropdown-demo">${component(DropdownMenu, { label: 'Project actions', items })}<p class="playground-note">${selected}</p></div>`,
    controls: <div class="settings-list"><p class="playground-note">Open the menu, then use Arrow Down to enter it. Escape closes and restores the trigger.</p><p class="playground-note">Last action: <strong>{selected}</strong></p></div>
  }
}
