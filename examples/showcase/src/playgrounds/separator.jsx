import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function SeparatorPlayground() {
  const orientation = signal('horizontal')
  const codePreview = createCodePreview(codeLines(
    'Separator({',
    '  orientation,',
    '  decorative: false,',
    '  label: "Or continue"',
    '})'
  ), { ...playgroundRuntime, orientation })

  return {
    ...codePreview,
    preview: html`<div class="p2-separator-demo">${Separator({ orientation, decorative: false, label: 'Or continue' })}</div>`,
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-separator-orientation">Orientation</SettingLabel><SelectForP2 id="p2-separator-orientation" value={orientation} options={selectOptions(['horizontal', 'vertical'])} /><p class="playground-note">A labeled separator exposes the correct separator role.</p></div>
  }
}

