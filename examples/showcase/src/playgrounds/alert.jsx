import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function AlertPlayground() {
  const tone = signal('success')
  const visible = signal(true)
  const codePreview = createCodePreview(codeLines(
    'computed(() => visible.value ? Alert({',
    '  tone,',
    '  title: "Deployment complete",',
    '  children: "Your new workspace is ready.",',
    '  dismissible: true,',
    '  onDismiss: () => visible.value = false',
    '}) : null)'
  ), { ...playgroundRuntime, tone, visible, computed, html })

  return {
    ...codePreview,
    controls: <div class="settings-list">
      <SettingLabel htmlFor="p2-alert-tone">Tone</SettingLabel>
      <SelectForP2 id="p2-alert-tone" value={tone} options={selectOptions(['success', 'info', 'warning', 'error'])} />
      <Button variant="secondary" onClick={() => visible.value = true}>Show alert again</Button>
      <p class="playground-note">Dismiss the notice, then bring it back. Role changes between status and alert tones.</p>
    </div>
  }
}
