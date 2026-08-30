import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

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

