import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function StackPlayground() {
  const direction = signal('row')
  const gap = signal('medium')
  const align = signal('center')
  const javascript = computed(() => codeLines(
    'Stack({',
    `  direction: "${direction.value}",`,
    `  gap: "${gap.value}",`,
    `  align: "${align.value}",`,
    '  wrap: true,',
    '  children: [',
    '    Tag({ label: "Research", tone: "info" }),',
    '    Tag({ label: "Design", tone: "success" }),',
    '    Tag({ label: "Launch", tone: "warning" })',
    '  ]',
    '})'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
  const codePreview = createCodePreview(codeLines(
    'Stack({',
    '  direction,',
    '  gap,',
    '  align,',
    '  wrap: true,',
    '  children: [',
    '    Tag({ label: "Research", tone: "info" }),',
    '    Tag({ label: "Design", tone: "success" }),',
    '    Tag({ label: "Launch", tone: "warning" })',
    '  ]',
    '})'
  ), { ...playgroundRuntime, direction, gap, align })

  return {
    ...codePreview,
    javascript,
    jsxCode,
    preview: Stack({ class: 'p2-stack-demo', direction, gap, align, wrap: true, children: [Tag({ label: 'Research', tone: 'info' }), Tag({ label: 'Design', tone: 'success' }), Tag({ label: 'Launch', tone: 'warning' })] }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-stack-direction">Direction</SettingLabel><SelectForP2 id="p2-stack-direction" value={direction} options={selectOptions(['row', 'column'])} /><SettingLabel htmlFor="p2-stack-gap">Gap</SettingLabel><SelectForP2 id="p2-stack-gap" value={gap} options={selectOptions(['small', 'medium', 'large'])} /><SettingLabel htmlFor="p2-stack-align">Align</SettingLabel><SelectForP2 id="p2-stack-align" value={align} options={selectOptions(['left', 'center', 'right'])} /></div>
  }
}
