import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function AvatarPlayground() {
  const name = signal('Maya Chen')
  const size = signal('medium')
  const status = signal('online')
  const statusSize = signal('large')
  const showStatus = signal(true)
  const codePreview = createCodePreview(codeLines(
    'Avatar({',
    '  name,',
    '  size,',
    '  status,',
    '  statusSize,',
    '  showStatus,',
    '  alt: "Maya Chen"',
    '})'
  ), { ...playgroundRuntime, name, size, status, statusSize, showStatus })

  return {
    ...codePreview,
    preview: html`<div class="p2-avatar-demo">${Avatar({ name, size, status, statusSize, showStatus })}<strong>${name}</strong></div>`,
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-avatar-name">Name</SettingLabel><TextField id="p2-avatar-name" value={name} /><SettingLabel htmlFor="p2-avatar-size">Size</SettingLabel><SelectForP2 id="p2-avatar-size" value={size} options={selectOptions(['small', 'medium', 'large'])} /><SettingLabel htmlFor="p2-avatar-status">Status</SettingLabel><SelectForP2 id="p2-avatar-status" value={status} options={selectOptions(['online', 'away', 'offline'])} /><SettingLabel htmlFor="p2-avatar-status-size">Status size</SettingLabel><SelectForP2 id="p2-avatar-status-size" value={statusSize} options={selectOptions(['small', 'medium', 'large'])} /><CheckBox checked={showStatus}>Show status</CheckBox></div>
  }
}
