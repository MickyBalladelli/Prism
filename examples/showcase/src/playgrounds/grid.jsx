import { component, computed, html, keyed, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function GridPlayground() {
  const columns = signal(3)
  const codePreview = createCodePreview(codeLines(
    'Grid({',
    '  columns: 3,',
    '  gap: "medium",',
    '  children: cards',
    '})'
  ), { ...playgroundRuntime, columns })
  const cards = ['Signal', 'Motion', 'Clarity', 'Focus', 'Flow', 'Craft']

  return {
    ...codePreview,
    preview: Grid({ class: 'p2-grid-demo', columns, gap: 'medium', children: keyed(cards.map((label, index) => html`<article><span>${String(index + 1).padStart(2, '0')}</span><strong>${label}</strong></article>`), (_card, index) => index) }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-grid-columns">Columns</SettingLabel><SelectForP2 id="p2-grid-columns" value={columns} options={[{ value: 2, label: '2 columns' }, { value: 3, label: '3 columns' }, { value: 4, label: '4 columns' }]} /><p class="playground-note">Grid uses a responsive minimum column width, so cards stay readable as the viewport narrows.</p></div>
  }
}
