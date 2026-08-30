import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function SkeletonPlayground() {
  const variant = signal('text')
  const codePreview = createCodePreview(codeLines(
    'Stack({',
    '  gap: "small",',
    '  children: [',
    '    Skeleton({ width: "42%" }),',
    '    Skeleton({ width: "88%" }),',
    '    Skeleton({ variant: "rect", height: "5rem" })',
    '  ]',
    '})'
  ), { ...playgroundRuntime, variant })

  return {
    ...codePreview,
    preview: Stack({ class: 'p2-skeleton-demo', gap: 'small', children: [Skeleton({ variant, width: '42%' }), Skeleton({ width: '88%' }), Skeleton({ variant: 'rect', height: '5rem' })] }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-skeleton-variant">First shape</SettingLabel><SelectForP2 id="p2-skeleton-variant" value={variant} options={selectOptions(['text', 'circle', 'rect'])} /><p class="playground-note">Skeleton is decorative by default. Add ariaLabel when it represents a named loading region.</p></div>
  }
}

