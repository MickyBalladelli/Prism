import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function PopoverPlayground() {
  const codePreview = createCodePreview(codeLines(
    'Popover({',
    '  children: Button({ children: "Show details" }),',
    '  content: html`<div class="p2-popover-content">',
    '    <strong>Workspace pulse</strong>',
    '    <span>3 collaborators are active now.</span>',
    '  </div>`',
    '})'
  ), { ...playgroundRuntime })

  return {
    ...codePreview,
    preview: html`<div class="p2-popover-demo">${component(Popover, { children: Button({ children: 'Show details', icon: InfoIcon({ size: '1em' }) }), content: html`<div class="p2-popover-content"><strong>Workspace pulse</strong><span>3 collaborators are active now.</span></div>` })}</div>`,
    controls: <div class="settings-list"><p class="playground-note">Click outside or press Escape to close. The panel clamps to the viewport edge.</p></div>
  }
}

