import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function TagPlayground() {
  const tone = signal('success')
  const removed = signal(false)
  const dismissible = signal(true)
  const showIcon = signal(true)
  const icon = computed(() => showIcon.value ? CheckIcon({ size: '0.85em' }) : null)
  const javascript = computed(() => codeLines(
    'Tag({',
    '  label: "In review",',
    ...(showIcon.value ? ['  icon: CheckIcon({ size: "0.85em" }),'] : []),
    `  tone: "${tone.value}",`,
    `  dismissible: ${dismissible.value},`,
    '  onDismiss: () => removed.value = true',
    '})'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
  const codePreview = createCodePreview(codeLines(
    'Tag({',
    '  label: "In review",',
    '  icon,',
    '  tone: "success",',
    '  dismissible,',
    '  onDismiss: () => removed.value = true',
    '})'
  ), { ...playgroundRuntime, removed, dismissible, icon })

  return {
    ...codePreview,
    javascript,
    jsxCode,
    preview: computed(() => removed.value ? Button({ variant: 'tertiary', onClick: () => removed.value = false, children: 'Restore tag' }) : Tag({ label: 'In review', icon, tone, dismissible, onDismiss: () => removed.value = true })),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-tag-tone">Tone</SettingLabel><SelectForP2 id="p2-tag-tone" value={tone} options={selectOptions(['neutral', 'success', 'warning', 'error'])} /><CheckBox checked={showIcon}>Show icon</CheckBox><CheckBox checked={dismissible}>Show dismiss button</CheckBox><p class="playground-note">Tags can combine a compact icon with an optional dismiss action.</p></div>
  }
}
