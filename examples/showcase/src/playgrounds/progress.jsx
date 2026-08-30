import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function ProgressPlayground() {
  const value = signal(68)
  const codePreview = createCodePreview(codeLines(
    'Progress({',
    '  label: "Upload progress",',
    '  value,',
    '  max: 100,',
    '  showValue: true,',
    '  tone: "accent"',
    '})'
  ), { ...playgroundRuntime, value })

  return {
    ...codePreview,
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-progress-value">Value</SettingLabel><input class="showcase-range" id="p2-progress-value" type="range" min="0" max="100" value={value} onInput={event => value.value = Number(event.target.value)} /><p class="playground-note"><strong>{value}%</strong> complete. Progress exposes min, max, and current value.</p></div>
  }
}

