import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

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

