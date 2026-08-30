import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

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

