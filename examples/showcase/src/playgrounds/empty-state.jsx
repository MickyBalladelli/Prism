import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function EmptyStatePlayground() {
  const status = signal('empty')
  const codePreview = createCodePreview(codeLines(
    'EmptyState({',
    '  status,',
    '  title: "No campaigns yet",',
    '  description: "Create your first campaign to see performance here.",',
    '  action: Button({ children: "Create campaign", icon: PlusIcon() })',
    '})'
  ), { ...playgroundRuntime, status, PlusIcon })

  return {
    ...codePreview,
    preview: EmptyState({ status, icon: SparkIcon({ size: '1.25em' }), title: 'No campaigns yet', description: 'Create your first campaign to see performance here.', action: Button({ children: 'Create campaign', icon: PlusIcon({ size: '1em' }) }) }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-empty-status">State</SettingLabel><SelectForP2 id="p2-empty-status" value={status} options={[{ value: 'empty', label: 'Empty' }, { value: 'filtered', label: 'Filtered empty' }, { value: 'error', label: 'Error' }]} /></div>
  }
}

