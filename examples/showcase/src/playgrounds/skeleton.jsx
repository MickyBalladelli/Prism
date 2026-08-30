import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SettingLabel } from './helpers.jsx'

export function SkeletonPlayground() {
  const variant = signal('text')
  const firstWidth = computed(() => variant.value === 'circle' ? '3.25rem' : variant.value === 'rect' ? '100%' : '46%')
  const firstHeight = computed(() => variant.value === 'circle' ? '3.25rem' : variant.value === 'rect' ? '4.5rem' : '0.95rem')
  const codePreview = createCodePreview(codeLines(
    'Stack({',
    '  gap: "small",',
    '  children: [',
    '    Skeleton({ variant, width: firstWidth, height: firstHeight }),',
    '    Skeleton({ width: "88%" }),',
    '    Skeleton({ variant: "rect", height: "5rem" })',
    '  ]',
    '})'
  ), { ...playgroundRuntime, variant, firstWidth, firstHeight })

  return {
    ...codePreview,
    preview: Stack({
      class: 'p2-skeleton-demo',
      gap: 'small',
      children: [
        Skeleton({ variant, width: firstWidth, height: firstHeight }),
        Skeleton({ width: '88%' }),
        Skeleton({ variant: 'rect', height: '5rem' })
      ]
    }),
    controls: <div class="settings-list">
      <SettingLabel htmlFor="p2-skeleton-variant">First shape</SettingLabel>
      <Select id="p2-skeleton-variant" value={variant} options={selectOptions(['text', 'circle', 'rect'])} ariaLabel="First shape" />
      <p class="playground-note">The first block follows this control. Skeleton is decorative by default; add ariaLabel when it represents a named loading region.</p>
    </div>
  }
}

