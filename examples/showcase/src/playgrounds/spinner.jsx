import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function SpinnerPlayground() {
  const size = signal('medium')
  const tone = signal('accent')
  const codePreview = createCodePreview(codeLines(
    'Spinner({',
    '  size,',
    '  tone,',
    '  ariaLabel: "Loading workspace"',
    '})'
  ), { ...playgroundRuntime, size, tone })

  return {
    ...codePreview,
    preview: html`<div class="p2-spinner-demo">${Spinner({ size, tone, ariaLabel: 'Loading workspace' })}<span>Loading workspace</span></div>`,
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-spinner-size">Size</SettingLabel><SelectForP2 id="p2-spinner-size" value={size} options={selectOptions(['small', 'medium', 'large'])} /><SettingLabel htmlFor="p2-spinner-tone">Tone</SettingLabel><SelectForP2 id="p2-spinner-tone" value={tone} options={selectOptions(['accent', 'success', 'warning', 'error'])} /></div>
  }
}

