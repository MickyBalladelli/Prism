import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

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

