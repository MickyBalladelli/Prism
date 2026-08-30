import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function ProgressPlayground() {
  const value = signal(68)
  const gradient = signal(true)
  const gradientStart = signal('#6958de')
  const gradientEnd = signal('#58c9c2')
  const codePreview = createCodePreview(codeLines(
    'Progress({',
    '  label: "Upload progress",',
    '  value,',
    '  max: 100,',
    '  showValue: true,',
    '  gradient,',
    '  gradientStart,',
    '  gradientEnd,',
    '  tone: "accent"',
    '})'
  ), { ...playgroundRuntime, value, gradient, gradientStart, gradientEnd })

  return {
    ...codePreview,
    controls: <div class="settings-list">
      <SettingLabel htmlFor="p2-progress-value">Value</SettingLabel>
      <input class="showcase-range" id="p2-progress-value" type="range" min="0" max="100" value={value} onInput={event => value.value = Number(event.target.value)} />
      <CheckBox checked={gradient}>Use gradient</CheckBox>
      <SettingLabel htmlFor="p2-progress-gradient-start">Gradient start</SettingLabel>
      <input class="showcase-color-input" id="p2-progress-gradient-start" type="color" value={gradientStart} aria-label="Gradient start" onInput={event => gradientStart.value = event.target.value} />
      <SettingLabel htmlFor="p2-progress-gradient-end">Gradient end</SettingLabel>
      <input class="showcase-color-input" id="p2-progress-gradient-end" type="color" value={gradientEnd} aria-label="Gradient end" onInput={event => gradientEnd.value = event.target.value} />
      <p class="playground-note"><strong>{value}%</strong> complete. Gradient uses the two color props above.</p>
    </div>
  }
}
