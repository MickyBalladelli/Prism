import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function StackPlayground() {
  const direction = signal('row')
  const gap = signal('medium')
  const codePreview = createCodePreview(codeLines(
    'Stack({',
    '  direction,',
    '  gap,',
    '  wrap: true,',
    '  children: [',
    '    Tag({ label: "Research", tone: "info" }),',
    '    Tag({ label: "Design", tone: "success" }),',
    '    Tag({ label: "Launch", tone: "warning" })',
    '  ]',
    '})'
  ), { ...playgroundRuntime, direction, gap })

  return {
    ...codePreview,
    preview: Stack({ class: 'p2-stack-demo', direction, gap, wrap: true, children: [Tag({ label: 'Research', tone: 'info' }), Tag({ label: 'Design', tone: 'success' }), Tag({ label: 'Launch', tone: 'warning' })] }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-stack-direction">Direction</SettingLabel><SelectForP2 id="p2-stack-direction" value={direction} options={selectOptions(['row', 'column'])} /><SettingLabel htmlFor="p2-stack-gap">Gap</SettingLabel><SelectForP2 id="p2-stack-gap" value={gap} options={selectOptions(['small', 'medium', 'large'])} /></div>
  }
}

