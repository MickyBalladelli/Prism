import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function PaginationPlayground() {
  const page = signal(3)
  const javascript = computed(() => codeLines(
    'Pagination({',
    `  page: ${page.value},`,
    '  totalItems: 240,',
    '  pageSize: 25,',
    '  showPageSize: true,',
    '  onPageChange: nextPage => page.value = nextPage',
    '})'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
  const codePreview = createCodePreview(codeLines(
    'Pagination({',
    '  page,',
    '  totalItems: 240,',
    '  pageSize: 25,',
    '  showPageSize: true,',
    '  onPageChange: nextPage => page.value = nextPage',
    '})'
  ), { ...playgroundRuntime, page })

  return {
    ...codePreview,
    javascript,
    jsxCode,
    preview: html`<div class="p2-pagination-demo">${Pagination({ page, totalItems: 240, pageSize: 25, showPageSize: true, onPageChange: nextPage => page.value = nextPage })}<p class="playground-note">Page <strong>${page}</strong> of 10</p></div>`,
    controls: <div class="settings-list"><p class="playground-note">This is the same pagination contract a remote result list can use.</p><p class="playground-note">Current page: <strong>{page}</strong></p></div>
  }
}
